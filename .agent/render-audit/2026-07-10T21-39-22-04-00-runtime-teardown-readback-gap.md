# HorrorCorridor Runtime Teardown Readback Gap

**Timestamp:** `2026-07-10T21-39-22-04-00`

## Current render lifecycle

```txt
GameCanvas mount
  -> create renderer
  -> create scene and camera
  -> create post-processing composer
  -> build maze world
  -> append renderer canvas
  -> attach world
  -> register ResizeObserver and DOM listeners
  -> subscribe to transport
  -> start RAF loop

GameCanvas unmount
  -> stop RAF
  -> unsubscribe transport listener
  -> disconnect ResizeObserver
  -> remove resize/pointer/key/mouse/blur listeners
  -> world.dispose()
  -> postProcessing.dispose()
  -> renderer.dispose()
  -> remove renderer canvas
  -> patch runtime readiness
```

## What is good

The render host already has explicit cleanup calls. `animationLoop.stop()` cancels the outstanding frame. `world.dispose()` removes the root, disposes scene dressing, traverses geometries/materials, and disposes the shared material set. The composer and renderer expose disposal paths, and the canvas is removed from the mount.

## Gap

Cleanup is imperative and unobserved. There is no immutable result proving:

```txt
which runtime instance was disposed
which resources existed
which resources were released
whether disposal happened once
whether a repeated cleanup became no-change
whether pointer lock was released
whether render lists/contexts were retired
whether readiness matches the post-teardown session mode
```

The current cleanup always patches `networking: true`, including solo and disconnected cases. This demonstrates that render teardown and session projection are not coordinated by one lifecycle transaction.

## Required readback

```txt
RuntimeTeardownResult {
  runtimeInstanceId
  sessionEpoch
  status: disposed | no-change | failed
  rafStopped
  transportSubscriptionRemoved
  resizeObserverDisconnected
  domListenersRemoved[]
  pointerLockReleased
  worldDisposed
  postProcessingDisposed
  rendererDisposed
  canvasRemoved
  runtimeStoreReset
  completedAtMs
  reason
}
```

## Proof rows

```txt
normal unmount disposes every owned resource once
second cleanup returns no-change
partial initialization disposes only created resources
solo cleanup reports networking false
connected lobby return reports networking true after runtime teardown
return-to-title reports transport destroyed
re-entry creates a new runtimeInstanceId
one active RAF remains after repeated lobby/run cycles
one listener set remains after repeated lobby/run cycles
```

## Non-goals

```txt
renderer replacement
Three.js extraction
visual changes
material or post-processing retuning
```

## Conclusion

The renderer itself is not the next rewrite target. The missing layer is a JSON-safe teardown ledger composed into session lifecycle authority.
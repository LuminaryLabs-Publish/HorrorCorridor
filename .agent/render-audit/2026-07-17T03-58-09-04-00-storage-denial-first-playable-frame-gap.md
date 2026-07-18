# HorrorCorridor Storage Denial First-Playable-Frame Gap

**Timestamp:** `2026-07-17T03-58-09-04-00`

## Summary

The visual runtime initializes debug preferences before constructing the WebGL renderer, scene, camera, post-processing chain and maze world. Direct `localStorage.getItem` calls are not guarded. A storage exception can therefore abort initialization before any playable Three.js frame exists.

## Current visible path

```txt
accepted authoritative snapshot
  -> GameCanvas.initializeRuntime
  -> initializeRuntimeDebug
     -> localStorage reads
  -> renderer construction
  -> scene/camera/post-processing construction
  -> world attach
  -> resize and input listeners
  -> RAF start
  -> first WebGL and minimap frame
```

## Gap

```txt
storage read throws
  -> initializeRuntimeDebug does not return
  -> renderer is not created
  -> world is not attached
  -> readiness is not patched to rendering=true
  -> RAF does not start
  -> no typed storage failure is projected
  -> no FirstPlayableFrameAck exists
```

The same unguarded persistence path is used by Backquote/window API toggles. A write failure has no visual status result and no proof that the accepted in-memory preference was retained.

## Required projection contract

```txt
DebugBootstrapSettlementResult
  storageStatus
  preferenceSource
  fallbackApplied
  runtimeBootAllowed
  diagnosticRevision

FirstPlayableFrameAck
  runtimeGeneration
  renderSurfaceRevision
  storageStatus

FirstDebugPreferenceStatusFrameAck
  runtimeGeneration
  preferenceRevision
  projectedStatus
```

## Required behavior

```txt
available storage
  -> read validated preference
  -> continue normal boot

unavailable or denied storage
  -> use safe in-memory defaults
  -> continue normal boot
  -> expose bounded non-blocking diagnostic status

failed write after toggle
  -> keep accepted in-memory value
  -> report memory-only persistence
  -> do not interrupt the active render loop
```

## Proof gap

No browser fixture currently denies `localStorage`, throws on `getItem`, throws on `setItem`, simulates quota exhaustion or verifies a first playable frame under memory-only fallback.

## Claim boundary

No renderer behavior was changed. No storage-denial or first-frame failure was reproduced.
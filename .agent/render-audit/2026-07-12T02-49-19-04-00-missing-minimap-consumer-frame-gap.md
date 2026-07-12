# HorrorCorridor Missing Minimap Consumer Frame Gap

**Timestamp:** `2026-07-12T02-49-19-04-00`

## Goal

Trace the visible-frame path and identify why the implemented minimap renderer produces no active-gameplay surface.

## Source path

```txt
HUDOverlay
  -> screen must be PLAYING or COMPLETED

PLAYING
  -> returns SettingsOverlay
  -> returns FrameDebugPanel
  -> returns no Minimap

COMPLETED
  -> returns completion panels
  -> returns Minimap canvas
  -> returns settings and debug surfaces
```

`GameCanvas` does not receive the minimap canvas as a retained dependency. Each RAF performs:

```txt
document.getElementById("runtime-minimap")
  -> HTMLCanvasElement or null
  -> drawMinimapFrame(...)
```

`drawMinimapFrame` returns immediately when the canvas is null.

## Result during active play

```txt
world Three.js update: runs
post-processing render: runs
minimap DOM consumer: absent
minimap lookup: null
minimap projection: silent no-op
projection failure result: absent
visible-frame receipt: absent
```

## Result after completion

```txt
screen becomes COMPLETED
HUDOverlay mounts Minimap
RAF remains active in snapshot-replay mode
minimap lookup can succeed
minimap becomes visible after gameplay is over
```

## Additional frame-correlation gap

The order inside `renderFrame` is:

```txt
sync camera
update world
attempt minimap draw
capture debug frame
submit post-processing render
```

The debug record and minimap attempt happen before the Three.js post-processing submission returns. There is no typed render result proving that the world frame became visible, and no shared receipt correlating the world, minimap and debug projections.

## Missing render authority

```txt
required consumer declaration
surface mount revision
minimap canvas lease
missing-consumer result
projection success result
screen-policy revision
presentation frame ID
consumer acknowledgement barrier
first active minimap frame receipt
screen-transition retirement receipt
```

## Required render contract

```txt
PresentationFramePlan
  frameId
  screen
  snapshotTick
  localPoseRevision
  renderSurfaceRevision
  requiredConsumers

MinimapProjectionResult
  frameId
  canvasLeaseId
  canvasRevision
  status
  reason
  drawnEntityCounts
  committedAt

CommittedPresentationFrame
  frameId
  worldAck
  postProcessingAck
  hudAck
  minimapAck
  debugAck or explicit optional skip
```

## Required browser proof

```txt
enter solo PLAYING
assert runtime-minimap is mounted
advance one RAF
assert minimap projection result is accepted
assert maze and local heading pixels change
transition to PAUSED
assert policy remains explicit
resume PLAYING
assert lease revision advances or remains valid
transition to COMPLETED
assert completed policy does not create the first minimap lease
```

## Validation state

```txt
runtime source changed: no
render behavior changed: no
browser run: no
active minimap visible: not proven
missing-consumer result: not implemented
frame correlation receipt: not implemented
```

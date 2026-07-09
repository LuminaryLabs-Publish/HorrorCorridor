# HorrorCorridor Render Audit: Debug Command Publish Readback Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-30-09-04-00`

## Visual/render surface

`HorrorCorridor` has a visual runtime surface, so this render audit is required.

The render side is already coherent enough for the current product stage:

```txt
GameCanvas
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> drawMinimapFrame
  -> createRuntimeDebugFrameRecord
  -> postProcessing.render()
```

## Current render loop

```txt
GameCanvas frame
  -> decide latest snapshot from local/host or client runtime store
  -> sync camera from player pose and view angles
  -> world.update(snapshot, local player, local pose, local view angles)
  -> drawMinimapFrame(snapshot, local player, local position, yaw)
  -> capture runtime debug frame if enabled
  -> postProcessing.render()
```

## Render services currently offered

```txt
renderer creation and sizing
camera creation and resize projection
post-processing creation/render/disposal
maze world attach/update/dispose
terrain eye-position readback for camera
minimap projection from replicated snapshot
scene dressing summary for runtime debug frames
runtime debug frame export with snapshot/input/cadence/cube/anomaly facts
```

## Render blocker

The render/debug layer can show frames, snapshots, cadence, cubes, anomaly state, local pose, and scene dressing, but it cannot yet explain command decisions.

Missing additive readback fields:

```txt
latestCommandResult
latestCommandReason
latestPublishDecision
latestConsumerAction
latestRejectedCommand
latestSkippedCommand
latestRecoveryCommand
latestVictoryCommand
commandJournalCounters
fixtureParitySummary
```

## Required next render/debug readback

```txt
RuntimeDebugCommandProjection
  -> latest command result summary
  -> latest publish decision summary
  -> journal counters
  -> fixture parity signal
  -> serialized overlay/export payload
```

## Non-goals

```txt
- do not extract the renderer before command fixture proof.
- do not change post-processing before command fixture proof.
- do not expand object kits before command fixture proof.
- do not redesign minimap before command fixture proof.
- do not add visual content before command outcomes are explainable.
```

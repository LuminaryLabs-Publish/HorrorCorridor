# Render Audit: Debug Command Projection Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-25-39-04-00`

## Visual/render surface exists

`HorrorCorridor` has a visual surface through `GameCanvas.tsx`, Three.js renderer creation, scene creation, post-processing, maze world construction, minimap draw, pointer-lock camera sync, and runtime debug frame capture.

## Current render loop

```txt
createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> loop.start()
  -> step pose and authority state
  -> world.update(snapshot, local player pose, view angles)
  -> drawMinimapFrame(snapshot, local position, yaw)
  -> recordRuntimeDebugFrame(...)
  -> postProcessing.render()
```

## Current readback

```txt
runtimeDebugStore.extractState()
  -> enabled
  -> overlayVisible
  -> latestFrame
  -> frames
  -> events
```

The debug frame currently captures pose, input, snapshot counters, cube states, anomaly slots, cadence, and scene dressing. It does not expose latest command result, latest publish decision, latest rejection reason, command journal counts, or fixture parity.

## Render-specific blocker

The renderer itself is not the next blocker. The missing render readback is semantic: the debug overlay and extracted debug state cannot explain why the latest interaction published, skipped, recovered, rejected, or caused victory.

## Required next render/debug addition

```txt
RuntimeDebugCommandProjection
  -> latestCommandId
  -> latestCommandSource
  -> latestCommandStatus
  -> latestCommandReason
  -> latestPublishDecision
  -> shouldBroadcast
  -> shouldCommitVictory
  -> journalCounts
  -> fixtureParity
```

## Non-goal

Do not extract renderer, minimap, post-processing, scene dressing, or object kits before command results and publish decisions are fixture-safe.

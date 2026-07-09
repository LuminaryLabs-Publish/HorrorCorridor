# Render Audit - Runtime Debug Command Projection Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`
**Timestamp:** `2026-07-09T03-59-03-04-00`

## Visual surface

`HorrorCorridor` has a real render surface under `HorrorCorridor-V1/src/components/game/GameCanvas.tsx`.

The current render loop creates a Three.js renderer, scene, camera, post-processing pipeline, maze world, minimap canvas, scene dressing summary, and runtime debug frame capture.

## Current render/readback path

```txt
GameCanvas
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> world.attach(scene)
  -> createAnimationLoop
  -> syncCameraFromPlayer
  -> world.update
  -> drawMinimapFrame
  -> createRuntimeDebugFrameRecord
  -> recordRuntimeDebugFrame
  -> postProcessing.render
```

## Gap

Runtime debug frames expose snapshot, cube, anomaly, input, cadence, and scene dressing facts.

They still do not expose:

```txt
latestCommandResult
latestCommandReason
latestPublishDecision
latestConsumerAction
latestCommandJournalCount
latestFixtureParity
```

## Next render-readback contract

Add `runtimeDebugCommandProjection.ts` after the headless command fixture passes.

Expose command projection data additively through `runtimeDebugStore.ts` without removing existing frame/event export fields.

## Do not start with

```txt
renderer extraction
minimap extraction
post-processing extraction
visual object expansion
new maze dressing
```

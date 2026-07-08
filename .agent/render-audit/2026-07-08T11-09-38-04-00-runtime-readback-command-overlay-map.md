# HorrorCorridor Runtime Readback Command Overlay Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T11:09:38-04:00`

## Purpose

Document the render surface and how it should eventually read command-result metadata without turning the next pass into a renderer extraction.

## Current render surface

The live render surface is still inside `GameCanvas.tsx`.

Current render stack:

```txt
GameCanvas.tsx
  -> createRenderer()
  -> createScene()
  -> createCamera()
  -> createPostProcessing(renderer, scene, camera)
  -> buildMazeWorld(maze)
  -> world.attach(scene)
  -> createAnimationLoop()
  -> syncCameraFromPlayer()
  -> world.update(elapsedMs, snapshot, localPlayerId, localPlayerPosition, localViewAngles)
  -> drawMinimapFrame()
  -> recordRuntimeDebugFrame()
  -> postProcessing.render()
```

## What the renderer currently consumes

```txt
ReplicatedGameSnapshot:
  appState
  gameState
  tick
  timestampMs
  players
  cubes
  anomaly sequence
  anomaly slots
  maze
  oozeTrail

Local runtime state:
  localPlayerId
  local pose
  view angles
  pointer lock state
  input snapshot
  cadence state

World readback:
  scene dressing summary
  terrain eye position
  local player position
  local view angles
```

## What runtime debug currently exposes

```txt
frameNumber
deltaMs
elapsedMs
recordedAtMs
mode
screen
pointerLocked
roomId
localPlayerId
localPose
input
snapshot summary
cubes
anomaly
cadence
sceneDressing
```

## What runtime debug still needs

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
latestCommandEnvelope
latestCommandEvents
commandJournalCounts
latestFixtureParity
lastPublishedSnapshotReason
lastSkippedPublishReason
```

## Render-specific finding

Rendering is not the current source of product risk. The maze world, minimap, post-processing, and debug frame capture already consume snapshot and local pose state.

The render/debug gap is that frame records cannot explain whether the latest visible state came from an accepted command, a rejected command, a skipped command, a publish-only recovery, an unchanged player update, an ooze tick, or a victory transition.

## Do not extract next

```txt
Do not extract:
  renderer
  post-processing
  minimap
  maze world
  scene dressing
  object kits
  texture kits
```

Those extractions should wait until command results and publish decisions are fixture-readable.

## Command overlay target

After the headless command fixture passes, add a small runtime debug projection:

```txt
RuntimeCommandOverlay = {
  latestCommandId,
  latestCommandType,
  latestCommandSource,
  latestCommandStatus,
  latestCommandReason,
  latestChanged,
  latestPublishDecision,
  latestPublishReason,
  shouldBroadcast,
  shouldCommitVictory,
  journalCounts,
  fixtureParity
}
```

## Acceptance rows

```txt
[ ] debug frame can show latest accepted pickup result.
[ ] debug frame can show latest rejected pickup result.
[ ] debug frame can show latest publish-only request-sync recovery.
[ ] debug frame can show latest skipped toggle-ready/cancel result.
[ ] debug frame can show latest victory result.
[ ] debug frame cadence remains present.
[ ] sceneDressing readback remains present.
[ ] minimap draw remains unchanged.
[ ] postProcessing.render remains unchanged.
```

## Stop line

Only add render/debug readback after command result contracts, publish decisions, and the DOM-free command fixture exist.

Do not use this audit as permission to rewrite the render loop.

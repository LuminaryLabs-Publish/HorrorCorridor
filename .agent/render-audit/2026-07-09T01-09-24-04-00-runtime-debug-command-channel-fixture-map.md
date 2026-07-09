# HorrorCorridor Render Audit: Runtime Debug Command Channel Fixture Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T01-09-24-04-00`

## Render surface

`HorrorCorridor` has a visual/render surface.

The route mounts `GameCanvas`, builds a Three.js renderer, camera, post-processing pipeline, maze world, minimap canvas, HUD stores, and runtime debug capture.

## Current render/readback loop

```txt
GameCanvas mounts
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> append renderer.domElement
  -> world.attach(scene)
  -> animation loop advances input, pose, network cadence, authority, snapshot, minimap, and debug frame
  -> renderer/post-processing draw frame
  -> runtimeDebugStore records frame and event data when enabled
  -> window.__HORROR_CORRIDOR_DEBUG__.extractState() returns debug export
```

## Current readback fields

Runtime debug frames currently expose:

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
snapshot tick/timestamp/appState/gameState/playerCount/cubeCount/oozeCount/decalCount/slotsFilled/cubeStates/localPlayer
cubes
anomaly
cadence
sceneDressing
```

## Render/debug gap

The render surface can show the maze and export frame facts, but it cannot yet explain command authority.

Missing debug projection fields:

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
latestSkippedReason
latestConsumerAction
latestSnapshotReason
latestBroadcastDecision
latestVictoryDecision
commandJournalSummary
latestFixtureParity
```

## Command channel target

```txt
CommandResult
  -> PublishDecision
  -> CommandJournal
  -> RuntimeDebugCommandProjection
  -> RuntimeDebugFrameRecord.command
  -> RuntimeDebugExport.latestCommand
  -> window.__HORROR_CORRIDOR_DEBUG__.extractState()
  -> fixture proves projection is serializable
```

## Required render-safe contract

The runtime debug command projection must be additive.

It must not change renderer size, scene construction, camera behavior, minimap rendering, pointer-lock flow, post-processing setup, world object creation, or existing debug export fields.

## Fixture rows needed before render/debug splice

```txt
accepted pickup projects status/reason/publish
rejected pickup projects rejection/skip/no-broadcast
request-sync projects publish-only recovery/full-sync
skipped toggle-ready projects skipped policy reason
accepted player update projects publish decision
unchanged missing-player projects unchanged/skip
victory projects victory commit decision
local consumer projects local action and publish skip/publish result
host consumer projects host action and recovery/reject/publish result
```

## Render non-goals

```txt
do not extract renderer first
do not rewrite worldBuilder first
do not add new scene dressing first
do not alter post-processing first
do not alter minimap draw first
do not change pixel ratio or camera bob first
do not require browser state to prove command projection
```

## Next readback gate

```txt
HorrorCorridor Runtime Debug Command Projection + DOM-free Fixture Serialization Gate
```

This gate should prove the debug projection shape before `GameCanvas` starts depending on result-first authority consumers.

# HorrorCorridor Runtime Debug Command Readback Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T22-51-43-04-00`

## Current render surface

The visual surface is browser-rendered through `GameCanvas.tsx`.

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
  -> world.update(snapshot/local pose/view)
  -> drawMinimapFrame
  -> recordRuntimeDebugFrame
  -> postProcessing.render
```

## Current debug readback

Runtime debug frames currently include:

```txt
frame number
delta and elapsed time
screen/mode/pointer-lock state
room id and local player id
local pose and velocity
input snapshot
snapshot tick/timestamp/app state/game state
player count
cube count
ooze count
slot fill count
cube state counts
local player projection
cube projections
anomaly sequence and slots
cadence rates
scene dressing summary
```

## Readback gap

The debug readback can describe what rendered and which snapshot was consumed.

It cannot yet explain the command that caused a state transition, why a command was rejected, whether a host publish was intentionally skipped, whether a request-sync was a recovery, or whether the local/host consumer made the expected decision.

## Required additive readback

Add these fields without removing existing debug frame fields:

```txt
latestCommandResult
latestCommandReason
latestCommandStatus
latestPublishDecision
latestSnapshotReason
latestConsumerAction
latestShouldBroadcast
latestShouldCommitVictory
commandJournalCounts
latestFixtureParity
lastRejectedCommand
lastSkippedCommand
lastRecoveryCommand
```

## Render non-goals

```txt
- do not extract Three renderer first
- do not extract minimap first
- do not change post-processing first
- do not change scene dressing first
- do not add visual object kits before command fixture proof
```

## Correct render proof order

```txt
1. add command result contracts
2. add publish decision helper
3. add journal and consumers
4. run DOM-free command fixture
5. add runtime debug command projection
6. expose command readback in debug frame/store
7. wire GameCanvas to consume decisions
8. keep renderer/minimap behavior visually unchanged
```

## Acceptance rows

```txt
[ ] rejected pickup shows latestCommandReason rejected:no-nearby-cube
[ ] rejected place-too-far shows latestCommandReason rejected:too-far-from-anomaly
[ ] request-sync shows latestPublishDecision recovery
[ ] toggle-ready shows skipped policy metadata
[ ] host rejected TRY_INTERACT shows shouldBroadcast false
[ ] accepted local pickup shows publish decision publish
[ ] final place victory shows shouldCommitVictory true
[ ] fixture parity can be exported without DOM/canvas/PeerJS/Three.js
```

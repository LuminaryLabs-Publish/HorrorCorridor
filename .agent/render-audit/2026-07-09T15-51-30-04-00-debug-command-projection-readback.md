# HorrorCorridor Render Audit: Debug Command Projection Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T15-51-30-04-00`

## Render surface exists

`HorrorCorridor` has a live visual/render surface. `GameCanvas.tsx` mounts a Three.js renderer, camera, post-processing chain, maze world, minimap, HUD state, and runtime debug frame capture.

## Current render loop

```txt
GameCanvas mount
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> attach renderer.domElement
  -> createAnimationLoop
  -> advance local pose / host state / client snapshot replay
  -> build or consume ReplicatedGameSnapshot
  -> update maze world
  -> draw minimap frame
  -> capture runtime debug frame when enabled
  -> render scene through post-processing or renderer
```

## Current readback

Runtime debug frames already expose:

```txt
frameNumber
deltaMs
elapsedMs
screen
pointerLocked
roomId
localPlayerId
localPose
input snapshot
replicated snapshot summary
cube states
anomaly sequence/slots
network cadence
scene dressing summary
```

The debug window API exposes:

```txt
enable()
disable()
showOverlay()
hideOverlay()
clear()
getLatestFrame()
getFrames()
getEvents()
extractState()
```

## Missing render/debug proof

The render path can explain what was drawn, but not why command state changed or why a publish happened.

Current missing readback fields:

```txt
latestCommandResult
latestCommandStatus
latestCommandReason
latestPublishDecision
latestSnapshotReason
latestShouldBroadcast
latestShouldCommitVictory
latestConsumerAction
commandJournalCounts
latestFixtureParity
lastRejectedCommand
lastSkippedPublish
```

## Required debug projection contract

Add `runtime-debug-command-projection-kit` after command results exist and before GameCanvas consumer rewiring.

The helper should project only serializable facts:

```txt
commandId
source
playerId
action
status
reason
changed
publishDecision
snapshotReason
shouldBroadcast
shouldCommitVictory
consumer
journalCounts
fixtureId when applicable
```

## Non-goal

Do not refactor the Three.js renderer, minimap, post-processing, object kit catalog, lighting, fog, or scene dressing first.

The render blocker is diagnostic readback, not visual fidelity.

## Next render ledge

```txt
RuntimeDebugCommandProjection must make command outcomes fixture-readable through window.__HORROR_CORRIDOR_DEBUG__.extractState() before renderer extraction or new visual kits.
```

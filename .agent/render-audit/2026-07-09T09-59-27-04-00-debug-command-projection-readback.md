# Render Audit: Debug Command Projection Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T09-59-27-04-00`

## Current visual surface

`HorrorCorridor` has a real render surface inside `HorrorCorridor-V1/src/components/game/GameCanvas.tsx`.

The runtime initializes a Three.js renderer, scene, perspective camera, post-processing pass, maze world, and minimap. It then drives rendering from an animation loop that consumes local pose, latest replicated snapshot, runtime cadence, and scene dressing summary.

## Current render loop

```txt
GameCanvas initializeRuntime(snapshot)
  -> buildMazeResultFromSnapshot(snapshot)
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> mount renderer DOM element
  -> request animation loop
  -> resolve local/host/client simulation mode
  -> update player pose and latest snapshot
  -> sync camera from player with walk shake
  -> world.update({ snapshot, localPlayerId, localPlayerPosition, localViewAngles })
  -> drawMinimapFrame({ snapshot, localPlayerId, localPosition, yaw })
  -> create runtime debug frame record
  -> postProcessing.render()
```

## Render consumers

```txt
renderer consumes:
- local player pose
- local view angles
- replicated snapshot
- maze world scene dressing
- elapsed time

minimap consumes:
- replicated snapshot
- local player id
- local position
- yaw

runtime debug consumes:
- screen mode
- pointer lock state
- room id
- local player id
- snapshot tick/state/cube/anomaly facts
- local pose and input
- cadence counters
- scene dressing summary
```

## Current readback gap

Runtime debug frames can show frame, snapshot, cube, anomaly, input, cadence, and scene dressing data.

They do not yet expose command authority facts:

```txt
latestCommandId
latestCommandSource
latestCommandStatus
latestCommandReason
latestChangedFlag
latestPublishDecision
latestSnapshotReason
latestShouldBroadcast
latestShouldCommitVictory
latestConsumerAction
commandJournalCounts
latestFixtureParity
```

## Required additive projection

Add `runtimeDebugCommandProjection.ts` only after command result fixture rows exist.

The projection should be additive and should not alter current frame shape except by appending a `command` object:

```txt
RuntimeDebugCommandProjection
  -> latestResultSummary
  -> latestPublishDecisionSummary
  -> journalCounts
  -> latestRejectedReason
  -> latestSkippedReason
  -> latestRecoveryReason
  -> latestVictoryReason
  -> fixtureParity
```

## Render extraction decision

Do not extract the renderer, minimap, or post-processing yet.

The render host is not the blocker. The blocker is that renderer/debug readback cannot explain command outcomes because command outcomes are not first-class source records yet.

## Acceptance target

```txt
[ ] runtime debug frame still records existing fields.
[ ] command projection appears only after command fixture source exists.
[ ] rejected local interaction can be displayed as rejected reason, not silent no-op.
[ ] host skipped TRY_INTERACT can be displayed as skipped publish decision.
[ ] request-sync recovery can be displayed as publish-only recovery decision.
[ ] victory can be displayed as command-result-derived completion decision.
[ ] render frame/minimap behavior remains unchanged.
```

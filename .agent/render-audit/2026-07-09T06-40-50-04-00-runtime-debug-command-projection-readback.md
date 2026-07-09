# HorrorCorridor Runtime Debug Command Projection Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-40-50-04-00`

## Render surface present

`HorrorCorridor` has a visual/render surface through `GameCanvas.tsx`, Three.js renderer creation, scene/camera/post-processing setup, maze world rendering, minimap drawing, HUD state, completion routing, and runtime debug frame capture.

## Current render/debug loop

```txt
GameCanvas initializes renderer/camera/post-processing
-> buildMazeWorld creates renderable maze/cube/anomaly/ooze scene objects
-> resizeRenderer keeps camera and composer in sync
-> animation loop advances player pose and authoritative state
-> buildReplicatedSnapshot provides render state
-> Three world updates from snapshot facts
-> drawMinimapFrame consumes snapshot and local pose
-> createRuntimeDebugFrameRecord captures cadence, input, local pose, cube/anomaly facts, and scene dressing
-> recordRuntimeDebugFrame stores debug output
```

## Render readback limitation

The runtime debug frame is useful but does not expose command-result fields.

Missing projection fields:

```txt
latestCommandId
latestCommandSource
latestCommandType
latestCommandStatus
latestCommandReason
latestPublishDecision
latestSnapshotReason
latestShouldBroadcast
latestShouldCommitVictory
latestConsumerAction
commandJournalCounts
latestFixtureParity
```

## Required runtime debug projection kit

```txt
runtime-debug-command-projection-kit
├─ input: CommandResult
├─ input: PublishDecision
├─ input: CommandJournalSummary
├─ input: fixture parity summary
├─ output: serializable RuntimeDebugCommandProjection
└─ consumer: runtimeDebugStore additive command fields
```

## Render non-goals

```txt
- do not replace Three.js renderer first.
- do not extract minimap first.
- do not retune post-processing first.
- do not add scene dressing before command readback exists.
- do not alter visual object kits during this fixture gate.
```

## Readback acceptance

```txt
[ ] rejected interaction appears in debug projection with stable reason.
[ ] skipped toggle-ready/cancel/unknown action appears in debug projection.
[ ] publish-only request-sync appears as recovery decision.
[ ] accepted pickup/drop/place/remove appears with changed flag and publish decision.
[ ] victory appears with shouldCommitVictory true.
[ ] command journal counts are serializable.
[ ] existing frame snapshot/cube/anomaly/cadence fields remain compatible.
```

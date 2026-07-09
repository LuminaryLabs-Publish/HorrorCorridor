# HorrorCorridor Debug Command Readback Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-30-19-04-00`

## Purpose

This render/debug audit documents what the visual and diagnostic layers should be able to read after the command fixture gate exists.

No render implementation was changed in this pass.

## Current render loop

```txt
GameCanvas initializes renderer, scene, camera, postprocessing, and maze world
  -> syncCameraFromPlayer adds camera bob and view angles
  -> world.update consumes replicated snapshot and local pose
  -> drawMinimapFrame consumes snapshot, local player id, position, and yaw
  -> createRuntimeDebugFrameRecord captures frame, input, snapshot, cube, anomaly, cadence, and scene dressing facts
  -> postProcessing.render draws the frame
```

## Current debug readback

Runtime debug already exposes useful frame facts:

```txt
frame number
delta / elapsed / recorded time
mode
screen
pointer lock state
room id
local player id
local pose
input snapshot
snapshot tick and game state
player/cube/ooze/decal counts
anomaly sequence and slots
network cadence
scene dressing summary
```

## Missing command readback

```txt
latestCommandEnvelope
latestCommandResult
latestCommandStatus
latestCommandReason
latestPublishDecision
latestShouldBroadcast
latestShouldCommitVictory
latestSnapshotReason
latestLocalConsumerAction
latestHostConsumerAction
commandJournalCounts
latestFixtureParity
```

## Target readback contract

```txt
RuntimeDebugCommandProjection = {
  commandId
  source
  type
  playerId
  status
  reason
  changed
  publishDecision
  shouldBroadcast
  shouldCommitVictory
  snapshotReason
  eventCount
  journalCounts
  localConsumerAction
  hostConsumerAction
  fixtureId
  parityStatus
}
```

## Render non-goals

```txt
- do not rewrite the Three.js renderer for this pass
- do not extract minimap draw yet
- do not change post-processing order yet
- do not add visual object kits yet
- do not change scene dressing density yet
- do not make debug overlay the source of truth
```

## Acceptance rule

The render/debug layer should consume command projection as read-only diagnostic data after the headless command fixture passes.

`GameCanvas.tsx` should keep rendering from snapshots and should not become the place that invents command result metadata.

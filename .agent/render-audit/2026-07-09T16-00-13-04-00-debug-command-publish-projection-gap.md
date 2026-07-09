# Render Audit — Debug Command Publish Projection Gap

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T16-00-13-04-00`

## Render surface

`HorrorCorridor` has a visual/render surface.

The active render path is inside `GameCanvas.tsx` and composes:

```txt
createRenderer
createScene
createCamera
createPostProcessing
buildMazeWorld
syncCameraFromPlayer
drawMinimapFrame
recordRuntimeDebugFrame
```

## Current render loop readback

The current frame record exposes:

```txt
frame number
delta/elapsed/recordedAt
mode
screen
pointer lock
room/local player
local pose
input snapshot
snapshot summary
cube records
anomaly sequence/slots
cadence
scene dressing summary
```

## Missing render/debug projection

The render/debug layer cannot yet explain command authority decisions.

Missing additive fields:

```txt
latestCommandId
latestCommandSource
latestCommandType
latestCommandStatus
latestCommandReason
latestPublishDecision
latestPublishReason
shouldBroadcast
shouldCommitVictory
latestConsumerAction
commandJournalCounts
fixtureParity
```

## Why this matters

The frame overlay can show that a snapshot changed, but it cannot explain whether the command was accepted, rejected, skipped, unchanged, publish-only, recovery, or victory.

That blocks useful browser validation for the command result cut.

## Next render-safe cut

```txt
1. keep renderer/world/minimap unchanged.
2. build runtimeDebugCommandProjection.ts after command fixture passes.
3. add command projection fields to runtimeDebugStore additively.
4. expose latest command and publish decision in debug export.
5. wire GameCanvas to pass consumer results into debug only after source fixture parity.
```

## Non-goals

```txt
- no post-processing extraction in the next pass
- no minimap extraction in the next pass
- no scene dressing expansion in the next pass
- no visual polish before command-result fixture proof
```

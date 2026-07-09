# HorrorCorridor Runtime Debug Command Consumer Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-30-54-04-00`

## Render surface

`HorrorCorridor` has a visual/render surface under `HorrorCorridor-V1`.

The current render loop is driven by `GameCanvas.tsx` and includes:

```txt
Three.js renderer
  -> scene
  -> perspective camera
  -> post-processing
  -> maze world objects
  -> minimap canvas
  -> HUD / React screen state
  -> runtime debug frame store
```

## Current readback boundary

Runtime debug frames already capture:

```txt
frame number
delta / elapsed time
screen mode
pointer-lock state
room id
local player id
local pose
input snapshot
snapshot tick / timestamp / app state / game state
player count
cube count
ooze count
sequence slots filled
cube state counts
local player snapshot
scene dressing summary
cadence counters
```

## Missing command readback

The render/debug surface cannot yet explain command outcomes.

Missing fields:

```txt
latestCommandId
latestCommandSource
latestCommandType
latestCommandStatus
latestCommandReason
latestChangedFlag
latestPublishDecision
latestSnapshotReason
latestShouldBroadcast
latestShouldCommitVictory
latestLocalConsumerAction
latestHostConsumerAction
latestRejectedReason
commandJournalCounts
latestFixtureParity
```

## Render risk

The next implementation should not start by extracting renderer, minimap, post-processing, or scene dressing.

The safer cut is additive command readback:

```txt
CommandResult
  -> PublishDecision
  -> CommandJournal summary
  -> RuntimeDebugCommandProjection
  -> runtimeDebugStore additive fields
  -> GameCanvas debug frame projection
```

## Acceptance

```txt
[ ] existing debug overlay remains compatible
[ ] existing runtime frame fields remain unchanged
[ ] command fields are additive
[ ] rejected local interactions are visible in debug readback
[ ] skipped host TRY_INTERACT decisions are visible in debug readback
[ ] request-sync recovery decisions are visible in debug readback
[ ] fixture parity can assert debug projection without DOM/canvas
```

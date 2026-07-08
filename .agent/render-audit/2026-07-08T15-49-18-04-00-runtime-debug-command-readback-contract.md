# HorrorCorridor Runtime Debug Command Readback Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T15:49:18-04:00`

## Render surface

The repo has a visual/render surface in `HorrorCorridor-V1/src/components/game/GameCanvas.tsx`.

The current route initializes a Three renderer, camera, post-processing, maze world, minimap, runtime debug capture, pointer-lock input, authoritative snapshot state, and network transport listeners inside one runtime component.

## Current readback

`runtimeDebugStore.ts` currently stores:

```txt
latestFrame
frames
events
runtime cadence
local pose
input snapshot
snapshot summary
cube records
anomaly records
scene dressing summary
```

This is useful for visual and session debugging, but it cannot yet explain command authority.

## Missing readback

```txt
latestCommandResult
latestCommandReason
latestPublishDecision
latestConsumerAction
latestCommandSource
latestCommandType
latestCommandChangedFlag
latestJournalCounts
latestFixtureParity
```

## Required projection

Add a DOM-free projection helper after command fixture proof:

```txt
CommandResult + PublishDecision + CommandJournal
  -> RuntimeDebugCommandProjection
  -> runtimeDebugStore latest command readback
  -> debug overlay / window API extraction
```

## Required fields

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
consumerAction
journalCounts
fixtureId when sourced from replay
```

## Render/readback acceptance rows

```txt
[ ] accepted pickup readback shows status accepted and decision publish
[ ] rejected pickup readback shows status rejected and decision skip
[ ] unchanged player update readback shows status unchanged and no broadcast
[ ] request-sync readback shows status publish-only and decision recovery
[ ] skipped toggle-ready readback shows status skipped and decision skip
[ ] victory placement readback shows status victory and commit flag true
[ ] latest frame remains serializable after command projection is attached
[ ] window.__HORROR_CORRIDOR_DEBUG__.extractState() includes command projection without renderer coupling
```

## Non-goal

Do not make the renderer own command decisions.

The renderer and debug overlay should consume command projection after the domain fixture proves command parity.

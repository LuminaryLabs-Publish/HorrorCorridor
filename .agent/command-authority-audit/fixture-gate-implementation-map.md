# HorrorCorridor Fixture Gate Implementation Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T05:00:17-04:00`

## Purpose

This file narrows the next implementation pass from a broad command-authority idea into a concrete fixture gate.

The current runtime can play and sync, but the command path still returns only `GameState`. A rejected command, an unchanged command, a skipped command, and a publish-only recovery command can all look like a no-op unless the caller already knows the branch that produced it.

## Source evidence checked

```txt
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/command-authority-audit/result-reason-matrix.md
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/package.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Implementation seam

```txt
player input or peer message
-> CommandEnvelope
-> preflight reason classifier
-> result-returning domain wrapper
-> legacy GameState-returning export remains compatible
-> PublishDecision
-> CommandJournal
-> RuntimeDebug projection
-> DOM-free fixture replay
```

## Required contracts

```txt
CommandEnvelope
- commandId
- source
- playerId
- roomId
- action
- payload
- issuedAtMs

CommandResult
- commandId
- action
- status
- reason
- changed
- beforeTick
- afterTick
- state
- events
- diagnostics
- publishDecision

PublishDecision
- mode
- reason
- snapshotReason
- shouldBroadcast
```

## First source files to add

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
```

## Second source files to add

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
```

## Existing source files to preserve

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
```

Do not replace these first. Keep their existing exports returning `GameState` so the current game remains playable.

The safe path is to make them call result-returning wrappers and return `result.state` after the new tests pass.

## Runtime consumer map

```txt
GameCanvas local solo/host interaction
- call result-returning interaction wrapper
- journal accepted, rejected, unchanged, skipped, publish-only, and victory results
- publish only when PublishDecision says publish/recovery/victory
- skip rejected and skipped commands

GameCanvas host peer interaction ingress
- call result-returning network wrapper
- do not publish rejected TRY_INTERACT as a normal resync
- publish request-sync as recovery
- expose the latest result to debug state

Runtime debug store
- keep existing frames and events
- add latestCommandResult
- add latestPublishDecision
- add latestRejectionReason
- add commandJournalCounts
- add latestFixtureParity
```

## Fixture gate matrix

```txt
[ ] accepted pickup near loose cube
[ ] rejected pickup while already carrying
[ ] rejected pickup with no nearby cube
[ ] accepted drop while carrying
[ ] rejected drop without carried cube
[ ] accepted place near anomaly with carried cube
[ ] rejected place too far from anomaly
[ ] rejected place with no free slot
[ ] accepted remove last anomaly cube
[ ] rejected remove wrong slot
[ ] publish-only request-sync
[ ] skipped toggle-ready
[ ] skipped cancel
[ ] skipped unknown action
[ ] accepted player update
[ ] unchanged player update for missing player
[ ] accepted or unchanged ooze tick with reason
[ ] victory ordered-sequence completion
```

## Proof command target

Add this script target after the fixture file exists:

```txt
node scripts/horror-corridor-command-fixture.mjs
```

The script should run without Next, DOM, PeerJS, pointer lock, Three.js, browser audio, renderer state, or live multiplayer.

## Snapshot parity rule

Normalize volatile fields before comparing fixture output:

```txt
timestampMs
room.updatedAtMs
runtime frame counters
randomized debug ids
network cadence ages
```

Do not normalize command reasons, statuses, publish decisions, sequence slot state, cube ownership, cube visibility, held cube state, player pose, victory state, or final snapshot facts.

## Stop line

Do not expand into renderer extraction, PeerJS extraction, minimap extraction, postprocess extraction, scene dressing, or visual content in the same implementation pass.

The next implementation pass is complete only when command results and fixture output prove the command authority seam without changing the public route behavior.

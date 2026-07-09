# HorrorCorridor Command Authority Audit

**Timestamp:** `2026-07-09T12-20-08-04-00`

## Authority finding

Command authority is still the highest-value next slice.

`interactionRules.ts` and `networkRules.ts` return `GameState` only. The rules are deterministic enough to wrap, but they do not explain accepted, rejected, skipped, unchanged, publish-only, or victory outcomes.

## Source files to add

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Minimum result envelope

```txt
commandId
source
playerId
action
status
reason
changed
beforeSummary
afterSummary
events
diagnostics
state
```

## Minimum publish decision

```txt
decision
snapshotReason
shouldBroadcast
shouldCommitVictory
consumerAction
debugMessage
```

## Required statuses

```txt
accepted
rejected
unchanged
skipped
publish-only
victory
```

## Fixture gate rows

```txt
accepted pickup
rejected pickup already carrying
rejected pickup no nearby cube
accepted drop
rejected drop no carried cube
accepted place
accepted place victory
rejected place too far
rejected place no free slot
accepted remove
rejected remove wrong slot
publish-only request-sync
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update missing player
accepted held-cube sync
unchanged held-cube sync
ooze spawn
ooze decay
ooze unchanged
victory ordered sequence
local consumer skip rejected
local consumer publish accepted
host consumer skip rejected TRY_INTERACT
host consumer publish request-sync recovery
```

## Acceptance gate

Do not splice result consumers into `GameCanvas.tsx` until the DOM-free fixture proves the result rows.

## Next safe ledge

```txt
HorrorCorridor Result-First Command Readback Ledger Refresh + Fixture Gate
```

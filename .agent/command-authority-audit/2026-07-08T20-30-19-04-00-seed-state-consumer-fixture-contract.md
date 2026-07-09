# HorrorCorridor Seed State Consumer Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-30-19-04-00`

## Purpose

This command-authority audit turns the previous command-result direction into a concrete seed-state and consumer replay contract.

The next source pass should implement this before `GameCanvas.tsx` publish behavior is rewired.

## Required pure files

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
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## CommandResult shape

```txt
CommandResult = {
  command
  status
  reason
  beforeSummary
  afterSummary
  changed
  events
  diagnostics
  state
}
```

## PublishDecision shape

```txt
PublishDecision = {
  decision
  snapshotReason
  shouldBroadcast
  shouldCommitVictory
  debugLabel
}
```

## Consumer result shape

```txt
AuthorityCommandConsumerResult = {
  result
  decision
  nextState
  journal
  consumerAction
  debugProjection
}
```

## Required statuses

```txt
accepted
rejected
unchanged
publish-only
skipped
victory
```

## Required publish decisions

```txt
publish
skip
recovery
no-op
victory
```

## Required seed rows

| Fixture id | Seed | Command | Expected status | Expected decision |
|---|---|---|---|---|
| pickup-near-loose-cube | near loose cube | pickup-cube | accepted | publish |
| pickup-already-carrying | already carrying | pickup-cube | rejected | skip |
| pickup-no-nearby-cube | no nearby cube | pickup-cube | rejected | skip |
| drop-while-carrying | already carrying | drop-cube | accepted | publish |
| drop-without-cube | no carried cube | drop-cube | rejected | skip |
| place-near-anomaly | carrying near anomaly | place-cube-at-anomaly | accepted | publish |
| place-final-victory | victory-ready sequence | place-cube-at-anomaly | victory | victory |
| place-too-far | carrying far from anomaly | place-cube-at-anomaly | rejected | skip |
| place-no-free-slot | anomaly full | place-cube-at-anomaly | rejected | skip |
| remove-last-slot | anomaly with last slot | remove-cube-from-anomaly | accepted | publish |
| remove-wrong-slot | wrong slot | remove-cube-from-anomaly | rejected | skip |
| request-sync | request-sync seed | request-sync | publish-only | recovery |
| toggle-ready | toggle-ready seed | toggle-ready | skipped | skip |
| cancel | cancel seed | cancel | skipped | skip |
| unknown-action | unknown-action seed | unknown-action | skipped | skip |
| player-update | player present | PLAYER_UPDATE | accepted | publish |
| player-update-missing | missing player | PLAYER_UPDATE | unchanged | skip |
| held-cube-sync | unsynced held cube | sync-held-cubes | accepted | publish |
| held-cube-already-synced | synced held cube | sync-held-cubes | unchanged | no-op |
| ooze-spawn | ooze spawn seed | ooze-tick | accepted | publish |
| ooze-decay | ooze decay seed | ooze-tick | accepted | publish |
| ooze-no-diff | no ooze change seed | ooze-tick | unchanged | no-op |

## Local consumer rows

```txt
local rejected interaction -> consumerAction: journal-only, shouldBroadcast: false
local unchanged interaction -> consumerAction: journal-only, shouldBroadcast: false
local accepted changed interaction -> consumerAction: publish, shouldBroadcast: true
local victory interaction -> consumerAction: victory, shouldCommitVictory: true
```

## Host consumer rows

```txt
host rejected TRY_INTERACT -> consumerAction: skip-broadcast
host accepted TRY_INTERACT -> consumerAction: publish
host request-sync -> consumerAction: recovery-full-sync
host skipped toggle-ready/cancel/default -> consumerAction: skip-policy-not-implemented
host accepted PLAYER_UPDATE -> consumerAction: publish
host missing-player PLAYER_UPDATE -> consumerAction: skip-unchanged
```

## Non-normalizable facts

```txt
status
reason
publish decision
shouldBroadcast
shouldCommitVictory
snapshot reason
consumer action
cube holder
cube active/visible/locked state
sequence slot occupancy
player pose facts
victory state
```

## Implementation stop line

Stop when the fixture script proves all seed rows and the existing legacy rule exports still preserve current final `GameState` facts.

Only after that should `GameCanvas.tsx` use local/host command consumers and runtime debug command projection.

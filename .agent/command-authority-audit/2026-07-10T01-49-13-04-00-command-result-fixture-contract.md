# HorrorCorridor Command Result Fixture Contract

**Timestamp:** `2026-07-10T01-49-13-04-00`

## Current command authority

The current command authority is split across several `GameState`-returning rule modules:

```txt
interactionRules.ts
networkRules.ts
oozeRules.ts
winRules.ts
```

They preserve gameplay behavior, but they do not expose stable result rows.

## Required result contract

Add source-owned command contracts before changing `GameCanvas`.

```txt
CommandEnvelope
  id
  source
  playerId
  action
  payload
  issuedAtMs

CommandResult
  envelope
  status: accepted | rejected | skipped | unchanged | publish-only | victory
  reason
  before
  after
  changed
  events
  diagnostics
  state

PublishDecision
  status: publish | skip | recovery | no-op | victory
  reason
  shouldBroadcast
  shouldCommitVictory
  fullSyncReason

CommandJournal
  latest
  acceptedCount
  rejectedCount
  skippedCount
  unchangedCount
  publishOnlyCount
  victoryCount
  reasonCounts
```

## Reason catalog starter set

```txt
accepted:pickup-cube
accepted:drop-cube
accepted:place-cube-at-anomaly
accepted:remove-cube-from-anomaly
accepted:player-update
accepted:held-cube-sync
rejected:not-playing
rejected:missing-player
rejected:already-carrying
rejected:not-carrying
rejected:no-nearby-cube
rejected:too-far-from-anomaly
rejected:missing-anomaly-cell
rejected:no-free-slot
rejected:wrong-slot
rejected:no-occupied-slot
unchanged:held-cube-already-synced
unchanged:missing-player-update
unchanged:ooze-spacing-guard
unchanged:ooze-max-reached
unchanged:ooze-decay-interval
publish-only:request-sync-recovery
skipped:toggle-ready-no-policy
skipped:cancel-no-policy
skipped:unknown-action
victory:ordered-sequence-complete
victory:rollback-to-playing
```

## Source file targets

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
HorrorCorridor-V1/src/features/game-state/domain/oozeResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Compatibility rule

Legacy exports should keep returning `GameState` until fixture proof exists.

Result-returning wrappers should be added beside existing functions, then `GameCanvas` should consume `PublishDecision` only after fixture rows pass.

## Stop condition

Stop when the command fixture proves accepted, rejected, unchanged, skipped, publish-only, ooze, and victory rows without a browser.

# Command Authority Audit — Result-First Fixture Reason Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T16-00-13-04-00`

## Problem statement

The authoritative command seam still returns `GameState` instead of result records.

That makes accepted, rejected, unchanged, skipped, publish-only, recovery, and victory behavior impossible to reason about without inspecting object identity or post-state fields.

## Required contract

```txt
CommandEnvelope
  id
  source
  type
  playerId
  payload
  requestedAtMs

CommandResult
  command
  status
  reason
  beforeSummary
  afterSummary
  changed
  events
  diagnostics
  state

PublishDecision
  kind
  reason
  shouldBroadcast
  shouldCommitVictory
  snapshotReason
  debugSeverity

CommandJournal
  latest
  acceptedCount
  rejectedCount
  skippedCount
  unchangedCount
  publishOnlyCount
  victoryCount
```

## Required reasons

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
accepted:player-update
accepted:held-cube-sync
accepted:ooze-tick
victory:ordered-sequence-complete
rejected:not-playing
rejected:missing-player
rejected:already-carrying
rejected:no-nearby-cube
rejected:no-carried-cube
rejected:missing-anomaly-cell
rejected:too-far-from-anomaly
rejected:no-free-slot
rejected:no-occupied-slot
rejected:wrong-slot
rejected:missing-cube-id
unchanged:player-missing
unchanged:held-cube-already-synced
unchanged:no-state-diff
publish-only:request-sync
skipped:toggle-ready-policy-not-implemented
skipped:cancel-policy-not-implemented
skipped:unknown-action
```

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
```

## Acceptance rule

Do not splice `GameCanvas.tsx` until the DOM-free command fixture proves the matrix across result status, reason, publish decision, broadcast flag, victory flag, and final snapshot facts.

# HorrorCorridor Result-First Debug Fixture Contract

**Timestamp:** `2026-07-09T22-50-53-04-00`

## Summary

The command authority contract should be added under `HorrorCorridor-V1/src/features/game-state/domain` before `GameCanvas` publish logic changes.

The contract must be additive. Legacy exports can keep returning `GameState`, but new wrappers should return typed results and fixture rows.

## Required contracts

```txt
CommandEnvelope
  id
  source
  playerId
  action
  payload
  issuedAtMs

CommandReason
  accepted
  rejected:not-playing
  rejected:missing-player
  rejected:already-carrying
  rejected:no-nearby-cube
  rejected:no-carried-cube
  rejected:too-far-from-anomaly
  rejected:no-free-slot
  rejected:wrong-slot
  skipped:request-sync
  skipped:toggle-ready
  skipped:cancel
  skipped:unknown-action
  unchanged:player-missing
  unchanged:held-cube-synced
  publish-only:request-sync-recovery
  victory:ordered-sequence-complete

CommandResult
  envelope
  status
  reason
  beforeSummary
  afterSummary
  changed
  events
  diagnostics
  state

PublishDecision
  action
  reason
  shouldBroadcast
  shouldCommitVictory
  snapshotReason
  debugSummary
```

## Source files to add next

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

## Acceptance criteria

```txt
- legacy interaction exports still return GameState.
- legacy network exports still return GameState.
- result wrappers expose status/reason/changed/state.
- every silent no-op branch has a stable reason.
- local consumer skips rejected/no-op broadcasts.
- host consumer skips rejected TRY_INTERACT broadcasts.
- request-sync produces publish-only recovery metadata.
- victory produces explicit victory decision metadata.
- runtime debug projection exposes latest result and latest decision additively.
- DOM-free fixture proves accepted, rejected, unchanged, skipped, publish-only, ooze, and victory rows.
```

## Non-goals

```txt
- do not rewrite GameCanvas wholesale
- do not remove current PeerJS message shapes
- do not remove current debug frames/events
- do not change visuals or route flow
- do not extract renderer or minimap first
```

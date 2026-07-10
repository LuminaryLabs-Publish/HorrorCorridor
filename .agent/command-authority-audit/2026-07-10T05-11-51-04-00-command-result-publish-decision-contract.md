# Command Authority Audit: Command Result Publish Decision Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T05-11-51-04-00`

## Contract need

The repo needs command authority records before implementation changes to `GameCanvas` or networking behavior.

## Required records

```txt
CommandEnvelope:
  id, source, playerId, action, payload, receivedAtMs

CommandReason:
  stable accepted/rejected/skipped/noop/recovery/victory reason codes

CommandResult:
  envelope, status, reason, beforeSummary, afterSummary, changed, events, diagnostics, state

PublishDecision:
  commandId, decision, fullSyncReason, shouldBroadcast, shouldCommitVictory, shouldUpdateLocalSnapshot, reason

CommandJournal:
  ordered rows, latest row, accepted/rejected/skipped/noop counts

FixtureRow:
  seed, command, expectedStatus, expectedReason, expectedChanged, expectedDecision, snapshotSummary
```

## Legacy adapters to preserve

```txt
pickUpCube(state, input): GameState
 dropCube(state, input): GameState
placeCubeAtEndAnomaly(state, input): GameState
removeCubeFromEndAnomaly(state, input): GameState
applyNetworkPlayerUpdate(state, input): GameState
syncHeldCubesToPlayers(state): GameState
applyNetworkInteractionRequest(state, input): GameState
advanceOozeTrail(state, input): GameState
validateOrderedSequenceCompletion(state): GameState
```

## First source files to add next

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
```

## Consumer files to touch only after fixture proof

```txt
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Main authority finding

Result-first wrappers should sit beside current rules and keep legacy exports. `GameCanvas` should consume publish decisions only after the DOM-free fixture proves accepted, rejected, skipped, no-op, recovery, ooze, and victory rows.

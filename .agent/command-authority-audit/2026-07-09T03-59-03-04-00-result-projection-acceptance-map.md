# Command Authority Audit - Result Projection Acceptance Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`
**Timestamp:** `2026-07-09T03-59-03-04-00`

## Current blocker

`interactionRules.ts` and `networkRules.ts` still return `GameState` only.

`GameCanvas.tsx` still does this:

```txt
nextState = applyNetworkInteractionRequest(currentGameState, input)
if nextState === currentGameState, return silently
otherwise sync, publish, and maybe commit victory
```

That makes command failure, no-op, skipped, recovery, and victory paths impossible to reason about from one stable result envelope.

## Required command result shape

```txt
CommandResult:
  id
  source
  type
  status
  reason
  changed
  before
  after
  events
  diagnostics
  state
```

## Required publish decision shape

```txt
PublishDecision:
  decision
  reason
  shouldPublish
  shouldBroadcast
  shouldCommitVictory
  snapshotReason
  debugLabel
```

## Source targets

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
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Fixture proof before GameCanvas splice

```txt
node scripts/horror-corridor-command-fixture.mjs
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
```

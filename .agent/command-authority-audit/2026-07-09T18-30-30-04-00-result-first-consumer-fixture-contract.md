# Command Authority Audit: Result-First Consumer Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T18-30-30-04-00`

## Current blocker

The source authority exists, but it is not result-first.

```txt
interactionRules.ts -> GameState only
networkRules.ts -> GameState only
oozeRules.ts -> GameState only
winRules.ts -> GameState only
GameCanvas.tsx -> object identity and implicit reason strings decide publish behavior
runtimeDebugStore.ts -> no command result or publish decision readback
```

## Required contracts

```txt
CommandEnvelope:
  commandId
  source
  playerId
  action
  payload
  receivedAtMs

CommandResult:
  commandId
  source
  status: accepted | rejected | unchanged | skipped | publish-only | victory
  reason
  before
  after
  changed
  events
  diagnostics

PublishDecision:
  kind: publish | skip | recovery | no-op | victory
  reason
  shouldBroadcast
  shouldCommitVictory
  snapshotReason

CommandJournal:
  latest
  rows
  acceptedCount
  rejectedCount
  skippedCount
  recoveryCount
  victoryCount
```

## Fixture-first source files

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

## Consumer splice rule

Do not replace `GameCanvas.tsx` publish checks until the fixture script proves the result rows and publish decisions without DOM/browser state.

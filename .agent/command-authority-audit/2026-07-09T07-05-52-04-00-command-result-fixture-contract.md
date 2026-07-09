# HorrorCorridor Command Result Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T07-05-52-04-00`

## Contract goal

Create a source-backed command result layer before changing `GameCanvas.tsx` publish behavior.

The first implementation should be additive, DOM-free, and compatibility-safe.

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

## Required result fields

```txt
commandId
source
kind
action
playerId
payload
status
reason
changed
beforeSummary
afterSummary
events
diagnostics
state
```

## Required decision fields

```txt
decision
snapshotReason
shouldBroadcast
shouldCommitVictory
shouldJournal
consumerAction
```

## Stable status set

```txt
accepted
rejected
unchanged
publish-only
skipped
victory
```

## Fixture gate

```txt
[ ] accepted/rejected/skipped/publish-only/unchanged/victory rows are source-backed.
[ ] request-sync is publish-only recovery.
[ ] toggle-ready and cancel are skipped until lobby policy exists.
[ ] unknown/default action is skipped:unknown-action.
[ ] legacy interaction/network exports still return GameState.
[ ] local and host consumers are proven before GameCanvas consumes them.
[ ] runtime debug projection is additive and serializable.
```

## Do not do in this ledge

```txt
- do not rewrite GameCanvas wholesale.
- do not extract PeerJS.
- do not extract renderer or minimap.
- do not add new visual content.
- do not alter snapshot shape beyond additive diagnostics after fixture proof.
```

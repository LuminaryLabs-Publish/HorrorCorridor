# Command Authority Audit: Replay Fixture Consumer Freeze

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-11-35-04-00`

## Main finding

The runtime is not missing a playable loop.

It is missing a result-first command authority layer.

`GameCanvas.tsx` currently performs browser orchestration and authority consumption at the same time, while `interactionRules.ts` and `networkRules.ts` return only `GameState`.

## Current authority seams

```txt
GameCanvas.applyInteraction
  derives action string
  -> local solo/host applies applyNetworkInteractionRequest
  -> unchanged object identity silently exits
  -> changed state publishes resync

GameCanvas host transport handler
  PLAYER_UPDATE -> applyNetworkPlayerUpdate -> publish resync
  TRY_INTERACT -> applyNetworkInteractionRequest -> syncHeldCubesToPlayers -> publish resync or recovery

interactionRules
  rejected branches return state with no reason

networkRules
  request-sync/toggle-ready/cancel/default return state with no reason
```

## Required contract objects

```txt
CommandEnvelope
  id
  source
  commandType
  playerId
  action
  payload
  createdAtMs

CommandResult
  command
  status
  reason
  before
  after
  changed
  events
  diagnostics
  state

PublishDecision
  kind
  shouldPublish
  shouldBroadcast
  shouldCommitVictory
  snapshotReason
  debugMessage

CommandJournal
  entries
  latest
  acceptedCount
  rejectedCount
  skippedCount
  unchangedCount
  publishOnlyCount
  victoryCount
```

## Reason catalog families

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

## Required source modules

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

## Consumer freeze rule

Do not change `GameCanvas` authority flow until this headless fixture can prove:

```txt
- every accepted interaction changes exactly the expected state
- every rejected interaction preserves state and records a reason
- request-sync produces recovery/full-sync decision metadata
- toggle-ready/cancel/unknown are skipped with stable reasons
- missing player update is unchanged with a stable reason
- final slot place records victory and publish decision
- local consumer skips rejected/no-op broadcast
- host consumer skips rejected TRY_INTERACT broadcast
- runtime debug projection is serializable
```

## GameCanvas integration shape

After the fixture passes, browser wiring should be additive.

```txt
currentGameState + command envelope
  -> localAuthorityCommandConsumer or hostAuthorityCommandConsumer
  -> { state, result, decision, journal }
  -> existing publishAuthoritativeState consumes decision.snapshotReason
  -> existing debug frame receives runtimeDebugCommandProjection
  -> existing legacy snapshot shape stays stable
```

## Non-goals

```txt
- no PeerJS extraction first
- no renderer extraction first
- no minimap extraction first
- no post-processing extraction first
- no visual object-kit expansion first
- no wholesale GameCanvas rewrite first
```

# Command Authority Audit: Consumer Handoff Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T09-59-27-04-00`

## Current problem

The code has command behavior, but not command authority records.

`interactionRules.ts` and `networkRules.ts` return only `GameState`. That is enough for basic play, but not enough for deterministic replay, host/client rejection reasons, publish-decision proof, or runtime debug readback.

## Current source seams

```txt
interactionRules.ts
  -> pickUpCube
  -> dropCube
  -> placeCubeAtEndAnomaly
  -> removeCubeFromEndAnomaly
  -> returns GameState
  -> every invalid branch returns unchanged state

networkRules.ts
  -> applyNetworkPlayerUpdate
  -> applyNetworkInteractionRequest
  -> syncHeldCubesToPlayers
  -> returns GameState
  -> request-sync/toggle-ready/cancel/default return unchanged state

GameCanvas.tsx
  -> derives action string
  -> applies network/interaction rules
  -> checks nextState identity for local no-op
  -> publishes by implicit reason string
  -> commits victory through post-state check
```

## Contract to add

```txt
CommandEnvelope
  id
  source: local | host | client | fixture
  type: player-update | interaction | request-sync | toggle-ready | cancel | ooze-tick
  playerId
  action
  payload

CommandResult
  command
  status: accepted | rejected | unchanged | skipped | publish-only | victory
  reason
  before
  after
  changed
  events
  diagnostics

PublishDecision
  decision: publish | skip | recovery | no-op | victory
  snapshotReason
  shouldBroadcast
  shouldCommitVictory
  shouldUpdateLocalSnapshot
  shouldRecordDebug

CommandJournal
  latest
  acceptedCount
  rejectedCount
  skippedCount
  unchangedCount
  publishOnlyCount
  victoryCount
```

## Stable reason catalog

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
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Legacy adapter rule

Keep existing exports stable until the consumer splice:

```txt
pickUpCube(state, input) -> result.state
dropCube(state, input) -> result.state
placeCubeAtEndAnomaly(state, input) -> result.state
removeCubeFromEndAnomaly(state, input) -> result.state
applyNetworkPlayerUpdate(state, input) -> result.state
applyNetworkInteractionRequest(state, input) -> result.state
syncHeldCubesToPlayers(state) -> result.state
```

## Consumer handoff rule

After fixture proof, `GameCanvas.tsx` should call:

```txt
consumeLocalAuthorityCommand({ state, command, localPlayerId })
consumeHostAuthorityCommand({ state, command, transportRole })
```

Those consumers return:

```txt
nextState
commandResult
publishDecision
journalEntry
runtimeDebugProjection
```

## Acceptance

```txt
[ ] local rejected interaction journals result and does not publish.
[ ] host rejected TRY_INTERACT journals result and does not broadcast resync.
[ ] request-sync returns publish-only recovery with full-sync publish decision.
[ ] toggle-ready/cancel return skipped policy reasons.
[ ] unknown action returns skipped unknown-action.
[ ] victory result carries shouldCommitVictory true.
[ ] legacy GameState exports remain source-compatible until GameCanvas switches.
[ ] command fixture proves all matrix rows without DOM.
```

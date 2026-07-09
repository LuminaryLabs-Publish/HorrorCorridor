# Command Decision Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-38-28-04-00`

## Purpose

Define the next source-backed contract before editing `GameCanvas.tsx` publish behavior.

The command fixture must prove that current local and host command paths can be represented as explicit decision records without changing existing gameplay behavior.

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
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Contract records

```txt
CommandEnvelope:
  commandId
  source
  playerId
  action
  cubeId
  slotId
  timestampMs

CommandResult:
  command
  status
  reason
  beforeSummary
  afterSummary
  changed
  events
  state
  diagnostics

PublishDecision:
  decision
  shouldBroadcast
  shouldSetSnapshot
  shouldCommitVictory
  snapshotReason
  debugLabel

CommandJournal:
  entries
  latest
  acceptedCount
  rejectedCount
  unchangedCount
  skippedCount
  publishOnlyCount
  victoryCount

ConsumerResult:
  commandResult
  publishDecision
  journal
  state
  snapshotIntent
  victoryIntent
  debugProjection
```

## Stable reason families

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

## Decision policy

```txt
accepted changed -> publish
accepted unchanged -> no-op
rejected -> skip
unchanged -> skip or no-op by helper type
publish-only -> recovery
skipped -> skip
victory -> victory
```

## Legacy compatibility rule

Keep current exports stable while adding result-returning variants.

```txt
pickUpCube() -> GameState remains valid
dropCube() -> GameState remains valid
placeCubeAtEndAnomaly() -> GameState remains valid
removeCubeFromEndAnomaly() -> GameState remains valid
applyNetworkPlayerUpdate() -> GameState remains valid
syncHeldCubesToPlayers() -> GameState remains valid
applyNetworkInteractionRequest() -> GameState remains valid
```

Add result variants beside them and adapt legacy exports as `result.state` only after fixture rows prove parity.

## Fixture stop condition

The fixture is accepted only when it proves:

```txt
accepted rows
rejected rows
unchanged rows
skipped rows
publish-only recovery rows
ooze rows
victory rows
local consumer behavior
host consumer behavior
runtime debug projection shape
final snapshot fact parity
volatile field normalization
```

No DOM, canvas, PeerJS, Three.js, React, browser state, pointer lock, or runtime animation loop should be required.

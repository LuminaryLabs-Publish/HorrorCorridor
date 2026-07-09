# HorrorCorridor Result-First Source Cut Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-19-00-04-00`

## Problem statement

The code already has the right gameplay seams, but authority is still implicit.

`interactionRules.ts` and `networkRules.ts` return `GameState` only. `GameCanvas.tsx` then infers whether a command mattered by comparing state object identity or by checking the post-mutation game state.

## Source cut rule

Add result-first authority beside the legacy rules.

Do not break existing imports first.

The legacy exports should remain as adapters that return `result.state` until `GameCanvas` is ready to consume the new contract.

## Required files

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

## Result contract

```txt
CommandEnvelope
  commandId
  source
  playerId
  type
  action
  payload
  createdAtMs

CommandResult
  command
  status
  reason
  before
  after
  state
  changed
  events
  diagnostics

PublishDecision
  kind
  shouldPublish
  shouldBroadcast
  shouldCommitVictory
  snapshotReason
  reason

CommandJournal
  entries
  acceptedCount
  rejectedCount
  skippedCount
  unchangedCount
  publishOnlyCount
  latestReason
  latestDecision
```

## Required reason families

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

## Consumer contract

```txt
local authority consumer
  -> rejected/no-op/skipped: journal only, no publish
  -> accepted changed: publish resync
  -> victory: publish victory and commit completion

host authority consumer
  -> player update accepted: publish resync
  -> TRY_INTERACT rejected: journal and skip broadcast
  -> request-sync: publish recovery/full-sync
  -> toggle-ready/cancel/unknown: skip with reason
  -> victory: publish and commit completion
```

## Acceptance

The source cut is accepted only when a DOM-free fixture can prove every row in the command decision matrix without canvas, PeerJS, Three.js, or browser-local state.

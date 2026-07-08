# HorrorCorridor Source File Manifest and Adapter Boundary

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T15:39:43-04:00`

## Purpose

This audit is the concrete source-authority handoff for the next implementation.

The current command authority work is over-documented but still not source-backed. The next pass should create the command source files and keep legacy adapters stable before wiring `GameCanvas.tsx`.

## Current hard evidence

```txt
interactionRules.ts returns GameState only.
networkRules.ts returns GameState only.
GameCanvas.tsx calls applyNetworkInteractionRequest directly.
GameCanvas.tsx uses object identity to skip local publishes.
GameCanvas.tsx publishes host TRY_INTERACT results without command-result decision metadata.
package.json has no command fixture script.
```

## Source file manifest

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
  owns: serializable command/result/decision/event/summary types

HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
  owns: stable reason constants and reason-family helpers

HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
  owns: accepted/rejected/unchanged/publish-only/skipped/victory constructors

HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
  owns: result -> publish/skip/recovery/no-op/victory mapping

HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
  owns: append-only command event journal and summary counts

HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
  owns: named branch checks from current interactionRules.ts silent returns

HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
  owns: result-returning pickup/drop/place/remove wrappers

HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
  owns: result-returning player-update, held-cube-sync, and interaction request wrappers

HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
  owns: local command result -> journal/publish/victory action

HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
  owns: host command result -> journal/publish/recovery/skip/victory action

HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
  owns: DOM-free fixture matrix and snapshot parity report
```

## Legacy adapter boundary

Keep these public exports behavior-compatible:

```txt
interactionRules.ts
  pickUpCube(state, input): GameState
  dropCube(state, input): GameState
  placeCubeAtEndAnomaly(state, input): GameState
  removeCubeFromEndAnomaly(state, input): GameState

networkRules.ts
  applyNetworkPlayerUpdate(state, input): GameState
  syncHeldCubesToPlayers(state): GameState
  applyNetworkInteractionRequest(state, input): GameState
```

Add result-returning equivalents beside them:

```txt
pickUpCubeWithResult(state, input, envelope): CommandResult
 dropCubeWithResult(state, input, envelope): CommandResult
placeCubeAtEndAnomalyWithResult(state, input, envelope): CommandResult
removeCubeFromEndAnomalyWithResult(state, input, envelope): CommandResult
applyNetworkPlayerUpdateWithResult(state, input, envelope): CommandResult
syncHeldCubesToPlayersWithResult(state, envelope): CommandResult
applyNetworkInteractionRequestWithResult(state, input, envelope): CommandResult
```

Legacy wrappers may return `result.state`, but not before the result-returning implementation is fixture-proven.

## Reason catalog minimum

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

## GameCanvas splice boundary

Do not edit `GameCanvas.tsx` until the fixture proves:

```txt
CommandResult status is stable.
CommandReason is stable.
PublishDecision is stable.
Local consumer action is stable.
Host consumer action is stable.
Snapshot summary is stable after volatile normalization.
Legacy adapters preserve old GameState behavior.
```

After proof, `GameCanvas.tsx` can change only these surfaces first:

```txt
local applyInteraction branch
host TRY_INTERACT branch
host PLAYER_UPDATE branch
publishAuthoritativeState callsite inputs
runtime debug projection input
```

## Fixture output shape

```txt
fixtureId
commandId
commandSource
commandType
status
reason
changed
publishDecision
shouldBroadcast
shouldCommitVictory
snapshotReason
events
journalCounts
localConsumerAction
hostConsumerAction
beforeSummary
afterSummary
parityPassed
```

## Non-goals

```txt
- no renderer rewrite
- no PeerJS extraction
- no minimap extraction
- no route/deploy change
- no level content expansion
- no visual object-kit expansion
- no GameCanvas wholesale rewrite
```

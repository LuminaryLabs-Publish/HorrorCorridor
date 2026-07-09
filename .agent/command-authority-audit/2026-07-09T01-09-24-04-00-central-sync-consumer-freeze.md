# HorrorCorridor Command Authority Audit: Central Sync Consumer Freeze

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T01-09-24-04-00`

## Purpose

Freeze the next command-authority implementation contract and sync the central ledger with repo-local `.agent` state.

This pass does not implement runtime files. It defines the exact source cut that should be implemented next.

## Current command authority state

```txt
interactionRules.ts:
  - pickUpCube
  - dropCube
  - placeCubeAtEndAnomaly
  - removeCubeFromEndAnomaly
  - returns GameState only
  - rejected branches return the original state without reason metadata

networkRules.ts:
  - syncHeldCubesToPlayers
  - applyNetworkPlayerUpdate
  - applyNetworkInteractionRequest
  - request-sync/toggle-ready/cancel/default collapse to unchanged state
  - returns GameState only

GameCanvas.tsx:
  - derives action from distance-to-end and carried-cube state
  - uses nextState === currentGameState to skip local publish
  - host TRY_INTERACT publishes after rule application without result metadata
  - victory commit reads final GameState instead of explicit consumer decision

runtimeDebugStore.ts:
  - stores frame/event data
  - lacks command result, publish decision, rejection reason, and fixture parity projection
```

## Source manifest for next implementation

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

## Implementation order

```txt
1. Define types and reason catalog.
2. Add result constructors and state summary helpers.
3. Add publish decision helper.
4. Add journal and fixture seed rows.
5. Add interaction preflight.
6. Add result-returning interaction wrappers while preserving legacy exports.
7. Add result-returning network wrappers while preserving legacy exports.
8. Add local and host authority consumers.
9. Add DOM-free fixture runner.
10. Add package script only after fixture file exists.
11. Add runtime debug command projection.
12. Add runtimeDebugStore command projection fields additively.
13. Splice GameCanvas to consume command decisions.
```

## Command reason catalog freeze

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

## Consumer decision freeze

```txt
accepted changed -> publish
accepted unchanged -> no-op
rejected -> skip
unchanged -> skip or no-op by command type
publish-only request-sync -> recovery/full-sync
skipped -> skip
victory -> victory publish and completion intent
```

## Required fixture proof groups

```txt
source manifest rows
preflight rows
interaction result rows
network result rows
publish decision rows
local consumer rows
host consumer rows
journal rows
runtime debug projection rows
GameCanvas splice eligibility rows
final snapshot parity rows
```

## Main risk

Do not use the fixture runner as an afterthought.

If `GameCanvas.tsx` is edited before the DOM-free command rows exist, the runtime can become harder to reason about because browser state, PeerJS state, and render state will obscure whether command authority is correct.

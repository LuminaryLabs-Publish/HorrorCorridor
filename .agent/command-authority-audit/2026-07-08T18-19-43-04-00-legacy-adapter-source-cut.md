# HorrorCorridor Legacy Adapter Source Cut

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T18-19-43-04-00`

## Purpose

Define the safest source cut for adding command results without breaking current `GameState`-returning call sites.

## Current source facts

```txt
interactionRules.ts
  -> pickUpCube(state, input): GameState
  -> dropCube(state, input): GameState
  -> placeCubeAtEndAnomaly(state, input): GameState
  -> removeCubeFromEndAnomaly(state, input): GameState

networkRules.ts
  -> syncHeldCubesToPlayers(state): GameState
  -> applyNetworkPlayerUpdate(state, input): GameState
  -> applyNetworkInteractionRequest(state, input): GameState

GameCanvas.tsx
  -> calls applyNetworkInteractionRequest directly
  -> calls applyNetworkPlayerUpdate directly
  -> uses nextState === currentGameState to skip local publishing
  -> host path still publishes after TRY_INTERACT even when rule result may be unchanged

runtimeDebugStore.ts
  -> exports frames and events
  -> does not expose command result or publish decision metadata
```

## Legacy adapter rule

Keep existing exports stable until the fixture passes.

```txt
new result-returning function
  -> command result
  -> legacy adapter returns result.state
  -> existing GameCanvas behavior remains compatible
```

## Required source files

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Required adapter pattern

```txt
pickUpCubeResult(state, input, envelope): CommandResult
pickUpCube(state, input): GameState = pickUpCubeResult(...).state

dropCubeResult(state, input, envelope): CommandResult
dropCube(state, input): GameState = dropCubeResult(...).state

applyNetworkInteractionRequestResult(state, input, envelope): CommandResult
applyNetworkInteractionRequest(state, input): GameState = applyNetworkInteractionRequestResult(...).state
```

## Required publish-decision contract

```txt
accepted changed -> publish
accepted unchanged -> no-op
rejected -> skip
unchanged -> skip or no-op by helper type
publish-only -> recovery
skipped -> skip
victory -> victory
```

## Consumer cutover sequence

```txt
1. Add result contracts.
2. Add preflight reason catalog.
3. Add interaction result wrappers while preserving legacy returns.
4. Add network result wrappers while preserving legacy returns.
5. Add local and host consumer helpers.
6. Add DOM-free fixture rows.
7. Add runtime debug result projection.
8. Only then rewire GameCanvas to consume publish decisions.
```

## Stop rule

Do not change renderer, minimap, PeerJS transport shape, app route shape, or scene dressing in the same source pass.

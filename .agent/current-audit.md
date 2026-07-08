# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T02:19:36-04:00`

## Summary

`HorrorCorridor` is a playable cooperative first-person horror maze, but its authority seam is still too implicit.

The source has real runtime services already: session flow, seeded maze bootstrap, first-person input, cube interaction, ordered anomaly victory, host/client sync, ooze cadence, Three.js rendering, minimap, and debug frames.

The next architecture improvement should not start with visuals. It should first make every local and network command produce a stable `CommandResult`, rejection reason, publish decision, and fixture-replay record.

## Repo selection

The full installed `LuminaryLabs-Publish` repo list was checked during this pass.

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

`TheCavalryOfRome` remains excluded by standing rule.

Central ledger search showed tracked entries for the eligible Publish repos, including `HorrorCorridor`, `AetherVale`, `TheOpenAbove`, `PhantomCommand`, `PrehistoricRush`, `ZombieOrchard`, `IntoTheMeadow`, `MyCozyIsland`, and `TheUnmappedHouse`.

Because no new untracked eligible repo was found in this pass, this run fell back to the oldest eligible tracked repo rule and selected `HorrorCorridor`.

## Evidence checked

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Publish/HorrorCorridor:.agent/README.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
LuminaryLabs-Publish/HorrorCorridor:.agent/trackers/2026-07-07T21-18-45-04-00/project-breakdown.md
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/package.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/components/game/GameCanvas.tsx
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
```

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas runtime
-> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, and debug state
-> enter pointer-lock first-person navigation
-> derive interact action from distance-to-end and carried-cube state
-> pickup, drop, place, or remove cube
-> ordered sequence validates anomaly completion
-> ooze cadence advances on host/local authority ticks
-> authoritative snapshot is built and published
-> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Current authority loop

```txt
client PLAYER_UPDATE
-> host applyNetworkPlayerUpdate
-> GameState returned
-> host publishes resync snapshot

client TRY_INTERACT
-> host applyNetworkInteractionRequest
-> interaction rule returns GameState only
-> rejected/invalid commands often return unchanged state without reason metadata
-> host syncs carried cubes
-> host publishes resync or recovery snapshot

local solo/host interact
-> local applyNetworkInteractionRequest
-> if nextState identity equals currentGameState, return silently
-> otherwise publish resync snapshot
```

## Current source-backed services

```txt
app/session service
peer sync service
maze bootstrap service
first-person player service
interaction rule service
ooze cadence service
snapshot build/publish service
runtime debug frame/event service
render service
minimap service
validation/harness service
object/texture kit catalog service
```

## Current risk

The runtime can play, render, sync, and complete, but command authority is still not fixture-safe.

Rejected commands are not distinguishable from no-op commands.

Host publishing does not yet use command result metadata.

Runtime debug does not yet expose latest command result, rejection reason, publish decision, journal counts, or fixture parity.

## Current next slice

```txt
HorrorCorridor Command Reason Catalog + Result Journal Fixture Gate
```

This should happen before PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, or object-kit visual expansion.
# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T05:00:17-04:00`

## Summary

`HorrorCorridor` is a playable cooperative first-person horror maze, but its authority seam is still too implicit for safe host/client parity claims.

The source already has real runtime services: session flow, seeded maze bootstrap, first-person input, cube interaction, ordered anomaly victory, host/client sync, ooze cadence, Three.js rendering, minimap, runtime debug frames/events, and validation scripts.

This pass did not change runtime code. It sharpened the next implementation target into a **Command Result Fixture Gate** that can prove accepted, rejected, unchanged, publish-only, skipped, and victory command paths without DOM, PeerJS, or renderer ownership.

## Repo selection

The full installed `LuminaryLabs-Publish` repo list was checked during this pass.

```txt
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/TheUnmappedHouse
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PrehistoricRush
```

`TheCavalryOfRome` remains excluded by standing rule.

Central ledger search showed tracked entries for the eligible Publish repos, including `HorrorCorridor`, `AetherVale`, `TheOpenAbove`, `PhantomCommand`, `PrehistoricRush`, `ZombieOrchard`, `IntoTheMeadow`, `MyCozyIsland`, and `TheUnmappedHouse`.

Root `.agent/START_HERE.md` state was present for the eligible checked repos.

Because no new untracked eligible repo was found in this pass, this run fell back to the oldest eligible tracked repo rule and selected `HorrorCorridor` for a command-result fixture gate follow-up breakdown.

## Evidence checked

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/next-steps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/validation.md
LuminaryLabs-Publish/HorrorCorridor:.agent/command-authority-audit/result-reason-matrix.md
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/package.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas runtime
-> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, and debug state
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

## Target authority loop

```txt
input or peer message
-> CommandEnvelope
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> RuntimeDebug result projection
-> DOM-free fixture replay
-> final snapshot parity comparison
```

## Current source-backed services

```txt
app/session service
peer sync service
maze bootstrap service
first-person player service
interaction preflight service
command result envelope service
publish decision service
diagnostics and replay service
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

## Follow-up artifact added

```txt
.agent/command-authority-audit/fixture-gate-implementation-map.md
.agent/trackers/2026-07-08T05-00-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-00-17-04-00.md
```

## Current next slice

```txt
HorrorCorridor Command Result Fixture Gate
```

This should happen before PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, scene dressing, object-kit visual expansion, or new level content.

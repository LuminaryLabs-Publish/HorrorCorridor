# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T07:01:54-04:00`

## Summary

`HorrorCorridor` is a playable cooperative first-person horror maze, but its command authority seam is still too implicit for safe host/client parity claims.

The source already has real runtime services: session flow, seeded maze bootstrap, first-person input, cube interaction, ordered anomaly victory, host/client sync, ooze cadence, Three.js rendering, minimap, runtime debug frames/events, and validation scripts.

This pass did not change runtime code. It updated the repo-local `.agent` state and added a publish-decision routing matrix so the next source pass can prove whether each command result should publish, skip, recover, no-op, or complete victory.

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

Central ledger/search state showed tracked entries for the eligible Publish repos. Root `.agent/START_HERE.md` state was present for the eligible checked repos.

Because no new untracked eligible repo was found in this pass, this run selected `HorrorCorridor` as a high-value tracked follow-up. The command-result acceptance ledger existed, but result-to-publish routing still needed a dedicated matrix before implementation.

## Evidence checked

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:repo-checks/reports/status-summary.json
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/next-steps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/known-gaps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/validation.md
LuminaryLabs-Publish/HorrorCorridor:.agent/command-authority-audit/command-result-fixture-acceptance-ledger.md
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
-> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, and debug state
-> enter pointer-lock first-person navigation
-> derive interact action from distance-to-end and carried-cube state
-> pickup, drop, place, or remove cube
-> ordered sequence validates anomaly completion
-> ooze cadence advances on host/local authority ticks
-> authoritative snapshot is built and published or skipped
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

`request-sync` is not represented as a publish-only recovery command.

`toggle-ready`, `cancel`, and default network actions are not represented as skipped commands.

Victory is a state mutation but still needs explicit command-result and publish-decision status.

Host publishing does not yet use command result metadata.

Runtime debug does not yet expose latest command result, rejection reason, publish decision, journal counts, or fixture parity.

## Follow-up artifact added

```txt
.agent/command-authority-audit/publish-decision-routing-matrix.md
.agent/trackers/2026-07-08T07-01-54-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T07-01-54-04-00.md
```

## Current next slice

```txt
HorrorCorridor Command Result Fixture Gate: Publish Decision Routing Matrix Implementation
```

This should happen before PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, scene dressing, object-kit visual expansion, or new level content.

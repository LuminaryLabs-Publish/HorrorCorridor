# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-10T08-11-35-04-00`

## Summary

`HorrorCorridor` is a playable Next/React cooperative first-person maze with solo, host, and join flows, PeerJS transport, Three.js rendering, minimap rendering, runtime debug export, and validation scripts.

This pass refreshed repo-local `.agent` docs and central tracking around the next proof cut: command debug projection, publish-decision rows, runtime debug readback, and a DOM-free command fixture matrix.

No runtime source changed in this pass.

## Repo selection

```txt
LuminaryLabs-Publish/HorrorCorridor       selected / prior central latest 2026-07-10T06-48-54-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T06-59-18-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T07-08-10-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T07-20-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T07-29-12-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T07-41-42-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T07-50-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T07-59-27-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Evidence checked

```txt
current public LuminaryLabs-Publish repository list
central LuminaryLabs-Dev/LuminaryLabs Publish ledger entries
HorrorCorridor repo-local agent state
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create room, join room, or solo identity
-> complete loading/readiness gates
-> mount GameCanvas runtime
-> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, cadence, and debug state
-> enter pointer-lock first-person navigation
-> derive interact action from distance-to-end and carried-cube state
-> pickup, drop, place, or remove cube through GameState-returning rules
-> unchanged nextState returns silently in local authority path
-> client sends TRY_INTERACT to host
-> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
-> host publishes resync/recovery with implicit reason strings
-> ordered sequence validates anomaly completion
-> ooze cadence advances on host/local authority ticks
-> authoritative snapshot is built and published or skipped by implicit runtime logic
-> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Main finding

The runtime can play, render, sync, advance ooze, and complete, but command authority is still not fixture-safe.

Rejected, skipped, publish-only, unchanged, recovery, ooze, and victory commands are not first-class result records yet. Runtime debug frames expose useful frame and snapshot facts, but not command causes, publish decisions, rejection reasons, journal counters, or fixture parity.

## Next safe ledge

```txt
HorrorCorridor Command Debug Projection Ledger Refresh + Result Fixture Gate
```

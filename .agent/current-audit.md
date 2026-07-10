# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-10T05-11-51-04-00`

## Summary

`HorrorCorridor` is a playable Next/React cooperative first-person maze with solo, host, and join flows, PeerJS transport, Three.js rendering, minimap rendering, runtime debug export, and validation scripts.

This pass refreshed repo-local `.agent` docs and central tracking around the next proof cut: command-result publish readback, publish-decision classification, runtime debug command projection, and a result-first command fixture.

No runtime source changed in this pass.

## Repo selection

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T04-58-56-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T04-50-40-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T04-40-52-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T04-29-10-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T04-22-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T04-11-36-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T03-59-57-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / oldest eligible fallback / prior central latest 2026-07-10T03-49-48-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Evidence checked

```txt
current public LuminaryLabs-Publish repository list
central LuminaryLabs-Dev/LuminaryLabs Publish ledger entries
sampled root .agent state for public non-Cavalry repos
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/game-state/domain/gameTypes.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/features/networking/protocol/messageTypes.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
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

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
session-lifecycle
peer-networking
host-transport
client-transport
network-message-protocol
replicated-snapshot-protocol
seeded-maze-bootstrap
maze-cell-lookup
cube-spawn-bootstrap
anomaly-sequence-bootstrap
sequence-slot-authority
ordered-sequence-validation
victory-completion
first-person-input
pointer-lock-control
keyboard-input
mouse-look-input
player-view-angles
player-movement-integration
maze-collision-resolution
camera-bob
local-pose-prediction
local-carry-state-sync
host-authority
local-authoritative-simulation
legacy-game-state-interaction-rules
legacy-game-state-network-rules
legacy-game-state-ooze-rules
legacy-game-state-win-rules
ooze-cadence
ooze-decay-and-spawn
runtime-debug-frame-store
runtime-debug-event-store
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
command-envelope-contract
command-reason-catalog
command-result-contract
publish-decision-snapshot
command-result-journal
interaction-preflight-diagnostics
network-command-preflight-diagnostics
ooze-result-diagnostics
win-result-diagnostics
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
command-replay-fixture
central-ledger-synchronization
```

## Main finding

The runtime can play, render, sync, advance ooze, and complete, but command authority is still not fixture-safe.

Rejected, skipped, publish-only, unchanged, recovery, ooze, and victory commands are not first-class result records yet. Runtime debug frames expose useful frame and snapshot facts, but not command causes, publish decisions, rejection reasons, or command journal counts.

## Next safe ledge

```txt
HorrorCorridor Command Result Publish Readback Refresh + Result-First Fixture Gate
```

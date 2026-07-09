# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-09T16-00-13-04-00`

## Summary

`HorrorCorridor` is a playable Next/React cooperative first-person maze with solo, host, and join flows, PeerJS transport, Three.js rendering, minimap rendering, runtime debug export, and validation scripts.

The repo-local `.agent` state was newer than the central ledger, so this pass repairs the ledger/readback pointers while preserving the same implementation finding: command authority is still the next durable source cut.

No runtime source changed in this pass.

## Repo selection

```txt
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00 before this update / repo-local latest 2026-07-09T15-56-42-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
```

No new untracked eligible repo was found. `HorrorCorridor` was selected because repo-local `.agent` documentation had advanced beyond the central ledger, and it remained the oldest eligible central-ledger/readback repair target among checked non-Cavalry repositories.

## Evidence checked

```txt
LuminaryLabs-Publish repository installation list
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/AetherVale.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/PrehistoricRush.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/next-steps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/known-gaps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/validation.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
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
-> ordered sequence validates anomaly completion
-> ooze cadence advances on host/local authority ticks
-> authoritative snapshot is built and published or skipped by implicit runtime logic
-> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Current authority loop

```txt
local solo/host interact
-> GameCanvas derives action string
-> applyNetworkInteractionRequest returns GameState only
-> if nextState === currentGameState, GameCanvas returns silently
-> otherwise syncHeldCubesToPlayers
-> publishAuthoritativeState('resync')
-> commitVictory if gameState === 'victory'

client TRY_INTERACT
-> host applies applyNetworkInteractionRequest
-> rejected/invalid commands can collapse to unchanged GameState
-> host publishes resync/recovery based on event action, not a result record
-> host needs decision metadata for publish, skip, recovery, and victory

client PLAYER_UPDATE
-> host applies applyNetworkPlayerUpdate
-> missing-player and no-diff paths need explicit result metadata
```

## Target authority loop

```txt
seeded fixture state
-> CommandEnvelope
-> CommandReason catalog
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
-> RuntimeDebugCommandProjection
-> publishAuthoritativeState only from explicit decision
-> final replicated snapshot summary
-> DOM-free fixture replay parity
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
ooze-cadence
command-envelope-contract
command-reason-catalog
command-result-contract
publish-decision-snapshot
command-result-journal
interaction-preflight-diagnostics
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
command-replay-fixture
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
static-smoke-validation
live-player-validation
replay-parity-validation
central-ledger-synchronization
```

## Services in use

```txt
app/session service: mode, room, readiness, pause, completion
peer sync service: host/client transport, full sync, player update, try interact
maze bootstrap service: seed, maze generation, cell lookup, path build, cube spawn, sequence slots
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy GameState interaction service: pickup, drop, place, remove, ordered completion
legacy GameState network service: player update, held-cube sync, interaction dispatch, request-sync no-op
command fixture seed service: planned canonical GameState seeds and expected row facts
command result envelope service: planned command id, source, status, reason, changed flag, events, diagnostics, legacy adapters
publish decision service: planned publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag
local authority result consumer service: planned local result journal and publish/skip behavior
host authority result consumer service: planned host result journal, request-sync recovery, rejected TRY_INTERACT skip, and accepted/victory publish behavior
diagnostics and replay service: runtime events, runtime frames, cadence, planned command readback, fixture parity
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
central ledger sync service: repo-local tracker, root .agent pointer, central repo-ledger, internal change log
```

## Kits identified

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
mesh-object-kit-catalog
procedural-texture-kit-family
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
command-decision-contract-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-command-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-sync-kit
```

## Current risk

The runtime can play, render, sync, and complete, but command authority is still not fixture-safe.

Rejected, skipped, publish-only, unchanged, recovery, and victory commands are not first-class result records yet.

## Next safe ledge

```txt
HorrorCorridor Command Result Ledger Readback Repair + Result-First Fixture Gate
```

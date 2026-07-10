# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T00-18-38-04-00`

**Mode:** documentation-only repo breakdown

## Selection result

`HorrorCorridor` was selected after comparing the current public `LuminaryLabs-Publish` repo list with central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

No checked public non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`TheCavalryOfRome` remained excluded by rule.

`HorrorCorridor` was the oldest eligible central-ledger fallback at `2026-07-09T22-50-53-04-00` after the `IntoTheMeadow` ledger had advanced to `2026-07-10T00-09-51-04-00`.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T23-58-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T23-51-04-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T23-41-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T23-28-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T23-20-43-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T00-09-51-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T23-02-05-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / oldest eligible central-ledger fallback / central latest 2026-07-09T22-50-53-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Evidence checked

```txt
public LuminaryLabs-Publish GitHub repository page
LuminaryLabs-Dev/LuminaryLabs repo-ledger entries
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> pointer-lock first-person navigation
  -> keyboard/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried-cube state and anomaly distance
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged nextState returns silently
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default collapse to unchanged state
  -> sync held cubes to players
  -> ooze cadence advances through GameState-returning rules
  -> ordered sequence completion validates victory through GameState-returning rules
  -> publish authoritative snapshot through implicit reason string
  -> update Three world, minimap, HUD, completion route, and runtime debug frame
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
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
command-replay-fixture
central-ledger-synchronization
```

## Services the kits offer

```txt
app/session service: mode, room identity, join code, player identity, readiness, pause/resume, completion routing
peer sync service: host/client transport, full sync, player update, try interact, request-sync recovery path
maze bootstrap service: seed, grid, cell lookup, path build, cube spawn, target sequence, initial snapshot
first-person player service: keyboard input, pointer lock, mouse look, movement, collision, camera sync, local carry state
legacy interaction service: pickup, drop, place, remove, ordered completion, GameState-only returns
legacy network service: player update, held cube sync, interaction dispatch, request-sync/toggle-ready/cancel/default no-op, GameState-only returns
ooze service: decay, spawn, spacing guard, max count, GameState-only returns
win service: ordered slot evaluation, victory transition, victory rollback if slots change, GameState-only returns
runtime debug service: event capture, frame capture, cadence readback, snapshot readback, debug window export
render service: renderer, camera, scene, post-processing, maze world, minimap, scene dressing, disposal
planned command-result service: command result, reason, publish decision, journal, fixture, local/host consumer, debug projection
central ledger sync service: repo-local tracker, root .agent pointers, central repo ledger, internal change log
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
command-source-policy-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
network-command-preflight-kit
ooze-result-rules-kit
win-result-rules-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-command-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-sync-kit
```

## Main finding

`HorrorCorridor` is playable and render-stable, but command authority remains result-poor.

`interactionRules.ts`, `networkRules.ts`, `oozeRules.ts`, and `winRules.ts` still return `GameState` only.

Invalid and no-op paths silently return unchanged state without stable reason metadata.

`GameCanvas.tsx` still uses object identity and implicit publish reasons to decide local publish, host publish, recovery, and victory behavior.

`runtimeDebugStore.ts` exports frames/events but does not expose latest command result, publish decision, rejection reason, consumer action, journal counters, or fixture parity.

## Next safe ledge

```txt
HorrorCorridor Command Result Debug Readback Catch-up + Result-First Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
node scripts/horror-corridor-command-fixture.mjs: not run because fixture does not exist yet
browser smoke: not run
live host/client validation: not run
pushed to main: yes, documentation only
central ledger updated: yes
```

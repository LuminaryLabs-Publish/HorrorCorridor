# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run timestamp:** `2026-07-09T18-30-30-04-00`

## Selection result

The current public `LuminaryLabs-Publish` repository list was compared against `LuminaryLabs-Dev/LuminaryLabs` central ledger state and sampled root `.agent/START_HERE.md` state.

No checked public non-Cavalry repo was new, missing from central tracking, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest eligible documented fallback among checked public non-Cavalry repos. Its central ledger was at `2026-07-09T16-00-13-04-00`, older than the other checked eligible public entries.

## Public Publish repos observed

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T17-48-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T16-58-52-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T16-38-14-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T16-29-23-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / oldest eligible documented fallback / central latest 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T18-11-58-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T18-20-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T17-58-53-04-00
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, cadence, and debug state
  -> pointer-lock first-person navigation
  -> keyboard/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried-cube state and distance to anomaly
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged state returns silently on local path
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default collapse to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
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
command-result-envelope
publish-decision-snapshot
command-result-journal
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
central-ledger-synchronization
```

## Kit services

```txt
app/session service: mode, room identity, join code, player identity, readiness, pause/resume, completion routing
peer sync service: host/client transport, full sync, player update, try interact, request-sync recovery path
maze bootstrap service: seed, grid, cell lookup, pathing, cube spawns, target sequence, initial replicated snapshot
first-person player service: keyboard input, pointer lock, mouse look, movement, collision, camera sync, local carry state
legacy interaction service: pickup, drop, place, remove, ordered completion, all returning GameState only
legacy network service: player update, held-cube sync, interaction dispatch, request-sync/toggle-ready/cancel/default no-op, all returning GameState only
ooze service: decay, spawn, no-state-diff, max count, spacing guard
runtime debug service: event capture, frame capture, cadence readback, snapshot readback, debug window export
render service: renderer, camera, scene, post-processing, maze world, minimap, scene dressing, disposal
validation service: lint, proto-kit smoke, headless harness, live-player harness, object-kit review
planned command-result service: command result, reason, publish decision, journal, fixture, local/host consumer, debug projection
central ledger sync service: repo-local tracker, root .agent pointer, central repo ledger, internal change log
```

## Kits identified

### Implemented / current kits

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
```

### Planned next-cut kits

```txt
command-envelope-contract-kit
command-source-policy-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
network-command-preflight-kit
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

`HorrorCorridor` should not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.

The durable blocker is command consumer readback. `interactionRules.ts` and `networkRules.ts` still return `GameState` only, invalid/no-op paths collapse into unchanged state without reason metadata, `GameCanvas.tsx` decides publish/no-op/victory through object identity and implicit strings, and `runtimeDebugStore.ts` has no latest command result or publish decision projection.

## Next safe ledge

```txt
HorrorCorridor Command Consumer Readback Ledger Refresh + Result-First Fixture Gate
```

## Validation

This was a documentation-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run lint: not run
browser smoke: not run
command fixture: not run because fixture files do not exist yet
pushed to main: yes, docs only
```

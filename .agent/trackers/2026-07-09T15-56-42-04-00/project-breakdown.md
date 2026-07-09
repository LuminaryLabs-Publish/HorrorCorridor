# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run timestamp:** `2026-07-09T15-56-42-04-00`

**Selected repo:** `LuminaryLabs-Publish/HorrorCorridor`

## Selection decision

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled repo-local `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, missing from the central ledger, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest eligible documented-selection fallback. At selection time, the central ledger showed `HorrorCorridor` at `2026-07-09T12-30-09-04-00`, older than the other checked eligible repos.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T15-20-00-04-00
```

## Current product read

`HorrorCorridor` is a playable cooperative first-person maze under `HorrorCorridor-V1`.

The runtime uses Next, React, Three.js, Zustand, PeerJS, TypeScript, seeded maze state, pointer-lock first-person motion, cube pickup/drop/place/remove interaction rules, ordered anomaly sequence completion, ooze cadence, host/client replication, minimap rendering, runtime debug export, and validation scripts.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> create renderer, scene, camera, post-processing, maze world, minimap, stores, local pose refs, input refs, cadence, and runtime debug state
  -> enter pointer-lock first-person navigation
  -> keyboard/mouse input mutates local pose and view angles
  -> interact key derives pickup/drop/place/remove from distance-to-end and carried-cube state
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> local unchanged result silently returns when nextState === currentGameState
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> host publishes resync/recovery through implicit reason strings
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
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
runtime-debug-frame-store
runtime-debug-event-store
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
static-smoke-validation
live-player-validation
central-ledger-synchronization
command-envelope-contract
command-source-policy
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
```

## Services in use

```txt
app/session service: mode, room identity, join code, player identity, readiness, pause/resume, completion routing
peer sync service: host/client transport, full sync, player update, try interact, request-sync recovery path
maze bootstrap service: seed, grid, cell lookup, pathing, cube spawns, target sequence, initial replicated snapshot
first-person player service: keyboard input, pointer lock, mouse look, movement, collision, camera sync, local carry state
legacy GameState interaction service: pickup, drop, place, remove, ordered completion
legacy GameState network service: player update, held-cube sync, interaction dispatch, request-sync/toggle-ready/cancel/default no-op
runtime debug service: event capture, frame capture, cadence readback, snapshot readback, debug window export
render service: renderer, camera, scene, post-processing, maze world, minimap, scene dressing, disposal
validation service: lint, proto-kit smoke, headless harness, live-player harness, object-kit review
command fixture seed service: canonical seed states and expected row facts
command envelope service: command id, source, player id, action, payload, timestamp policy, fixture normalization
command reason service: stable accepted/rejected/unchanged/skipped/publish-only/victory reason catalog
command result service: before summary, after summary, changed flag, events, diagnostics, legacy state adapter
publish decision service: publish, skip, no-op, recovery, victory, broadcast flag, snapshot reason, completion flag
local authority consumer service: local journal, rejected/no-op skip, accepted changed publish, victory commit
host authority consumer service: PLAYER_UPDATE result, TRY_INTERACT result, request-sync recovery, skipped broadcast policy
runtime command projection service: latest command result, latest publish decision, latest rejection reason, journal counters, fixture parity
DOM-free replay service: deterministic fixture matrix, volatile normalization, snapshot parity proof
central ledger sync service: repo-local tracker, root .agent pointer, central repo ledger, internal change log
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

`HorrorCorridor` is playable and render-stable, but command authority is still result-poor. `interactionRules.ts` returns only `GameState`, `networkRules.ts` collapses control messages and invalid paths into unchanged state, and `GameCanvas.tsx` uses object identity and implicit reason strings as publish gates.

The next implementation should not begin with renderer extraction, PeerJS extraction, minimap extraction, new object kits, or visual dressing. It should first add source-owned command result contracts, reason codes, publish decisions, local/host consumers, runtime debug command projection, and a DOM-free fixture runner.

## Next safe ledge

```txt
HorrorCorridor Command Result Journal Readback Refresh + Result-First Fixture Gate
```

## Validation state

This was a documentation-only breakdown. Runtime source was not changed. No local npm command, browser smoke, live-player validation, or multiplayer validation was run in this pass.

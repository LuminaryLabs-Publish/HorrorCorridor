# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-09T12-20-08-04-00`

**Repo:** `LuminaryLabs-Publish/HorrorCorridor`

**Run type:** documentation-only breakdown.

## Plan ledger

**Goal:** Compare Publish repo tracking, select one eligible repo, update root `.agent` documentation, identify interaction loop/domains/services/kits, and sync the central LuminaryLabs ledger.

**Checklist**

```txt
[x] Read accessible LuminaryLabs-Publish repo list.
[x] Excluded TheCavalryOfRome.
[x] Sampled root .agent/START_HERE.md state for checked non-Cavalry Publish repos.
[x] Compared sampled repo state against central LuminaryLabs-Dev/LuminaryLabs tracking.
[x] Selected one repo only: HorrorCorridor.
[x] Read HorrorCorridor .agent state.
[x] Read package scripts.
[x] Read GameCanvas runtime/authority/render loop.
[x] Read interactionRules silent no-op branches.
[x] Read networkRules GameState-returning authority seam.
[x] Read runtimeDebugStore export surface.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented and planned kits.
[x] Updated required root .agent docs.
[x] Added architecture, render, gameplay, command-authority, interaction, and deploy audits.
[x] Added timestamped tracker and turn ledger.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Did not edit runtime source.
[ ] Did not run local/browser validation.
```

## Selection result

No checked non-Cavalry repo was new, ledger-absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`HorrorCorridor` was selected as the oldest eligible sampled fallback.

## Publish repos observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / latest sampled 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / latest sampled 2026-07-09T10-10-32-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / latest sampled 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / latest sampled 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / latest sampled 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / latest sampled 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / latest sampled 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / latest sampled 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / latest sampled 2026-07-09T12-00-36-04-00
```

## Interaction loop

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
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> local path silently returns when nextState === currentGameState
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default paths collapse to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot by implicit reason string
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
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

## Services that kits offer

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

## Main finding

`HorrorCorridor` should not receive renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion next.

The durable blocker is command result authority. Silent no-op branches and implicit publish decisions need source-owned result records, publish-decision records, command journals, runtime debug command projection, and DOM-free fixture rows.

## Next safe ledge

```txt
HorrorCorridor Result-First Command Readback Ledger Refresh + Fixture Gate
```

## Validation

Documentation only.

Runtime source was not changed.

No branch or PR was created.

No local install, lint, fixture, harness, browser, or multiplayer validation was run.

# Project Breakdown — HorrorCorridor

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T16-00-13-04-00`

## Selection

The full accessible `LuminaryLabs-Publish` repository installation list was reviewed.

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded.

No checked non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`HorrorCorridor` was selected because repo-local `.agent` state had advanced to `2026-07-09T15-56-42-04-00`, while `LuminaryLabs-Dev/LuminaryLabs` still tracked the repo at `2026-07-09T12-30-09-04-00` before this run.

## Repos compared

```txt
LuminaryLabs-Publish/HorrorCorridor       selected / central-readback repair target
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
```

## Interaction loop

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
  -> request-sync/toggle-ready/cancel/default collapse to unchanged state
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot through implicit reason string
  -> renderer, minimap, HUD, completion route, and runtime debug consume latest snapshot
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

## Services the kits offer

```txt
corridor-session-domain-kit: mode selection, room identity, readiness, pause/completion routing
peer-room-sync-domain-kit: host/client transport, full sync, player update, try interact
maze-snapshot-bootstrap-kit: maze snapshot, cell lookup, cube spawn, sequence slot bootstrap
first-person-corridor-player-kit: input, pointer lock, look delta, movement, collision, camera pose
corridor-interaction-domain-kit: pickup, drop, place, remove
ordered-anomaly-sequence-kit: sequence slots, ordered color validation, victory state
ooze-trail-domain-kit: ooze cadence, spawn, decay, spacing guard
corridor-render-world-kit: Three world render objects and snapshot consumption
corridor-minimap-kit: minimap draw and snapshot projection
runtime-debug-frame-kit: frame/event capture and debug export
command-envelope-contract-kit: planned command id/source/player/action/payload envelope
command-reason-catalog-kit: planned accepted/rejected/skipped/unchanged/publish-only reasons
command-result-envelope-kit: planned before/after state, changed flag, events, diagnostics, legacy adapter
publish-decision-snapshot-kit: planned publish/skip/recovery/no-op/victory classification
local-authority-result-consumer-kit: planned local result journal and publish/skip decisions
host-authority-result-consumer-kit: planned host result journal, recovery, rejected TRY_INTERACT skip, victory publish
runtime-debug-command-projection-kit: planned latest result, latest decision, command journal counts
command-result-fixture-matrix-kit: planned accepted/rejected/unchanged/skipped/publish-only/victory rows
command-replay-fixture-kit: planned DOM-free replay and snapshot parity proof
central-ledger-sync-kit: repo-local tracker, root .agent pointer, central repo-ledger, internal change log
```

## Kits

### Implemented source-backed kits

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

`HorrorCorridor` should not start with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.

The durable blocker is command-result authority: `interactionRules.ts` and `networkRules.ts` still return `GameState` only; invalid branches silently return unchanged state; `GameCanvas.tsx` still decides publish/skip/victory from object identity and implicit reason strings; runtime debug still lacks command-result/publish-decision projection.

## Next safe ledge

```txt
HorrorCorridor Command Result Ledger Readback Repair + Result-First Fixture Gate
```

## Validation

```txt
[done] Read Publish org repo list through GitHub installation list.
[done] Read central LuminaryLabs ledger state.
[done] Read HorrorCorridor root .agent state.
[done] Read package validation scripts.
[done] Read GameCanvas runtime authority path.
[done] Read interactionRules silent no-op branches.
[done] Read networkRules request-sync/toggle-ready/cancel/default no-op path.
[done] Read runtimeDebugStore current export shape.
[not-run] Runtime source edit.
[not-run] npm run lint.
[not-run] node scripts/horror-corridor-command-fixture.mjs, because it does not exist yet.
[not-run] Browser route validation.
[not-run] Live host/client validation.
```

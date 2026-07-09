# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run timestamp:** `2026-07-09T12-30-09-04-00`

## Selection result

The accessible `LuminaryLabs-Publish` organization repository list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, missing from central tracking, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

`HorrorCorridor` was selected because it was the oldest eligible central-ledger repair target. The central ledger still pointed to `2026-07-09T10-10-32-04-00`, while repo-local docs had already advanced to `2026-07-09T12-25-39-04-00`.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / central latest 2026-07-09T10-10-32-04-00 / repo-local latest 2026-07-09T12-25-39-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The active app is a Next/React client runtime with Three.js, Zustand, PeerJS, TypeScript, solo/host/client modes, seeded maze state, cube pickup/drop/place/remove rules, ordered anomaly completion, ooze cadence, minimap rendering, runtime debug frames/events, and host-authored replicated snapshots.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and runtime debug state
  -> enter pointer-lock first-person navigation
  -> keyboard/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried-cube state and distance to anomaly
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged local result silently returns when nextState === currentGameState
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default actions collapse to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot through implicit reason string
  -> renderer, minimap, HUD, completion route, and runtime debug frames consume the latest snapshot
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
app/session service: mode, room, readiness, pause, completion routing
peer sync service: host/client transport, full sync, player update, try interact, request-sync recovery
maze bootstrap service: seed, maze generation, cell lookup, path build, cube spawn, sequence slots
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy GameState interaction service: pickup, drop, place, remove, ordered completion
legacy GameState network service: player update, held-cube sync, interaction dispatch, request-sync no-op
command envelope service: planned command id/source/player/action payload normalization
command reason catalog service: planned reason codes for rejected, unchanged, skipped, publish-only, and victory branches
command result envelope service: planned before/after state, changed flag, status, reason, events, diagnostics, legacy adapters
publish decision service: planned publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag
local authority consumer service: planned local result journal, rejected/no-op skip, accepted/victory publish
host authority consumer service: planned host result journal, TRY_INTERACT rejection skip, request-sync recovery, accepted/victory publish
runtime debug projection service: planned latest command result, publish decision, consumer action, and journal counters
diagnostics and replay service: runtime events, runtime frames, command readback, journal counters, fixture parity
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

`HorrorCorridor` should not start the next implementation by extracting PeerJS, extracting renderer/minimap/post-processing, adding maze content, or expanding object/texture kits.

The immediate blocker is still command authority proof. `interactionRules.ts` and `networkRules.ts` return `GameState` only; rejected, skipped, unchanged, recovery, publish-only, and victory outcomes are not first-class `CommandResult` rows; `GameCanvas.tsx` still decides publish/no-op/victory by object identity and implicit reason strings.

## Next safe ledge

```txt
HorrorCorridor Command Result Central Ledger Repair + Result-First Source Fixture Gate
```

## Validation in this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
npm run lint: no
npm run smoke:protokits: no
npm run harness:horror-corridor: no
node scripts/horror-corridor-command-fixture.mjs: not run; script does not exist yet
browser smoke: no
pushed to main: yes
```

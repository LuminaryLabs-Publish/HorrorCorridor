# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T01-09-24-04-00`

## Selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the central tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs`.

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor      selected / central ledger stale at 2026-07-08T22-51-43-04-00 while repo-local .agent already showed 2026-07-09T01-00-22-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-08T23-19-33-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-09T00-09-22-04-00
```

No checked non-Cavalry repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected because its repo-local `.agent` state had advanced beyond the central `LuminaryLabs` ledger, making it the highest-priority documentation consistency gap before the fallback rotation continues.

## Product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The runtime is a Next/React client surface that mounts `GameCanvas`, creates a Three.js maze world, uses pointer-lock movement, syncs via solo/host/client session modes, routes cube interactions through `GameState`-returning rules, publishes replicated snapshots, and exposes runtime debug frames/events.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, stores, cadence state, transport, and debug state
  -> enter pointer-lock first-person navigation
  -> derive interact action from distance-to-end and carried-cube state
  -> client sends PLAYER_UPDATE and TRY_INTERACT, or local solo/host applies interaction directly
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning network rules
  -> pickup/drop/place/remove mutates cube and sequence state when accepted
  -> rejected/no-op branches collapse to unchanged GameState
  -> ooze and ordered sequence validation advance as inline authority side effects
  -> publishAuthoritativeState broadcasts snapshots from implicit reason strings
  -> renderer, minimap, HUD, completion routing, and runtime debug consume latest snapshot
```

## Target interaction loop

```txt
canonical fixture seed state
  -> CommandEnvelope
  -> InteractionPreflightResult or NetworkCommandPreflightResult
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityResultConsumer or HostAuthorityResultConsumer
  -> RuntimeDebugCommandProjection
  -> GameCanvas consumes publish/victory/recovery/skip decisions
  -> DOM-free replay fixture proves snapshot parity
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
session-lifecycle
room-identity
peer-identity
peer-networking
host-transport
client-transport
network-message-protocol
replicated-snapshot-protocol
full-sync-output
request-sync-recovery
seeded-maze-bootstrap
maze-cell-lookup
maze-pathing
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
remote-authoritative-ingress
legacy-game-state-interaction-rules
legacy-game-state-network-rules
command-envelope-contract
command-reason-catalog
command-result-contract
command-decision-contract
publish-decision-snapshot
command-result-journal
interaction-preflight-diagnostics
player-pose-command-result
interaction-command-result
ooze-command-result
request-sync-command-result
ready-cancel-command-result
victory-command-result
command-seed-state-fixture
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
mesh-object-kit-catalog
procedural-texture-kit-family
static-smoke-validation
live-player-validation
replay-parity-validation
central-ledger-synchronization
```

## Services the kits offer

```txt
app/session service: mode selection, room identity, readiness, pause, completion routing
peer sync service: host/client transport, full sync, player update, try interact, request sync recovery
maze bootstrap service: seed, maze generation, cell lookup, path build, cube spawn, sequence slots
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy interaction service: pickup, drop, place, remove, ordered completion
legacy network service: player update, held-cube sync, interaction dispatch, request-sync no-op
command contract service: planned command id/source/status/reason/envelope records
preflight service: planned player, cube, carried, anomaly, slot, and distance diagnostics
publish decision service: planned publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag
local authority consumer service: planned local result journal, rejection skip, accepted publish, victory commit
host authority consumer service: planned player update, TRY_INTERACT, request-sync, skipped, rejected, recovery, victory decisions
diagnostics service: runtime events, runtime frames, cadence, planned command readback, fixture parity
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
replay service: planned fixture matrix, journal replay, volatile normalization, snapshot parity
central ledger service: tracked repo state, internal change-log entry, next ledge handoff
```

## Kits identified

```txt
implemented-source:
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

planned-next:
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

The repository-local `.agent` state already identified the correct next implementation seam, but central tracking still pointed at an older HorrorCorridor pass.

The runtime source gap remains unchanged: `interactionRules.ts` and `networkRules.ts` return `GameState` only, silent rejection branches have no reason metadata, `GameCanvas.tsx` uses object identity and action strings as authority gates, and `runtimeDebugStore.ts` does not expose command result or publish decision projections.

## Next safe ledge

```txt
HorrorCorridor Central Ledger Sync + Result-First Command Consumer Fixture Freeze
```

This should be treated as a documentation and planning freeze for the already-identified source cut before runtime work begins.

The next runtime implementation should add the pure command/result/decision/fixture files first, prove them with a DOM-free script, then splice `GameCanvas` and runtime debug readback additively.

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
local npm run lint: no
local npm run smoke:protokits: no
local npm run harness:horror-corridor: no
node command fixture: no, script does not exist yet
browser smoke: no
pushed to main: yes
```

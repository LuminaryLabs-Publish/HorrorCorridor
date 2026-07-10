# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T15-31-03-04-00`

## Status

```txt
status: authority-command-correlation-publish-parity-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

## Selection

`HorrorCorridor` was selected after the full accessible `LuminaryLabs-Publish` list was compared with central tracking and root `.agent` state. No eligible repository was new, ledger-missing, root-audit-missing, or otherwise undocumented. `TheCavalryOfRome` was excluded. `HorrorCorridor` had the oldest eligible central review timestamp.

## Interaction loop

```txt
open application
  -> choose solo, host, or join
  -> establish room identity and readiness
  -> create seeded maze, cubes, anomaly sequence, and players
  -> mount GameCanvas
  -> initialize renderer, post-processing, minimap, input, transport, cadence, and debug
  -> pointer-lock movement updates local pose and camera
  -> interact input derives pickup/drop/place/remove
  -> local authority applies applyNetworkInteractionRequest and skips when nextState === currentGameState
  -> client sends TRY_INTERACT to host
  -> host applies the same rule, syncs held cubes, then publishes regardless of semantic change
  -> periodic authority cadence applies player update, ooze advancement, and resync publication
  -> authoritative snapshot drives world render, minimap, HUD, completion route, and debug frames
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
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
authoritative-publication-cadence
runtime-debug-frame-store
runtime-debug-event-store
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
command-envelope-contract-next
command-result-envelope-next
publish-decision-contract-next
command-correlation-contract-next
authority-parity-consumer-next
command-result-journal-next
runtime-debug-command-projection-next
authority-parity-fixture-next
central-ledger-synchronization
```

## Kits and offered services

```txt
corridor-session-domain-kit
  mode selection, room identity, readiness, session entry

peer-room-sync-domain-kit
  host/client transport, full synchronization, player updates, interaction requests

maze-snapshot-bootstrap-kit
  deterministic maze, cell lookup, cube spawns, anomaly slots

first-person-corridor-player-kit
  pointer lock, input, movement, collision, camera pose, local prediction

corridor-interaction-domain-kit
  pickup, drop, place, remove, carried-cube synchronization

ordered-anomaly-sequence-kit
  slot authority, ordered color validation, completion, victory and rollback

ooze-trail-domain-kit
  cadence, decay, spawn, spacing guard, capacity guard, trail transitions

corridor-authoritative-publication-kit
  snapshot tick advancement, full-sync publication, transport broadcast, cadence counters

corridor-render-world-kit
  Three.js maze, cube, player, anomaly, ooze, and dressing projection

corridor-minimap-kit
  minimap geometry, player markers, object markers

runtime-debug-frame-kit
  bounded frame capture, event capture, window export, overlay state

legacy rule adapters
  GameState-returning interaction, network, ooze, and win compatibility
```

## Required next-cut kits

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-contract-kit
command-correlation-record-kit
authority-command-consumer-kit
command-result-journal-kit
runtime-debug-command-projection-kit
authority-parity-fixture-kit
legacy-snapshot-parity-kit
```

## Source findings

### Local and host interaction publication are not equivalent

`applyInteraction()` computes `nextState` and returns without publication when `nextState === currentGameState`. The host `TRY_INTERACT` path always calls `publishAuthoritativeState()` after applying the same domain rule, including unchanged-state results.

### Periodic publication is not the same thing as command acceptance

The authority loop publishes on `NETWORK_TICK_RATE` after player update and `advanceOozeTrail()`. `spawnOozeTrail()` returns a new state object even when spacing or capacity guards add no trail entry. Object identity therefore cannot represent semantic mutation across all paths.

### Debug rows are not causally joined

`runtimeDebugStore` retains frames and free-form events, but has no shared command correlation identifier, source command, domain result, publish decision, published snapshot tick, or authority-mode parity row.

## Main finding

The blocker is command-to-publication correlation. A source-owned result contract is still required, but the fixture gate must specifically prove that local and host consumers make deliberate, explainable publication decisions for the same command. Cadence-driven publication must be classified separately from command-driven publication rather than treated as an accepted command result.

## Next safe ledge

```txt
HorrorCorridor Authority Command Correlation Ledger + Publish Parity Fixture Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
authority parity fixture: not run because proof files do not exist yet
pushed to main: documentation only
central ledger updated: yes
```
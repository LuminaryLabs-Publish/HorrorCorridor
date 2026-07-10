# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T13-58-16-04-00`

## Status

```txt
status: command-outcome-source-ledger-runtime-debug-fixture-gate-planned
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
  -> initialize Three.js renderer, post-processing, minimap, input, transport, cadence, and debug state
  -> pointer-lock movement updates local pose and camera
  -> interact input derives pickup/drop/place/remove request
  -> solo or host runs applyNetworkInteractionRequest locally
  -> client sends TRY_INTERACT to host
  -> host runs PLAYER_UPDATE, TRY_INTERACT, recovery, ooze, and victory rules
  -> rules return GameState only
  -> consumer infers changed/no-change and publish/skip
  -> authoritative snapshot is rendered and exported to runtime debug
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
runtime-debug-frame-store
runtime-debug-event-store
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
command-envelope-contract-next
command-reason-catalog-next
command-result-envelope-next
publish-decision-snapshot-next
command-result-journal-next
runtime-debug-command-projection-next
command-fixture-matrix-next
command-replay-fixture-next
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
  slot authority, ordered color validation, completion, victory

ooze-trail-domain-kit
  cadence, decay, spawn, spacing guard, trail transitions

corridor-render-world-kit
  Three.js maze, cube, player, anomaly, and dressing projection

corridor-minimap-kit
  minimap geometry, player markers, object markers

runtime-debug-frame-kit
  frame capture, event capture, exportable runtime diagnostics

legacy rule adapters
  GameState-returning interaction, network, ooze, and win compatibility
```

## Required next-cut kits

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-command-consumer-kit
host-authority-command-consumer-kit
runtime-debug-command-projection-kit
command-fixture-matrix-kit
command-replay-fixture-kit
```

## Source findings

`interactionRules.ts` uses repeated unchanged-state returns for invalid readiness, player, carried-cube, distance, slot, and cube conditions. `networkRules.ts` returns unchanged state for missing players and for request-sync, toggle-ready, cancel, and default actions. `oozeRules.ts` has decay-not-due and spawn-spacing/cap paths without outcome records. These are valid behaviors, but the reason and publication decision are currently lost.

## Main finding

The blocker is not visual fidelity or transport extraction. It is command outcome attribution. The domain needs serializable command, reason, result, publish-decision, and journal rows that preserve existing `GameState` behavior while making every accepted, rejected, skipped, no-op, recovery, ooze, victory, and publish-only path observable.

## Next safe ledge

```txt
HorrorCorridor Command Outcome Source Ledger + Runtime Debug Fixture Gate
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
command fixture: not run because proof files do not exist yet
pushed to main: documentation only
central ledger updated: yes
```

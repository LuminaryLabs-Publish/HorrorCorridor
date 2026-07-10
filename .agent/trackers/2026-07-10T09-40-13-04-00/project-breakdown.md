# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T09-40-13-04-00`

**Selection:** oldest eligible documented fallback after comparing the current public `LuminaryLabs-Publish` list against the central repo ledger and excluding `TheCavalryOfRome`.

## Outcome

```txt
status: docs-only breakdown refresh
runtime source changed: no
selected repo: LuminaryLabs-Publish/HorrorCorridor
central ledger: updated after this repo-local pass
next safe ledge: HorrorCorridor Command Result Debug Projection Ledger Refresh + Fixture Gate
```

## Interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates complete
  -> GameCanvas mounts
  -> renderer, camera, post-processing, maze world, minimap, input refs, pose refs, transport listener, and runtime debug initialize
  -> pointer-lock first-person navigation updates pose and view angles
  -> interact key derives pickup, drop, place, or remove from carry/anomaly/cube distance
  -> local solo/host applies GameState-returning interaction/network rules directly
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync, toggle-ready, cancel, unknown action, ooze, and victory rules return GameState only
  -> unchanged states or implicit reason strings decide whether to publish
  -> renderer, minimap, HUD, completion route, and runtime debug consume latest snapshot
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
runtime-debug-command-projection-next
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
command-fixture-matrix-next
command-replay-fixture-next
central-ledger-synchronization
```

## Services the kits offer

```txt
corridor-session-domain-kit: mode selection, room identity, readiness state, host/client/solo session entry.
peer-room-sync-domain-kit: host/client transport, full sync, player updates, interaction requests, room lifecycle messages.
maze-snapshot-bootstrap-kit: deterministic maze snapshot, cell lookup, cube spawns, anomaly slots.
first-person-corridor-player-kit: pointer lock, movement integration, collision, camera pose, local prediction.
corridor-interaction-domain-kit: pickup, drop, place, remove, carried cube synchronization.
ordered-anomaly-sequence-kit: sequence slots, ordered color validation, completion and victory state.
ooze-trail-domain-kit: ooze cadence, spawn, decay, spacing guard, trail state transitions.
corridor-render-world-kit: Three.js world rendering, maze surfaces, cubes, anomaly markers, scene dressing.
corridor-minimap-kit: minimap projection and player/object markers.
runtime-debug-frame-kit: frame capture, event capture, debug export.
command-envelope-contract-kit next: normalized command identity, source, target, action, and before/after metadata.
command-reason-catalog-kit next: stable accepted, rejected, skipped, no-op, recovery, victory, and ooze reasons.
command-result-envelope-kit next: command result rows with status, reason, events, changed flag, diagnostics, and source metadata.
publish-decision-snapshot-kit next: publish, skip, recovery, victory, and no-op decisions from command results.
command-result-journal-kit next: ordered command facts and counters for local, host, ooze, and victory paths.
runtime-debug-command-projection-kit next: latest command result, publish decision, rejection reason, journal counts, fixture parity.
command-fixture-matrix-kit next: deterministic accepted/rejected/unchanged/skipped/publish-only/ooze/victory row proof.
```

## Kits identified

### Implemented

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
legacy-interaction-rules-adapter
legacy-network-rules-adapter
legacy-ooze-rules-adapter
legacy-win-rules-adapter
```

### Next-cut

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
central-ledger-sync-kit
```

## Main finding

`HorrorCorridor` should not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, route rewrites, new maze content, or visual object-kit expansion.

The blocker is command-result/debug projection. `interactionRules.ts`, `networkRules.ts`, `oozeRules.ts`, and `winRules.ts` still return `GameState` only. Rejected, skipped, no-op, recovery, ooze, victory, and publish-only paths collapse into unchanged state or implicit reason strings, while `runtimeDebugStore.ts` captures frames/events but not command outcomes or publish decisions.

## Next safe ledge

```txt
HorrorCorridor Command Result Debug Projection Ledger Refresh + Fixture Gate
```

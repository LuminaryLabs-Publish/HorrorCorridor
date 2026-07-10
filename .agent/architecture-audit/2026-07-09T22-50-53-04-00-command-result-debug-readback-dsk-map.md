# HorrorCorridor Command Result Debug Readback DSK Map

**Timestamp:** `2026-07-09T22-50-53-04-00`

## Summary

`HorrorCorridor` is already playable and render-stable. The next DSK boundary is command result authority plus debug readback, not rendering or PeerJS extraction.

## Current DSK flow

```txt
Next app shell
  -> session and UI stores
  -> GameCanvas runtime
  -> seeded maze bootstrap
  -> first-person input and movement domains
  -> network message protocol
  -> GameState-returning interaction/network/ooze/win rules
  -> replicated snapshot builder
  -> Three render world and minimap
  -> runtime debug frame/event store
```

## Current interaction loop

```txt
open app
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> GameCanvas initializes runtime objects
  -> pointer-lock movement mutates local pose
  -> interaction action is derived from carried cube and anomaly distance
  -> local/host applies GameState-returning rules directly
  -> clients send TRY_INTERACT to host
  -> host applies GameState-returning rules directly
  -> publish/skip is inferred from object identity or input action
  -> snapshots feed renderer, minimap, HUD, completion, and debug frames
```

## Domains

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
command-envelope-contract-next
command-reason-catalog-next
command-result-envelope-next
publish-decision-snapshot-next
command-result-journal-next
runtime-debug-command-projection-next
command-result-fixture-matrix-next
central-ledger-synchronization
```

## Services

```txt
app/session service: mode, room identity, join code, player identity, readiness, pause/resume, completion routing
peer-sync service: host/client transport, full sync, player update, try interact, request-sync recovery
maze-bootstrap service: seed, grid, cell lookup, pathing, cube spawns, target sequence, initial snapshot
first-person-player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy-interaction service: pickup, drop, place, remove, ordered completion, GameState-only return
legacy-network service: player update, held cube sync, interaction dispatch, request-sync/toggle-ready/cancel/default no-op, GameState-only return
runtime-debug service: event capture, frame capture, snapshot/cadence readback, debug export
render service: renderer, camera, scene, post-processing, maze world, minimap, scene dressing, disposal
planned command-result service: status, reason, before/after state facts, changed flag, events, diagnostics, legacy adapters
planned publish-decision service: publish, skip, recovery, no-op, victory
planned fixture service: accepted, rejected, unchanged, publish-only, skipped, ooze, and victory rows
```

## Kits

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

The current DSK architecture has strong runtime modules but not a typed command proof layer. The first source cut should define command envelopes, reasons, results, publish decisions, journals, and debug projection before `GameCanvas` behavior changes.

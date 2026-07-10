# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-10T08-11-35-04-00`

## Selection

`LuminaryLabs-Publish/HorrorCorridor` was selected after comparing the current public `LuminaryLabs-Publish` repo list against central ledger state. No checked non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent`, recently added, or undocumented. `TheCavalryOfRome` stayed excluded. `HorrorCorridor` was the oldest eligible documented fallback.

## Current route

```txt
HorrorCorridor-V1 Next app
  -> start menu
  -> solo / host / join
  -> lobby and readiness gates
  -> GameCanvas runtime
  -> renderer, camera, postprocessing, maze world, minimap, stores, local pose, networking, cadence, debug state
  -> pointer-lock movement and mouse look
  -> interact key derives pickup/drop/place/remove
  -> local authority applies GameState-returning rules directly
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE / TRY_INTERACT through GameState-returning rules
  -> ooze and win rules mutate or return unchanged state
  -> publishAuthoritativeState emits implicit reason strings
  -> runtimeDebugStore records frame/event facts without command-result rows
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
three-renderer
post-processing
maze-world-rendering
minimap-rendering
command-result-projection-next
publish-decision-ledger-next
runtime-debug-command-readback-next
command-fixture-matrix-next
central-ledger-synchronization
```

## Services the kits offer

Implemented kits provide session flow, peer room sync, seeded maze state, first-person player motion, cube pickup/drop/place/remove rules, ordered anomaly validation, ooze trail cadence, Three.js world rendering, minimap rendering, and runtime debug frame/event export.

Next-cut kits should provide command envelopes, stable reason catalog rows, command results, publish decisions, command journals, local/host authority result consumers, runtime debug command projection, and DOM-free fixture rows.

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
command-envelope-contract-kit-next
command-reason-catalog-kit-next
command-result-envelope-kit-next
publish-decision-snapshot-kit-next
command-result-journal-kit-next
local-authority-command-consumer-kit-next
host-authority-command-consumer-kit-next
runtime-debug-command-projection-kit-next
command-fixture-matrix-kit-next
command-replay-fixture-kit-next
central-ledger-sync-kit
```

## Main finding

Do not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, route rewrites, new maze content, or visual object-kit expansion.

The blocker is command debug projection. The domain rules still return `GameState` only. Silent no-op, rejected, skipped, publish-only, ooze, and victory paths are not first-class command results, and runtime debug cannot explain what command ran, which reason applied, or why a publish was skipped.

## Next safe ledge

```txt
HorrorCorridor Command Debug Projection Ledger Refresh + Result Fixture Gate
```

## Validation

Docs-only pass. Runtime source was not changed. No branch or PR was created. Local/browser validation was not run because the command fixture does not exist yet.

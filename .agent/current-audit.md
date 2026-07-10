# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T09-40-13-04-00`

## Status

```txt
status: command-result-debug-projection-ledger-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: required after repo-local docs
```

## Selected pass

`HorrorCorridor` was selected as the oldest eligible documented fallback after the current public `LuminaryLabs-Publish` repository list was compared with central ledger state and `TheCavalryOfRome` was excluded.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> complete lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, input refs, pose refs, cadence state, transport listener, and debug state
  -> pointer-lock first-person navigation
  -> key/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried cube and anomaly distance
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged nextState returns silently without result metadata
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default return unchanged or recovery-only state
  -> ooze cadence advances through GameState-returning rules
  -> ordered sequence completion validates victory through GameState-returning rules
  -> publishAuthoritativeState emits implicit reason strings
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

## Kits and services

```txt
corridor-session-domain-kit: mode selection, room identity, readiness.
peer-room-sync-domain-kit: host/client transport, full sync, player update, try interact.
maze-snapshot-bootstrap-kit: maze snapshot, cell lookup, cube spawns, anomaly slots.
first-person-corridor-player-kit: input, look, movement, collision, camera pose.
corridor-interaction-domain-kit: pickup, drop, place, remove.
ordered-anomaly-sequence-kit: ordered anomaly sequence and victory state.
ooze-trail-domain-kit: ooze cadence, decay, spawn, spacing guard.
corridor-render-world-kit: Three.js maze/cube/player/anomaly world rendering.
corridor-minimap-kit: minimap projection and markers.
runtime-debug-frame-kit: frame/event capture and export.
legacy-interaction-rules-adapter: GameState-returning interaction rules.
legacy-network-rules-adapter: GameState-returning network rules.
legacy-ooze-rules-adapter: GameState-returning ooze rules.
legacy-win-rules-adapter: GameState-returning win rules.
command-envelope-contract-kit next: normalized commands.
command-reason-catalog-kit next: stable reasons for rejected/skipped/no-op/publish-only paths.
command-result-envelope-kit next: typed command results.
publish-decision-snapshot-kit next: publish/skip/recovery/victory decisions.
command-result-journal-kit next: ordered facts and counters.
runtime-debug-command-projection-kit next: debug readback of command results.
command-fixture-matrix-kit next: deterministic command proof rows.
command-replay-fixture-kit next: DOM-free replay/parity proof.
```

## Main finding

`HorrorCorridor` should not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, route rewrites, new maze content, or visual object-kit expansion.

The blocker is command-result/debug projection. The live route is playable, but command outcomes are not first-class records. Rejected/no-op/skipped/recovery/victory/ooze paths collapse into unchanged state or implicit reason strings, and runtime debug cannot explain what command ran, why it was accepted or rejected, or why a publish was skipped.

## Next safe ledge

```txt
HorrorCorridor Command Result Debug Projection Ledger Refresh + Fixture Gate
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
pushed to main: yes, documentation only
```

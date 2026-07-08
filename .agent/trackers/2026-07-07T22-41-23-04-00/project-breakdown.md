# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T22:41:23-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected repo:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`HorrorCorridor` remains the correct repo for this pass because it is the oldest eligible tracked non-Cavalry Publish repo after the latest `ZombieOrchard` pass. This run keeps the work on one repo and tightens the next implementation slice into **Command Result Replay Harness + Host Publish Gate**.

The runtime is already playable as a Next/React/Three/PeerJS cooperative horror corridor: solo, host, and client paths can enter a seeded maze, move with pointer-lock first-person controls, pick up/drop/place/remove cubes, complete an ordered anomaly sequence, publish host snapshots, draw a minimap, and expose debug frames/events. The active blocker is still command authority: invalid interaction branches silently return unchanged state, the host publishes after some unchanged `TRY_INTERACT` requests, local authority uses object identity as the publish gate, and runtime debug frames/events do not yet expose stable command results, rejection reasons, publish decisions, or replay-journal counters.

## Selection reason

The central `LuminaryLabs-Dev/LuminaryLabs` ledger showed `HorrorCorridor` as the oldest eligible tracked non-Cavalry Publish repo at the start of this pass.

Latest eligible timestamps checked:

```txt
HorrorCorridor   2026-07-07T21:18:45-04:00
TheOpenAbove     2026-07-07T21:29:47-04:00
AetherVale       2026-07-07T21:39:36-04:00
PhantomCommand   2026-07-07T21:50:56-04:00
PrehistoricRush  2026-07-07T21:59:06-04:00
MyCozyIsland     2026-07-07T22:11:41-04:00
IntoTheMeadow    2026-07-07T22:20:00-04:00
ZombieOrchard    2026-07-07T22:31:24-04:00
```

## Evidence checked

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
.agent/README.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
player-facing loop:
  open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas
  -> enter pointer-lock first-person navigation
  -> move through seeded maze
  -> interact key chooses action from distance-to-end and carried-cube state
  -> pickup loose cube, drop carried cube, place cube at anomaly, or remove last anomaly cube
  -> ordered anomaly sequence validates victory
  -> completion route takes over when gameState becomes victory
```

```txt
current runtime loop:
  package scripts run Next app, harnesses, object-kit review, and live-player validation
  -> GameCanvas imports renderer, camera, post-processing, maze world, minimap, stores, player controls, networking protocol, network rules, interaction rules, ooze rules, win rules, and debug store
  -> initializeRuntime builds maze result and GameState from replicated snapshot
  -> local solo/host sessions directly mutate currentGameState
  -> client sessions send PLAYER_UPDATE and TRY_INTERACT messages
  -> host transport receives messages and calls applyNetworkPlayerUpdate or applyNetworkInteractionRequest
  -> networkRules returns GameState only
  -> interactionRules returns unchanged GameState for invalid paths without reason metadata
  -> local authority publishes only when nextState !== currentGameState
  -> host authority publishes after TRY_INTERACT even when result is unchanged, except request-sync is only encoded as publish reason
  -> host cadence advances ooze and publishes full-sync snapshots
  -> world renderer, minimap, HUD, completion UI, and runtime debug store consume the latest snapshot
```

```txt
target authority loop:
  local input and peer messages normalize into CommandEnvelope records
  -> command-result-contract-kit defines CommandStatus, CommandReason, CommandResult, PublishDecision, and journal counters
  -> interaction-preflight-reason-catalog-kit classifies each silent no-op path before mutation
  -> result-returning wrappers sit beside legacy GameState-returning exports
  -> legacy exports keep returning result.state for compatibility
  -> publish-decision-snapshot-kit derives publish, skip, recovery, victory, or no-op from result metadata
  -> local-authority-result-consumer-kit journals local rejections and publishes only accepted changed/victory results
  -> host-authority-result-consumer-kit skips rejected TRY_INTERACT publishes and publishes request-sync recovery
  -> runtime-debug-result-projection-kit exposes latest command result, latest publish decision, rejection reason, and journal counts
  -> command-replay-fixture-kit replays accepted/rejected command journals without DOM or PeerJS
  -> fixture output compares final replicated snapshot parity after volatile-field normalization
```

## Current findings

```txt
networkRules.ts:
  - NetworkInteractionAction includes pickup, drop, place, remove, request-sync, toggle-ready, and cancel.
  - applyNetworkPlayerUpdate mutates player pose and syncs held cubes.
  - applyNetworkInteractionRequest routes pickup/drop/place/remove into interactionRules.
  - request-sync, toggle-ready, cancel, and default currently return state unchanged.
  - no CommandResult, CommandStatus, CommandReason, or PublishDecision exists at this seam.

interactionRules.ts:
  - pickup/drop/place/remove already have deterministic legality checks.
  - not-playing, missing-player, already-carrying, no-nearby-cube, no-carried-cube, missing-anomaly-cell, too-far-from-anomaly, no-free-slot, no-occupied-slot, and wrong-slot all collapse to unchanged state.
  - place/remove call ordered sequence validation after mutation.
  - this is the right source seam for stable preflight diagnostics.

GameCanvas.tsx:
  - local action selection is derived from distance to end anomaly and carry state.
  - local authoritative interaction skips publish by checking object identity.
  - host TRY_INTERACT applies rule, syncs held cubes, then publishes resync/recovery.
  - host player updates always publish after applying pose.
  - runtime debug frame records cadence, snapshot counts, cubes, anomaly, and scene dressing, but not latest command result or publish decision.

runtimeDebugStore.ts:
  - debug state already stores latest frame, frames, and events.
  - window.__HORROR_CORRIDOR_DEBUG__ already exposes frame/event extraction.
  - the missing layer is result/journal metadata in debug frames and exports.
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
settings-overlay
completion-routing
pause-state
readiness-state
session-lifecycle
room-identity
join-code-routing
peer-identity
peer-networking
host-transport
client-transport
network-message-protocol
host-message-ingress
client-message-egress
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
command-envelope-contract
command-acceptance-policy
command-result-contract
command-result-envelope
command-result-status-policy
command-result-rejection-policy
interaction-preflight-reason-catalog
interaction-preflight-diagnostics
player-pose-command-result
interaction-command-result
ooze-command-result
request-sync-command-result
ready-cancel-command-result
victory-command-result
command-result-journal
command-replay-fixture
cube-carry-interaction
nearest-cube-selection
carried-cube-state
end-anomaly-distance-check
slot-assignment
pickup-preflight
drop-preflight
place-preflight
remove-preflight
correction-reversal
ooze-trail-navigation
ooze-decay
ooze-spawn
ooze-spacing-guard
ooze-max-cap
ooze-seeded-rng
snapshot-build
snapshot-publish-contract
snapshot-publish-metadata
publish-decision-snapshot
snapshot-publish-fixture
runtime-debug-event-log
runtime-debug-frame-log
runtime-debug-result-projection
cadence-diagnostics
local-authority-result-consumer
host-authority-result-consumer
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
```

## Services captured

### Session service

```txt
create-room-id
create-join-code
create-player-identity
create-room-state
run-loading-readiness
enter-solo-mode
enter-host-lobby
enter-client-lobby
start-play
pause-resume
commit-completion
return-routing
patch-readiness-state
```

### Peer sync service

```txt
create-host-transport
create-client-transport
map-connection-status
send-lobby-events
send-start-game
send-full-sync
send-player-update
send-try-interact
receive-host-messages
map-transport-message-to-command-envelope
```

### Maze bootstrap service

```txt
hash-seed
generate-maze
build-cell-lookup
build-paths-from-end-to-cube-spawns
create-player-spawns
create-cube-spawns
initialize-anomaly-sequence-slots
create-initial-game-state
create-initial-replicated-snapshot
```

### First-person player service

```txt
keyboard-code-to-player-input-button
set-player-input-button
accumulate-player-look-delta
clear-player-look-delta
apply-player-look-delta
create-player-view-angles
advance-player-movement
resolve-maze-collision
sync-camera-from-player
to-player-input-snapshot
```

### Interaction preflight service

```txt
validate-game-playing
find-player
find-carried-cube
find-nearest-loose-cube
resolve-end-anomaly-cell
check-end-anomaly-distance
resolve-target-slot
resolve-last-occupied-slot
classify-pickup-reason
classify-drop-reason
classify-place-reason
classify-remove-reason
return-stable-rejection-reason
return-preflight-diagnostics
```

### Command result envelope service

```txt
create-command-envelope
create-accepted-result
create-rejected-result
create-unchanged-result
create-publish-only-result
attach-command-metadata
attach-result-status
attach-rejection-reason
attach-changed-flag
attach-event-list
attach-before-after-tick
attach-before-after-snapshot-summary
attach-diagnostics-payload
preserve-legacy-gamestate-return-api
```

### Publish decision service

```txt
derive-publish-decision-from-result
publish-after-changed-command
skip-publish-after-rejected-command
publish-recovery-after-request-sync
skip-publish-after-toggle-ready-or-cancel
publish-victory-after-sequence-complete
attach-publish-reason
attach-publish-sequence
attach-room-phase-updated-at
build-replicated-snapshot
set-runtime-store-snapshot
broadcast-full-sync
compare-fixture-snapshot
```

### Local authority result consumer service

```txt
consume-local-pose-result
consume-local-interaction-result
journal-rejected-local-command
skip-local-publish-for-rejection
publish-local-changed-command
preserve-current-local-victory-routing
```

### Host authority result consumer service

```txt
consume-host-player-update-result
consume-host-interaction-result
skip-rejected-try-interact-publish
publish-request-sync-recovery
skip-toggle-ready-or-cancel-until-lobby-policy-exists
publish-changed-host-command
preserve-current-host-victory-routing
```

### Diagnostics service

```txt
runtime-debug-init
runtime-debug-clear
runtime-event-record
runtime-frame-record
cadence-summary
attach-last-command-type
attach-last-command-id
attach-last-result-status
attach-last-rejection-reason
attach-last-publish-decision
attach-last-publish-reason
attach-journal-counts
window-debug-extract-state
```

### Replay service

```txt
serialize-command-envelope
serialize-command-result
append-accepted-result
append-rejected-result
append-unchanged-result
append-publish-only-result
replay-command-journal
normalize-volatile-fields
compare-final-snapshot
emit-parity-report
```

### Render service

```txt
create-renderer
create-scene
create-camera
create-post-processing
build-maze-world
attach-world-to-scene
update-world-from-snapshot
draw-minimap-frame
sync-camera-from-player
record-scene-dressing-summary
dispose-render-runtime
```

## Kit inventory

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
host-command-envelope-adapter-kit
host-authority-command-kit
command-envelope-contract-kit
command-acceptance-policy-kit
command-result-contract-kit
command-result-envelope-kit
command-result-status-policy-kit
command-result-rejection-contract-kit
interaction-preflight-reason-catalog-kit
interaction-preflight-diagnostics-kit
player-pose-command-result-kit
interaction-command-result-kit
ooze-command-result-kit
request-sync-command-result-kit
ready-cancel-command-result-kit
victory-command-result-kit
snapshot-publish-metadata-kit
publish-decision-snapshot-kit
snapshot-publish-fixture-kit
command-result-journal-kit
command-result-fixture-kit
command-replay-fixture-kit
runtime-debug-frame-kit
runtime-debug-result-projection-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
replay-parity-smoke-kit
maze-world-render-kit
wound-triangle-mesh-domain-kit
mesh-object-kit-catalog
horror-corridor-preset-kit
procedural-texture-kit-family
rusted-service-door-object-kit
chain-link-fence-object-kit
broken-generator-object-kit
concrete-jersey-barrier-object-kit
storm-drain-culvert-object-kit
collapsed-signpost-object-kit
industrial-shelving-object-kit
hanging-chain-hook-object-kit
barrel-cluster-object-kit
broken-concrete-stair-object-kit
brick-course-texture-kit
damp-mud-texture-kit
rust-streak-texture-kit
moss-grime-texture-kit
wet-concrete-texture-kit
```

## Next implementation slice

```txt
HorrorCorridor Command Result Replay Harness + Host Publish Gate
```

## Build order

```txt
preserve current solo, host, client, rendering, minimap, debug overlay, and PeerJS behavior
-> add command result type definitions under game-state/domain without moving renderer code
-> define CommandStatus: accepted, rejected, unchanged, publish-only
-> define CommandReason catalog for each current silent no-op branch
-> define PublishDecision: publish, skip, recovery, victory, no-op
-> add result factories with beforeTick, afterTick, changed, events, source, and diagnostics
-> add interaction preflight helpers beside interactionRules
-> add result-returning wrappers for pickup, drop, place, and remove
-> keep legacy interaction exports returning result.state
-> add result-returning wrappers for player update and network interaction request
-> keep legacy network exports returning result.state
-> classify request-sync as publish-only recovery
-> classify toggle-ready and cancel as explicit skipped commands until lobby policy exists
-> add command result journal counters
-> add publish decision snapshot helper
-> wire local-authority consumer to journal rejections and only publish accepted changed/victory results
-> wire host-authority consumer to skip rejected TRY_INTERACT publishes and publish request-sync recovery
-> extend runtime debug frame with latestCommandResult, latestPublishDecision, and commandJournal
-> add DOM-free fixtures for accepted pickup, rejected pickup, accepted place, rejected place, request-sync recovery, and victory completion
-> defer PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, and object-kit visual expansion
```

## Acceptance criteria for the next slice

```txt
legacy GameState-returning exports still compile
accepted pickup fixture returns accepted + changed
rejected pickup fixture returns rejected + stable reason + unchanged state
accepted place fixture can advance ordered sequence state
rejected place fixture returns too-far/no-carried/no-slot reason without mutation
request-sync fixture returns publish-only recovery decision
host consumer no longer publishes rejected TRY_INTERACT as normal resync
runtime debug extraction includes latestCommandResult, latestPublishDecision, and commandJournal
replay fixture normalizes volatile timestamps and compares final replicated snapshots
```

## Deferred work

```txt
PeerJS adapter extraction
session store extraction
renderer/domain extraction
minimap extraction
post-process style pass
object-kit visual expansion
maze generation replacement
save/load persistence
matchmaking
multi-room browser
larger narrative system
```

## Validation status

No runtime source files were changed in this pass.

No local build or smoke test was run in this pass.

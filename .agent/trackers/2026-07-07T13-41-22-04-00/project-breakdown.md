# HorrorCorridor Project Breakdown

**Generated:** `2026-07-07T13:41:22-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected repo:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`HorrorCorridor` remains a cooperative first-person maze horror game under `HorrorCorridor-V1`, built with Next, React, Three.js, Zustand, and PeerJS. The runtime already has solo, host, and client paths; seeded maze bootstrap; pointer-lock player movement; cube pickup/drop/place/remove interactions; ordered anomaly sequence solving; ooze trail simulation; replicated snapshots; runtime debug frames; and object/texture kit direction.

This pass narrows the next implementation slice from the broader command-result contract into **Interaction Preflight Reason Catalog + Command Replay Fixture**. The key issue is that the most important gameplay decisions already exist, but they return only `GameState`. Invalid interactions, missing players, no nearby cubes, wrong anomaly distance, no open slots, no carried cube, unchanged pose updates, and publish-only recovery requests are still not first-class command results. That makes debugging, replay parity, fixture assertions, and publish decisions too implicit.

## Selection note

The central ledger most recently completed `LuminaryLabs-Publish/ZombieOrchard` at `2026-07-07T13:30:34-04:00`. Among tracked non-Cavalry Publish repos, `LuminaryLabs-Publish/HorrorCorridor` had the oldest latest-review timestamp, so it was selected for this run.

## Reviewed source files

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
.agent/README.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create room, local player identity, lobby state, and readiness state
-> host creates PeerJS transport or client connects to host room code
-> create seeded maze, cube spawns, anomaly sequence, players, and replicated snapshot
-> mount GameCanvas
-> create renderer, scene, camera, post-processing, and maze world
-> bind pointer-lock, keyboard, mouse, resize, and blur handlers
-> PLAYING screen advances the local frame loop
-> solo/host applies local pose to currentGameState directly
-> client predicts pose locally and sends PLAYER_UPDATE messages
-> E key picks action by local state and distance-to-end
-> solo/host calls applyNetworkInteractionRequest directly
-> client sends TRY_INTERACT messages
-> host receives PLAYER_UPDATE / TRY_INTERACT messages
-> host applies applyNetworkPlayerUpdate / applyNetworkInteractionRequest directly
-> invalid rule paths return unchanged GameState silently
-> ooze trail advances on host cadence
-> publishAuthoritativeState increments tick/timestamp, builds replicated snapshot, updates store, and optionally broadcasts SYNC
-> world, minimap, HUD, completion UI, and runtime debug frames consume the snapshot
```

## Target interaction loop

```txt
session-service creates room/session state
-> peer-sync-service translates transport messages into command envelopes
-> local simulation emits pose, interact, request-sync, and ooze command envelopes
-> command-acceptance-policy validates room, actor, source, app state, command type, and payload
-> interaction-preflight-reason-catalog classifies every interaction before mutation
-> player-pose-command-result wraps pose updates with changed/unchanged/rejected metadata
-> interaction-command-result wraps pickup/drop/place/remove with accepted/rejected reason metadata
-> ooze-command-result wraps decay/spawn with deterministic RNG fixture context
-> snapshot-publish-metadata derives publish/no-publish/recovery/victory decisions from command results
-> command-result-journal stores accepted, rejected, unchanged, and publish-only records
-> runtime-debug-frame projects last result, rejection reason, publish decision, and journal counts
-> command-replay-fixture replays command records and compares normalized final snapshots
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
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
loading-readiness
seeded-maze-bootstrap
maze-cell-lookup
maze-pathing
cube-spawn-bootstrap
anomaly-sequence-bootstrap
replicated-snapshot-bootstrap
first-person-input
pointer-lock-control
keyboard-input
mouse-look-input
player-view-angles
player-movement-integration
maze-collision-resolution
local-pose-prediction
camera-bob
local-carry-state-sync
host-authority
local-authoritative-simulation
remote-authoritative-ingress
command-envelope-contract
command-acceptance-policy
command-result-contract
interaction-preflight-reason-catalog
command-result-rejection-policy
command-result-journal
command-replay-fixture
player-pose-command-result
cube-carry-interaction
nearest-cube-selection
carried-cube-state
end-anomaly-distance-check
slot-assignment
sequence-objective
ordered-sequence-validation
victory-completion
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
snapshot-publish-fixture
full-sync-message-output
runtime-debug-event-log
runtime-debug-frame-log
cadence-diagnostics
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
readiness-state
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

### Command envelope service

```txt
normalize-local-pose-update
normalize-client-player-update
normalize-local-interaction
normalize-client-interaction
normalize-advance-ooze
normalize-request-sync
assign-command-id
attach-actor-id
attach-source
attach-sequence
attach-timestamp
attach-request-id
validate-payload-shape
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

### Command result service

```txt
create-accepted-result
create-rejected-result
create-unchanged-result
create-publish-only-result
attach-command-metadata
attach-rejection-reason
attach-changed-flag
attach-event-list
attach-publish-decision
attach-publish-reason
attach-before-after-tick
attach-diagnostics-payload
```

### Player pose result service

```txt
validate-player-exists
validate-pose-payload
classify-unchanged-pose
apply-pose-update
sync-held-cubes-to-players
emit-pose-changed-event
emit-missing-player-rejection
```

### Interaction result service

```txt
preflight-pickup
preflight-drop
preflight-place-at-anomaly
preflight-remove-from-anomaly
apply-legal-pickup
apply-legal-drop
apply-legal-place
apply-legal-remove
sync-sequence-progress
emit-interaction-accepted-event
emit-interaction-rejected-event
```

### Ooze result service

```txt
resolve-deterministic-rng
decay-ooze-trail
spawn-ooze-trail
enforce-spacing
enforce-max-cap
update-ooze-level
emit-ooze-decayed-event
emit-ooze-spawned-event
emit-ooze-unchanged-event
```

### Snapshot publish service

```txt
increment-authoritative-tick
attach-room-phase-updated-at
build-replicated-snapshot
attach-publish-reason
attach-publish-decision
set-runtime-store-snapshot
broadcast-full-sync
compare-fixture-snapshot
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
attach-last-rejection-reason
attach-last-result-status
attach-last-publish-decision
attach-journal-counts
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

## Kits identified

### Current and target service kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
host-command-envelope-adapter-kit
command-envelope-contract-kit
command-acceptance-policy-kit
host-authority-command-kit
command-result-contract-kit
command-result-rejection-contract-kit
interaction-preflight-reason-catalog-kit
interaction-preflight-diagnostics-kit
player-pose-command-result-kit
interaction-command-result-kit
ooze-command-result-kit
snapshot-publish-metadata-kit
snapshot-publish-fixture-kit
command-result-journal-kit
command-replay-fixture-kit
command-result-fixture-kit
runtime-debug-frame-kit
replay-parity-smoke-kit
maze-world-render-kit
```

### Implemented ProtoKit/catalog surfaces

```txt
wound-triangle-mesh-domain-kit
mesh-object-kit-catalog
horror-corridor-preset-kit
procedural-texture-kit-family
```

### Mesh object kits tracked through catalog

```txt
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
```

### Texture kits tracked through procedural family

```txt
brick-course-texture-kit
damp-mud-texture-kit
rust-streak-texture-kit
moss-grime-texture-kit
wet-concrete-texture-kit
```

## Key findings

```txt
- HorrorCorridor-V1/package.json exposes useful validation commands: lint, smoke:protokits, live-agent, object-kit review, visual match, and live-player validation.
- GameCanvas.tsx remains the runtime concentration point for renderer setup, input, pose stepping, host/client message handling, direct state mutation, ooze cadence, snapshot publishing, minimap draw, and debug capture.
- Host transport handling calls applyNetworkPlayerUpdate and applyNetworkInteractionRequest directly, then publishes immediately.
- The local authoritative branch writes currentGameState, applies player updates, syncs held cubes, advances ooze, and publishes on cadence.
- networkRules.ts is the closest reducer seam, but applyNetworkPlayerUpdate and applyNetworkInteractionRequest still return only GameState.
- interactionRules.ts has the needed decision points but returns unchanged state for every illegal path.
- oozeRules.ts already supports RNG injection, but live runtime can still fall back to Math.random; fixtures should require deterministic RNG.
- syncSnapshot.ts already owns buildReplicatedSnapshot and createFullSyncMessage, making it the right base for publish metadata and snapshot fixture work.
```

## Recommended next slice

```txt
HorrorCorridor Interaction Preflight Reason Catalog + Command Replay Fixture Cutover
```

## Build order

```txt
keep solo, host, and client play working
-> add interaction-preflight-reason-catalog-kit before touching render or PeerJS extraction
-> define stable reasons: not_playing, missing_player, already_carrying, no_carried_cube, no_nearby_cube, too_far_from_anomaly, no_open_slot, wrong_slot, no_placed_cube, missing_anomaly_cell, unknown_interaction_action
-> add interaction-preflight-diagnostics-kit that returns the checked playerId, cubeId, slotId, distanceToEnd, carriedCubeId, candidateCubeId, selectedSlotId, and rule name
-> wrap pickUpCube, dropCube, placeCubeAtEndAnomaly, and removeCubeFromEndAnomaly with preflight functions before applying effects
-> keep existing interactionRules exports compatible while adding result-returning variants
-> add command-result-rejection-contract-kit fields: commandId, type, actorId, accepted, rejected, rejectionReason, changed, events, publishDecision, publishReason, beforeTick, afterTick, diagnostics
-> add player-pose-command-result-kit around applyNetworkPlayerUpdate
-> add ooze-command-result-kit around advanceOozeTrail with deterministic RNG required in fixtures
-> add snapshot-publish-metadata-kit and make request-sync publish-only with accepted=true changed=false publishReason=recovery
-> add command-result-journal-kit with accepted, rejected, unchanged, and publish-only counts
-> extend runtime debug frames with lastCommandId, lastCommandType, lastResultStatus, lastRejectionReason, lastPublishReason, publishDecision, and journal counts
-> add DOM-free fixtures for missing-player pose, unchanged pose, illegal pickup, legal pickup, illegal place, legal place, wrong-slot remove, request-sync, seeded ooze, and victory
-> add command-replay-fixture-kit to replay command journals and compare normalized final snapshots
-> defer render extraction, world-builder extraction, broad PeerJS adapter extraction, and new visual-kit work
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
interaction-preflight-reason-catalog-kit imports no React, Three, Zustand, PeerJS, or DOM APIs
all pickup/drop/place/remove silent no-op paths map to stable rejection reasons
valid interactions still produce identical GameState changes to current rules
applyNetworkInteractionRequest remains backward-compatible
result-returning interaction wrapper exposes accepted, rejected, rejectionReason, changed, events, diagnostics, and publish metadata
unknown player pose update returns missing_player
unchanged pose update is accepted but changed=false
request-sync is accepted publish-only recovery
seeded ooze fixture is deterministic
runtime debug frame exposes command result summary fields
command journal replay reaches identical normalized final snapshot
render and transport extraction are untouched
```

## Validation note

No runtime source code changed in this pass. No local build or smoke test was run.

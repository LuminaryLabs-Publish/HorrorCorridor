# HorrorCorridor Project Breakdown

**Generated:** `2026-07-07T14:51:44-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected repo:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`HorrorCorridor` remains a cooperative first-person maze horror project under `HorrorCorridor-V1`, built with Next, React, Three.js, Zustand, and PeerJS. The app already has solo, host, and client routing, seeded maze bootstrap, pointer-lock movement, cube interaction rules, anomaly sequence solving, ooze simulation, replicated snapshot publishing, runtime debug exports, validation scripts, and object/texture kit direction.

This pass refines the next implementation slice from broad preflight planning into **Command Result Envelope + Publish Decision Snapshot Fixture**. The key source issue is now the seam between rule results and runtime publication: `interactionRules.ts` and `networkRules.ts` already know when a command changed state, did nothing, or should recover, but they return only `GameState`. `GameCanvas.tsx` still decides whether to publish by comparing object identity or publishing immediately after host messages. The next cutover should add explicit command-result envelopes and publish-decision snapshots before render extraction, transport extraction, or new visual work.

## Selection note

The central Publish repo ledger showed `LuminaryLabs-Publish/HorrorCorridor` as the oldest eligible tracked non-Cavalry repo by latest review timestamp. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked from central ledger:

```txt
HorrorCorridor   2026-07-07T13:41:22-04:00
TheOpenAbove     2026-07-07T13:50:54-04:00
PhantomCommand   2026-07-07T14:00:18-04:00
PrehistoricRush  2026-07-07T14:11:48-04:00
MyCozyIsland     2026-07-07T14:21:20-04:00
IntoTheMeadow    2026-07-07T14:28:17-04:00
ZombieOrchard    2026-07-07T14:40:17-04:00
AetherVale       2026-07-07T16-29-18-04-00
```

## Reviewed source files

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
open app
-> choose solo, host, or join
-> create room, player identity, lobby state, and readiness state
-> host creates PeerJS transport or client connects to host room code
-> create seeded maze, cube spawns, anomaly sequence, players, and replicated snapshot
-> mount GameCanvas
-> create renderer, scene, camera, post-processing, maze world, minimap, and debug recorder
-> bind pointer-lock, keyboard, mouse, resize, and blur handlers
-> PLAYING screen advances local frame loop
-> solo/host steps player pose locally
-> client steps pose locally and sends PLAYER_UPDATE messages
-> E key derives pickup/drop/place/remove action from carried-cube and distance-to-end state
-> solo/host calls applyNetworkInteractionRequest directly
-> client sends TRY_INTERACT message
-> host receives PLAYER_UPDATE / TRY_INTERACT messages
-> host calls applyNetworkPlayerUpdate / applyNetworkInteractionRequest directly
-> interactionRules return unchanged GameState for illegal paths
-> GameCanvas publishes after host messages or when local authoritative state changes
-> ooze advances on host cadence
-> buildReplicatedSnapshot creates authoritative snapshot
-> world render, minimap, HUD, completion UI, and runtime debug frames consume latest snapshot
```

## Target interaction loop

```txt
session-service creates or joins a run
-> peer-sync-service translates transport messages into command envelopes
-> local input and network messages normalize into CommandEnvelope records
-> command-acceptance-policy validates source, actor, room, command type, and payload shape
-> interaction-preflight-reason-catalog classifies legality before mutation
-> command-result-envelope wraps pose, interact, ooze, and request-sync outcomes
-> publish-decision-snapshot derives publish, no-publish, recovery, or victory behavior from command result metadata
-> command-result-journal stores accepted, rejected, unchanged, and publish-only records
-> runtime-debug-projection exposes latest command result, publish decision, rejection reason, and journal counts
-> command-replay-fixture replays command envelopes and compares normalized final replicated snapshots
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
command-result-envelope
command-result-status-policy
interaction-preflight-reason-catalog
interaction-preflight-diagnostics
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
publish-decision-snapshot
snapshot-publish-fixture
full-sync-message-output
runtime-debug-event-log
runtime-debug-frame-log
runtime-debug-result-projection
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

### Command result envelope service

```txt
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
publish-victory-after-sequence-complete
attach-publish-reason
attach-publish-sequence
attach-room-phase-updated-at
build-replicated-snapshot
set-runtime-store-snapshot
broadcast-full-sync
compare-fixture-snapshot
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
emit-unchanged-pose-result
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
emit-victory-event
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
command-result-envelope-kit
command-result-status-policy-kit
command-result-rejection-contract-kit
interaction-preflight-reason-catalog-kit
interaction-preflight-diagnostics-kit
player-pose-command-result-kit
interaction-command-result-kit
ooze-command-result-kit
snapshot-publish-metadata-kit
publish-decision-snapshot-kit
snapshot-publish-fixture-kit
command-result-journal-kit
command-replay-fixture-kit
command-result-fixture-kit
runtime-debug-frame-kit
runtime-debug-result-projection-kit
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
- HorrorCorridor-V1/package.json exposes validation commands for lint, ProtoKit smoke, live-agent runs, object-kit review, visual match, and live-player validation.
- GameCanvas.tsx remains the runtime concentration point for renderer setup, input, pose stepping, host/client message handling, direct rule application, ooze cadence, snapshot publishing, minimap draw, completion, and debug capture.
- networkRules.ts is the reducer seam: applyNetworkPlayerUpdate and applyNetworkInteractionRequest return GameState only.
- interactionRules.ts has the full legality decision tree but maps every illegal branch to unchanged GameState.
- Host TRY_INTERACT handling currently applies interaction rules, syncs held cubes, publishes, and then checks victory without result metadata.
- Local authoritative interaction avoids publishing when nextState === currentGameState, but it does not record a rejected command result.
- request-sync/toggle-ready/cancel are currently unchanged-state paths, so publish-only recovery intent is not distinguishable from rejected or no-op gameplay.
- runtimeDebugStore.ts already supports frame/event export through window.__HORROR_CORRIDOR_DEBUG__, but the debug frame type has no latest command result or publish-decision projection yet.
```

## Recommended next slice

```txt
HorrorCorridor Command Result Envelope + Publish Decision Snapshot Fixture Cutover
```

## Build order

```txt
keep solo, host, and client play working
-> add command-result-envelope-kit as a DOM-free source boundary
-> define result statuses: accepted, rejected, unchanged, publish-only
-> define stable rejection reasons: not_playing, missing_player, already_carrying, no_carried_cube, no_nearby_cube, too_far_from_anomaly, no_open_slot, wrong_slot, no_placed_cube, missing_anomaly_cell, unknown_interaction_action, unknown_network_action
-> define publish decisions: publish, skip, recovery, victory
-> keep current interactionRules exports compatible
-> add result-returning interaction variants for pickup, drop, place, and remove
-> keep current networkRules exports compatible
-> add applyNetworkPlayerUpdateWithResult and applyNetworkInteractionRequestWithResult
-> classify missing-player pose updates as rejected missing_player
-> classify identical pose updates as accepted unchanged
-> classify request-sync as publish-only recovery
-> classify toggle-ready and cancel as publish-only or skipped by explicit policy instead of silent default
-> add publish-decision-snapshot-kit around buildReplicatedSnapshot and createFullSyncMessage seams
-> change GameCanvas host/local authority paths to consume result metadata while preserving current behavior
-> add command-result-journal-kit with accepted, rejected, unchanged, publish-only, publish, skip, recovery, and victory counts
-> extend RuntimeDebugFrameRecord with latestCommandResult, latestPublishDecision, and commandJournal counts
-> expose the same data through window.__HORROR_CORRIDOR_DEBUG__.extractState()
-> add DOM-free fixtures for missing-player pose, unchanged pose, illegal pickup, legal pickup, illegal place, legal place, wrong-slot remove, request-sync recovery, seeded ooze unchanged, seeded ooze changed, and victory publish
-> add command replay fixture that replays result-bearing envelopes and compares normalized final snapshots
-> defer render extraction, world-builder extraction, broad PeerJS adapter extraction, and new object/texture visual work
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
command-result-envelope-kit imports no React, Three, Zustand, PeerJS, or DOM APIs
legacy applyNetworkPlayerUpdate and applyNetworkInteractionRequest still return GameState
result-returning wrappers expose accepted/rejected/unchanged/publish-only metadata
all pickup/drop/place/remove silent no-op branches map to stable reasons
valid interactions still produce identical GameState changes to current rules
host TRY_INTERACT no longer blindly publishes rejected interaction results
local rejected interactions produce journal/debug records without snapshot publish
request-sync is accepted publish-only recovery
runtime debug export includes latest command result and publish-decision data
command journal replay reaches identical normalized final snapshot
render, minimap, post-processing, and transport behavior stay visually unchanged
```

## Validation note

No runtime source code changed in this pass. No local build or smoke test was run.

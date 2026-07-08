# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T20:00:46-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected because:** the central `LuminaryLabs-Dev/LuminaryLabs` Publish ledger showed `HorrorCorridor` as the oldest eligible tracked non-Cavalry repo at the start of this pass.

**Excluded by rule:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`HorrorCorridor` is a cooperative first-person horror maze built under `HorrorCorridor-V1` with Next, React, Three.js, Zustand, and PeerJS. The game already has a playable solo, host, and client loop with seeded maze generation, pointer-lock first-person movement, cube pickup/drop/place/remove interaction, ordered anomaly completion, ooze cadence, replicated snapshots, minimap rendering, runtime debug frames, and a strong visual object-kit catalog.

This pass keeps the next boundary on **Command Result Source Cutover + Replay Fixture Smoke Lock**. The current source still routes legality through `GameState`-only mutation functions, so rejected interactions are silent unchanged states, host `TRY_INTERACT` still publishes even without accepted/rejected metadata, and runtime debug frames do not expose command result, rejection reason, publish decision, or journal counters.

## Evidence checked

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/package.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/components/game/GameCanvas.tsx
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
LuminaryLabs-Publish/HorrorCorridor:.agent/README.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
```

## Selection ledger

Latest eligible timestamps checked before selecting this repo:

```txt
HorrorCorridor   2026-07-07T18:41:07-04:00
TheOpenAbove     2026-07-07T18:49:32-04:00
AetherVale       2026-07-07T19:01:37-04:00
PhantomCommand   2026-07-07T19:08:52-04:00
PrehistoricRush  2026-07-07T19:18:58-04:00
MyCozyIsland     2026-07-07T19:29:28-04:00
IntoTheMeadow    2026-07-07T19:42:05-04:00
ZombieOrchard    2026-07-07T19:51:43-04:00
```

## Interaction loop

### Current loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create room identity, join code, peer identity, local player identity, lobby state, and readiness state
-> create seeded maze, cube spawns, target sequence, sequence slots, and initial replicated snapshot
-> mount GameCanvas
-> create renderer, Three.js scene, camera, post-processing, and maze world
-> enter pointer-lock first-person input loop
-> local solo/host session advances pose directly
-> client session sends PLAYER_UPDATE and TRY_INTERACT messages
-> host receives transport messages
-> host applies applyNetworkPlayerUpdate or applyNetworkInteractionRequest
-> interactionRules return GameState only
-> invalid interactions return unchanged state with no stable reason
-> local authority skips publish when nextState === currentGameState
-> host TRY_INTERACT publishes resync even when command was rejected or unchanged
-> ooze cadence advances on network tick
-> buildReplicatedSnapshot publishes state to runtime store and host clients
-> world, minimap, HUD, completion screen, and debug overlay consume snapshots
```

### Target loop

```txt
session-service creates room/session state
-> peer-sync-service converts transport messages into CommandEnvelope records
-> local and network actions normalize into one command stream
-> command-result-contract-kit defines CommandResult, CommandStatus, CommandReason, PublishDecision, and journal counters
-> command-result-envelope-kit wraps before/after state, changed flag, events, diagnostics, and source metadata
-> interaction-preflight-reason-catalog-kit classifies every previous silent no-op path
-> result-returning wrappers sit beside existing GameState-returning exports
-> legacy exports keep returning result.state for compatibility
-> publish-decision-snapshot-kit derives publish, skip, recovery, victory, or no-op decisions
-> local-authority-result-consumer-kit journals local rejected interactions without publishing
-> host-authority-result-consumer-kit skips rejected TRY_INTERACT publishes and publishes request-sync recovery
-> runtime-debug-result-projection-kit exposes latest result, publish decision, rejection reason, and journal counts
-> command-replay-fixture-kit proves deterministic final replicated snapshot parity
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

## Services the kits offer

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

## Kit inventory

### Current source-backed kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
runtime-debug-frame-kit
maze-world-render-kit
wound-triangle-mesh-domain-kit
mesh-object-kit-catalog
horror-corridor-preset-kit
procedural-texture-kit-family
```

### Object and texture kits already represented

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
brick-course-texture-kit
damp-mud-texture-kit
rust-streak-texture-kit
moss-grime-texture-kit
wet-concrete-texture-kit
```

### Next-cut authority kits

```txt
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
runtime-debug-result-projection-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
replay-parity-smoke-kit
```

## Current blockers

```txt
networkRules.applyNetworkPlayerUpdate returns GameState only.
networkRules.applyNetworkInteractionRequest returns GameState only.
interactionRules pickup/drop/place/remove return GameState only.
Every invalid interaction path returns the previous state with no stable reason.
Host TRY_INTERACT publishes after rule application even when command changed nothing.
Local authority skips publish on identity equality but does not journal rejected commands.
request-sync, toggle-ready, and cancel collapse into unchanged state.
RuntimeDebugFrameRecord exposes cadence, snapshot, cubes, anomaly, and scene dressing, but not command result metadata.
There is no DOM-free replay fixture proving accepted/rejected/unchanged/publish-only parity.
```

## Next slice

```txt
HorrorCorridor Command Result Source Cutover + Replay Fixture Smoke Lock
```

Build order:

```txt
preserve current solo, host, client, rendering, minimap, debug overlay, and network behavior
-> add command result type definitions under game-state/domain without moving renderer code
-> define CommandStatus: accepted, rejected, unchanged, publish-only
-> define CommandReason catalog for all silent no-op branches
-> define PublishDecision: publish, skip, recovery, victory, no-op
-> add result factories that carry beforeTick, afterTick, changed, events, source, and diagnostics
-> add preflight helpers beside interactionRules
-> add result-returning wrappers for pickup, drop, place, remove
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
-> defer PeerJS extraction, renderer extraction, minimap extraction, and object-kit visual expansion
```

## Validation plan

```txt
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev only after DOM-free fixture contracts pass
```

## Run result

Docs-only pass. No runtime source code changed in this tracker entry.

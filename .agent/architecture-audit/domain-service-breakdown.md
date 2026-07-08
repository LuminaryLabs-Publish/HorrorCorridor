# HorrorCorridor Domain Service Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T02:19:36-04:00`

## Current architecture shape

```txt
HorrorCorridor-V1
├─ app and React surface
├─ session stores
├─ runtime stores
├─ GameCanvas orchestration
├─ domain rule files
├─ PeerJS transport adapters
├─ replicated snapshot protocol
├─ Three.js renderer/world builder
├─ minimap and HUD
├─ debug store
├─ scripts and harnesses
└─ object/texture/protokit direction
```

## Desired DSK split

```txt
horror-corridor-domain
├─ session-domain
│  ├─ corridor-session-domain-kit
│  ├─ room-identity-kit
│  ├─ join-code-routing-kit
│  └─ readiness-state-kit
├─ peer-sync-domain
│  ├─ peer-room-sync-domain-kit
│  ├─ network-message-protocol-kit
│  ├─ host-message-ingress-kit
│  └─ client-message-egress-kit
├─ maze-bootstrap-domain
│  ├─ maze-snapshot-bootstrap-kit
│  ├─ seeded-maze-generation-kit
│  ├─ cube-spawn-bootstrap-kit
│  └─ anomaly-sequence-bootstrap-kit
├─ player-domain
│  ├─ first-person-corridor-player-kit
│  ├─ pointer-lock-input-kit
│  ├─ player-view-angle-kit
│  ├─ player-movement-integration-kit
│  └─ maze-collision-resolution-kit
├─ command-authority-domain
│  ├─ command-envelope-contract-kit
│  ├─ command-source-normalization-kit
│  ├─ command-reason-catalog-kit
│  ├─ command-result-contract-kit
│  ├─ command-result-envelope-kit
│  ├─ interaction-preflight-reason-catalog-kit
│  ├─ pickup-command-result-kit
│  ├─ drop-command-result-kit
│  ├─ place-command-result-kit
│  ├─ remove-command-result-kit
│  ├─ player-pose-command-result-kit
│  ├─ ooze-command-result-kit
│  ├─ request-sync-command-result-kit
│  ├─ ready-cancel-command-result-kit
│  └─ victory-command-result-kit
├─ publish-domain
│  ├─ publish-decision-snapshot-kit
│  ├─ snapshot-build-kit
│  ├─ snapshot-publish-metadata-kit
│  ├─ local-authority-result-consumer-kit
│  └─ host-authority-result-consumer-kit
├─ diagnostics-domain
│  ├─ runtime-debug-frame-kit
│  ├─ runtime-debug-result-projection-kit
│  ├─ command-result-journal-kit
│  ├─ command-result-fixture-matrix-kit
│  └─ command-replay-fixture-kit
├─ hazard-domain
│  ├─ ooze-trail-domain-kit
│  ├─ ooze-decay-kit
│  ├─ ooze-spawn-kit
│  ├─ ooze-spacing-guard-kit
│  └─ ooze-seeded-rng-kit
├─ puzzle-domain
│  ├─ ordered-anomaly-sequence-kit
│  ├─ sequence-slot-authority-kit
│  ├─ end-anomaly-distance-check-kit
│  └─ correction-reversal-kit
└─ render-handoff-domain
   ├─ corridor-render-world-kit
   ├─ corridor-minimap-kit
   ├─ scene-dressing-descriptor-kit
   ├─ mesh-object-kit-catalog
   └─ procedural-texture-kit-family
```

## Current domains in use

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
command-source-normalization
command-reason-catalog
command-result-contract
command-result-envelope
command-result-status-policy
command-result-rejection-policy
interaction-preflight-diagnostics
player-pose-command-result
interaction-command-result
ooze-command-result
request-sync-command-result
ready-cancel-command-result
victory-command-result
command-result-journal
command-result-fixture-matrix
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

### App/session service

```txt
create-room-id
create-join-code
create-player-identity
create-room-state
enter-solo-mode
enter-host-lobby
enter-client-lobby
run-loading-readiness
patch-readiness-state
start-play
pause-resume
commit-completion
return-routing
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
classify-request-sync-recovery
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
rebuild-game-state-from-replicated-snapshot
rebuild-maze-result-from-replicated-snapshot
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
sync-local-carry-state-from-game-state
sync-local-carry-state-from-snapshot
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
create-command-id
create-accepted-result
create-rejected-result
create-unchanged-result
create-publish-only-result
attach-command-source
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

### Diagnostics and replay service

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
attach-command-journal-counts
attach-fixture-parity-report
window-debug-extract-state
serialize-command-envelope
serialize-command-result
replay-command-journal
run-fixture-matrix
normalize-volatile-fields
compare-final-snapshot
emit-parity-report
```

## All kits identified

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
ooze-trail-domain-kit
ordered-anomaly-sequence-kit
mesh-object-kit-catalog
procedural-texture-kit-family
static-smoke-validation-kit
live-player-validation-kit
command-envelope-contract-kit
command-source-normalization-kit
command-reason-catalog-kit
command-result-contract-kit
command-result-envelope-kit
interaction-preflight-reason-catalog-kit
pickup-command-result-kit
drop-command-result-kit
place-command-result-kit
remove-command-result-kit
player-pose-command-result-kit
ooze-command-result-kit
request-sync-command-result-kit
ready-cancel-command-result-kit
victory-command-result-kit
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
peerjs-transport-extraction-kit
renderer-host-extraction-kit
postprocess-stack-extraction-kit
minimap-render-extraction-kit
settings-overlay-extraction-kit
room-lobby-policy-kit
scene-dressing-expansion-kit
object-kit-authoring-fixture-kit
```

## Architecture decision

Do command-result and replay contracts first.

Only extract PeerJS, renderer, minimap, postprocess, and scene dressing after command authority can be replayed without DOM, PeerJS, or Three.js.
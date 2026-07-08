# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T05:00:17-04:00`

## Selection result

The full current `LuminaryLabs-Publish` repo list was checked:

```txt
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/TheUnmappedHouse
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PrehistoricRush
```

`TheCavalryOfRome` was excluded by standing rule.

The eligible Publish repos were compared against central `LuminaryLabs-Dev/LuminaryLabs` ledger search state. The checked eligible repos were already represented in the central ledger and had repo-local `.agent/START_HERE.md` state.

Because no new untracked eligible repo was found, this run used the fallback oldest eligible tracked repo rule and selected `LuminaryLabs-Publish/HorrorCorridor` for a follow-up documentation breakdown.

## Interaction loop

```txt
open app
-> choose solo, host, or client join mode
-> create room or join room identity
-> complete lobby/loading/readiness gates
-> mount GameCanvas
-> initialize maze, player, camera, renderer, minimap, snapshot stores, networking, and debug store
-> player enters pointer-lock first-person navigation
-> player moves through seeded maze
-> interact key derives pickup/drop/place/remove from local state and end-anomaly distance
-> local authority or host authority calls network/interaction domain rules
-> cube, slot, carried-state, anomaly, ooze, and victory state update
-> replicated snapshot is built and consumed by renderer, minimap, HUD, completion UI, and debug export
```

## Current authority problem

```txt
input or peer command
-> applyNetworkInteractionRequest or applyNetworkPlayerUpdate
-> GameState returned
-> unchanged state can mean rejected, skipped, publish-only, unchanged, or missing policy
-> caller uses identity checks or unconditional publish behavior
-> runtime debug records frames/events but not stable command result metadata
```

## Target authority loop

```txt
input or peer message
-> CommandEnvelope
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> runtime debug result projection
-> DOM-free fixture replay
-> final snapshot parity comparison
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
session-lifecycle
room-identity
lobby-readiness
peer-networking
host-transport
client-transport
network-message-protocol
replicated-snapshot-protocol
seeded-maze-bootstrap
maze-cell-lookup
maze-pathing
cube-spawn-bootstrap
anomaly-sequence-bootstrap
ordered-sequence-validation
victory-completion
first-person-input
pointer-lock-control
keyboard-input
mouse-look-input
player-view-angles
player-movement-integration
maze-collision-resolution
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
command-result-journal
publish-decision-snapshot
runtime-debug-frame-log
runtime-debug-event-log
runtime-debug-result-projection
cube-carry-interaction
nearest-cube-selection
end-anomaly-distance-check
slot-assignment
pickup-preflight
drop-preflight
place-preflight
remove-preflight
ooze-trail-navigation
ooze-decay
ooze-spawn
snapshot-build
snapshot-publish-contract
replay-parity-validation
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
mesh-object-kit-catalog
procedural-texture-kit-family
static-smoke-validation
live-player-validation
```

## Services that the kits offer

### Session and routing service

```txt
create-room-id
create-join-code
create-player-identity
enter-solo-mode
enter-host-lobby
enter-client-lobby
patch-readiness-state
start-play
pause-resume
commit-completion
```

### Peer sync service

```txt
create-host-transport
create-client-transport
send-lobby-events
send-start-game
send-full-sync
send-player-update
send-try-interact
receive-host-messages
map-peer-message-to-command-envelope
classify-request-sync-recovery
```

### Maze and snapshot service

```txt
hash-seed
generate-maze
build-cell-lookup
create-player-spawns
create-cube-spawns
initialize-anomaly-sequence-slots
create-initial-game-state
create-initial-replicated-snapshot
rebuild-game-state-from-replicated-snapshot
```

### Player movement service

```txt
keyboard-code-to-player-input-button
accumulate-player-look-delta
apply-player-look-delta
advance-player-movement
resolve-maze-collision
sync-camera-from-player
sync-local-carry-state-from-game-state
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
```

### Command result service

```txt
create-command-envelope
create-command-id
create-accepted-result
create-rejected-result
create-unchanged-result
create-publish-only-result
create-skipped-result
create-victory-result
attach-result-status
attach-rejection-reason
attach-before-after-tick
attach-before-after-snapshot-summary
preserve-legacy-gamestate-return-api
```

### Publish decision service

```txt
derive-publish-decision-from-result
publish-after-changed-command
skip-publish-after-rejected-command
publish-recovery-after-request-sync
publish-victory-after-sequence-complete
build-replicated-snapshot
broadcast-full-sync
compare-fixture-snapshot
```

### Diagnostics and replay service

```txt
runtime-debug-init
runtime-event-record
runtime-frame-record
attach-last-command-result
attach-last-rejection-reason
attach-last-publish-decision
attach-command-journal-counts
run-fixture-matrix
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
update-world-from-snapshot
draw-minimap-frame
record-scene-dressing-summary
dispose-render-runtime
```

## Kits identified

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

## Files changed in this documentation pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/validation.md
.agent/command-authority-audit/fixture-gate-implementation-map.md
.agent/trackers/2026-07-08T05-00-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-00-17-04-00.md
```

## Next safe ledge

```txt
HorrorCorridor Command Result Fixture Gate implementation
```

Build this before PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, scene dressing, or object-kit visual expansion.

## Validation performed

```txt
[done] GitHub connector read of full accessible LuminaryLabs-Publish repo list.
[done] GitHub connector search of central LuminaryLabs-Dev/LuminaryLabs Publish ledger state.
[done] GitHub connector read of HorrorCorridor root .agent state.
[done] GitHub connector read of package scripts.
[done] GitHub connector read of interactionRules.ts.
[done] GitHub connector read of networkRules.ts.
[done] GitHub connector read of runtimeDebugStore.ts.
[done] GitHub connector writes to repo-local .agent docs on main.
```

## Validation not performed

```txt
[not-run] local checkout
[not-run] npm install
[not-run] npm run lint
[not-run] npm run smoke:protokits
[not-run] npm run harness:horror-corridor
[not-run] npm run validate:live-player:dev
[not-run] browser route check
[not-run] live host/client multiplayer check
[not-run] GitHub Actions rerun
[not-run] runtime implementation edit
```

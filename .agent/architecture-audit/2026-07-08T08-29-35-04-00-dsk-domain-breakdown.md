# HorrorCorridor DSK Domain Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T08:29:35-04:00`

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` tracking state.

`TheCavalryOfRome` remains excluded.

No checked eligible repo was fully new, absent from the central ledger, or missing root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected as the oldest eligible fallback follow-up because the repo-local command/result planning exists, but the source-edit cutover order is not yet implemented.

## Product loop

```txt
start app
-> choose solo, host, or join
-> load room/session identity
-> initialize maze, players, cubes, anomaly slots, ooze state, renderer, minimap, debug store, and networking
-> pointer-lock movement through maze
-> derive interaction from player pose, carried cube, loose cubes, and anomaly distance
-> pickup / drop / place / remove cube
-> validate ordered anomaly sequence
-> host/local authority publishes replicated snapshot
-> renderer, minimap, HUD, completion screen, and runtime debug consume snapshot
```

## Domain map

### App/session domain

Owns:

```txt
application shell
screen routing
solo / host / client session selection
room id and join code
readiness state
pause / resume
completion routing
```

Services:

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

Kits:

```txt
corridor-session-domain-kit
readiness-state-kit
completion-routing-kit
```

### Networking and authority domain

Owns:

```txt
peer identity
host/client transport
network message protocol
full-sync output
request-sync recovery
host message ingress
client message egress
replicated snapshot protocol
```

Services:

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

Kits:

```txt
peer-room-sync-domain-kit
network-message-protocol-kit
host-authority-result-consumer-kit
local-authority-result-consumer-kit
replicated-snapshot-publish-kit
```

### Maze/bootstrap domain

Owns:

```txt
seed hash
maze generation
cell lookup
maze paths
player spawns
cube spawns
anomaly sequence slots
initial GameState
replicated snapshot rebuild
```

Services:

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

Kits:

```txt
maze-snapshot-bootstrap-kit
maze-cell-lookup-kit
cube-spawn-bootstrap-kit
anomaly-sequence-bootstrap-kit
```

### First-person player domain

Owns:

```txt
pointer lock
keyboard input
mouse look
view angles
movement integration
maze collision
camera bob
local carry state sync
```

Services:

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

Kits:

```txt
first-person-corridor-player-kit
pointer-lock-control-kit
maze-collision-resolution-kit
player-pose-command-result-kit
```

### Interaction command domain

Owns:

```txt
interaction state readiness
player lookup
carried cube lookup
nearest loose cube lookup
anomaly cell lookup
anomaly distance check
sequence slot lookup
pickup / drop / place / remove rules
stable rejection reason catalog
```

Services:

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

Kits:

```txt
interaction-preflight-reason-catalog-kit
pickup-command-result-kit
drop-command-result-kit
place-command-result-kit
remove-command-result-kit
victory-command-result-kit
```

### Command/result domain

Owns:

```txt
CommandEnvelope
CommandStatus
CommandReason
CommandResult
PublishDecision
CommandJournal
fixture replay records
result-to-debug projection
```

Services:

```txt
create-command-envelope
create-command-id
create-accepted-result
create-rejected-result
create-unchanged-result
create-publish-only-result
create-skipped-result
create-victory-result
attach-command-source
attach-result-status
attach-rejection-reason
attach-changed-flag
attach-event-list
attach-before-after-tick
attach-before-after-snapshot-summary
attach-diagnostics-payload
preserve-legacy-gamestate-return-api
derive-publish-decision-from-result
append-command-result
replay-command-journal
normalize-volatile-fields
compare-final-snapshot
emit-parity-report
```

Kits:

```txt
command-envelope-contract-kit
command-source-normalization-kit
command-reason-catalog-kit
command-result-contract-kit
command-result-envelope-kit
publish-decision-routing-kit
publish-decision-snapshot-kit
command-result-journal-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

### Ooze pressure domain

Owns:

```txt
ooze trail navigation
ooze decay
ooze spawn
ooze spacing guard
ooze max cap
ooze seeded rng
ooze command/result classification
```

Services:

```txt
advance-ooze-cadence
spawn-ooze-from-path
expire-ooze-trail
classify-ooze-spawn
classify-ooze-decay
classify-ooze-no-state-diff
```

Kits:

```txt
ooze-trail-domain-kit
ooze-command-result-kit
cadence-diagnostics-kit
```

### Render and minimap domain

Owns:

```txt
Three renderer
scene and camera
post-processing
maze world rendering
cube/anomaly rendering
minimap frame draw
scene dressing descriptors
render disposal
```

Services:

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

Kits:

```txt
corridor-render-world-kit
corridor-minimap-kit
scene-dressing-descriptor-kit
mesh-object-kit-catalog
procedural-texture-kit-family
```

## Source-backed implemented kit inventory

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
```

## Planned next kit inventory

```txt
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
publish-decision-routing-kit
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

## Current source-edit boundary

Do not extract renderer, PeerJS, minimap, or session routing first.

The next source pass should add result-returning contracts and wrappers beside the existing `GameState`-returning rule functions so the current runtime remains stable while new fixtures prove the result layer.

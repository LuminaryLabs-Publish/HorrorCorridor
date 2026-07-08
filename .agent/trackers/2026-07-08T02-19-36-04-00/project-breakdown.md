# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-08T02:19:36-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected because:** the full installed `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger. No new untracked eligible repo was found, `TheCavalryOfRome` is excluded, and `HorrorCorridor` remained the oldest eligible tracked Publish repo by latest reviewed timestamp.

## Plan ledger

**Goal:** Refresh root `.agent/` documentation for `HorrorCorridor` with required start, audit, gaps, validation, architecture, render, gameplay, tracker, and turn-ledger files so the next implementation pass can build the command result authority seam without restarting context.

## Checklist

```txt
[x] List installed LuminaryLabs-Publish repos.
[x] Compare full Publish list against central LuminaryLabs-Dev/LuminaryLabs ledger search results.
[x] Exclude TheCavalryOfRome.
[x] Select one repo only.
[x] Read existing HorrorCorridor tracker and registry state.
[x] Read package validation scripts.
[x] Read GameCanvas runtime loop.
[x] Read networkRules authority seam.
[x] Read interactionRules silent no-op paths.
[x] Identify interaction loop.
[x] Identify domains in use.
[x] Identify services that kits offer.
[x] Identify kits.
[x] Add required root .agent audit files.
[x] Log central change entry.
[ ] Run local npm validation, blocked by connector-only automation context.
```

## Full Publish repo list checked

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

## Central ledger comparison

Central ledger search showed tracked Publish repo files for:

```txt
AetherVale
MyCozyIsland
ZombieOrchard
IntoTheMeadow
TheUnmappedHouse
TheOpenAbove
HorrorCorridor
PrehistoricRush
PhantomCommand
```

`TheCavalryOfRome` was not selected because the standing rule forbids working on Cavalry of Rome.

No new untracked eligible repo was found in this pass.

## Current read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The app uses Next, React, Three.js, Zustand, PeerJS, TypeScript, and script-based validation/harnesses.

The current source already has a playable solo/host/client runtime, seeded maze bootstrap, pointer-lock movement, cube pickup/drop/place/remove rules, ordered anomaly victory, ooze cadence, replicated snapshots, minimap rendering, runtime debug frames/events, and object/texture kit direction.

## Interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas runtime
-> create renderer, scene, camera, post-processing, maze world, minimap, stores, local pose, and debug state
-> enter pointer-lock first-person navigation
-> move through seeded maze
-> press interact
-> derive action from distance-to-end and carried-cube state
-> pickup loose cube, drop carried cube, place carried cube at anomaly, or remove last anomaly cube
-> ordered anomaly sequence validates slot correctness
-> ooze cadence advances on host/local authority ticks
-> buildReplicatedSnapshot publishes authoritative state
-> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Authority loop

```txt
client PLAYER_UPDATE
-> host applyNetworkPlayerUpdate
-> GameState returned
-> host publishes resync snapshot

client TRY_INTERACT
-> host applyNetworkInteractionRequest
-> interactionRules return GameState only
-> invalid commands often return unchanged state with no reason metadata
-> host syncs held cubes
-> host publishes resync or recovery snapshot

local solo/host interact
-> local applyNetworkInteractionRequest
-> if nextState === currentGameState, return silently
-> otherwise publish resync snapshot
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

### Interaction and command authority service

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

### Publish, debug, and replay service

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

## Findings

```txt
package.json has validation scripts for lint, protokit smoke, harness, live agent, object-kit review, visual match, and live-player validation.
networkRules.applyNetworkPlayerUpdate returns GameState only.
networkRules.applyNetworkInteractionRequest maps request-sync, toggle-ready, cancel, and unknown actions to unchanged state.
interactionRules pickup/drop/place/remove return GameState only.
interactionRules has many rejected-command branches that return the previous state without stable reason metadata.
GameCanvas local authority skips publish when nextState identity equals currentGameState, but does not journal the rejection.
GameCanvas host TRY_INTERACT publishes resync or recovery after rule application even when command result metadata is absent.
Runtime debug frame captures cadence, snapshot, cube, anomaly, input, pose, and scene dressing data, but no command result or publish decision payload.
No DOM-free command fixture matrix proves accepted/rejected/unchanged/publish-only parity yet.
```

## Next safe ledge

```txt
HorrorCorridor Command Reason Catalog + Result Journal Fixture Gate
```

Build order:

```txt
preserve current solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior
-> add CommandEnvelope, CommandStatus, CommandReason, CommandResult, and PublishDecision contracts under game-state/domain
-> define stable CommandReason values for every current silent no-op branch
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
-> extend runtime debug frame/export with latestCommandResult, latestPublishDecision, commandJournal, and latestFixtureParity
-> add DOM-free fixtures for accepted pickup, rejected pickup, accepted drop, rejected drop, accepted place, rejected place, remove, request-sync recovery, ignored toggle-ready/cancel, player update, ooze tick, and victory completion
-> defer PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, and object-kit visual expansion
```

## Validation performed

```txt
GitHub connector repo list read
GitHub connector central ledger search
GitHub connector file reads for existing agent docs
GitHub connector file reads for package and source authority seams
documentation-only write to main
```

## Validation not performed

```txt
local checkout
npm install
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
browser route check
live host/client multiplayer check
GitHub Actions rerun
runtime source edit
```

## Files changed this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/render-surface-audit.md
.agent/gameplay-audit/authority-loop-audit.md
.agent/trackers/2026-07-08T02-19-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-19-36-04-00.md
.agent/README.md
```

## Central repo log

```txt
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T02-19-36-04-00-horror-corridor-root-agent-required-docs.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
```
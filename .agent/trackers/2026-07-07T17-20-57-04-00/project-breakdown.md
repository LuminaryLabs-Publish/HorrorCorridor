# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T17:20:57-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Default branch:** `main`

**Selected repo:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection reason

`HorrorCorridor` was selected because it was the oldest eligible tracked non-Cavalry repo by the latest central review timestamp available at the start of this run.

Latest eligible timestamps checked:

```txt
HorrorCorridor   2026-07-07T16:09:54-04:00
TheOpenAbove     2026-07-07T16:21:09-04:00
AetherVale       2026-07-07T16:29:18-04:00
PhantomCommand   2026-07-07T16:30:00-04:00
PrehistoricRush  2026-07-07T16:40:29-04:00
MyCozyIsland     2026-07-07T16:49:08-04:00
IntoTheMeadow    2026-07-07T16:58:09-04:00
ZombieOrchard    2026-07-07T17:10:21-04:00
```

## Current read

`HorrorCorridor` is a cooperative first-person horror maze runtime inside `HorrorCorridor-V1`. The repo is already playable through solo, host, and client session flows. It uses Next, React, Three.js, Zustand, and PeerJS, with seeded maze bootstrap, player movement, anomaly cube interaction, ordered sequence completion, ooze trail pressure, replicated snapshots, debug capture, object-kit direction, texture-kit direction, and validation scripts.

The next useful work is still not visual work. The source is ready for a command-result authority cutover, but rule results are not yet explicit enough for replay, host/client publish decisions, or durable diagnostics.

## Source evidence

```txt
HorrorCorridor-V1/package.json
  scripts include lint, smoke:protokits, live-agent, live-agent:sample, review:live-agent, review:object-kit, visual:match, validate:live-player, and validate:live-player:dev

HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
  applyNetworkPlayerUpdate returns only GameState
  missing player returns unchanged state
  applyNetworkInteractionRequest routes pickup, drop, place, and remove through interactionRules
  request-sync, toggle-ready, cancel, and default all return unchanged state

HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
  pickUpCube, dropCube, placeCubeAtEndAnomaly, and removeCubeFromEndAnomaly return only GameState
  invalid paths return unchanged state without explicit reason metadata
  valid place/remove routes call validateOrderedSequenceCompletion

HorrorCorridor-V1/src/components/game/GameCanvas.tsx
  owns renderer, scene, camera, post-processing, maze world, pointer lock, keyboard/mouse input, local simulation, host ingress, client egress, ooze cadence, snapshot publish, minimap render, runtime debug frame capture, completion, and cleanup
  host TRY_INTERACT applies interaction rules then publishes without accepted/rejected metadata
  local authoritative interact skips publish when nextState === currentGameState, losing rejected-command metadata
  request-sync maps to recovery publish only by action string, not by command result

HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
  RuntimeDebugFrameRecord captures pose, input, snapshot counts, cube records, anomaly slots, cadence, and scene dressing
  debug export is already available through window.__HORROR_CORRIDOR_DEBUG__
  latest command result, latest publish decision, rejection reason, and command journal counts are not yet frame fields
```

## Interaction loop

### Current loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create room id, join code, player identity, lobby state, and readiness state
-> host creates PeerJS transport or client connects to host code
-> run loading readiness steps
-> create seeded maze and initial replicated snapshot
-> mount GameCanvas
-> create renderer, scene, camera, post-processing, and maze world
-> enter pointer-lock first-person navigation
-> local authoritative sessions mutate currentGameState directly
-> clients send PLAYER_UPDATE and TRY_INTERACT messages
-> host applies applyNetworkPlayerUpdate / applyNetworkInteractionRequest directly
-> illegal interaction paths return unchanged GameState silently
-> local authoritative interaction uses nextState identity to skip publication
-> host interaction request publishes after rule application without stable result metadata
-> ooze trail advances on host cadence
-> buildReplicatedSnapshot creates authoritative snapshot
-> world, minimap, HUD, completion UI, and runtime debug frames consume latest snapshot
```

### Target loop

```txt
session-service creates or joins a run
-> peer-sync-service translates transport messages into command envelopes
-> local input and network messages normalize into CommandEnvelope records
-> command-acceptance-policy validates source, actor, room, command type, and payload shape
-> interaction-preflight-reason-catalog classifies legality before mutation
-> command-result-envelope wraps pose, interact, ooze, request-sync, toggle-ready, cancel, and victory outcomes
-> result-returning wrappers preserve existing GameState-returning exports
-> publish-decision-snapshot derives publish, skip, recovery, or victory behavior from result metadata
-> local-authority-result-consumer journals local rejected commands without publishing
-> host-authority-result-consumer skips rejected TRY_INTERACT publishes and publishes recovery requests
-> command-result-journal stores accepted, rejected, unchanged, and publish-only records
-> runtime-debug-result-projection exposes latest result, latest publish decision, rejection reason, and journal counts
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

## Services that kits offer

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

## Kits

### Current and candidate extraction kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
host-command-envelope-adapter-kit
command-envelope-contract-kit
command-acceptance-policy-kit
host-authority-command-kit
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

### Next-cut kits

```txt
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
runtime-debug-frame-kit
runtime-debug-result-projection-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
command-replay-fixture-kit
command-result-fixture-kit
replay-parity-smoke-kit
```

## Key findings

```txt
- The repo has strong validation scripts already available, so the next source cut can be protected without inventing a new test system.
- networkRules.ts is the highest-value reducer seam because both host network messages and local authoritative interaction pass through it.
- interactionRules.ts contains all required decision branches, but every illegal path currently collapses into unchanged GameState.
- GameCanvas.tsx is the current authority concentration point and should remain visually stable while command result metadata is inserted beneath it.
- RuntimeDebugFrameRecord is already a good projection target, but it needs result/publish fields rather than more ad hoc debug events.
- request-sync must become a publish-only recovery result, not just a string branch inside GameCanvas.
- toggle-ready and cancel should be explicitly classified as skipped or lobby-policy-deferred instead of falling through default unchanged state.
- Victory should be attached as a publish decision so replay can prove completion without depending on UI state alone.
```

## Recommended next work

1. Add a DOM-free `command-result-contract-kit` under the game-state domain.
2. Define result statuses: `accepted`, `rejected`, `unchanged`, and `publish-only`.
3. Define stable publish decisions: `publish`, `skip`, `recovery`, and `victory`.
4. Create a reason catalog for all existing silent no-op paths.
5. Add result-returning wrappers for player pose updates and interactions.
6. Preserve existing `applyNetworkPlayerUpdate`, `applyNetworkInteractionRequest`, `pickUpCube`, `dropCube`, `placeCubeAtEndAnomaly`, and `removeCubeFromEndAnomaly` return signatures.
7. Make legacy exports delegate to result-returning wrappers and return `result.state`.
8. Classify missing-player pose update as `rejected/missing_player`.
9. Classify same-pose update as `unchanged/no_state_change`.
10. Classify request-sync as `publish-only/request_sync_recovery`.
11. Classify toggle-ready and cancel as explicit skipped commands until lobby policy is wired.
12. Add publish-decision snapshot helpers around `publishAuthoritativeState`, `buildReplicatedSnapshot`, and `createFullSyncMessage` seams.
13. Add local and host result consumers inside GameCanvas without moving render or input code yet.
14. Extend runtime debug frame records with latest result, latest publish decision, rejection reason, and journal counters.
15. Add DOM-free fixture coverage before touching renderer, world-builder, PeerJS extraction, or visual object-kit work.

## Suggested next vertical slice

**Build target:** `HorrorCorridor Command Result Source Cutover + Debug Projection Lock`

```txt
preserve solo, host, and client visible behavior
-> add DOM-free command result contract types
-> add stable status, reason, and publish decision catalogs
-> add result factories
-> add interaction preflight helpers for pickup/drop/place/remove
-> add result-returning interaction wrappers
-> make existing interaction exports return result.state
-> add result-returning network player update wrapper
-> add result-returning network interaction wrapper
-> make existing network exports return result.state
-> classify request-sync as publish-only recovery
-> classify toggle-ready and cancel as explicit skipped commands
-> add command result journal shape
-> add publish decision snapshot helper
-> add local/host result consumer functions in GameCanvas only after source wrappers are in place
-> extend RuntimeDebugFrameRecord with latestCommandResult and latestPublishDecision
-> add replay fixtures for accepted, rejected, unchanged, publish-only, recovery, and victory
-> keep renderer, minimap, post-processing, PeerJS adapter, and visual-kit extraction deferred
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
command-result source imports no React, Three, Zustand, PeerJS, or DOM APIs
legacy GameState-returning APIs remain compatible
result-returning wrappers expose accepted/rejected/unchanged/publish-only metadata
all pickup/drop/place/remove no-op paths return stable rejection reasons
valid interactions produce identical GameState changes to current rules
missing-player pose update is rejected without mutation
same-pose update is unchanged without forced publish
request-sync is publish-only recovery
host rejected TRY_INTERACT does not publish a full-sync snapshot
local rejected interaction records debug/journal data without snapshot publish
runtime debug export includes latest command result and latest publish decision
command journal replay reaches identical normalized final replicated snapshot
render, minimap, post-processing, input, and transport behavior remain visually unchanged
```

## Files changed in this run

```txt
LuminaryLabs-Publish/HorrorCorridor:.agent/trackers/2026-07-07T17-20-57-04-00/project-breakdown.md
LuminaryLabs-Publish/HorrorCorridor:.agent/README.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-07T17-20-57-04-00-horror-corridor-command-result-source-cutover-breakdown.md
```

## Validation status

```txt
runtime source changed: no
local build run: no
local smoke run: no
reason: documentation-only breakdown run through GitHub connector
```

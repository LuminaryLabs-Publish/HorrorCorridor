# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run timestamp:** `2026-07-07T16:09:54-04:00`

**Selected repo:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection reason

`HorrorCorridor` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed it as the oldest eligible tracked non-Cavalry repo by latest review timestamp.

Latest eligible timestamps checked from the central ledger:

```txt
HorrorCorridor   2026-07-07T14:51:44-04:00
TheOpenAbove     2026-07-07T15:11:23-04:00
PhantomCommand   2026-07-07T15:19:05-04:00
PrehistoricRush  2026-07-07T15:29:27-04:00
MyCozyIsland     2026-07-07T15:40:06-04:00
IntoTheMeadow    2026-07-07T15:49:14-04:00
ZombieOrchard    2026-07-07T15:59:24-04:00
AetherVale       2026-07-07T16-29-18-04-00
```

## Current read

`HorrorCorridor` is a cooperative first-person horror maze implemented in `HorrorCorridor-V1` as a Next / React / Three.js / Zustand / PeerJS project. It already has solo, host, and client play, seeded maze bootstrap, pointer-lock first-person navigation, cube pickup/drop/place/remove interactions, ordered anomaly sequence validation, ooze trail simulation, replicated snapshots, runtime debug export, and object/texture kit catalog work.

The next blocker is still not rendering or content. The blocker is **authority result semantics**. `interactionRules.ts` and `networkRules.ts` contain the right reducer seams, but most failures collapse to `return state`. Host/client publication can only infer success from object identity or blind publication. The next implementation needs result envelopes at the exact reducer seams before expanding PeerJS, renderer extraction, or visual kits.

## Evidence reviewed

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
.agent/README.md
.agent/kit-registry.json
```

## Interaction loop

### Current loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room/session
-> run readiness state
-> create seeded maze snapshot
-> mount GameCanvas
-> create renderer, scene, camera, post-processing, maze world, minimap, and input listeners
-> enter pointer-lock first-person movement
-> local authoritative sessions mutate currentGameState directly
-> clients send PLAYER_UPDATE and TRY_INTERACT messages
-> host calls applyNetworkPlayerUpdate / applyNetworkInteractionRequest
-> interactionRules silently return unchanged GameState for illegal command paths
-> host TRY_INTERACT publishes after rule application even without result metadata
-> local authoritative interaction skips publish when nextState === currentGameState
-> ooze advances on host cadence
-> buildReplicatedSnapshot publishes state
-> runtime debug captures frames/events but not command result or publish decision
-> render, minimap, HUD, completion, and debug overlay consume latest snapshot
```

### Target loop

```txt
session-service creates or joins a run
-> peer-sync-service maps transport messages into CommandEnvelope records
-> local authoritative input also creates CommandEnvelope records
-> command-result-envelope-kit wraps pose, interaction, ooze, and request-sync outcomes
-> interaction-preflight-reason-catalog classifies every current silent no-op branch
-> result-returning network/interaction wrappers preserve legacy GameState APIs
-> publish-decision-snapshot-kit derives publish, skip, recovery, or victory from result metadata
-> GameCanvas local and host authority paths consume result metadata
-> command-result-journal-kit records accepted/rejected/unchanged/publish-only counts
-> runtime-debug-result-projection-kit exposes latest result and publish decision
-> command-replay-fixture-kit replays command envelopes against deterministic snapshots
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
publish-victory-after-sequence-complete
attach-publish-reason
attach-publish-sequence
attach-room-phase-updated-at
build-replicated-snapshot
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

### Current / candidate kits

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
snapshot-publish-metadata-kit
publish-decision-snapshot-kit
snapshot-publish-fixture-kit
command-result-journal-kit
command-replay-fixture-kit
command-result-fixture-kit
runtime-debug-frame-kit
runtime-debug-result-projection-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
replay-parity-smoke-kit
```

## Key findings

```txt
- package.json already exposes useful validation commands: lint, protokit smoke, live player validation, live agent runs, object-kit review, and visual matching.
- GameCanvas.tsx is still the runtime concentration point: renderer setup, input listeners, local pose stepping, client sends, host message handling, state mutation, snapshot publishing, ooze cadence, minimap draw, completion routing, and debug capture.
- networkRules.ts is the reducer seam, but applyNetworkPlayerUpdate and applyNetworkInteractionRequest still return only GameState.
- interactionRules.ts owns pickup/drop/place/remove legality, but every illegal path collapses to unchanged state.
- request-sync, toggle-ready, and cancel are currently indistinguishable from gameplay no-op paths in rule output.
- local authoritative interaction uses nextState identity to skip publication, which keeps visuals stable but loses rejection metadata.
- host TRY_INTERACT applies rules, syncs held cubes, publishes, and checks victory without a result envelope.
- runtimeDebugStore.ts already has the right export seam through window.__HORROR_CORRIDOR_DEBUG__.extractState(), but the frame shape has no latestCommandResult, latestPublishDecision, or commandJournal fields.
```

## Recommended next work

Next slice:

```txt
HorrorCorridor Local/Host Result Cutover + Fixture Parity Gate
```

Build order:

```txt
keep solo, host, and client play working
-> add command-result-contract-kit types first
-> add command-result-envelope-kit as DOM-free source code under game-state/domain
-> add stable result statuses: accepted, rejected, unchanged, publish-only
-> add stable reasons: not_playing, missing_player, already_carrying, no_carried_cube, no_nearby_cube, too_far_from_anomaly, no_open_slot, wrong_slot, no_placed_cube, missing_anomaly_cell, unknown_interaction_action, unknown_network_action
-> add publish decisions: publish, skip, recovery, victory
-> keep current interactionRules exports returning GameState
-> add pickUpCubeWithResult, dropCubeWithResult, placeCubeAtEndAnomalyWithResult, removeCubeFromEndAnomalyWithResult
-> keep current networkRules exports returning GameState
-> add applyNetworkPlayerUpdateWithResult and applyNetworkInteractionRequestWithResult
-> make legacy exports call result wrappers and return result.state
-> classify request-sync as publish-only recovery
-> classify toggle-ready and cancel as explicit publish-only or skip policy
-> add publish-decision-snapshot-kit near buildReplicatedSnapshot/createFullSyncMessage seams
-> update GameCanvas local applyInteraction to journal rejected commands without publishing
-> update GameCanvas host TRY_INTERACT path to skip publish for rejected commands and publish recovery for request-sync
-> preserve current victory behavior but attach victory publish decision
-> extend RuntimeDebugFrameRecord and extractState with latestCommandResult, latestPublishDecision, and commandJournal
-> add DOM-free fixtures for every result status and publish decision
-> add replay parity fixture comparing normalized final replicated snapshots
-> defer render extraction, world-builder extraction, broad PeerJS adapter extraction, and visual object-kit work
```

## Fixture matrix

```txt
missing-player pose update          -> rejected / missing_player / skip
identical pose update               -> accepted / unchanged / skip
changed pose update                 -> accepted / changed / publish
illegal pickup while not playing    -> rejected / not_playing / skip
illegal pickup while already held   -> rejected / already_carrying / skip
legal pickup                        -> accepted / changed / publish
illegal place too far               -> rejected / too_far_from_anomaly / skip
illegal place no carried cube       -> rejected / no_carried_cube / skip
legal place wrong color             -> accepted / changed / publish
legal place completes sequence      -> accepted / changed / victory
wrong-slot remove                   -> rejected / wrong_slot / skip
legal remove                        -> accepted / changed / publish
request-sync                        -> publish-only / recovery / recovery
toggle-ready                        -> publish-only or unchanged / explicit policy
seeded ooze no-change               -> accepted / unchanged / skip
seeded ooze changed                 -> accepted / changed / publish
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
command-result-envelope source imports no React, Three, Zustand, PeerJS, or DOM APIs
legacy interactionRules and networkRules public exports remain compatible
result-returning wrappers expose state, status, changed, reason, events, diagnostics, and publishDecision
all current silent no-op interaction paths map to stable reasons
valid command results produce the same GameState mutations as current code
host rejected TRY_INTERACT commands do not publish snapshots
local rejected commands produce debug/journal records without publishing
request-sync produces recovery publish metadata
victory still reaches completion UI
debug extractState includes latest result and publish decision data
replay fixture reaches identical normalized final replicated snapshot
render, minimap, post-processing, and PeerJS behavior remain visually unchanged
```

## Validation status

No runtime source code changed in this pass.

No local build or smoke test was executed.

# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-08T01:31:11-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Default branch:** `main`

**Chosen repo:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded by rule:** `LuminaryLabs-Publish/TheCavalryOfRome`

**Next slice:** `HorrorCorridor Command Reason Catalog + Result Journal Fixture Gate`

## Summary

`HorrorCorridor` remains the oldest eligible tracked non-Cavalry repo in the Publish rotation after the latest `ZombieOrchard` pass. The source read confirms the project is still a cooperative first-person horror maze with a Next/React shell, Three.js world renderer, PeerJS transport path, seeded maze bootstrap, cube/anomaly interaction rules, runtime debug store, and host-authored replicated snapshots.

The useful next move is to stop treating unchanged `GameState` identity as the only command outcome. The repo needs stable command reasons, result envelopes, publish decisions, and replay fixtures before extracting PeerJS, renderer, minimap, post-processing, or object-kit visual systems.

## Selection ledger

```txt
eligible Publish repos checked:
  HorrorCorridor      2026-07-08T00:00:20-04:00  selected, oldest eligible
  TheUnmappedHouse    2026-07-08T00:08:03-04:00
  TheOpenAbove        2026-07-08T00:21:15-04:00
  AetherVale          2026-07-08T00:28:42-04:00
  PhantomCommand      2026-07-08T00:41:39-04:00
  PrehistoricRush     2026-07-08T00:49:44-04:00
  MyCozyIsland        2026-07-08T01:00:43-04:00
  IntoTheMeadow       2026-07-08T01:10:16-04:00
  ZombieOrchard       2026-07-08T01:20:35-04:00

excluded:
  TheCavalryOfRome    standing rule
```

## Evidence files read

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/*.md
```

## Current interaction loop

### Player-facing loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas
-> enter pointer-lock first-person navigation
-> move through seeded maze
-> interact key chooses one of four cube/anomaly actions from distance-to-end and carry state
-> pickup loose cube, drop carried cube, place cube at anomaly, or remove last anomaly cube
-> ordered anomaly sequence validates completion
-> ooze cadence continues under authoritative runtime
-> replicated snapshots update renderer, minimap, HUD, and debug overlay
-> victory/completion screen or pause/return routing takes over
```

### Current runtime loop

```txt
package scripts run Next, harnesses, object-kit review, visual match, and live-player validation
-> GameCanvas imports stores, debug store, protocol messages, network rules, interaction rules, ooze rules, win rules, player controls, render systems, world builder, and minimap
-> initializeRuntime rebuilds maze result and GameState from replicated snapshot
-> solo and host sessions directly mutate currentGameState
-> clients send PLAYER_UPDATE and TRY_INTERACT messages
-> host transport receives peer messages
-> PLAYER_UPDATE calls applyNetworkPlayerUpdate and immediately publishes a resync snapshot
-> TRY_INTERACT calls applyNetworkInteractionRequest and publishes resync or recovery
-> interactionRules return GameState only, with silent unchanged state for invalid branches
-> local authority publishes only if nextState !== currentGameState
-> runtime debug records frames/events, cadence, snapshot counts, cube states, anomaly slots, and scene dressing
-> renderer, minimap, postprocess, HUD, completion route, and debug overlay consume snapshots
```

### Target authority loop

```txt
local input and peer messages normalize into CommandEnvelope records
-> command reason catalog classifies every branch before mutation
-> result-returning wrappers preserve current GameState-returning exports
-> CommandResult records status, reason, changed flag, events, before/after tick, diagnostics, and source
-> PublishDecision derives publish, skip, recovery, victory, or no-op from result metadata
-> local authority journals rejected commands and publishes only accepted changed/victory results
-> host authority skips rejected TRY_INTERACT publishes, publishes request-sync recovery, and records skipped toggle-ready/cancel commands
-> runtime debug export includes latestCommandResult, latestPublishDecision, commandJournal, and fixtureParity
-> DOM-free fixture matrix replays accepted, rejected, unchanged, publish-only, and victory paths against normalized snapshots
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

## Services that kits offer

### App/session services

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

### Peer sync services

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

### Maze bootstrap services

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

### First-person player services

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

### Interaction preflight services

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

### Command result envelope services

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

### Publish decision services

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

### Local authority result consumer services

```txt
consume-local-pose-result
consume-local-interaction-result
journal-rejected-local-command
skip-local-publish-for-rejection
publish-local-changed-command
preserve-current-local-victory-routing
```

### Host authority result consumer services

```txt
consume-host-player-update-result
consume-host-interaction-result
skip-rejected-try-interact-publish
publish-request-sync-recovery
skip-toggle-ready-or-cancel-until-lobby-policy-exists
publish-changed-host-command
preserve-current-host-victory-routing
```

### Diagnostics services

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
```

### Replay services

```txt
serialize-command-envelope
serialize-command-result
append-accepted-result
append-rejected-result
append-unchanged-result
append-publish-only-result
replay-command-journal
run-fixture-matrix
normalize-volatile-fields
compare-final-snapshot
emit-parity-report
```

### Render services

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

### Current source-backed kits

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
```

### Planned next-cut kits

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
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

### Deferred extraction kits

```txt
peerjs-transport-extraction-kit
renderer-host-extraction-kit
postprocess-stack-extraction-kit
minimap-render-extraction-kit
settings-overlay-extraction-kit
room-lobby-policy-kit
scene-dressing-expansion-kit
object-kit-authoring-fixture-kit
```

## Source-backed findings

```txt
package.json exposes Next, build/start/lint, live agent, object-kit review, protokit smoke, visual match, and live-player validation scripts.
networkRules.ts exports NetworkInteractionAction, NetworkPlayerUpdateInput, NetworkInteractionRequestInput, syncHeldCubesToPlayers, applyNetworkPlayerUpdate, and applyNetworkInteractionRequest.
applyNetworkInteractionRequest switches pickup, drop, place, remove, request-sync, toggle-ready, cancel, and default, but returns GameState only.
request-sync, toggle-ready, cancel, and default currently return unchanged state with no result metadata.
interactionRules.ts has all core legality branches, but invalid paths return state without stable rejection reasons.
GameCanvas.tsx directly derives local/client action from distance-to-end and carry state.
Local authoritative sessions skip publish when nextState === currentGameState.
Host TRY_INTERACT path publishes resync or recovery after applying interaction request, without accepted/rejected metadata.
Runtime debug frames include pose, input, snapshot counts, cube states, anomaly slots, cadence, and scene dressing.
Runtime debug store does not yet expose latestCommandResult, latestPublishDecision, commandJournal, or fixtureParity.
```

## Active blockers

```txt
interaction rules encode legality but not reason contracts
network rules return GameState only instead of ActionResult/CommandResult
request-sync behavior is mixed into interaction action handling instead of explicit publish-only result flow
toggle-ready and cancel are accepted action names but do not produce status metadata
local publish gating depends on object identity
host publish path can resync after rejected TRY_INTERACT with no rejection classification
debug output cannot explain why a command was accepted, rejected, skipped, or published
fixture coverage cannot prove accepted/rejected/publish-only parity yet
```

## Next implementation slice

```txt
HorrorCorridor Command Reason Catalog + Result Journal Fixture Gate
```

### Build order

```txt
preserve current solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior
-> add CommandEnvelope, CommandStatus, CommandReason, CommandResult, and PublishDecision types under game-state/domain
-> add stable reason catalog for every current silent no-op branch
-> add interaction preflight helpers beside interactionRules
-> add result-returning wrappers for pickup, drop, place, and remove
-> keep existing interaction exports returning result.state
-> add result-returning wrappers for applyNetworkPlayerUpdate and applyNetworkInteractionRequest
-> keep existing network exports returning result.state
-> classify request-sync as publish-only recovery
-> classify toggle-ready and cancel as skipped unchanged commands until lobby policy exists
-> add command result journal counters
-> add publish decision snapshot helper
-> wire local authority to journal rejection and publish only accepted changed/victory results
-> wire host authority to skip rejected TRY_INTERACT publishes and publish request-sync recovery
-> extend runtime debug frame/export with latestCommandResult, latestPublishDecision, commandJournal, and latestFixtureParity
-> add DOM-free fixtures for accepted pickup, rejected pickup, accepted drop, rejected drop, accepted place, rejected place, remove, request-sync recovery, ignored toggle-ready/cancel, player update, ooze tick, and victory completion
-> defer PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, and object-kit visual expansion
```

## Acceptance target

```txt
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run review:object-kit
```

Expected fixture assertions:

```txt
accepted pickup mutates cube owner and journal accepted += 1
rejected pickup with no nearby cube does not mutate state and journal rejected += 1
accepted drop clears cube owner and journal accepted += 1
rejected drop with no carried cube does not mutate state and journal rejected += 1
accepted place fills next anomaly slot and may trigger victory
rejected place too far from anomaly does not mutate state and exposes too-far-from-anomaly
request-sync produces publish-only recovery decision
toggle-ready and cancel produce skipped unchanged decisions
host rejected TRY_INTERACT does not broadcast resync
local rejected command does not publish but is visible in debug export
runtime debug export includes latest command result and publish decision
fixture replay parity normalizes volatile timestamp/frame fields
```

## Files changed in this docs-only pass

```txt
.agent/trackers/2026-07-08T01-31-11-04-00/project-breakdown.md
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T01-31-11-04-00-horror-corridor-command-reason-journal-fixture-breakdown.md
```

## Notes

No runtime source files were changed in this pass. No local build or smoke test was run because the pass only updates internal documentation and central tracking.

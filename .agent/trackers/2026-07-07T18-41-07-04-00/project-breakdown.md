# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T18:41:07-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Default branch:** `main`

**Selected next slice:** `Result Envelope Fixture Gate + Host Publish Policy Lock`

## Plan ledger

**Goal:** Refresh the repo-local `.agent` docs for the oldest eligible tracked non-Cavalry Publish repo, keep the work scoped to one repo, and define the next concrete implementation slice without changing runtime source.

**Checklist**

- [x] Checked the accessible `LuminaryLabs-Publish` repository set.
- [x] Confirmed `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.
- [x] Checked the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger timestamps.
- [x] Selected `LuminaryLabs-Publish/HorrorCorridor` as the oldest eligible tracked repo.
- [x] Re-read the current source seams for networking, interaction rules, runtime canvas authority, runtime debug, and package scripts.
- [x] Identified the current interaction loop.
- [x] Identified domains in use.
- [x] Identified current and next services.
- [x] Identified current, candidate, and next-cut kits.
- [x] Wrote this timestamped tracker entry.
- [x] Prepared root `.agent` index and registry refresh.
- [x] Prepared central ledger and change-log update.

## Selection reason

The accessible `LuminaryLabs-Publish` installation currently exposes these repos:

```txt
HorrorCorridor
AetherVale
TheOpenAbove
TheCavalryOfRome
PhantomCommand
PrehistoricRush
ZombieOrchard
IntoTheMeadow
MyCozyIsland
```

`TheCavalryOfRome` is excluded by standing rule. The central ledger showed this eligible review order at the start of the run:

```txt
HorrorCorridor   2026-07-07T17:20:57-04:00
TheOpenAbove     2026-07-07T17:29:51-04:00
AetherVale       2026-07-07T17-38-46-04-00
PhantomCommand   2026-07-07T17:49:34-04:00
PrehistoricRush  2026-07-07T18:00:19-04:00
MyCozyIsland     2026-07-07T18:10:03-04:00
IntoTheMeadow    2026-07-07T18:19:15-04:00
ZombieOrchard    2026-07-07T18:28:54-04:00
```

`HorrorCorridor` is therefore the oldest eligible tracked non-Cavalry Publish repo.

## Current repo read

`HorrorCorridor` is a cooperative first-person horror corridor game implemented under `HorrorCorridor-V1` with Next, React, Three.js, Zustand, and PeerJS. It already has menu/session flow, solo/host/client modes, seeded maze bootstrap, first-person pointer-lock movement, cube pickup/drop/place/remove interactions, ordered anomaly sequence completion, host-authoritative replication, ooze trail ticking, runtime debug frames, minimap rendering, visual object-kit direction, and validation scripts.

The repo is still blocked on command-result authority. The mutation seams return only `GameState`, so accepted, rejected, unchanged, publish-only, recovery, and victory paths cannot yet be tested or displayed as stable metadata. That makes `GameCanvas.tsx` decide publish behavior from state identity or action type rather than a source-owned `CommandResult`.

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create room ID, join code, peer identity, local player identity, lobby state, and readiness state
-> run loading readiness gates
-> create seeded maze, cube spawns, sequence slots, and initial replicated snapshot
-> mount GameCanvas
-> create renderer, scene, camera, post-processing, and maze world
-> enter pointer-lock first-person input loop
-> local authoritative sessions advance pose and mutate currentGameState directly
-> clients send PLAYER_UPDATE and TRY_INTERACT messages
-> host receives transport messages
-> host applies applyNetworkPlayerUpdate or applyNetworkInteractionRequest directly
-> interaction rules return GameState only
-> invalid interactions return unchanged state silently
-> local authoritative interaction skips publish when nextState identity equals currentGameState
-> host TRY_INTERACT publishes after rule application even without accepted/rejected metadata
-> host cadence advances ooze and publishes replicated snapshots
-> world, minimap, HUD, completion UI, and debug frames consume snapshots
```

## Target interaction loop

```txt
session-service creates room/session state
-> peer-sync-service converts transport messages into CommandEnvelope records
-> local input and network messages normalize into one command stream
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

### Runtime and app domains

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
settings-overlay
completion-routing
pause-state
readiness-state
```

### Session and networking domains

```txt
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
```

### Maze and objective domains

```txt
seeded-maze-bootstrap
maze-cell-lookup
maze-pathing
cube-spawn-bootstrap
anomaly-sequence-bootstrap
sequence-slot-authority
ordered-sequence-validation
victory-completion
```

### Player and input domains

```txt
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
```

### Gameplay authority domains

```txt
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
```

### Interaction domains

```txt
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
```

### Ooze domains

```txt
ooze-trail-navigation
ooze-decay
ooze-spawn
ooze-spacing-guard
ooze-max-cap
ooze-seeded-rng
```

### Snapshot, diagnostics, rendering, and validation domains

```txt
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

### Current candidate/extraction kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
host-command-envelope-adapter-kit
host-authority-command-kit
maze-world-render-kit
runtime-debug-frame-kit
wound-triangle-mesh-domain-kit
mesh-object-kit-catalog
horror-corridor-preset-kit
procedural-texture-kit-family
```

### Current object and material kits

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

### Next-cut source authority kits

```txt
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

## Evidence-backed findings

```txt
- package.json already exposes useful validation commands: lint, smoke:protokits, live-agent, live-agent:sample, object-kit review, visual matching, and live-player validation.
- networkRules.ts currently exposes applyNetworkPlayerUpdate and applyNetworkInteractionRequest as GameState-returning functions.
- request-sync, toggle-ready, cancel, and default interaction actions currently collapse to unchanged state.
- interactionRules.ts already has enough branch structure to classify pickup, drop, place, and remove rejection reasons, but those paths currently return state only.
- GameCanvas.tsx handles local and host authority decisions inline.
- Local authoritative interaction currently skips publication by comparing nextState identity to currentGameState.
- Host TRY_INTERACT currently publishes after rule application and only special-cases request-sync as recovery by action type.
- RuntimeDebugFrameRecord currently projects pose, input, snapshot, cubes, anomaly, cadence, and scene dressing, but not latest command result or publish decision.
- window.__HORROR_CORRIDOR_DEBUG__ already exposes getLatestFrame, getFrames, getEvents, and extractState, making it the right place to expose command-result debug projection after source wrappers exist.
```

## Main blocker

```txt
The source has gameplay legality but not result authority.

Until every command returns a typed result, the runtime cannot reliably prove:
- whether a command was accepted or rejected,
- why an interaction was rejected,
- whether publication should happen,
- whether request-sync was a recovery publish,
- whether a local no-op should be journaled,
- whether host TRY_INTERACT should skip publication,
- whether a fixture replay reached the same final replicated snapshot.
```

## Next slice

```txt
HorrorCorridor Result Envelope Fixture Gate + Host Publish Policy Lock
```

### Build order

```txt
preserve current solo, host, and client visible behavior
-> add DOM-free command result type definitions
-> add stable CommandStatus values: accepted, rejected, unchanged, publish-only
-> add stable CommandReason catalog for all silent no-op paths
-> add stable PublishDecision values: publish, skip, recovery, victory, no-op
-> add command result factories
-> add interaction preflight helpers beside current interaction rules
-> add result-returning wrappers for pickup, drop, place, and remove
-> keep current interaction exports returning result.state
-> add result-returning player update wrapper
-> add result-returning network interaction wrapper
-> keep current network exports returning result.state
-> classify request-sync as publish-only recovery
-> classify toggle-ready and cancel as explicit skipped commands
-> add command result journal records
-> add publish decision snapshot helper
-> wire local-authority consumer after source wrappers exist
-> wire host-authority consumer after source wrappers exist
-> extend RuntimeDebugFrameRecord with latestCommandResult, latestPublishDecision, and journal counts
-> add DOM-free replay fixtures for accepted, rejected, unchanged, publish-only, recovery, and victory paths
-> defer renderer, minimap, post-processing, PeerJS extraction, and visual-kit extraction
```

### Acceptance gates

```txt
- applyNetworkInteractionRequest still returns GameState for existing callers.
- New result wrapper returns CommandResult for the same inputs.
- All previous unchanged interaction paths now expose stable rejection or unchanged reasons.
- request-sync returns publish-only recovery metadata.
- toggle-ready and cancel return explicit skipped metadata.
- Local rejected interaction does not publish.
- Host rejected TRY_INTERACT does not publish.
- Runtime debug extractState exposes latest command result and publish decision after at least one command.
- DOM-free replay fixture can compare normalized final replicated snapshots.
```

## Deferred work

```txt
renderer extraction
minimap extraction
post-processing extraction
PeerJS adapter extraction
visual object-kit implementation
texture-kit expansion
new maze themes
new enemy systems
new objective chains
```

## Files read this run

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/AetherVale.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PrehistoricRush.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Publish/HorrorCorridor:.agent/README.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/package.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/components/game/GameCanvas.tsx
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Changes made

```txt
Added this tracker entry.
Refreshed root .agent README.
Refreshed .agent kit registry.
Prepared central repo ledger refresh.
Prepared central internal change-log entry.
```

## Validation

```txt
No runtime source files were changed.
No local build was run.
No smoke test was run.
Documentation was updated only.
```

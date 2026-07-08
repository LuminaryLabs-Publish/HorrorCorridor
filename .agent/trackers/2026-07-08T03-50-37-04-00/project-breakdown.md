# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run timestamp:** `2026-07-08T03:50:37-04:00`

## Selection

The full current `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

```txt
LuminaryLabs-Publish/HorrorCorridor       selected by oldest eligible tracked fallback
LuminaryLabs-Publish/AetherVale           tracked, root .agent present
LuminaryLabs-Publish/TheOpenAbove         tracked, root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by standing rule
LuminaryLabs-Publish/PhantomCommand       tracked, root .agent present
LuminaryLabs-Publish/PrehistoricRush      tracked, root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked, root .agent present
LuminaryLabs-Publish/IntoTheMeadow        tracked, root .agent present
LuminaryLabs-Publish/MyCozyIsland         tracked, root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked, root .agent present
```

No new untracked eligible Publish repo was found, so this pass used the fallback rule and continued `HorrorCorridor`, the oldest eligible tracked Publish repo.

## Files inspected

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/next-steps.md
.agent/kit-registry.json
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room identity
-> run loading/readiness gates
-> mount GameCanvas
-> build renderer, scene, camera, post-processing, maze world, local pose, minimap, runtime debug, and store bridges
-> enter pointer-lock first-person maze navigation
-> interact key derives action from distance-to-end and carried-cube state
-> pickup, drop, place, or remove cube
-> ordered anomaly sequence validates completion
-> host/local authority publishes snapshots
-> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Current authority loop

```txt
local solo/host interaction
-> applyNetworkInteractionRequest
-> GameState or same GameState returned
-> same-object no-op skips local publish
-> changed state publishes resync

client interaction
-> send TRY_INTERACT
-> host applyNetworkInteractionRequest
-> host publishes resync even if command was rejected by unchanged state

client pose
-> send PLAYER_UPDATE
-> host applyNetworkPlayerUpdate
-> host publishes resync

runtime debug
-> records frame/event state
-> exports latest frame, frames, and events
-> does not expose latest command result, rejection reason, publish decision, command journal, or fixture parity
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

```txt
app-session-service
- create room/player identity
- route solo/host/client flows
- run readiness gates
- pause/resume
- commit completion

peer-sync-service
- create host/client transport
- send and receive lobby/start/full-sync/player-update/try-interact messages
- map peer messages to command envelopes

maze-bootstrap-service
- hash seed
- generate maze
- build cell lookup
- spawn cubes and players
- initialize anomaly sequence
- rebuild GameState from replicated snapshot

first-person-player-service
- keyboard mapping
- pointer lock
- look delta
- movement integration
- maze collision
- camera sync
- carry-state sync

interaction-preflight-service
- check game state
- find player and carried cube
- find nearest loose cube
- resolve anomaly cell and slot
- classify every accepted/rejected interaction reason

command-result-envelope-service
- create command envelopes
- create accepted/rejected/unchanged/publish-only/skipped/victory results
- attach changed flag, reason, diagnostics, and before/after snapshot summary

publish-decision-service
- derive publish, skip, recovery, victory, or no-op decisions from command results
- build replicated snapshot
- broadcast full sync only when policy says to publish

diagnostics-and-replay-service
- record runtime debug frames/events
- expose latest result and publish decision
- journal command results
- replay command journals against normalized snapshots

render-service
- create renderer, scene, camera, and post-processing
- build maze world
- draw minimap
- consume snapshot descriptors
- dispose render runtime
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

## Added this pass

```txt
.agent/command-authority-audit/result-reason-matrix.md
.agent/trackers/2026-07-08T03-50-37-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T03-50-37-04-00.md
```

## Next safe ledge

```txt
HorrorCorridor Command Reason Catalog + Result Journal Fixture Gate
```

The next implementation pass should add result-returning command wrappers beside the existing GameState-returning exports, preserve current gameplay, and make accepted/rejected/unchanged/publish-only/victory behavior fixture-readable before any renderer or PeerJS extraction.

## Validation

Documentation-only pass.

No runtime source files changed.

No build, lint, harness, browser, or live-player validation was run.

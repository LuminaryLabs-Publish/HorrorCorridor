# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T08:29:35-04:00`

## Summary

`HorrorCorridor` is a playable cooperative first-person horror maze, but its command authority seam is still too implicit for safe host/client parity claims.

The source already has real runtime services: session flow, seeded maze bootstrap, first-person input, cube interaction, ordered anomaly victory, host/client sync, ooze cadence, Three.js rendering, minimap, runtime debug frames/events, and validation scripts.

This pass did not change runtime code. It updated the repo-local `.agent` state and added a source-edit cutover queue so the next implementation pass has an exact file order, wrapper boundary, stop line, and fixture proof target.

## Repo selection

The full installed `LuminaryLabs-Publish` repo list was checked during this pass.

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

`TheCavalryOfRome` remains excluded by standing rule.

Central ledger and latest-summary state showed tracked entries for the eligible Publish repos. Root `.agent/START_HERE.md` state was present for the sampled eligible checked repos.

Because no new untracked eligible repo was found in this pass, this run selected `HorrorCorridor` as the oldest eligible fallback follow-up after newer PrehistoricRush and TheUnmappedHouse alignments. HorrorCorridor was already documented, but it still needed a source-edit cutover queue that turns the command-result acceptance ledger and publish-decision matrix into implementation order.

## Evidence checked

```txt
LuminaryLabs-Publish installation repo list
LuminaryLabs-Dev/LuminaryLabs:repo-checks/reports/latest-summary.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/next-steps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/known-gaps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/validation.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
LuminaryLabs-Publish/PrehistoricRush:.agent/START_HERE.md
LuminaryLabs-Publish/TheUnmappedHouse:.agent/START_HERE.md
```

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas runtime
-> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, and debug state
-> enter pointer-lock first-person navigation
-> derive interact action from distance-to-end and carried-cube state
-> pickup, drop, place, or remove cube
-> ordered sequence validates anomaly completion
-> ooze cadence advances on host/local authority ticks
-> authoritative snapshot is built and published or skipped
-> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Current authority loop

```txt
client PLAYER_UPDATE
-> host applyNetworkPlayerUpdate
-> GameState returned
-> host publishes resync snapshot

client TRY_INTERACT
-> host applyNetworkInteractionRequest
-> interaction rule returns GameState only
-> rejected/invalid commands often return unchanged state without reason metadata
-> host syncs carried cubes
-> host publishes resync or recovery snapshot

local solo/host interact
-> local applyNetworkInteractionRequest
-> if nextState identity equals currentGameState, return silently
-> otherwise publish resync snapshot
```

## Target authority loop

```txt
input or peer message
-> CommandEnvelope
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> RuntimeDebug result projection
-> DOM-free fixture replay
-> final snapshot parity comparison
```

## Current source-backed services

```txt
app/session service
peer sync service
maze bootstrap service
first-person player service
interaction preflight service
command result envelope service
publish decision service
diagnostics and replay service
render service
minimap service
validation/harness service
object/texture kit catalog service
```

## All domains in use

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

## Current risk

The runtime can play, render, sync, and complete, but command authority is still not fixture-safe.

Rejected commands are not distinguishable from no-op commands.

`request-sync` is not represented as a publish-only recovery command.

`toggle-ready`, `cancel`, and default network actions are not represented as skipped commands.

Victory is a state mutation but still needs explicit command-result and publish-decision status.

Host publishing does not yet use command result metadata.

Runtime debug does not yet expose latest command result, rejection reason, publish decision, journal counts, or fixture parity.

## Follow-up artifacts added

```txt
.agent/architecture-audit/2026-07-08T08-29-35-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T08-29-35-04-00-render-authority-readback.md
.agent/command-authority-audit/2026-07-08T08-29-35-04-00-source-edit-cutover-queue.md
.agent/trackers/2026-07-08T08-29-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T08-29-35-04-00.md
```

## Current next slice

```txt
HorrorCorridor Command Result Fixture Gate: Source Edit Cutover Queue
```

This should happen before PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, scene dressing, object-kit visual expansion, or new level content.

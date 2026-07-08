# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T15:49:18-04:00`

## Summary

`HorrorCorridor` is playable and structurally rich, but command authority remains the next safest proof boundary.

This pass did not change runtime source. It refreshed repo-local `.agent` state and narrowed the next implementation to a command consumer fixture runner, result-returning legacy adapters, local/host command consumers, and runtime debug command readback.

## Repo selection

The accessible `LuminaryLabs-Publish` repo list was checked during this pass.

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / latest sampled alignment 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/HorrorCorridor      selected fallback follow-up
LuminaryLabs-Publish/AetherVale          tracked / latest sampled alignment 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / latest sampled alignment 2026-07-08T14-18-45-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / latest sampled alignment 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / latest sampled alignment 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / latest sampled alignment 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / latest sampled alignment 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / latest sampled alignment 2026-07-08T14:51:11-04:00
```

`TheCavalryOfRome` remains excluded by standing rule.

No new untracked eligible repo was found. `HorrorCorridor` was selected as the oldest observed eligible central-ledger fallback because the command-result fixture files are still absent and the command authority seam is still highest value.

## Evidence checked

```txt
LuminaryLabs-Publish repository search list
LuminaryLabs-Dev/LuminaryLabs repo ledger entries for checked Publish repos
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/next-steps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/known-gaps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/validation.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/package.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/components/game/GameCanvas.tsx
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
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
local solo/host interact
-> GameCanvas derives action string
-> applyNetworkInteractionRequest returns GameState only
-> if nextState === currentGameState, GameCanvas returns silently
-> otherwise syncHeldCubesToPlayers
-> publishAuthoritativeState("resync")
-> commitVictory if gameState === "victory"

client TRY_INTERACT
-> host applies applyNetworkInteractionRequest
-> rejected/invalid commands can collapse to unchanged GameState
-> host still calls publishAuthoritativeState(event action === request-sync ? recovery : resync)
-> host needs decision metadata for publish, skip, recovery, and victory

client PLAYER_UPDATE
-> host applies applyNetworkPlayerUpdate
-> missing-player and no-diff paths need explicit result metadata
```

## Target authority loop

```txt
input or peer message
-> CommandEnvelope
-> CommandReason catalog
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
-> RuntimeDebugCommandProjection
-> publishAuthoritativeState only from explicit decision
-> DOM-free fixture replay
-> final snapshot parity comparison
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
publish-decision-snapshot
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
command-replay-fixture
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

## Current source-backed services

```txt
app/session service
peer sync service
maze bootstrap service
first-person player service
legacy GameState interaction service
legacy GameState network service
command result envelope service
publish decision service
local authority result consumer service
host authority result consumer service
diagnostics and replay service
render service
minimap service
validation/harness service
object/texture kit catalog service
```

## Current risk

The runtime can play, render, sync, and complete, but command authority is still not fixture-safe.

Rejected commands are not distinguishable from no-op commands.

`request-sync` is not represented as a publish-only recovery command.

`toggle-ready`, `cancel`, and default network actions are not represented as skipped commands.

Victory is a state mutation but still needs explicit command-result and publish-decision status.

Host/local publishing still needs shared consumer metadata before GameCanvas should change.

Runtime debug does not yet expose latest command result, rejection reason, publish decision, consumer action, journal counts, or fixture parity.

## Follow-up artifacts added

```txt
.agent/architecture-audit/2026-07-08T15-49-18-04-00-command-consumer-fixture-implementation-map.md
.agent/render-audit/2026-07-08T15-49-18-04-00-runtime-debug-command-readback-contract.md
.agent/gameplay-audit/2026-07-08T15-49-18-04-00-local-host-command-consumer-loop.md
.agent/command-authority-audit/2026-07-08T15-49-18-04-00-fixture-runner-acceptance-queue.md
.agent/trackers/2026-07-08T15-49-18-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T15-49-18-04-00.md
```

## Current next slice

```txt
HorrorCorridor Command Consumer Fixture Runner + Legacy Adapter Source Cut
```

This should happen before PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, scene dressing, object-kit visual expansion, or new level content.

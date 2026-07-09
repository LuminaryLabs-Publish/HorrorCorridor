# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T20-30-19-04-00`

## Summary

`HorrorCorridor` is playable, visually present, and already has a rich source scaffold, but command authority is still the safest next proof boundary.

This pass did not change runtime source. It refreshed repo-local `.agent` state and narrowed the next implementation to a seed-state fixture contract that proves command envelopes, result metadata, publish decisions, local/host consumers, runtime debug projection, and final snapshot parity before `GameCanvas.tsx` is rewired.

## Repo selection

The accessible `LuminaryLabs-Publish` repo list was checked during this pass.

```txt
LuminaryLabs-Publish/HorrorCorridor      selected / oldest sampled eligible fallback / command fixture seed-state contract unresolved
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / recently refreshed
```

`TheCavalryOfRome` remains excluded by standing rule.

No new untracked eligible repo was found. `HorrorCorridor` was selected because it had the oldest sampled current root-agent timestamp and the command fixture source boundary is still absent.

## Evidence checked

```txt
LuminaryLabs-Publish repository installation list
LuminaryLabs-Dev/LuminaryLabs repo-ledger search results for Publish repos
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
seeded fixture state
-> CommandEnvelope
-> CommandReason catalog
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
-> RuntimeDebugCommandProjection
-> publishAuthoritativeState only from explicit decision
-> final replicated snapshot summary
-> DOM-free fixture replay parity
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
command-seed-state-fixture
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
command seed-state fixture service
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

## Kits identified

```txt
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
ooze-trail-domain-kit
ordered-anomaly-sequence-kit
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
command-seed-state-fixture-kit
publish-decision-snapshot-kit
command-result-journal-kit
interaction-preflight-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

## Current risk

The runtime can play, render, sync, and complete, but command authority is still not fixture-safe.

Rejected commands are not distinguishable from no-op commands.

`request-sync` is not represented as a publish-only recovery command.

`toggle-ready`, `cancel`, and default network actions are not represented as skipped commands.

The fixture must now begin from explicit seed states instead of browser-only runtime state so accepted, rejected, unchanged, skipped, recovery, and victory rows can be proven without DOM, canvas, PeerJS, or Three.js.

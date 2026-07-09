# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-40-50-04-00`

**Mode:** documentation-only repo breakdown and central ledger sync

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, select exactly one eligible repo, update root `.agent/` docs, identify the interaction loop/domains/services/kits, and log the change in `LuminaryLabs-Dev/LuminaryLabs`.

## Checklist

```txt
[x] Compared accessible LuminaryLabs-Publish repo list.
[x] Compared against central LuminaryLabs-Dev/LuminaryLabs repo-ledger entries.
[x] Excluded TheCavalryOfRome.
[x] Selected one repo only: HorrorCorridor.
[x] Read repo-local .agent state.
[x] Read package scripts.
[x] Read GameCanvas runtime evidence.
[x] Read interactionRules evidence.
[x] Read networkRules evidence.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified services that kits offer.
[x] Identified implemented and planned kits.
[x] Updated required root .agent docs.
[x] Added timestamped architecture audit.
[x] Added timestamped render audit.
[x] Added timestamped gameplay audit.
[x] Added timestamped command-authority audit.
[x] Added timestamped interaction audit.
[x] Added timestamped deploy audit.
[x] Added timestamped turn-ledger entry.
[x] Updated kit registry.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[x] Pushed to main only.
```

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / oldest eligible central-ledger fallback
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
```

## Selection reason

No non-Cavalry Publish repo was fully new, absent from the ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`HorrorCorridor` was selected because it was the oldest eligible central-ledger fallback and because command authority remains the highest-value unresolved documentation/implementation seam.

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas runtime
-> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, cadence, and debug state
-> enter pointer-lock first-person navigation
-> derive interact action from distance-to-end and carried-cube state
-> local solo/host runs applyNetworkInteractionRequest directly
-> client sends TRY_INTERACT to host
-> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
-> request-sync/toggle-ready/cancel/default paths collapse to unchanged GameState
-> sync held cubes to players
-> ordered sequence validates anomaly completion
-> ooze cadence advances on authoritative ticks
-> authoritative snapshot is built and published or skipped
-> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
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
legacy-game-state-interaction-rules
legacy-game-state-network-rules
command-envelope-contract
command-source-normalization
command-reason-catalog
command-result-contract
command-decision-contract
publish-decision-snapshot
command-result-journal
interaction-preflight-diagnostics
player-pose-command-result
interaction-command-result
ooze-command-result
request-sync-command-result
ready-cancel-command-result
victory-command-result
command-seed-state-fixture
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
central-ledger-synchronization
```

## Services that kits offer

```txt
app/session service: mode, room, readiness, pause, completion
peer sync service: host/client transport, full sync, player update, try interact
maze bootstrap service: seed, maze generation, cell lookup, path build, cube spawn, sequence slots
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy GameState interaction service: pickup, drop, place, remove, ordered completion
legacy GameState network service: player update, held-cube sync, interaction dispatch, request-sync no-op
command fixture seed service: planned canonical GameState seeds and expected row facts
command result envelope service: planned command id, source, status, reason, changed flag, events, diagnostics, legacy adapters
publish decision service: planned publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag
local authority result consumer service: planned local result journal and publish/skip behavior
host authority result consumer service: planned host result journal, request-sync recovery, rejected TRY_INTERACT skip, and accepted/victory publish behavior
diagnostics and replay service: runtime events, runtime frames, cadence, planned command readback, fixture parity
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
central ledger sync service: repo-local tracker, root .agent pointer, central repo-ledger, internal change log
```

## Kits identified

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
mesh-object-kit-catalog
procedural-texture-kit-family
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
command-decision-contract-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-command-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-sync-kit
```

## Files changed in repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T06-40-50-04-00-command-authority-replay-matrix-dsk-map.md
.agent/render-audit/2026-07-09T06-40-50-04-00-runtime-debug-command-projection-readback.md
.agent/gameplay-audit/2026-07-09T06-40-50-04-00-local-host-authority-replay-loop.md
.agent/command-authority-audit/2026-07-09T06-40-50-04-00-command-authority-replay-matrix-contract.md
.agent/interaction-audit/2026-07-09T06-40-50-04-00-preflight-result-reason-coverage.md
.agent/deploy-audit/2026-07-09T06-40-50-04-00-command-fixture-script-gate.md
.agent/trackers/2026-07-09T06-40-50-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T06-40-50-04-00.md
```

## Runtime source changes

```txt
none
```

## Validation performed

```txt
GitHub connector read of Publish repo list
GitHub connector read of central ledger files
GitHub connector read of HorrorCorridor agent docs
GitHub connector read of package scripts
GitHub connector read of GameCanvas source
GitHub connector read of interactionRules source
GitHub connector read of networkRules source
documentation update pushed to main
central ledger update pushed to main
```

## Validation not performed

```txt
npm install
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
node scripts/horror-corridor-command-fixture.mjs
npm run validate:live-player:dev
browser route check
live host/client multiplayer check
runtime source edit
```

## Next safe ledge

```txt
HorrorCorridor Command Authority Replay Matrix + Runtime Debug Projection Fixture Gate
```

Start with result-first pure domain files and fixture rows.

Do not edit `GameCanvas.tsx` publish behavior until DOM-free rows prove accepted, rejected, skipped, unchanged, recovery, ooze, and victory behavior.

# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T15:49:18-04:00`

## Goal

Refresh repo-local `.agent` docs for one chosen `LuminaryLabs-Publish` repo, compare the publish org list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, and record the next safe command-authority implementation ledge.

## Checklist

```txt
[x] Listed accessible LuminaryLabs-Publish repos.
[x] Compared central ledger entries for checked Publish repos.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Selected one repo only: LuminaryLabs-Publish/HorrorCorridor.
[x] Read root .agent/START_HERE.md, current-audit.md, next-steps.md, known-gaps.md, validation.md, and kit-registry.json.
[x] Read package scripts and command-authority source anchors.
[x] Identified interaction loop.
[x] Identified all domains in use.
[x] Identified services that kits offer.
[x] Identified implemented and next-cut kits.
[x] Added architecture, render, gameplay, and command-authority audits.
[x] Updated required root .agent files.
[x] Added this tracker entry.
[x] Added timestamped turn-ledger entry.
[x] Updated central LuminaryLabs repo ledger.
[x] Added central internal change log.
[x] Pushed to main only.
```

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed / central last updated 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/HorrorCorridor      selected / oldest eligible central fallback + command fixture queue
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed / central last updated 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed / central last updated 2026-07-08T14-18-45-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed / central latest reviewed 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent observed / central last updated 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent observed / central last updated 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed / central last updated 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed / central last updated 2026-07-08T14:51:11-04:00
```

## Selection reason

No checked non-Cavalry repo was fully new, missing from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected because the central ledger was the oldest observed eligible fallback and because the repo-local command fixture source files are still absent.

## Source evidence read

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Interaction loop

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
  -> pickup, drop, place, or remove cube through GameState-returning rules
  -> ordered sequence validates anomaly completion
  -> ooze cadence advances on host/local authority ticks
  -> authoritative snapshot is built and published or skipped by inline policy
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

## Services

```txt
app/session service: mode, room identity, join code, readiness, pause, completion
peer sync service: host/client transport, full sync, player update, try interact, request-sync recovery
maze bootstrap service: seed, grid, lookup, cube spawn, anomaly sequence, initial snapshot
first-person service: keyboard, pointer lock, look, movement, collision, camera pose, local carry sync
legacy interaction service: GameState-returning pickup/drop/place/remove
legacy network service: GameState-returning PLAYER_UPDATE, TRY_INTERACT, sync-held-cubes
command result service: planned accepted/rejected/unchanged/publish-only/skipped/victory envelopes
publish decision service: planned publish/skip/recovery/no-op/victory classifier
local authority consumer: planned local result journal and publish gate
host authority consumer: planned host result journal, recovery, and publish gate
runtime debug service: frame/event capture now; command projection next
fixture replay service: planned DOM-free command replay matrix
render service: Three scene, camera, postprocess, maze world, minimap, scene dressing summary
```

## Kits

Implemented/source-backed:

```txt
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
ooze-trail-domain-kit
ordered-anomaly-sequence-kit
maze-bootstrap-domain-kit
player-input-domain-kit
player-movement-domain-kit
collision-resolution-domain-kit
replicated-snapshot-protocol-kit
```

Next-cut:

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
interaction-preflight-diagnostics-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
legacy-gamestate-adapter-kit
```

## Files added or updated

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T15-49-18-04-00-command-consumer-fixture-implementation-map.md
.agent/render-audit/2026-07-08T15-49-18-04-00-runtime-debug-command-readback-contract.md
.agent/gameplay-audit/2026-07-08T15-49-18-04-00-local-host-command-consumer-loop.md
.agent/command-authority-audit/2026-07-08T15-49-18-04-00-fixture-runner-acceptance-queue.md
.agent/trackers/2026-07-08T15-49-18-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T15-49-18-04-00.md
```

## Next safe ledge

```txt
HorrorCorridor Command Consumer Fixture Runner + Legacy Adapter Source Cut
```

## Validation

Documentation-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
local checkout: no
npm install: no
npm run lint: no
node scripts/horror-corridor-command-fixture.mjs: not available yet
browser smoke: no
pushed to main: yes
```

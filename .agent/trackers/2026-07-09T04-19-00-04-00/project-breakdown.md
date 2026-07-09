# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-19-00-04-00`

## Plan ledger

**Goal:** Compare the current `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, select one eligible repo, update the chosen repo root `.agent` docs, identify the interaction loop/domains/services/kits, and log the result centrally.

## Checklist

```txt
[x] Listed accessible LuminaryLabs-Publish repos.
[x] Compared checked repos against central repo-ledger timestamps.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Selected one repo only: LuminaryLabs-Publish/HorrorCorridor.
[x] Read repo-local .agent state.
[x] Read central ledger state.
[x] Read package.json validation scripts.
[x] Read GameCanvas runtime/publish/render loop.
[x] Read networkRules authority seam.
[x] Read interactionRules no-op branches.
[x] Read runtimeDebugStore export shape.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified services offered by kits.
[x] Identified implemented and planned kits.
[x] Updated required root .agent docs.
[x] Added timestamped architecture, render, gameplay, command-authority, interaction, deploy, tracker, and turn-ledger docs.
[x] Updated central repo ledger in LuminaryLabs-Dev/LuminaryLabs.
[x] Added central internal change-log entry.
[ ] Did not run local npm/browser validation.
[ ] Did not edit runtime/source files.
```

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      selected / tracked / root .agent present / latest central 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-09T02-11-07-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
```

## Selection reason

No checked non-Cavalry Publish repo was new, missing from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`HorrorCorridor` was selected as the oldest eligible central-ledger fallback.

## Interaction loop

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
  -> local solo/host calls applyNetworkInteractionRequest and uses object identity to decide publish/no-op
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT with GameState-returning network rules
  -> request-sync/toggle-ready/cancel/default paths collapse to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot by implicit reason strings
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
session-lifecycle
peer-networking
host-transport
client-transport
replicated-snapshot-protocol
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
static-smoke-validation
live-player-validation
replay-parity-validation
central-ledger-synchronization
```

## Services that kits offer

```txt
app/session service: mode, room, readiness, pause, completion.
peer sync service: host/client transport, full sync, player update, try interact.
maze bootstrap service: seed, maze generation, cell lookup, path build, cube spawn, sequence slots.
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync.
legacy interaction service: pickup, drop, place, remove, ordered completion.
legacy network service: player update, held-cube sync, interaction dispatch, request-sync no-op.
command result envelope service: planned command id, source, status, reason, changed flag, events, diagnostics, legacy adapters.
publish decision service: planned publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag.
local authority consumer service: planned local result journal and publish/skip behavior.
host authority consumer service: planned host result journal, request-sync recovery, rejected TRY_INTERACT skip, accepted/victory publish behavior.
diagnostics and replay service: runtime events, runtime frames, cadence, planned command readback, fixture parity.
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal.
central ledger sync service: repo-local tracker, root .agent pointer, central repo-ledger, internal change log.
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

## Main finding

`HorrorCorridor` should not be visually expanded yet. The playable surface and render/debug loop exist, but command authority is still not source-owned. The next work should make rejected, skipped, unchanged, request-sync recovery, accepted, and victory paths explicit `CommandResult` records with `PublishDecision` and runtime debug readback.

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T04-19-00-04-00-command-consumer-freeze-dsk-map.md
.agent/render-audit/2026-07-09T04-19-00-04-00-runtime-debug-command-readback-contract.md
.agent/gameplay-audit/2026-07-09T04-19-00-04-00-local-host-result-loop.md
.agent/command-authority-audit/2026-07-09T04-19-00-04-00-result-first-source-cut-contract.md
.agent/interaction-audit/2026-07-09T04-19-00-04-00-preflight-reason-matrix.md
.agent/deploy-audit/2026-07-09T04-19-00-04-00-command-fixture-script-gate.md
.agent/trackers/2026-07-09T04-19-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T04-19-00-04-00.md
```

## Next safe ledge

```txt
HorrorCorridor Result-First Command Consumer Source Cut + Runtime Debug Readback Fixture Gate
```

## Validation

Performed: repo-list read, central ledger readback, repo-local `.agent` readback, source readback, repo-local `.agent` writes, central ledger write, central internal change-log write.

Not performed: local checkout, `npm install`, `npm run lint`, smoke/harness runs, browser route check, live host/client multiplayer check, runtime source edit.

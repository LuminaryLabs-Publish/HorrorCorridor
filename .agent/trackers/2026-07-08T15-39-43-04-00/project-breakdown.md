# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T15:39:43-04:00`

## Selection result

Selected one repo only:

```txt
LuminaryLabs-Publish/HorrorCorridor
```

## Publish repository comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/HorrorCorridor      selected fallback follow-up / previous central latest reviewed 2026-07-08T13:59:50-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T14:18:45-04:00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T14:51:11-04:00
```

No checked non-Cavalry repo was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected as the oldest current eligible fallback and because the next source-backed command fixture files remain absent.

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

## Services that kits offer

```txt
app/session service:
  room identity, join code, player identity, mode selection, readiness, pause/resume, completion routing

peer sync service:
  host transport, client transport, full sync, player update, try interact, request sync recovery

maze bootstrap service:
  seed hash, maze generation, cell lookup, path build, cube spawn, sequence slots, initial snapshot

first-person player service:
  keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync

interaction preflight service:
  playing-state validation, player lookup, carried-cube lookup, nearest-cube lookup, anomaly distance, slot resolution, stable rejection reason

command result envelope service:
  command id, command source, status, reason, changed flag, events, diagnostics, legacy GameState return adapter

publish decision service:
  publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag

local authority result consumer service:
  consume local interaction result, journal rejection, skip local rejected/no-op publish, publish accepted changed/victory

host authority result consumer service:
  consume host player update result, consume host interaction result, skip rejected TRY_INTERACT broadcast, publish request-sync recovery, publish accepted changed/victory

diagnostics service:
  runtime events, runtime frames, cadence, latest command result, latest publish decision, journal counts, fixture parity

replay service:
  fixture matrix, journal replay, volatile normalization, snapshot parity, proof output

render service:
  renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
```

## Kits

```txt
Implemented/source-backed:
- corridor-render-world-kit
- corridor-minimap-kit
- runtime-debug-frame-kit
- ooze-trail-domain-kit
- ordered-anomaly-sequence-kit
- procedural-texture-kit-family
- mesh-object-kit-catalog

Planned next:
- command-envelope-contract-kit
- command-reason-catalog-kit
- command-result-envelope-kit
- publish-decision-snapshot-kit
- command-result-journal-kit
- interaction-preflight-kit
- interaction-result-rule-kit
- network-result-rule-kit
- local-authority-result-consumer-kit
- host-authority-result-consumer-kit
- runtime-debug-result-projection-kit
- command-result-fixture-matrix-kit
- command-replay-fixture-kit
```

## Source findings

```txt
HorrorCorridor-V1/package.json has validation scripts but no command fixture script.
interactionRules.ts returns GameState only and silently returns unchanged state for invalid branches.
networkRules.ts returns GameState only and returns unchanged state for request-sync, toggle-ready, cancel, and default actions.
GameCanvas.tsx calls applyNetworkInteractionRequest directly for local and host command flow.
GameCanvas.tsx uses object identity to skip local publishes.
GameCanvas.tsx host TRY_INTERACT handling publishes after rule application without explicit CommandResult or PublishDecision metadata.
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T15-39-43-04-00-command-fixture-source-manifest.md
.agent/render-audit/2026-07-08T15-39-43-04-00-debug-command-projection-readback.md
.agent/gameplay-audit/2026-07-08T15-39-43-04-00-local-host-command-fixture-boundary.md
.agent/command-authority-audit/2026-07-08T15-39-43-04-00-source-file-manifest-and-adapter-boundary.md
.agent/trackers/2026-07-08T15-39-43-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T15-39-43-04-00.md
```

## Validation performed

```txt
[done] GitHub connector read of full accessible Publish repo list.
[done] GitHub connector read of central ledgers.
[done] GitHub connector read of HorrorCorridor .agent docs.
[done] GitHub connector read of package scripts.
[done] GitHub connector read of interactionRules.ts.
[done] GitHub connector read of networkRules.ts.
[done] GitHub connector read of GameCanvas.tsx.
[done] Documentation files pushed to main.
```

## Validation not performed

```txt
[not-run] local checkout
[not-run] npm install
[not-run] npm run lint
[not-run] npm run smoke:protokits
[not-run] npm run harness:horror-corridor
[not-run] node scripts/horror-corridor-command-fixture.mjs
[not-run] browser route check
[not-run] live host/client multiplayer check
[not-run] runtime source edit
```

## Next safe ledge

```txt
HorrorCorridor Command Fixture Source File Manifest + Legacy Adapter Boundary
```

Implement source-backed command result contracts, legacy adapters, local/host consumers, and the DOM-free fixture before editing `GameCanvas.tsx` publish behavior.

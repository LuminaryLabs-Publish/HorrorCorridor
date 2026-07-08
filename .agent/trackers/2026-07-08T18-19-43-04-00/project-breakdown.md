# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T18-19-43-04-00`

**Run type:** documentation-only repo breakdown

## Plan ledger

**Goal:** Compare the current `LuminaryLabs-Publish` repo list against `LuminaryLabs-Dev/LuminaryLabs`, choose one eligible repo, refresh root `.agent` docs, identify interaction loop/domains/services/kits, and log the work centrally.

**Checklist**

```txt
[x] Listed accessible LuminaryLabs-Publish repos.
[x] Compared checked repos against LuminaryLabs-Dev/LuminaryLabs central tracking.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Selected one repo only: LuminaryLabs-Publish/HorrorCorridor.
[x] Read repo-local .agent state.
[x] Read package scripts.
[x] Read GameCanvas runtime/publish/render loop.
[x] Read interactionRules silent no-op branches.
[x] Read networkRules network action seam.
[x] Read runtimeDebugStore export surface.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified services offered by kits.
[x] Identified current and next-cut kits.
[x] Updated required root .agent docs.
[x] Added architecture, render, gameplay, and command-authority audits.
[x] Added timestamped tracker and turn-ledger entries.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Did not run local/browser validation.
[ ] Did not edit runtime/source implementation files.
```

## Repo selected

```txt
LuminaryLabs-Publish/HorrorCorridor
```

## Selection reason

No checked non-Cavalry repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected as the oldest current eligible fallback because the command consumer fixture runner and legacy adapter source cut remain absent while the local/host command authority seam is still highest value.

## Publish repository comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      selected / oldest eligible fallback / previous central latest 2026-07-08T15:39:43-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-08T17:49:51-04:00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-08T17:31:22-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central 2026-07-08T15:58:59-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-08T16:51:11-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-08T16:20:00-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-08T17:59:43-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-08T17:09:48-04:00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-08T16:19:57-04:00
```

## Current read

`HorrorCorridor` is a cooperative first-person horror maze implemented under `HorrorCorridor-V1` with Next, React, Three.js, Zustand, PeerJS, and TypeScript.

It includes solo/host/client session flow, seeded maze bootstrap, pointer-lock first-person movement, cube pickup/drop/place/remove rules, ordered anomaly sequence completion, ooze cadence, host-authored replicated snapshots, minimap rendering, runtime debug frames/events, object/texture kit direction, and validation scripts.

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

## Current domains in use

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

## Services that the kits offer

```txt
app/session service: room identity, join code, player identity, mode selection, readiness, pause/resume, completion routing
peer sync service: host transport, client transport, full sync, player update, try interact, request sync recovery
maze bootstrap service: seed hash, maze generation, cell lookup, path build, cube spawn, sequence slots, initial snapshot
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
interaction-preflight service: playing-state validation, player lookup, carried-cube lookup, nearest-cube lookup, anomaly distance, slot resolution, stable rejection reason
command-result-envelope service: command id, source, status, reason, changed flag, events, diagnostics, legacy GameState return adapter
publish-decision service: publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag
local-authority-result-consumer service: consume local interaction result, journal rejection, skip rejected/no-op publish, publish accepted changed/victory
host-authority-result-consumer service: consume host player update result, consume host interaction result, skip rejected TRY_INTERACT broadcast, publish request-sync recovery, publish accepted changed/victory
diagnostics service: runtime events, runtime frames, cadence, latest command result, latest publish decision, journal counts, fixture parity
replay service: fixture matrix, journal replay, volatile normalization, snapshot parity, proof output
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
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

## Main findings

`interactionRules.ts` still returns `GameState` only, and silent rejection branches return the unchanged state for not-playing, missing player, carrying conflicts, distance failures, slot failures, and cube lookup failures.

`networkRules.ts` still routes `pickup-cube`, `drop-cube`, `place-cube-at-anomaly`, and `remove-cube-from-anomaly` into those state-returning rules while `request-sync`, `toggle-ready`, `cancel`, and default actions return unchanged state without result metadata.

`GameCanvas.tsx` still derives action strings from distance and carry state, uses object identity to skip local publish, and publishes on host interaction handling without a source-owned `PublishDecision` record.

`runtimeDebugStore.ts` exports frame and event history, but does not expose command result, publish decision, consumer action, or command journal summary.

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T18-19-43-04-00-command-consumer-fixture-dsk-map.md
.agent/render-audit/2026-07-08T18-19-43-04-00-runtime-debug-result-projection-map.md
.agent/gameplay-audit/2026-07-08T18-19-43-04-00-command-result-authority-loop.md
.agent/command-authority-audit/2026-07-08T18-19-43-04-00-legacy-adapter-source-cut.md
.agent/trackers/2026-07-08T18-19-43-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T18-19-43-04-00.md
```

## Next safe ledge

```txt
HorrorCorridor Command Consumer Fixture Runner + Legacy Adapter Source Cut
```

Expected implementation chain:

```txt
CommandEnvelope
  -> CommandReason catalog
  -> CommandResult envelope
  -> CommandSnapshotSummary
  -> CommandEvent
  -> PublishDecision
  -> CommandJournal
  -> interaction preflight helpers
  -> interaction result wrappers
  -> network result wrappers
  -> local authority command consumer
  -> host authority command consumer
  -> runtime debug command projection
  -> DOM-free command fixture
  -> GameCanvas consumer splice only after fixture passes
```

## Validation performed

```txt
GitHub repo-list read
central ledger readback
repo-local .agent readback
repo-local source readback
repo-local .agent write
central ledger write
central internal change-log write
```

## Validation not performed

```txt
local checkout
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

No runtime success is claimed.

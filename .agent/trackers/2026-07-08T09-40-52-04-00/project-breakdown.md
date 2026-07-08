# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T09:40:52-04:00`

## Goal

Update one eligible Publish repo's internal `.agent` docs after comparing the full Publish org repo list against central tracking.

## Plan checklist

```txt
[x] List current LuminaryLabs-Publish repos.
[x] Exclude TheCavalryOfRome.
[x] Compare against central LuminaryLabs-Dev/LuminaryLabs tracking.
[x] Select one repo only.
[x] Read repo-local .agent state.
[x] Read source files for current loop and authority seams.
[x] Identify interaction loop.
[x] Identify domains in use.
[x] Identify kit services.
[x] Identify implemented and target kits.
[x] Add timestamped tracker entry.
[x] Add timestamped turn-ledger entry.
[x] Add architecture audit.
[x] Add render audit.
[x] Add gameplay/command authority audits.
[x] Update required root .agent docs.
[x] Update central repo ledger.
[x] Add central internal change-log entry.
[x] Push to main only.
```

## Publish repo list checked

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

## Selection result

`TheCavalryOfRome` was excluded.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, or missing sampled root `.agent` state.

`HorrorCorridor` was selected as the fallback because it is the oldest accessible non-Cavalry Publish repo and its command-result authority seam remains documented but unimplemented.

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
session-lifecycle
room-identity
peer-networking
host-transport
client-transport
network-message-protocol
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
remote-authoritative-ingress
cube-carry-interaction
nearest-cube-selection
carried-cube-state
end-anomaly-distance-check
slot-assignment
pickup-preflight
drop-preflight
place-preflight
remove-preflight
ooze-trail-navigation
ooze-decay
ooze-spawn
snapshot-build
snapshot-publish-contract
runtime-debug-event-log
runtime-debug-frame-log
cadence-diagnostics
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
```

## Target command domains

```txt
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
publish-decision-routing
publish-decision-snapshot
command-result-journal
command-result-fixture-matrix
command-replay-fixture
runtime-debug-result-projection
local-authority-result-consumer
host-authority-result-consumer
```

## Kit services

```txt
corridor-session-domain-kit:
  solo/host/client session flow, room identity, join code, readiness, pause, completion

peer-room-sync-domain-kit:
  host/client transport, player update, interaction request, full sync, recovery

maze-snapshot-bootstrap-kit:
  seed hash, maze generation, cell lookup, player/cube spawns, sequence slots, initial state

first-person-corridor-player-kit:
  keyboard/mouse input, pointer lock, look delta, movement, collision, camera pose

corridor-interaction-domain-kit:
  player lookup, carried cube lookup, nearest loose cube selection, anomaly checks, cube mutations

ordered-anomaly-sequence-kit:
  ordered slot validation and victory completion

ooze-trail-domain-kit:
  ooze cadence, spawn, decay, spacing guard, cap guard

corridor-render-world-kit:
  renderer, scene, camera, postprocess, maze world, scene dressing summary, dispose lifecycle

corridor-minimap-kit:
  minimap projection from snapshot/player/yaw

runtime-debug-frame-kit:
  runtime event log, frame records, cadence diagnostics, snapshot/cube/anomaly/input/render summaries
```

## Kits

### Implemented/source-backed

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
```

### Planned next-cut

```txt
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
publish-decision-routing-kit
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T09-40-52-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T09-40-52-04-00-render-authority-readback.md
.agent/gameplay-audit/2026-07-08T09-40-52-04-00-command-result-gameplay-loop.md
.agent/command-authority-audit/2026-07-08T09-40-52-04-00-command-result-wire-contract.md
.agent/trackers/2026-07-08T09-40-52-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T09-40-52-04-00.md
```

## Validation performed

```txt
GitHub connector repo-list read
central ledger read
repo-local .agent read
package script read
GameCanvas runtime loop read
networkRules authority seam read
interactionRules silent no-op branch read
repo-local .agent files pushed to main
central LuminaryLabs ledger pushed to main
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

## Next safe ledge

```txt
HorrorCorridor Command Result Wire Contract + Fixture Boundary
```

Implement command contracts and DOM-free fixtures first.

Do not extract PeerJS, renderer, minimap, postprocess, scene dressing, or object-kit visuals until the headless command result fixture passes.
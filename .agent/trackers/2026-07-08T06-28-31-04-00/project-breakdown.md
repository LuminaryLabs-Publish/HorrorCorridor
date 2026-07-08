# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T06:28:31-04:00`

## Selection result

The full accessible `LuminaryLabs-Publish` repo list was checked:

```txt
IntoTheMeadow      tracked/root-agented
HorrorCorridor     selected follow-up
AetherVale         tracked/root-agented
ZombieOrchard      tracked/root-agented
TheUnmappedHouse   tracked/root-agented
MyCozyIsland       tracked/root-agented
TheOpenAbove       tracked/root-agented
PhantomCommand     tracked/root-agented
TheCavalryOfRome   excluded
PrehistoricRush    tracked/root-agented
```

No new, central-ledger-absent, or root-agent-missing eligible repo was found in this pass.

`TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest/high-value eligible follow-up because its repo-local `.agent` state is newer than the central ledger pointer and because the next implementation seam is still sharply blocked on command-result fixture authority.

## Current product read

`HorrorCorridor` is a cooperative first-person horror corridor/maze game under `HorrorCorridor-V1`.

The current runtime uses Next, React, Three.js, Zustand, PeerJS, and TypeScript.

The player-facing loop is playable and meaningful, but command authority is still implicit.

Rejected, unchanged, skipped, and publish-only command paths are still hard to distinguish because `interactionRules.ts` and `networkRules.ts` return `GameState` only.

## Evidence checked

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/next-steps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/known-gaps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/validation.md
LuminaryLabs-Publish/HorrorCorridor:.agent/command-authority-audit/fixture-gate-implementation-map.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/package.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
```

## Interaction loop

### Current player-facing loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room identity or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> enter pointer-lock first-person navigation
  -> move through seeded corridor maze
  -> interact action derives from distance-to-end and carried-cube state
  -> pickup loose cube, drop carried cube, place cube at anomaly, or remove last anomaly cube
  -> ordered anomaly sequence checks completion
  -> ooze cadence advances pressure
  -> authoritative snapshot publishes to renderer, minimap, HUD, completion UI, and debug store
```

### Current authority loop

```txt
local input or peer message
  -> GameCanvas/network ingress chooses interaction/network rule
  -> interactionRules.ts or networkRules.ts returns GameState only
  -> invalid paths silently return unchanged state
  -> local authority publishes based on object identity/state change
  -> host authority can resync after TRY_INTERACT without reason metadata
  -> debug output cannot explain accepted/rejected/skipped/publish-only decisions
```

### Target authority loop

```txt
input or peer message
  -> CommandEnvelope
  -> interaction/network preflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> RuntimeDebug result projection
  -> DOM-free command fixture replay
  -> volatile-field-normalized final snapshot parity report
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

## Services the kits offer or need to offer

### Existing app/session services

```txt
create room id
create join code
create player identity
create room state
enter solo mode
enter host lobby
enter client lobby
run loading/readiness
patch readiness state
start play
pause/resume
commit completion
return route
```

### Existing peer/snapshot services

```txt
create host transport
create client transport
map connection status
send lobby events
send start game
send full sync
send player update
send try interact
receive host messages
build replicated snapshot
consume replicated snapshot
request-sync recovery path
```

### Existing gameplay services

```txt
hash seed
generate maze
build cell lookup
build paths from end to cube spawns
create player spawns
create cube spawns
initialize anomaly sequence slots
create initial GameState
rebuild GameState from replicated snapshot
keyboard/mouse first-person movement
maze collision resolution
cube pickup/drop/place/remove
ordered anomaly sequence validation
ooze decay/spawn/spacing/cap/rng
victory completion
```

### Needed command authority services

```txt
create CommandEnvelope
create stable CommandReason catalog
classify every interaction rejection before mutation
classify every network no-op before mutation
create CommandResult for accepted/rejected/unchanged/publish-only/skipped/victory paths
derive PublishDecision from CommandResult
journal command results
project latest command result into runtime debug
run DOM-free command fixture matrix
normalize volatile snapshot fields
prove final snapshot parity
```

### Render and diagnostics services

```txt
create renderer/scene/camera/postprocessing
build maze world
update world from snapshot
draw minimap frame
record runtime debug events and frames
record cadence summary
attach result projection after command journal exists
```

## Kits

### Implemented or source-backed kits

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
```

### Planned next command kits

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
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

## New audit artifact added

```txt
.agent/command-authority-audit/command-result-fixture-acceptance-ledger.md
```

That artifact converts the next command fixture from a generic task list into a gate with acceptance rows, source seams, required reason families, fixture IDs, and stop lines.

## Files changed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/command-authority-audit/command-result-fixture-acceptance-ledger.md
.agent/trackers/2026-07-08T06-28-31-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T06-28-31-04-00.md
```

Central repo changed:

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T06-28-31-04-00-horror-corridor-command-fixture-acceptance-ledger.md
```

## Validation performed

```txt
[done] GitHub connector listed accessible LuminaryLabs-Publish repos.
[done] GitHub connector checked central HorrorCorridor ledger.
[done] GitHub connector read HorrorCorridor root .agent start/current/next/known/validation docs.
[done] GitHub connector read command fixture implementation map.
[done] GitHub connector read package scripts.
[done] GitHub connector read interactionRules.ts.
[done] GitHub connector read networkRules.ts.
[done] Documentation-only updates written to main.
```

## Validation not performed

```txt
[not-run] local checkout
[not-run] npm install
[not-run] npm run lint
[not-run] npm run smoke:protokits
[not-run] npm run harness:horror-corridor
[not-run] node scripts/horror-corridor-command-fixture.mjs
[not-run] npm run validate:live-player:dev
[not-run] browser route check
[not-run] live host/client multiplayer check
```

## Next safe ledge

```txt
HorrorCorridor Command Result Fixture Gate
```

Build only command result contracts, reason catalog, publish decision helper, command journal, runtime debug result projection, and DOM-free fixture matrix first.

Do not start with renderer extraction, PeerJS extraction, minimap extraction, postprocessing, new object-kit visuals, new levels, or route/deploy changes.

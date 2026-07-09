# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-30-19-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, choose one eligible repo, update repo-local `.agent` docs, and log the result in `LuminaryLabs-Dev/LuminaryLabs`.

## Completion checklist

```txt
[x] Read accessible LuminaryLabs-Publish repo list.
[x] Compared checked repos against LuminaryLabs-Dev/LuminaryLabs repo-ledger/search state.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Sampled root .agent/START_HERE.md timestamps for eligible repos.
[x] Selected one repo only: LuminaryLabs-Publish/HorrorCorridor.
[x] Read HorrorCorridor repo-local .agent state.
[x] Read package scripts.
[x] Read GameCanvas runtime loop.
[x] Read interactionRules and networkRules authority seams.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified services that the kits offer.
[x] Identified kits.
[x] Updated required root .agent docs.
[x] Added timestamped architecture audit.
[x] Added timestamped render audit.
[x] Added timestamped gameplay audit.
[x] Added timestamped command-authority audit.
[x] Added timestamped turn-ledger entry.
[x] Updated kit registry.
[x] Logged result centrally in LuminaryLabs-Dev/LuminaryLabs.
[ ] Runtime source was not changed.
[ ] Local build/browser/fixture validation was not run.
```

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      selected / tracked / root .agent present / oldest sampled root alignment / command seed-state gate unresolved
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

## Selection reason

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected as the oldest sampled eligible fallback and because its command fixture seed-state and consumer replay gate is still unresolved.

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
  -> route local/host interaction through GameState-returning networkRules
  -> route host player updates through GameState-returning networkRules
  -> cube pickup/drop/place/remove mutates GameState through interactionRules
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

## Services that kits offer

```txt
app/session service: room identity, join code, player identity, mode selection, readiness, pause/resume, completion routing
peer sync service: host/client transport, full sync, player update, try interact, request sync recovery
maze bootstrap service: seed hash, maze generation, cell lookup, path build, cube spawn, sequence slots, initial snapshot
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
interaction preflight service: playing-state validation, player lookup, carried cube lookup, nearest cube lookup, anomaly distance, slot resolution, stable rejection reason
command seed fixture service: canonical GameState seeds, fixture row inputs, expected snapshot facts, stable fixture ids, volatile normalization
command result envelope service: command id, command source, status, reason, changed flag, events, diagnostics, legacy GameState return adapter
publish decision service: publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag
local authority result consumer service: consume local interaction result, journal rejection, skip local rejected/no-op publish, publish accepted changed/victory
host authority result consumer service: consume host player update result, consume host interaction result, skip rejected TRY_INTERACT broadcast, publish request-sync recovery, publish accepted changed/victory
diagnostics service: runtime events, runtime frames, cadence, latest command result, latest publish decision, journal counts, fixture parity
replay service: fixture matrix, journal replay, volatile normalization, snapshot parity, proof output
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
```

## Kits identified

```txt
implemented-source:
  corridor-render-world-kit
  corridor-minimap-kit
  runtime-debug-frame-kit
  ooze-trail-domain-kit
  ordered-anomaly-sequence-kit

planned-next:
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

## Files changed in HorrorCorridor

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T20-30-19-04-00-command-fixture-seed-state-dsk-map.md
.agent/render-audit/2026-07-08T20-30-19-04-00-debug-command-readback-contract.md
.agent/gameplay-audit/2026-07-08T20-30-19-04-00-local-host-replay-loop.md
.agent/command-authority-audit/2026-07-08T20-30-19-04-00-seed-state-consumer-fixture-contract.md
.agent/trackers/2026-07-08T20-30-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T20-30-19-04-00.md
```

## Main finding

`HorrorCorridor` should not start the next source pass by extracting renderer, minimap, PeerJS, or post-processing code.

The next source pass should add command seed states and a DOM-free consumer replay fixture so accepted, rejected, unchanged, skipped, recovery, and victory paths are explicit before `GameCanvas.tsx` consumes command decisions.

## Next safe ledge

```txt
HorrorCorridor Command Fixture Seed State Contract + Consumer Replay Gate
```

## Validation

Docs-only update.

No runtime source files were changed.

No local checkout, install, lint, smoke test, harness, command fixture, browser route check, or live multiplayer validation was run.

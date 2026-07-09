# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-38-28-04-00`

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the tracked repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-08T20-21-59-04-00
LuminaryLabs-Publish/HorrorCorridor      selected / central ledger stale vs root .agent / command decision fixture unresolved
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest root alignment 2026-07-08T18-51-55-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-08T19-40-00-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-08T19-30-31-04-00
```

No checked non-Cavalry repo was fully new, central-ledger absent, missing sampled root `.agent` state, or otherwise undocumented.

`HorrorCorridor` was selected because its root `.agent` state had advanced beyond the central ledger and its command decision fixture remains the best next documentation boundary.

## Interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> build renderer, camera, post-processing, maze world, minimap, pose refs, input refs, and debug state
  -> enter pointer-lock first-person navigation
  -> derive action from carried cube plus distance to anomaly
  -> local solo/host path applies applyNetworkInteractionRequest
  -> client path sends TRY_INTERACT to host
  -> host path applies applyNetworkPlayerUpdate and applyNetworkInteractionRequest
  -> silent unchanged GameState returns can hide rejected/no-op/skipped/recovery cases
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot according to current implicit gates
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
```

## Current source read

`HorrorCorridor-V1/package.json` exposes validation and harness scripts, but there is still no dedicated command fixture script.

`GameCanvas.tsx` still derives interaction actions inline, applies `applyNetworkInteractionRequest`, skips local publish on `nextState === currentGameState`, and publishes host interaction requests without first-class result metadata.

`interactionRules.ts` still returns `GameState` only for pickup, drop, place, and remove rules.

`networkRules.ts` still returns `GameState` only and collapses `request-sync`, `toggle-ready`, `cancel`, and default actions to unchanged state.

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
command-reason-catalog
command-result-contract
command-decision-contract
publish-decision-snapshot
command-journal
command-seed-state-fixture
local-authority-result-consumer
host-authority-result-consumer
runtime-debug-command-projection
command-fixture-matrix
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
app/session service:
  mode selection, room identity, join code, player identity, readiness, pause, completion routing

peer sync service:
  host transport, client transport, full sync, player update, try interact, request-sync recovery

maze bootstrap service:
  seed hash, maze generation, cell lookup, path build, cube spawn, sequence slots, initial snapshot

first-person player service:
  keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync

legacy interaction service:
  pickup, drop, place, remove, sequence progress, unchanged-state fallback

legacy network service:
  player update, held-cube sync, interaction request dispatch, request-sync/toggle-ready/cancel/default fallback

command decision service:
  command envelope, reason catalog, result status, changed flag, publish decision, journal event

local authority consumer service:
  consume local command result, journal rejection, skip rejected/no-op broadcast, publish accepted changed/victory

host authority consumer service:
  consume host player update, consume host interaction request, publish recovery, skip rejected TRY_INTERACT, publish accepted changed/victory

runtime debug projection service:
  latest command result, latest publish decision, latest rejection reason, journal counters, fixture parity

render service:
  renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, cleanup

validation service:
  lint, smoke protokits, horror corridor harness, live player harness, DOM-free command fixture once implemented
```

## Kits identified

```txt
implemented/source-backed:
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

next-cut proof kits:
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
  command-fixture-matrix-kit
  command-replay-fixture-kit
```

## Main finding

The next work should not start with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or new visual object-kit work.

The next safe ledge is a command decision fixture layer that proves explicit status, reason, changed flag, publish decision, consumer behavior, debug projection, and replay parity for current silent branches before `GameCanvas.tsx` is rewired.

## Changed files in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T20-38-28-04-00-command-decision-dsk-map.md
.agent/render-audit/2026-07-08T20-38-28-04-00-runtime-debug-command-decision-readback.md
.agent/gameplay-audit/2026-07-08T20-38-28-04-00-local-host-command-decision-loop.md
.agent/command-authority-audit/2026-07-08T20-38-28-04-00-command-decision-fixture-contract.md
.agent/trackers/2026-07-08T20-38-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T20-38-28-04-00.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm validation run: no
browser smoke run: no
pushed to main: yes
```

## Next safe ledge

```txt
HorrorCorridor Command Decision Fixture Contract + Local/Host Consumer Replay Gate
```

Stop that ledge when the DOM-free fixture proves accepted, rejected, unchanged, skipped, publish-only recovery, ooze, and victory rows across local and host consumers without DOM, canvas, PeerJS, Three.js, or browser state.

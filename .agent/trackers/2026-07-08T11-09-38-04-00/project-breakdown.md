# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run timestamp:** `2026-07-08T11:09:38-04:00`

**Selection:** fallback follow-up after full Publish repo comparison

## Plan ledger

**Goal:** Refresh the root `.agent` operating docs for `HorrorCorridor`, verify its position against the full `LuminaryLabs-Publish` repo set and the central `LuminaryLabs-Dev/LuminaryLabs` ledger, and sharpen the next implementation boundary around command-result source wiring.

**Checklist**

```txt
[x] Listed the accessible LuminaryLabs-Publish repos.
[x] Compared the list against central repo-ledger entries in LuminaryLabs-Dev/LuminaryLabs.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Verified eligible checked repos have root .agent/START_HERE.md state.
[x] Selected LuminaryLabs-Publish/HorrorCorridor as the oldest eligible fallback by latest repo-local alignment time among checked eligible repos.
[x] Read HorrorCorridor root .agent state.
[x] Read package validation scripts.
[x] Read GameCanvas runtime, publish, render, and debug loop.
[x] Read interactionRules silent no-op branches.
[x] Read networkRules command-routing seam.
[x] Identified the interaction loop.
[x] Identified domains.
[x] Identified services offered by the kits.
[x] Identified current, implied, and next-cut kits.
[x] Added timestamped tracker and turn-ledger entries.
[x] Added timestamped architecture, render, gameplay, and command-authority audits.
[x] Updated required root .agent operating docs.
[x] Updated central LuminaryLabs ledger and internal change log.
```

## Publish repo set checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked; root .agent observed
LuminaryLabs-Publish/HorrorCorridor      selected fallback follow-up
LuminaryLabs-Publish/AetherVale          tracked; root .agent observed
LuminaryLabs-Publish/ZombieOrchard       tracked; root .agent observed
LuminaryLabs-Publish/TheUnmappedHouse    tracked; root .agent observed
LuminaryLabs-Publish/MyCozyIsland        tracked; root .agent observed
LuminaryLabs-Publish/TheOpenAbove        tracked; root .agent observed
LuminaryLabs-Publish/PhantomCommand      tracked; root .agent observed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked; root .agent observed
```

## Selection reason

No checked non-Cavalry repo was fully new, absent from the central ledger, undocumented, or missing root `.agent/START_HERE.md` state.

`HorrorCorridor` had the oldest latest repo-local alignment time among checked eligible repos in this run and still has a high-value source-backed seam: current runtime behavior is playable, but command authority remains `GameState`-returning and does not yet expose fixture-readable command results, rejection reasons, publish decisions, or command journals.

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze implemented under `HorrorCorridor-V1` with Next, React, Three.js, Zustand, PeerJS, and TypeScript.

The product loop is a solo/host/client corridor run where players move through a seeded maze, manipulate colored cubes, solve an ordered anomaly sequence, survive ooze pressure, and reach a completion route.

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
  -> ooze cadence advances on local/host authority ticks
  -> authoritative snapshot is built and published or skipped
  -> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Current runtime authority loop

```txt
client PLAYER_UPDATE
  -> host applyNetworkPlayerUpdate(state, input)
  -> GameState returned
  -> host publishes resync snapshot

client TRY_INTERACT
  -> host applyNetworkInteractionRequest(state, input)
  -> interaction rule returns GameState only
  -> invalid paths often return same object with no reason metadata
  -> host syncs held cubes
  -> host publishes resync or recovery snapshot

local solo/host interact
  -> local applyNetworkInteractionRequest(state, input)
  -> if nextState === currentGameState, silently return
  -> otherwise sync held cubes and publish resync snapshot
```

## Target authority loop

```txt
input or peer message
  -> CommandEnvelope
  -> interaction/network preflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> RuntimeDebug result projection
  -> DOM-free fixture replay
  -> final snapshot parity comparison
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

## Services the kits offer

```txt
app-session-service:
  create room identity, create join code, create player identity, enter solo/host/client flows, patch readiness, pause/resume, complete route

peer-sync-service:
  create host/client transport, map connection status, send lobby events, send start-game, full sync, player update, try-interact, receive host messages

maze-bootstrap-service:
  hash seed, generate maze, build cell lookup, build paths, spawn players/cubes, initialize anomaly slots, build initial replicated snapshot

first-person-player-service:
  keyboard mapping, pointer lock, look delta, camera angles, movement integration, collision, camera sync, input snapshot, local carry sync

interaction-preflight-service:
  validate playing state, find player, find carried cube, find nearest loose cube, resolve anomaly cell, check distance, resolve slots, classify reasons

command-result-envelope-service:
  create envelopes, ids, accepted/rejected/unchanged/publish-only/skipped/victory results, before/after summaries, diagnostics, legacy GameState API adapters

publish-decision-service:
  derive publish/skip/recovery/no-op/victory decisions, attach snapshot reasons, build replicated snapshot, set runtime store, broadcast full-sync, compare fixtures

local-authority-result-consumer-service:
  consume local pose/interaction results, journal rejected local commands, skip rejected publishes, publish changed commands, preserve victory routing

host-authority-result-consumer-service:
  consume host player updates and interaction results, skip rejected TRY_INTERACT publishes, publish request-sync recovery, preserve host victory routing

diagnostics-service:
  record runtime events and frames, cadence summaries, latest command result, latest publish decision, rejection reason, journal counts, fixture parity

replay-service:
  serialize envelopes/results, append journal records, replay command journal, normalize volatile fields, compare final snapshot, emit parity report

render-service:
  create renderer, scene, camera, post-processing, maze world, minimap frame, scene dressing summary, runtime disposal
```

## Kits identified

```txt
implemented-source:
  corridor-render-world-kit
  corridor-minimap-kit
  runtime-debug-frame-kit
  ooze-trail-domain-kit
  ordered-anomaly-sequence-kit
  mesh-object-kit-catalog
  procedural-texture-kit-family

candidate-extract:
  corridor-session-domain-kit
  peer-room-sync-domain-kit
  maze-snapshot-bootstrap-kit
  first-person-corridor-player-kit

planned-next:
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

## Source-backed blocker

`interactionRules.ts` encodes the legality checks for pickup, drop, place, and remove but returns only `GameState` for every accepted or rejected path.

`networkRules.ts` routes actions to those functions and returns `state` unchanged for `request-sync`, `toggle-ready`, `cancel`, and default actions.

`GameCanvas.tsx` still depends on object identity or unconditional host publish behavior instead of result metadata.

The next implementation must make command outcomes observable without changing the current gameplay surface.

## Next safe ledge

```txt
HorrorCorridor Command Result Source Wire Map
```

Implement in this order:

```txt
1. commandTypes.ts
2. commandReasons.ts
3. commandResults.ts
4. publishDecisions.ts
5. commandJournal.ts
6. interactionPreflight.ts
7. interactionResultRules.ts
8. networkResultRules.ts
9. scripts/horror-corridor-command-fixture.mjs
10. runtimeDebugStore.ts projection
11. GameCanvas.tsx consumer wiring
```

Stop after fixture-readable command results and publish decisions exist. Do not extract PeerJS, renderer, minimap, postprocess, or new visual content in the same pass.

## Validation

No runtime source code changed in this pass.

No local checkout, `npm install`, `npm run lint`, `npm run smoke:protokits`, `npm run harness:horror-corridor`, `node scripts/horror-corridor-command-fixture.mjs`, browser route check, or live host/client validation was run.

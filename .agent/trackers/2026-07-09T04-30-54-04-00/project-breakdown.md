# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-30-54-04-00`

**Run type:** scheduled repo breakdown / internal docs update

## Plan ledger

**Goal:** Compare the current `LuminaryLabs-Publish` repo list against central tracking, select one eligible repo, update its repo-local `.agent` docs, and sync `LuminaryLabs-Dev/LuminaryLabs` with the findings.

**Checklist:**

```txt
[x] Listed accessible LuminaryLabs-Publish repositories.
[x] Compared list against central LuminaryLabs-Dev/LuminaryLabs repo-ledger state.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Selected one repo only: LuminaryLabs-Publish/HorrorCorridor.
[x] Read repo-local root .agent state.
[x] Read package validation scripts.
[x] Read GameCanvas runtime / authority / render loop.
[x] Read interactionRules silent no-op branches.
[x] Read networkRules collapsed action branches.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified services offered by current and planned kits.
[x] Identified kits.
[x] Wrote timestamped .agent tracker and audit docs.
[x] Updated root .agent docs and kit registry.
[x] Updated central LuminaryLabs repo-ledger.
[x] Added central internal change-log entry.
[ ] Runtime source was not changed.
[ ] Local npm/browser/fixture validation was not run.
```

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / central ledger oldest sampled alignment
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

No checked non-Cavalry Publish repo was new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected because central tracking was still the oldest sampled fallback ledger alignment, and repo-local documentation had already advanced to command authority source-cut work that central tracking needed to catch up with.

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The active surface is a Next / React client runtime with Three.js rendering, Zustand state, PeerJS transport, pointer-lock first-person movement, cube pickup/drop/place/remove interactions, ordered anomaly sequence completion, ooze cadence, host-authored replicated snapshots, minimap rendering, and runtime debug capture.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> build renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> enter pointer-lock first-person navigation
  -> derive action from carried cube plus distance to anomaly
  -> local solo/host runs applyNetworkInteractionRequest directly
  -> local path compares nextState === currentGameState to decide silent skip
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default paths collapse to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot by implicit reason string
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
```

## Target interaction loop

```txt
local input or peer message
  -> CommandEnvelope
  -> CommandReason catalog
  -> preflight result
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> local or host authority consumer
  -> optional replicated snapshot publish
  -> optional victory commit
  -> RuntimeDebugCommandProjection
  -> GameCanvas consumer splice
  -> DOM-free command replay fixture
```

## All domains in use

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

## Services offered by the kits

```txt
corridor-session-domain-kit:
  mode selection, room identity, readiness, pause, completion routing

peer-room-sync-domain-kit:
  host/client transport, full sync, player update, try interact, request sync recovery

maze-snapshot-bootstrap-kit:
  seeded maze, maze cell lookup, cube spawn, sequence slots, initial snapshot

first-person-corridor-player-kit:
  keyboard input, pointer lock, mouse look, movement, collision, camera pose, local carry sync

corridor-interaction-domain-kit:
  pickup, drop, place at anomaly, remove from anomaly through legacy GameState rules

ordered-anomaly-sequence-kit:
  sequence slots, ordered color validation, victory game state

ooze-trail-domain-kit:
  ooze cadence, spawn, decay, spacing guard

corridor-render-world-kit:
  Three renderer, scene, camera, post-processing, maze world, scene dressing

corridor-minimap-kit:
  minimap canvas projection and draw

runtime-debug-frame-kit:
  runtime frame capture, event capture, debug overlay/export fields

command-envelope-contract-kit:
  command id, source, actor, action, payload normalization

command-reason-catalog-kit:
  stable accepted, rejected, unchanged, skipped, publish-only, and victory reasons

command-result-envelope-kit:
  before/after summary, changed flag, reason, status, events, diagnostics, legacy adapter state

publish-decision-snapshot-kit:
  publish, skip, no-op, recovery, victory, broadcast flag, snapshot reason, completion intent

command-result-journal-kit:
  latest result, latest reason, counters, accepted/rejected/skipped history

interaction-preflight-kit:
  playing state, player lookup, carried cube lookup, nearest cube lookup, anomaly distance, slot resolution

interaction-result-rules-kit:
  result-returning pickup/drop/place/remove wrappers with legacy GameState exports preserved

network-result-rules-kit:
  result-returning player update, held cube sync, request-sync, skipped policy, unknown action wrappers

local-authority-result-consumer-kit:
  local journal, rejected/no-op skip, accepted/victory publish, completion decision

host-authority-result-consumer-kit:
  host journal, PLAYER_UPDATE consume, TRY_INTERACT consume, request-sync recovery, rejected skip, accepted/victory publish

runtime-debug-command-projection-kit:
  latest command result, latest publish decision, journal counts, fixture parity readback

command-result-fixture-matrix-kit:
  accepted/rejected/unchanged/skipped/publish-only/victory row matrix

command-replay-fixture-kit:
  DOM-free replay, volatile normalization, snapshot parity output

central-ledger-sync-kit:
  root .agent docs, timestamped tracker, repo-ledger entry, internal change log
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

The implementation is not blocked by rendering or networking surface area.

It is blocked by result authority: `interactionRules.ts` and `networkRules.ts` still return `GameState` only, invalid paths silently return unchanged state, and `GameCanvas.tsx` decides publish/skip/victory behavior without first-class command result and publish decision records.

## Next safe ledge

```txt
HorrorCorridor Command Result Consumer Readback + Seeded Replay Fixture Gate
```

## Required next source files

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Validation

Docs-only pass.

No runtime source files changed.

No local `npm install`, `npm run lint`, `npm run smoke:protokits`, `npm run harness:horror-corridor`, fixture run, browser smoke, or live host/client check was run.

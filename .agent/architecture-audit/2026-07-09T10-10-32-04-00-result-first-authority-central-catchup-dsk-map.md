# Architecture Audit — Result-First Authority Central Catch-up DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T10-10-32-04-00`

## Architecture read

`HorrorCorridor` is already composed around clear source domains, but the command/result seam is still implicit.

The current source cut is:

```txt
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
  owns browser/runtime orchestration, local pose, renderer, network callbacks, publish decisions, and debug frame projection

HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
  owns pickup/drop/place/remove mutations and ordered sequence completion through GameState-returning functions

HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
  owns PLAYER_UPDATE, held-cube sync, TRY_INTERACT dispatch, and request-sync/toggle-ready/cancel/default no-op behavior through GameState-returning functions

HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
  owns debug frames/events export without command-result readback fields
```

## Current interaction loop

```txt
start menu
  -> solo/host/join route
  -> session identity and lobby readiness
  -> GameCanvas runtime mount
  -> Three.js renderer/world/minimap/debug initialization
  -> pointer-lock first-person input
  -> local/host/client interaction action derivation
  -> GameState-returning interaction/network rules
  -> held-cube sync and ooze cadence
  -> implicit publish/no-op/recovery/victory decision in GameCanvas
  -> replicated snapshot broadcast or local store update
  -> render/minimap/HUD/debug frame consumption
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
network-message-protocol
replicated-snapshot-protocol
seeded-maze-bootstrap
maze-cell-lookup
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
ooze-cadence
command-envelope-contract
command-reason-catalog
command-result-contract
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

## Implemented kits

```txt
corridor-session-domain-kit
  provides: route mode, room identity, readiness, completion/pause shell
  current form: React/Zustand/session store and app flow

peer-room-sync-domain-kit
  provides: host/client transport, full sync, player update, try interact
  current form: PeerJS transport and syncSnapshot protocol

maze-snapshot-bootstrap-kit
  provides: seeded maze, pathing, cell lookup, cube spawn, sequence slots
  current form: maze domain + GameState snapshot bootstrap

first-person-corridor-player-kit
  provides: keyboard input, pointer lock, look delta, movement, collision, camera pose
  current form: player domain modules plus GameCanvas runtime refs

corridor-interaction-domain-kit
  provides: pickup, drop, place, remove
  current form: interactionRules.ts returning GameState only

ordered-anomaly-sequence-kit
  provides: required color sequence, slot solve flags, victory state
  current form: winRules.ts invoked by interactionRules

ooze-trail-domain-kit
  provides: ooze spawn/decay/cadence
  current form: oozeRules.ts plus GameCanvas authority tick

corridor-render-world-kit
  provides: renderer, scene, camera, maze world, post-processing
  current form: render/three modules consumed by GameCanvas

corridor-minimap-kit
  provides: minimap draw and player/cube/anomaly projection
  current form: Minimap component draw function

runtime-debug-frame-kit
  provides: runtime frame records, event records, debug window extraction
  current form: runtimeDebugStore.ts without command-result projection
```

## Planned next-cut kits

```txt
command-envelope-contract-kit
  owns: command id, source, player id, action, payload, room/tick metadata
  source target: commandTypes.ts

command-reason-catalog-kit
  owns: stable accepted/rejected/unchanged/skipped/publish-only/victory reasons
  source target: commandReasons.ts

command-result-envelope-kit
  owns: CommandStatus, CommandResult, before/after summary, events, diagnostics, changed flag, legacy adapters
  source target: commandResults.ts

publish-decision-snapshot-kit
  owns: publish, skip, recovery, no-op, victory classification
  source target: publishDecisions.ts

command-result-journal-kit
  owns: latest result, counts, replay order, debug-safe export
  source target: commandJournal.ts

command-seed-state-fixture-kit
  owns: canonical GameState seed rows and stable fixture ids
  source target: commandFixtureSeeds.ts

interaction-preflight-kit
  owns: state-ready, player, carried-cube, nearest-cube, anomaly-distance, slot and cube reason rows
  source target: interactionPreflight.ts

interaction-result-rules-kit
  owns: pickup/drop/place/remove result-returning wrappers and legacy state-returning adapters
  source target: interactionResultRules.ts

network-result-rules-kit
  owns: player update, held-cube sync, TRY_INTERACT, request-sync, toggle-ready, cancel, unknown-action result wrappers
  source target: networkResultRules.ts

local-authority-result-consumer-kit
  owns: local journal, rejected/no-op skip, accepted/victory publish decision
  source target: localAuthorityCommandConsumer.ts

host-authority-result-consumer-kit
  owns: host PLAYER_UPDATE and TRY_INTERACT decision flow, request-sync recovery, rejected skip, victory publish
  source target: hostAuthorityCommandConsumer.ts

runtime-debug-command-projection-kit
  owns: latestCommandResult, latestPublishDecision, commandJournal summary, fixture parity projection
  source target: runtimeDebugCommandProjection.ts

command-result-fixture-matrix-kit
  owns: accepted/rejected/unchanged/skipped/publish-only/victory rows
  source target: commandFixtureRows.ts

command-replay-fixture-kit
  owns: DOM-free replay runner and parity output
  source target: scripts/horror-corridor-command-fixture.mjs
```

## Architectural gap

`GameCanvas.tsx` is still the consumer and policy owner for local interaction, host message handling, publish, recovery, and victory. That makes the browser loop the only place where rejected and unchanged results can be observed, and several branches are not observable at all.

## Required sequencing

```txt
1. Add result contracts first.
2. Add fixture seed rows second.
3. Add result-returning rule wrappers third.
4. Add local/host consumer modules fourth.
5. Add DOM-free command fixture fifth.
6. Add runtime debug projection sixth.
7. Only then splice GameCanvas additively.
```

## Non-goals

```txt
- do not extract PeerJS first
- do not extract renderer first
- do not extract minimap first
- do not add maze content first
- do not add object-kit visual expansion first
- do not rewrite GameCanvas wholesale
```

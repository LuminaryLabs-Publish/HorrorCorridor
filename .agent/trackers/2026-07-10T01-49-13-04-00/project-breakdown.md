# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-10T01-49-13-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected repo:** `LuminaryLabs-Publish/HorrorCorridor`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection result

The current public `LuminaryLabs-Publish` repository list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent` state.

No checked public non-Cavalry repo was new, missing from the central ledger, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`HorrorCorridor` was selected as the oldest eligible documented fallback.

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T01-38-16-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T01-31-29-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T01-20-47-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T01-11-51-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T00-51-03-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T00-38-44-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T00-30-20-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / oldest eligible central-ledger fallback / prior central latest 2026-07-10T00-18-38-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Evidence read

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo-ledger entries
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, debug state, and transport listener
  -> pointer-lock first-person navigation
  -> keyboard/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried-cube state and distance to anomaly
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged nextState returns silently
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default collapse to unchanged state
  -> sync held cubes to players
  -> ooze cadence advances through GameState-returning rules
  -> ordered sequence completion validates victory through GameState-returning rules
  -> publishAuthoritativeState emits implicit full-sync reasons
  -> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Source authority read

```txt
interactionRules.ts
  -> pickUpCube, dropCube, placeCubeAtEndAnomaly, removeCubeFromEndAnomaly return GameState only
  -> not-playing, missing-player, carrying-conflict, no-nearby-cube, too-far, no-slot, wrong-slot paths return unchanged state

networkRules.ts
  -> applyNetworkPlayerUpdate, syncHeldCubesToPlayers, applyNetworkInteractionRequest return GameState only
  -> missing-player, already-synced, request-sync, toggle-ready, cancel, and default actions have no result metadata

oozeRules.ts
  -> decayOozeTrail, spawnOozeTrail, advanceOozeTrail return GameState only
  -> spacing guard, max-ooze, decay interval, and no-state-diff paths have no result metadata

winRules.ts
  -> validateOrderedSequenceCompletion returns GameState only
  -> completion, rollback, slot refresh, and unchanged paths have no result metadata

GameCanvas.tsx
  -> derives local action from distance and carry state
  -> skips local publish when nextState === currentGameState
  -> publishes host PLAYER_UPDATE and TRY_INTERACT through implicit resync/recovery reasons
  -> commits victory through currentGameState.gameState checks

runtimeDebugStore.ts
  -> exports latest frames and events
  -> does not project latest command result, latest publish decision, rejection reason, command journal, or fixture parity
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
legacy-game-state-ooze-rules
legacy-game-state-win-rules
ooze-cadence
ooze-decay-and-spawn
runtime-debug-frame-store
runtime-debug-event-store
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
command-envelope-contract-next
command-reason-catalog-next
command-result-contract-next
publish-decision-snapshot-next
command-result-journal-next
interaction-preflight-diagnostics-next
network-command-preflight-diagnostics-next
ooze-result-diagnostics-next
win-result-diagnostics-next
local-authority-command-consumer-next
host-authority-command-consumer-next
runtime-debug-command-projection-next
command-result-fixture-matrix-next
command-replay-fixture-next
central-ledger-synchronization
```

## Services that kits offer

```txt
app-session-service
  -> mode selection, room identity, join code, readiness, pause/resume, completion route

peer-sync-service
  -> host transport, client transport, full sync, player update, try interact, request sync recovery

maze-bootstrap-service
  -> seed hash, maze generation, cell lookup, path build, cube spawn, sequence slots, initial snapshot

first-person-player-service
  -> keyboard input, pointer lock, look delta, movement, collision, camera pose, local carry sync

legacy-interaction-service
  -> pickup, drop, place, remove, ordered completion, GameState-only return

legacy-network-service
  -> player update, held cube sync, interaction dispatch, request-sync no-op, toggle-ready no-op, cancel no-op, GameState-only return

legacy-ooze-service
  -> decay, spawn, spacing guard, max guard, no-state-diff, GameState-only return

legacy-win-service
  -> slot evaluation, victory, victory rollback, slot refresh, GameState-only return

runtime-debug-service
  -> event capture, frame capture, cadence readback, snapshot readback, debug window export

render-service
  -> renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal

planned-command-result-envelope-service
  -> command id, source, status, reason, before/after state summary, changed flag, events, diagnostics, legacy adapter

planned-publish-decision-service
  -> publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag

planned-debug-command-projection-service
  -> latest command result, latest publish decision, latest rejection reason, journal counts, fixture parity

central-ledger-sync-service
  -> root .agent docs, timestamped tracker, repo ledger, internal change log
```

## Kits identified

```txt
implemented kits:
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

next-cut kits:
  command-envelope-contract-kit
  command-reason-catalog-kit
  command-result-envelope-kit
  publish-decision-snapshot-kit
  command-result-journal-kit
  interaction-preflight-kit
  network-command-preflight-kit
  ooze-result-rules-kit
  win-result-rules-kit
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

`HorrorCorridor` should not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.

The blocker is still command authority and debug readback. The browser route is playable, but command outcomes are not first-class records yet. Rejected/no-op/skipped/recovery/victory paths collapse into unchanged state or implicit reason strings, and runtime debug cannot explain what command ran, why it was accepted or rejected, or why a publish was skipped.

## Next safe ledge

```txt
HorrorCorridor Command Result Host Debug Readback + Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
command fixture: not run because it does not exist yet
pushed to main: yes, documentation only
```

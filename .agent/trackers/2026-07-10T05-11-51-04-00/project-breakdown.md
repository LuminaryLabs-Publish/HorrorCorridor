# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run timestamp:** `2026-07-10T05-11-51-04-00`

## Selection

The current public `LuminaryLabs-Publish` page showed 9 repositories. `TheCavalryOfRome` was excluded by rule.

No checked public non-Cavalry repo was new, absent from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`HorrorCorridor` was selected as the oldest eligible documented fallback. Its central ledger was still at `2026-07-10T03-49-48-04-00` while newer eligible repos had advanced.

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T04-58-56-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T04-50-40-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T04-40-52-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T04-29-10-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T04-22-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T04-11-36-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T03-59-57-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / oldest eligible fallback / prior central latest 2026-07-10T03-49-48-04-00
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
HorrorCorridor-V1/src/features/game-state/domain/gameTypes.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/features/networking/protocol/messageTypes.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> complete lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, input refs, pose refs, cadence state, transport listener, and debug state
  -> pointer-lock first-person navigation
  -> key/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried cube and anomaly distance
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged nextState returns silently without result metadata
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default return unchanged state
  -> syncHeldCubesToPlayers mutates or returns unchanged state
  -> ooze cadence advances through GameState-returning rules
  -> ordered sequence completion validates victory through GameState-returning rules
  -> publishAuthoritativeState emits full-sync reason strings
  -> renderer, minimap, HUD, completion route, and runtime debug consume latest snapshot
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
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

## Kit services

```txt
corridor-session-domain-kit:
  mode selection, room identity, readiness, pause/resume, completion routing

peer-room-sync-domain-kit:
  host/client transport, full sync, player update, try interact, request-sync recovery

maze-snapshot-bootstrap-kit:
  seeded maze, cell lookup, pathing, cube spawns, sequence slots, initial snapshot

first-person-corridor-player-kit:
  keyboard input, pointer lock, look delta, movement, collision, camera pose, local carry sync

legacy-interaction-rules-kit:
  pickup, drop, place, remove, GameState-only legacy return

legacy-network-rules-kit:
  player update, held-cube sync, request-sync, toggle-ready, cancel, GameState-only legacy return

legacy-ooze-rules-kit:
  decay, spawn, spacing guard, max guard, GameState-only legacy return

legacy-win-rules-kit:
  slot evaluation, victory, victory rollback, GameState-only legacy return

runtime-debug-frame-kit:
  frame capture, event capture, cadence readback, snapshot readback, debug export

render-world-kit:
  Three.js scene, post-processing, maze world, minimap, scene dressing summary

planned command-result services:
  command envelopes, reason catalog, before/after snapshots, command results, publish decisions, journal, local/host consumers, debug projection, DOM-free fixture rows
```

## Kits

Current implemented/source kits:

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
```

Current legacy/rule adapter kits:

```txt
legacy-game-state-interaction-rules-kit
legacy-game-state-network-rules-kit
legacy-game-state-ooze-rules-kit
legacy-game-state-win-rules-kit
legacy-full-sync-message-kit
legacy-gamecanvas-publish-reason-kit
```

Next-cut kits:

```txt
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
central-ledger-readback-kit
```

## Main finding

`HorrorCorridor` should not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.

The blocker is command-result and publish-decision readback. `interactionRules.ts`, `networkRules.ts`, `oozeRules.ts`, and `winRules.ts` return `GameState` only. `GameCanvas.tsx` uses object identity plus implicit full-sync reason strings as the publish gate. `runtimeDebugStore.ts` exports frames/events but cannot explain command status, rejection reason, publish decision, or journal counts.

## Next safe ledge

```txt
HorrorCorridor Command Result Publish Readback Refresh + Result-First Fixture Gate
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
central ledger updated: pending until central sync commit
```

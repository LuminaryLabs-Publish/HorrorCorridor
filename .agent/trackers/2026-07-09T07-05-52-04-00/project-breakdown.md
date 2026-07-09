# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T07-05-52-04-00`

## Selection

The accessible `LuminaryLabs-Publish` repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` central tracking and sampled repo-local `.agent` state.

`TheCavalryOfRome` was excluded.

No checked non-Cavalry repo was new, ledger-absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected because central tracking lagged repo-local command-result docs and the command-result fixture gate is still unresolved.

## Interaction loop

```txt
open app
  -> StartMenu
  -> solo / host / join
  -> create or join room identity
  -> lobby / loading / readiness gates
  -> createInitialGameState
  -> mount GameCanvas
  -> build renderer, scene, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> pointer-lock movement and look
  -> interaction derives pickup/drop/place/remove from carry state and distance to anomaly
  -> solo/host applies applyNetworkInteractionRequest directly
  -> client sends TRY_INTERACT
  -> host applies PLAYER_UPDATE or TRY_INTERACT through networkRules
  -> invalid paths return unchanged GameState without reason data
  -> sync held cubes, advance ooze, publish authoritative snapshot
  -> render Three scene, minimap, HUD, completion UI, and runtime debug frames
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
session-lifecycle
peer-networking
replicated-snapshot-protocol
seeded-maze-bootstrap
first-person-input
pointer-lock-camera
player-movement
maze-collision
cube-carry-interaction
end-anomaly-sequence
ordered-sequence-validation
ooze-trail-pressure
legacy-game-state-rules
runtime-debug-frame-export
three-renderer
post-processing
maze-world-rendering
minimap-rendering
hud-state-projection
completion-routing
command-envelope-contract planned
command-result-envelope planned
publish-decision-snapshot planned
runtime-debug-command-projection planned
command-result-fixture-matrix planned
```

## Kit services

```txt
session service:
  mode selection, room identity, join code, player identity, lobby state, readiness, pause/resume, completion routing

peer sync service:
  host transport, client transport, lobby events, start game, full sync, player updates, TRY_INTERACT, request-sync recovery

maze bootstrap service:
  seeded state, maze cells, cube spawns, target sequence, sequence slots, replicated snapshot

player service:
  keyboard input, pointer lock, look delta, movement integration, collision, camera sync, carry-state sync

interaction service:
  pickup, drop, place at anomaly, remove from anomaly, ordered sequence validation

render service:
  renderer, scene, camera, post-processing, world builder, world update/dispose, minimap draw

debug service:
  runtime frames, runtime events, local pose, input, snapshot counts, cube records, anomaly slots, cadence, scene dressing

next command service:
  command envelope, reason catalog, command result, publish decision, command journal, fixture replay
```

## Kits

```txt
implemented:
  game-shell-route-kit
  menu-screen-kit
  lobby-session-kit
  initial-game-state-bootstrap-kit
  sync-snapshot-protocol-kit
  peer-host-transport-kit
  peer-client-transport-kit
  network-rules-adapter-kit
  interaction-rules-cube-action-kit
  win-rules-ordered-sequence-kit
  ooze-rules-pressure-kit
  camera-look-kit
  player-input-kit
  player-movement-kit
  maze-collision-kit
  animation-loop-kit
  three-renderer-kit
  three-scene-kit
  three-camera-kit
  post-processing-kit
  maze-world-builder-kit
  scene-dressing-descriptor-kit
  minimap-kit
  runtime-debug-store-kit

next-cut:
  command-envelope-contract-kit
  command-source-classifier-kit
  command-reason-catalog-kit
  interaction-preflight-result-kit
  player-update-result-kit
  command-result-envelope-kit
  publish-decision-snapshot-kit
  local-authority-result-consumer-kit
  host-authority-result-consumer-kit
  runtime-debug-command-projection-kit
  command-result-journal-kit
  command-fixture-seed-kit
  command-fixture-row-kit
  command-result-replay-fixture-kit
```

## Main finding

`HorrorCorridor` should not start next with visual expansion, renderer extraction, minimap extraction, or PeerJS extraction.

The next useful implementation pass is to add typed command result envelopes, classify every silent no-op reason, derive publish decisions from command facts, and expose those facts through runtime debug before changing `GameCanvas` behavior.

## Validation

```txt
runtime source changed: no
local checkout: no
npm install: no
npm run build: no
npm run lint: no
browser smoke: no
live multiplayer validation: no
branch created: no
pull request created: no
pushed to main: yes
```

# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-09T06-59-46-04-00`

## Summary

`HorrorCorridor` is a playable Next/React cooperative first-person maze with solo, host, and join routes, PeerJS transport, Three.js rendering, a minimap, and runtime debug export.

The current blocker is still command authority. `interactionRules.ts` and `networkRules.ts` return `GameState` only, invalid command paths silently return unchanged state, and `GameCanvas.tsx` uses object identity plus action strings as the local/host publish gate.

This run refreshed `.agent` state, added a new timestamped tracker set, and synced the central ledger around a result-envelope source splice and runtime debug projection fixture gate.

## Repo selection

```txt
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / central ledger catch-up needed
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-50-00-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
```

## Interaction loop

```txt
open app
  -> StartMenu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby / loading / readiness gates
  -> createInitialGameState
  -> mount GameCanvas
  -> build renderer, scene, camera, postprocess, maze world, minimap, debug state
  -> pointer-lock first-person movement
  -> interact key derives pickup/drop/place/remove from distance-to-end and carry state
  -> local authority calls applyNetworkInteractionRequest directly
  -> client sends TRY_INTERACT
  -> host applies PLAYER_UPDATE or TRY_INTERACT through networkRules
  -> invalid paths silently return the original GameState
  -> publishAuthoritativeState broadcasts snapshot when the host/local path decides to publish
  -> renderer, minimap, HUD, completion UI, and runtime debug consume snapshot/readback state
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
```

## Services the kits offer now

```txt
app/session service:
  mode selection, room identity, join code, player identity, lobby players, readiness, pause, completion routing

peer sync service:
  host transport, client transport, lobby event, start game, full sync, player update, try interact, request recovery

maze bootstrap service:
  seeded initial state, maze cells, cube spawns, target sequence, sequence slots, replicated snapshot

player service:
  keyboard input, pointer lock, look delta, movement integration, maze collision, camera sync, carry-state sync

interaction service:
  pickup cube, drop cube, place cube at anomaly, remove cube from anomaly, sequence validation

render service:
  renderer creation, scene creation, camera creation, post-processing, maze world build/update/dispose, minimap drawing

debug service:
  runtime frame export, runtime event export, local pose, input, snapshot counts, cube records, anomaly slots, cadence, scene dressing summary
```

## Kits

```txt
implemented / source-backed:
  GameShell route kit
  StartMenu / JoinMenu / LobbyScreen / LoadingScreen / PauseMenu / CompleteScreen UI kits
  createInitialGameState bootstrap kit
  syncSnapshot protocol kit
  createHost / createClient PeerJS transport kits
  networkRules adapter kit
  interactionRules cube-action kit
  winRules ordered-sequence kit
  oozeRules pressure kit
  cameraLook kit
  input kit
  movement kit
  collision kit
  createAnimationLoop kit
  createRenderer kit
  createScene kit
  createCamera kit
  createPostProcessing kit
  worldBuilder maze render kit
  sceneDressingDescriptors kit
  Minimap kit
  runtimeDebugStore kit

next-cut:
  command-envelope-contract-kit
  command-source-classifier-kit
  command-reason-catalog-kit
  interaction-preflight-result-kit
  player-update-result-kit
  ooze-advance-result-kit
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

Do not start with new visuals, minimap extraction, PeerJS extraction, or multiplayer features.

The next useful source pass is the command result seam: normalize local and host commands into result envelopes, classify every silent no-op branch, derive publish decisions from result facts, and expose those facts through runtime debug before changing gameplay behavior.

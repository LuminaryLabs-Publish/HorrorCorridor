# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T06:01:21-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch:** `main`

**Selection reason:** The central rotation last documented `LuminaryLabs-Publish/IntoTheMeadow` at `2026-07-07T05:50:01-04:00`. With `LuminaryLabs-Publish/TheCavalryOfRome` excluded by rule, `HorrorCorridor` is the next eligible Publish repo in the tracked follow-up cycle.

## Current read

`HorrorCorridor` is a cooperative first-person horror maze prototype implemented as a Next/React app with Three.js rendering, Zustand state stores, PeerJS transport, seeded maze generation, ordered anomaly-cube objective rules, ooze-trail navigation evidence, object-kit/procedural-material content packs, and live validation harnesses.

The project is playable, but the service boundaries are still not clean enough for Nexus-style kit promotion. `GameShell.tsx` owns session setup, room identity, host/client creation, loading steps, lobby transitions, start sync, and UI screen routing. `GameCanvas.tsx` owns render setup, pointer lock, camera, player stepping, host-authoritative state mutation, client pose updates, interaction routing, world sync, minimap drawing, debug-frame capture, and resource disposal.

## Interaction loop

```txt
current loop:
  open app
  -> start menu
  -> choose solo, host, or join
  -> create room / join code / peer identity
  -> enter lobby or solo bootstrap
  -> run loading steps for maze field, terrain raycast, object kits, PBR materials, lighting pass
  -> create seeded maze snapshot
  -> spawn players and colored cubes
  -> enter pointer-lock first-person play
  -> navigate using light, maze structure, props, minimap, and ooze traces
  -> pick up one cube at a time
  -> carry / drop / place cubes at the end anomaly
  -> validate ordered color sequence
  -> enter victory or keep correcting the placed sequence
  -> return to lobby or title
```

```txt
target loop:
  session-domain-kit creates solo/host/client room state
  -> peer-room-sync-kit owns all transport messages and host authority cadence
  -> maze-bootstrap-kit creates deterministic snapshots
  -> first-person-player-kit emits local pose/input commands
  -> host-authority-kit validates commands and mutates authoritative state
  -> cube-interaction-kit applies pickup/drop/place/remove requests
  -> anomaly-sequence-kit evaluates solved progress and victory
  -> ooze-navigation-kit emits simulation data and render decals
  -> maze-render-kit consumes snapshots only
  -> runtime-debug-kit records deterministic frame and cadence summaries
```

## Domains in use

```txt
application shell:
  Next app, React client components, static UI surface, package scripts

session lifecycle:
  start screen, solo, host lobby, client lobby, pause, completion, return-to-title, room identity, join code, player identity

peer networking:
  PeerJS host/client transport, connection status, connection-open/close events, lobby messages, start-game messages, full sync, player updates, interaction requests

maze bootstrap:
  seed hash, grid generation, cell lookup, start/end cells, cube spawns, sequence slots, player spawns, replicated snapshot creation

first-person player:
  keyboard input, pointer lock, yaw/pitch, camera-relative movement, collision, local pose, velocity, carrying state

interaction:
  nearest loose cube, single-item carry, drop, end-anomaly placement, removal from anomaly, slot assignment, interaction-distance checks

objective:
  ordered color sequence, slot solved flags, exact-order match, victory transition, victory reversal when sequence is corrected

ooze navigation:
  trail spacing, max ooze cap, periodic decay, random scale/rotation, ooze count, render decal feed

rendering:
  WebGL renderer, perspective camera, post-processing, scene construction, static maze geometry, terrain projection, cube/player sync, flashlight, ooze decals, scene dressing, minimap

content/protokits:
  horror corridor preset, content pack manifest, mesh object kits, texture kits, procedural PBR material kit, scene dressing descriptors, render validation descriptors

diagnostics and validation:
  runtime debug store, frame records, cadence summaries, live-agent scripts, live-player harness, object-kit review, visual match, protokit smoke
```

## Services and kit surfaces

### `corridor-session-domain-kit`

```txt
existing source surface:
  makeId
  makeJoinCode
  makeRoomId
  makePlayer
  makeRoomState
  enterSoloRun
  enterHostLobby
  enterClientLobby
  startPlay
  runLoadingSteps
  returnToLobby
  returnToStart
  toggleReady
  addGuestPlaceholder

offers:
  session mode transitions
  screen routing
  room creation
  lobby player setup
  readiness flags
  loading-step playback
  UI overlay state

next extraction:
  move all session and loading state transitions out of GameShell into a pure service consumed by React.
```

### `peer-room-sync-domain-kit`

```txt
existing source surface:
  createHost
  createClient
  handleTransportEvent
  createHostStartMessage
  createFullSyncMessage
  createLobbyEventMessage
  createPlayerUpdateMessage
  createInteractionRequestMessage

offers:
  host transport
  client transport
  lobby event routing
  host start broadcast
  full snapshot sync
  local player update messages
  interaction request messages
  connection-status mapping

next extraction:
  centralize protocol handling and snapshot publish cadence outside GameShell and GameCanvas.
```

### `maze-snapshot-bootstrap-kit`

```txt
existing source surface:
  hashSeed
  generateMaze
  createMazeCell
  mazeCellToWorld
  createInitialGameState
  buildReplicatedSnapshot

offers:
  deterministic seed hashing
  maze generation
  cell lookup
  cube bootstrap
  anomaly sequence bootstrap
  player bootstrap
  local input/view/pose bootstrap
  replicated snapshot creation

next extraction:
  make solo and host starts call one deterministic bootstrap service with a replayable seed contract.
```

### `first-person-corridor-player-kit`

```txt
existing source surface:
  createPlayerInputState
  keyboardCodeToPlayerInputButton
  setPlayerInputButton
  setPlayerPointerLocked
  accumulatePlayerLookDelta
  clearPlayerLookDelta
  applyPlayerLookDelta
  createPlayerViewAngles
  advancePlayerMovement
  resolveMazeCollision
  syncCameraFromPlayer

offers:
  keyboard-to-command mapping
  pointer lock state
  pointer look accumulation
  yaw/pitch integration
  camera-relative movement
  maze collision resolution
  pose snapshot output
  walk-camera bob

next extraction:
  split DOM input capture from pure player pose stepping so tests and host authority can run without React or WebGL.
```

### `host-authority-command-kit`

```txt
status:
  target extraction

offers:
  validate local/remote player commands
  apply client pose updates
  apply interaction requests
  reject impossible cube/anomaly requests
  own authoritative tick increment
  own full-sync reason/cadence
  create replayable command journal

next extraction:
  make the host mutate state through one command reducer instead of mixing local and network mutation across GameCanvas.
```

### `cube-carry-interaction-kit`

```txt
existing source surface:
  pickUpCube
  dropCube
  placeCubeAtEndAnomaly
  removeCubeFromEndAnomaly
  applyNetworkInteractionRequest
  syncHeldCubesToPlayers

offers:
  nearest-cube selection
  pickup
  drop
  place into anomaly slot
  remove last anomaly cube
  held-cube/player synchronization
  network interaction application

next extraction:
  expose a single request/apply API for local host, remote client, and replay smoke fixtures.
```

### `end-anomaly-sequence-kit`

```txt
existing source surface:
  validateOrderedSequenceCompletion
  evaluateSlots

offers:
  slot evaluation
  solved count
  exact-order match
  victory transition
  victory reversal after correction

next extraction:
  add headless fixtures for correct order, wrong order, removal, then correction.
```

### `ooze-trail-navigation-kit`

```txt
existing source surface:
  spawnOozeTrail
  decayOozeTrail
  advanceOozeTrail

offers:
  player-position trail spawning
  spacing guard
  max decal cap
  timed decay
  decal scale decay
  oozeLevel summary

next extraction:
  separate simulation output from Three decal rendering and add deterministic seeded RNG injection everywhere.
```

### `maze-world-render-kit`

```txt
existing source surface:
  createRenderer
  createCamera
  createPostProcessing
  createScene
  buildMazeWorld
  drawMinimapFrame

offers:
  renderer setup
  camera setup
  post-process pass setup
  static maze world construction
  dynamic cube/player sync
  flashlight sync
  ooze decal sync
  minimap draw
  scene dressing summary
  disposal hooks

next extraction:
  make render consume snapshots and descriptor feeds only. Do not let render own simulation rules.
```

### `horror-corridor-preset-kit`

```txt
existing source surface:
  createHorrorCorridorPreset
  createHorrorContentPackManifest
  defineHorrorContentPack

offers:
  maze preset
  sequence objective preset
  inventory preset
  spatial interaction preset
  trail decal preset
  terrain field/shader preset
  grass/object/corridor tile presets
  procedural texture presets
  lighting and render validation presets

next extraction:
  promote preset values into runtime config source of truth instead of scattering constants across components.
```

### `mesh-object-kit-catalog`

```txt
existing source surface:
  mesh-object-kit-catalog
  wound-triangle-mesh-domain-kit
  object kit descriptors

offers:
  descriptor catalog
  object-kit validation
  mesh-generating object-kit ids
  mesh-generating domain-kit ids
  shared descriptor contract

next extraction:
  track each object kit by promotion state: descriptor, smoke-tested, review-room visible, live runtime wired.
```

### `runtime-debug-frame-kit`

```txt
existing source surface:
  initializeRuntimeDebug
  clearRuntimeDebug
  recordRuntimeDebugEvent
  recordRuntimeDebugFrame
  createRuntimeDebugFrameRecord
  live-agent scripts
  live-player harness

offers:
  debug session setup
  event logging
  frame snapshots
  cube/anomaly/player summaries
  network cadence summaries
  scene dressing summaries
  validation harness input

next extraction:
  emit one stable diagnostics snapshot from the runtime service layer, not from GameCanvas internals.
```

## Current blockers

```txt
component-ownership:
  GameShell and GameCanvas still own too many cross-domain decisions.

host-authority-sprawl:
  host/client authority, command application, network publish cadence, and local state sync are split across component logic.

runtime-config-gap:
  horror-corridor-preset has the right config vocabulary, but runtime constants still live in mixed files and components.

render-simulation-coupling:
  render construction and live simulation state are still tightly connected through GameCanvas/worldBuilder.

determinism-gap:
  seeded maze bootstrap exists, but Date.now and Math.random still appear in runtime-adjacent services such as IDs, timestamps, and ooze decay fallback.

fixture-gap:
  current scripts validate broad runtime health, but there is no small command-journal fixture proving solo start, movement, interaction, ooze, and victory deterministically.
```

## Recommended next slice

```txt
HorrorCorridor Host Authority Contract Cutover
```

Build order:

```txt
1. Keep the current solo/host/client playable flow intact.
2. Add a pure host-authority-command-kit that accepts command objects and returns next GameState plus event outputs.
3. Define command types for player-pose-update, pickup-cube, drop-cube, place-cube, remove-cube, pause, resume, and complete-run.
4. Make local solo play use the same command reducer as host play.
5. Make client TRY_INTERACT and PLAYER_UPDATE messages convert into the same command objects.
6. Move sequence validation behind the command reducer.
7. Move ooze advance behind the command reducer with seeded RNG injection.
8. Make GameCanvas consume snapshots and dispatch commands, not own rule application.
9. Add a command journal fixture that replays to the same final snapshot.
10. Add smoke fixtures for solo start, movement collision, cube roundtrip, wrong-order correction, ooze cap/decay, and victory.
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
host-authority-command-kit can run in node without React/Three
solo and host paths share one command reducer
client interaction requests are validated through host authority
GameCanvas no longer directly decides victory or cube legality
runtime-debug-frame-kit receives service-level diagnostics
command-journal replay produces the same snapshot for the same seed
```

## Documentation changes in this run

```txt
.agent/trackers/2026-07-07T06-01-21-04-00/project-breakdown.md
.agent/kit-registry.json
.agent/README.md
```

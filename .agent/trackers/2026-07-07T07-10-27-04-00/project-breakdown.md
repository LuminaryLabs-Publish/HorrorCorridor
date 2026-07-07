# HorrorCorridor Project Breakdown

Run timestamp: `2026-07-07T07:10:27-04:00`  
Repository: `LuminaryLabs-Publish/HorrorCorridor`  
Selected repo: `LuminaryLabs-Publish/HorrorCorridor`  
Central tracker: `LuminaryLabs-Dev/LuminaryLabs`

## Summary

`HorrorCorridor` is a cooperative first-person horror maze with a playable solo, host, and client flow. The strongest next cut is still host authority, but this pass narrows it into a command reducer and replay boundary: keep the live loop intact, route all player and interaction mutations through one pure reducer, then prove the same command journal replays to the same replicated snapshot.

## Selection note

The central ledger showed `LuminaryLabs-Publish/IntoTheMeadow` as the latest completed tracked Publish repo at `2026-07-07T06:58:36-04:00`. `LuminaryLabs-Publish/HorrorCorridor` was the oldest eligible tracked repo in the rotation, with `LuminaryLabs-Publish/TheCavalryOfRome` excluded by standing rule.

## Current interaction loop

```txt
open app
-> StartMenu renders solo / host / join choices
-> solo path destroys transport and runs loading steps
-> host path creates room id, join code, host player, and PeerJS host transport
-> client path creates local client identity and connects to host join code
-> loading steps run maze field, terrain raycast, object kits, PBR materials, and lighting pass
-> createInitialGameState hashes seedSource and generates the maze snapshot
-> GameCanvas initializes renderer, scene, camera, post processing, and maze world
-> pointer lock / keyboard / mouse input updates local player pose
-> solo or host session applies local pose to currentGameState
-> host receives remote player updates and interaction requests
-> interaction rules pick up, drop, place, or remove cubes
-> sequence rules validate ordered anomaly slots and set victory
-> ooze rules spawn and decay trail evidence on network cadence
-> buildReplicatedSnapshot publishes authoritative state
-> render world, minimap, HUD, and debug frame records from snapshots
-> complete screen appears on victory
-> player returns to lobby or title
```

## Target interaction loop

```txt
session-domain-kit owns menu, lobby, room, ready, loading, return, and completion state
-> peer-room-sync-domain-kit owns PeerJS lifecycle and message transport
-> maze-snapshot-bootstrap-kit creates deterministic state and replicated snapshots
-> first-person-corridor-player-kit emits player pose and input commands
-> host-authority-command-kit validates every command before state mutation
-> cube-carry-interaction-kit applies legal pickup, drop, place, and remove commands
-> end-anomaly-sequence-kit evaluates solved state and victory transitions
-> ooze-trail-navigation-kit advances trail state through seeded command ticks
-> maze-world-render-kit consumes replicated snapshots and descriptor feeds only
-> runtime-debug-frame-kit records command, cadence, frame, and replay diagnostics
-> command-journal-replay-kit replays the same command stream to the same snapshot
```

## Domains in use

```txt
application shell
  Next app, React client components, menu/HUD shell, package scripts, and app route.

session lifecycle
  Start, join, host, solo, lobby, loading, pause, completion, return-to-lobby, return-to-title, room identity, join code, player identity, readiness, and overlay state.

peer sync
  PeerJS host/client creation, status mapping, lobby events, start-game messages, full sync messages, player updates, interaction requests, and host reconciliation.

maze bootstrap
  Seed hashing, grid generation, cell snapshots, cell lookup, cube spawns, sequence slots, player spawn offsets, start/end cells, and initial replicated snapshots.

first-person player
  Keyboard mapping, pointer lock, look deltas, yaw/pitch integration, camera-relative movement, maze collision, local pose, velocity, carrying state, and camera bob.

host authority
  Local and remote command validation, request application, tick ownership, publish cadence, full-sync reason output, journal event shape, and replay determinism.

cube interaction
  Nearest loose cube selection, one-cube carrying, drop, anomaly placement, anomaly removal, slot assignment, held-cube sync, legality checks, and correction.

sequence objective
  Ordered color requirement, slot solved flags, solved count, exact-order match, victory transition, and victory reversal when the slot set becomes invalid.

ooze navigation
  Trail spacing, max cap, timed decay, seeded or fallback RNG, height/rotation/scale, ooze count, and decal render feed.

maze rendering
  Three renderer, camera, post-processing, maze world construction, terrain eye position, cube/player mesh sync, flashlight, ooze decals, minimap, scene dressing, and disposal.

protokit content
  Horror corridor preset, mesh object descriptor catalog, wound-triangle descriptor base, procedural texture kits, PBR material vocabulary, scene dressing descriptors, and content-pack direction.

diagnostics and validation
  Runtime debug store, debug events, frame records, cadence summaries, debug overlay, live agent scripts, live player harness, visual match, object kit review, ProtoKit smoke, and target command journal smoke.
```

## Services that kits offer

```txt
corridor-session-domain-kit
  makeId
  makeJoinCode
  makeRoomId
  makePlayer
  makeRoomState
  enterSoloRun
  enterHostLobby
  enterClientLobby
  runLoadingSteps
  startPlay
  resumePlay
  returnToLobby
  returnToStart
  toggleReady
  setReadiness

peer-room-sync-domain-kit
  createHost
  createClient
  onTransportEvent
  mapPeerStatus
  createLobbyEventMessage
  createHostStartMessage
  createFullSyncMessage
  createPlayerUpdateMessage
  createInteractionRequestMessage
  hostBroadcast
  clientSend
  snapshotPublishCadence

maze-snapshot-bootstrap-kit
  hashSeed
  generateMaze
  createMazeCell
  cellKey
  mazeCellToWorld
  createInitialGameState
  initializeCubeSnapshots
  initializeSequenceSlots
  initializePlayers
  buildReplicatedSnapshot

first-person-corridor-player-kit
  createPlayerInputState
  keyboardCodeToPlayerInputButton
  setPlayerInputButton
  setPlayerPointerLocked
  accumulatePlayerLookDelta
  clearPlayerLookDelta
  createPlayerViewAngles
  applyPlayerLookDelta
  advancePlayerMovement
  resolveMazeCollision
  syncCameraFromPlayer
  emitPoseSnapshot

host-authority-command-kit
  defineCommandTypes
  validatePlayerPoseUpdate
  validateInteractionRequest
  applyHostCommand
  applyClientCommand
  applyLocalSoloCommand
  advanceAuthoritativeTick
  chooseFullSyncReason
  recordCommandJournalEntry
  rejectIllegalCommand
  emitCommandDiagnostics

cube-carry-interaction-kit
  findPlayer
  findCarriedCube
  findNearestLooseCube
  pickUpCube
  dropCube
  placeCubeAtEndAnomaly
  removeCubeFromEndAnomaly
  syncHeldCubesToPlayers
  applyNetworkInteractionRequest

end-anomaly-sequence-kit
  buildCubeLookup
  evaluateSlots
  validateOrderedSequenceCompletion
  deriveSolvedCount
  deriveExactOrderMatch
  setVictory
  reverseVictoryOnCorrection

ooze-trail-navigation-kit
  resolveRng
  decayOozeTrail
  spawnOozeTrail
  advanceOozeTrail
  enforceSpacing
  enforceMaxOoze
  emitOozeLevelSummary
  emitDecalFeed

maze-world-render-kit
  createRenderer
  createScene
  createCamera
  createPostProcessing
  buildMazeWorld
  attachWorld
  updateWorldFromSnapshot
  getTerrainEyePosition
  drawMinimapFrame
  renderPostProcessing
  disposeWorld

runtime-debug-frame-kit
  initializeRuntimeDebug
  clearRuntimeDebug
  recordRuntimeDebugEvent
  recordRuntimeDebugFrame
  createRuntimeDebugFrameRecord
  summarizeCadenceWindow
  toggleDebugOverlay
  exposeLivePlayerValidation

command-journal-replay-kit
  serializeCommand
  appendCommand
  replayJournal
  compareSnapshot
  assertDeterministicSnapshot
  emitReplayReport
```

## Kits identified

### Current and target service kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
host-authority-command-kit
cube-carry-interaction-kit
end-anomaly-sequence-kit
ooze-trail-navigation-kit
maze-world-render-kit
runtime-debug-frame-kit
command-journal-replay-kit
snapshot-contract-smoke-kit
```

### Implemented ProtoKit and catalog surfaces

```txt
wound-triangle-mesh-domain-kit
mesh-object-kit-catalog
horror-corridor-preset-kit
procedural-texture-kit-family
```

### Mesh object kits tracked through catalog

```txt
rusted-service-door-object-kit
chain-link-fence-object-kit
broken-generator-object-kit
concrete-jersey-barrier-object-kit
storm-drain-culvert-object-kit
collapsed-signpost-object-kit
industrial-shelving-object-kit
hanging-chain-hook-object-kit
barrel-cluster-object-kit
broken-concrete-stair-object-kit
```

### Texture kits tracked through procedural family

```txt
brick-course-texture-kit
damp-mud-texture-kit
rust-streak-texture-kit
moss-grime-texture-kit
wet-concrete-texture-kit
```

## Key findings

- `GameShell.tsx` still owns session identity, room creation, loading steps, lobby transitions, transport creation, and play start orchestration.
- `GameCanvas.tsx` still owns too many domains at once: WebGL setup, input capture, local pose stepping, host mutation, client send paths, interaction selection, victory commit, ooze cadence, snapshot publishing, runtime store syncing, rendering, minimap, and debug frame capture.
- Domain files are already close to reusable service shape. `interactionRules.ts`, `networkRules.ts`, `winRules.ts`, `oozeRules.ts`, and `createInitialGameState.ts` can become the backbone of the first extracted pure runtime surface.
- `networkRules.ts` is currently the closest place to a command reducer, but it only handles player updates and interaction requests. It needs explicit command metadata, rejection outputs, tick outputs, full-sync reason outputs, and journal entries.
- `oozeRules.ts` already accepts RNG injection, which makes it ready for deterministic replay once host authority routes ooze advancement through command ticks.
- The runtime has useful validation entry points through lint, ProtoKit smoke, live-player validation, object-kit review, visual match, and live-agent scripts, but it is missing a Node-runnable gameplay authority smoke fixture.
- The next useful artifact is not another renderer pass. It is a deterministic command boundary that lets component code become host/input/render glue.

## Recommended next work

Next slice:

```txt
HorrorCorridor Command Reducer Replay Cutover
```

Build order:

```txt
1. Keep the current solo, host, and client playable loop intact.
2. Add `host-authority-command-kit` as a pure TypeScript module under game-state/domain or a new kits folder.
3. Define command objects for PLAYER_POSE_UPDATE, TRY_INTERACT, ADVANCE_OOZE, PAUSE, RESUME, REQUEST_SYNC, and COMPLETE_RUN.
4. Move `applyNetworkPlayerUpdate`, `applyNetworkInteractionRequest`, `syncHeldCubesToPlayers`, `validateOrderedSequenceCompletion`, and `advanceOozeTrail` behind command application.
5. Return `{ state, events, rejected, publishReason, journalEntry }` from the command reducer.
6. Make solo local input dispatch PLAYER_POSE_UPDATE and TRY_INTERACT through the reducer.
7. Make host transport PLAYER_UPDATE and TRY_INTERACT messages dispatch the same reducer.
8. Keep clients predictive for pose, but treat host snapshots as authority.
9. Add `command-journal-replay-kit` with a fixture that boots a seeded snapshot, applies command JSON, and compares final snapshot.
10. Add smoke scripts for solo bootstrap, pose collision, cube pickup/drop, wrong order correction, victory, ooze cap/decay, and replay parity.
11. Update runtime debug frames to include last command type, rejected command count, journal length, and publish reason.
12. Leave render and mesh object kit promotion alone until command authority is deterministic.
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
node-runnable host-authority command reducer
solo and host sessions use the same mutation path
client requests are validated by host authority
GameCanvas dispatches commands instead of directly deciding cube legality or victory
ooze advancement is command-driven with injected RNG for fixtures
command journal replay reaches the same final replicated snapshot for the same seed
runtime debug frames expose lastCommandType, rejectedCommandCount, journalLength, and publishReason
```

## Files inspected

```txt
.agent/README.md
.agent/kit-registry.json
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameShell.tsx
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/createInitialGameState.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/scripts/horror-corridor-harness.mjs
```

## No runtime build

No runtime source code was changed in this pass. No local build or validation command was run because this documentation run used the GitHub connector only.

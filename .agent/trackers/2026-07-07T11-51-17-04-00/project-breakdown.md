# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T11-51-17-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected next slice:** `HorrorCorridor Command Result Rejection Contract + Snapshot Metadata Fixture Cutover`

## Summary

`HorrorCorridor` is still a cooperative first-person maze horror game under `HorrorCorridor-V1`. It already has a playable Next, React, Three.js, Zustand, and PeerJS loop with seeded maze bootstrap, pointer-lock movement, cube carry/place interactions, ordered anomaly completion, ooze trail pressure, replicated snapshots, runtime debug frames, object/texture ProtoKit direction, and live validation scripts.

The best next cut is not render extraction and not broad command routing yet. The first executable seam should be the **command result rejection contract**, because the current rule layer mostly returns only `GameState`. Illegal or unchanged operations are silent, so publish decisions, debug frames, replay parity, and fixture assertions cannot reliably explain what happened.

## Selection reason

The central ledger most recently completed `LuminaryLabs-Publish/IntoTheMeadow`. The Publish installation order places `HorrorCorridor` as the next eligible tracked repo after `IntoTheMeadow`, with `LuminaryLabs-Publish/TheCavalryOfRome` excluded by rule.

```txt
eligible rotation used:
  HorrorCorridor
  AetherVale
  TheOpenAbove
  PhantomCommand
  PrehistoricRush
  ZombieOrchard
  IntoTheMeadow

excluded:
  TheCavalryOfRome

previous eligible repo:
  IntoTheMeadow

selected repo:
  HorrorCorridor
```

## Evidence reviewed

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
.agent/README.md
.agent/kit-registry.json
```

## Interaction loop

### Current loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create room ID / join code / local player identity
-> host creates PeerJS transport or client connects to host code
-> run loading readiness steps
-> create seeded maze and initial replicated snapshot
-> mount GameCanvas
-> create renderer, scene, camera, post-processing, and maze world
-> enter pointer-lock first-person navigation
-> DOM input updates inputRef and poseRef
-> solo/host branch mutates currentGameState directly
-> client branch sends PLAYER_UPDATE and TRY_INTERACT transport messages
-> host receives transport messages
-> host calls applyNetworkPlayerUpdate or applyNetworkInteractionRequest directly
-> interaction rules silently return unchanged state for invalid requests
-> ooze trail advances on host cadence with optional RNG injection
-> publishAuthoritativeState mutates tick/timestamp/room metadata, builds snapshot, updates store, and optionally broadcasts SYNC
-> render, minimap, HUD, runtime debug frames, and completion UI consume latest snapshot
```

### Target player loop

```txt
spawn in maze
-> move with WASD / arrows
-> look with pointer lock
-> pick up nearest legal cube
-> carry cube through maze
-> reach end anomaly
-> place cube into ordered slot
-> receive explicit accepted or rejected interaction result
-> wrong order can reverse or remain unsolved with visible state
-> host ooze cadence advances through deterministic command context
-> victory commits when the ordered sequence is complete
-> snapshot publishes include the command result reason that caused publication
```

### Recommended service loop

```txt
host / local / fixture input
-> command-envelope-contract-kit normalizes command fields
-> command-acceptance-policy-kit validates actor, room, source, app state, and command type
-> command-result-rejection-contract-kit wraps every authoritative reducer
-> player-pose-command-result-kit applies pose update or rejects with reason
-> interaction-command-result-kit preflights pickup/drop/place/remove legality
-> ooze-command-result-kit advances decay/spawn with deterministic RNG context
-> command-result-journal-kit stores accepted and rejected results separately
-> snapshot-publish-metadata-kit derives publishReason and publishDecision from command result
-> snapshot-publish-fixture-kit asserts resync/recovery/no-publish/victory behavior
-> runtime-debug-frame-kit records last command, last rejection, journal length, and last publish decision
-> command-journal-replay-kit replays commands and compares normalized final snapshot
```

## Domains identified

```txt
application-shell
next-client-runtime
react-game-surface
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
loading-readiness
seeded-maze-bootstrap
maze-cell-lookup
maze-pathing
cube-spawn-bootstrap
anomaly-sequence-bootstrap
replicated-snapshot-bootstrap
first-person-input
pointer-lock-control
keyboard-input
mouse-look-input
player-view-angles
player-movement-integration
maze-collision-resolution
local-pose-prediction
camera-bob
local-carry-state-sync
host-authority
local-authoritative-simulation
remote-authoritative-ingress
command-envelope-contract
command-acceptance-policy
command-result-contract
command-result-rejection-policy
command-result-journal
command-journal-replay
player-pose-command-result
cube-carry-interaction
nearest-cube-selection
carried-cube-state
end-anomaly-distance-check
slot-assignment
sequence-objective
ordered-sequence-validation
victory-completion
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
snapshot-publish-fixture
full-sync-message-output
runtime-debug-event-log
runtime-debug-frame-log
cadence-diagnostics
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

## Services identified

```txt
session-service:
  createRoomId
  createJoinCode
  createPlayerIdentity
  createRoomState
  runLoadingReadiness
  enterSoloMode
  enterHostLobby
  enterClientLobby
  startPlay
  pauseResume
  commitCompletion
  returnRouting

peer-sync-service:
  createHostTransport
  createClientTransport
  mapConnectionStatus
  sendLobbyEvents
  sendStartGame
  sendFullSync
  sendPlayerUpdate
  sendTryInteract
  receiveHostMessages
  mapTransportMessageToCommandEnvelope

maze-bootstrap-service:
  hashSeed
  generateMaze
  buildCellLookup
  buildPathsFromEndToCubeSpawns
  createPlayerSpawns
  createCubeSpawns
  initializeAnomalySequenceSlots
  createInitialGameState
  createInitialReplicatedSnapshot

first-person-player-service:
  keyboardCodeToPlayerInputButton
  setPlayerInputButton
  accumulatePlayerLookDelta
  clearPlayerLookDelta
  applyPlayerLookDelta
  createPlayerViewAngles
  advancePlayerMovement
  resolveMazeCollision
  syncCameraFromPlayer
  toPlayerInputSnapshot

host-command-envelope-adapter-service:
  normalizeLocalPoseUpdate
  normalizeClientPlayerUpdateMessage
  normalizeLocalTryInteract
  normalizeClientTryInteractMessage
  normalizeAdvanceOozeCadence
  normalizeRequestSync
  attachCommandId
  attachActorId
  attachSource
  attachSequence
  attachTimestampMs
  attachRequestId
  attachPayload

command-acceptance-policy-service:
  rejectUnknownCommandType
  rejectMissingActor
  rejectRoomMismatch
  rejectSourceMismatch
  rejectInteractionOutsidePlaying
  acceptRequestSyncAsPublishOnly
  classifyChangedUnchangedResult

command-result-rejection-service:
  createAcceptedResult
  createRejectedResult
  classifyNoopAsRejectedOrUnchanged
  attachRejectionReason
  attachChangedFlag
  attachEventList
  attachPublishMetadata
  attachDiagnosticsPayload

player-pose-command-result-service:
  validatePlayerExists
  validatePosePayload
  applyPoseUpdate
  syncHeldCubesToPlayers
  emitPoseChangedEvent
  emitMissingPlayerRejection

interaction-command-result-service:
  preflightInteractionState
  preflightPlayerExists
  preflightCarriedCubeState
  preflightNearestCube
  preflightEndAnomalyDistance
  preflightSlotAvailability
  applyPickupCube
  applyDropCube
  applyPlaceCubeAtAnomaly
  applyRemoveCubeFromAnomaly
  emitInteractionAcceptedEvent
  emitInteractionRejectedReason

ooze-command-result-service:
  resolveDeterministicRng
  decayOozeTrail
  spawnOozeTrail
  enforceSpacing
  enforceMaxCap
  updateOozeLevel
  emitOozeChangedEvent
  emitOozeUnchangedEvent

snapshot-publish-service:
  incrementAuthoritativeTick
  attachRoomPhaseUpdatedAt
  buildReplicatedSnapshot
  attachPublishReason
  attachPublishDecision
  setRuntimeStoreSnapshot
  broadcastFullSync
  compareFixtureSnapshot

diagnostics-service:
  initializeRuntimeDebug
  clearRuntimeDebug
  recordRuntimeDebugEvent
  recordRuntimeDebugFrame
  summarizeCadence
  attachLastCommandType
  attachLastCommandId
  attachLastRejectionReason
  attachJournalLength
  attachLastPublishDecision

replay-service:
  serializeCommandEnvelope
  serializeCommandResult
  appendAcceptedResult
  appendRejectedResult
  replayCommandJournal
  normalizeVolatileFields
  compareFinalSnapshot
  emitReplayParityReport
```

## Kits identified

### Current and target gameplay kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
host-command-envelope-adapter-kit
command-envelope-contract-kit
command-acceptance-policy-kit
host-authority-command-kit
command-result-contract-kit
command-result-rejection-contract-kit
command-result-journal-kit
player-pose-command-result-kit
interaction-command-result-kit
ooze-command-result-kit
cube-carry-interaction-kit
end-anomaly-sequence-kit
ooze-trail-navigation-kit
snapshot-publish-metadata-kit
snapshot-publish-fixture-kit
snapshot-publish-contract-kit
command-result-fixture-kit
command-journal-replay-kit
snapshot-contract-smoke-kit
replay-parity-smoke-kit
maze-world-render-kit
runtime-debug-frame-kit
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

- `package.json` already exposes the useful validation surface: lint, ProtoKit smoke, live-agent runs, object-kit review, visual matching, and live-player validation.
- `GameCanvas.tsx` remains the runtime concentration point for renderer setup, input, pose stepping, host/client message handling, direct state mutation, ooze cadence, snapshot publish, minimap draw, and debug capture.
- `publishAuthoritativeState()` still mutates room phase, tick, timestamp, app state, runtime store, sync debug records, and full-sync broadcast from inside `GameCanvas.tsx`.
- Host transport handling still calls `applyNetworkPlayerUpdate()` and `applyNetworkInteractionRequest()` directly, then publishes immediately.
- The local authoritative branch still writes `currentGameState`, applies player updates, syncs held cubes, advances ooze, and publishes directly on cadence.
- `networkRules.ts` is the closest reducer seam, but it returns only `GameState` and cannot tell callers whether a command changed state, was rejected, or should publish.
- `interactionRules.ts` has useful legality checks, including play-state readiness, player lookup, carried cube checks, nearest cube selection, end anomaly distance, slot availability, and sequence sync, but invalid requests return unchanged state without explicit rejection metadata.
- `oozeRules.ts` already accepts RNG injection, but falls back to `Math.random`. Fixtures need deterministic RNG to make `ADVANCE_OOZE` replayable.
- `syncSnapshot.ts` already has stable `buildReplicatedSnapshot()` and `createFullSyncMessage()` surfaces, making it the correct base for publish metadata and snapshot fixture work.

## Recommended next work

### Next slice

```txt
HorrorCorridor Command Result Rejection Contract + Snapshot Metadata Fixture Cutover
```

### Build order

```txt
1. Keep solo, host, and client play working.
2. Add command-result-rejection-contract-kit before moving the whole runtime through command envelopes.
3. Define CommandResult fields: commandId, type, actorId, accepted, rejected, rejectionReason, changed, events, publishDecision, publishReason, beforeTick, afterTick, diagnostics.
4. Add player-pose-command-result-kit around applyNetworkPlayerUpdate.
5. Return rejected=true with reason=missing_player when player updates reference an unknown player.
6. Return changed=false with reason=unchanged_pose when a pose update is valid but produces no semantic change.
7. Add interaction-command-result-kit with preflight reason mapping before calling existing interactionRules effects.
8. Map illegal pickup/drop/place/remove to stable reasons: not_playing, missing_player, already_carrying, no_carried_cube, no_nearby_cube, too_far_from_anomaly, no_open_slot, wrong_slot, no_placed_cube.
9. Add ooze-command-result-kit around advanceOozeTrail with deterministic RNG required in fixtures.
10. Add snapshot-publish-metadata-kit that derives publishDecision from CommandResult.
11. Keep request-sync as publish-only with accepted=true, changed=false, publishReason=recovery.
12. Add command-result-journal-kit with separate accepted, rejected, and unchanged counts.
13. Extend runtime debug frame shape with lastCommandId, lastCommandType, lastRejectionReason, lastPublishReason, publishDecision, and commandJournalLength.
14. Add command-result-fixture-kit with scripted pose, illegal pickup, legal pickup, illegal place, legal place, request-sync, seeded ooze, and victory examples.
15. Add replay-parity-smoke-kit after fixture result shape is stable.
16. Defer render extraction, world-builder extraction, and broad PeerJS adapter extraction until command result fixtures pass.
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
command-result-rejection-contract-kit imports no React, Three, Zustand, or PeerJS
CommandResult exposes accepted, rejected, rejectionReason, changed, events, publishDecision, and publishReason
unknown player pose update returns rejected=true with reason=missing_player
illegal pickup returns rejected=true with reason=no_nearby_cube or already_carrying
illegal place returns rejected=true with reason=too_far_from_anomaly, no_carried_cube, or no_open_slot
request-sync returns accepted=true, changed=false, publishDecision=publish, publishReason=recovery
ADVANCE_OOZE fixture injects deterministic RNG and produces stable snapshot output
snapshot-publish-metadata-kit covers resync, recovery, no-publish, and victory decisions
command-result-journal-kit records accepted, rejected, and unchanged counts
runtime debug frame includes command result and publish metadata
replay fixture reaches identical normalized final snapshot after volatile fields are removed
```

## Suggested file targets

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandResultTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/playerPoseCommandResult.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionCommandResult.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeCommandResult.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResultJournal.ts
HorrorCorridor-V1/src/features/networking/protocol/snapshotPublishMetadata.ts
HorrorCorridor-V1/scripts/fixtures/horror-corridor-command-results.json
HorrorCorridor-V1/scripts/horror-corridor-command-result-smoke.mjs
```

## Notes

No runtime source code changed in this documentation pass. This entry updates the internal breakdown, registry target, and central tracking only.

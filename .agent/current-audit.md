# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T16-21-09-04-00`

## Status

```txt
status: active-run-disconnect-player-retirement-owned-state-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: complete
```

## Summary

The host transport emits a connection-close event with `remotePeerId` and `connectionId`. `GameShell` looks up that peer in `lobbyPlayers`, calls `removeLobbyPlayer()`, then broadcasts a `LOBBY_EVENT` built from the updated session-store room.

The active authoritative game does not consume that removal. `GameCanvas` owns a separate mutable `currentGameState` closure created at runtime initialization. It does not subscribe to session-roster changes or connection-close events. Future host snapshots clone `currentGameState.room.players`, `currentGameState.players` and cube ownership, so the disconnected actor remains authoritative and visible.

## Plan ledger

**Goal:** define one disconnect/reconnect transaction across transport identity, membership, live GameState, owned cubes, ooze pressure, snapshots and visible projection.

- [x] Complete Publish inventory and central comparison.
- [x] Cavalry exclusion.
- [x] Single stable repository selection.
- [x] Read `GameShell.tsx`, `GameCanvas.tsx`, `sessionStore.ts`, `createHost.ts`, `networkRules.ts` and `syncSnapshot.ts`.
- [x] Trace connection-close through all current consumers.
- [x] Identify interaction loop, domains, kits and services.
- [x] Record ghost-player, orphaned-cube and split-roster cases.
- [x] Define typed disconnect, retirement, cube recovery, reconnect and projection contracts.
- [x] Add timestamped audits and refresh root `.agent` state.
- [x] Push only to `main` with no branch or pull request.
- [x] Update central ledger and internal change log.
- [ ] Runtime implementation and executable fixtures remain future work.

## Interaction loop

```txt
peer connection closes
  -> createHost emits peer/connection-close
  -> GameShell finds remotePeerId in lobbyPlayers
  -> sessionStore removes that lobby row and updates session room
  -> GameShell broadcasts player-left LOBBY_EVENT
  -> active GameCanvas receives no retirement command
  -> currentGameState retains room row and gameplay player
  -> host movement/ooze/publication continues
  -> buildReplicatedSnapshot clones retained player and cube ownership
  -> clients continue rendering ghost state
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding readiness start and bootstrap
run session epoch exit runtime readiness disconnect and reconnect
PeerJS host/client transport and BroadcastChannel bridge
peer connection registry events close/error and actor binding
protocol construction serialization request correlation and admission
seeded maze room player cube anomaly and ooze bootstrap
replicated snapshot construction publication acceptance and replay
pointer lock keyboard mouse blur and input lifecycle
movement collision camera prediction and host admission
interaction intent target observation cube/slot claims and results
cube pickup drop place remove held ownership and synchronization
active actor membership retirement owned-state recovery and reconnect claims
ordered anomaly victory failure and terminal projection
ooze spawn decay spacing capacity pressure and player-position input
Three.js world post-processing minimap HUD debug and frame projection
RAF resize resources cleanup validation build and deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** routing, solo/host/client entry, loading, pause, completion, lobby return and title exit.
- **corridor-session-domain-kit:** session mode, peer identity, room, lobby roster, connection state and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, view angles, input, readiness and reset.
- **ui-pause-projection-kit:** local pause state and overlay projection.
- **ui-completion-projection-kit:** victory/failure state, message, acknowledgement and completed routing.
- **complete-screen-presentation-kit:** terminal copy, restart and title exit.
- **lobby-screen-presentation-kit:** room metadata, roster, readiness, controls and connection status.
- **peer-host-transport-kit:** PeerJS/BroadcastChannel host, connection registry, close events, broadcast, targeted send and destroy.
- **peer-client-transport-kit:** host connection, send, status, disconnect and destroy.
- **peer-event-bus-kit:** typed event subscription and cleanup.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encode/decode, version and structural admission.
- **maze-snapshot-bootstrap-kit:** deterministic maze, players, cubes, anomaly, room and initial snapshot.
- **first-person-input-kit:** keyboard, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit:** movement, maze collision, eye pose, shake and camera.
- **network-player-update-kit:** client pose send, host consume and projection.
- **corridor-interaction-domain-kit:** pickup/drop/place/remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered slot validation and victory evaluation.
- **ooze-trail-domain-kit:** spawn, decay, spacing, capacity and ooze level.
- **snapshot-outcome-routing-kit:** inbound snapshot to UI outcome projection.
- **corridor-authoritative-publication-kit:** tick, snapshot clone, SYNC and broadcast.
- **corridor-animation-loop-kit:** RAF lifecycle and delta.
- **corridor-render-world-kit:** terrain, maze, players, cubes, anomaly, ooze, props, lights and disposal.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and disposal.
- **corridor-minimap-kit:** maze, players, cubes and anomaly projection.
- **runtime-debug-frame-kit:** bounded frame/event records and JSON export.
- **runtime-resource-cleanup-kit:** RAF, subscriptions, observer, listeners, world, post-processing, renderer and canvas cleanup.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object review and live-player validation.

## Source findings

```txt
connection-close authority owner: GameShell
live GameState owner: GameCanvas closure
bridge between them: absent

removeLobbyPlayer updates:
  sessionStore.lobbyPlayers
  sessionStore.room.players

removeLobbyPlayer does not update:
  GameCanvas.currentGameState.room.players
  GameCanvas.currentGameState.players
  held cube ownership
  ooze playerPositions
  authoritative snapshot directly
```

`publishAuthoritativeState()` snapshots the retained `currentGameState`. `buildReplicatedSnapshot()` maps all retained players and cubes, including `ownerId` for held cubes.

## Ghost and orphan cases

```txt
ghost actor:
  disconnect occurs during active run
  session lobby row disappears
  gameplay player remains in every SYNC

held cube:
  disconnected player remains in GameState
  cube continues tracking ghost position

future naive player deletion:
  player removed without cube recovery
  syncHeldCubesToPlayers cannot find owner
  cube is returned unchanged with stale heldByPlayerId
```

## Required parent domain

```txt
horror-corridor-active-run-disconnect-authority-domain
  -> transport-actor-connection-binding-kit
  -> peer-disconnect-observation-kit
  -> disconnect-command-envelope-kit
  -> disconnect-classification-kit
  -> active-membership-revision-kit
  -> player-suspension-kit
  -> player-retirement-kit
  -> owned-cube-recovery-kit
  -> gameplay-roster-transaction-kit
  -> disconnect-result-kit
  -> disconnect-publication-kit
  -> reconnect-claim-kit
  -> disconnect-frame-correlation-kit
  -> disconnect-journal-kit
  -> active-run-disconnect-fixture-kit
```

## Required guarantees

```txt
one connection close maps to one admitted actor in one run and epoch
transient loss, timeout, explicit leave and kick have distinct policies
session room and gameplay roster commit under one membership revision
retired actor stops contributing to movement interaction ooze and publication
owned cubes are dropped returned reserved or transferred by explicit policy
no cube remains held by a missing player
reconnect reclaims only the matching suspended actor and revision
snapshot world minimap HUD and debug acknowledge the same disconnect result
stale duplicate and cross-epoch close/reconnect events cannot mutate current state
```

Documentation only. No runtime behavior changed.

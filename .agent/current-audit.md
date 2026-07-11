# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T03-18-44-04-00`

## Status

```txt
status: lobby-start-transaction-authority-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: completed in this run
```

## Product and interaction loop

```txt
title
  -> solo, host or client lobby
  -> local roster and room state
  -> client ready toggle mutates only its local store
  -> host starts without authoritative readiness admission
  -> asynchronous loading and deterministic bootstrap
  -> host commits local PLAYING state
  -> START_GAME broadcast
  -> initial SYNC broadcast
  -> client room projection from START_GAME
  -> client gameplay projection from SYNC
  -> first-person movement, cube interactions, anomaly objective and ooze pressure
  -> render, minimap, HUD and debug projection
```

## Domains in use

- application shell and screen routing
- UI overlay, pause, completion and settings projection
- session mode, peer identity, room, roster, readiness and connection state
- lobby presentation, ready controls and start controls
- PeerJS host/client transport and BroadcastChannel bridge
- peer event bus and connection-status projection
- versioned protocol envelopes and message construction
- lobby command admission, roster revision and start transaction authority
- START_GAME and initial SYNC correlation
- seeded maze, cube, anomaly, room, roster and player bootstrap
- room phase and replicated app/game state
- pointer lock, keyboard, mouse, blur and input lifecycle
- local movement integration, maze collision, camera and walk shake
- client prediction and player-update publication
- host remote-player update consumption
- interaction, cube carry, placement, removal, rollback and victory
- ooze cadence, decay, spawn, spacing and capacity
- authoritative snapshot construction and publication
- client snapshot replay and local pose projection
- Three.js scene, terrain, maze, props, lights, cubes, players, ooze and dressing
- animation loop, resize, canvas and frame ownership
- post-processing composer and bloom
- minimap and HUD projection
- runtime debug frames and events
- resource disposal and component cleanup
- build, lint, harness, visual, object-kit and live-player validation

## Implemented kits and services

- **corridor-application-shell-kit**: screen routing, menu orchestration, solo/host/client entry, pause/resume, completion, exit callbacks
- **corridor-session-domain-kit**: session mode, peer identity, room, roster, connection status, session reset
- **runtime-store-snapshot-kit**: authoritative snapshot, local pose, view angles, input flags, readiness, runtime reset
- **ui-pause-projection-kit**: local pause state, pause reason, pause overlay, PLAYING/PAUSED projection
- **lobby-screen-presentation-kit**: room metadata, roster projection, ready badges, primary/secondary controls, connection status
- **peer-host-transport-kit**: host peer, connection registry, broadcast, targeted send, disconnect, destroy
- **peer-client-transport-kit**: host connection, send, local bridge, status, disconnect, destroy
- **peer-event-bus-kit**: typed transport events, subscribe, unsubscribe, clear
- **protocol-message-construction-kit**: versioned envelopes, START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
- **maze-snapshot-bootstrap-kit**: deterministic seed, maze, cubes, anomaly, active room, players, initial snapshot
- **first-person-input-kit**: keyboard state, pointer lock, look accumulation, input snapshots
- **movement-collision-camera-kit**: movement integration, local maze collision, eye position, walk shake, camera projection
- **network-player-update-kit**: client update send, host update consume, pose projection, network cadence
- **corridor-interaction-domain-kit**: pickup, drop, place, remove, held-cube synchronization
- **ordered-anomaly-sequence-kit**: ordered validation, rollback, ending phase, victory
- **ooze-trail-domain-kit**: cadence, decay, spawn, spacing guard, capacity guard
- **corridor-authoritative-publication-kit**: snapshot tick, full sync, broadcast, publication reason, cadence accounting
- **corridor-animation-loop-kit**: RAF start, RAF stop, delta calculation, idempotent running state
- **corridor-render-world-kit**: terrain, maze, cubes, players, anomaly, ooze, props, lights, attach, update, dispose
- **corridor-post-processing-kit**: composer, bloom, output, resize, render, dispose
- **corridor-minimap-kit**: maze projection, player markers, cube markers, anomaly markers
- **runtime-debug-frame-kit**: bounded frames, bounded events, overlay preferences, JSON-safe browser export
- **runtime-resource-cleanup-kit**: RAF stop, transport unsubscribe, observer disconnect, listener removal, world/composer/renderer disposal, canvas removal
- **package-validation-kit**: build, lint, ProtoKit smoke, harness, visual match, object-kit review, live-player validation

## Source findings

```txt
LobbyScreen always enables the primary action
client primary action calls toggleReady instead of entering a validated start flow
toggleReady mutates the local session store only
TRY_INTERACT includes a toggle-ready vocabulary but the lobby path does not send it
host start checks only host mode and room presence
host does not verify connected participants, readiness, placeholders or roster revision
runLoadingSteps is asynchronous and no starting phase prevents duplicate start attempts
createInitialGameState consumes the current host lobbyPlayers array directly
START_GAME and initial SYNC are broadcast separately
both protocol envelopes support requestId but startPlay supplies none
START_GAME does not carry a roster revision, roster fingerprint, runSessionId or commit state
SYNC does not carry a startTransactionId or admitted-roster fingerprint
client START_GAME handling does not enter PLAYING
client SYNC handling enters PLAYING even without proving a matching START_GAME
no start rollback exists if bootstrap or one publication fails
no deterministic lobby-start transaction fixture exists
```

## Main finding

The queue-head defect is a split start commit. No immutable authority row proves that the roster admitted by policy is the roster bootstrapped into the game, or that the `START_GAME` and `SYNC` observed by a client belong to the same committed run.

## Required authority boundary

```txt
ReadyCommand
  -> host membership and connection admission
  -> idempotent ready result
  -> monotonic roster revision and fingerprint
  -> authoritative lobby publication

StartRunRequest
  -> host/room/phase/revision admission
  -> connected-ready-real-participant policy
  -> seal roster revision and fingerprint
  -> create startTransactionId and runSessionId
  -> phase = starting
  -> stage deterministic bootstrap
  -> stage START_GAME and initial SYNC with shared correlation
  -> commit active state once
  -> publish one committed start receipt
  -> rollback to lobby on failure
```

## Candidate kits

- **lobby-ready-command-kit**: actor identity, desired ready state, room id, roster revision, request id
- **lobby-ready-admission-kit**: membership check, connection check, sender binding, stale revision rejection, idempotent result
- **lobby-roster-revision-kit**: monotonic roster revision, stable roster fingerprint, sealed admitted roster
- **start-run-request-kit**: host identity, room id, expected phase, expected roster revision, request id
- **start-run-admission-kit**: host authority, phase check, participant policy, readiness policy, placeholder rejection
- **start-transaction-kit**: startTransactionId, starting phase, bootstrap staging, commit or rollback
- **start-sync-correlation-kit**: shared transaction id, roster fingerprint, run session id, START_GAME/SYNC correlation
- **lobby-command-result-kit**: accepted, rejected, no-change, stable reason, before/after revision
- **lobby-authority-ledger-kit**: bounded command/result rows, roster revisions, start attempts, rejection counters
- **lobby-start-fixture-kit**: ready propagation, duplicate start, bootstrap failure rollback, message ordering

## Ordered safe ledges

```txt
1. Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
2. Run Exit Commit + Session Epoch Message Admission Fixture Gate
3. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
4. Host Movement Admission + Client Reconciliation Fixture Gate
5. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T11-39-11-04-00`

## Status

```txt
status: lobby-start-transaction-correlation-authority-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-11T11-39-11-04-00-horror-corridor-lobby-start-transaction.md
```

## Product interaction loop

```txt
title
  -> solo, host or client admission
  -> room, roster, identity and connection projection
  -> host or client lobby action
  -> host async loading and deterministic bootstrap
  -> local host active-state commit
  -> independent START_GAME and SYNC broadcasts
  -> client applies messages independently
  -> client enters PLAYING from SYNC
  -> GameCanvas mounts, simulates and renders
```

## Lobby start authority loop

```txt
LobbyScreen primary click
  -> no disabled state or typed command
  -> host checks only mode and non-null room
  -> loading yields across frames and timers
  -> room, roster and connection can change
  -> no revision revalidation
  -> bootstrap uses captured room and lobbyPlayers
  -> host commits locally before publication
  -> START_GAME broadcast result ignored
  -> SYNC broadcast result ignored
  -> client has no correlated transaction admission
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion and settings projection
session mode peer identity room roster connection and reset
lobby member identity peer binding reserved slots and readiness
lobby start command admission roster seal and bootstrap planning
start transaction run session epoch commit publication acknowledgement and retry
runtime readiness provider ownership and generation fencing
PeerJS host/client transport and BroadcastChannel bridge
connection registry event bus and transport actor binding
versioned protocol envelopes serializers and message construction
seeded maze room player cube anomaly and ooze bootstrap
replicated snapshot construction publication acceptance and replay
pointer lock keyboard mouse blur and input lifecycle
movement collision camera prediction and host admission
cube interaction held-cube synchronization ordered anomaly and victory
ooze cadence decay spawn spacing and capacity
Three.js world players minimap HUD bloom and first-frame projection
RAF resize canvas resources debug cleanup validation and deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** routing, solo/host/client entry, loading, pause, completion, lobby return and title exit.
- **corridor-session-domain-kit:** session mode, peer identity, room, roster, connection status and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, view angles, input, readiness and reset.
- **ui-pause-projection-kit:** pause state, reason and overlay projection.
- **lobby-screen-presentation-kit:** room metadata, phase, roster, readiness badges, controls and connection status.
- **peer-host-transport-kit:** host peer, connection registry, broadcast, targeted send, local bridge and destroy.
- **peer-client-transport-kit:** host connection, send, local bridge, status, disconnect and destroy.
- **peer-event-bus-kit:** typed events, subscribe, unsubscribe and clear.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encode/decode, version checks and structural shape admission.
- **maze-snapshot-bootstrap-kit:** deterministic seed, maze, players, cubes, anomaly, room and initial snapshot.
- **first-person-input-kit:** keyboard state, pointer lock, look accumulation and input snapshot.
- **movement-collision-camera-kit:** movement, maze collision, eye position, walk shake and camera.
- **network-player-update-kit:** client send, host consume, pose projection and cadence.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered validation, rollback and victory.
- **ooze-trail-domain-kit:** cadence, decay, spawn, spacing and capacity.
- **corridor-authoritative-publication-kit:** snapshot tick, clone, SYNC, broadcast and reason.
- **corridor-animation-loop-kit:** RAF start, stop, delta and running guard.
- **corridor-render-world-kit:** terrain, maze, cubes, players, anomaly, ooze, props, lights, update and dispose.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and dispose.
- **corridor-minimap-kit:** maze, players, cubes and anomaly markers.
- **runtime-debug-frame-kit:** bounded frames/events, overlay preferences and JSON-safe export.
- **runtime-resource-cleanup-kit:** RAF, subscription, observer, listeners, world, composer, renderer and canvas cleanup.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object review and live-player validation.

## Source findings

```txt
LobbyScreen primary action is always enabled
client primary label says Enter run but invokes toggleReady
host start does not require connected transport
host start does not validate all-ready policy
host start does not seal room or roster revision
loading yields through five frames and five timers
session and roster events can mutate stores during loading
startPlay does not revalidate after loading
bootstrap consumes captured room and lobbyPlayers values
host room/snapshot/UI/readiness commit occurs before broadcasts
broadcast recipient counts are discarded
START_GAME and SYNC use no mandatory shared transaction identity
START_GAME alone does not enter PLAYING
SYNC alone enters PLAYING without correlated START_GAME admission
client acknowledgement, retry and duplicate policy are absent
start messages have no run session or epoch
first rendered frame carries no start transaction identity
```

## Main finding

The current code performs a local host transition plus best-effort publications, not a distributed lobby-start transaction. A roster or connection change during loading can make bootstrap stale, and host/client peers can enter different half-commit states because START_GAME and SYNC are not application-atomically correlated.

## Candidate kits

```txt
lobby-start-command-kit
lobby-start-admission-policy-kit
lobby-start-roster-seal-kit
lobby-start-transaction-id-kit
run-session-identity-kit
run-session-epoch-kit
lobby-start-bootstrap-plan-kit
lobby-start-commit-kit
lobby-start-publication-bundle-kit
lobby-start-client-admission-kit
lobby-start-acknowledgement-kit
lobby-start-retry-and-dedupe-kit
lobby-start-result-kit
lobby-start-transition-journal-kit
lobby-start-debug-projection-kit
lobby-start-fixture-kit
```

## Required guarantees

```txt
only admitted host actor can start
transport and room must be in an allowed state
required members must be connected and ready
one immutable roster revision and fingerprint feeds bootstrap
loading-time mutations invalidate the start plan
one startTransactionId binds publication and acknowledgement
one runSessionId and epoch bind all initial messages and frames
START_GAME or SYNC alone cannot commit gameplay
host records zero, partial or full publication results
clients commit exactly once and acknowledge semantically
retries preserve transaction identity
duplicates return no-change
old-epoch start messages are rejected before store mutation
first frame proves accepted start, run and epoch identity
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Transport Actor Binding + Sender/Payload Admission Fixture Gate
3. Lobby Start Transaction Authority + Correlated START_GAME/SYNC/Ack Fixture Gate
4. Run Exit Commit + Session Epoch Message Admission Fixture Gate
4a. Runtime Readiness Lease + Generation-Fenced Cleanup Fixture Gate
5. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
6. Host Movement Admission + Client Reconciliation Fixture Gate
7. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

Documentation only. This pass changed no runtime source, dependency, package script, network behavior, rendering or deployment configuration.

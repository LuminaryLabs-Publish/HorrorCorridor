# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T07-30-40-04-00`

## Status

```txt
status: transport-actor-binding-message-admission-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending current-run synchronization
```

## Product interaction loop

```txt
title
  -> solo, host or client lobby
  -> deterministic room and maze bootstrap
  -> GameCanvas initializes input, transport listener, simulation and rendering
  -> client predicts movement and sends PLAYER_UPDATE
  -> client sends TRY_INTERACT for cube/anomaly actions
  -> host consumes inbound peer messages
  -> host mutates gameplay state
  -> host publishes authoritative SYNC
  -> clients replay snapshots
  -> world, minimap, HUD and debug project the state
```

## Actor-identity loop

```txt
transport event identifies remotePeerId + connectionId
  -> protocol envelope claims senderId + roomId
  -> payload claims playerId
  -> structural decoder checks field shapes
  -> host dispatch checks message type only
  -> payload.playerId selects movement or interaction actor
  -> host publishes the resulting state
```

## Domains in use

```txt
application shell and screen routing
UI overlay pause completion and settings projection
session mode peer identity room roster readiness and connection state
lobby member identity peer binding slot reservation and bootstrap admission
lobby readiness and start transaction
PeerJS host/client transport
BroadcastChannel local transport bridge
peer event bus and connection registry
transport connection identity and actor binding
versioned protocol envelopes serializers and message construction
inbound room session actor request and sequence admission
seeded maze room player cube anomaly and ooze bootstrap
replicated app room and gameplay state
pointer lock keyboard mouse blur and input lifecycle
movement integration collision camera and client prediction
host movement and interaction command application
cube pickup drop placement removal and held-cube synchronization
ordered anomaly validation rollback and victory
ooze cadence decay spawn spacing and capacity
authoritative snapshot construction publication and replay
Three.js world player avatar minimap HUD bloom and completion projection
animation loop resize canvas and frame ownership
runtime debug observation and JSON-safe export
resource cleanup validation and Next.js deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** routing, solo/host/client entry, loading, pause, completion and exit.
- **corridor-session-domain-kit:** session mode, peer identity, room, roster, connection status and reset.
- **runtime-store-snapshot-kit:** snapshot, local pose, view angles, input flags, readiness and reset.
- **ui-pause-projection-kit:** pause state, reason and overlay projection.
- **lobby-screen-presentation-kit:** room metadata, roster, readiness badges and controls.
- **peer-host-transport-kit:** host peer, connection registry, broadcast, targeted send, bridge and destroy.
- **peer-client-transport-kit:** host connection, send, bridge, status, disconnect and destroy.
- **peer-event-bus-kit:** typed transport events, subscriptions and cleanup.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encoding, structural decoding and version/shape checks.
- **maze-snapshot-bootstrap-kit:** deterministic maze, players, cubes, anomaly, room and snapshot.
- **first-person-input-kit:** keyboard state, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit:** movement, collision, eye position, shake and camera.
- **network-player-update-kit:** client update send, host update consume, pose projection and cadence.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered validation, rollback and victory.
- **ooze-trail-domain-kit:** cadence, decay, spawn, spacing and capacity.
- **corridor-authoritative-publication-kit:** snapshot tick, cloning, SYNC broadcast and reasons.
- **corridor-animation-loop-kit:** RAF lifecycle and delta calculation.
- **corridor-render-world-kit:** terrain, maze, cubes, players, anomaly, ooze, props, lights and disposal.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and disposal.
- **corridor-minimap-kit:** maze, player, cube and anomaly markers.
- **runtime-debug-frame-kit:** bounded frames/events, overlay preferences and JSON-safe export.
- **runtime-resource-cleanup-kit:** RAF, subscription, observer, listener, world, composer, renderer and canvas cleanup.
- **package-validation-kit:** build, lint, ProtoKit, harness, visual, object-kit and live-player checks.

## Source findings

```txt
PeerTransportEvent includes remotePeerId and connectionId
ProtocolEnvelope independently includes senderId and roomId
PLAYER_UPDATE and TRY_INTERACT independently include payload.playerId
serializer validation is structural rather than actor-semantic
host GameCanvas ignores remotePeerId connectionId senderId roomId requestId and sequence
applyNetworkPlayerUpdate changes any existing player selected by payload.playerId
applyNetworkInteractionRequest acts for any supplied playerId
accepted mutations are immediately published as authoritative snapshots
rejected actor claims have no typed result or bounded ledger row
```

## Main finding

Transport provenance is available but discarded before host command admission. The host cannot prove that the sending connection owns the envelope sender or payload player identity.

A stale, drifting or crafted message can therefore target another player, move held cubes or perform an interaction under another identity, after which normal SYNC publication and render projection make the result appear authoritative.

## Candidate kits

```txt
transport-connection-identity-kit
peer-player-binding-kit
inbound-envelope-preflight-kit
room-session-admission-kit
actor-claim-resolution-kit
sender-payload-consistency-kit
connection-sequence-ledger-kit
request-deduplication-kit
message-admission-result-kit
host-command-dispatch-kit
rejected-message-observation-kit
transport-identity-fixture-kit
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Transport Actor Binding + Sender/Payload Admission Fixture Gate
3. Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
4. Run Exit Commit + Session Epoch Message Admission Fixture Gate
5. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
6. Host Movement Admission + Client Reconciliation Fixture Gate
7. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

Documentation only. This pass changed no runtime source, dependency, package script, network behavior, rendering or deployment configuration.
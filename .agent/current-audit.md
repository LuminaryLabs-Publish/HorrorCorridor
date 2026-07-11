# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T05-28-29-04-00`

## Status

```txt
status: lobby-roster-identity-peer-binding-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-11T05-28-29-04-00-horror-corridor-roster-identity-peer-binding.md
```

## Product and interaction loop

```txt
title
  -> solo, host or client lobby
  -> room and roster projection
  -> host may add synthetic guest rows
  -> client ready mutation remains local
  -> peer open/close mutates roster by exact peer id
  -> start passes the live roster into deterministic bootstrap
  -> every roster row becomes a gameplay player
  -> START_GAME and initial SYNC publish separately
  -> movement, cube interaction, anomaly objective and ooze pressure
  -> world, minimap, HUD and debug projection
```

## Roster-identity loop

```txt
Add guest
  -> makePlayer(random guest-player id, non-host, unready)
  -> default connectionState=connected
  -> no peer binding or reserved-slot marker

peer connection open
  -> exact remotePeerId lookup misses the placeholder
  -> creates a second guest row for the real peer

start run
  -> createInitialGameState(players: lobbyPlayers)
  -> every row becomes an active player
  -> placeholder reaches snapshot, avatar and minimap projection
```

## Domains in use

```txt
application shell and screen routing
UI overlay, pause, completion and settings projection
session mode, peer identity, room, roster, readiness and connection state
lobby member identity, peer binding and reserved-slot policy
lobby presentation, ready controls and start controls
PeerJS host/client transport and BroadcastChannel bridge
peer event bus and connection-status projection
versioned protocol envelopes and message construction
roster command admission, revision and fingerprint authority
lobby start transaction and START_GAME/SYNC correlation
seeded maze, cube, anomaly, room, roster and player bootstrap
room phase and replicated app/game state
pointer lock, keyboard, mouse, blur and input lifecycle
movement, collision, camera, client prediction and player updates
cube interaction, ordered anomaly completion and ooze pressure
authoritative snapshot publication and client replay
Three.js world, player avatars, minimap, HUD and bloom
runtime debug, resource cleanup, package validation and deployment
```

## Implemented kits and services

- **corridor-application-shell-kit**: routing, run entry, pause, completion and exits.
- **corridor-session-domain-kit**: session mode, peer identity, room, roster, status and reset.
- **runtime-store-snapshot-kit**: snapshot, local pose, input/readiness and reset.
- **ui-pause-projection-kit**: pause state and overlay projection.
- **lobby-screen-presentation-kit**: room metadata, roster rows, ready badges and actions.
- **peer-host-transport-kit**: host peer, connections, broadcast, send and destroy.
- **peer-client-transport-kit**: host connection, send, bridge, status and destroy.
- **peer-event-bus-kit**: transport events, subscriptions and cleanup.
- **protocol-message-construction-kit**: versioned START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **maze-snapshot-bootstrap-kit**: deterministic maze, players, cubes, anomaly, room and snapshot.
- **first-person-input-kit**: keyboard, pointer lock, look and input snapshots.
- **movement-collision-camera-kit**: movement, collision, eye position, shake and camera.
- **network-player-update-kit**: client send, host consume, pose projection and cadence.
- **corridor-interaction-domain-kit**: pickup, drop, place, remove and held-cube sync.
- **ordered-anomaly-sequence-kit**: ordered validation, rollback and victory.
- **ooze-trail-domain-kit**: cadence, decay, spawn, spacing and capacity.
- **corridor-authoritative-publication-kit**: snapshot ticks, full sync and reasons.
- **corridor-animation-loop-kit**: RAF lifecycle and delta calculation.
- **corridor-render-world-kit**: world, player avatars, updates and disposal.
- **corridor-post-processing-kit**: composer, bloom, output, resize and disposal.
- **corridor-minimap-kit**: maze, player, cube and anomaly markers.
- **runtime-debug-frame-kit**: bounded frames/events and JSON-safe export.
- **runtime-resource-cleanup-kit**: transport, listeners, world, renderer and canvas cleanup.
- **package-validation-kit**: build, lint, ProtoKit, harness, visual and live-player checks.

## Source findings

```txt
LobbyPlayer has no member kind, peerId, slotId or bootstrap-admission field
makePlayer defaults connectionState to connected
Add guest creates guest-player-* rows with no transport owner
real peer arrival creates another row instead of claiming a placeholder
peer close removes only the exact real-peer row
sessionStore has no roster revision, fingerprint or mutation result
startPlay passes mutable lobbyPlayers directly to bootstrap
bootstrap maps every row into an active gameplay player
render consumers cannot identify placeholder players
```

## Main finding

The roster being sealed is semantically ambiguous. A connected-looking placeholder can survive beside a real peer and enter gameplay as an unowned player identity. Member identity and peer binding therefore need an authority boundary before the existing lobby-start transaction gate.

## Candidate kits

```txt
lobby-member-kind-kit
lobby-peer-binding-kit
lobby-slot-reservation-kit
lobby-member-admission-kit
lobby-member-claim-kit
lobby-member-removal-kit
lobby-roster-revision-kit
lobby-roster-fingerprint-kit
bootstrap-roster-filter-kit
lobby-roster-projection-kit
lobby-roster-authority-ledger-kit
lobby-roster-fixture-kit
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
3. Run Exit Commit + Session Epoch Message Admission Fixture Gate
4. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
5. Host Movement Admission + Client Reconciliation Fixture Gate
6. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

Documentation only. This pass changed no runtime source, dependency, package script, network behavior, rendering or deployment configuration.
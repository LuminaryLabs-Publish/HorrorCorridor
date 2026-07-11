# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T05-28-29-04-00`

## Status

```txt
status: lobby-roster-identity-peer-binding-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending final synchronization
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
  -> START_GAME and initial SYNC are published separately
  -> first-person movement, cube interaction, anomaly objective and ooze pressure
  -> world, minimap, HUD and debug projection
```

## Roster-identity loop

```txt
Add guest
  -> makePlayer(random guest-player id, non-host, unready)
  -> default connectionState=connected
  -> upsert into room.players and lobbyPlayers
  -> no peer binding or reserved-slot marker

peer connection open
  -> search by remotePeerId
  -> placeholder id does not match
  -> create second guest row for the real peer

start run
  -> createInitialGameState(players: lobbyPlayers)
  -> sourcePlayers.map creates one active player per row
  -> placeholder becomes a replicated avatar and minimap marker
```

## Domains in use

- application shell and screen routing
- UI overlay, pause, completion and settings projection
- session mode, peer identity, room, roster, readiness and connection state
- lobby member identity, peer binding and reserved-slot policy
- lobby presentation, ready controls and start controls
- PeerJS host/client transport and BroadcastChannel bridge
- peer event bus and connection-status projection
- versioned protocol envelopes and message construction
- roster command admission, revision and fingerprint authority
- lobby start transaction and START_GAME/SYNC correlation
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

- **corridor-application-shell-kit**: screen routing, menu orchestration, solo/host/client entry, pause/resume, completion and exit callbacks.
- **corridor-session-domain-kit**: session mode, peer identity, room, roster, connection status and session reset.
- **runtime-store-snapshot-kit**: authoritative snapshot, local pose, view angles, input flags, readiness and runtime reset.
- **ui-pause-projection-kit**: local pause state, pause reason, pause overlay and PLAYING/PAUSED projection.
- **lobby-screen-presentation-kit**: room metadata, roster projection, ready badges, primary/secondary controls and connection status.
- **peer-host-transport-kit**: host peer, connection registry, broadcast, targeted send, disconnect and destroy.
- **peer-client-transport-kit**: host connection, send, local bridge, status, disconnect and destroy.
- **peer-event-bus-kit**: typed transport events, subscribe, unsubscribe and clear.
- **protocol-message-construction-kit**: versioned START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **maze-snapshot-bootstrap-kit**: deterministic seed, maze, cubes, anomaly, active room, players and initial snapshot.
- **first-person-input-kit**: keyboard state, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit**: movement integration, local maze collision, eye position, walk shake and camera projection.
- **network-player-update-kit**: client update send, host update consume, pose projection and network cadence.
- **corridor-interaction-domain-kit**: pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit**: ordered validation, rollback, ending phase and victory.
- **ooze-trail-domain-kit**: cadence, decay, spawn, spacing guard and capacity guard.
- **corridor-authoritative-publication-kit**: snapshot tick, full sync, broadcast, publication reason and cadence accounting.
- **corridor-animation-loop-kit**: RAF start/stop, delta calculation and idempotent running state.
- **corridor-render-world-kit**: terrain, maze, cubes, players, anomaly, ooze, props, lights, attach, update and dispose.
- **corridor-post-processing-kit**: composer, bloom, output, resize, render and dispose.
- **corridor-minimap-kit**: maze projection, player markers, cube markers and anomaly markers.
- **runtime-debug-frame-kit**: bounded frames/events, overlay preferences and JSON-safe browser export.
- **runtime-resource-cleanup-kit**: RAF stop, transport unsubscribe, observer disconnect, listener removal, world/composer/renderer disposal and canvas removal.
- **package-validation-kit**: build, lint, ProtoKit smoke, harness, visual match, object-kit review and live-player validation.

## Source findings

```txt
LobbyPlayer has id, name, isHost, ready and connectionState only
no member kind, peerId, slotId, placeholder flag or bootstrap admission exists
makePlayer defaults connectionState to connected
addGuestPlaceholder creates random guest-player-* rows with no transport owner
peer-open finds members only by exact remotePeerId
real peer arrival creates a new row instead of claiming a placeholder
peer-close removes only the exact remotePeerId row
sessionStore upserts and removes by player id with no revision or result
startPlay passes mutable lobbyPlayers directly to bootstrap
createInitialGameState maps every source player into an active gameplay player
world, minimap, snapshot and diagnostics cannot distinguish placeholder players
```

## Main finding

The queue-head defect is not only readiness or start correlation. The roster being sealed is itself semantically ambiguous. A connected-looking placeholder can survive beside a real peer and enter gameplay as an unowned player identity.

A start transaction must not be implemented against this roster shape. Member identity and peer binding need their own authority boundary first.

## Required authority boundary

```txt
LobbyMemberRecord
  memberId
  memberKind: host-local | peer | reserved-slot
  peerId
  playerId
  slotId
  ready
  connectionState
  admittedForBootstrap
  joinedRevision
  lastChangedRevision

RosterAuthority
  validates host and peer mutations
  claims/releases reserved slots
  enforces unique peer and player bindings
  increments one monotonic revision
  computes one stable fingerprint
  seals admitted real members for bootstrap
  returns typed accepted/rejected/no-change results
  publishes bounded detached observations
```

## Candidate kits

- **lobby-member-kind-kit**: canonical host-local, peer and reserved-slot records.
- **lobby-peer-binding-kit**: unique peer-to-member and peer-to-player binding.
- **lobby-slot-reservation-kit**: create, release and inspect lobby-only reserved slots.
- **lobby-member-admission-kit**: actor, room, connection and semantic admission.
- **lobby-member-claim-kit**: atomic peer claim of one reserved slot.
- **lobby-member-removal-kit**: disconnect, remove and release policy.
- **lobby-roster-revision-kit**: monotonic semantic revision.
- **lobby-roster-fingerprint-kit**: stable fingerprint of canonical ordered member records.
- **bootstrap-roster-filter-kit**: immutable admitted roster and rejected-member results.
- **lobby-roster-projection-kit**: detached lobby and debug observations.
- **lobby-roster-authority-ledger-kit**: bounded command/result and revision rows.
- **lobby-roster-fixture-kit**: placeholder, claim, duplicate, disconnect and bootstrap matrices.

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
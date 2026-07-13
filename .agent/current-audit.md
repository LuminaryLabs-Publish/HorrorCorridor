# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-13T01-08-28-04-00`  
**Branch:** `main`  
**Status:** `protocol-semantic-admission-authority-audited`

## Summary

The repository retains a 29-kit browser runtime spanning application routing, sessions, lobby state, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is transport-independent protocol semantic admission. `deserializeProtocolMessage()` validates the protocol version, finite numeric primitives and broad object/array shape, but it does not enforce many TypeScript unions or cross-field invariants. Structurally valid messages can therefore contradict their own room, snapshot, actor, host or tick identities before reaching store, route, simulation and render consumers.

## Plan ledger

**Goal:** require one typed semantic-admission result before a decoded protocol candidate can mutate canonical state or presentation.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible repositories have root `.agent` state.
- [x] Select only HorrorCorridor as the oldest eligible central entry.
- [x] Read protocol message types, serializers, host/client transports and GameShell consumers.
- [x] Preserve the complete interaction loop, active domains and 29-kit service census.
- [x] Add the timestamped protocol-semantic audit family.
- [ ] Implement and prove semantic admission.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
selected central timestamp: 2026-07-12T22-44-30-04-00
```

## Complete interaction loop

```txt
browser route
  -> choose solo, host or client
  -> create room/session and optional transport

PeerJS message path
  -> receive raw data
  -> deserializeProtocolMessage()
  -> validate version and broad structural shape
  -> return ProtocolMessage without semantic relation result

local bridge path
  -> retains the earlier packet-admission gap
  -> may bypass deserializeProtocolMessage entirely

consumer path
  -> GameShell handles START_GAME, SYNC and LOBBY_EVENT
  -> GameCanvas/host consumers handle PLAYER_UPDATE and TRY_INTERACT
  -> session/runtime/UI stores mutate
  -> world, HUD, minimap, completion and overlays render successor state
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session room roster identity readiness and reset
room join-code host identity capacity and lifecycle
transport mode reachability and lifecycle
PeerJS signalling and DataConnection ownership
BroadcastChannel namespace local transport and packet admission
protocol construction serialization structural decoding and semantic admission
message identity source room actor revision and request correlation
lobby membership readiness start and bootstrap
runtime lifecycle clock cadence and frame scheduling
seeded maze topology deterministic bootstrap and snapshot construction
snapshot publication acceptance delivery and backpressure
keyboard pointer lock focus and input lifecycle
movement collision camera prediction and host admission
cube interactions anomaly sequence and ooze pressure
Three.js world post-processing render surface and disposal
HUD minimap connection status debug and visible-frame proof
validation deployment and central audit tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit: routing, solo/host/client entry, loading, pause, completion, exit
corridor-session-domain-kit: identity, room, roster, connection, readiness, reset
runtime-store-snapshot-kit: snapshot, pose, view, input flags, readiness
ui-pause-projection-kit: pause state, reason, overlay
ui-completion-projection-kit: terminal state, message, timestamp, routing
complete-screen-presentation-kit: outcome presentation, restart, title exit
lobby-screen-presentation-kit: room, roster, ready state, controls
peer-host-transport-kit: PeerJS host, BroadcastChannel bridge, connection map, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit: PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy
peer-event-bus-kit: typed transport events, subscription, cleanup
protocol-message-construction-kit: START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit: encode, decode, version and structural shape validation
maze-snapshot-bootstrap-kit: seed, maze, players, cubes, anomaly, initial snapshot
seeded-maze-rng-kit: topology, placement, target sequence
first-person-input-kit: keyboard, pointer lock, look, snapshots
movement-collision-camera-kit: movement, collision, eye pose, shake, camera
network-player-update-kit: sequence, cadence, pose envelope, host consume
corridor-interaction-domain-kit: pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit: ordered slots, validation, victory
ooze-trail-domain-kit: spawn, decay, variation, spacing, capacity, pressure
snapshot-outcome-routing-kit: snapshot state to UI outcome
corridor-authoritative-publication-kit: tick, clone, SYNC, broadcast
corridor-animation-loop-kit: RAF start/stop, delta, elapsed, successor scheduling
corridor-render-world-kit: terrain, maze, objects, actors, lights, update, disposal
corridor-post-processing-kit: composer, bloom, sizing, render, disposal
corridor-minimap-kit: maze, players, cubes, ooze, heading
runtime-debug-frame-kit: activation, bounded capture, overlay, export
runtime-resource-cleanup-kit: loop, subscriptions, listeners, observers, GPU cleanup
package-validation-kit: build, lint, harness, visual and live-player checks
```

## Source-backed findings

```txt
RoomState.phase enum enforced at runtime: no
LobbyPlayer.connectionState enum enforced: no
snapshot appState/gameState enums enforced: no
TRY_INTERACT action enum enforced: no
SYNC reason enum enforced: no
LOBBY_EVENT event enum enforced: no
optional requestId type validated: no
envelope roomId == payload room.roomId: no
payload room == snapshot.room: no
SYNC authoritativeTick == snapshot.tick: no
START_GAME maxPlayers == room.maxPlayers: no
START_GAME hostPlayer.id == room.hostId: no
LOBBY_EVENT players == room.players: no
senderId == payload playerId: no
duplicate player/cube/cell IDs rejected: no
sequence/tick/maxPlayers integer and range policy: absent
typed semantic admission result: absent
first semantically admitted frame acknowledgement: absent
```

## Concrete failure path

```txt
receive a version-1 structurally valid SYNC
  -> envelope roomId names room A
  -> payload room names room B
  -> snapshot room names room C
  -> authoritativeTick differs from snapshot.tick
  -> reason or gameState uses an undeclared string
  -> decoder returns the message
  -> consumer installs payload.room and payload.snapshot independently
  -> route/readiness and visible presentation can cite contradictory state
```

## Required parent domain

```txt
corridor-protocol-semantic-admission-authority-domain
```

## Candidate kits

```txt
protocol-candidate-id-kit
protocol-exact-enum-schema-kit
protocol-optional-field-schema-kit
protocol-numeric-range-policy-kit
protocol-collection-invariant-kit
protocol-unique-identity-kit
protocol-envelope-payload-relation-kit
protocol-room-snapshot-consistency-kit
protocol-actor-source-binding-kit
protocol-tick-revision-consistency-kit
protocol-semantic-admission-result-kit
protocol-canonicalization-kit
protocol-rejection-observation-kit
protocol-admission-journal-kit
first-protocol-admitted-frame-ack-kit
message-enum-rejection-fixture-kit
room-identity-mismatch-fixture-kit
snapshot-room-mismatch-fixture-kit
tick-mismatch-fixture-kit
duplicate-identity-fixture-kit
peerjs-local-bridge-semantic-parity-fixture-kit
```

## Required transaction

```txt
ProtocolMessageCandidate
  -> structural decode
  -> exact enum, optional-field, range and collection checks
  -> envelope/room/snapshot/actor/tick relation checks
  -> source, room generation and expected-revision admission
  -> Accepted or typed rejection
  -> one canonical atomic effect or zero mutation
  -> bounded observation and journal
  -> first visible frame acknowledgement
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, package-script, dependency or deployment behavior changed.
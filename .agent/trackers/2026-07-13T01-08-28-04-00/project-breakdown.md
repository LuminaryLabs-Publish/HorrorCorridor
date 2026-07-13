# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-13T01-08-28-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `protocol-semantic-admission-authority-audited`

## Summary

HorrorCorridor was selected as the oldest eligible synchronized Publish repository. The protocol decoder validates JSON shape, protocol version and finite numeric primitives, but it does not validate declared enum values or relationships between the envelope, room, snapshot, actor and tick fields. Structurally valid but semantically contradictory messages can therefore pass decoding and reach store, route and renderer consumers.

## Plan ledger

**Goal:** define one transport-independent semantic-admission boundary so every decoded protocol message is internally consistent, identity-bound, range-safe and committed through a typed result before it can mutate lobby, runtime or visible state.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor`, the oldest eligible central entry.
- [x] Inspect protocol types, serializers, host/client transport and GameShell consumers.
- [x] Preserve the complete interaction loop, active domains and all 29 implemented kits and services.
- [x] Add architecture, render, gameplay, interaction, protocol-semantic and deploy audits.
- [x] Refresh required root `.agent` files and machine registry.
- [ ] Implement semantic admission and executable message fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-12T22-44-30-04-00 selected
ZombieOrchard      2026-07-12T23-00-53-04-00
MyCozyIsland       2026-07-12T23-08-37-04-00
TheUnmappedHouse   2026-07-12T23-20-51-04-00
AetherVale         2026-07-12T23-40-11-04-00
TheOpenAbove       2026-07-13T00-00-02-04-00
IntoTheMeadow      2026-07-13T00-18-48-04-00
PhantomCommand     2026-07-13T00-40-00-04-00
PrehistoricRush    2026-07-13T00-58-50-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
solo, host or client route
  -> construct room/session and optional transport
  -> PeerJS data path calls deserializeProtocolMessage()
  -> decoder checks envelope version, primitive types and broad object shapes
  -> decoder returns ProtocolMessage without semantic relation checks
  -> GameShell consumes START_GAME, SYNC and LOBBY_EVENT
  -> GameCanvas/host consumers process PLAYER_UPDATE and TRY_INTERACT
  -> Zustand room, roster, snapshot, readiness and UI routes mutate
  -> Three.js world, HUD, minimap, completion and overlays render successor state

local BroadcastChannel path
  -> retains the earlier packet-admission gap and can bypass the decoder entirely
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session room roster identity readiness and reset
room join-code host identity capacity and lifecycle
PeerJS signalling and DataConnection ownership
BroadcastChannel namespace local transport and packet admission
protocol envelope construction serialization structural decoding and semantic admission
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
protocol-serialization-kit: encode, decode, protocol version and structural shape validation
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
RoomState.phase allowed enum enforced at runtime: no
LobbyPlayer.connectionState allowed enum enforced: no
snapshot appState/gameState enums enforced: no
TRY_INTERACT action enum enforced: no
SYNC reason enum enforced: no
optional requestId type validated: no
message roomId == payload room.roomId: not checked
payload room == snapshot.room: not checked
SYNC authoritativeTick == snapshot.tick: not checked
START_GAME maxPlayers == room.maxPlayers: not checked
START_GAME hostPlayer.id == room.hostId: not checked
LOBBY_EVENT players == room.players: not checked
senderId == payload playerId where required: not checked
duplicate player/cube/cell IDs rejected: no
sequence/tick/maxPlayers integer and range policy: absent
semantic admission result or rejection journal: absent
first semantically admitted visible frame acknowledgement: absent
```

## Concrete failure path

```txt
receive a version-1 SYNC with finite numbers and structurally valid arrays
  -> envelope roomId names room A
  -> payload room names room B
  -> snapshot.room names room C
  -> authoritativeTick differs from snapshot.tick
  -> gameState or reason contains an undeclared string
  -> deserializeProtocolMessage returns the message
  -> GameShell installs payload.room and payload.snapshot independently
  -> route/readiness and visible world can cite contradictory message state
```

## Required parent domain

```txt
corridor-protocol-semantic-admission-authority-domain
```

## Required transaction

```txt
ProtocolMessageCandidate
  -> parse and structurally decode
  -> validate exact enum domains and optional-field types
  -> validate integer/range and collection invariants
  -> validate envelope, room, snapshot, actor, host and tick relations
  -> validate unique IDs and canonical roster/snapshot membership
  -> bind source connection, room generation and expected revision
  -> return Accepted, InvalidSchema, InvalidSemantic, Stale, Duplicate, Unauthorized or Failed
  -> commit one canonical message effect or zero mutation
  -> publish bounded rejection/acceptance observation
  -> acknowledge the first visible frame citing the admission result
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

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, package scripts, dependencies and deployment were not changed. No semantic rejection, canonicalization, cross-field integrity or visible-frame claim is made until executable fixtures pass on `main`.
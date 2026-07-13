# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T22-29-30-04-00`  
**Branch:** `main`  
**Status:** `lobby-capacity-admission-authority-audited`

## Summary

The repository retains a 29-kit browser runtime spanning application routing, sessions, lobby state, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is lobby-capacity admission. Rooms declare `maxPlayers: 4`, yet remote connection events, local bridge connection packets, host-created placeholders and direct store mutations can all extend the roster without consulting that limit. Protocol validation accepts any structurally valid player-array length, and run bootstrap maps every supplied lobby member into gameplay state.

## Plan ledger

**Goal:** admit every lobby member through one room-revision and slot-reservation authority before the member can affect the roster, bootstrap, protocol publications or visible frames.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible repositories have root `.agent` state.
- [x] Select only HorrorCorridor as the oldest eligible central entry.
- [x] Read room creation, transport admission, session store, lobby UI, protocol validation and run bootstrap source.
- [x] Preserve the complete interaction loop, active domains and 29-kit service census.
- [x] Add the timestamped lobby-capacity audit family.
- [ ] Implement and prove capacity authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
selected central timestamp: 2026-07-12T20-20-02-04-00
```

## Complete interaction loop

```txt
browser route
  -> choose solo, host or client

host setup
  -> create room with maxPlayers = 4
  -> install PeerJS and/or local bridge transport
  -> display host lobby and Add guest control

member intake
  -> remote connection-open or local client-connect arrives
  -> GameShell creates or updates a connected guest
  -> sessionStore upserts the player without capacity admission
  -> host may also append arbitrary placeholder guests
  -> lobby displays players.length without full-state semantics

run start
  -> host presses Start run
  -> bootstrap receives complete lobbyPlayers array
  -> createInitialGameState maps every source player into gameplay actors
  -> active room still reports maxPlayers = 4
  -> START_GAME and SYNC publish the over-capacity roster
  -> Three.js world, HUD and minimap render successor state
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session room roster identity readiness and reset
room join-code host identity and declared capacity
lobby member candidate reservation admission and retirement
transport mode reachability and lifecycle
PeerJS signalling and DataConnection ownership
BroadcastChannel namespace and local transport
local packet schema capability generation and sequencing
connection lease actor binding and retirement
protocol construction serialization source admission and deduplication
lobby membership readiness start and bootstrap
runtime lifecycle clock cadence and frame scheduling
seeded maze topology and deterministic bootstrap
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
protocol-serialization-kit: encode, decode, version, structural shape validation
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
package-validation-kit: build, lint, harness, visual, live-player checks
```

## Source-backed findings

```txt
room declaration maxPlayers: 4
GameShell host connection-open admission checks maxPlayers: no
createHost PeerJS candidate map checks capacity: no
createHost local client-connect checks capacity: no
host Add guest control disabled at capacity: no
addGuestPlaceholder checks capacity: no
sessionStore setLobbyPlayers checks capacity: no
sessionStore upsertLobbyPlayer checks capacity: no
protocol isRoomState checks players.length <= maxPlayers: no
createInitialGameState checks sourcePlayers length: no
bootstrap copies all sourcePlayers into room and actor snapshots: yes
lobby displays players.length / maxPlayers: no
capacity revision or reservation identity: no
first capacity-consistent visible frame acknowledgement: no
```

## Concrete failure path

```txt
room declares maxPlayers = 4
  -> host receives more unique connection-open events or presses Add guest repeatedly
  -> each member is appended to lobbyPlayers and room.players
  -> visible player count exceeds four
  -> host starts run
  -> createInitialGameState maps every supplied player
  -> active room still advertises maxPlayers = 4
  -> START_GAME and SYNC distribute the contradictory state
  -> clients can render an over-capacity roster and actor set
```

## Required parent domain

```txt
corridor-lobby-capacity-admission-authority-domain
```

## Candidate kits

```txt
room-capacity-policy-kit
lobby-slot-id-kit
lobby-slot-reservation-kit
lobby-member-candidate-kit
lobby-member-source-classification-kit
lobby-capacity-revision-kit
lobby-capacity-fingerprint-kit
lobby-member-identity-uniqueness-kit
lobby-connection-lease-capacity-kit
placeholder-member-admission-kit
lobby-capacity-result-kit
lobby-roster-commit-kit
lobby-slot-release-kit
lobby-capacity-rejection-observation-kit
lobby-capacity-journal-kit
bootstrap-roster-capacity-gate-kit
protocol-room-capacity-validation-kit
first-capacity-consistent-frame-ack-kit
remote-fifth-player-fixture-kit
local-bridge-fifth-player-fixture-kit
placeholder-capacity-fixture-kit
duplicate-member-no-capacity-consumption-fixture-kit
reservation-cancel-release-fixture-kit
over-capacity-protocol-rejection-fixture-kit
capacity-valid-bootstrap-fixture-kit
```

## Required transaction

```txt
LobbyMemberAdmissionCommand
  -> bind room ID, room generation and expected roster revision
  -> classify remote connection, local bridge, placeholder, restore or migration source
  -> validate candidate identity and transport ownership
  -> reserve one slot against the current capacity revision
  -> reject Full, Duplicate, Stale or Invalid with zero roster mutation
  -> commit one canonical member and successor roster revision
  -> consume or release the reservation exactly once
  -> publish capacity count, remaining slots and fingerprint
  -> allow start sealing only when players.length <= maxPlayers
  -> reject over-capacity protocol room/snapshot payloads
  -> acknowledge the first visible frame citing the committed revision
```

## Invariants

```txt
0 <= committed player count <= maxPlayers
one canonical member consumes at most one slot
candidate and placeholder paths use the same admission authority
rejected or cancelled requests consume no durable slot
room.players and lobbyPlayers share one roster revision
bootstrap cannot admit an invalid roster
protocol decode cannot accept players.length > maxPlayers
visible player count cites the same capacity revision as the roster
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, package-script, dependency or deployment behavior changed.

# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T16-29-56-04-00`  
**Branch:** `main`  
**Status:** `authoritative-message-source-admission-authority-audited`

## Summary

The repository retains a 29-kit browser runtime spanning application routing, session and lobby state, PeerJS transport, a same-origin BroadcastChannel bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is authoritative message-source admission. `peer/message` contains `remotePeerId`, `connectionId` and a decoded protocol message. The protocol envelope contains `senderId`, `roomId`, timestamp and payload. The serializer validates version and structural shape. `GameShell` then accepts `START_GAME`, `SYNC` and `LOBBY_EVENT` by message type alone and replaces client room, roster, snapshot, route, status and readiness without validating the current host peer, sender binding, active room, connection generation, session epoch or authority revision.

## Plan ledger

**Goal:** make every host-class message source-bound, room-bound, generation-bound, monotonic and reducible to one typed admission result before client state or presentation can change.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible root `.agent` entrypoints.
- [x] Select only `HorrorCorridor` as the oldest eligible central-ledger entry.
- [x] Read current root audit state, transport events, protocol message types, serializers and client consumers.
- [x] Trace host-class messages into room, roster, snapshot, route and readiness mutations.
- [x] Identify the interaction loop, domains, all 29 kits and services.
- [x] Define message-source admission authority and fixtures.
- [x] Refresh root documentation and registry on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable adversarial fixtures remain future work.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized root audit state: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
selection reason: oldest eligible central timestamp, 2026-07-12T14-30-36-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser route
  -> choose solo, host or client

transport setup
  -> host or client creates PeerJS or local-bridge transport
  -> admitted connection emits peer/message
  -> event carries remotePeerId and connectionId

protocol decode
  -> validate protocol version and structural payload shape
  -> decoded message carries senderId, roomId, timestamp and payload

client authoritative-message consumption
  -> GameShell checks only message.type
  -> START_GAME replaces room, players, host identity and connection status
  -> SYNC replaces room, players, authoritative snapshot, route and readiness
  -> LOBBY_EVENT replaces room, players and status

presentation
  -> LobbyScreen, HUDOverlay and GameCanvas consume successor stores
  -> visible state has no accepted-source or authority-revision receipt
```

## Domains in use

```txt
application shell and screen routing
UI loading, pause, completion, settings and terminal projection
session mode, peer identity, room, roster, readiness and reset
lobby identity, actor binding, readiness, start and bootstrap
loading-step orchestration and transition generations
runtime startup, readiness, frame lifecycle, failure containment and cleanup
browser clocks, cadence, simulation time and clock generations
transport capability observation and mode selection
BroadcastChannel local bridge
PeerJS signalling and DataConnection transport
connection candidate, open, error, close, supersession and retirement
transport-error identity, scope, classification and policy
connection-to-actor binding and lobby-member reconciliation
room-roster revision, fingerprint and start eligibility
protocol envelopes, serialization, structural validation and sequencing
authoritative message class, source identity, host capability and room admission
session epoch, connection generation and authority revision
seeded maze topology, cube placement, target sequence and random streams
snapshot construction, publication, acceptance, delivery and backpressure
keyboard, mouse, pointer lock, focus, visibility and input lifecycle
movement, collision, camera, prediction and host admission
cube interactions, slot claims, anomaly sequence and ooze pressure
Three.js world, camera, post-processing, bloom and disposal
render-surface sizing, presentation policy and frame correlation
HUD, minimap, connection status and debug projection
validation, build, deployment and central audit tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion and exit
corridor-session-domain-kit            identity, room, roster, connection, readiness and reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, reason and overlay
ui-completion-projection-kit           terminal state, message, timestamp and routing
complete-screen-presentation-kit       outcome presentation, restart and title exit
lobby-screen-presentation-kit          room, roster, ready state and controls
peer-host-transport-kit                PeerJS host, local bridge, connection map, broadcast, targeted send, disconnect and destroy
peer-client-transport-kit              PeerJS client, local bridge, connect, send, status, disconnect and destroy
peer-event-bus-kit                     typed transport events, subscription and cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT
protocol-serialization-kit             encode, decode, version and structural shape validation
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly and initial snapshot
seeded-maze-rng-kit                    topology, placement and target sequence
first-person-input-kit                 keyboard, pointer lock, look and snapshots
movement-collision-camera-kit          movement, collision, eye pose, shake and camera
network-player-update-kit              sequence, cadence, pose envelope and host consume
corridor-interaction-domain-kit        pickup, drop, place, remove and held-cube synchronization
ordered-anomaly-sequence-kit           ordered slots, validation and victory
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           snapshot state to UI outcome
corridor-authoritative-publication-kit tick, clone, SYNC and broadcast
corridor-animation-loop-kit            RAF start/stop, delta, elapsed and successor scheduling
corridor-render-world-kit              terrain, maze, objects, actors, lights, update and disposal
corridor-post-processing-kit           composer, bloom, sizing, render and disposal
corridor-minimap-kit                   maze, players, cubes, ooze and heading
runtime-debug-frame-kit                activation, bounded capture, overlay and export
runtime-resource-cleanup-kit           loop, subscriptions, listeners, observers and GPU cleanup
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Source-backed findings

### Transport event source evidence

```txt
peer/message includes remotePeerId: yes
peer/message includes connectionId: yes
peer/message includes role: yes
peer/message includes decoded message: yes
connection generation included: no
session epoch included: no
transport revision included: no
```

### Protocol structural evidence

```txt
envelope includes senderId: yes
envelope includes roomId: yes
envelope includes timestampMs: yes
optional requestId: yes
serializer checks protocol version and payload shape: yes
serializer checks sender-to-peer binding: no
serializer checks active room: no
serializer checks current host authority: no
```

### Client consumer admission

```txt
START_GAME checks event.remotePeerId against expected host: no
START_GAME checks message.senderId against host player: no
START_GAME checks active room: no
SYNC checks current host source: no
SYNC checks connection generation: no
SYNC checks session epoch: no
LOBBY_EVENT checks host source or active room: no
authority revision is monotonic: no
duplicate host message result exists: no
wrong-source rejection performs typed zero-mutation result: no
first authoritative-message visible-frame acknowledgement exists: no
```

## Concrete failure paths

```txt
non-host forged START_GAME
  -> client replaces room and players
  -> client changes host peer identity
  -> client reports connected

non-host forged SYNC
  -> client replaces authoritative snapshot
  -> attacker-selected gameState can route client to playing, paused or victory
  -> readiness becomes true

wrong-room LOBBY_EVENT
  -> client replaces active room and visible roster

late predecessor message after reconnect
  -> connection generation is not compared
  -> stale predecessor can mutate successor session
```

## Required parent domain

```txt
corridor-authoritative-message-source-admission-authority-domain
```

## Candidate kits

```txt
authoritative-message-class-kit
authoritative-message-id-kit
message-source-identity-kit
message-source-binding-kit
host-authority-capability-kit
message-room-binding-kit
session-epoch-kit
transport-mode-revision-kit
connection-generation-kit
sender-peer-consistency-kit
host-peer-consistency-kit
room-consistency-kit
host-message-admission-kit
stale-authority-message-rejection-kit
duplicate-authority-message-kit
message-authority-result-kit
authority-observation-kit
authority-journal-kit
first-authoritative-message-frame-ack-kit
forged-start-game-fixture-kit
forged-sync-fixture-kit
wrong-room-lobby-event-fixture-kit
sender-peer-mismatch-fixture-kit
stale-host-generation-fixture-kit
duplicate-authority-message-fixture-kit
```

## Required transaction

```txt
PeerMessageEnvelope
  -> classify host-only or client-originating message authority
  -> bind current session epoch and transport revision
  -> bind current connection ID and generation
  -> validate remote peer against admitted host peer
  -> validate senderId against admitted host player
  -> validate envelope and payload room identity
  -> validate monotonic authority revision and duplicate identity
  -> publish Accepted, Rejected, Stale or Duplicate result

Accepted
  -> commit one room/roster/snapshot transition
  -> publish successor fingerprint
  -> acknowledge first visible frame citing message and authority revision

Rejected, Stale or Duplicate
  -> zero state mutation
  -> publish bounded reason observation
```

## Current audit family

```txt
.agent/trackers/2026-07-12T16-29-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T16-29-56-04-00.md
.agent/architecture-audit/2026-07-12T16-29-56-04-00-authoritative-message-source-admission-dsk-map.md
.agent/render-audit/2026-07-12T16-29-56-04-00-untrusted-host-message-visible-state-gap.md
.agent/gameplay-audit/2026-07-12T16-29-56-04-00-forged-sync-client-state-replacement-loop.md
.agent/interaction-audit/2026-07-12T16-29-56-04-00-host-message-source-admission-map.md
.agent/protocol-authority-audit/2026-07-12T16-29-56-04-00-sender-peer-room-authority-contract.md
.agent/deploy-audit/2026-07-12T16-29-56-04-00-authoritative-message-source-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, package scripts, dependencies and deployment were not changed. No forged-message, wrong-room, stale-generation, duplicate-message or visible-frame fixture was run.
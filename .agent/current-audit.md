# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T16-39-35-04-00`  
**Branch:** `main`  
**Status:** `authoritative-message-source-admission-central-reconciled`

## Summary

The repository retains a 29-kit browser runtime spanning application routing, session and lobby state, PeerJS transport, a same-origin BroadcastChannel bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is authoritative message-source admission. `peer/message` contains `remotePeerId`, `connectionId` and a decoded protocol message. The envelope contains `senderId`, `roomId`, timestamp and payload. Structural decoding succeeds without proving that the source is the current host, belongs to the active room, or belongs to the current session and connection generation. `GameShell` then accepts `START_GAME`, `SYNC` and `LOBBY_EVENT` by message type and can replace client room, roster, snapshot, route, status and readiness.

## Plan ledger

**Goal:** make every host-class message source-bound, room-bound, generation-bound, monotonic and reducible to one typed admission result before client state or presentation changes.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible root `.agent` entrypoints.
- [x] Select only HorrorCorridor from repo-local audit state newer than central tracking.
- [x] Preserve the complete interaction loop, domains, all 29 kits and services.
- [x] Reconcile the message-source authority audit into a fresh timestamped family.
- [x] Refresh root documentation and machine registry.
- [x] Synchronize central ledger and internal change log on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable adversarial fixtures remain future work.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
selection reason: repo-local 2026-07-12T16-29-56-04-00 newer than central 2026-07-12T14-30-36-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser route
  -> choose solo, host or client

transport setup
  -> create PeerJS or BroadcastChannel transport
  -> admitted channel emits peer/message
  -> event carries remotePeerId, connectionId, role and decoded message

protocol decode
  -> validate protocol version and structural payload shape
  -> message carries senderId, roomId, timestamp and payload

client host-class consumption
  -> GameShell branches on START_GAME, SYNC or LOBBY_EVENT
  -> no contextual source or generation admission occurs
  -> room, roster, snapshot, route, status and readiness can be replaced

presentation
  -> LobbyScreen, HUDOverlay, GameCanvas and minimap consume successor stores
  -> no accepted-source or authority-revision receipt reaches the visible frame
```

## Domains in use

```txt
application shell and screen routing
UI loading, pause, completion, settings and terminal projection
session identity, room, roster, readiness and reset
lobby identity, actor binding, readiness, start and bootstrap
loading transition and runtime lifecycle
browser clocks, cadence and simulation time
transport capability, mode selection and local bridge
PeerJS signalling and DataConnection ownership
connection admission, error retirement, supersession and quarantine
protocol construction, serialization, sequencing and authority classes
host-source, sender, room, session and generation admission
seeded maze topology and deterministic bootstrap
snapshot publication, acceptance, delivery and backpressure
keyboard, pointer lock, focus and input lifecycle
movement, collision, camera, prediction and host admission
cube interactions, ordered anomaly sequence and ooze pressure
Three.js world, post-processing, render surfaces and disposal
HUD, minimap, connection status and debug projection
validation, deployment and central audit tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion, exit
corridor-session-domain-kit            identity, room, roster, connection, readiness, reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags, readiness
ui-pause-projection-kit                pause state, reason, overlay
ui-completion-projection-kit           terminal state, message, timestamp, routing
complete-screen-presentation-kit       outcome presentation, restart, title exit
lobby-screen-presentation-kit          room, roster, ready state, controls
peer-host-transport-kit                PeerJS host, local bridge, connection map, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit              PeerJS client, local bridge, connect, send, status, disconnect, destroy
peer-event-bus-kit                     typed transport events, subscription, cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit             encode, decode, version, structural shape validation
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly, initial snapshot
seeded-maze-rng-kit                    topology, placement, target sequence
first-person-input-kit                 keyboard, pointer lock, look, snapshots
movement-collision-camera-kit          movement, collision, eye pose, shake, camera
network-player-update-kit              sequence, cadence, pose envelope, host consume
corridor-interaction-domain-kit        pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit           ordered slots, validation, victory
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity, pressure
snapshot-outcome-routing-kit           snapshot state to UI outcome
corridor-authoritative-publication-kit tick, clone, SYNC, broadcast
corridor-animation-loop-kit            RAF start/stop, delta, elapsed, successor scheduling
corridor-render-world-kit              terrain, maze, objects, actors, lights, update, disposal
corridor-post-processing-kit           composer, bloom, sizing, render, disposal
corridor-minimap-kit                   maze, players, cubes, ooze, heading
runtime-debug-frame-kit                activation, bounded capture, overlay, export
runtime-resource-cleanup-kit           loop, subscriptions, listeners, observers, GPU cleanup
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Source-backed findings

```txt
peer/message includes remotePeerId: yes
peer/message includes connectionId: yes
protocol envelope includes senderId: yes
protocol envelope includes roomId: yes
serializer validates version and structural shape: yes
serializer binds senderId to remotePeerId: no
serializer validates active room: no
serializer validates current host authority: no
START_GAME validates current host source: no
SYNC validates current host source: no
LOBBY_EVENT validates current host source: no
connection generation checked: no
session epoch checked: no
authority revision monotonic: no
duplicate host-message result exists: no
wrong-source rejection guarantees zero mutation: no
first authoritative-message visible-frame acknowledgement exists: no
```

## Concrete failure paths

```txt
non-host forged START_GAME
  -> client replaces room and players
  -> client replaces host identity and connection status

non-host forged SYNC
  -> client replaces authoritative snapshot
  -> route can become playing, paused or victory
  -> readiness becomes true

wrong-room LOBBY_EVENT
  -> client replaces active room and visible roster

late predecessor message after reconnect
  -> stale connection generation is not compared
  -> predecessor can mutate successor session
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
  -> classify host-only or client-originating authority
  -> bind current session epoch and transport revision
  -> bind current connection ID and generation
  -> validate remote peer against admitted host peer
  -> validate senderId against admitted host player
  -> validate envelope, payload and active room identity
  -> validate monotonic authority revision and duplicate identity
  -> publish Accepted, Rejected, Stale or Duplicate

Accepted
  -> atomically commit room, roster, snapshot, route and readiness
  -> publish successor fingerprint
  -> acknowledge first visible frame citing message and authority revision

Rejected, Stale or Duplicate
  -> perform zero state mutation
  -> publish bounded reason observation
```

## Current audit family

```txt
.agent/trackers/2026-07-12T16-39-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T16-39-35-04-00.md
.agent/architecture-audit/2026-07-12T16-39-35-04-00-authoritative-message-source-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T16-39-35-04-00-authoritative-message-visible-frame-reconciliation-gap.md
.agent/gameplay-audit/2026-07-12T16-39-35-04-00-forged-host-message-state-replacement-reconciliation.md
.agent/interaction-audit/2026-07-12T16-39-35-04-00-host-message-source-admission-reconciliation-map.md
.agent/protocol-authority-audit/2026-07-12T16-39-35-04-00-sender-peer-room-generation-reconciliation-contract.md
.agent/deploy-audit/2026-07-12T16-39-35-04-00-authoritative-message-fixture-central-reconciliation-gate.md
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, package-script, dependency or deployment behavior changed.
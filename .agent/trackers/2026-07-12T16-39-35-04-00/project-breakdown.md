# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-12T16-39-35-04-00`  
**Branch:** `main`  
**Status:** `authoritative-message-source-admission-central-reconciled`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, PeerJS and same-origin transport, deterministic maze bootstrap, authoritative snapshots, cube and anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The selected audit reconciles the newer repo-local authoritative-message-source finding with central tracking. `peer/message` carries transport source evidence, but the client consumer accepts `START_GAME`, `SYNC` and `LOBBY_EVENT` by decoded message type without proving current host peer, sender binding, room, session epoch, connection generation or authority revision.

## Plan ledger

**Goal:** preserve the complete repository breakdown while making every host-authoritative client mutation source-bound, room-bound, generation-bound, monotonic and correlated with the first matching visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect HorrorCorridor repo-local documentation newer than central tracking.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor`.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Preserve all 29 implemented kits and offered services.
- [x] Reconcile the message-source authority audit into a fresh timestamped family.
- [x] Refresh required root `.agent` documents and machine registry.
- [x] Prepare the central ledger and internal change-log update.
- [x] Use `main` only and create no branch or pull request.
- [ ] Runtime implementation and adversarial multiplayer fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     central 2026-07-12T14-30-36-04-00
                   repo-local 2026-07-12T16-29-56-04-00 selected unsynchronized
ZombieOrchard      2026-07-12T14-38-35-04-00
MyCozyIsland       2026-07-12T14-59-01-04-00
TheUnmappedHouse   2026-07-12T15-08-07-04-00
AetherVale         2026-07-12T15-18-50-04-00
TheOpenAbove       2026-07-12T15-40-04-04-00
IntoTheMeadow      2026-07-12T15-49-09-04-00
PhantomCommand     2026-07-12T16-00-03-04-00
PrehistoricRush    2026-07-12T16-20-55-04-00
TheCavalryOfRome   excluded
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

## Main finding

```txt
peer/message transport source evidence exists: yes
protocol senderId and roomId exist: yes
serializer validates version and structure: yes
serializer binds senderId to remotePeerId: no
consumer validates current host peer: no
consumer validates active room: no
consumer validates session epoch: no
consumer validates connection generation: no
consumer validates monotonic authority revision: no
wrong-source typed zero-mutation result: no
first accepted-message visible-frame acknowledgement: no
```

## Required parent domain

```txt
corridor-authoritative-message-source-admission-authority-domain
```

## Required transaction

```txt
PeerMessageEnvelope
  -> classify message authority
  -> bind current session epoch and transport revision
  -> bind current connection ID and generation
  -> compare remote peer with admitted host peer
  -> compare senderId with admitted host player
  -> compare envelope room, payload room and active room
  -> compare message identity and authority revision
  -> return Accepted, Rejected, Stale or Duplicate

Accepted
  -> commit one room, roster, snapshot, route and readiness transition
  -> publish predecessor and successor fingerprints
  -> acknowledge first visible frame citing message and authority revision

Rejected, Stale or Duplicate
  -> perform zero gameplay or presentation mutation
  -> publish a bounded reason observation
```

## Output family

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

Documentation only. Runtime, networking, gameplay, rendering, package scripts, dependencies and deployment behavior were not changed. No branch or pull request was created.
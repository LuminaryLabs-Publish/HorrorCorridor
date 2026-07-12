# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-12T18-38-51-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `room-join-code-allocation-central-reconciled`

## Summary

HorrorCorridor remains a 29-kit cooperative first-person maze runtime. This run selected it because the repo-local room-identity audit completed through commit `add973ebd44067648d75f7b5eab157559b3acdc1` after the prior central ledger write. The source-backed finding remains that a four-character random join code is advertised and requested as the PeerJS host ID before reservation, ownership admission, collision classification, retry, rollback, or visible-hosting proof.

## Plan ledger

**Goal:** reconcile the complete room-identity breakdown and preserve one collision-safe authority boundary before the lobby, roster, readiness, start, protocol, or rendering layers consume an advertised room.

- [x] Compare the full ten-repository `LuminaryLabs-Publish` inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect HorrorCorridor repo-local completion commits newer than the prior central write.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor`.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Preserve all 29 implemented kits and their offered services.
- [x] Add a new timestamped tracker, turn ledger, architecture audit, render audit, gameplay audit, interaction audit, room-identity audit, and deployment audit.
- [x] Refresh the required root `.agent` documents and machine registry.
- [ ] Implement the authority and execute collision, retry, rollback, parity, and visible-frame fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local completion newer than central write: HorrorCorridor
selected repository: LuminaryLabs-Publish/HorrorCorridor
repo-local completion head: add973ebd44067648d75f7b5eab157559b3acdc1
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser route
  -> choose solo, host, or client

host identity setup
  -> generate roomId, four-character joinCode, hostPlayerId, requested hostPeerId
  -> commit session mode, peer identity, room, roster, lobby screen, overlay, readiness
  -> create PeerJS host with peerId equal to joinCode
  -> create same-code BroadcastChannel local bridge
  -> receive peer/open or generic peer/error
  -> no room-identity terminal result, retry generation, or atomic manifest commit

lobby and run
  -> roster and readiness consume the advertised identity
  -> host loading and start consume current room state
  -> protocol messages and snapshots drive client state
  -> Three.js world, HUD, minimap, and diagnostics render successor stores
```

## Domains in use

```txt
application shell and screen routing
UI loading, pause, completion, settings, and terminal projection
session identity, room, roster, readiness, and reset
room ID, join-code, peer-ID, and identity-generation allocation
lobby actor binding, readiness, start, and bootstrap
loading transition and runtime lifecycle
browser clocks, cadence, and simulation time
transport capability, mode selection, and local bridge
PeerJS signalling and DataConnection ownership
connection admission, error retirement, supersession, and quarantine
protocol construction, serialization, sequencing, and authority classes
host-source, sender, room, session, and generation admission
seeded maze topology and deterministic bootstrap
snapshot publication, acceptance, delivery, and backpressure
keyboard, pointer lock, focus, and input lifecycle
movement, collision, camera, prediction, and host admission
cube interactions, ordered anomaly sequence, and ooze pressure
Three.js world, post-processing, render surfaces, and disposal
HUD, minimap, connection status, and debug projection
validation, deployment, and central audit tracking
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

## Source-backed finding

```txt
makeJoinCode entropy: Math.random()
join code length: 4 base-36 characters
requested PeerJS host ID: joinCode
room and lobby committed before peer/open: yes
same-code BroadcastChannel created: yes
candidate reservation: absent
collision-specific result: absent
bounded retry generation: absent
partial identity rollback: absent
canonical room identity manifest: absent
late predecessor open/error quarantine: absent
first accepted-hosting frame acknowledgement: absent
```

## Required parent domain

```txt
corridor-room-join-code-allocation-authority-domain
```

## Required transaction

```txt
StartHostIdentityCommand
  -> bind runtime session and predecessor revision
  -> allocate command ID and identity generation
  -> generate and normalize a candidate join code
  -> reserve the candidate
  -> acquire PeerJS peer-ID ownership
  -> bind the local bridge and transport mode
  -> validate one RoomIdentityManifest
  -> atomically commit Accepted or preserve the predecessor
  -> publish Collision, Unavailable, TimedOut, Cancelled, or Failed without advertising the candidate
  -> retire partial resources and reject late predecessor events
  -> acknowledge the first visible lobby frame citing the accepted manifest fingerprint
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, package scripts, dependencies, and deployment were not changed. No executable collision, retry, rollback, mode-parity, browser, or Pages fixture was run.
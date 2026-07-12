# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T18-38-51-04-00`  
**Branch:** `main`  
**Status:** `room-join-code-allocation-central-reconciled`

## Summary

The repository retains a 29-kit browser runtime spanning application routing, sessions, lobby state, PeerJS, a same-origin BroadcastChannel bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics, and cleanup.

The current boundary remains room and join-code allocation. `GameShell` generates a logical room ID, a four-character random join code, a host player ID, and a requested host peer ID; commits the room and lobby UI; then asks `createHost()` to acquire the join code as a PeerJS ID. No reservation, collision admission, retry generation, canonical identity manifest, partial-resource rollback, late-event fencing, or first valid-hosting frame receipt exists.

This pass was selected because the repo-local audit completed through commit `add973ebd44067648d75f7b5eab157559b3acdc1` after the prior central ledger write.

## Plan ledger

**Goal:** commit room ID, join code, host player ID, admitted host peer ID, transport mode, and identity generation as one revisioned manifest before the lobby claims the room is joinable.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible root `.agent` entrypoints.
- [x] Detect HorrorCorridor repo-local completion commits newer than central tracking.
- [x] Select only HorrorCorridor.
- [x] Preserve the complete interaction loop, domains, all 29 kits, and services.
- [x] Add the timestamped reconciliation audit family.
- [ ] Implement and prove collision-safe identity admission.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local completion newer than central write: 1
selected repository: LuminaryLabs-Publish/HorrorCorridor
repo-local completion head: add973ebd44067648d75f7b5eab157559b3acdc1
```

## Complete interaction loop

```txt
browser route
  -> choose solo, host, or client

host identity setup
  -> generate roomId, joinCode, hostPlayerId, requested hostPeerId
  -> commit session mode, peer identity, room, roster, lobby screen, overlay, readiness
  -> create PeerJS host with peerId equal to joinCode
  -> create same-code BroadcastChannel
  -> receive peer/open or generic peer/error
  -> no reservation, collision retry, rollback, or identity-manifest result

lobby and run
  -> roster and readiness consume the advertised identity
  -> host loading and start consume current room state
  -> START_GAME and SYNC carry current room and host fields
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

## Source-backed findings

```txt
makeJoinCode uses Math.random: yes
join code length: four base-36 characters
host requests PeerJS ID equal to join code: yes
room state committed before peer/open: yes
lobby screen and overlay committed before peer/open: yes
BroadcastChannel created from the same join code: yes
candidate reservation exists: no
collision-specific error classification exists: no
bounded retry generation exists: no
partial identity rollback exists: no
canonical roomId/joinCode/peerId manifest exists: no
late predecessor open/error quarantine exists: no
first accepted-hosting frame acknowledgement exists: no
```

## Concrete failure path

```txt
candidate code C is generated
  -> room and lobby advertise C
  -> PeerJS rejects or cannot acquire ID C
  -> generic peer/error is emitted
  -> no room-identity allocation failure branch runs
  -> lobby retains C and networking readiness remains optimistic
  -> same-code local bridge may still exist
  -> readiness, loading, or start can consume an unowned identity
```

## Required parent domain

```txt
corridor-room-join-code-allocation-authority-domain
```

## Candidate kits

```txt
room-id-kit
join-code-candidate-kit
join-code-entropy-policy-kit
join-code-normalization-kit
join-code-reservation-kit
peer-id-ownership-admission-kit
room-identity-manifest-kit
room-identity-generation-kit
room-identity-fingerprint-kit
host-identity-start-command-kit
host-identity-retry-policy-kit
identity-collision-result-kit
identity-error-classification-kit
local-bridge-identity-binding-kit
peerjs-identity-binding-kit
identity-commit-kit
identity-rollback-kit
stale-identity-event-rejection-kit
identity-observation-kit
identity-journal-kit
first-hosting-state-frame-ack-kit
join-code-collision-fixture-kit
peer-id-unavailable-fixture-kit
retry-exhaustion-fixture-kit
mode-parity-fixture-kit
```

## Required transaction

```txt
StartHostIdentityCommand
  -> bind runtime session and predecessor revision
  -> allocate command ID and identity generation
  -> generate and normalize candidate join code
  -> reserve candidate
  -> acquire PeerJS peer-ID ownership
  -> bind local bridge and transport mode
  -> validate RoomIdentityManifest
  -> atomically commit Accepted or preserve predecessor
  -> publish Collision, Unavailable, TimedOut, Cancelled, Stale, or Failed
  -> retire partial resources and fence late predecessor events
  -> expose joinable lobby only for Accepted
  -> acknowledge first visible frame citing manifest fingerprint
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, package-script, dependency, or deployment behavior changed.
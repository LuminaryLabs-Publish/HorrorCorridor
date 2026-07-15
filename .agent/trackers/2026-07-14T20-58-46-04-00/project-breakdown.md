# HorrorCorridor project breakdown

**Timestamp:** `2026-07-14T20-58-46-04-00`  
**Status:** `client-movement-kinematic-admission-authority-audited`

## Summary

The host treats client `PLAYER_UPDATE` pose data as authoritative input. A connected client supplies `senderId`, a separate `playerId`, sequence, input and full pose; the host ignores the identity relationship and sequence, directly replaces the selected player's pose, moves any held cube with that player and republishes the snapshot.

## Plan ledger

**Goal:** document the complete product and define one host-owned movement transaction that admits only identity-bound, ordered and physically reachable client motion.

- [x] Enumerate 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm no new, missing, undocumented or runtime-ahead repository.
- [x] Select only HorrorCorridor as the oldest synchronized eligible entry.
- [x] Identify the interaction loop, domains, all kits and services.
- [x] Preserve 29 implemented kits and two proof adapters.
- [x] Define 22 movement-authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement and execute movement admission and correction fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger missing: 0
root-agent missing: 0
runtime ahead: 0
selected: HorrorCorridor
prior central timestamp: 2026-07-14T16-00-05-04-00
next oldest: ZombieOrchard at 2026-07-14T16-41-33-04-00
```

## Interaction loop

```txt
route and lobby admission
  -> deterministic maze snapshot
  -> input, prediction, transport, host simulation and rendering start
  -> client predicts pose
  -> client sends PLAYER_UPDATE
  -> host directly installs payload pose into payload playerId
  -> held cube follows player pose
  -> host publishes SYNC
  -> world, minimap and debug project state
  -> no typed movement admission or correction acknowledgement exists
```

## Domains in use

```txt
routing and browser lifecycle
session room roster readiness and reset
maze seed topology and bootstrap
PeerJS BroadcastChannel transport
protocol envelope serialization and decode
client prediction and host publication
actor identity and connection binding
sequence ordering and movement revisions
kinematic policy maze collision and bounds
input pointer lock pause settings and UI
cube interaction anomaly ooze and outcomes
Three.js world post-processing minimap RAF and viewport
prediction correction debug proof build deployment and central tracking
```

## Kits and offered services

```txt
corridor-application-shell-kit: routes, solo/host/client entry, loading, pause, completion, exit
corridor-session-domain-kit: identity, room, roster, connection, readiness, reset
runtime-store-snapshot-kit: snapshot, pose, view, input flags, readiness
ui-pause-projection-kit: pause state, reason, overlay
ui-completion-projection-kit: terminal state, message, timestamp, routing
complete-screen-presentation-kit: outcome, restart, title exit
lobby-screen-presentation-kit: room, roster, ready state, controls
peer-host-transport-kit: PeerJS host, bridge, connections, broadcast, targeted send, cleanup
peer-client-transport-kit: PeerJS client, bridge, connect, send, status, cleanup
peer-event-bus-kit: typed events, subscription, cleanup
protocol-message-construction-kit: START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit: encode, decode, version and structural validation
maze-snapshot-bootstrap-kit: seed, maze, players, cubes, anomaly and initial snapshot
seeded-maze-rng-kit: topology, placement and target sequence
first-person-input-kit: keyboard, pointer lock, look and snapshots
movement-collision-camera-kit: movement, collision, eye pose, shake and camera
network-player-update-kit: sequence, cadence, pose envelope and host consume
corridor-interaction-domain-kit: pickup, drop, place, remove and held-cube sync
ordered-anomaly-sequence-kit: ordered slots, validation and victory
ooze-trail-domain-kit: spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit: snapshot-to-outcome routing
corridor-authoritative-publication-kit: tick, clone, SYNC and broadcast
corridor-animation-loop-kit: RAF, delta, elapsed and scheduling
corridor-render-world-kit: maze, objects, actors, lights, update and dispose
corridor-post-processing-kit: composer, bloom, resize, render and dispose
corridor-minimap-kit: maze, players, cubes, ooze and heading
runtime-debug-frame-kit: activation, bounded capture, overlay and export
runtime-resource-cleanup-kit: loop, subscriptions, listeners, observers and GPU cleanup
package-validation-kit: build, lint, harness, visual and live-player checks
live-agent-runner-adapter: episode scheduling, child execution and JSONL history
live-player-browser-proof-adapter: browser control, debug readback, screenshots and proof gates
```

## Source findings

`createPlayerUpdateMessage()` serializes a caller-selected `senderId`, `playerId`, sequence, input and full pose. Host `GameCanvas` handling branches only on event/message type, then calls `applyNetworkPlayerUpdate()` with the payload player and pose. That function verifies only that the player exists and directly assigns position, rotation, pitch and velocity. `syncHeldCubesToPlayers()` then copies the player position into any held cube before the host publishes a new authoritative snapshot.

## Required authority

```txt
corridor-client-movement-kinematic-admission-authority-domain
```

```txt
ClientMovementUpdateCandidate
  -> bind peer, sender, player, room, session and connection generation
  -> admit sequence and host-time delta
  -> validate bounded pose, speed, acceleration and rotation
  -> sweep the accepted path through maze collision and bounds
  -> prepare player, held-cube and snapshot candidates
  -> atomically commit or reject without mutation
  -> publish ClientMovementUpdateResult
  -> reconcile the originating client to the accepted revision
  -> publish FirstAuthoritativeMovementFrameAck
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, packages, tests, workflows and deployment were not changed or executed.
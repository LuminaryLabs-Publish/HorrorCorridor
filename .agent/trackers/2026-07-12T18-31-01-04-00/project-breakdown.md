# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-12T18-31-01-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `room-join-code-allocation-authority-audited`

## Summary

HorrorCorridor remains a 29-kit cooperative maze runtime. This pass isolates room and join-code allocation: a four-character `Math.random()` code is immediately used as the visible room code and requested PeerJS host ID without reservation, collision admission, ownership proof, retry generation or a typed startup result.

## Plan ledger

**Goal:** make room ID, join code, host peer ID and transport generation one admitted identity manifest before the lobby advertises a joinable room.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only HorrorCorridor as the oldest eligible synchronized repository.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 29 implemented kits and offered services.
- [x] Trace join-code generation, room creation, host startup, PeerJS ownership and lobby projection.
- [x] Add architecture, render, gameplay, interaction, room-identity and deploy audits.
- [x] Refresh root `.agent` documentation and machine registry.
- [ ] Runtime implementation and collision/retry fixtures remain future work.

## Selection

```txt
accessible repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0
selected: HorrorCorridor
selection basis: oldest synchronized central/root timestamp at 2026-07-12T16-39-35-04-00
```

## Interaction loop

```txt
choose Host Game
  -> generate random room ID, four-character join code, host player ID
  -> publish room, identity, lobby screen and networking-ready projection
  -> call createHost(joinCode as PeerJS peer ID)
  -> create Peer and same-code BroadcastChannel
  -> wait for peer open or generic peer error
  -> no reservation, retry generation or identity-manifest commit
  -> clients attempt the advertised code
```

## Domains in use

Application routing; UI and terminal projection; session, room, roster and readiness; room/join-code identity; transport mode and PeerJS signalling; BroadcastChannel local bridge; connection admission and retirement; protocol construction and authority; deterministic maze bootstrap; snapshots; input; movement; interactions; anomaly and ooze systems; Three.js rendering, bloom and minimap; diagnostics; cleanup; validation; deployment; central audit tracking.

## Implemented kits and services

The retained 29-kit census is authoritative:

```txt
corridor-application-shell-kit: routes, entry, loading, pause, completion, exit
corridor-session-domain-kit: identity, room, roster, connection, readiness, reset
runtime-store-snapshot-kit: snapshot, pose, view, input flags, readiness
ui-pause-projection-kit: pause state, reason, overlay
ui-completion-projection-kit: terminal state, message, timestamp, routing
complete-screen-presentation-kit: outcome, restart, title exit
lobby-screen-presentation-kit: room, roster, ready state, controls
peer-host-transport-kit: PeerJS host, local bridge, connections, send, destroy
peer-client-transport-kit: PeerJS client, local bridge, connect, send, destroy
peer-event-bus-kit: typed events, subscription, cleanup
protocol-message-construction-kit: START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit: encode, decode, version and structural validation
maze-snapshot-bootstrap-kit: seed, maze, players, cubes, anomaly, snapshot
seeded-maze-rng-kit: topology, placement, target sequence
first-person-input-kit: keyboard, pointer lock, look, snapshots
movement-collision-camera-kit: movement, collision, eye pose, shake, camera
network-player-update-kit: sequence, cadence, pose envelope, host consume
corridor-interaction-domain-kit: pickup, drop, place, remove, held-cube sync
ordered-anomaly-sequence-kit: ordered slots, validation, victory
ooze-trail-domain-kit: spawn, decay, variation, spacing, capacity, pressure
snapshot-outcome-routing-kit: snapshot to UI outcome
corridor-authoritative-publication-kit: tick, clone, SYNC, broadcast
corridor-animation-loop-kit: RAF, delta, elapsed, scheduling
corridor-render-world-kit: world, actors, lights, update, disposal
corridor-post-processing-kit: composer, bloom, resize, render, disposal
corridor-minimap-kit: maze, players, cubes, ooze, heading
runtime-debug-frame-kit: activation, bounded capture, overlay, export
runtime-resource-cleanup-kit: loops, listeners, observers and GPU cleanup
package-validation-kit: build, lint, harness, visual and live-player checks
```

## Main finding

```txt
join code length: 4 base-36 characters
entropy source: Math.random()
reservation before advertisement: no
PeerJS ID ownership proof before lobby projection: no
collision-specific result: no
retry generation: no
roomId/joinCode/peerId manifest: no
local-bridge/PeerJS identity parity proof: no
first valid-hosting frame acknowledgement: no
```

## Required parent domain

```txt
corridor-room-join-code-allocation-authority-domain
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed.
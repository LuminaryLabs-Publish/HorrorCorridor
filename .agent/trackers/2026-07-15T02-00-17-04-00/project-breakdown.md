# Project Breakdown: HorrorCorridor Device-Control Action Coverage

**Timestamp:** `2026-07-15T02-00-17-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Scope:** documentation only

## Summary

HorrorCorridor composes a deterministic maze, multiplayer session/transport, normalized first-person input, movement/collision, cube/anomaly interactions, ooze pressure, Three.js rendering, post-processing, minimap, debug extraction and browser proof. The current audit finds that the normalized action model is exposed only through keyboard events and pointer-lock mouse movement. No touch-only path can produce the complete gameplay action set.

## Plan ledger

**Goal:** document the complete product loop and kit inventory, then define a device-control authority that gives every admitted device full action coverage through one normalized input path.

- [x] Enumerate 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central-ledger files and root `.agent` states.
- [x] Confirm all eligible repository heads match their documented heads.
- [x] Select only HorrorCorridor by the oldest synchronized central timestamp.
- [x] Inspect the application shell, session/runtime/UI stores, GameCanvas, pointer-lock gate, input domain, movement, interaction, renderer, HUD, package scripts and proof adapters.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and offered services.
- [x] Define the device-control authority and fixture gate.
- [x] Refresh required root `.agent` files.
- [ ] Implement runtime controls and execute browser/device fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0

selected: HorrorCorridor
prior central timestamp: 2026-07-14T20-58-46-04-00
selection rule: oldest eligible synchronized timestamp
```

## Complete interaction loop

```txt
route selection
  -> solo, host or client session
  -> loading and deterministic maze snapshot
  -> GameCanvas initializes input, movement, transport and rendering

desktop input
  -> keydown/keyup map to forward/back/left/right/interact/pause
  -> pointer-lock mousemove accumulates look deltas
  -> normalized PlayerInputState drives movement and camera
  -> interact routes locally or through TRY_INTERACT
  -> authoritative snapshots publish and render

touch-only input
  -> PointerLockGate presents mouse/WASD instructions
  -> no touch movement producer mounts
  -> no touch look producer mounts
  -> no touch interact or pause producer mounts
  -> normalized movement remains zero
  -> playable maze loop cannot progress
```

## Domains in use

```txt
application shell routing and route retirement
session identity room roster readiness and connection
loading generation and deterministic maze bootstrap
PeerJS host/client transport and BroadcastChannel bridge
protocol construction serialization and structural validation
runtime snapshots local pose view input and readiness
normalized keyboard mouse and pointer-lock input
device capability control profile and gesture arbitration
movement collision eye pose camera shake and prediction
network player update and authoritative publication
cube pickup drop carry placement removal and slot ordering
ooze spawn decay pressure and trail projection
victory completion pause settings and route projection
Three.js renderer world lights actors and scene dressing
post-processing resize and render submission
minimap maze player cube ooze and heading projection
runtime debug capture export and browser proof
resource cleanup validation build and deployment
repo-local and central audit tracking
```

## Implemented kit and service inventory

| Kit | Offered services |
|---|---|
| `corridor-application-shell-kit` | routing, solo/host/client entry, loading, pause, completion, exit |
| `corridor-session-domain-kit` | identity, room, roster, connection, readiness, reset |
| `runtime-store-snapshot-kit` | authoritative snapshot, local pose, view, input flags, readiness |
| `ui-pause-projection-kit` | pause state, reason, overlay |
| `ui-completion-projection-kit` | terminal state, message, timestamp, routing |
| `complete-screen-presentation-kit` | outcome presentation, restart, title exit |
| `lobby-screen-presentation-kit` | room, roster, readiness, controls |
| `peer-host-transport-kit` | PeerJS host, BroadcastChannel bridge, connections, broadcast, targeted send, disconnect, destroy |
| `peer-client-transport-kit` | PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy |
| `peer-event-bus-kit` | typed transport events, subscription, cleanup |
| `protocol-message-construction-kit` | START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT |
| `protocol-serialization-kit` | encode, decode, protocol version, structural validation |
| `maze-snapshot-bootstrap-kit` | seed, maze, players, cubes, anomaly, initial snapshot |
| `seeded-maze-rng-kit` | topology, placement, target sequence |
| `first-person-input-kit` | keyboard mapping, pointer lock, mouse look, normalized snapshots |
| `movement-collision-camera-kit` | movement, collision, eye pose, camera shake, camera synchronization |
| `network-player-update-kit` | sequence field, cadence, pose envelope, host consumption |
| `corridor-interaction-domain-kit` | pickup, drop, place, remove, held-cube synchronization |
| `ordered-anomaly-sequence-kit` | ordered slots, validation, victory |
| `ooze-trail-domain-kit` | spawn, decay, variation, spacing, capacity, pressure |
| `snapshot-outcome-routing-kit` | snapshot game state to UI outcome |
| `corridor-authoritative-publication-kit` | tick, clone, SYNC, broadcast |
| `corridor-animation-loop-kit` | RAF start, stop, delta, elapsed, successor scheduling |
| `corridor-render-world-kit` | terrain, maze, objects, actors, lights, update, dispose |
| `corridor-post-processing-kit` | composer, bloom, resize, render, dispose |
| `corridor-minimap-kit` | maze, players, cubes, ooze, heading |
| `runtime-debug-frame-kit` | activation, bounded frame capture, overlay, export |
| `runtime-resource-cleanup-kit` | loop, subscriptions, listeners, observers, GPU cleanup |
| `package-validation-kit` | build, lint, harness, visual and live-player checks |

## Browser-proof adapters

| Adapter | Offered services |
|---|---|
| `live-agent-runner-adapter` | episode scheduling, adaptive actions, child execution, JSONL history, latest summary |
| `live-player-browser-proof-adapter` | server/browser admission, route control, debug readback, screenshots, image probes, proof gates |

## Census

```txt
implemented kits: 29
browser-proof adapters: 2
total implemented surfaces: 31
planned device-control surfaces: 21
```

## Main source finding

```txt
normalized input state exists: yes
keyboard action producer exists: yes
pointer-lock mouse-look producer exists: yes
touch movement producer exists: no
touch look producer exists: no
touch interact producer exists: no
touch pause producer exists: no
device profile admission exists: no
hybrid gesture arbitration exists: no
visible action-effect acknowledgement exists: no
```

## Required parent domain

```txt
corridor-device-control-action-coverage-authority-domain
```

## Required transaction

```txt
DeviceControlAdmissionCommand
  -> bind document generation, route, viewport,
     device capability and input-map revision
  -> resolve one ControlProfileDescriptor
  -> require complete action coverage
  -> prepare keyboard, mouse, touch and hybrid producers
  -> arbitrate gesture ownership and cancellation
  -> route all accepted input through PlayerInputState
  -> reject stale, duplicate and conflicting producers
  -> publish DeviceControlAdmissionResult
  -> publish FirstDeviceControlSurfaceFrameAck
  -> publish FirstDeviceActionEffectFrameAck
```

## Validation

```txt
documentation changed: yes
runtime changed: no
input behavior changed: no
gameplay changed: no
render behavior changed: no
packages/tests/workflows changed: no
deployment changed: no
branch created: no
pull request created: no
runtime commands run: no
touch fixtures available: no
```

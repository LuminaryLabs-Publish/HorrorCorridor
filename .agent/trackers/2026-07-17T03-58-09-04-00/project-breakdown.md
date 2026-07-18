# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-17T03-58-09-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `debug-preference-storage-fault-isolation-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, client prediction, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

This run isolates debug-preference persistence. `initializeRuntimeDebug()` reads two `localStorage` keys synchronously before renderer/world construction, while debug toggles synchronously write both keys. None of those reads or writes has an exception boundary, capability result or in-memory fallback. A denied or unavailable storage surface can therefore prevent runtime initialization or make a debug toggle throw without a typed settlement.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/HorrorCorridor
selection rule: oldest synchronized central timestamp
prior central timestamp: 2026-07-16T22-00-47-04-00
next oldest: LuminaryLabs-Publish/ZombieOrchard at 2026-07-16T22-59-23-04-00
```

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded and was not inspected or modified.

## Complete interaction loop

```txt
solo, host or client route
  -> deterministic maze and initial authoritative snapshot
  -> GameCanvas initializeRuntime(snapshot)
  -> initializeRuntimeDebug()
     -> read enabled preference from localStorage
     -> read overlay preference from localStorage
     -> optionally write normalized values through store actions
     -> attach window debug API
  -> clear debug buffers
  -> create renderer, scene, camera and post-processing
  -> build and attach maze world
  -> install input, pointer-lock, resize and transport listeners
  -> start RAF simulation/prediction/network/render loop

runtime debug toggle
  -> Backquote or window API
  -> setEnabled/setOverlayVisible
  -> write both preferences to localStorage
  -> update in-memory debug state

storage fault path
  -> getItem or setItem throws
  -> no typed result or capability state
  -> no fallback preference store
  -> bootstrap can stop before the first renderer frame
     or the toggle handler can terminate without settlement
```

## Domains in use

```txt
application routing and browser lifecycle
session identity, room, roster, connection, readiness and reset
deterministic maze bootstrap and seeded maze RNG
PeerJS, BroadcastChannel, transport events and protocol
snapshot cadence, authoritative publication and client receipt
keyboard, mouse, pointer lock and normalized input
local prediction, movement, collision, camera and interaction
cube, ordered anomaly, ooze and victory
RAF scheduling, runtime lifecycle and resource cleanup
Three.js world and post-processing projection
Canvas2D minimap projection
pause, settings, completion and route projection
runtime debug capture, overlay, export and browser window API
debug preference persistence capability and fault isolation
validation, browser proof, build, deployment and central tracking
```

## Implemented kits and offered services

### Application, session and UI

| Kit | Offered services |
|---|---|
| `corridor-application-shell-kit` | Routing, solo/host/client entry, loading, pause, completion and exit |
| `corridor-session-domain-kit` | Identity, room, roster, connection, readiness and reset |
| `runtime-store-snapshot-kit` | Authoritative snapshot, local pose, view, input flags and readiness |
| `ui-pause-projection-kit` | Pause state, pause reason and overlay projection |
| `ui-completion-projection-kit` | Terminal state, message, timestamp and routing |
| `complete-screen-presentation-kit` | Outcome presentation, restart and title exit |
| `lobby-screen-presentation-kit` | Room, roster, ready state and lobby controls |

### Network and protocol

| Kit | Offered services |
|---|---|
| `peer-host-transport-kit` | PeerJS host, BroadcastChannel bridge, connections, broadcast, targeted send, disconnect and destroy |
| `peer-client-transport-kit` | PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect and destroy |
| `peer-event-bus-kit` | Typed transport events, subscription and cleanup |
| `protocol-message-construction-kit` | `START_GAME`, `PLAYER_UPDATE`, `TRY_INTERACT`, `SYNC` and `LOBBY_EVENT` construction |
| `protocol-serialization-kit` | Encode, decode, protocol versioning and structural validation |
| `network-player-update-kit` | Sender sequence, cadence, pose envelope and host consumption |
| `corridor-authoritative-publication-kit` | Tick advancement, snapshot cloning, `SYNC` and broadcast |

### Maze, gameplay and player

| Kit | Offered services |
|---|---|
| `maze-snapshot-bootstrap-kit` | Seed, maze, players, cubes, anomaly and initial snapshot |
| `seeded-maze-rng-kit` | Topology, object placement and target sequence |
| `first-person-input-kit` | Keyboard, pointer lock, look accumulation and snapshots |
| `movement-collision-camera-kit` | Movement, maze collision, eye pose, walk bob, roll and camera projection |
| `corridor-interaction-domain-kit` | Pickup, drop, place, remove and held-cube synchronization |
| `ordered-anomaly-sequence-kit` | Ordered slots, completion validation and victory |
| `ooze-trail-domain-kit` | Spawn, decay, variation, spacing, capacity and pressure |
| `snapshot-outcome-routing-kit` | Snapshot game state to UI outcome routing |

### Runtime and presentation

| Kit | Offered services |
|---|---|
| `corridor-animation-loop-kit` | RAF start, stop, delta, elapsed and successor scheduling |
| `corridor-render-world-kit` | Terrain, maze, objects, actors, lights/materials, update and disposal |
| `corridor-post-processing-kit` | Composer, bloom, resize, render and disposal |
| `corridor-minimap-kit` | Canvas acquisition, DPR sizing, transforms, maze, ooze, cubes, remote players and local heading |
| `runtime-debug-frame-kit` | Preference initialization, activation, bounded capture, overlay, export and window API |
| `runtime-resource-cleanup-kit` | Loop, subscriptions, listeners, observers and GPU cleanup |
| `package-validation-kit` | Build, lint, harness, visual and live-player checks |

### Browser-proof adapters

| Adapter | Offered services |
|---|---|
| `live-agent-runner-adapter` | Episode scheduling, adaptive action selection, child execution, JSONL history and latest summary |
| `live-player-browser-proof-adapter` | Server/browser admission, route control, debug readback, screenshots, image probes and proof gates |

```txt
implemented kits: 29
browser-proof adapters: 2
total implemented surfaces: 31
```

## Source-backed finding

```txt
runtimeDebugStore.writeDebugPreferences:
  direct localStorage.setItem calls: 2
  exception classification: absent
  fallback store: absent
  write result: absent

initializeRuntimeDebug:
  direct localStorage.getItem calls: 2
  exception classification: absent
  storage capability result: absent
  fallback preference: absent

GameCanvas.initializeRuntime:
  initializeRuntimeDebug before renderer construction: yes
  first playable frame acknowledgement after preference settlement: absent

Backquote/window debug toggle:
  synchronous preference writes: yes
  failure result and UI status: absent

storage denial/quota/private-context fixtures: absent
```

This is a source-backed startup and interaction-availability risk. No storage denial, startup failure or player-facing production incident was reproduced.

## Required authority

```txt
corridor-debug-preference-storage-fault-isolation-authority-domain
```

```txt
DebugPreferenceCapabilityCommand
  -> probe storage availability without mutating gameplay state
  -> classify available, denied, unavailable, quota, malformed or indeterminate
  -> publish DebugPreferenceCapabilityResult

DebugPreferenceReadCommand
  -> bind build, runtime and schema revisions
  -> read only public-safe presentation preferences
  -> reject malformed or elevated values
  -> fall back to in-memory defaults without blocking runtime boot
  -> publish DebugPreferenceReadResult

DebugPreferenceWriteCommand
  -> validate public-safe values and payload budget
  -> attempt host persistence
  -> retain in-memory preference on host failure
  -> publish persisted, failed or unavailable result

DebugBootstrapSettlementCommand
  -> isolate preference failures from renderer/world startup
  -> publish DebugBootstrapSettlementResult
  -> publish FirstPlayableFrameAck
  -> publish FirstDebugPreferenceStatusFrameAck
```

## Planned authority surfaces

```txt
1. debug-preference-storage-capability-kit
2. debug-preference-read-admission-kit
3. debug-preference-write-admission-kit
4. debug-preference-schema-validation-kit
5. debug-preference-build-scope-policy-kit
6. storage-exception-classification-kit
7. storage-denial-fallback-kit
8. in-memory-debug-preference-kit
9. stale-preference-result-rejection-kit
10. debug-bootstrap-fault-isolation-kit
11. debug-toggle-fault-isolation-kit
12. debug-window-api-fault-isolation-kit
13. debug-preference-result-kit
14. debug-readiness-projection-kit
15. first-playable-frame-ack-kit
16. first-debug-preference-status-frame-ack-kit
17. storage-denial-browser-fixture-kit
18. source-build-pages-storage-parity-kit
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-17T03-58-09-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T03-58-09-04-00.md
.agent/architecture-audit/2026-07-17T03-58-09-04-00-debug-preference-storage-fault-isolation-dsk-map.md
.agent/render-audit/2026-07-17T03-58-09-04-00-storage-denial-first-playable-frame-gap.md
.agent/gameplay-audit/2026-07-17T03-58-09-04-00-debug-preference-bootstrap-toggle-loop.md
.agent/interaction-audit/2026-07-17T03-58-09-04-00-debug-preference-command-result-map.md
.agent/debug-storage-audit/2026-07-17T03-58-09-04-00-host-storage-capability-fallback-contract.md
.agent/deploy-audit/2026-07-17T03-58-09-04-00-storage-denial-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-17T03-58-09-04-00-oldest-selection-debug-storage-reconciliation.md
```

## Validation boundary

Documentation only. Runtime TypeScript, debug behavior, storage access, gameplay, networking, rendering, tests and deployment remain unchanged. No storage-fault isolation, fallback correctness, first-frame convergence, artifact parity, deployed parity or production readiness is claimed.
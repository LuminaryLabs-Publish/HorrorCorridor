# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T04-28-03-04-00`

## Status

```txt
status: focus-loss-input-retirement-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local update completes
```

## Summary

HorrorCorridor supports immediate keyboard movement without requiring pointer capture. `GameCanvas` records keydown state in a persistent `PlayerInputState`, clears individual controls on `keyup`, and resets the full state when pointer lock is lost.

The browser `blur` handler only exits pointer lock when pointer lock is already active. When the player is using the advertised non-pointer-locked WASD path, focus loss does not reset controls, pause the screen or publish a neutral input state. A missed keyup can therefore leave movement latched across window focus loss, visibility loss or tab switching.

## Plan ledger

**Goal:** define one input-retirement authority that neutralizes held controls and network intent whenever the browser or runtime can no longer prove that the current physical input lease is valid.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read current root `.agent` state and retained pause/movement audits.
- [x] Read `GameShell.tsx`, `GameCanvas.tsx`, `PointerLockGate` use and `input.ts`.
- [x] Confirm WASD movement is available before pointer lock.
- [x] Confirm keydown sets held controls and keyup is the normal release path.
- [x] Confirm pointer-lock loss resets the complete input state.
- [x] Confirm blur without pointer lock performs no input retirement.
- [x] Confirm no `visibilitychange` or `pagehide` retirement listener exists.
- [x] Confirm simulation and client publication can consume the stale held state.
- [x] Reconcile all 29 implemented kits and services.
- [x] Define control leases, input revisions, retirement results and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state.
- [ ] Runtime implementation and executable browser/network fixtures remain future work.

## Product interaction loop

```txt
GameShell enters PLAYING
  -> GameCanvas initializes input, simulation, rendering and listeners
  -> PointerLockGate permits immediate WASD movement
  -> keydown W sets forward = true
  -> browser loses focus before keyup
  -> onBlur sees pointerLockedRef.current = false
  -> no pointer-lock exit, no input reset and no pause occurs
  -> keyup is delivered outside the page or omitted
  -> animation loop still sees PLAYING
  -> host/solo movement consumes forward = true
  -> client prediction consumes forward = true
  -> client cadence can publish the resulting pose
  -> focus returns with stale held input still authoritative locally
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding readiness start and bootstrap
runtime startup acquisition rollback retry and first-frame commit
runtime readiness lifecycle exit disconnect and reconnect
PeerJS host/client transport and BroadcastChannel local bridge
protocol envelopes serialization request and sequence admission
seeded maze topology cube placement target sequence and random streams
replicated snapshot construction publication acceptance delivery and backpressure
keyboard mouse pointer lock focus visibility and input lifecycle
held-control leases input revisions neutralization and retirement
movement collision camera prediction and host admission
interaction target cube/slot claims ordered anomaly and ooze pressure
Three.js world renderer post-processing bloom and cleanup
render-surface observation policy sizing revision and frame correlation
active gameplay presentation policy and consumer admission
HUD and minimap surface ownership, mount lifecycle and projection
runtime debug capability, capture, overlay and export
validation build and deployment
```

## Implemented kits and services

The repository retains 29 source-backed kit responsibilities:

```txt
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion and exits
corridor-session-domain-kit            session mode, peer identity, room, roster, readiness and reset
runtime-store-snapshot-kit             authoritative snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, pause reason and overlay projection
ui-completion-projection-kit           terminal state, message, timestamp, acknowledgement and routing
complete-screen-presentation-kit       outcome presentation, restart and title exit
lobby-screen-presentation-kit          room, roster, ready badges, controls and connection state
peer-host-transport-kit                host peer, connections, broadcast, targeted send and destroy
peer-client-transport-kit              host connection, send, status, disconnect and destroy
peer-event-bus-kit                     typed events, subscription and cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT
protocol-serialization-kit             JSON encode/decode, protocol version and shape checks
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly, room and initial snapshot
seeded-maze-rng-kit                    deterministic topology, cube placement and target sequence
first-person-input-kit                 keyboard, pointer lock, look accumulation and input snapshots
movement-collision-camera-kit          movement, maze collision, eye pose, walk shake and camera
network-player-update-kit              client sequence/cadence, pose envelope and host consume
corridor-interaction-domain-kit        action inference, pickup, drop, place, remove and held-cube sync
ordered-anomaly-sequence-kit           ordered validation, slots and victory evaluation
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           snapshot-to-UI outcome projection
corridor-authoritative-publication-kit tick, snapshot clone, SYNC construction and broadcast
corridor-animation-loop-kit            RAF lifecycle, delta and running guard
corridor-render-world-kit              terrain, maze, objects, lights, update, attach and disposal
corridor-post-processing-kit           composer, bloom, output, resize, render and disposal
corridor-minimap-kit                   2D sizing, maze, players, cubes, ooze and heading
runtime-debug-frame-kit                activation, bounded frames/events, overlay and export
runtime-resource-cleanup-kit           loop stop, observer/listener cleanup and GPU disposal
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Source findings

```txt
PointerLockGate says WASD works immediately: yes
keyboard movement requires pointer lock: no
keydown stores held button state: yes
keyup clears held button state: yes
pointer-lock loss calls full input reset: yes
blur handler always resets input: no
blur handler pauses when pointer lock is absent: no
visibilitychange listener: absent
pagehide listener: absent
focus/control lease identity: absent
input revision: absent
retirement command/result: absent
client zero-input terminal publication: absent
cleanup publishes neutral runtime input snapshot: absent
```

## Concrete failure path

```txt
initial state
  pointerLocked = false
  screen = PLAYING
  forward = false

keydown W
  forward = true

window blur before keyup
  onBlur does nothing because pointerLocked = false
  screen remains PLAYING
  forward remains true

keyup outside window
  page receives no release event

subsequent frames
  host/solo stepLocalPose advances forward
  client prediction advances forward
  client PLAYER_UPDATE may publish movement-derived pose

focus return
  forward remains true until another reset path is reached
```

## Required parent domain

```txt
corridor-focus-loss-input-retirement-authority-domain
```

## Candidate kits

```txt
input-focus-state-kit
input-control-lease-kit
held-control-state-kit
input-revision-kit
focus-loss-event-adapter-kit
visibility-loss-event-adapter-kit
pagehide-input-adapter-kit
pointer-lock-retirement-adapter-kit
input-retirement-command-kit
input-retirement-admission-kit
input-neutralization-kit
client-zero-input-publication-kit
input-retirement-result-kit
input-retirement-journal-kit
stuck-input-fixture-kit
focus-visibility-browser-smoke-kit
client-zero-input-fixture-kit
runtime-teardown-input-fixture-kit
```

## Required authority flow

```txt
focus, visibility, pointer-lock, pause, route or runtime loss
  -> create InputRetirementCommand with reason and expected revisions
  -> reject stale runtime/run/input generations
  -> suspend new gameplay input
  -> neutralize buttons, look deltas and pointer state atomically
  -> publish the neutral runtime input snapshot
  -> optionally send one sequenced client zero-input update
  -> retire the prior control lease
  -> publish an idempotent InputRetirementResult
  -> require a new focus-qualified keydown for the next lease
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Exit Commit and Session Epoch
4a. Runtime Startup Acquisition and Rollback Authority
4b. Runtime Readiness Lease and Generation Fencing
4c. Render Surface Resolution and Frame Correlation Authority
4d. Active Gameplay Presentation and HUD/Minimap Reachability Authority
4e. Debug Observability Capability and Redaction Authority
4f. Focus, Visibility and Held-Control Retirement Authority
5. Snapshot Acceptance Authority
5a. Interaction Target Intent and Cube/Slot Claim Authority
5b. Active-Run Disconnect and Reconnect Authority
5c. Terminal Outcome Authority
6. Host Network Cadence and Fixed Simulation Authority
6a. Host Movement Admission and Client Reconciliation
6b. Snapshot Delivery and Backpressure Authority
6c. Authoritative Randomness and Replay Authority
7. Pause/Resume Authority
```
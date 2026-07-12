# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-11T21-21-12-04-00`

## Status

```txt
status: runtime-startup-acquisition-rollback-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until central commit
```

## Summary

`GameShell` reports simulation, rendering and input readiness immediately after creating or receiving an authoritative snapshot. The visual runtime does not exist yet at that point. React mounts `GameCanvas` afterward, and `initializeRuntime()` sets its local `initialized` flag before it creates the renderer, scene, camera, post-processing pipeline or world.

There is no `try/catch/finally` boundary around acquisition. `cleanupRuntime` remains a no-op until every resource, listener and loop has been installed. If any intermediate operation throws, earlier resources are not retired, `initialized` remains true, the snapshot subscription does not retry and readiness may remain true without a visible frame.

## Plan ledger

**Goal:** define one startup transaction from snapshot admission through resource acquisition, first-frame acknowledgement, rollback and clean retry.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read `GameShell.tsx`, `GameCanvas.tsx`, `animationLoop.ts`, `createRenderer.ts` and `createPostProcessing.ts`.
- [x] Trace loading, snapshot creation, React mount, GPU acquisition, listener installation, RAF start and cleanup.
- [x] Confirm readiness is published before runtime construction and before a committed frame.
- [x] Confirm `initialized` is set before fallible acquisition.
- [x] Confirm no partial-acquisition rollback or retry result exists.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Define startup authority, leases, rollback and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state.
- [ ] Runtime implementation and executable fixtures remain future work.

## Product interaction loop

```txt
Start, Host or Join
  -> session/lobby state
  -> cosmetic loading steps
  -> create or receive initial snapshot
  -> mark runtime ready
  -> route to PLAYING
  -> mount GameCanvas
  -> initialize render/runtime resources
  -> start RAF
  -> simulation, transport, render and UI loop
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding readiness start and bootstrap
runtime startup command admission acquisition rollback retry and first-frame commit
run session epoch exit runtime readiness disconnect and reconnect
PeerJS host and client transport
BroadcastChannel local transport bridge
peer event bus connection registry delivery and actor binding
versioned protocol envelopes serialization request and sequence admission
seed derivation seeded maze topology cube placement and target sequence
authoritative randomness streams random draws checkpoints and replay
replicated snapshot construction publication acceptance and delivery
snapshot payload identity size budgeting delta/full policy and backpressure
pointer lock keyboard mouse blur and input lifecycle
client prediction movement collision camera and host admission
fixed simulation cadence and authoritative systems
interaction target observation cube/slot claims and results
cube ownership ordered anomaly terminal outcome and ooze pressure
Three.js renderer scene world post-processing minimap HUD debug and frame correlation
RAF ResizeObserver listener and GPU resource lifecycle
validation build and deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** route and screen lifecycle, solo/host/client entry, loading, pause, completion and exits.
- **corridor-session-domain-kit:** session mode, peer identity, room, roster, readiness and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, view angles, inputs and readiness.
- **ui-pause-projection-kit:** pause state, reason and overlay projection.
- **ui-completion-projection-kit:** terminal state, message, timestamp, acknowledgement and routing.
- **complete-screen-presentation-kit:** victory/failure copy, restart and title exit.
- **lobby-screen-presentation-kit:** room metadata, roster, readiness, controls and connection state.
- **peer-host-transport-kit:** host peer, connection registry, broadcast, targeted send and destroy.
- **peer-client-transport-kit:** host connection, send, local bridge, status and destroy.
- **peer-event-bus-kit:** typed transport events, subscription and cleanup.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encode/decode, protocol version and structural admission.
- **maze-snapshot-bootstrap-kit:** seed, maze, players, cubes, anomaly, room and initial snapshot.
- **seeded-maze-rng-kit:** deterministic LCG for maze topology, cube placement and target sequence.
- **first-person-input-kit:** keyboard, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit:** movement, maze collision, eye pose, camera and walk shake.
- **network-player-update-kit:** client sequence/send cadence, pose envelope and host consume.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered slot validation and victory evaluation.
- **ooze-trail-domain-kit:** spawn, decay, spacing, capacity and ooze level.
- **snapshot-outcome-routing-kit:** inbound snapshot to UI outcome projection.
- **corridor-authoritative-publication-kit:** tick increment, snapshot clone, SYNC construction and broadcast.
- **corridor-animation-loop-kit:** RAF start/stop, delta calculation and running guard.
- **corridor-render-world-kit:** terrain, maze, players, cubes, anomaly, ooze, props, lights and disposal.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and disposal.
- **corridor-minimap-kit:** maze, players, cubes and anomaly projection.
- **runtime-debug-frame-kit:** bounded frame/event records and JSON export.
- **runtime-resource-cleanup-kit:** loop stop, subscriptions, observers, listeners, world, post, renderer and canvas cleanup after successful initialization.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object review and live-player validation.

## Source findings

```txt
GameShell readiness before GameCanvas mount: yes
GameShell readiness before first render frame: yes
GameCanvas initialized flag set before renderer creation: yes
renderer creation fallible: yes
post-processing creation fallible: yes
world construction/attachment fallible: yes
canvas attachment/listener installation fallible: yes
cleanup function active during partial acquisition: no
startup try/catch: no
acquisition ledger: no
reverse rollback: no
startup transaction or generation ID: no
first-frame acknowledgement: no
clean retry result: no
```

## Main finding

```txt
snapshot accepted
  -> readiness says ready
  -> GameCanvas initializeRuntime starts
  -> initialized = true
  -> renderer acquired
  -> later acquisition throws
  -> cleanupRuntime is still no-op
  -> renderer/resource may remain live
  -> initialized prevents retry
  -> store may continue to report ready
  -> no typed failure or rollback evidence
```

The existing normal unmount cleanup is useful only after initialization reaches the point where `cleanupRuntime` is replaced. It does not protect partial startup or first-frame failure.

## Required parent domain

```txt
corridor-runtime-startup-rollback-authority-domain
```

## Candidate kits

```txt
runtime-start-command-kit
runtime-start-admission-kit
runtime-start-transaction-kit
runtime-start-generation-kit
startup-phase-kit
startup-acquisition-ledger-kit
startup-resource-lease-kit
renderer-acquisition-kit
post-processing-acquisition-kit
world-acquisition-kit
callback-listener-lease-kit
first-frame-commit-kit
startup-readiness-commit-kit
startup-failure-result-kit
startup-rollback-plan-kit
reverse-order-retirement-kit
retry-baseline-kit
startup-observation-kit
startup-journal-kit
startup-failure-injection-fixture-kit
startup-clean-retry-fixture-kit
first-frame-readiness-fixture-kit
```

## Required authority flow

```txt
StartRuntime command
  -> validate session, run, epoch, snapshot and mount
  -> create startup transaction and generation
  -> acquire renderer, scene, camera, post and world as recorded leases
  -> attach canvas/world and record observer/listener leases
  -> start one generation-fenced RAF lease
  -> submit and acknowledge first valid frame
  -> atomically commit readiness and StartupSuccess

failure
  -> freeze new acquisition and callback admission
  -> retire acquired leases in reverse dependency order
  -> clear initialized/readiness/public references
  -> publish StartupFailure and rollback receipts
  -> permit retry only when required live-lease counts are zero
```

## Required guarantees

```txt
readiness cannot precede the first committed frame
partial startup cannot leak renderer, composer, world, canvas, listeners or RAF
initialized state changes only on committed startup
failure returns a typed phase and cause
rollback is idempotent and complete or reports unresolved leases
stale callbacks cannot commit after rollback
retry creates a new generation from a clean baseline
normal cleanup and failed-start rollback use the same retirement services
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Exit Commit and Session Epoch
4a. Runtime Startup Acquisition and Rollback Authority
4b. Runtime Readiness Lease and Generation Fencing
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

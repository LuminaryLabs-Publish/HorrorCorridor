# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-11T23-18-16-04-00`

## Status

```txt
status: render-surface-resolution-frame-correlation-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until central commit
```

## Summary

The main 3D canvas and minimap do not share one render-surface authority. `GameCanvas` caps the WebGL surface at DPR 1, while `Minimap` uses uncapped `window.devicePixelRatio`. `resizeRenderer()` directly mutates renderer, camera, EffectComposer and bloom state from both ResizeObserver and window resize callbacks.

A zero-width or zero-height mount silently returns without a result. No surface ID, surface revision, product pixel budget, capability fallback, resize coalescing, requested/actual physical-size result or visible-frame correlation exists. Rendering readiness and the RAF can remain active while the latest size observation was rejected implicitly.

## Plan ledger

**Goal:** define one product-owned surface policy and commit result that synchronizes WebGL, post-processing, camera, minimap, readiness and visible-frame evidence.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read `GameCanvas.tsx`, `createRenderer.ts`, `createPostProcessing.ts` and `Minimap.tsx`.
- [x] Trace startup sizing, ResizeObserver, window resize, DPR sampling, camera projection, composer/bloom sizing and minimap sizing.
- [x] Confirm the main/minimap DPR policy split.
- [x] Confirm zero-area observations return without a typed result.
- [x] Confirm debug frames omit surface identity, revision and physical sizes.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Define surface authority, adapters, results and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state.
- [ ] Runtime implementation and executable fixtures remain future work.

## Product interaction loop

```txt
mode selection and lobby
  -> initial snapshot and runtime startup
  -> renderer, scene, camera, post-processing and world creation
  -> sample mount CSS size and browser DPR
  -> mutate renderer, composer, bloom and camera
  -> start RAF simulation and render
  -> minimap samples DPR independently per frame
  -> world, minimap, HUD and debug projection
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
pointer lock keyboard mouse blur and input lifecycle
movement collision camera prediction and host admission
interaction target cube/slot claims ordered anomaly and ooze pressure
Three.js world renderer post-processing bloom and cleanup
render-surface observation policy sizing revision and frame correlation
minimap 2D surface sizing and projection
HUD debug readback validation build and deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** routing, modes, loading, pause, completion and exits.
- **corridor-session-domain-kit:** session mode, peer identity, room, roster, readiness and reset.
- **runtime-store-snapshot-kit:** snapshot, local pose, view angles, input flags and readiness.
- **ui-pause-projection-kit:** pause state, reason and overlay projection.
- **ui-completion-projection-kit:** victory/failure state, timestamp, acknowledgement and routing.
- **complete-screen-presentation-kit:** terminal presentation, restart and title exit.
- **lobby-screen-presentation-kit:** room, roster, readiness, controls and connection state.
- **peer-host-transport-kit:** host peer, connection registry, broadcast, targeted send and destroy.
- **peer-client-transport-kit:** host connection, send, status, disconnect and destroy.
- **peer-event-bus-kit:** typed events, subscription and cleanup.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT.
- **protocol-serialization-kit:** JSON encoding, structural decode, protocol version and shape checks.
- **maze-snapshot-bootstrap-kit:** seed, maze, players, cubes, anomaly, room and initial snapshot.
- **seeded-maze-rng-kit:** deterministic LCG for topology, cube placement and target sequence.
- **first-person-input-kit:** keyboard, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit:** movement, maze collision, eye pose, walk shake and camera.
- **network-player-update-kit:** client sequence/cadence, pose envelope and host consume.
- **corridor-interaction-domain-kit:** action inference, pickup, drop, place, remove and held-cube sync.
- **ordered-anomaly-sequence-kit:** ordered validation, slots and victory evaluation.
- **ooze-trail-domain-kit:** spawn, decay, variation, spacing, capacity and pressure.
- **snapshot-outcome-routing-kit:** snapshot to UI outcome projection.
- **corridor-authoritative-publication-kit:** tick, snapshot clone, SYNC construction and broadcast.
- **corridor-animation-loop-kit:** RAF lifecycle, delta and running guard.
- **corridor-render-world-kit:** terrain, maze, objects, lights, update, attach and disposal.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and disposal.
- **corridor-minimap-kit:** 2D surface sizing, maze, players, cubes, ooze and heading projection.
- **runtime-debug-frame-kit:** bounded frame/event records and JSON export.
- **runtime-resource-cleanup-kit:** loop stop, observers/listeners, world/post/renderer disposal and canvas removal.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object review and live-player validation.

## Source findings

```txt
main pixel ratio cap: 1
main CSS size source: mount.clientWidth/clientHeight
minimap pixel ratio source: uncapped window.devicePixelRatio
ResizeObserver ingress: yes
window resize ingress: yes
startup resize call: yes
resize coalescing: no
surface command or observation ID: no
surface revision: no
product physical-pixel budget: no
requested/actual drawing-buffer result: no
composer/bloom size result: no
zero-area typed result: no
surface revision in debug frame: no
surface revision in readiness: no
```

## Main finding

```txt
layout or DPR changes
  -> one or more direct resize callbacks
  -> each callback samples live CSS size and DPR
  -> renderer, composer, bloom and camera mutate independently
  -> minimap samples DPR separately during frame rendering
  -> no aggregate commit result
  -> no monotonic surface revision
  -> no frame/capture evidence for the applied surface
```

For zero-area mounts:

```txt
resize callback
  -> width <= 0 or height <= 0
  -> silent return
  -> readiness unchanged
  -> RAF and simulation continue
  -> prior buffers remain the implicit surface
```

## Required parent domain

```txt
corridor-render-surface-authority-domain
```

## Candidate kits

```txt
render-surface-policy-kit
render-surface-command-kit
render-surface-admission-kit
render-surface-id-kit
render-surface-revision-kit
container-size-observation-kit
device-scale-observation-kit
resize-source-observation-kit
pixel-budget-kit
surface-capability-result-kit
surface-resize-plan-kit
surface-resize-coalescing-kit
renderer-size-commit-kit
post-processing-size-commit-kit
camera-projection-commit-kit
minimap-surface-adapter-kit
surface-commit-result-kit
surface-frame-correlation-kit
surface-debug-projection-kit
surface-journal-kit
zero-area-surface-fixture-kit
dpr-parity-fixture-kit
resize-storm-fixture-kit
```

## Required authority flow

```txt
ResizeSurfaceCommand
  -> validate runtime session, generation, mount and prior revision
  -> sample CSS size and device scale once
  -> apply named quality tier and physical-pixel budget
  -> coalesce or reject stale observations
  -> create one resize plan and target revision
  -> commit renderer, post-processing, camera and minimap adapters
  -> read back actual sizes and fallback state
  -> publish one SurfaceCommitResult
  -> require visible frames, debug records and captures to cite the revision
```

## Required guarantees

```txt
zero-area is a typed lifecycle result, not a silent return
surface revisions are monotonic within a runtime generation
main and minimap scaling follow named policies
renderer/composer/camera/minimap mutations converge before commit
actual physical sizes are observable
a stale observer callback cannot replace a newer revision
rendering readiness requires a valid committed surface
visible frames and captures cite surface identity and revision
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

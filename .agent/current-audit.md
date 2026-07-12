# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-11T23-18-16-04-00`

## Status

```txt
status: render-surface-resolution-frame-correlation-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-11T23-18-16-04-00-horror-corridor-render-surface-authority.md
```

## Summary

The main 3D canvas and minimap do not share one render-surface authority. `GameCanvas` caps the WebGL surface at DPR 1, while `Minimap` uses uncapped `window.devicePixelRatio`. Startup, ResizeObserver and window-resize paths directly mutate renderer, camera, EffectComposer and bloom state.

A zero-width or zero-height mount silently returns without a result. No surface ID, revision, product pixel budget, capability fallback, resize coalescing, requested/actual physical-size result or visible-frame correlation exists. Rendering readiness and the RAF can remain active while the latest size observation was implicitly rejected.

## Plan ledger

**Goal:** define one product-owned surface policy and commit result that synchronizes WebGL, post-processing, camera, minimap, readiness and visible-frame evidence.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Trace startup sizing, ResizeObserver, window resize, DPR, camera, composer, bloom and minimap sizing.
- [x] Identify the interaction loop, domains, all 29 implemented kits and offered services.
- [x] Define surface policy, identity, revision, admission, commit and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs` on `main`.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Product interaction loop

```txt
mode selection and lobby
  -> snapshot and runtime startup
  -> renderer, scene, camera, post-processing and world creation
  -> CSS size and browser DPR observation
  -> renderer/composer/bloom/camera sizing
  -> RAF simulation and render
  -> minimap independently samples DPR
  -> world, minimap, HUD and debug projection
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session lobby transport protocol and snapshot authority
runtime startup readiness lifecycle and cleanup
input pointer lock movement collision camera and host admission
interaction cube/slot claims anomaly outcome and ooze pressure
Three.js world renderer post-processing and bloom
render-surface observation policy sizing revision and frame correlation
minimap 2D surface sizing and projection
HUD debug validation build and deployment
```

## Implemented kits and services

The repository retains 29 source-backed kit responsibilities. Services cover application routing, session state, runtime snapshots, pause/completion projection, lobby presentation, PeerJS and BroadcastChannel transport, protocol construction, deterministic maze bootstrap, input, movement, network updates, interactions, anomaly evaluation, ooze, authoritative publication, RAF lifecycle, Three.js world construction, post-processing, minimap rendering, debug readback, cleanup and package validation.

The directly relevant implemented kits are:

```txt
corridor-render-world-kit       scene resources, update, attach and dispose
corridor-post-processing-kit    composer, bloom, output, resize, render and dispose
corridor-minimap-kit            2D surface sizing and entity projection
corridor-animation-loop-kit     RAF delta and lifecycle
runtime-debug-frame-kit         bounded frame/event readback
runtime-resource-cleanup-kit    observer/listener/GPU cleanup
```

## Source findings

```txt
main pixel ratio cap: 1
main size source: mount.clientWidth/clientHeight
minimap DPR source: uncapped window.devicePixelRatio
resize ingress: startup + ResizeObserver + window resize
resize coalescing: absent
surface identity/revision: absent
physical pixel budget: absent
actual drawing-buffer/target result: absent
zero-area typed result: absent
surface revision in readiness/debug/capture: absent
```

## Main finding

```txt
layout or DPR changes
  -> one or more direct resize callbacks
  -> renderer, composer, bloom and camera mutate
  -> minimap samples DPR separately
  -> no aggregate commit result
  -> no monotonic surface revision
  -> no frame/capture evidence for the applied surface
```

For a zero-area mount:

```txt
resize callback
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
  -> validate runtime generation, mount and prior revision
  -> sample CSS size and device scale once
  -> apply named quality tier and physical-pixel budget
  -> coalesce duplicates and reject stale observations
  -> commit renderer, post-processing, camera and minimap adapters
  -> read back actual physical sizes
  -> publish one SurfaceCommitResult
  -> require following frames, captures and debug records to cite the revision
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

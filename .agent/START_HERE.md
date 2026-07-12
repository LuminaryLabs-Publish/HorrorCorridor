# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-11T23-18-16-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, cube interactions, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded debug readback.

The current audit isolates render-surface authority. The main 3D surface caps device scale at 1, while the minimap uses uncapped browser DPR. ResizeObserver and window-resize callbacks directly mutate renderer, composer, bloom and camera state without one surface policy, revision, commit result or visible-frame receipt. Zero-area observations silently return while readiness and simulation can remain active.

## Current ledge

```txt
HorrorCorridor Render Surface Resolution and Frame Correlation Authority
+ Zero-Area / DPR Parity / Resize-Storm Fixture Gate
```

## Plan ledger

**Goal:** make every visible frame cite one committed surface revision derived from a named quality policy and shared renderer, post-processing, camera and minimap transaction.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Trace startup sizing, ResizeObserver, window resize, renderer, composer, bloom, camera, minimap and debug-frame readback.
- [x] Identify the interaction loop, domains, implemented kits and offered services.
- [x] Define surface policy, identity, revision, admission, commit and frame-correlation contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T23-18-16-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T23-18-16-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T23-18-16-04-00-render-surface-authority-dsk-map.md
.agent/render-audit/2026-07-11T23-18-16-04-00-main-minimap-surface-parity-gap.md
.agent/gameplay-audit/2026-07-11T23-18-16-04-00-zero-area-hidden-simulation-loop.md
.agent/interaction-audit/2026-07-11T23-18-16-04-00-resize-observation-commit-map.md
.agent/render-surface-audit/2026-07-11T23-18-16-04-00-resolution-revision-frame-contract.md
.agent/deploy-audit/2026-07-11T23-18-16-04-00-render-surface-fixture-gate.md
```

Retained prerequisite audits:

```txt
.agent/startup-authority-audit/2026-07-11T21-21-12-04-00-acquisition-ledger-first-frame-contract.md
.agent/randomness-audit/2026-07-11T19-38-14-04-00-seeded-stream-checkpoint-contract.md
.agent/transport-audit/2026-07-11T18-11-21-04-00-payload-budget-backpressure-contract.md
.agent/network-cadence-audit/2026-07-11T16-38-10-04-00-input-simulation-publication-clock-contract.md
.agent/disconnect-authority-audit/2026-07-11T16-21-09-04-00-player-retirement-owned-state-contract.md
.agent/movement-authority-audit/2026-07-11T03-08-43-04-00-player-update-admission-correction-contract.md
.agent/pause-authority-audit/2026-07-10T23-30-13-04-00-host-client-pause-resume-contract.md
```

## Product interaction loop

```txt
mode selection and lobby
  -> loading and snapshot bootstrap
  -> GameCanvas startup
  -> renderer, scene, camera, post and world acquisition
  -> CSS size and device scale observation
  -> renderer/composer/bloom/camera sizing
  -> RAF simulation and rendering
  -> minimap independently samples DPR and sizes its canvas
  -> world, minimap, HUD and debug projection
```

## Current surface split

```txt
main 3D canvas:
  pixelRatio = min(window.devicePixelRatio, 1)
  size = mount.clientWidth x mount.clientHeight

minimap:
  pixelRatio = window.devicePixelRatio
  size = 168 x 168 CSS pixels

resize ingress:
  ResizeObserver callback
  window resize callback
  startup onResize call
```

There is no shared product pixel budget, surface ID, surface revision, resize command, coalescing rule, requested/actual size readback, zero-area result or frame correlation.

## Required architecture

```txt
ResizeSurfaceCommand
  -> validate runtime generation and mount
  -> sample CSS size and device scale once
  -> apply named quality and pixel budget policy
  -> create one surface plan and revision
  -> commit renderer, post-processing, camera and minimap adapters
  -> read back actual physical sizes
  -> publish one SurfaceCommitResult
  -> require following frames and captures to cite the revision
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

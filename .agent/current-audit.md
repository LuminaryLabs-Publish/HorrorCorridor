# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-16T22-00-47-04-00`  
**Branch:** `main`  
**Status:** `runtime-frame-fault-containment-retirement-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is terminal asynchronous frame failure: the RAF controller schedules its successor only after the complete GameCanvas frame callback returns, while no fault latch, phase receipt, scheduler generation, retirement result or explicit restart transaction exists.

## Plan ledger

**Goal:** preserve accepted gameplay state while preventing a failed frame generation from continuing to own input, network, world or presentation resources.

- [x] Compare the full Publish inventory, central ledgers and root `.agent` states.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `animationLoop.ts`, `GameCanvas.tsx`, movement, collision, ooze and package validation surfaces.
- [x] Preserve all 29 kits, two adapters and offered services.
- [x] Confirm successor scheduling occurs after the unguarded frame callback.
- [x] Confirm cleanup is React-teardown-owned and not frame-fault-owned.
- [x] Add and route the timestamped runtime-fault audit family.
- [ ] Implement scheduler generation and named phase receipts.
- [ ] Implement exact-once terminal fault retirement.
- [ ] Implement explicit restart admission.
- [ ] Execute injected source, build and deployed-origin failures.

## Current frame path

```txt
RAF step
  -> calculate delta and elapsed
  -> call GameCanvas frame
    -> simulation or prediction
    -> network publication or send
    -> store synchronization
    -> camera and world update
    -> minimap draw
    -> optional debug capture
    -> post-processing render
  -> request successor RAF
```

## Main finding

```txt
any GameCanvas phase throws
  -> control never reaches successor requestAnimationFrame
  -> loop.running remains true
  -> no terminal fault state is published
  -> cleanupRuntime is not invoked
  -> listeners and transport subscription remain registered
  -> pointer lock and held input have no fault retirement path
  -> partial gameplay or visual mutations have no phase receipt
  -> no visible fault surface or bounded restart transaction exists
```

## Required authority

```txt
corridor-runtime-frame-fault-containment-retirement-authority-domain
```

## Required result

```txt
RuntimeFrameFaultResult
  failedPhase
  sessionRevision
  runtimeGeneration
  schedulerGeneration
  frameRevision
  appliedPhaseReceipts
  inputRetired
  pointerLockReleased
  publicationSuspended
  subscriptionsRetired
  resourcesSettled
  faultSurfaceRevision

FirstFaultFrameAck
RuntimeRestartAdmissionResult
```

## Claim boundary

Documentation only. The source-backed risk is an unclassified frozen runtime with partially applied frame work after an asynchronous exception. No player-facing crash was reproduced and no containment implementation is claimed.
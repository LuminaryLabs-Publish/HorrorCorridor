# HorrorCorridor Next Steps

**Updated:** `2026-07-13T11-58-45-04-00`

## Summary

Insert a WebGL context/resource recovery authority between browser context events and live renderer/composer/world ownership. Rendering readiness must become false on accepted loss and return only after one complete recovered generation produces an acknowledged visible frame.

## Plan ledger

**Goal:** replace opaque context restoration with generation-bound loss admission, complete resource preparation, probe validation, atomic adoption and recovered-frame proof.

### Documentation

- [x] Audit renderer, composer, animation loop and `GameCanvas` lifecycle.
- [x] Preserve the 29-kit inventory and full domain map.
- [x] Define the parent DSK and 21 child kits.
- [x] Add architecture, render, gameplay, interaction, lifecycle, deploy and central-sync audits.
- [x] Refresh root docs and machine registry.
- [x] Synchronize the central ledger and internal change log.

### Gate 1: identity and lifecycle

- [ ] Add stable `RenderSurfaceId`.
- [ ] Add monotonic `ContextGeneration` and `ResourceGeneration`.
- [ ] Add `Ready`, `Lost`, `Restoring`, `Failed` and `Disposed` states.
- [ ] Install `webglcontextlost` and `webglcontextrestored` adapters.
- [ ] Reject duplicate, stale and wrong-surface events with zero mutation.
- [ ] Prevent default on accepted loss only when recovery policy is active.

### Gate 2: submission and readiness

- [ ] Add a generation-bound render-submission lease.
- [ ] Reject world/composer submission while Lost, Restoring, Failed or Disposed.
- [ ] Set rendering readiness false on accepted loss.
- [ ] Expose lifecycle state through detached diagnostics.
- [ ] Add a WebGL-independent DOM/CSS fallback.

### Gate 3: gameplay/network liveness policy

- [ ] Define solo loss policy.
- [ ] Define host loss policy without silently stopping authority publication.
- [ ] Define client loss policy for transport reception and prediction.
- [ ] Ensure no duplicate tick, update or interaction request on recovery.
- [ ] Retire the failed frame-loop generation exactly once.

### Gate 4: resource manifests and preparation

- [ ] Describe renderer capabilities and drawing-buffer state.
- [ ] Describe composer, passes and render targets.
- [ ] Describe world meshes, materials, textures and disposal ownership.
- [ ] Prepare a complete detached successor generation.
- [ ] Reject incomplete or capability-incompatible candidates.

### Gate 5: probe and atomic adoption

- [ ] Apply the accepted viewport revision to the candidate.
- [ ] Submit one deterministic recovery probe frame.
- [ ] Publish `ProbeAccepted` or `ProbeFailed`.
- [ ] Adopt renderer, composer and world resources together or none.
- [ ] Start only one successor RAF generation.
- [ ] Dispose predecessor resources only after accepted adoption.

### Gate 6: visible proof

- [ ] Publish `ContextRecoveryResult`.
- [ ] Publish `FirstRecoveredFrameAck` with context/resource generations.
- [ ] Keep fallback visible until acknowledgement.
- [ ] Set rendering readiness true only after acknowledgement.
- [ ] Correlate debug and public readback with the recovered generation.

### Gate 7: fixtures

- [ ] Loss before first frame.
- [ ] Loss during solo, host and client frames.
- [ ] Loss while paused and completed.
- [ ] Restore before/after resize and DPR change.
- [ ] Renderer, composer and world preparation failure.
- [ ] Repeated loss during recovery.
- [ ] Unmount during recovery.
- [ ] Cold restart after failed recovery.
- [ ] Source, production build and deployed-origin parity.

## Dependency order

```txt
surface/context/resource identity
  -> context event admission
  -> submission lease and readiness retirement
  -> simulation/network loss policy
  -> complete resource candidate
  -> capability validation and probe
  -> atomic recovered-generation adoption
  -> first recovered frame acknowledgement
  -> fallback/readiness convergence
```

## Completion boundary

Do not claim context recovery, GPU-resource parity, presentation liveness or production readiness until the authority and fixture matrix pass on `main`. All retained session, transport, protocol, simulation and cross-store gaps remain open.
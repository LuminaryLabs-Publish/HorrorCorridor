# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-16T22-00-47-04-00`  
**Status:** `runtime-frame-fault-containment-retirement-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, client prediction, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates asynchronous runtime failure. The RAF controller invokes the complete frame before scheduling its successor. If simulation, publication, world update, minimap, debug capture or post-processing throws, no successor frame is queued, but the runtime generation is not terminally retired and cleanup is not invoked.

## Plan ledger

**Goal:** make every frame failure settle exactly once by retiring the scheduler generation, clearing active controls, suspending network work, settling resources and presenting one explicit terminal fault surface.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented, root-agent-missing or runtime-ahead priority case.
- [x] Select only HorrorCorridor under the oldest synchronized rule.
- [x] Preserve the complete 29-kit and two-adapter inventory.
- [x] Add the timestamped runtime frame-fault audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement phase receipts, terminal latching, retirement and restart admission.
- [ ] Execute phase-failure, source/build and deployed-origin fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-16T22-00-47-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-16T22-00-47-04-00-runtime-frame-fault-containment-dsk-map.md`
7. `.agent/render-audit/2026-07-16T22-00-47-04-00-unsettled-frame-fault-visible-surface-gap.md`
8. `.agent/gameplay-audit/2026-07-16T22-00-47-04-00-partial-frame-gameplay-mutation-loop.md`
9. `.agent/interaction-audit/2026-07-16T22-00-47-04-00-runtime-fault-command-result-map.md`
10. `.agent/runtime-fault-audit/2026-07-16T22-00-47-04-00-frame-generation-retirement-contract.md`
11. `.agent/deploy-audit/2026-07-16T22-00-47-04-00-runtime-fault-source-build-pages-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-16T22-00-47-04-00-oldest-selection-runtime-fault-reconciliation.md`

## Current authority boundary

```txt
corridor-runtime-frame-fault-containment-retirement-authority-domain
```

## Required transaction

```txt
RuntimeFrameExecutionCommand
  -> bind session, runtime, scheduler and frame revisions
  -> execute named phases with receipts
  -> publish a completed frame result

RuntimeFrameFaultCommand
  -> classify the failed phase
  -> latch the first terminal fault
  -> retire the scheduler generation
  -> clear input and release pointer lock
  -> suspend network work and retire subscriptions
  -> settle world, minimap, composer and GPU ownership
  -> publish RuntimeFrameFaultResult
  -> present one terminal fault surface
  -> publish FirstFaultFrameAck

RuntimeRestartAdmissionCommand
  -> require explicit user action
  -> create fresh runtime and scheduler generations
```

## Validation boundary

Documentation only. No frame-fault containment, clean restart, stale-callback safety, partial-frame integrity, artifact parity, deployed parity or production readiness is claimed.
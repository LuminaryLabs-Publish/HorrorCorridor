# HorrorCorridor Next Steps

**Updated:** `2026-07-16T22-00-47-04-00`

## Summary

The next implementation should preserve accepted host and client state while making any asynchronous frame failure terminal, observable, idempotent and explicitly restartable.

## Plan ledger

**Goal:** add the smallest authority layer that binds RAF scheduling, named frame phases, runtime retirement and fault presentation without restructuring gameplay domains.

- [ ] Add `SessionRevision`, `RuntimeGeneration`, `SchedulerGeneration`, `FrameRevision` and `FaultRevision`.
- [ ] Change the RAF controller so every callback validates its scheduler generation.
- [ ] Wrap frame execution in one fault boundary that always settles successor scheduling or retirement.
- [ ] Split the frame into named simulation, publication, store, camera, world, minimap, debug and present phases.
- [ ] Publish a receipt for each started, completed, skipped or failed phase.
- [ ] Latch only the first terminal failure for a runtime generation.
- [ ] Reject duplicate faults and callbacks from retired generations.
- [ ] Record which authoritative or predicted mutations completed before failure.
- [ ] Clear held movement, interaction, pause and look state.
- [ ] Release pointer lock and disable gameplay controls.
- [ ] Suspend host publication and client sends before another network cadence.
- [ ] Retire transport subscriptions owned by the failed runtime.
- [ ] Stop world, minimap, debug and post-processing projection.
- [ ] Dispose or quarantine GPU resources idempotently.
- [ ] Patch readiness to an explicit failed state.
- [ ] Publish `RuntimeFrameFaultResult`.
- [ ] Present a DOM-owned terminal fault surface and publish `FirstFaultFrameAck`.
- [ ] Add `RuntimeRestartAdmissionCommand` for clean restart or reload.
- [ ] Create deterministic failure injection for every named phase.
- [ ] Compare source, production build and deployed-origin behavior.

## Required implementation boundary

```txt
createAnimationLoop
  -> owns scheduler generation and callback admission

GameCanvas frame executor
  -> owns named phase execution and receipts

runtime fault authority
  -> owns terminal latch and retirement

React/UI projection
  -> consumes immutable fault state
  -> owns accessible restart gesture
```

## Completion checklist

- [ ] A thrown phase cannot leave `isRunning()` true without a pending accepted callback.
- [ ] No input is consumed after retirement.
- [ ] No network message is emitted after retirement.
- [ ] Cleanup can run more than once without double disposal.
- [ ] Only one terminal result is published.
- [ ] The fault surface receives focus and has a usable restart action.
- [ ] Restart creates fresh generations and listeners.
- [ ] Source, build and deployed fixtures pass on `main`.

## Completion gate

Do not claim crash containment or recoverability until every named phase can fail under a deterministic fixture and the runtime proves exact retirement, visible fault acknowledgement and clean restart on `main`.
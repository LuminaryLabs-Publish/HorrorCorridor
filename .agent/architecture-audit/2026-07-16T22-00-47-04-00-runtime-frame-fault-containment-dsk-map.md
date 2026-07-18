# Runtime Frame-Fault Containment DSK Map

**Timestamp:** `2026-07-16T22-00-47-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

## Summary

The active RAF controller owns scheduling but not fault settlement. The GameCanvas callback composes simulation, networking, world projection, minimap drawing, diagnostics and post-processing as one unguarded call. Cleanup exists, but only React effect teardown invokes it.

## Plan ledger

**Goal:** introduce one parent authority that binds frame identity, phase receipts, terminal fault latching, resource retirement and explicit restart admission.

- [x] Map current scheduling and phase ownership.
- [x] Preserve existing domain boundaries and 31 implemented surfaces.
- [x] Define one parent authority and 20 coordinating kits.
- [ ] Implement the authority without moving gameplay truth into React or Three.js.
- [ ] Prove exact retirement under injected failures.

## Current composition

```txt
corridor-animation-loop-kit
  -> calculates delta and elapsed time
  -> calls GameCanvas frame callback

GameCanvas frame callback
  -> input and UI snapshot
  -> local movement/collision
  -> host publication or client update
  -> store synchronization
  -> camera projection
  -> corridor-render-world-kit.update
  -> corridor-minimap-kit.draw
  -> runtime-debug-frame-kit.capture
  -> corridor-post-processing-kit.render

React effect teardown
  -> loop.stop
  -> transport unsubscribe
  -> listener and observer removal
  -> world/post-processing/renderer disposal
  -> readiness patch
```

## Gap

```txt
onFrame throws
  -> requestAnimationFrame successor is never reached
  -> loop.running is not cleared
  -> no FrameRevision or SchedulerGeneration is retired
  -> no named phase identifies the failure
  -> cleanupRuntime is not invoked
  -> no exact terminal result or restart command exists
```

## Required parent domain

```txt
corridor-runtime-frame-fault-containment-retirement-authority-domain
```

## Required DSK family

| DSK | Responsibility |
|---|---|
| `runtime-frame-execution-admission-kit` | Admit one frame against session, runtime, scheduler and frame revisions |
| `runtime-frame-generation-identity-kit` | Own scheduler generation and reject callbacks from retired generations |
| `named-frame-phase-receipt-kit` | Record started, applied, skipped and failed phase receipts |
| `frame-exception-classification-kit` | Normalize simulation, network, world, minimap, debug and render failures |
| `terminal-runtime-fault-latch-kit` | Accept the first terminal fault exactly once and suppress repeats |
| `stale-raf-callback-rejection-kit` | Reject callbacks that arrive after retirement or replacement |
| `partial-frame-mutation-settlement-kit` | Record which mutations were applied before failure and block further work |
| `held-input-retirement-on-fault-kit` | Clear held buttons, look deltas and one-shot actions |
| `pointer-lock-release-on-fault-kit` | Exit pointer lock and publish the resulting state |
| `network-publication-suspension-kit` | Stop host publication and client sends for the retired generation |
| `transport-subscription-retirement-kit` | Unsubscribe or quarantine transport events owned by the failed runtime |
| `world-update-retirement-kit` | Stop world animation and reject further snapshot projection |
| `minimap-projection-retirement-kit` | Stop Canvas2D mutation after terminal failure |
| `post-processing-retirement-kit` | Stop composer work and settle the failed present phase |
| `gpu-resource-fault-settlement-kit` | Dispose or quarantine world, composer and renderer ownership |
| `runtime-readiness-fault-projection-kit` | Mark simulation, rendering, networking and input readiness accurately |
| `runtime-frame-fault-result-kit` | Publish immutable fault classification, phase, revisions and retirement receipts |
| `first-fault-frame-ack-kit` | Acknowledge the first visible terminal fault surface |
| `runtime-restart-admission-kit` | Require explicit restart and create fresh runtime generations |
| `phase-failure-source-build-pages-fixture-kit` | Inject failures and compare source, build and deployed behavior |

## Command/result contract

```txt
RuntimeFrameExecutionCommand
  -> FramePhaseReceipt[]
  -> RuntimeFrameExecutionResult | RuntimeFrameFaultCommand

RuntimeFrameFaultCommand
  -> RuntimeFrameFaultResult
  -> FirstFaultFrameAck

RuntimeRestartAdmissionCommand
  -> RuntimeRestartAdmissionResult
```

## Invariants

```txt
one scheduler generation owns one RAF chain
only the first terminal failure retires that generation
no retired callback mutates state or presentation
held input and pointer lock do not survive terminal failure
network publication stops before another snapshot is emitted
cleanup is idempotent
restart creates fresh session/runtime/scheduler/frame revisions
```

Documentation only. No DSK listed here is implemented.
# Context Event to Resource Result Map

**Timestamp:** `2026-07-13T11-58-45-04-00`

## Summary

Raw browser context events currently have no product-owned admission or result path. This map defines the minimum identities, commands, participant receipts and terminal outcomes required before rendering or readiness can change.

## Plan ledger

**Goal:** convert context loss/restoration into typed, generation-bound interaction results with zero stale mutation.

- [x] Identify raw event source and current absence of listeners.
- [x] Identify renderer, composer, world, runtime and UI consumers.
- [x] Define command and result flow.
- [ ] Implement event adapters and generation checks.
- [ ] Add duplicate, stale, superseded and disposal cases.

## Event map

```txt
webglcontextlost
  -> WebGLContextLostSample
  -> ContextLossCommand
  -> validate surface and active context generation
  -> optionally preventDefault under recovery policy
  -> retire render-submission lease
  -> project rendering not-ready
  -> choose simulation/network continuation policy
  -> show fallback
  -> ContextLossResult

webglcontextrestored
  -> WebGLContextRestoredSample
  -> ContextRecoveryCommand
  -> validate predecessor loss generation
  -> allocate successor context/resource generation
  -> prepare renderer/composer/world candidates
  -> validate manifests and viewport
  -> submit recovery probe
  -> commit successor or retain Failed/Restoring state
  -> ContextRecoveryResult
  -> FirstRecoveredFrameAck
```

## Identities

```txt
RenderSurfaceId
RuntimeSessionId
ContextGeneration
ResourceGeneration
ViewportRevision
FrameLoopGeneration
RecoveryAttemptId
ProbeFrameId
```

## Participant receipts

```txt
RendererPreparationReceipt
ComposerPreparationReceipt
RenderTargetPreparationReceipt
WorldResourcePreparationReceipt
ViewportPreparationReceipt
FallbackProjectionReceipt
SimulationPolicyReceipt
NetworkPolicyReceipt
ProbeSubmissionReceipt
```

## Terminal results

```txt
AcceptedLost
DuplicateLost
RejectedStaleContext
RejectedWrongSurface
Restoring
Restored
RecoveryFailed
Superseded
Cancelled
Disposed
```

## Admission rules

```txt
loss for inactive context generation -> reject stale
second loss for same generation -> duplicate without second mutation
restore without accepted loss -> reject invalid predecessor
restore for retired surface -> disposed
newer loss during recovery -> supersede candidate
unmount during recovery -> cancel and dispose candidate
probe failure -> preserve failed/fallback state
probe success -> atomically adopt all resource participants
```

## Consumer results

```txt
render loop receives submission lease state
runtime readiness receives lifecycle state
UI receives fallback state
simulation receives continuation policy
network loop receives continuation policy
cleanup receives active and candidate resource ownership
GameHost/debug receives detached lifecycle observation
```

## Claims withheld

No claim is made that browser context events are currently admitted, correlated, recoverable or visible through diagnostics.
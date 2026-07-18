# Runtime Fault Command and Result Map

**Timestamp:** `2026-07-16T22-00-47-04-00`

## Summary

HorrorCorridor has input, pointer-lock, pause, interaction and restart controls, but no command/result chain for a terminal asynchronous runtime failure.

## Plan ledger

**Goal:** make fault retirement and restart explicit user-visible transactions rather than incidental consequences of an uncaught RAF exception.

- [x] Map active interaction listeners and fault-sensitive state.
- [x] Define fault and restart command/result surfaces.
- [ ] Implement idempotent retirement.
- [ ] Validate keyboard, pointer-lock, transport and restart behavior.

## Current interaction ownership

```txt
keydown
  -> pause, interact, settings or movement state
keyup
  -> release movement state
mousemove
  -> accumulate look delta while pointer locked
pointerlockchange
  -> update lock state and system pause
blur
  -> release pointer lock
```

If the frame callback throws, these listeners remain registered until React unmounts the component. No fault state prevents them from mutating the failed runtime's refs.

## Required command/result chain

```txt
RuntimeFrameFaultCommand
  input:
    sessionRevision
    runtimeGeneration
    schedulerGeneration
    frameRevision
    failedPhase
    normalizedError
    appliedPhaseReceipts

  result:
    accepted | duplicate | stale | already-retired
    inputRetired
    pointerLockReleased
    publicationSuspended
    subscriptionsRetired
    resourcesSettled
    faultSurfaceRevision

RuntimeRestartAdmissionCommand
  input:
    retiredRuntimeGeneration
    requestedMode: clean-restart | reload
    userGestureRevision

  result:
    accepted | rejected
    nextSessionRevision
    nextRuntimeGeneration
    nextSchedulerGeneration
```

## Required interaction behavior

```txt
terminal fault accepted
  -> movement and look state cleared
  -> interaction and pause one-shots cleared
  -> pointer lock released
  -> gameplay controls disabled
  -> terminal fault surface receives focus
  -> restart requires explicit activation
```

## Claim boundary

No runtime-fault command, result or accessible restart surface is implemented.
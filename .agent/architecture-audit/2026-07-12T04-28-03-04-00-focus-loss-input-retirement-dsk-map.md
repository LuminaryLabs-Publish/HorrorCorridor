# HorrorCorridor Focus-Loss Input Retirement DSK Map

**Timestamp:** `2026-07-12T04-28-03-04-00`

## Summary

The current player input domain stores held controls but has no authority that proves continued physical ownership after window focus or page visibility changes. Pointer-lock loss resets the input state, while unlocked movement has no equivalent retirement path.

## Parent domain

```txt
corridor-focus-loss-input-retirement-authority-domain
```

## Existing contributing domains

```txt
first-person-input-kit
  -> keyboard mapping
  -> held button state
  -> look deltas
  -> pointer-lock state
  -> input snapshot

movement-collision-camera-kit
  -> consumes movement axes each simulation frame

network-player-update-kit
  -> converts local state into client movement publication

ui-pause-projection-kit
  -> screen and pause state

runtime-resource-cleanup-kit
  -> removes listeners and stops the runtime
```

## Missing authority boundary

```txt
browser event adapters
  blur
  visibilitychange
  pagehide
  pointerlockchange
  pause and route transitions
  runtime stop/replacement

must converge into

InputRetirementCommand
  -> admission
  -> neutralization
  -> network retirement
  -> control-lease retirement
  -> typed result
  -> observation and frame acknowledgement
```

## Candidate DSK composition

```txt
corridor-focus-loss-input-retirement-authority-domain
  input-focus-state-kit
  input-control-lease-kit
  held-control-state-kit
  input-revision-kit
  focus-loss-event-adapter-kit
  visibility-loss-event-adapter-kit
  pagehide-input-adapter-kit
  pointer-lock-retirement-adapter-kit
  input-retirement-command-kit
  input-retirement-admission-kit
  input-neutralization-kit
  client-zero-input-publication-kit
  input-retirement-result-kit
  input-retirement-journal-kit
  stuck-input-fixture-kit
  focus-visibility-browser-smoke-kit
  client-zero-input-fixture-kit
  runtime-teardown-input-fixture-kit
```

## Domain-owned state

```txt
runtimeId
runId
sessionEpoch
inputRevision
controlLeaseId
focusState
visibilityState
pageActivityState
pointerLockState
heldButtons
lookDelta
lastRetirementResult
lastZeroInputPublication
boundedLifecycleJournal
```

## Command contract

```ts
InputRetirementCommand {
  commandId
  reason:
    | "window-blur"
    | "document-hidden"
    | "pagehide"
    | "pointer-lock-lost"
    | "pause"
    | "route-exit"
    | "transport-loss"
    | "runtime-stop"
    | "runtime-replacement"
  expectedRuntimeId
  expectedRunId
  expectedInputRevision
  expectedControlLeaseId
  requestedAtMs
}
```

## Admission statuses

```txt
Accepted
AcceptedAlreadyNeutral
Duplicate
RejectedStaleRuntime
RejectedStaleRun
RejectedStaleInputRevision
RejectedStaleControlLease
RejectedUnsupportedReason
FailedNeutralization
FailedZeroInputPublication
```

## Atomic neutralization contract

```txt
buttons.forward = false
buttons.back = false
buttons.left = false
buttons.right = false
buttons.interact = false
buttons.pause = false
lookDeltaX = 0
lookDeltaY = 0
pointerLocked = false
inputRevision += 1
controlLeaseId = null
```

The runtime-store input snapshot must be updated from this exact committed state before the next admitted simulation step.

## Client publication contract

A client with an admitted transport and active run may publish one final neutral update:

```txt
moveForward = 0
moveStrafe = 0
interact = false
inputRevision = committed retirement revision
controlLeaseId = retired lease
reason = input-retired
```

Duplicate browser events must not publish duplicate neutral updates. A stale run or transport must skip publication with a typed result rather than sending into a replacement session.

## Simulation admission contract

```txt
valid control lease + focused + visible + active page + PLAYING
  -> movement and interaction may be admitted

retired or absent control lease
  -> movement axes resolve to zero
  -> interaction edge resolves false
  -> look delta resolves zero
```

## Projection and observation

```txt
InputRetirementResult
  commandId
  status
  reason
  priorInputRevision
  committedInputRevision
  priorAxes
  committedAxes
  retiredControlLeaseId
  zeroInputPublicationStatus
  firstNeutralFrameId
```

## Integration order

```txt
runtime readiness and generation fencing
  -> input focus/control lease authority
  -> pause and route adapters
  -> simulation input admission
  -> client zero-input publication
  -> committed frame/debug observation
```

## Non-goals

```txt
changing movement speed
changing keyboard bindings
requiring pointer lock for movement
changing network transport
changing camera behavior
adding gameplay content
```

## Completion boundary

The domain is not complete until all ownership-loss events converge on one idempotent retirement transaction and fixtures prove no stale movement reaches the next simulation or network publication frame.
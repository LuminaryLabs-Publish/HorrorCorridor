# HorrorCorridor Held-Control Lease and Neutralization Contract

**Timestamp:** `2026-07-12T04-28-03-04-00`

## Purpose

Define the authoritative lifecycle for held keyboard controls so a control state cannot survive loss of browser, route, session or runtime ownership.

## Control lease

```ts
InputControlLease {
  leaseId
  runtimeId
  runId
  sessionEpoch
  inputRevision
  acquiredAtMs
  focusRevision
  visibilityRevision
  pointerLockMode
  status: "active" | "retiring" | "retired"
}
```

A lease is required for movement, look and interaction admission. It is not equivalent to pointer lock; unlocked keyboard movement may hold a valid lease while the page is focused and visible.

## Lease acquisition

```txt
new physical keydown or admitted pointer movement
  -> page focused
  -> document visible
  -> active runtime and run
  -> screen permits gameplay input
  -> create or renew control lease
  -> advance input revision
```

Focus regain alone never reacquires a lease.

## Lease retirement triggers

```txt
window blur
document hidden
pagehide
pointer lock lost
manual pause
system pause
route exit
completion
transport/session loss
runtime stop
runtime replacement
component unmount
```

## Neutral state

```ts
PlayerInputState {
  buttons: {
    forward: false,
    back: false,
    left: false,
    right: false,
    interact: false,
    pause: false
  },
  lookDeltaX: 0,
  lookDeltaY: 0,
  pointerLocked: false
}
```

## Retirement transaction

```txt
1. Capture command, runtime, run, input revision and lease.
2. Reject stale identities without mutation.
3. Mark lease retiring and block new simulation consumption.
4. Commit the canonical neutral input state.
5. Advance input revision exactly once.
6. Project the neutral snapshot to runtimeStore.
7. Publish one zero-input client message when eligible.
8. Mark the lease retired.
9. Publish InputRetirementResult.
10. Acknowledge the first frame that consumed the neutral revision.
```

## Idempotence

```txt
same commandId
  -> Duplicate

same prior inputRevision and lease after committed retirement
  -> AcceptedAlreadyNeutral

stale runtime/run/lease
  -> rejected with zero mutation and zero network send
```

## Client zero-input publication

The final client update must be bounded and sequenced:

```txt
moveForward: 0
moveStrafe: 0
interact: false
lookYaw: last admitted finite yaw
pose: last committed local pose
inputRevision: committed retirement revision
controlLeaseId: retired lease ID
reason: input-retired
```

The update is a retirement acknowledgement, not permission to move. If the transport or run is stale, the result records `SkippedStaleTransport` or `SkippedStaleRun`.

## Host admission

The host should reject later movement updates that cite:

```txt
retired control lease
older input revision
older run/session epoch
duplicate sequence
```

## Frame proof

The first frame following accepted retirement must record:

```txt
inputRevision = committed revision
controlLeaseId = null
moveForward = 0
moveStrafe = 0
interact = false
lookDeltaX = 0
lookDeltaY = 0
```

## Fixtures

```txt
unlocked blur and missed keyup
pointer-locked blur
blur + pointerlockchange duplicate convergence
visibility hidden
pagehide
pause while moving
route exit while moving
runtime unmount while moving
client zero-input exactly once
host stale lease rejection
focus regain without new input
```

## Completion boundary

The contract is incomplete until neutralization is atomic, event convergence is idempotent, client retirement is bounded and the first post-loss frame proves zero input.
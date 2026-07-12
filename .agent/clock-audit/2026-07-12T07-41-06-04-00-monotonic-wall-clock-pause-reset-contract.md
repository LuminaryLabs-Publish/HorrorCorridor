# Monotonic, Wall-Clock, Pause and Reset Contract

**Timestamp:** `2026-07-12T07-41-06-04-00`

## Clock classes

```txt
simulation clock
  monotonic
  authoritative for fixed steps, cadence and gameplay timers
  freezes or advances only by explicit lifecycle policy

render clock
  derived from the committed frame plan
  authoritative for camera and world animation
  cites simulation clock revision

UTC observation clock
  non-authoritative metadata
  used for logs, external timestamps and human display
  allowed to jump without changing gameplay
```

## Lifecycle policy

```txt
ACTIVE
  admit bounded monotonic deltas
  produce zero or more fixed steps
  produce one render-time projection

PAUSED
  simulation elapsed and step sequence freeze
  UTC observations may continue
  rendering policy is explicit

RESUMING
  allocate resume generation
  reject predecessor samples
  admit first bounded sample without catch-up burst
  acknowledge first resumed visible frame

RESETTING
  allocate reset generation and new clock origin
  clear accumulator and cadence state
  reject stale snapshot, callback and sample results

TERMINAL/DISPOSED
  reject new gameplay time and steps
```

## Snapshot projection

```txt
clockId
clockRevision
runtimeGeneration
runEpoch
simulationStep
simulationTimeMs
pauseState
resumeGeneration
resetGeneration
observedUtcMs
```

`observedUtcMs` is diagnostic only. Snapshot acceptance and replay must use the monotonic fields.

## Discontinuity policy

```txt
backward UTC jump
  record observation only
  no gameplay effect

large monotonic delta
  classify stall
  apply step and CPU budgets
  report simulated, deferred and dropped time

source reset
  require admitted runtime/reset generation
  never infer a reset from a negative delta
```

## Proof obligations

```txt
system clock changes do not alter gameplay cadence
pause never consumes simulation time or RNG
resume never performs unbounded catch-up
reset starts a new clock generation
snapshot restore resumes from serialized simulation time
render and snapshot receipts cite one clock revision
```

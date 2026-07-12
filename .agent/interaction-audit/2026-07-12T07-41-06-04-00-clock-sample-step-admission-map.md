# Clock Sample and Step Admission Map

**Timestamp:** `2026-07-12T07-41-06-04-00`

## Input surfaces

```txt
requestAnimationFrame timestamp
performance.now monotonic sample
Date.now UTC observation
pause command
resume command
reset command
visibility/focus transition
snapshot restore or reconnect
```

## Admission map

```txt
ClockSampleCommand
  -> require runtime generation and clock ID
  -> require source identity and prior accepted revision
  -> reject duplicate or stale sample
  -> classify normal, regressed, jumped, stalled or reset source
  -> apply active, paused, resuming or resetting policy
  -> apply maximum delta and step budget
  -> commit ClockSampleResult

ClockSampleResult
  -> accepted clock revision
  -> raw and admitted delta
  -> simulation elapsed time
  -> step sequence range
  -> deferred or dropped time
  -> discontinuity classification
  -> UTC observation metadata
```

## Consumer admission

```txt
movement and collision
  require admitted simulation step

ooze spawn and decay
  require authoritative simulation time

network publication and client update cadence
  require cadence decision from the same clock revision

snapshot construction
  require clock projection receipt

camera/world/minimap/debug rendering
  require render-time projection from the committed frame plan

pause/resume/reset
  create explicit clock state transitions and generations
```

## Rejection reasons

```txt
wrong runtime generation
wrong clock ID
stale prior revision
duplicate sample
non-finite value
regressed sample without reset admission
large jump beyond policy
sample while terminal or disposed
step budget exhausted
stale resume/reset generation
```

## Result invariant

No gameplay, networking or rendering consumer may infer elapsed time directly from ambient browser clocks after the clock authority is introduced.

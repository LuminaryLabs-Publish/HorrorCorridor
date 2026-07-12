# Wall-Clock Jump Cadence and Ooze Loop

**Timestamp:** `2026-07-12T07-41-06-04-00`

## Current loop

```txt
frame begins
  -> recordedAtMs = Date.now()
  -> compare against lastNetworkTickAtMs
  -> when threshold passes, advance ooze with recordedAtMs
  -> publish snapshot stamped with recordedAtMs
  -> set lastNetworkTickAtMs = recordedAtMs
```

`decayOozeTrail()` also compares `input.nowMs` with `state.lastOozeDecayTime` and writes the new wall timestamp back into gameplay state.

## Backward adjustment

```txt
accepted wall time: 100000
system clock corrected to: 90000

recordedAtMs - lastNetworkTickAtMs < 0
  -> publication remains ineligible
  -> ooze advancement remains ineligible
  -> UI cadence can remain ineligible
  -> RAF movement/render loop continues
```

## Forward adjustment

```txt
accepted wall time: 100000
system clock jumps to: 500000

cadence window immediately rolls
network publication immediately qualifies
ooze decay immediately qualifies
snapshot timestamps jump without a simulation-step explanation
```

## Consequences

```txt
real-world clock maintenance can alter gameplay cadence
same accepted inputs can produce different temporal outcomes
snapshot restore inherits an ambient wall-time dependency
pause/resume behavior depends on elapsed wall time rather than an explicit policy
rendered motion can continue while authoritative cadence stalls
```

## Required gameplay policy

Use monotonic authoritative simulation time for cadence and ooze decay. Keep UTC only as non-authoritative observation metadata. Large deltas must be bounded and reported as simulated, deferred or dropped time; they must not silently become gameplay advancement.

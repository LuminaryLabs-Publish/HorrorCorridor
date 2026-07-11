# Gameplay Audit: Client Update and Ooze Starvation Loop

**Timestamp:** `2026-07-11T16-38-10-04-00`

## Summary

The host advances ooze only when enough time has elapsed since `lastNetworkTickAtMs`. Every authoritative publication resets that timestamp, including publications caused by remote `PLAYER_UPDATE` messages. Continuous client traffic can therefore keep the host below the ooze threshold indefinitely.

## Plan ledger

**Goal:** ensure all authoritative gameplay systems advance from a fixed simulation clock that cannot be postponed by message or publication activity.

- [x] Trace remote player update application.
- [x] Trace snapshot publication side effects.
- [x] Trace ooze advancement admission.
- [x] Demonstrate the shared timestamp starvation path.
- [x] Identify tick-speed dependence on player count.
- [ ] Add deterministic starvation and multi-peer fixtures.

## Current loop

```txt
host RAF
  if PLAYING
    -> advance host-local player pose
    -> if recordedAtMs - lastNetworkTickAtMs >= NETWORK_TICK_RATE
         -> advanceOozeTrail
         -> publishAuthoritativeState

host transport callback
  for every PLAYER_UPDATE
    -> apply absolute remote pose
    -> sync held cubes
    -> publishAuthoritativeState
         -> lastNetworkTickAtMs = now
```

## Starvation scenario

```txt
remote client sends at or above the host threshold frequency
  -> host receives update
  -> host publishes immediately
  -> shared timestamp resets
  -> next RAF sees insufficient elapsed time
  -> ooze step is skipped
  -> another remote update arrives and resets timestamp again
  -> repeat
```

The host continues to produce snapshots and increment ticks, but ooze progression can stop.

## Player-count dependence

With multiple clients, any one arriving update resets the shared timestamp. The probability that the host reaches a quiet interval long enough to advance periodic systems decreases as connected-client traffic increases.

This means:

```txt
single-player/solo behavior
  != one-client host behavior
  != multi-client host behavior
```

not because of explicit gameplay design, but because network arrival timing controls system admission.

## Other affected systems

The current concrete victim is ooze advancement. The same architecture would affect any future system placed behind the shared publication-age condition:

```txt
decay
spawn timers
damage-over-time
objective timers
AI updates
resource regeneration
environmental hazards
```

## Required gameplay step

```txt
fixed host step
  -> select admitted input for every active player
  -> validate and apply movement/collision
  -> synchronize held cubes
  -> advance ooze once
  -> evaluate interactions/objective/terminal state as scheduled
  -> commit state revision
  -> mark snapshot dirty
```

Snapshot publication must occur after commitment under its own cadence policy.

## Required fixtures

```txt
no clients -> ooze advances at fixed expected steps
one normal client -> same ooze step count
multiple normal clients -> same ooze step count
one flood client -> bounded accepted inputs and unchanged ooze step count
continuous publications -> do not postpone simulation
pause -> both simulation and gameplay timers suspend under explicit policy
resume -> no wall-clock catch-up burst unless specified
```

## Acceptance criteria

```txt
a fixed wall-clock test window yields the same authoritative step count across peer counts
accepted client sequences are visible in each step result
ooze progression derives only from committed step sequence
snapshot publication count may differ from step count only under a documented event policy
network traffic cannot reduce authoritative system advancement
```

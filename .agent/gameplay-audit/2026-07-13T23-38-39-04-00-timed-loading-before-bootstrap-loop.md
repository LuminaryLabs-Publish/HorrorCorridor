# HorrorCorridor Gameplay Audit: Timed Loading Before Bootstrap

**Timestamp:** `2026-07-13T23-38-39-04-00`

## Loop

```txt
player selects solo or host start
  -> five fixed-duration loading rows advance
  -> no maze, object, material or lighting result is produced by those rows
  -> actual maze bootstrap executes after the rows
  -> state is committed and gameplay route opens
  -> visual world construction begins afterward
```

## Gameplay consequence

The loading duration is almost constant while actual work can vary. Slow devices can enter play before visual resources settle. Fast devices still wait for artificial timers. Cancellation, route replacement and session replacement do not stop the continuation.

The client path is different again: an accepted `SYNC` commits readiness and enters play without running the loading plan.

## Required gameplay contract

```txt
LoadPlan
  bootstrap maze
  prepare replicated state
  prepare renderer provider
  prepare scene and world resources
  attach input only after visual readiness
  commit playable route

Each step
  -> Accepted | Failed | Cancelled | TimedOut | Stale | Superseded
```

## Invariants

- No player input before the accepted playable commit.
- No active simulation before bootstrap settlement.
- Host, solo and client readiness derive from compatible evidence.
- A replaced route or session cannot later reopen gameplay.
- Failure leaves a usable predecessor screen with a typed retry path.
# Presentation Loss and Simulation Liveness Loop

**Timestamp:** `2026-07-13T11-58-45-04-00`

## Summary

Gameplay, networking and rendering share one RAF callback. Context loss therefore needs an explicit policy: pause all work, continue bounded simulation/network work without GPU submission, or terminate the run. The current code owns no such result.

## Plan ledger

**Goal:** prevent presentation failure from silently changing simulation, host publication or client update liveness.

- [x] Trace solo, host, client and replay frame branches.
- [x] Trace render submission and successor scheduling.
- [x] Confirm no presentation-loss gameplay policy exists.
- [ ] Define mode-specific continuation policy.
- [ ] Fence rendering without losing authoritative state ownership.
- [ ] Prove recovery does not duplicate ticks, interactions or network sends.

## Current loop

```txt
RAF
  -> read UI state
  -> advance solo/host/client work
  -> possibly publish or send network state
  -> sync runtime stores
  -> update world/minimap/debug
  -> submit post-processing render
  -> schedule successor RAF
```

## Current risk

```txt
render submission fails or context becomes unusable
  -> prior simulation/network mutations may already be committed
  -> no terminal frame result describes that partial frame
  -> successor RAF may not be scheduled if callback throws
  -> host cadence, client updates and UI synchronization may stop
  -> readiness may still report rendering true
```

## Required mode policy

```txt
solo
  default: pause simulation until a recovered generation is accepted

host
  choose explicitly between bounded headless authority and full pause
  never let presentation loss silently stop replication

client
  allow bounded transport reception and snapshot buffering
  stop local prediction if frame/simulation policy requires it

paused/completed
  preserve terminal state and allow recovery without restarting gameplay
```

## Required liveness receipts

```txt
PresentationLossPolicyResult
SimulationContinuationResult
NetworkContinuationResult
FrameLoopRetirementResult
FrameLoopRestartResult
RecoveredGameplayFrameAck
```

## Zero-duplication requirements

```txt
no duplicate authoritative tick
no duplicate PLAYER_UPDATE
no duplicate interaction request
no repeated completion transition
no stale input replay after recovery
no second live RAF generation
```

## Claims withheld

No claim is made that gameplay or networking remains live, pauses coherently, or resumes exactly once after context loss.
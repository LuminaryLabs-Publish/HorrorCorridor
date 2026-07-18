# Frame Generation Retirement Contract

**Timestamp:** `2026-07-16T22-00-47-04-00`

## Summary

The animation-loop controller stores `running`, `previousTimeMs` and the last RAF identifier, but it does not own a scheduler generation or terminal state. A thrown callback bypasses successor scheduling and leaves `running === true` without an active callback.

## Plan ledger

**Goal:** make frame execution generation-bound, terminally faultable and safely restartable.

- [x] Confirm current callback and scheduling order.
- [x] Confirm teardown is effect-owned rather than fault-owned.
- [x] Define retirement and restart invariants.
- [ ] Implement generation checks and fault latching.
- [ ] Prove exact-once retirement under every injected phase failure.

## Source-backed state machine today

```txt
stopped
  -> start()
  -> running = true
  -> request RAF

RAF callback
  -> if not running return
  -> calculate delta
  -> call onFrame
  -> request successor RAF

stop()
  -> running = false
  -> reset previous time
  -> cancel stored RAF id
```

## Unrepresented state

```txt
onFrame throws
  -> callback exits before successor request
  -> running remains true
  -> stored RAF id refers to the completed callback
  -> isRunning() reports true
  -> stop() has no fault classification or phase receipts
```

## Required state machine

```txt
idle
  -> running(generation N)
  -> completed frame
  -> running(generation N)

running(generation N)
  -> terminal phase failure
  -> faulting(generation N)
  -> retired(generation N)
  -> FirstFaultFrameAck

retired(generation N)
  -> explicit restart admission
  -> running(generation N+1)
```

## Exact retirement order

1. Latch the first terminal failure.
2. Mark scheduler generation retired.
3. Reject pending or late callbacks for that generation.
4. Stop input consumption and clear held state.
5. Release pointer lock.
6. Suspend host publication and client sends.
7. Retire transport subscriptions owned by the runtime.
8. Stop world, minimap and composer projection.
9. Dispose or quarantine GPU resources idempotently.
10. Publish readiness and fault results.
11. Present and acknowledge one terminal fault surface.

## Failure classifications

```txt
simulation
collision
network-send
network-publication
store-projection
camera
world-update
minimap
runtime-debug
post-processing
cleanup
unknown
```

## Claim boundary

The contract is documentation only. The current runtime does not implement scheduler generations, phase receipts, fault latching or exact retirement.
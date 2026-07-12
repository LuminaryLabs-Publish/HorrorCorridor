# HorrorCorridor Frame-Failure Quarantine, Disposal and Cold-Restart Contract

**Timestamp:** `2026-07-12T05-59-28-04-00`

## Summary

A frame exception currently leaves the runtime neither running correctly nor stopped. The RAF chain is gone, but the loop reports running; the scene, renderer, transport subscription, observers, input listeners, readiness flags and public stores remain live until React eventually unmounts the component.

## Plan ledger

**Goal:** define the terminal lifecycle from first frame failure through capability quarantine, last-known-good retention, ordered cleanup and replacement-runtime admission.

- [x] Identify resources acquired by `GameCanvas`.
- [x] Identify cleanup currently bound to effect teardown.
- [x] Identify capabilities that remain reachable after a dead frame.
- [x] Define quarantine state and revocation order.
- [x] Define disposal receipts.
- [x] Define cold-restart admission.
- [x] Define replacement-frame acknowledgement.
- [ ] Implement and fault-test the lifecycle.

## Current post-failure state

```txt
loop.running: true
future RAF scheduled: no
simulation readiness: unchanged
rendering readiness: unchanged
input readiness: unchanged
networking readiness: unchanged
window key listeners: live
mouse and pointer-lock listeners: live
resize observer: live
transport subscription: live
world and GPU resources: live
canvas: mounted
runtime stores: mutable
screen: usually PLAYING
fatal UI: absent
```

## Required failure state

```txt
RuntimeFailureState
  failureId
  runtimeId
  runtimeGeneration
  runId
  frameId
  stageId
  lifecycle: quarantining | frozen | disposing | terminal | restarting
  lastKnownGoodFrameId
  escapedMutationReceipts
  readinessRevision
  disposalPlanId
  terminalResult
```

## Quarantine order

```txt
1. atomically admit the first failure
2. reject successor frame admission
3. retire held input and pointer-lock lease
4. fence interaction and movement commands
5. fence host publication and client sends
6. revoke simulation, rendering and input readiness
7. freeze the visible surface at the last-known-good frame
8. project a bounded failure overlay outside the damaged render graph
9. unsubscribe transport callbacks or mark them read-only
10. begin ordered disposal or explicit retained-frozen policy
```

## Disposal order

```txt
stop frame controller
retire input and pointer lock
unsubscribe transport events
remove window/document listeners
disconnect resize observer
detach world from scene
dispose world resources
dispose post-processing resources
dispose renderer resources
remove renderer canvas
clear or terminalize debug/public capabilities
publish disposal receipts and terminal observation
```

Every operation must return `disposed`, `already-disposed`, `retained`, or `failed` and be safe to repeat.

## Cold restart

```txt
ColdRestartCommand
  expectedFailureId
  expectedRuntimeGeneration
  requestedSessionMode
  preservedSessionPolicy

admission
  require predecessor terminal or retained-frozen state
  require no mutation-capable predecessor lease
  allocate new runtime generation
  rebuild from an admitted authoritative snapshot
  reacquire renderer, scene, camera, post, world and listeners
  keep readiness false
  commit first replacement frame
  then publish readiness and remove failure overlay
```

## Prohibited behavior

```txt
reusing the damaged renderer/composer without an explicit recovery result
clearing the error while predecessor listeners remain live
restoring readiness before first replacement frame
accepting predecessor transport callbacks into the new generation
retaining held input across restart
calling the existing loop.start() while running remains incorrectly true
```

## Required proof

```txt
one fault produces one failureId
all mutation paths reject after quarantine
cleanup is complete or explicitly reports retained resources
repeated cleanup is idempotent
restart allocates a new runtime generation
predecessor callbacks cannot mutate replacement state
first replacement frame and readiness share one acknowledgement
```
# HorrorCorridor Next Steps

**Updated:** `2026-07-14T16-00-05-04-00`

## Summary

Add one narrow page-lifecycle authority around the existing `GameCanvas` runtime. It should suspend local input, RAF and outbound work, preserve accepted snapshot truth, classify BFCache restoration, revalidate mandatory participants and prove the first resumed frame.

## Plan ledger

**Goal:** implement lifecycle safety without replacing existing input, transport, snapshot or rendering kits.

### Documentation

- [x] Audit visibility, pagehide/pageshow, freeze/resume, RAF, input, transport, rendering and cleanup.
- [x] Preserve the 29-kit and two-adapter inventory.
- [x] Define the parent authority and fixture gate.

### Gate 1: lifecycle identity and event admission

- [ ] Add `DocumentGeneration`, `LifecycleAttemptId` and `RuntimeGeneration`.
- [ ] Normalize visibility, pagehide, pageshow, freeze and resume events.
- [ ] Classify persisted BFCache transitions separately from normal navigation.
- [ ] Reject duplicate, stale and superseded lifecycle work.

### Gate 2: suspension settlement

- [ ] Clear held movement, look, interaction and pause input.
- [ ] Release pointer lock with a typed receipt.
- [ ] Stop one accepted RAF generation and checkpoint the render clock.
- [ ] Suspend client sends and define host publication policy.
- [ ] Preserve or buffer passive snapshots under an explicit budget.

### Gate 3: checkpoint and transport policy

- [ ] Fingerprint session, snapshot, pose, outcome, transport and renderer state.
- [ ] Decide preserve, close or reconnect behavior for each lifecycle class.
- [ ] Retire resources on non-persisted pagehide.
- [ ] Preserve only BFCache-safe participants on persisted pagehide.

### Gate 4: resume admission

- [ ] Revalidate renderer, WebGL context, world, composer, viewport, listeners and transport.
- [ ] Reconcile the latest accepted snapshot before movement resumes.
- [ ] Reject predecessor RAF and transport callbacks.
- [ ] Atomically adopt exactly one successor runtime generation.
- [ ] Require fresh keyboard and pointer gestures.

### Gate 5: visible proof

- [ ] Bind the first resumed world, minimap and debug frame to the accepted generations.
- [ ] Publish `PageLifecycleResult` and participant receipts.
- [ ] Publish `FirstResumedRuntimeFrameAck`.
- [ ] Verify source, production build and deployed origin.

### Gate 6: fixtures

- [ ] Hold and release keys across hidden state.
- [ ] Hide and resume while pointer locked.
- [ ] Suspend host and client roles independently.
- [ ] Exercise persisted and non-persisted pagehide.
- [ ] Inject transport disconnect and WebGL invalidation while suspended.
- [ ] Inject stale RAF and transport callbacks.
- [ ] Repeat lifecycle events and verify one successor generation.

## Dependency order

```txt
lifecycle identity
  -> input and local-command retirement
  -> RAF and network suspension lease
  -> checkpoint and BFCache policy
  -> participant revalidation
  -> atomic resume adoption
  -> first resumed-frame proof
  -> source/build/deployed fixtures
```

## Completion boundary

Do not claim BFCache compatibility, safe multiplayer resume or resumed-frame convergence until the complete fixture matrix passes on `main`.
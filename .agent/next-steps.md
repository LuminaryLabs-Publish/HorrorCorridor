# HorrorCorridor Next Steps

**Updated:** `2026-07-11T18-11-21-04-00`

## Plan ledger

**Goal:** preserve the existing identity, lifecycle, fixed-simulation and movement prerequisites, then make snapshot publication and delivery bounded, per-peer, reversible and frame-correlated.

### Gate 1: roster identity and peer binding

- [ ] Define canonical member, peer, player and slot identities.
- [ ] Bind every connection ID to one admitted actor.
- [ ] Add monotonic roster revision and fingerprint.

### Gate 2: transport actor and message admission

- [ ] Require connection, envelope sender and payload actor convergence.
- [ ] Admit room, run, epoch, request ID and sequence before mutation.
- [ ] Add typed accepted, rejected, duplicate, stale and no-change results.

### Gate 3: lobby start transaction

- [ ] Seal one roster revision and fingerprint.
- [ ] Allocate start transaction, run session and session epoch IDs.
- [ ] Correlate bootstrap, START_GAME, initial SYNC, acknowledgements and first frame.

### Gate 4: run exit and runtime readiness

- [ ] Advance epoch before old runtime disposal.
- [ ] Quarantine prior-run messages and snapshots.
- [ ] Require provider leases and first-frame proof before runtime readiness.

### Gate 5: snapshot, interaction, disconnect and terminal authority

- [ ] Enforce monotonic snapshot sender, run, epoch, sequence and revision admission.
- [ ] Require explicit cube/slot target identities and observed revisions.
- [ ] Atomically retire disconnected actors and resolve owned state.
- [ ] Make victory/failure monotonic under one terminal outcome revision.

### Gate 6: host cadence and fixed simulation

- [ ] Admit `PLAYER_UPDATE.payload.input.sequence` per actor.
- [ ] Add bounded per-player input queues and deterministic coalescing.
- [ ] Advance movement, collision, held cubes, ooze and objective systems from one fixed step.
- [ ] Separate simulation-step identity from snapshot publication identity.
- [ ] Stop using `lastNetworkTickAtMs` as send, publication and gameplay-system clock.

### Gate 6a: movement admission and reconciliation

- [ ] Validate speed, displacement, acceleration, collision and timestamp skew.
- [ ] Apply accepted movement only at fixed-step boundaries.
- [ ] Return movement results tied to input and simulation-step sequences.
- [ ] Reconcile client prediction against accepted host results.

### Gate 6b: snapshot delivery and backpressure authority

- [ ] Add a `SnapshotPublicationIntent` tied to one committed state revision.
- [ ] Build one canonical snapshot payload per publication.
- [ ] Measure serialized byte size before fanout.
- [ ] Compute one stable payload fingerprint.
- [ ] Define full-versus-delta and dirty-state policy.
- [ ] Capture the intended peer set before sending.
- [ ] Read per-peer open, pending-buffer and queue state.
- [ ] Admit or reject each peer through one backpressure policy.
- [ ] Wrap each send in a typed result with duration and exception classification.
- [ ] Produce sent, skipped, closed, failed, timed-out and backpressured rows.
- [ ] Commit partial success without losing healthy-peer results.
- [ ] Add bounded retry, coalescing and supersession policy.
- [ ] Isolate or disconnect persistently slow peers under explicit policy.
- [ ] Record publication and delivery results in a bounded journal.
- [ ] Correlate accepted client snapshot and first visible frame with publication identity.

### Gate 6b fixture set

- [ ] `fixture:snapshot-single-build`
- [ ] `fixture:snapshot-payload-fingerprint`
- [ ] `fixture:snapshot-payload-byte-budget`
- [ ] `fixture:snapshot-full-delta-policy`
- [ ] `fixture:delivery-intended-peer-set`
- [ ] `fixture:delivery-all-open-peers`
- [ ] `fixture:delivery-closed-peer`
- [ ] `fixture:delivery-send-exception`
- [ ] `fixture:delivery-partial-success`
- [ ] `fixture:delivery-backpressured-peer`
- [ ] `fixture:delivery-slow-peer-isolation`
- [ ] `fixture:delivery-retry-coalescing-budget`
- [ ] `fixture:delivery-publication-frame-correlation`
- [ ] Browser and Pages slow-peer fanout smoke.

### Gate 7: pause and resume

- [ ] Reuse the retained pause-authority audit.
- [ ] Suspend input selection, simulation and publication atomically.
- [ ] Require host/client pause-state convergence.

## Recommended snapshot-delivery DSKs

```txt
snapshot-publication-intent-kit
canonical-snapshot-payload-kit
snapshot-payload-byte-budget-kit
snapshot-payload-fingerprint-kit
snapshot-full-delta-policy-kit
snapshot-delivery-plan-kit
peer-send-capability-kit
peer-send-admission-kit
per-peer-backpressure-state-kit
per-peer-delivery-result-kit
snapshot-delivery-commit-kit
snapshot-delivery-retry-kit
slow-peer-isolation-kit
snapshot-delivery-journal-kit
snapshot-delivery-observation-kit
snapshot-delivery-fixture-kit
browser-slow-peer-smoke-kit
```

## Required proof

```txt
same committed state revision produces one canonical payload and fingerprint
payload size is measured before any peer send
all intended peers produce exactly one typed result row
closed, failed and backpressured peers do not erase healthy-peer success
send exceptions cannot abort the remaining peer plan silently
queued and retried payloads remain bounded
newer snapshots supersede stale queued snapshots deterministically
one slow peer cannot increase global simulation or publication work without limit
accepted snapshot and first rendered frame cite the same publication identity
```

## Do not start with

```txt
catching connection.send and returning false without per-peer results
adding an arbitrary global timeout around broadcast
publishing fewer full snapshots without fixed-step and dirty-state policy
client-side throttling as the only backpressure guard
unbounded retry queues
compressing payloads before measuring and classifying current costs
UI-only network metrics
```

Those changes would mask delivery pressure without establishing canonical payload identity, bounded fanout or per-peer transaction results.

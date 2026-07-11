# HorrorCorridor Next Steps

**Updated:** `2026-07-11T13-20-45-04-00`

## Plan ledger

**Goal:** finish canonical roster, actor, start, run-epoch and snapshot foundations, then implement one monotonic terminal-outcome authority before movement, pause or restart behavior depends on a completed run.

### Gate 1: roster identity and peer binding

- [ ] Replace ambiguous roster rows with canonical member records.
- [ ] Distinguish `host-local`, `peer` and `reserved-slot` membership.
- [ ] Add explicit peer, member, player and slot identities.
- [ ] Add monotonic roster revision and stable fingerprint.
- [ ] Ensure reserved slots never enter gameplay bootstrap.
- [ ] Add placeholder, peer-claim and disconnect fixtures.

### Gate 2: transport actor binding and message admission

- [ ] Bind each live connection to one admitted member and gameplay player.
- [ ] Require transport, envelope sender and payload player identities to converge.
- [ ] Admit room, session, epoch, request and sequence before mutation.
- [ ] Return typed accepted, rejected, duplicate, stale and no-change results.
- [ ] Add transport actor, sender/payload, sequence, dedupe and retirement fixtures.

### Gate 3: lobby start transaction

- [ ] Add `StartRunCommand` with command ID and observed revisions.
- [ ] Validate host actor, transport role/status, lobby phase and readiness policy.
- [ ] Disable conflicting lobby mutations while a start transaction is active.
- [ ] Seal one immutable roster revision and fingerprint.
- [ ] Exclude reserved slots and disconnected members from bootstrap.
- [ ] Allocate `startTransactionId`, `runSessionId` and monotonic `sessionEpoch`.
- [ ] Build a detached deterministic bootstrap plan.
- [ ] Revalidate expected room and roster revisions after loading.
- [ ] Commit local host state exactly once from the accepted plan.
- [ ] Replace independent START_GAME/SYNC application with a complete correlation contract.
- [ ] Record per-peer send results and require client acknowledgement.
- [ ] Add bounded retry, timeout, duplicate and conflict handling.
- [ ] Bind provider acquisition and first frame to the accepted start result.

### Gate 4: run exit and session epoch

- [ ] Add one typed run-exit command and terminal result.
- [ ] Advance the session epoch before old runtime disposal begins.
- [ ] Quarantine late messages and snapshots from prior epochs.
- [ ] Correlate lobby/title projection with the committed exit result.

### Gate 4a: runtime readiness and generation fencing

- [ ] Add `runtimeSessionId`, monotonic `runtimeGeneration` and readiness revision.
- [ ] Treat shell writes as capability requests, not ready commits.
- [ ] Add one provider lease per simulation, rendering, networking and input capability.
- [ ] Require concrete resource and first-frame proof before ready.
- [ ] Reject old-generation setup and cleanup writes.
- [ ] Add rollback, idempotent cleanup and strict-mode fixtures.

### Gate 5: snapshot acceptance authority

- [ ] Add authoritative sender, room, run, epoch, sequence and revision admission.
- [ ] Reject stale, duplicate and conflicting snapshots before store mutation.
- [ ] Prevent older snapshots from rewinding terminal or progress state.
- [ ] Return typed snapshot-admission results.
- [ ] Correlate accepted snapshots with projection and frame receipts.

### Gate 5a: terminal outcome authority

- [ ] Select and version explicit victory and defeat predicates.
- [ ] Add one deterministic `OutcomeEvaluationInput` built from an admitted snapshot/result.
- [ ] Add host/solo authority, active-run, run-session and epoch admission.
- [ ] Add `terminalOutcomeId` and monotonic `terminalRevision`.
- [ ] Latch one accepted victory or failure per run epoch.
- [ ] Reject a conflicting outcome without mutation.
- [ ] Prevent terminal state from reverting to playing.
- [ ] Make victory and failure update room phase, game state and snapshot coherently.
- [ ] Replace generic failure-to-playing routing with explicit failure projection.
- [ ] Publish terminal results with per-peer delivery rows.
- [ ] Admit terminal results exactly once on each client.
- [ ] Require client acknowledgement and first terminal-frame proof.
- [ ] Bind restart and title exit to the committed terminal result.
- [ ] Add a bounded terminal-outcome journal and debug projection.

### Gate 5a fixture set

- [ ] `fixture:terminal-victory`
- [ ] `fixture:terminal-failure`
- [ ] `fixture:terminal-policy-version`
- [ ] `fixture:terminal-simultaneous-predicates`
- [ ] `fixture:terminal-duplicate`
- [ ] `fixture:terminal-conflict`
- [ ] `fixture:terminal-late-playing-snapshot`
- [ ] `fixture:terminal-stale-epoch`
- [ ] `fixture:terminal-loss-reorder-retry`
- [ ] `fixture:terminal-client-acknowledgement`
- [ ] `fixture:terminal-first-frame`
- [ ] `fixture:terminal-restart-handoff`
- [ ] `fixture:terminal-title-exit-handoff`
- [ ] browser multi-peer victory/failure convergence smoke.

### Gate 6: movement and reconciliation

- [ ] Add host movement validation and accepted movement results.
- [ ] Bind client prediction to admitted command sequences.
- [ ] Add active correction and reconciliation.

### Gate 7: pause and resume

- [ ] Add replicated pause/resume authority.
- [ ] Suspend simulation, input and publication atomically.
- [ ] Require host/client pause-state convergence.

## Recommended terminal DSKs

```txt
terminal-outcome-policy-kit
outcome-evaluation-input-kit
victory-predicate-kit
defeat-predicate-kit
terminal-outcome-admission-kit
terminal-outcome-latch-kit
terminal-outcome-result-kit
terminal-room-phase-kit
terminal-publication-kit
terminal-client-admission-kit
terminal-ui-projection-kit
terminal-frame-correlation-kit
terminal-outcome-acknowledgement-kit
terminal-outcome-journal-kit
terminal-outcome-fixture-kit
```

## Required terminal proof

```txt
same policy input produces the same outcome fingerprint
failure is executable and explicitly projected
one run epoch accepts at most one terminal outcome
terminal state cannot return to playing
late playing snapshots are rejected
victory and failure share one publication path
clients converge under loss, reorder and duplicate delivery
first terminal frame carries outcome, run and epoch identity
restart allocates a new admitted run epoch
exit retires the terminal run exactly once
```

## Do not start with

```txt
renderer replacement
new maze content
visual fidelity work
save system
new defeat effects before defeat policy
direct UI-only failure handling
```

Those depend on canonical actor, start, run-session, epoch, snapshot and terminal-result authority.

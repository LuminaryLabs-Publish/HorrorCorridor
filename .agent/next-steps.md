# HorrorCorridor Next Steps

**Updated:** `2026-07-11T11-39-11-04-00`

## Plan ledger

**Goal:** finish canonical roster and transport identity, then implement one correlation-complete lobby-start transaction before run exit, readiness, snapshot, movement or pause authority depends on an active run.

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
- [ ] Replace independent uncorrelated START_GAME/SYNC application with a complete correlation contract.
- [ ] Record per-peer send results rather than discarding broadcast counts.
- [ ] Require client admission and semantic acknowledgement.
- [ ] Define explicit all-peers, quorum or admitted-peer-only start policy.
- [ ] Add bounded retry, timeout, duplicate and conflict handling.
- [ ] Bind runtime provider acquisition and first frame to the accepted start result.
- [ ] Add bounded start transition journal and debug projection.

### Gate 3 fixture set

- [ ] `fixture:lobby-start-admission`
- [ ] `fixture:lobby-start-roster-seal`
- [ ] `fixture:lobby-start-loading-race`
- [ ] `fixture:lobby-start-publication`
- [ ] `fixture:lobby-start-partial-delivery`
- [ ] `fixture:lobby-start-reorder`
- [ ] `fixture:lobby-start-duplicate`
- [ ] `fixture:lobby-start-retry`
- [ ] `fixture:lobby-start-acknowledgement`
- [ ] `fixture:lobby-start-stale-epoch`
- [ ] `fixture:lobby-start-first-frame`
- [ ] browser multi-peer start smoke.

### Gate 4: run exit and session epoch

- [ ] Add one typed run-exit command and terminal result.
- [ ] Advance the session epoch before old runtime disposal begins.
- [ ] Quarantine late messages and snapshots from prior epochs.
- [ ] Correlate lobby/title projection with the committed exit result.

### Gate 4a: runtime readiness lease and generation fencing

- [ ] Add `runtimeSessionId`, monotonic `runtimeGeneration` and readiness revision.
- [ ] Treat shell writes as capability requests, not ready commits.
- [ ] Add one provider lease per simulation, rendering, networking and input capability.
- [ ] Require concrete resource and first-frame proof before ready.
- [ ] Reject old-generation setup and cleanup writes.
- [ ] Add rollback, idempotent cleanup and strict-mode fixtures.

### Gate 5: dependent runtime authority

- [ ] Add snapshot duplicate, stale, ordering and conflict policy.
- [ ] Add host movement validation and active client reconciliation.
- [ ] Add replicated pause/resume authority and atomic input suspension.

## Recommended start DSKs

```txt
lobby-start-command-kit
lobby-start-admission-policy-kit
lobby-start-roster-seal-kit
lobby-start-transaction-id-kit
run-session-identity-kit
run-session-epoch-kit
lobby-start-bootstrap-plan-kit
lobby-start-commit-kit
lobby-start-publication-bundle-kit
lobby-start-client-admission-kit
lobby-start-acknowledgement-kit
lobby-start-retry-and-dedupe-kit
lobby-start-result-kit
lobby-start-transition-journal-kit
lobby-start-debug-projection-kit
lobby-start-fixture-kit
```

## Required start proof

```txt
host cannot start while disconnected or unauthorized
not-ready required member blocks start
roster mutation during loading invalidates the plan
one sealed roster produces one deterministic player set
START_GAME or SYNC alone cannot enter gameplay
reordered correlated messages commit once
zero/partial recipient publication is visible in the result
each admitted client acknowledges one transaction
retry does not create a second run
old epoch start is rejected
first gameplay frame carries start/run/epoch identity
```

## Do not start with

```txt
movement rewrite
renderer replacement
new maze content
visual fidelity work
save system
pause convergence
```

Those depend on canonical member, actor, start transaction, run-session and epoch identity.

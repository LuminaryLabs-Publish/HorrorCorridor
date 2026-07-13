# HorrorCorridor Next Steps

**Updated:** `2026-07-13T17-40-04-04-00`

## Summary

Insert a host-start barrier between the lobby Start action and live session/runtime/UI mutation. Seal the roster, validate readiness and connection policy, make loading cancellable, prepare one detached snapshot, collect client acknowledgements, and commit or roll back every participant under one attempt.

## Plan ledger

**Goal:** replace optimistic local start with one typed multiplayer transaction and visible convergence proof.

### Documentation

- [x] Audit host start, loading and client reception.
- [x] Preserve the 29-kit inventory and domains.
- [x] Define the parent DSK and candidate surfaces.
- [x] Add the timestamped audit family.
- [x] Refresh root docs and registry.

### Gate 1: command and preconditions

- [ ] Add `HostStartCommand`, `StartAttemptId` and expected revisions.
- [ ] Seal the eligible roster for the attempt.
- [ ] Require connected and ready members under explicit policy.
- [ ] Reject duplicate, stale, unready, disconnected and invalid commands with zero mutation.

### Gate 2: loading lifecycle

- [ ] Add monotonic `LoadingGeneration`.
- [ ] Revalidate after every await.
- [ ] Cancel on route, room, roster, transport or policy replacement.
- [ ] Publish timeout, cancellation and supersession results.

### Gate 3: detached preparation

- [ ] Build one immutable initial snapshot candidate.
- [ ] Bind seed, room revision and roster fingerprint.
- [ ] Request client preparation for the sealed roster.
- [ ] Collect typed preparation results.

### Gate 4: correlated commit

- [ ] Commit host session, runtime, UI and readiness together.
- [ ] Correlate `START_GAME` and `SYNC` under one attempt or replace them with one start envelope.
- [ ] Require client commit acknowledgement.
- [ ] Quarantine stale, duplicate and predecessor messages.

### Gate 5: rollback and proof

- [ ] Restore the predecessor lobby after any non-accepted result.
- [ ] Retire candidate state and timers exactly once.
- [ ] Publish `HostStartResult`.
- [ ] Publish participant-correlated first-frame acknowledgements.

### Gate 6: fixtures

- [ ] Unready or disconnected member.
- [ ] Join, leave or ready change during loading.
- [ ] Route or transport replacement during loading.
- [ ] START/SYNC reordering and duplication.
- [ ] Client timeout or commit failure.
- [ ] Aggregate rollback and first-frame convergence.
- [ ] Source, production-build and deployed-origin parity.

## Dependency order

```txt
command and revisions
  -> sealed roster and policy
  -> cancellable loading generation
  -> detached snapshot and client preparation
  -> correlated atomic commit
  -> rollback and late-message quarantine
  -> first coherent participant frame proof
```

## Completion boundary

Do not claim reliable multiplayer start, lobby sealing, loading cancellation, client convergence or production readiness until the authority and fixtures pass on `main`.
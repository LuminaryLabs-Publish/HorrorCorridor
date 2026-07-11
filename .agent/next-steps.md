# HorrorCorridor Next Steps

**Updated:** `2026-07-11T03-18-44-04-00`

## Plan ledger

**Goal:** implement the smallest source cut that turns lobby readiness and run startup into one host-owned, atomic transaction before changing movement, rendering or visual fidelity.

- [ ] Add `lobby-ready-command-kit` with actor, room, desired state, expected roster revision and request ID.
- [ ] Route client ready changes to the host instead of mutating only local state.
- [ ] Add `lobby-ready-admission-kit` for membership, connection, sender binding and stale-revision checks.
- [ ] Add monotonic roster revision and canonical roster fingerprint.
- [ ] Remove placeholder guests from admissible participant policy or mark them explicitly non-admissible.
- [ ] Add `start-run-request-kit` and reject non-host, wrong-phase, stale-roster and unready starts.
- [ ] Introduce `starting` as an explicit room phase.
- [ ] Seal the admitted roster before bootstrap.
- [ ] Generate `startTransactionId`, `runSessionId` and session epoch before publication.
- [ ] Correlate `START_GAME` and initial `SYNC` with the same transaction and roster fingerprint.
- [ ] Commit host PLAYING state only after bootstrap staging succeeds.
- [ ] Define client acceptance for missing, duplicate, stale and out-of-order start messages.
- [ ] Roll back to the previous lobby observation when bootstrap or publication fails.
- [ ] Add bounded lobby command/result and start transaction ledgers.
- [ ] Expose the committed start receipt through debug readback.
- [ ] Add deterministic Node fixtures for ready propagation, duplicate start, ordering and rollback.
- [ ] Add one browser host/client smoke proving both clients enter the same run session.

## Do not start with

```txt
movement rewrite
renderer replacement
new maze content
visual fidelity work
save system
pause convergence
```

Those depend on a stable run-session identity and admitted roster.

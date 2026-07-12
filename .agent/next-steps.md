# HorrorCorridor Next Steps

**Updated:** `2026-07-11T21-21-12-04-00`

## Plan ledger

**Goal:** preserve identity and run-lifecycle prerequisites, then make runtime startup atomic, rollback-safe, retryable and proven by its first committed frame before later simulation authorities rely on readiness.

### Gate 1: roster identity and peer binding

- [ ] Define canonical member, peer, player and slot identities.
- [ ] Bind every connection ID to one admitted actor.
- [ ] Add monotonic roster revision and fingerprint.

### Gate 2: transport actor and message admission

- [ ] Require connection, envelope sender and payload actor convergence.
- [ ] Admit room, run, epoch, request ID and sequence before mutation.
- [ ] Add typed accepted, rejected, duplicate, stale and no-change results.

### Gate 3: lobby start transaction

- [ ] Seal roster and readiness.
- [ ] Create run/session identity and epoch.
- [ ] Correlate START_GAME, initial SYNC and acknowledgements.

### Gate 4: run lifecycle

- [ ] Define exit, restart and stale-message quarantine.
- [ ] Retire disconnected actors and owned state transactionally.

### Gate 4a: runtime startup acquisition and rollback

- [ ] Replace procedural startup with a `StartRuntime` transaction.
- [ ] Keep readiness false while startup is preparing.
- [ ] Record renderer, scene, camera, post, world, canvas, observer, listener and RAF acquisitions.
- [ ] Move initialized state to the successful commit boundary.
- [ ] Roll back partial acquisitions in reverse dependency order.
- [ ] Return typed failure, rollback and unresolved-lease results.
- [ ] Fence callbacks with runtime generation and transaction identity.
- [ ] Commit rendering/input readiness only after the first successful frame.
- [ ] Admit retry only after a zero-live-lease baseline is proven.
- [ ] Add failure-injection, idempotent rollback and clean-retry fixtures.

### Gate 4b: runtime readiness and generation fencing

- [ ] Lease simulation, rendering, networking and input providers.
- [ ] Revoke readiness on stop, replacement or failure.
- [ ] Correlate provider revisions with session/run/runtime generation.

### Gate 5: state acceptance and gameplay commands

- [ ] Enforce monotonic snapshot acceptance.
- [ ] Replace inferred interaction targets with explicit claims.
- [ ] Make terminal outcomes monotonic and exactly once.

### Gate 6: fixed simulation, movement and delivery

- [ ] Separate input arrival, fixed simulation and snapshot publication clocks.
- [ ] Admit movement against authoritative collision and reconciliation policy.
- [ ] Build one bounded payload and retain complete per-peer delivery results.

### Gate 6c: authoritative randomness and replay

- [ ] Derive a named ooze stream from run seed and session epoch.
- [ ] Remove gameplay fallback to ambient `Math.random()`.
- [ ] Commit gameplay mutation and RNG checkpoint atomically.
- [ ] Project and restore versioned stream state.
- [ ] Add deterministic replay and migration continuation fixtures.

### Gate 7: pause/resume convergence

- [ ] Replicate pause authority.
- [ ] Freeze simulation and random-stream consumption while paused.
- [ ] Resume under a new acknowledged transition revision.

## Completion boundary

Do not claim startup readiness, rollback safety or clean retry until failures injected after each acquisition step produce zero leaked mandatory leases and a later start commits one correlated first frame.

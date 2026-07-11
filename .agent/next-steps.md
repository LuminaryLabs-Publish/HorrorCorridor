# HorrorCorridor Next Steps

**Updated:** `2026-07-11T19-38-14-04-00`

## Plan ledger

**Goal:** preserve identity, lifecycle, fixed-simulation, movement and delivery prerequisites, then make gameplay randomness deterministic, checkpointed, replayable and frame-correlated.

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

### Gate 4: run lifecycle and readiness

- [ ] Define exit, restart and stale-message quarantine.
- [ ] Lease runtime providers and fence generations.
- [ ] Retire disconnected actors and owned state transactionally.

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
- [ ] Version the deterministic PRNG algorithm.
- [ ] Remove gameplay fallback to ambient `Math.random()`.
- [ ] Admit random draws by simulation step and expected draw index.
- [ ] Commit gameplay mutation and RNG checkpoint atomically.
- [ ] Project stream ID, algorithm version, state and draw index into snapshot/save/replay data.
- [ ] Restore or transfer the stream during reconnect recovery and host migration.
- [ ] Add bounded random-draw journal and clone-safe observation.
- [ ] Correlate visible ooze frames with simulation and RNG checkpoint revisions.
- [ ] Add deterministic replay, checkpoint roundtrip and migration continuation fixtures.

### Gate 7: pause/resume convergence

- [ ] Replicate pause authority.
- [ ] Freeze simulation and random-stream consumption while paused.
- [ ] Resume under a new acknowledged transition revision.

## Completion boundary

Do not claim deterministic replay, restore or host-migration correctness until the same seed, command history and fixed-step sequence reproduce byte-equivalent ooze snapshots and matching frame evidence.

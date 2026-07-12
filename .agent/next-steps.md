# HorrorCorridor Next Steps

**Updated:** `2026-07-12T09-48-15-04-00`

## Plan ledger

**Goal:** preserve the ordered authority prerequisites, implement cancellable loading as a single-flight transaction, then strengthen runtime startup and gameplay authority.

### Documentation reconciliation

- [x] Align `START_HERE.md`, `current-audit.md` and `.agent/kit-registry.json` with the loading-transition generation boundary.
- [x] Add a new timestamped tracker, turn ledger and audit family.
- [x] Synchronize the central repo ledger and internal change log in the current run.

### Gate 1: roster identity and peer binding

- [ ] Define canonical member, peer, player and slot identities.
- [ ] Bind every connection ID to one admitted actor.
- [ ] Add monotonic roster revision and fingerprint.

### Gate 2: transport actor and message admission

- [ ] Require connection, sender and payload actor convergence.
- [ ] Admit room, run, epoch, request ID and sequence before mutation.
- [ ] Add typed accepted, rejected, duplicate, stale and no-change results.

### Gate 3: lobby start and run lifecycle

- [ ] Seal roster and readiness before starting.
- [ ] Create run/session identity and epoch.
- [ ] Correlate START_GAME, initial SYNC and acknowledgements.
- [ ] Define exit, restart and stale-message quarantine.

### Gate 3a: loading transition generation

- [ ] Add `StartRunCommand`, command ID and monotonic loading generation.
- [ ] Add explicit `IDLE`, `LOADING`, `COMMITTING`, `READY`, `CANCELLED` and `FAILED` phases.
- [ ] Enforce single-flight admission or typed predecessor supersession.
- [ ] Capture route, session, room, roster, readiness, identity and connection revisions before yielding.
- [ ] Replace raw RAF and timeout waits with cancellable owned leases.
- [ ] Cancel the active load on route exit, session reset, unmount, transport replacement or newer start.
- [ ] Build a candidate run bootstrap without mutating live stores.
- [ ] Validate room, seed, roster, host identity, snapshot and transport outputs.
- [ ] Re-check predecessor revisions immediately before commit.
- [ ] Commit session, runtime, UI and transport outputs atomically.
- [ ] Prevent duplicate START_GAME and initial SYNC emission.
- [ ] Return typed committed, cancelled, stale, superseded, rejected and failed results.
- [ ] Bind `GameCanvas` world initialization to the committed bootstrap generation.
- [ ] Reject snapshots whose run generation does not match retained world resources.
- [ ] Acknowledge the first visible run frame with loading/run generation.
- [ ] Add bounded loading observations and journal entries.
- [ ] Add overlapping-start, route-exit, lobby-change, unmount and world/snapshot parity fixtures.

### Gate 4: startup, readiness and presentation

- [ ] Replace procedural runtime startup with a generation-bound acquisition transaction.
- [ ] Record renderer, scene, camera, post, world, surface, observer, listener and RAF acquisitions.
- [ ] Commit readiness only after the first successful visible frame.
- [ ] Add frame-stage failure containment, quarantine and cold restart.

### Gate 5: canonical clock and state acceptance

- [ ] Replace gameplay use of `Date.now()` with one monotonic runtime clock.
- [ ] Enforce monotonic snapshot acceptance and run-generation parity.
- [ ] Replace inferred interaction targets with explicit claims.
- [ ] Make terminal outcomes monotonic and exactly once.

### Gate 6: movement, delivery and randomness

- [ ] Separate input arrival, fixed simulation and publication decisions.
- [ ] Admit movement against authoritative collision and reconciliation policy.
- [ ] Build one bounded payload and retain per-peer delivery results.
- [ ] Derive named random streams from run seed and session epoch.

### Gate 7: replicated pause/resume

- [ ] Replicate pause authority and clock state.
- [ ] Route pause through input retirement and simulation-clock freeze.
- [ ] Resume under a new acknowledged transition and clock generation.

## Completion boundary

Do not claim safe run startup until overlapping or cancelled loads cannot commit, lobby inputs are sealed, all live stores change under one transaction, transport start messages are exactly once, retained world resources match the committed run generation and the first visible frame cites that generation.

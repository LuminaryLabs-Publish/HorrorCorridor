# HorrorCorridor Next Steps

**Updated:** `2026-07-11T23-18-16-04-00`

## Plan ledger

**Goal:** preserve identity, startup and lifecycle prerequisites, then make surface sizing transactional and frame-correlated before later simulation and presentation claims rely on rendering readiness.

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
- [ ] Correlate provider revisions with session, run and runtime generation.

### Gate 4c: render surface resolution and frame correlation

- [ ] Define a named surface policy with DPR limits, maximum physical pixels and zero-area behavior.
- [ ] Convert startup, ResizeObserver, window resize and DPR changes into sequenced surface commands.
- [ ] Sample CSS size and device scale once per admitted observation.
- [ ] Coalesce duplicate resize sources and reject stale observations.
- [ ] Commit renderer, composer, bloom, camera and minimap from one plan.
- [ ] Read back actual drawing-buffer and target sizes.
- [ ] Publish monotonic surface identity and revision.
- [ ] Require rendering readiness, visible frames, captures and debug records to cite the revision.
- [ ] Add zero-area, DPR parity, resize-storm and stop/restart fixtures.

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

Do not claim responsive or current rendering until every accepted browser size/DPR transition yields one observable surface result and the first following frame cites that surface revision.

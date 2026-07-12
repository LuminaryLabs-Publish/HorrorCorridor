# HorrorCorridor Next Steps

**Updated:** `2026-07-12T05-59-28-04-00`

## Plan ledger

**Goal:** preserve identity, startup, readiness, presentation and input prerequisites, then make every recurring-frame failure terminate or recover the runtime through one observable and generation-safe transaction.

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
- [ ] Roll back partial acquisitions in reverse dependency order.
- [ ] Fence callbacks with runtime generation and transaction identity.
- [ ] Commit rendering/input readiness only after the first successful frame.

### Gate 4b: runtime readiness and generation fencing

- [ ] Lease simulation, rendering, networking and input providers.
- [ ] Revoke readiness on stop, replacement or failure.
- [ ] Correlate provider revisions with session, run and runtime generation.

### Gate 4c: render surface resolution and frame correlation

- [ ] Define named surface policy with DPR and physical-pixel limits.
- [ ] Convert startup, ResizeObserver, window resize and DPR changes into sequenced surface commands.
- [ ] Commit renderer, composer, bloom, camera and minimap sizing from one plan.
- [ ] Publish monotonic surface revision and actual dimensions.

### Gate 4d: active gameplay presentation and HUD/minimap reachability

- [ ] Define PLAYING, PAUSED and COMPLETED consumer policies.
- [ ] Mount the active HUD shell and required minimap during `PLAYING`.
- [ ] Replace `document.getElementById` discovery with an explicit minimap surface lease.
- [ ] Bind HUD and minimap leases to runtime generation and screen revision.
- [ ] Commit one visible presentation receipt after mandatory consumer acknowledgement.

### Gate 4e: debug observability capability and redaction

- [ ] Define public, QA and development build channels and capability tiers.
- [ ] Replace ambient query, Backquote, localStorage and window-API elevation with admitted commands.
- [ ] Bind capability to actor, role, runtime generation and session epoch.
- [ ] Apply field classification, redaction, retention and export policy.
- [ ] Revoke leases and clear privileged buffers on stop or replacement.

### Gate 4f: focus, visibility and held-control retirement

- [ ] Add a monotonic `inputRevision` and one active `controlLeaseId`.
- [ ] Treat `blur`, `visibilitychange(hidden)`, `pagehide`, pointer-lock loss, pause, route exit and runtime stop as retirement commands.
- [ ] Atomically clear every held button, look delta and pointer-lock flag.
- [ ] Publish a neutral runtime snapshot before another simulation step.
- [ ] For clients, publish one bounded zero-input update when admitted.
- [ ] Require a new focus-qualified physical keydown to create the next control lease.

### Gate 4g: runtime frame-failure containment

- [ ] Add runtime frame IDs, stage IDs and immutable `FramePlan` records.
- [ ] Make every simulation, publication, store, world, minimap, debug and post stage return a typed result.
- [ ] Schedule the successor RAF only from a committed frame result.
- [ ] Clear or terminalize the loop lifecycle when any stage fails.
- [ ] Record escaped mutation and publication receipts.
- [ ] Retain the previous committed snapshot and visible frame as last-known-good.
- [ ] Admit only the first failure and cache duplicate failure reports.
- [ ] Retire input and fence interaction, movement and transport mutation.
- [ ] Revoke simulation, rendering and input readiness atomically.
- [ ] Freeze the prior canvas or replace it with a bounded failure surface outside the damaged graph.
- [ ] Dispose listeners, observers, transport subscriptions, world, post-processing and renderer in dependency order.
- [ ] Make disposal idempotent and publish per-resource results.
- [ ] Allow restart only after terminal cleanup or an explicit retained-frozen result.
- [ ] Allocate a new runtime generation for restart.
- [ ] Publish readiness only after the first replacement frame acknowledgement.
- [ ] Add stage-fault fixtures for host, client, solo, paused and completed paths.
- [ ] Add browser proof that no mutation occurs after quarantine.

### Gate 5: state acceptance and gameplay commands

- [ ] Enforce monotonic snapshot acceptance.
- [ ] Replace inferred interaction targets with explicit claims.
- [ ] Make terminal outcomes monotonic and exactly once.

### Gate 6: fixed simulation, movement and delivery

- [ ] Separate input arrival, fixed simulation and snapshot publication clocks.
- [ ] Admit movement against authoritative collision and reconciliation policy.
- [ ] Build one bounded payload and retain complete per-peer delivery results.

### Gate 6c: authoritative randomness and replay

- [ ] Derive named random streams from run seed and session epoch.
- [ ] Remove gameplay fallback to ambient `Math.random()`.
- [ ] Commit gameplay mutation and RNG checkpoint atomically.
- [ ] Add deterministic replay and migration continuation fixtures.

### Gate 7: pause/resume convergence

- [ ] Replicate pause authority.
- [ ] Freeze simulation and random-stream consumption while paused.
- [ ] Route pause and resume through input-retirement and control-lease renewal.
- [ ] Resume under a new acknowledged transition revision.

## Completion boundary

Do not claim runtime failure safety until every frame stage returns a typed result, no failed runtime can continue mutating state, the last-known-good frame remains coherent, cleanup is observable and idempotent, and a replacement generation proves its first visible frame before readiness returns.
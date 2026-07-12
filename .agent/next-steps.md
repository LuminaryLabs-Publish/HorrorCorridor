# HorrorCorridor Next Steps

**Updated:** `2026-07-12T04-28-03-04-00`

## Plan ledger

**Goal:** preserve identity, startup, lifecycle and presentation prerequisites, then ensure focus and visibility loss cannot leave gameplay controls active or publish stale movement.

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
- [ ] Make retirement idempotent by runtime, run and input revision.
- [ ] Atomically clear every held button, look delta and pointer-lock flag.
- [ ] Update `runtimeStore.inputFlags` with the neutral snapshot before another simulation step.
- [ ] Suspend movement and interaction admission while focus/control lease is invalid.
- [ ] For clients, publish one sequenced zero-input update when transport and run identity are still valid.
- [ ] Record prior axes, cause, revisions, publication result and final neutral state.
- [ ] Require a new focus-qualified physical keydown to create the next control lease.
- [ ] Neutralize input during GameCanvas cleanup and route teardown.
- [ ] Add non-pointer-lock blur, hidden-tab, pointer-lock loss, pause, route-exit and unmount fixtures.
- [ ] Add client zero-input and host stale-movement rejection fixtures.
- [ ] Add a browser smoke proving movement stops before the first post-focus-loss frame.

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

Do not claim browser input lifecycle safety until every focus/visibility/runtime loss path produces a neutral input result, a client cannot continue publishing stale movement, and browser fixtures prove that movement and interaction stop before the next admitted simulation frame.
# HorrorCorridor Next Steps

**Updated:** `2026-07-12T02-49-19-04-00`

## Plan ledger

**Goal:** preserve identity, startup, lifecycle and render-surface prerequisites, then make every active gameplay presentation consumer reachable and frame-correlated before diagnostics or deployment claims rely on the current UI composition.

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
- [ ] Mount the active HUD shell during `PLAYING`.
- [ ] Mount `Minimap` during `PLAYING` when required by policy.
- [ ] Replace `document.getElementById` discovery with an explicit minimap surface ref/lease.
- [ ] Bind HUD and minimap leases to runtime generation and screen revision.
- [ ] Create one immutable `PresentationFramePlan` per RAF.
- [ ] Return accepted, skipped, unavailable, stale and failed consumer results.
- [ ] Require world, post-processing, HUD and policy-required minimap acknowledgements.
- [ ] Commit one visible presentation frame receipt.
- [ ] Revoke stale surface leases on screen transition and teardown.
- [ ] Add active-play mount, pause/resume, completion-transition and frame-correlation fixtures.

### Gate 4e: debug observability capability and redaction

- [ ] Define public, QA and development build channels and capability tiers.
- [ ] Replace ambient query, Backquote, localStorage and window-API elevation with admitted commands.
- [ ] Bind capability to actor, role, runtime generation and session epoch.
- [ ] Apply field classification, redaction, retention and export policy.
- [ ] Require debug projection to consume committed presentation frames.
- [ ] Revoke leases and clear privileged buffers on stop or replacement.

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
- [ ] Resume under a new acknowledged transition revision.

## Completion boundary

Do not claim the active presentation surface complete until `PLAYING` mounts every mandatory consumer, missing surfaces produce typed failures, world/HUD/minimap results cite one frame identity, and browser fixtures prove the minimap is usable before terminal completion.

# HorrorCorridor Next Steps

**Updated:** `2026-07-12T01-08-06-04-00`

## Plan ledger

**Goal:** preserve identity, startup, lifecycle and surface prerequisites, then separate public-safe telemetry from privileged QA diagnostics before any release claims rely on the current browser debug surface.

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
- [ ] Add failure-injection, idempotent rollback and clean-retry fixtures.

### Gate 4b: runtime readiness and generation fencing

- [ ] Lease simulation, rendering, networking and input providers.
- [ ] Revoke readiness on stop, replacement or failure.
- [ ] Correlate provider revisions with session, run and runtime generation.

### Gate 4c: render surface resolution and frame correlation

- [ ] Define a named surface policy with DPR limits, maximum physical pixels and zero-area behavior.
- [ ] Convert startup, ResizeObserver, window resize and DPR changes into sequenced surface commands.
- [ ] Commit renderer, composer, bloom, camera and minimap from one plan.
- [ ] Read back actual physical sizes and publish a monotonic surface revision.
- [ ] Require rendering readiness, visible frames, captures and debug records to cite the revision.
- [ ] Add zero-area, DPR parity, resize-storm and stop/restart fixtures.

### Gate 4d: debug observability capability and redaction

- [ ] Define build channels: public production, QA preview and local development.
- [ ] Define player-safe, QA and developer capability tiers.
- [ ] Replace ambient query, Backquote, localStorage and window-API enablement with `DebugActivationCommand` admission.
- [ ] Bind every capability to actor identity, role, runtime generation and session epoch.
- [ ] Issue a revocable lease with explicit expiry and reason.
- [ ] Classify every captured frame/event field.
- [ ] Create a public-safe redaction profile that excludes puzzle order, cube coordinates, owner IDs and room/player identifiers.
- [ ] Gate privileged overlay and export surfaces behind the admitted lease.
- [ ] Return typed activation, export and revocation results.
- [ ] Clear privileged buffers and persisted flags on revocation, stop and session replacement.
- [ ] Add production-disable, tier-redaction, localStorage-restart, session-revocation and export-budget fixtures.

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
- [ ] Add deterministic replay and migration continuation fixtures.

### Gate 7: pause/resume convergence

- [ ] Replicate pause authority.
- [ ] Freeze simulation and random-stream consumption while paused.
- [ ] Resume under a new acknowledged transition revision.

## Completion boundary

Do not claim production-safe diagnostics until public builds reject privileged activation by default, player-safe exports are redacted, privileged leases revoke across session/runtime replacement, and browser fixtures prove the overlay/window API cannot disclose puzzle-solving state without an explicitly admitted QA or developer capability.
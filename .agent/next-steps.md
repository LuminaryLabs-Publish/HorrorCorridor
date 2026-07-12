# HorrorCorridor Next Steps

**Updated:** `2026-07-12T07-41-06-04-00`

## Plan ledger

**Goal:** preserve existing authority prerequisites, then replace ambient browser-clock decisions with one monotonic, generation-bound runtime clock that every simulation, network and render consumer can prove.

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

### Gate 4a: startup, readiness and presentation prerequisites

- [ ] Replace procedural startup with a generation-bound transaction.
- [ ] Record renderer, scene, camera, post, world, surface, observer, listener and RAF acquisitions.
- [ ] Commit readiness only after the first successful visible frame.
- [ ] Define render-surface revisions and explicit HUD/minimap leases.
- [ ] Add debug capability, redaction and revocation policy.
- [ ] Retire held controls on blur, hidden, pagehide, pause, route exit and stop.

### Gate 4g: frame-failure containment

- [ ] Add frame/stage IDs and typed stage results.
- [ ] Retain last-known-good state and visible frame.
- [ ] Quarantine mutation and revoke readiness after the first failure.
- [ ] Dispose deterministically and restart only into a new runtime generation.

### Gate 4h: canonical runtime clock

- [ ] Add `runtimeClockId` and monotonic `clockRevision`.
- [ ] Introduce one monotonic source adapter using RAF/performance time.
- [ ] Keep `Date.now()` only as UTC observation metadata.
- [ ] Add `ClockSampleCommand` and typed admission results.
- [ ] Classify backward jumps, forward jumps, stalls and source resets.
- [ ] Add authoritative `simulationTimeMs` and `simulationStep`.
- [ ] Apply explicit maximum delta, fixed-step count and CPU-time budgets.
- [ ] Return simulated, deferred and dropped-time results.
- [ ] Derive network publication cadence from the committed simulation clock.
- [ ] Derive client update and UI projection cadence from monotonic runtime time.
- [ ] Derive ooze decay from authoritative simulation time.
- [ ] Freeze simulation time and RNG consumption while paused.
- [ ] Allocate resume and reset generations.
- [ ] Reject samples, callbacks and snapshots from predecessor generations.
- [ ] Project clock ID, revision, step and simulation time into snapshots.
- [ ] Provide one canonical render-time projection to camera, world, minimap and debug.
- [ ] Require visible-frame acknowledgement with the same clock revision.
- [ ] Add bounded clock observations and journal records.
- [ ] Add backward/forward wall-clock fixtures.
- [ ] Add pause/resume, reset, snapshot roundtrip and render-parity fixtures.
- [ ] Add a browser smoke test that monkey-patches wall time without changing gameplay cadence.

### Gate 5: state acceptance and gameplay commands

- [ ] Enforce monotonic snapshot acceptance.
- [ ] Replace inferred interaction targets with explicit claims.
- [ ] Make terminal outcomes monotonic and exactly once.

### Gate 6: movement, delivery and randomness

- [ ] Separate input arrival, fixed simulation and publication decisions while sharing the canonical clock.
- [ ] Admit movement against authoritative collision and reconciliation policy.
- [ ] Build one bounded payload and retain per-peer delivery results.
- [ ] Derive named random streams from run seed and session epoch.
- [ ] Commit gameplay mutation and RNG checkpoint atomically.

### Gate 7: replicated pause/resume

- [ ] Replicate pause authority and clock state.
- [ ] Route pause through input retirement and simulation-clock freeze.
- [ ] Resume under a new acknowledged transition and clock generation.

## Completion boundary

Do not claim deterministic timing until UTC adjustments cannot affect gameplay, simulation time never decreases, pause/reset behavior is explicit, snapshots carry temporal provenance, and all visible consumers acknowledge one clock revision and simulation step.

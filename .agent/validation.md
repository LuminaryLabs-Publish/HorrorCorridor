# HorrorCorridor Validation

**Updated:** `2026-07-12T07-41-06-04-00`

## Scope

Documentation-only audit of browser time sources, network/UI cadence, authoritative snapshot timestamps, room timestamps, completion timing, ooze decay, pause/reset policy and simulation/render clock provenance.

## Plan ledger

**Goal:** prove that wall-clock adjustments cannot change gameplay and that every simulation, snapshot and visible frame cites one monotonic clock revision and simulation step.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read current root `.agent` state.
- [x] Read `GameCanvas.tsx`, `animationLoop.ts` and `oozeRules.ts`.
- [x] Confirm RAF timestamps drive frame delta and visual elapsed time.
- [x] Confirm `Date.now()` drives cadence, snapshot, room, completion and ooze timing.
- [x] Confirm no clock identity, revision or discontinuity result exists.
- [x] Confirm snapshots contain wall timestamps but no authoritative simulation time.
- [x] Reconcile all 29 implemented kits and services.
- [x] Define clock, pause/reset, snapshot and render fixture gates.
- [x] Update required docs and timestamped audits.
- [ ] Implement and run clock fixtures.

## Source-backed checks

```txt
RAF timestamp used for delta: yes
RAF timestamp used for camera/world elapsed: yes
Date.now wrapper present in GameCanvas: yes
Date.now used for network cadence: yes
Date.now used for UI cadence: yes
Date.now used for room.updatedAt: yes
Date.now used for snapshot.timestampMs: yes
Date.now used for completion.atMs: yes
Date.now used for ooze advancement: yes
ooze decay compares nowMs against lastOozeDecayTime: yes
runtime clock ID/revision: absent
clock regression/jump classification: absent
simulationTimeMs in snapshot: absent
pause/resume clock generation: absent
reset clock generation: absent
render-to-clock receipt: absent
```

## Existing package commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

These commands were not run because runtime source and package configuration were unchanged. Executable proof remains required.

## Required fixture gate

```txt
monotonic samples produce increasing clock revisions
backward UTC adjustment has no gameplay effect
forward UTC adjustment has no gameplay effect
large monotonic delta obeys step and CPU budgets
simulated, deferred and dropped time are reported
pause freezes simulation time and RNG consumption
resume creates a new generation without catch-up burst
reset creates a new clock generation and rejects stale samples
snapshot roundtrip preserves simulation step and elapsed time
network/UI/ooze cadence share one clock revision
camera/world/minimap/debug cite one render-time projection
visible frame acknowledgement matches snapshot clock revision
browser smoke can alter Date.now without altering gameplay cadence
```

## Change validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
input behavior changed: no
movement behavior changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing checks run: no
clock regression fixture available: no
clock forward-jump fixture available: no
pause/resume clock fixture available: no
snapshot clock fixture available: no
render parity fixture available: no
browser clock smoke run: no
```

No deterministic timing, clock-discontinuity safety, pause/reset continuity, snapshot temporal provenance or render/simulation parity claim is made until the required fixtures pass.

# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T09-38-46-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and runtime diagnostics.

The current audit isolates asynchronous loading-transition authority. `runLoadingSteps()` yields across five animation-frame and timeout boundaries, while `enterSoloRun()` and host `startPlay()` retain mutable route, session, lobby and connection inputs and commit after the wait. No loading generation, single-flight guard, cancellation token, predecessor check or stale-result rejection protects those commits.

## Current ledge

```txt
HorrorCorridor Loading Transition Generation Authority
+ Single-Flight Admission, Cancellation, Sealed Bootstrap Inputs, Atomic Commit and First-Frame Proof
```

## Plan ledger

**Goal:** ensure every solo or host start belongs to one admitted loading generation and cannot commit after cancellation, route replacement, unmount, lobby mutation or a newer start attempt.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible synchronized repository.
- [x] Read current root audit guidance and retained ledges.
- [x] Trace `runLoadingSteps()`, `enterSoloRun()`, host `startPlay()`, menu callbacks and runtime initialization.
- [x] Identify the interaction loop, domains, 29 implemented kits and offered services.
- [x] Define loading admission, cancellation, sealed-input, candidate-bootstrap, atomic-commit and first-frame contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root files and machine registry.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable loading-race fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-12T09-38-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T09-38-46-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T09-38-46-04-00-loading-transition-generation-dsk-map.md
.agent/render-audit/2026-07-12T09-38-46-04-00-stale-bootstrap-world-snapshot-provenance-gap.md
.agent/gameplay-audit/2026-07-12T09-38-46-04-00-overlapping-loading-stale-run-commit-loop.md
.agent/interaction-audit/2026-07-12T09-38-46-04-00-start-cancel-commit-admission-map.md
.agent/loading-transition-audit/2026-07-12T09-38-46-04-00-generation-cancellation-atomic-commit-contract.md
.agent/deploy-audit/2026-07-12T09-38-46-04-00-loading-race-fixture-gate.md
```

Retain the preceding canonical-clock, frame-failure, input-lifecycle, active-presentation, debug, render-surface, startup, randomness, transport, cadence, movement, disconnect, interaction, outcome, snapshot, lobby, exit and pause audits.

## Interaction loop

```txt
solo or host Start action
  -> set route to LOADING
  -> repeat five display steps
       -> wait one requestAnimationFrame
       -> wait one 90 ms timeout
  -> read retained closure inputs
  -> create room/run bootstrap
  -> mutate session, runtime and UI stores
  -> host may broadcast START_GAME and initial SYNC
  -> GameCanvas initializes once from the first available snapshot
  -> build a retained Three.js world from that snapshot
  -> render later snapshots through the retained world
```

## Source-backed finding

```txt
loading generation: absent
single-flight admission: absent
loading cancellation: absent
timeout/RAF lease ownership: absent
predecessor route/session validation: absent
sealed lobby/readiness snapshot: absent
stale-result rejection: absent
candidate bootstrap validation: absent
atomic run commit receipt: absent
first visible run-frame acknowledgement: absent
```

## Required architecture

```txt
StartRunCommand
  -> admit against route, session, room and predecessor loading revision
  -> allocate one loading generation and cancellation token
  -> seal room, roster, readiness, identity and connection inputs
  -> execute owned loading-step leases
  -> build and validate a candidate bootstrap
  -> reject cancelled, stale or superseded generations
  -> atomically commit session, runtime, UI and transport outputs
  -> initialize the world from the committed bootstrap generation
  -> acknowledge the first visible frame with the same generation
```

## Implemented kit census

```txt
source-backed kits: 29
planned loading-transition kits: 26
```

The complete kit/service map is in `.agent/current-audit.md` and `.agent/kit-registry.json`.

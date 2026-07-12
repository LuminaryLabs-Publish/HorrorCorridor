# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T09-48-15-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and runtime diagnostics.

The current implementation boundary is asynchronous loading-transition authority. `runLoadingSteps()` crosses five animation-frame and timer pairs, then solo and host start paths commit session, runtime, UI and transport results without a loading generation, cancellation token, sealed predecessor revisions or atomic commit receipt. This turn reconciles that repo-local audit with central tracking; runtime behavior remains unchanged.

## Plan ledger

**Goal:** keep the loading-transition authority, root audit routing, machine registry and central ledger aligned while preserving the complete source-backed breakdown.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` because its repo-local audit was newer than central tracking.
- [x] Verify loading steps, solo/host commit paths and one-time world initialization.
- [x] Identify the interaction loop, all domains, 29 implemented kits and offered services.
- [x] Add a new tracker, turn ledger and architecture/render/gameplay/interaction/central/deploy audit family.
- [x] Refresh root human and machine-readable audit state.
- [x] Prepare central ledger and internal change-log synchronization.
- [x] Use `main` only; create no branch or pull request.
- [ ] Runtime implementation and executable loading-race fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-12T09-48-15-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T09-48-15-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T09-48-15-04-00-loading-transition-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T09-48-15-04-00-world-snapshot-generation-ledger-gap.md
.agent/gameplay-audit/2026-07-12T09-48-15-04-00-loading-race-source-reconciliation.md
.agent/interaction-audit/2026-07-12T09-48-15-04-00-start-command-central-admission-map.md
.agent/central-sync-audit/2026-07-12T09-48-15-04-00-repo-ledger-machine-registry-contract.md
.agent/deploy-audit/2026-07-12T09-48-15-04-00-loading-fixture-central-gate.md
```

Retain the detailed loading-transition audit family at `2026-07-12T09-38-46-04-00` and all preceding canonical-clock, frame-failure, input-lifecycle, active-presentation, debug, render-surface, startup, randomness, transport, cadence, movement, disconnect, interaction, outcome, snapshot, lobby, exit and pause audits.

## Interaction loop

```txt
solo or host Start action
  -> set route to LOADING
  -> execute five display steps
       -> wait one requestAnimationFrame
       -> wait one 90 ms timer
  -> reuse retained route/session/lobby/identity/connection values
  -> create run bootstrap
  -> mutate session, runtime and UI stores
  -> host may broadcast START_GAME and initial SYNC
  -> GameCanvas initializes once from the first snapshot
  -> retained world and later snapshots continue without generation parity proof
```

## Current finding

```txt
loading command ID: absent
loading generation: absent
single-flight admission: absent
cancellation or supersession: absent
owned RAF/timer leases: absent
sealed lobby/readiness inputs: absent
route/session predecessor validation: absent
candidate bootstrap validation: absent
atomic multi-store commit: absent
duplicate initial broadcast suppression: absent
world/snapshot generation parity: absent
first visible run-frame receipt: absent
```

## Required parent domain

```txt
corridor-loading-transition-generation-authority-domain
```

## Required flow

```txt
StartRunCommand
  -> validate route/session and predecessor revisions
  -> allocate command ID, loading generation and cancellation token
  -> enforce single-flight or typed supersession
  -> seal room, roster, readiness, identity and connection inputs
  -> execute owned cancellable loading leases
  -> build and validate a detached candidate bootstrap
  -> re-check all predecessors before atomic commit
  -> publish session, runtime, UI and transport results exactly once
  -> build world resources from the committed run generation
  -> acknowledge the first visible frame with the same generation
```

## Census

```txt
source-backed kits: 29
planned loading-transition kits: 26
```

The complete kit and service inventory is in `.agent/current-audit.md`, `.agent/kit-registry.json` and the current tracker.

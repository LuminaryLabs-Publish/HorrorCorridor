# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T07-41-06-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and runtime diagnostics.

The current audit isolates temporal authority. Rendering and camera/world animation use requestAnimationFrame timestamps, while cadence, snapshots, room updates, completion and ooze decay use `Date.now()`. No clock identity, monotonic simulation-time projection, discontinuity result or pause/reset clock generation joins those consumers.

## Current ledge

```txt
HorrorCorridor Canonical Runtime Clock Authority
+ Monotonic Simulation Time, UTC Observation Separation, Pause/Reset Generations and Clock-Discontinuity Fixture Gate
```

## Plan ledger

**Goal:** ensure wall-clock adjustments cannot alter gameplay and every simulation, network and render consumer cites one admitted clock revision and simulation step.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible synchronized repository.
- [x] Read current root audit guidance and retained ledges.
- [x] Trace RAF, `Date.now()`, network/UI cadence, snapshots, completion and ooze decay.
- [x] Identify the interaction loop, domains, 29 implemented kits and offered services.
- [x] Define simulation, render and UTC observation clock boundaries.
- [x] Define discontinuity, pause, resume, reset and snapshot-projection contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root files and machine registry.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable clock fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-12T07-41-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T07-41-06-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T07-41-06-04-00-canonical-runtime-clock-dsk-map.md
.agent/render-audit/2026-07-12T07-41-06-04-00-simulation-render-clock-provenance-gap.md
.agent/gameplay-audit/2026-07-12T07-41-06-04-00-wall-clock-jump-cadence-ooze-loop.md
.agent/interaction-audit/2026-07-12T07-41-06-04-00-clock-sample-step-admission-map.md
.agent/clock-audit/2026-07-12T07-41-06-04-00-monotonic-wall-clock-pause-reset-contract.md
.agent/deploy-audit/2026-07-12T07-41-06-04-00-clock-discontinuity-fixture-gate.md
```

Retain the preceding frame-failure, input-lifecycle, active-presentation, debug, render-surface, startup, randomness, transport, cadence, movement, disconnect, interaction, outcome, snapshot, lobby, exit and pause audits.

## Interaction loop

```txt
browser input or RAF callback
  -> RAF supplies monotonic page-relative elapsed and delta
  -> GameCanvas separately samples Date.now()
  -> advance pose/view and authoritative or predicted state
  -> gate networking and UI projection by wall-clock age
  -> advance ooze decay by wall-clock age
  -> stamp room/snapshot/completion with wall time
  -> update camera/world from RAF elapsed time
  -> draw minimap and optional debug frame
  -> submit post-processing output
```

## Source-backed finding

```txt
RAF source: monotonic page-relative
network/UI cadence source: Date.now()
snapshot/room/completion source: Date.now()
ooze decay source: Date.now() minus wall timestamp
clock identity and revision: absent
clock jump/regression result: absent
pause/reset temporal generation: absent
snapshot simulation time: absent
render-to-simulation clock receipt: absent
```

## Required architecture

```txt
raw browser samples
  -> clock sample admission and discontinuity classification
  -> pause/reset and bounded-delta policy
  -> committed clock revision and fixed-step batch
  -> simulation, ooze and network cadence
  -> snapshot clock projection
  -> canonical render-time projection
  -> visible-frame acknowledgement citing the same clock revision
```

## Implemented kit census

```txt
source-backed kits: 29
planned canonical-clock kits: 25
```

The full kit/service map is in `.agent/current-audit.md` and `.agent/kit-registry.json`.

# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-11T21-21-12-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, cube interactions, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded debug readback.

The current audit isolates browser runtime startup. `GameShell` declares simulation and rendering ready before `GameCanvas` mounts. `GameCanvas.initializeRuntime()` marks itself initialized before renderer, post-processing and world acquisition, and installs no failure rollback. A thrown startup step can retain partial GPU or callback ownership, block retry and leave readiness reporting success without a committed frame.

## Current ledge

```txt
HorrorCorridor Runtime Startup Acquisition and Rollback Authority
+ Failure Injection / Clean Retry / First Committed Frame Fixture Gate
```

## Plan ledger

**Goal:** make each runtime start one admitted transaction that records every acquired resource, rolls back partial ownership in reverse order, permits a clean retry and reports readiness only after the first committed frame.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Trace GameShell loading/bootstrap, GameCanvas initialization, resource acquisition, readiness, RAF start and cleanup.
- [x] Identify the interaction loop, domains, implemented kits and offered services.
- [x] Define startup admission, acquisition ledger, rollback, retry and first-frame proof contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable startup fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T21-21-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T21-21-12-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T21-21-12-04-00-runtime-startup-rollback-dsk-map.md
.agent/render-audit/2026-07-11T21-21-12-04-00-pre-first-frame-readiness-rollback-gap.md
.agent/gameplay-audit/2026-07-11T21-21-12-04-00-failed-runtime-bootstrap-poisoned-session-loop.md
.agent/interaction-audit/2026-07-11T21-21-12-04-00-start-retry-command-admission-map.md
.agent/startup-authority-audit/2026-07-11T21-21-12-04-00-acquisition-ledger-first-frame-contract.md
.agent/deploy-audit/2026-07-11T21-21-12-04-00-startup-failure-injection-fixture-gate.md
```

Retained prerequisite audits:

```txt
.agent/randomness-audit/2026-07-11T19-38-14-04-00-seeded-stream-checkpoint-contract.md
.agent/transport-audit/2026-07-11T18-11-21-04-00-payload-budget-backpressure-contract.md
.agent/network-cadence-audit/2026-07-11T16-38-10-04-00-input-simulation-publication-clock-contract.md
.agent/disconnect-authority-audit/2026-07-11T16-21-09-04-00-player-retirement-owned-state-contract.md
.agent/movement-authority-audit/2026-07-11T03-08-43-04-00-player-update-admission-correction-contract.md
.agent/pause-authority-audit/2026-07-10T23-30-13-04-00-host-client-pause-resume-contract.md
```

## Product interaction loop

```txt
mode selection and lobby
  -> loading projection
  -> initial game-state and snapshot bootstrap
  -> React mounts GameCanvas
  -> acquire renderer, scene, camera, post-processing and world
  -> attach canvas/world, listeners and ResizeObserver
  -> start RAF
  -> first simulation/render frame
  -> pointer-lock movement and interaction
  -> host simulation and snapshot publication
  -> client/world/minimap/HUD/debug projection
```

## Current startup split

```txt
GameShell
  -> sets authoritative snapshot
  -> routes to PLAYING
  -> reports simulation/rendering/input ready

GameCanvas later
  -> initialized = true
  -> create renderer, scene, camera, post-processing and world
  -> attach resources and listeners
  -> report readiness again
  -> start RAF
```

No startup transaction, acquisition ledger, rollback result, retry baseline or first-frame acknowledgement joins those phases.

## Required architecture

```txt
start command
  -> validate session/run/snapshot and runtime generation
  -> acquire each capability through a tracked lease
  -> install listeners, observer and RAF lease
  -> submit and acknowledge first valid frame
  -> atomically publish startup commit and readiness

failure
  -> stop acquisition
  -> retire acquired leases in reverse order
  -> clear poisoned initialized/readiness state
  -> publish typed failure and rollback receipts
  -> admit retry only from a zero-live-lease baseline
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Exit Commit and Session Epoch
4a. Runtime Startup Acquisition and Rollback Authority
4b. Runtime Readiness Lease and Generation Fencing
5. Snapshot Acceptance Authority
5a. Interaction Target Intent and Cube/Slot Claim Authority
5b. Active-Run Disconnect and Reconnect Authority
5c. Terminal Outcome Authority
6. Host Network Cadence and Fixed Simulation Authority
6a. Host Movement Admission and Client Reconciliation
6b. Snapshot Delivery and Backpressure Authority
6c. Authoritative Randomness and Replay Authority
7. Pause/Resume Authority
```

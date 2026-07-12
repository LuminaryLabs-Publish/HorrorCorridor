# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T01-08-06-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, cube interactions, ooze pressure, Three.js rendering, bloom, minimap, HUD and runtime debug readback.

The current audit isolates debug-observability authority. A public runtime can enable full-state capture through query parameters, persisted localStorage flags, the backquote key or an unguarded `window.__HORROR_CORRIDOR_DEBUG__` API. Captured and visible data includes room/player identity, local pose and input, every cube ID/color/state/owner/position, the ordered anomaly solution, slot state, cadence and recent events.

## Current ledge

```txt
HorrorCorridor Debug Observability Capability Authority
+ Production Disable / Redaction / Session Revocation / Export Fixture Gate
```

## Plan ledger

**Goal:** preserve useful developer and QA diagnostics while ensuring public players cannot silently activate privileged state capture, reveal puzzle state, persist debug access across runs or export data outside an admitted runtime/session capability.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Trace query, localStorage, keyboard and window-API debug activation.
- [x] Trace frame/event capture, ring-buffer retention, overlay rendering and export.
- [x] Identify the interaction loop, domains, all 29 implemented kits and offered services.
- [x] Define capability, classification, redaction, retention, export and revocation contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents and registry.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser/deployment fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-12T01-08-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T01-08-06-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T01-08-06-04-00-debug-observability-authority-dsk-map.md
.agent/render-audit/2026-07-12T01-08-06-04-00-privileged-debug-overlay-frame-gap.md
.agent/gameplay-audit/2026-07-12T01-08-06-04-00-debug-activation-puzzle-disclosure-loop.md
.agent/interaction-audit/2026-07-12T01-08-06-04-00-debug-command-capability-result-map.md
.agent/debug-observability-audit/2026-07-12T01-08-06-04-00-capability-redaction-revocation-contract.md
.agent/deploy-audit/2026-07-12T01-08-06-04-00-production-debug-capability-fixture-gate.md
```

Retained prerequisite audits:

```txt
.agent/render-surface-audit/2026-07-11T23-18-16-04-00-resolution-revision-frame-contract.md
.agent/startup-authority-audit/2026-07-11T21-21-12-04-00-acquisition-ledger-first-frame-contract.md
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
  -> snapshot bootstrap and GameCanvas startup
  -> initialize runtime debug from query and persisted preferences
  -> attach public window debug API
  -> keyboard/query/window API can enable privileged capture
  -> each enabled RAF clones frame, cube, anomaly, cadence and scene state
  -> bounded frame/event buffers update
  -> overlay renders privileged state or caller exports the full buffers
  -> enabled/overlay preferences persist into later sessions
```

## Current activation surface

```txt
query:
  ?debug=1|true|frames|verbose
  ?debugFrames=1|true|frames|verbose

persistent browser state:
  horror-corridor:runtime-debug
  horror-corridor:runtime-debug-overlay

keyboard:
  Backquote enables debug and toggles the overlay

window API:
  enable / disable / showOverlay / hideOverlay / clear
  getLatestFrame / getFrames / getEvents / extractState
```

There is no build-mode gate, capability token, actor/role admission, session lease, data classification, redaction profile, export authorization, automatic revocation or production-safe projection.

## Required architecture

```txt
DebugActivationCommand
  -> validate build channel, runtime generation, session and actor role
  -> resolve an explicit debug capability tier
  -> create a revocable session lease
  -> apply a named data-classification and redaction profile
  -> capture only admitted frame/event fields within byte/count budgets
  -> render or export through typed results
  -> revoke on stop, session replacement, role loss or production policy change
  -> prove public production defaults expose no privileged game-state surface
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Exit Commit and Session Epoch
4a. Runtime Startup Acquisition and Rollback Authority
4b. Runtime Readiness Lease and Generation Fencing
4c. Render Surface Resolution and Frame Correlation Authority
4d. Debug Observability Capability and Redaction Authority
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
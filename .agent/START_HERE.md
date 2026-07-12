# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T05-59-28-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, cube interactions, ooze pressure, Three.js rendering, bloom, minimap, HUD and runtime debug readback.

The current audit isolates runtime frame-failure containment. The animation-loop controller schedules the successor RAF only after `onFrame` returns. A simulation, network, world, minimap, debug or post-processing exception therefore ends future frames while the loop remains marked running and the runtime keeps readiness, input, transport, listeners, observers and GPU resources live.

## Current ledge

```txt
HorrorCorridor Runtime Frame-Failure Containment Authority
+ Last-Known-Good Frame, Mutation Quarantine, Ordered Disposal and Cold-Restart Fixture Gate
```

## Plan ledger

**Goal:** ensure every frame-stage failure produces one typed terminal result, preserves a coherent predecessor frame, revokes mutation capability, cleans up deterministically and admits only a new runtime generation.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read current root `.agent` state and retained startup, readiness, render, input and network audits.
- [x] Read `GameCanvas.tsx`, `animationLoop.ts` and package validation commands.
- [x] Identify the interaction loop, domains, all 29 implemented kits and offered services.
- [x] Confirm successor RAF scheduling occurs after the frame callback.
- [x] Confirm a thrown frame leaves `running = true` without another RAF.
- [x] Confirm host snapshot publication and client movement transmission can occur before render success.
- [x] Confirm no frame failure state, quarantine, readiness revocation, cleanup or restart transaction exists.
- [x] Define frame identity, stage results, last-known-good retention, capability fences, disposal and cold restart.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents and registry.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable fault-injection fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-12T05-59-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T05-59-28-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T05-59-28-04-00-runtime-frame-failure-containment-dsk-map.md
.agent/render-audit/2026-07-12T05-59-28-04-00-partial-frame-last-known-good-gap.md
.agent/gameplay-audit/2026-07-12T05-59-28-04-00-publish-before-render-dead-loop.md
.agent/interaction-audit/2026-07-12T05-59-28-04-00-frame-stage-failure-result-map.md
.agent/frame-failure-audit/2026-07-12T05-59-28-04-00-quarantine-disposal-cold-restart-contract.md
.agent/deploy-audit/2026-07-12T05-59-28-04-00-frame-failure-fixture-gate.md
```

Retained prerequisite audits:

```txt
.agent/input-lifecycle-audit/2026-07-12T04-28-03-04-00-held-control-lease-neutralization-contract.md
.agent/hud-minimap-audit/2026-07-12T02-49-19-04-00-active-play-surface-lease-contract.md
.agent/debug-observability-audit/2026-07-12T01-08-06-04-00-capability-redaction-revocation-contract.md
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
animation-loop step
  -> running guard
  -> calculate delta
  -> invoke GameCanvas frame

host/solo frame
  -> advance pose and view
  -> mutate game state and held cubes
  -> optionally advance ooze
  -> publish authoritative snapshot and broadcast
  -> update runtime stores
  -> update camera and world
  -> draw minimap
  -> capture optional debug frame
  -> render post-processing output
  -> return and schedule successor RAF

client frame
  -> advance predicted pose and view
  -> optionally send PLAYER_UPDATE
  -> update runtime stores
  -> update camera and world
  -> draw minimap
  -> capture optional debug frame
  -> render post-processing output
  -> return and schedule successor RAF
```

## Source-backed finding

```txt
successor RAF scheduled after onFrame: yes
frame-level try/catch: absent
stage-level typed result: absent
exception leaves loop.running true: yes
host publication can precede render: yes
client send can precede render: yes
cleanup automatically invoked on frame failure: no
readiness revoked on frame failure: no
input/network capability fenced on frame failure: no
fatal UI projected on frame failure: no
cold restart transaction: absent
```

## Required architecture

```txt
FramePlan
  -> admit runtime, run, screen, input and source snapshot revisions
  -> execute ordered simulation, publication and presentation stages
  -> retain per-stage mutation and publication receipts
  -> commit only after mandatory consumer acknowledgement

FrameFailureResult
  -> admit the first failure exactly once
  -> stop successor frame admission
  -> retain the last-known-good frame and snapshot
  -> quarantine input, simulation and network mutation
  -> revoke readiness and public mutators
  -> freeze or replace the visible surface under policy
  -> dispose resources in dependency order
  -> publish a terminal result
  -> admit cold restart only into a new runtime generation
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
4d. Active Gameplay Presentation and HUD/Minimap Reachability Authority
4e. Debug Observability Capability and Redaction Authority
4f. Focus, Visibility and Held-Control Retirement Authority
4g. Runtime Frame-Failure Containment, Disposal and Cold Restart
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
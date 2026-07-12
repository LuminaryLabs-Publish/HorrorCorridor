# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T02-49-19-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, cube interactions, ooze pressure, Three.js rendering, bloom, minimap, HUD and runtime debug readback.

The current audit isolates active-gameplay presentation reachability. The minimap renderer is implemented and called every RAF, but the `PLAYING` branch of `HUDOverlay` does not mount the minimap canvas. The canvas is mounted only by the `COMPLETED` branch, so the minimap becomes reachable after gameplay has ended.

## Current ledge

```txt
HorrorCorridor Active Gameplay Presentation Authority
+ HUD/Minimap Surface Lease and Consumer Fixture Gate
```

## Plan ledger

**Goal:** make the active HUD and minimap explicit consumers of one presentation frame so missing, stale, skipped and successful projections are observable and screen transitions cannot silently remove required gameplay surfaces.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Trace `GameShell`, `HUDOverlay`, `GameCanvas` and `Minimap`.
- [x] Identify the interaction loop, domains, all 29 implemented kits and offered services.
- [x] Confirm the PLAYING branch omits the minimap canvas.
- [x] Confirm the RAF silently no-ops when the canvas is absent.
- [x] Define presentation policy, surface leases, consumer results and frame acknowledgements.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents and registry.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-12T02-49-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T02-49-19-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T02-49-19-04-00-active-gameplay-presentation-dsk-map.md
.agent/render-audit/2026-07-12T02-49-19-04-00-missing-minimap-consumer-frame-gap.md
.agent/gameplay-audit/2026-07-12T02-49-19-04-00-playing-completed-hud-reachability-loop.md
.agent/interaction-audit/2026-07-12T02-49-19-04-00-presentation-consumer-admission-map.md
.agent/hud-minimap-audit/2026-07-12T02-49-19-04-00-active-play-surface-lease-contract.md
.agent/deploy-audit/2026-07-12T02-49-19-04-00-active-hud-minimap-fixture-gate.md
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
.agent/debug-observability-audit/2026-07-12T01-08-06-04-00-capability-redaction-revocation-contract.md
```

## Product interaction loop

```txt
GameShell enters PLAYING
  -> GameCanvas begins simulation and RAF rendering
  -> HUDOverlay evaluates PLAYING
  -> mounts SettingsOverlay and FrameDebugPanel only
  -> does not mount Minimap
  -> GameCanvas queries runtime-minimap each RAF
  -> query returns null
  -> drawMinimapFrame exits silently
  -> world/post-processing continue rendering
  -> victory changes screen to COMPLETED
  -> completed HUD branch mounts Minimap
  -> minimap becomes reachable after the run ends
```

## Source-backed finding

```txt
implemented minimap renderer: yes
PLAYING minimap mount: no
COMPLETED minimap mount: yes
per-frame minimap draw attempt: yes
missing canvas handling: silent return
consumer admission result: absent
surface lease/revision: absent
active minimap frame receipt: absent
```

## Required architecture

```txt
PresentationFramePlan
  -> admit screen and gameplay phase
  -> resolve required consumers
  -> acquire HUD/minimap surface leases
  -> project world, HUD, minimap and debug from one frame identity
  -> return typed consumer results
  -> require mandatory acknowledgements
  -> commit one visible presentation receipt
  -> journal unavailable, skipped, stale and failed consumers
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

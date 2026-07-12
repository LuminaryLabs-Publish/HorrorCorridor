# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T04-28-03-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, cube interactions, ooze pressure, Three.js rendering, bloom, minimap, HUD and runtime debug readback.

The current audit isolates focus-loss input retirement. The product explicitly permits WASD movement before pointer capture, but the browser `blur` handler only acts when pointer lock is active. A movement key pressed before focus loss can therefore remain latched when its `keyup` occurs outside the window. Solo/host simulation can continue consuming the stale input, and a client can continue local prediction and movement publication after focus returns.

## Current ledge

```txt
HorrorCorridor Focus-Loss Input Retirement Authority
+ Neutral Input, Client Zero-Input Publication and Browser Lifecycle Fixture Gate
```

## Plan ledger

**Goal:** make every focus, visibility, pointer-lock, pause, route and runtime transition retire held controls through one idempotent transaction before simulation or network publication can consume stale input.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Trace `GameCanvas`, `PointerLockGate` and the player input domain.
- [x] Identify the interaction loop, domains, all 29 implemented kits and offered services.
- [x] Confirm movement is supported without pointer lock.
- [x] Confirm `blur` does not neutralize input when pointer lock is absent.
- [x] Confirm `visibilitychange` and `pagehide` retirement paths are absent.
- [x] Confirm client and authoritative simulation can consume latched movement state.
- [x] Define control leases, input revisions, retirement results and zero-input publication.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents and registry.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser/network fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-12T04-28-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T04-28-03-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T04-28-03-04-00-focus-loss-input-retirement-dsk-map.md
.agent/render-audit/2026-07-12T04-28-03-04-00-unfocused-stale-movement-frame-gap.md
.agent/gameplay-audit/2026-07-12T04-28-03-04-00-blur-missed-keyup-movement-loop.md
.agent/interaction-audit/2026-07-12T04-28-03-04-00-focus-visibility-input-retirement-map.md
.agent/input-lifecycle-audit/2026-07-12T04-28-03-04-00-held-control-lease-neutralization-contract.md
.agent/deploy-audit/2026-07-12T04-28-03-04-00-focus-loss-input-fixture-gate.md
```

Retained prerequisite audits:

```txt
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
PLAYING begins without pointer capture
  -> PointerLockGate states WASD works immediately
  -> W keydown sets input.buttons.forward = true
  -> browser window loses focus before keyup
  -> onBlur checks pointerLockedRef.current
  -> pointer lock is false, so no release or reset occurs
  -> keyup occurs outside the window and is not observed
  -> screen remains PLAYING
  -> solo/host stepLocalPose consumes forward = true
  -> client prediction and PLAYER_UPDATE publication can consume it
  -> focus returns with the control still latched
  -> movement continues until a later explicit release/reset path occurs
```

## Source-backed finding

```txt
movement without pointer lock: supported and advertised
keydown held-state mutation: present
keyup release mutation: present
pointer-lock loss reset: present
blur reset while pointer locked: indirect through pointer-lock loss
blur reset while not pointer locked: absent
visibilitychange retirement: absent
pagehide retirement: absent
unmount neutral snapshot publication: absent
input revision/control lease: absent
client terminal zero-input update: absent
```

## Required architecture

```txt
InputRetirementCommand
  -> admit runtime, run, screen, focus and input revision
  -> suspend new gameplay input
  -> atomically neutralize every button and look delta
  -> retire the active control lease
  -> update the runtime input snapshot
  -> publish one bounded zero-input client update when required
  -> release pointer lock under policy
  -> return an idempotent typed result
  -> journal cause, prior axes, revision and publication outcome
  -> require a new focus-qualified keydown to establish a new lease
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
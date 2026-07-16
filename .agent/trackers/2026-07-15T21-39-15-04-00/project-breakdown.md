# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-15T21-39-15-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Selected head:** `4d314bc6ce835df3a7040e5f38bcb108c8699b3d`  
**Status:** `pointer-lock-acquisition-failure-fallback-authority-audited`

## Summary

HorrorCorridor was selected by the oldest synchronized eligible rule after the full 11-repository Publish inventory was compared with the ten eligible central ledgers and root `.agent` states. The current source directly requests pointer lock, treats input as ready before acquisition is accepted, listens only for `pointerlockchange`, hides the normal capture chrome, and exposes no rejection, unsupported-capability, retry, fallback, or first mouse-look-frame result.

## Plan ledger

**Goal:** make mouse-look admission an explicit browser capability transaction that either accepts pointer lock and proves the first matching frame or publishes a visible, operable fallback without disturbing movement, networking, simulation, rendering, or route ownership.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledger entries and ten root `.agent` states.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead repository.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` by the oldest synchronized timestamp.
- [x] Inspect pointer-lock capture, change handling, input readiness, mouse-look consumption, route settlement, cleanup, package scripts, proof adapters, and deployment surfaces.
- [x] Identify the full interaction loop, domains, kits, adapters, and offered services.
- [x] Preserve all 29 implemented kits and two proof adapters.
- [x] Add the timestamped pointer-lock audit family.
- [x] Change documentation only.
- [ ] Implement and execute acceptance, denial, unsupported, interruption, retry, fallback, retirement, build, and deployed-origin fixtures.

## Selection comparison

```txt
accessible Publish repositories:        11
eligible after Cavalry exclusion:        10
central ledger entries:                  10
root .agent states:                      10
new eligible repositories:                0
ledger-missing eligible repositories:     0
root-agent-missing repositories:           0
runtime-ahead repositories:                0
selected: LuminaryLabs-Publish/HorrorCorridor
selection rule: oldest synchronized eligible timestamp
prior timestamp: 2026-07-15T16-39-06-04-00
next oldest: TheOpenAbove at 2026-07-15T16-58-19-04-00
```

## Complete interaction loop

```txt
route and session admission
  -> enter solo, host, or client route
  -> construct deterministic maze and initial snapshot
  -> initialize transport, stores, renderer, world, post-processing, input, minimap, and RAF

control capture
  -> click the world while pointer lock is inactive
  -> PointerLockGate invokes requestPointerLock on the mount
  -> no admission command or result is created
  -> no rejection or unsupported-capability path is projected

accepted browser path
  -> pointerlockchange observes the mount as owner
  -> PlayerInputState records pointerLocked=true
  -> mousemove deltas accumulate
  -> frame consumes look deltas, movement, collision, camera, world, minimap, debug, and post-processing

failed or interrupted browser path
  -> request may remain unaccepted, be denied, be unsupported, or be interrupted
  -> no pointerlockerror listener classifies the outcome
  -> input readiness remains published
  -> mousemove is ignored while unlocked
  -> hidden capture chrome supplies no explicit failure or fallback result
  -> keyboard movement can continue but intentional mouse look has no accepted path

retirement
  -> pointer lock change, pause, blur, completion, or cleanup releases ownership
  -> input reset occurs on observed unlock
  -> no generation-bound acquisition or retirement receipt is published
```

## Domains in use

```txt
application routing and browser lifecycle
session identity room roster readiness and reset
deterministic maze generation and bootstrap
PeerJS BroadcastChannel transport and protocol
keyboard mouse pointer-lock and normalized input
pointer-lock capability gesture acquisition failure classification and fallback
client prediction authoritative publication and snapshot replay
movement collision camera interaction and held-item state
cube anomaly ooze and victory systems
pause settings completion and route projection
Three.js world post-processing RAF viewport and GPU cleanup
Canvas2D minimap and HUD projection
runtime diagnostics browser proof build and Pages deployment
central ledger and audit-state reconciliation
```

## Implemented kits and offered services

### Application, session, and UI

- `corridor-application-shell-kit`: routing, solo/host/client entry, loading, pause, completion, exit.
- `corridor-session-domain-kit`: identity, room, roster, connection, readiness, reset.
- `runtime-store-snapshot-kit`: snapshot, pose, view, input flags, readiness.
- `ui-pause-projection-kit`: pause state, reason, overlay.
- `ui-completion-projection-kit`: terminal state, message, timestamp, routing.
- `complete-screen-presentation-kit`: outcome presentation, restart, title exit.
- `lobby-screen-presentation-kit`: room, roster, ready state, controls.

### Networking and protocol

- `peer-host-transport-kit`: PeerJS host, BroadcastChannel bridge, connections, broadcast, targeted send, disconnect, destroy.
- `peer-client-transport-kit`: PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy.
- `peer-event-bus-kit`: typed transport events, subscription, cleanup.
- `protocol-message-construction-kit`: `START_GAME`, `PLAYER_UPDATE`, `TRY_INTERACT`, `SYNC`, `LOBBY_EVENT`.
- `protocol-serialization-kit`: encode, decode, protocol version, structural validation.

### World, input, simulation, and gameplay

- `maze-snapshot-bootstrap-kit`: seed, maze, players, cubes, anomaly, initial snapshot.
- `seeded-maze-rng-kit`: topology, placement, target sequence.
- `first-person-input-kit`: keyboard, pointer lock, look, snapshots.
- `movement-collision-camera-kit`: movement, collision, eye pose, shake, camera.
- `network-player-update-kit`: sequence, cadence, pose envelope, host consumption.
- `corridor-interaction-domain-kit`: pickup, drop, place, remove, held-cube synchronization.
- `ordered-anomaly-sequence-kit`: ordered slots, validation, victory.
- `ooze-trail-domain-kit`: spawn, decay, variation, spacing, capacity, pressure.
- `snapshot-outcome-routing-kit`: snapshot state to UI outcome.
- `corridor-authoritative-publication-kit`: tick, clone, `SYNC`, broadcast.

### Presentation, diagnostics, and delivery

- `corridor-animation-loop-kit`: RAF start, RAF stop, delta, elapsed, successor scheduling.
- `corridor-render-world-kit`: terrain, maze, objects, actors, lights, update, dispose.
- `corridor-post-processing-kit`: composer, bloom, resize, render, dispose.
- `corridor-minimap-kit`: canvas acquisition, DPR sizing, logical transform, maze, ooze, cubes, remote players, local heading.
- `runtime-debug-frame-kit`: activation, bounded capture, overlay, export.
- `runtime-resource-cleanup-kit`: loop, subscriptions, listeners, observers, GPU cleanup.
- `package-validation-kit`: build, lint, harness, visual, and live-player checks.

### Proof adapters

- `live-agent-runner-adapter`: episode scheduling, adaptive action selection, child execution, JSONL history, latest summary.
- `live-player-browser-proof-adapter`: server/browser admission, route control, debug readback, screenshots, image probes, proof gates.

```txt
implemented kits:      29
proof adapters:         2
implemented surfaces:  31
```

## Source-backed finding

```txt
world click capture request: present
requestPointerLock result handling: absent
pointerlockchange listener: present
pointerlockerror listener: absent
explicit unsupported-capability result: absent
explicit denied/interrupted result: absent
capture retry policy and receipt: absent
visible failure state with showChrome=false: absent
mouse-look fallback producer: absent
input readiness before lock acceptance: present
mousemove consumption while unlocked: rejected silently
PointerLockGeneration: absent
PointerLockAdmissionResult: absent
FirstPointerLockFrameAck: absent
browser denial/unsupported fixture: absent
```

`GameCanvas` passes `showChrome={false}` and invokes `mountRef.current?.requestPointerLock()` without observing an accepted or rejected result. The runtime registers `pointerlockchange` but not `pointerlockerror`, marks input readiness true during initialization, and ignores mouse movement until the observed pointer-lock owner matches the mount. This is a source-backed admission and evidence gap; no browser denial, sandbox restriction, or device failure was reproduced.

## Required authority

```txt
corridor-pointer-lock-acquisition-failure-fallback-authority-domain
```

```txt
PointerLockAdmissionCommand
  -> bind DocumentGeneration SurfaceId UserGestureId
     PointerLockPolicyRevision and expected route/runtime revisions
  -> observe capability and permissions policy
  -> request one PointerLockGeneration
  -> classify accepted denied unsupported interrupted stale or retired outcomes
  -> publish PointerLockAdmissionResult exactly once
  -> mark mouse-look readiness only after accepted ownership
  -> expose visible retry or compatible fallback controls after failure
  -> reject stale callbacks from prior generations
  -> publish FirstPointerLockFrameAck after matching look evidence is rendered

PointerLockRetirementCommand
  -> release the accepted generation once
  -> clear held and accumulated input
  -> publish PointerLockRetirementReceipt
```

## Planned authority surfaces

```txt
pointer-lock-capability-observation-kit
pointer-lock-policy-kit
pointer-lock-surface-identity-kit
user-gesture-identity-kit
pointer-lock-generation-kit
pointer-lock-request-adapter-kit
pointer-lock-change-observer-kit
pointer-lock-error-observer-kit
pointer-lock-outcome-classification-kit
mouse-look-readiness-kit
capture-retry-policy-kit
mouse-look-fallback-profile-kit
visible-capture-failure-projection-kit
pointer-lock-admission-result-kit
first-pointer-lock-frame-ack-kit
pointer-lock-retirement-kit
pointer-lock-browser-fixture-kit
source-build-pages-pointer-lock-parity-kit
```

## Repo-local output

Added:

```txt
.agent/trackers/2026-07-15T21-39-15-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T21-39-15-04-00.md
.agent/architecture-audit/2026-07-15T21-39-15-04-00-pointer-lock-acquisition-dsk-map.md
.agent/render-audit/2026-07-15T21-39-15-04-00-mouse-look-readiness-visible-frame-gap.md
.agent/gameplay-audit/2026-07-15T21-39-15-04-00-capture-failure-no-look-loop.md
.agent/interaction-audit/2026-07-15T21-39-15-04-00-pointer-lock-command-result-map.md
.agent/pointer-lock-audit/2026-07-15T21-39-15-04-00-acquisition-failure-fallback-contract.md
.agent/deploy-audit/2026-07-15T21-39-15-04-00-pointer-lock-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T21-39-15-04-00-oldest-selection-pointer-lock-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

Documentation only. Runtime TypeScript, React, networking, simulation, input behavior, Three.js, Canvas2D, packages, tests, workflows, build, and deployment are unchanged. No pointer-lock failure was reproduced and no acquisition correctness, fallback operability, visible-frame convergence, build parity, deployed parity, or production readiness is claimed.
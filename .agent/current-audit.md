# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T07-41-06-04-00`

## Status

```txt
status: canonical-runtime-clock-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local update completes
```

## Summary

HorrorCorridor currently uses two independent temporal authorities inside one frame. `createAnimationLoop()` supplies a requestAnimationFrame timestamp and a derived delta for movement, camera shake and world animation. `GameCanvas` separately samples `Date.now()` for network cadence, UI cadence, view-input timing, authoritative snapshot timestamps, room updates, completion timestamps and ooze decay.

The requestAnimationFrame clock is monotonic and page-relative. `Date.now()` is UTC wall time and can move backward or forward. No clock ID, revision, discontinuity classification, pause/reset generation or snapshot simulation-time projection connects them.

## Plan ledger

**Goal:** define one authoritative monotonic runtime clock, preserve UTC only as observation metadata, and correlate every simulation, network and render result with one admitted clock revision.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible synchronized repository.
- [x] Read current root `.agent` state and retained audits.
- [x] Read `GameCanvas.tsx`, `animationLoop.ts` and `oozeRules.ts`.
- [x] Trace every direct RAF and `Date.now()` temporal dependency.
- [x] Reconcile the full interaction loop, domains, 29 implemented kits and services.
- [x] Define simulation, render and UTC clock boundaries.
- [x] Define sample admission, discontinuity, pause, resume, reset and snapshot projection.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and registry.
- [ ] Runtime implementation and executable clock fixtures remain future work.

## Product interaction loop

```txt
browser input, transport event or RAF callback
  -> mutate input, pointer-lock, pause, settings or replicated state
  -> RAF supplies timeMs and deltaMs
  -> GameCanvas samples Date.now as recordedAtMs
  -> update cadence window from recordedAtMs
  -> advance local pose and view
  -> mutate authoritative or predicted state
  -> gate host publication or client update by recordedAtMs age
  -> advance ooze spawn/decay from recordedAtMs
  -> stamp room and snapshot with recordedAtMs
  -> project runtime stores
  -> update camera and world from RAF elapsedMs
  -> draw minimap
  -> capture optional debug frame containing both time families
  -> render post-processing output
```

## Domains in use

```txt
application shell and screen routing
UI loading, pause, completion, settings and terminal projection
session mode, peer identity, room, roster, readiness and reset
lobby identity, actor binding, readiness, start and bootstrap
runtime startup, readiness, frame lifecycle, failure containment and cleanup
browser time sources, cadence, simulation time and clock-generation gap
PeerJS host/client transport and BroadcastChannel bridge
protocol envelopes, serialization, request and sequence admission
seeded maze topology, cube placement, target sequence and random streams
snapshot construction, publication, acceptance, delivery and backpressure
keyboard, mouse, pointer lock, focus, visibility and input lifecycle
movement, collision, camera, prediction and host admission
cube interactions, slot claims, anomaly sequence and ooze pressure
Three.js world, camera, post-processing, bloom and disposal
render-surface sizing, presentation policy and frame correlation
HUD, minimap and debug projection
validation, build and deployment
```

## Implemented kits and offered services

The repository retains 29 source-backed kit responsibilities:

```txt
corridor-application-shell-kit
  routing, solo/host/client entry, loading, pause, completion and exits

corridor-session-domain-kit
  session mode, peer identity, room, roster, connection, readiness and reset

runtime-store-snapshot-kit
  authoritative snapshot, pose, view, input flags and readiness

ui-pause-projection-kit
  pause state, reason and overlay projection

ui-completion-projection-kit
  terminal state, message, timestamp, acknowledgement and routing

complete-screen-presentation-kit
  outcome presentation, restart and title exit

lobby-screen-presentation-kit
  room, roster, ready badges, controls and connection state

peer-host-transport-kit
  host peer, connections, broadcast, targeted send and destroy

peer-client-transport-kit
  host connection, send, status, disconnect and destroy

peer-event-bus-kit
  typed events, subscription and cleanup

protocol-message-construction-kit
  START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT

protocol-serialization-kit
  JSON encode/decode, protocol version and shape checks

maze-snapshot-bootstrap-kit
  seed, maze, players, cubes, anomaly, room and initial snapshot

seeded-maze-rng-kit
  deterministic topology, cube placement and target sequence

first-person-input-kit
  keyboard, pointer lock, look accumulation and input snapshots

movement-collision-camera-kit
  movement, maze collision, eye pose, walk shake and camera

network-player-update-kit
  client sequence/cadence, pose envelope and host consume

corridor-interaction-domain-kit
  action inference, pickup, drop, place, remove and held-cube synchronization

ordered-anomaly-sequence-kit
  ordered validation, slots and victory evaluation

ooze-trail-domain-kit
  spawn, decay, variation, spacing, capacity and ooze level

snapshot-outcome-routing-kit
  victory projection, pause projection and playing fallback

corridor-authoritative-publication-kit
  tick increment, snapshot clone, SYNC construction, broadcast and reason

corridor-animation-loop-kit
  RAF start/stop, delta, elapsed timestamp, running guard and successor scheduling

corridor-render-world-kit
  terrain, maze, cubes, players, anomaly, ooze, props, lights, update and disposal

corridor-post-processing-kit
  composer, bloom, output, resize, render and disposal

corridor-minimap-kit
  2D sizing, maze, players, cubes, ooze and heading

runtime-debug-frame-kit
  activation, bounded frames/events, overlay and export

runtime-resource-cleanup-kit
  RAF stop, unsubscribe, observer disconnect, listener removal and GPU cleanup

package-validation-kit
  build, lint, ProtoKit smoke, harness, visual match, object review and live-player validation
```

## Temporal source findings

```txt
RAF timestamp source
  createAnimationLoop step(timeMs)
  deltaMs = timeMs - previousTimeMs
  elapsedMs passed to camera shake and world.update

wall-clock source
  nowMs = Date.now
  view last-input timestamps
  cadenceWindowStartedAtMs
  lastNetworkTickAtMs
  lastUiSyncAtMs
  authoritative room.updatedAt
  snapshot.timestampMs
  completion.atMs
  ooze decay eligibility and lastOozeDecayTime
```

## Concrete divergence paths

### Backward wall-clock correction

```txt
lastNetworkTickAtMs = 100000
Date.now becomes 90000

recordedAtMs - lastNetworkTickAtMs < 0
  -> host publication/client update can remain ineligible
  -> UI cadence can remain ineligible
  -> ooze decay can remain ineligible
  -> RAF movement, camera and world animation continue
```

### Forward wall-clock correction

```txt
last accepted wall time = 100000
Date.now becomes 500000

  -> cadence window rolls immediately
  -> publication/update threshold qualifies immediately
  -> ooze decay interval qualifies immediately
  -> snapshot wall timestamp jumps
  -> RAF timeline remains continuous and unrelated
```

### Pause/resume or hidden-tab stall

```txt
route policy may stop simulation
RAF and wall clocks retain different origins and lifecycle behavior
resume has no clock generation or bounded first delta
snapshot and visible frame have no common time revision
```

## Missing authority

```txt
runtime clock ID
clock revision
source identity
sample admission result
clock regression/jump classification
authoritative simulation elapsed time
fixed-step sequence and bounded batch result
pause/resume clock state
reset clock generation
snapshot simulation-time projection
render-time projection
frame-to-clock acknowledgement
bounded clock journal
```

## Required parent domain

```txt
corridor-canonical-runtime-clock-authority-domain
```

## Candidate coordinating kits

```txt
runtime-clock-id-kit
runtime-clock-revision-kit
monotonic-time-source-kit
wall-clock-observation-kit
clock-sample-command-kit
clock-sample-admission-kit
clock-discontinuity-classifier-kit
simulation-time-state-kit
simulation-step-sequence-kit
simulation-step-budget-kit
pause-clock-policy-kit
resume-clock-generation-kit
reset-clock-generation-kit
network-cadence-clock-kit
ui-cadence-clock-kit
ooze-decay-clock-kit
snapshot-clock-projection-kit
render-time-projection-kit
clock-frame-correlation-kit
clock-observation-kit
clock-journal-kit
clock-regression-fixture-kit
clock-forward-jump-fixture-kit
pause-resume-clock-fixture-kit
snapshot-clock-roundtrip-fixture-kit
render-simulation-time-parity-fixture-kit
```

## Required authority flow

```txt
raw RAF/performance and UTC samples
  -> normalize source and runtime generation
  -> admit against prior clock revision
  -> classify normal, regressed, jumped, stalled or reset
  -> apply pause/reset and bounded-delta policy
  -> commit simulation time and fixed-step batch
  -> execute movement, interactions, ooze and publication
  -> project clock evidence into snapshot
  -> derive one render-time projection
  -> render every mandatory consumer
  -> acknowledge visible frame with clock revision and simulation step
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
4h. Canonical Runtime Clock, Pause/Reset Generations and Frame Correlation
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

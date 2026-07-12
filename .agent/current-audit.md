# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T05-59-28-04-00`

## Status

```txt
status: runtime-frame-failure-containment-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local update completes
```

## Summary

HorrorCorridor runs simulation, networking, runtime-store projection, Three.js world updates, minimap drawing, debug capture and post-processing inside one RAF callback. The loop schedules its successor only after that callback returns.

Any thrown frame stage therefore stops future frames while the controller remains marked running. Earlier side effects may already be committed, readiness remains true, input and network listeners remain live, resources remain allocated and no fatal surface or cleanup transaction runs.

## Plan ledger

**Goal:** define one frame-failure containment authority that records exact stage progress, preserves the last-known-good frame, fences mutation, revokes readiness, disposes deterministically and admits only a new runtime generation.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read current root `.agent` state and retained startup, readiness, render, input and network audits.
- [x] Read `GameCanvas.tsx` and `animationLoop.ts`.
- [x] Confirm successor RAF scheduling occurs after `onFrame`.
- [x] Confirm exceptions leave `running = true` without a pending successor.
- [x] Confirm host snapshots can be published before render completion.
- [x] Confirm client movement can be sent before render completion.
- [x] Confirm cleanup is tied to effect teardown, not frame failure.
- [x] Confirm readiness and mutation capabilities remain live after a dead frame.
- [x] Reconcile all 29 implemented kits and services.
- [x] Define frame, stage, failure, quarantine, cleanup and cold-restart contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state.
- [ ] Runtime implementation and executable fault-injection fixtures remain future work.

## Product interaction loop

```txt
createAnimationLoop.step(time)
  -> return when running is false
  -> calculate delta
  -> call GameCanvas onFrame
  -> schedule next RAF only after onFrame returns

host/solo onFrame
  -> read UI state
  -> advance local pose and view
  -> update player in authoritative game state
  -> synchronize held cubes
  -> optionally advance ooze
  -> build authoritative snapshot
  -> set runtime authoritative snapshot
  -> broadcast SYNC to peers
  -> update local runtime stores
  -> synchronize camera
  -> update Three.js world
  -> draw minimap
  -> append optional debug frame
  -> post-process and submit visible frame

client onFrame
  -> advance predicted pose and view
  -> optionally send PLAYER_UPDATE
  -> synchronize carry state
  -> update runtime stores
  -> synchronize camera and world
  -> draw minimap and debug
  -> post-process and submit visible frame
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding readiness start and bootstrap
runtime startup acquisition rollback retry and first-frame commit
runtime readiness lifecycle exit disconnect and reconnect
runtime frame admission stage execution failure quarantine disposal and restart gap
PeerJS host/client transport and BroadcastChannel local bridge
protocol envelopes serialization request and sequence admission
seeded maze topology cube placement target sequence and random streams
replicated snapshot construction publication acceptance delivery and backpressure
keyboard mouse pointer lock focus visibility and input lifecycle
held-control leases input revisions neutralization and retirement
movement collision camera prediction and host admission
interaction target cube/slot claims ordered anomaly and ooze pressure
Three.js world renderer post-processing bloom and cleanup
render-surface observation policy sizing revision and frame correlation
active gameplay presentation policy and consumer admission
HUD and minimap surface ownership mount lifecycle and projection
runtime debug capability capture overlay and export
validation build and deployment
```

## Implemented kits and offered services

The repository retains 29 source-backed kit responsibilities:

```txt
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion and exits
corridor-session-domain-kit            session mode, peer identity, room, roster, readiness and reset
runtime-store-snapshot-kit             authoritative snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, pause reason and overlay projection
ui-completion-projection-kit           terminal state, message, timestamp, acknowledgement and routing
complete-screen-presentation-kit       outcome presentation, restart and title exit
lobby-screen-presentation-kit          room, roster, ready badges, controls and connection state
peer-host-transport-kit                host peer, connections, broadcast, targeted send and destroy
peer-client-transport-kit              host connection, send, status, disconnect and destroy
peer-event-bus-kit                     typed events, subscription and cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT
protocol-serialization-kit             JSON encode/decode, protocol version and shape checks
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly, room and initial snapshot
seeded-maze-rng-kit                    deterministic topology, cube placement and target sequence
first-person-input-kit                 keyboard, pointer lock, look accumulation and input snapshots
movement-collision-camera-kit          movement, maze collision, eye pose, walk shake and camera
network-player-update-kit              client sequence/cadence, pose envelope and host consume
corridor-interaction-domain-kit        action inference, pickup, drop, place, remove and held-cube sync
ordered-anomaly-sequence-kit           ordered validation, slots and victory evaluation
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           snapshot-to-UI outcome projection
corridor-authoritative-publication-kit tick, snapshot clone, SYNC construction and broadcast
corridor-animation-loop-kit            RAF lifecycle, delta, running guard and successor scheduling
corridor-render-world-kit              terrain, maze, objects, lights, update, attach and disposal
corridor-post-processing-kit           composer, bloom, output, resize, render and disposal
corridor-minimap-kit                   2D sizing, maze, players, cubes, ooze and heading
runtime-debug-frame-kit                activation, bounded frames/events, overlay and export
runtime-resource-cleanup-kit           loop stop, observer/listener cleanup and GPU disposal
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Source findings

```txt
successor RAF scheduled before frame callback: no
successor RAF scheduled after frame callback: yes
frame-level catch: no
stage-level result contract: no
controller running flag cleared on throw: no
host simulation mutates before render: yes
host snapshot/store publication before render: yes
host peer broadcast before render: yes
client predicted pose before render: yes
client PLAYER_UPDATE before render: possible
runtime store sync before render: yes
world update before post-processing: yes
minimap update before post-processing: yes
debug capture before post-processing: yes
cleanup invoked automatically on frame failure: no
readiness revoked automatically: no
fatal UI projected automatically: no
cold restart transaction: no
```

## Concrete failure paths

### Host render fault

```txt
advance host pose
  -> mutate authoritative game state
  -> publish snapshot and broadcast
  -> project runtime stores
  -> world or post-processing throws
  -> next RAF is never scheduled
  -> peers can display a newer snapshot than host canvas
  -> screen and readiness remain active
  -> input and transport listeners remain live
```

### Client render fault

```txt
advance predicted pose
  -> send PLAYER_UPDATE
  -> project runtime stores
  -> world or post-processing throws
  -> host may accept movement
  -> client canvas remains stale
  -> client loop stops but transport and input remain reachable
```

### Partial presentation fault

```txt
world update succeeds
  -> minimap draw succeeds
  -> debug frame records current state
  -> post-processing throws
  -> minimap/debug may be current
  -> main canvas remains previous or partial
  -> no shared committed-frame acknowledgement exists
```

## Required parent domain

```txt
corridor-runtime-frame-failure-containment-authority-domain
```

## Candidate coordinating kits

```txt
runtime-frame-id-kit
frame-stage-id-kit
frame-execution-plan-kit
frame-stage-admission-kit
frame-stage-result-kit
frame-mutation-journal-kit
frame-failure-id-kit
frame-failure-classification-kit
frame-failure-admission-kit
runtime-failure-state-kit
last-known-good-snapshot-kit
last-known-good-visible-frame-kit
frame-rollback-or-retire-policy-kit
runtime-mutation-quarantine-kit
input-capability-fence-kit
transport-capability-fence-kit
readiness-revocation-kit
render-freeze-kit
fatal-overlay-projection-kit
resource-disposal-plan-kit
resource-disposal-result-kit
runtime-terminal-result-kit
cold-restart-command-kit
cold-restart-admission-kit
cold-restart-result-kit
first-replacement-frame-ack-kit
frame-failure-observation-kit
frame-failure-journal-kit
frame-fault-injection-fixture-kit
browser-frame-recovery-smoke-kit
```

## Required authority flow

```txt
admit immutable FramePlan
  -> execute ordered stages with typed receipts
  -> retain mutation and publication evidence
  -> require mandatory world, minimap and post-processing acknowledgements
  -> commit visible frame and schedule successor

first stage failure
  -> admit one FrameFailureResult
  -> reject remaining stages and future frames
  -> retain previous committed snapshot/frame identity
  -> retire input and fence gameplay/network mutation
  -> revoke readiness
  -> freeze or replace damaged visual surfaces
  -> dispose resources or publish retained-frozen policy
  -> publish terminal observation
  -> admit restart only into a new runtime generation
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
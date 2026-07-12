# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T02-49-19-04-00`

## Status

```txt
status: active-gameplay-presentation-hud-minimap-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local update completes
```

## Summary

The active runtime owns a complete minimap drawing function, but the React HUD tree does not mount its canvas during `PLAYING`. `HUDOverlay` returns a minimal active branch containing only settings and debug surfaces. The minimap appears only in the `COMPLETED` branch.

`GameCanvas` still searches for `runtime-minimap` every RAF and calls `drawMinimapFrame`. The missing canvas is accepted as a void no-op. There is no screen-policy result, surface lease, consumer admission result, projection acknowledgement or visible-frame receipt that can expose the missing required consumer.

## Plan ledger

**Goal:** define one active-gameplay presentation authority that owns screen policy, HUD/minimap surface leases, consumer admission, projection results and committed-frame proof.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read current root `.agent` state.
- [x] Read `GameShell.tsx`, `GameCanvas.tsx`, `HUDOverlay.tsx` and `Minimap.tsx`.
- [x] Confirm the active gameplay minimap mount is absent.
- [x] Confirm the completed-state minimap mount is present.
- [x] Confirm per-frame missing-canvas behavior is a silent no-op.
- [x] Identify the interaction loop, domains, all 29 implemented kits and services.
- [x] Define presentation policy, leases, consumer results and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Product interaction loop

```txt
screen enters PLAYING
  -> GameCanvas initializes Three.js world and RAF
  -> HUDOverlay mounts no Minimap
  -> each render frame updates camera and world
  -> GameCanvas searches document for runtime-minimap
  -> search returns null
  -> minimap draw exits
  -> debug capture occurs
  -> post-processing renders world
  -> terminal outcome sets screen to COMPLETED
  -> HUDOverlay mounts Minimap
  -> snapshot-replay frames can finally draw it
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding readiness start and bootstrap
runtime startup acquisition rollback retry and first-frame commit
runtime readiness lifecycle exit disconnect and reconnect
PeerJS host/client transport and BroadcastChannel local bridge
protocol envelopes serialization request and sequence admission
seeded maze topology cube placement target sequence and random streams
replicated snapshot construction publication acceptance delivery and backpressure
pointer lock keyboard mouse blur and input lifecycle
movement collision camera prediction and host admission
interaction target cube/slot claims ordered anomaly and ooze pressure
Three.js world renderer post-processing bloom and cleanup
render-surface observation policy sizing revision and frame correlation
active gameplay presentation policy and consumer admission
HUD and minimap surface ownership, mount lifecycle and projection
runtime debug capability, capture, overlay and export
validation build and deployment
```

## Implemented kits and services

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
corridor-animation-loop-kit            RAF lifecycle, delta and running guard
corridor-render-world-kit              terrain, maze, objects, lights, update, attach and disposal
corridor-post-processing-kit           composer, bloom, output, resize, render and disposal
corridor-minimap-kit                   2D sizing, maze, players, cubes, ooze and heading
runtime-debug-frame-kit                activation, bounded frames/events, overlay and export
runtime-resource-cleanup-kit           loop stop, observer/listener cleanup and GPU disposal
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Source findings

```txt
HUDOverlay accepts only PLAYING or COMPLETED: yes
PLAYING branch mounts Minimap: no
PLAYING branch mounts SettingsOverlay: yes
PLAYING branch mounts FrameDebugPanel: yes
COMPLETED branch mounts Minimap: yes
GameCanvas queries minimap canvas every RAF: yes
canvas lookup mechanism: document.getElementById
missing canvas handling: return without result
active minimap visibility proof: absent
surface lease/revision: absent
consumer registry: absent
screen-policy result: absent
presentation frame ID: absent
consumer acknowledgement barrier: absent
```

## Main finding

```txt
implemented service
  -> corridor-minimap-kit can draw the active maze state

composition
  -> active HUD omits the canvas

runtime
  -> draw is attempted against null every frame
  -> failure is silent

terminal transition
  -> completed HUD mounts the first usable minimap canvas
```

This is a service-reachability and authority defect rather than a missing drawing implementation.

## Required parent domain

```txt
corridor-active-gameplay-presentation-authority-domain
```

## Candidate kits

```txt
presentation-frame-id-kit
presentation-frame-plan-kit
active-gameplay-hud-policy-kit
presentation-consumer-registry-kit
hud-surface-lease-kit
minimap-surface-lease-kit
presentation-consumer-admission-kit
world-projection-result-kit
hud-projection-result-kit
minimap-projection-result-kit
debug-projection-result-kit
presentation-consumer-ack-kit
presentation-frame-commit-kit
presentation-frame-journal-kit
active-play-hud-reachability-fixture-kit
minimap-mount-lifecycle-fixture-kit
presentation-consumer-parity-fixture-kit
browser-gameplay-hud-smoke-kit
```

## Required authority flow

```txt
screen transition
  -> resolve named consumer policy
  -> mount/acquire required HUD surfaces
  -> publish lease and surface revisions

RAF
  -> create immutable PresentationFramePlan
  -> admit each required/optional consumer
  -> project world, HUD, minimap and debug
  -> return typed results
  -> reject commit when mandatory consumers are unavailable
  -> commit one visible frame receipt
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

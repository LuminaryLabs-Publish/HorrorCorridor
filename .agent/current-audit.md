# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T09-38-46-04-00`

## Status

```txt
status: loading-transition-generation-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local update completes
```

## Summary

The repository retains a 29-kit browser runtime spanning application routing, session/lobby state, PeerJS transport, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current audit isolates pre-run loading transitions. `runLoadingSteps()` changes the route to `LOADING`, then yields through five requestAnimationFrame callbacks and five 90 ms timers. `enterSoloRun()` and host `startPlay()` resume afterward and commit room, identity, snapshot, readiness and route state without a loading generation, cancellation check or stale-predecessor validation.

## Plan ledger

**Goal:** make every solo or host start a single-flight, generation-bound transaction whose inputs are sealed before yielding and whose result can commit only if the route, session, room and loading generation remain current.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible synchronized repository.
- [x] Read current root `.agent` state and retained audits.
- [x] Read `GameShell.tsx`, `StartMenu.tsx`, `LobbyScreen.tsx` and `GameCanvas.tsx`.
- [x] Trace loading steps, async yield boundaries, retained closure inputs and store commits.
- [x] Reconcile the full interaction loop, domains, 29 implemented kits and services.
- [x] Define loading admission, cancellation, sealed input, atomic commit and first-frame proof.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and registry.
- [ ] Runtime implementation and executable loading-race fixtures remain future work.

## Product interaction loop

```txt
browser route or transport event
  -> choose solo, host or client session
  -> solo/host start invokes async loading sequence
  -> route changes to LOADING
  -> five RAF + timeout step pairs execute
  -> retained room/roster/identity/connection inputs are used
  -> maze and snapshot bootstrap is created
  -> session, runtime and UI stores are mutated
  -> host broadcasts START_GAME and initial SYNC
  -> GameCanvas initializes once from the first snapshot
  -> input, simulation, networking and rendering begin
```

## Domains in use

```txt
application shell and screen routing
UI loading, pause, completion, settings and terminal projection
session mode, peer identity, room, roster, readiness and reset
lobby identity, actor binding, readiness, start and bootstrap
loading-step orchestration, async leases and transition-generation gap
runtime startup, readiness, frame lifecycle, failure containment and cleanup
browser clocks, cadence, simulation time and clock generations
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
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion and exits
corridor-session-domain-kit            identity, room, roster, connection, readiness and reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, reason and overlay
ui-completion-projection-kit           terminal state, message, timestamp and routing
complete-screen-presentation-kit       outcome presentation, restart and title exit
lobby-screen-presentation-kit          room, roster, readiness and controls
peer-host-transport-kit                connections, broadcast, targeted send and destroy
peer-client-transport-kit              host connection, send, status and destroy
peer-event-bus-kit                     typed events, subscription and cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT
protocol-serialization-kit             encode, decode, version and shape checks
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly and initial snapshot
seeded-maze-rng-kit                    deterministic topology, placement and target sequence
first-person-input-kit                 keyboard, pointer lock, look and snapshots
movement-collision-camera-kit          movement, collision, eye pose, shake and camera
network-player-update-kit              sequence, cadence, pose envelope and host consume
corridor-interaction-domain-kit        pickup, drop, place, remove and held-cube sync
ordered-anomaly-sequence-kit           ordered slots, validation and victory
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           snapshot state to UI route
corridor-authoritative-publication-kit tick, clone, SYNC and broadcast
corridor-animation-loop-kit            RAF start/stop, delta, elapsed and successor scheduling
corridor-render-world-kit              terrain, maze, objects, actors, lights, update and disposal
corridor-post-processing-kit           composer, bloom, sizing, render and disposal
corridor-minimap-kit                   maze, players, cubes, ooze and heading
runtime-debug-frame-kit                activation, bounded capture, overlay and export
runtime-resource-cleanup-kit           loop, subscriptions, listeners, observers and GPU cleanup
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Loading-transition findings

### Async sequence

```txt
runLoadingSteps()
  -> setScreen("LOADING")
  -> setGameScreen("loading")
  -> set loading overlay
  -> for five steps
       setLoadingStep(index)
       await requestAnimationFrame
       await setTimeout(90)
```

### Commit paths after the yield

```txt
enterSoloRun()
  -> creates a new room ID, player ID and seed source
  -> writes session identity, room, snapshot, screen and readiness

startPlay() for host
  -> uses room, lobbyPlayers, peerIdentity and connectionStatus captured before await
  -> creates bootstrap
  -> writes room, snapshot, screen and readiness
  -> broadcasts START_GAME
  -> broadcasts initial SYNC
```

### Missing controls

```txt
loading command ID
loading generation
single-flight lock
cancellation token
owned RAF and timeout leases
route predecessor
session predecessor
sealed room/roster/readiness input
stale closure detection
candidate bootstrap validation
atomic multi-store commit
duplicate broadcast suppression
rollback result
first visible frame receipt
```

## Concrete failure paths

### Stale host start

```txt
host presses Start run
  -> loading yields for about five display/timer steps
  -> peer joins, leaves or changes readiness
  -> closure still holds predecessor lobbyPlayers and connectionStatus
  -> bootstrap commits from stale lobby input
  -> START_GAME and SYNC publish that stale run
```

### Cancel or replacement during loading

```txt
loading generation A begins
  -> component unmounts, route/session is reset or generation B supersedes A
  -> no cancellation or predecessor check exists
  -> generation A resumes and writes PLAYING plus a new snapshot
```

### World/snapshot split

```txt
bootstrap A commits first
  -> GameCanvas initializes once and builds maze/world A
bootstrap B commits later
  -> runtime store authoritativeSnapshot becomes B
  -> initialized guard prevents rebuilding retained world geometry
  -> rendering can project snapshot B through world A
```

## Required parent domain

```txt
corridor-loading-transition-generation-authority-domain
```

## Candidate coordinating kits

```txt
loading-command-id-kit
loading-generation-kit
loading-phase-state-kit
loading-step-plan-kit
loading-step-result-kit
loading-cancellation-token-kit
route-predecessor-kit
session-predecessor-kit
lobby-snapshot-seal-kit
loading-admission-kit
loading-single-flight-kit
loading-timeout-lease-kit
loading-frame-lease-kit
stale-loading-result-rejection-kit
candidate-run-bootstrap-kit
run-bootstrap-validation-kit
loading-commit-kit
loading-rollback-kit
loading-observation-kit
loading-journal-kit
first-run-frame-ack-kit
overlapping-start-fixture-kit
route-exit-during-load-fixture-kit
lobby-change-during-load-fixture-kit
unmount-during-load-fixture-kit
world-snapshot-generation-parity-fixture-kit
```

## Required authority flow

```txt
StartRunCommand
  -> validate source route and session mode
  -> allocate command ID and loading generation
  -> enforce single-flight or explicitly supersede predecessor
  -> seal room, roster, readiness, identity and connection revisions
  -> own every RAF/timeout step through cancellable leases
  -> create candidate bootstrap outside live stores
  -> validate candidate run, seed, room and transport outputs
  -> re-check route, session and generation before commit
  -> atomically publish session, runtime, UI and transport results
  -> reject late results from cancelled or predecessor generations
  -> build world from the committed bootstrap generation
  -> acknowledge first visible frame with run and loading generation
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
3a. Loading Transition Generation, Cancellation and Atomic Commit
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

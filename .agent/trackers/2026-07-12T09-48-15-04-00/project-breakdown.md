# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-12T09-48-15-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`

## Summary

This run selected `HorrorCorridor` because its repo-local loading-transition audit at `2026-07-12T09-38-46-04-00` was newer than the central ledger entry at `2026-07-12T07-41-06-04-00`. The runtime remains documentation-only: solo and host starts cross five RAF/timer pairs and can later commit stale route, lobby, identity, connection and bootstrap state without a loading generation, cancellation token, predecessor check or atomic commit receipt.

## Plan ledger

**Goal:** preserve the complete repository breakdown, reconcile repo-local and central audit state, and keep loading-transition generation authority as the current implementation boundary.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Prioritize `HorrorCorridor` because its current repo-local audit was newer than central tracking.
- [x] Inspect the current root `.agent` routing and machine registry.
- [x] Verify `runLoadingSteps()`, `enterSoloRun()`, host `startPlay()` and one-time world initialization.
- [x] Identify the interaction loop, all domains, all 29 implemented kits and every offered service.
- [x] Retain the loading-transition generation parent domain and fixture boundary.
- [x] Add a fresh timestamped tracker, turn ledger and audit family.
- [x] Refresh required root `.agent` files and machine-readable registry.
- [x] Prepare central ledger and internal change-log synchronization.
- [x] Work only in `HorrorCorridor`; create no branch or pull request.
- [ ] Runtime implementation and executable loading-race fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     central 2026-07-12T07-41-06-04-00; repo-local 2026-07-12T09-38-46-04-00 selected
ZombieOrchard      2026-07-12T07-51-04-04-00
MyCozyIsland       2026-07-12T08-00-16-04-00
TheUnmappedHouse   2026-07-12T08-10-36-04-00
AetherVale         2026-07-12T08-31-49-04-00
PrehistoricRush    2026-07-12T09-01-44-04-00
TheOpenAbove       2026-07-12T09-02-10-04-00
IntoTheMeadow      2026-07-12T09-21-40-04-00
PhantomCommand     2026-07-12T09-28-05-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` is modified in the Publish organization.

## Complete interaction loop

```txt
browser route or transport event
  -> choose solo, host or client session
  -> solo or host start calls runLoadingSteps()
  -> route changes to LOADING
  -> five steps each await one requestAnimationFrame and one 90 ms timer
  -> retained room, roster, readiness, identity and connection values are reused
  -> createInitialGameState() builds a run bootstrap
  -> session, runtime and UI stores are mutated independently
  -> host may broadcast START_GAME and initial SYNC
  -> GameCanvas initializes once from the first authoritative snapshot
  -> retained Three.js world geometry is built from that snapshot
  -> input, simulation, networking, minimap, debug and post-processing continue
```

## Domains in use

```txt
application shell and screen routing
UI loading, pause, completion, settings and terminal projection
session mode, peer identity, room, roster, readiness and reset
lobby identity, actor binding, readiness, start and bootstrap
loading-step orchestration, async leases and transition-generation authority gap
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
validation, build, deployment and central audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `corridor-application-shell-kit` | Routing, solo/host/client entry, loading, pause, completion and exits |
| `corridor-session-domain-kit` | Identity, room, roster, connection, readiness and reset |
| `runtime-store-snapshot-kit` | Snapshot, pose, view, input flags and readiness |
| `ui-pause-projection-kit` | Pause state, reason and overlay |
| `ui-completion-projection-kit` | Terminal state, message, timestamp and routing |
| `complete-screen-presentation-kit` | Outcome presentation, restart and title exit |
| `lobby-screen-presentation-kit` | Room, roster, readiness and controls |
| `peer-host-transport-kit` | Connections, broadcast, targeted send and destroy |
| `peer-client-transport-kit` | Host connection, send, status and destroy |
| `peer-event-bus-kit` | Typed events, subscription and cleanup |
| `protocol-message-construction-kit` | START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT |
| `protocol-serialization-kit` | Encode, decode, version and shape checks |
| `maze-snapshot-bootstrap-kit` | Seed, maze, players, cubes, anomaly and initial snapshot |
| `seeded-maze-rng-kit` | Deterministic topology, placement and target sequence |
| `first-person-input-kit` | Keyboard, pointer lock, look and snapshots |
| `movement-collision-camera-kit` | Movement, collision, eye pose, shake and camera |
| `network-player-update-kit` | Sequence, cadence, pose envelope and host consume |
| `corridor-interaction-domain-kit` | Pickup, drop, place, remove and held-cube synchronization |
| `ordered-anomaly-sequence-kit` | Ordered slots, validation and victory |
| `ooze-trail-domain-kit` | Spawn, decay, variation, spacing, capacity and pressure |
| `snapshot-outcome-routing-kit` | Snapshot state to UI route |
| `corridor-authoritative-publication-kit` | Tick, clone, SYNC and broadcast |
| `corridor-animation-loop-kit` | RAF start/stop, delta, elapsed and successor scheduling |
| `corridor-render-world-kit` | Terrain, maze, objects, actors, lights, update and disposal |
| `corridor-post-processing-kit` | Composer, bloom, sizing, render and disposal |
| `corridor-minimap-kit` | Maze, players, cubes, ooze and heading |
| `runtime-debug-frame-kit` | Activation, bounded capture, overlay and export |
| `runtime-resource-cleanup-kit` | Loop, subscriptions, listeners, observers and GPU cleanup |
| `package-validation-kit` | Build, lint, harness, visual and live-player checks |

## Source-backed findings

```txt
runLoadingSteps async boundaries: 5 RAF callbacks + 5 timers
loading command ID: absent
loading generation: absent
single-flight admission: absent
cancellation or supersession result: absent
owned RAF/timer leases: absent
sealed lobby/readiness inputs: absent
route/session predecessor validation: absent
candidate bootstrap validation: absent
atomic multi-store commit: absent
duplicate START_GAME/SYNC suppression: absent
world/bootstrap generation parity: absent
first visible run-frame receipt: absent
```

`startPlay()` reads `room`, `lobbyPlayers`, `peerIdentity` and `connectionStatus` before or across the async loading wait, then commits and broadcasts from those retained values. `GameCanvas` uses an `initialized` guard and builds its retained maze/world from the first snapshot, so a later stale bootstrap can replace store state without rebuilding world topology.

## Required parent domain

```txt
corridor-loading-transition-generation-authority-domain
```

## Required transaction

```txt
StartRunCommand
  -> validate route, session mode and predecessor revisions
  -> allocate command ID, loading generation and cancellation token
  -> enforce single-flight or explicit typed supersession
  -> seal room, roster, readiness, identity and connection inputs
  -> own every RAF and timeout step through cancellable leases
  -> build and validate a detached candidate bootstrap
  -> re-check route, session and generation before commit
  -> atomically publish session, runtime, UI and transport results
  -> reject late work from cancelled, stale or predecessor generations
  -> initialize world resources from the committed run generation
  -> acknowledge the first visible frame with run and loading generation
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-12T09-48-15-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T09-48-15-04-00.md
.agent/architecture-audit/2026-07-12T09-48-15-04-00-loading-transition-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T09-48-15-04-00-world-snapshot-generation-ledger-gap.md
.agent/gameplay-audit/2026-07-12T09-48-15-04-00-loading-race-source-reconciliation.md
.agent/interaction-audit/2026-07-12T09-48-15-04-00-start-command-central-admission-map.md
.agent/central-sync-audit/2026-07-12T09-48-15-04-00-repo-ledger-machine-registry-contract.md
.agent/deploy-audit/2026-07-12T09-48-15-04-00-loading-fixture-central-gate.md
```

## Validation boundary

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network/input/movement/render behavior changed: no
deployment changed: no
branch created: no
pull request created: no
runtime commands run: no
loading-race fixtures: unavailable
browser/Pages loading smoke: not run
```

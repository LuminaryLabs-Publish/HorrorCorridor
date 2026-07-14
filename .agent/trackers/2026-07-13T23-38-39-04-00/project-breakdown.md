# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-13T23-38-39-04-00`  
**Source revision inspected:** `e8d1f80574e36a613d2e5935022999e84577e797`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS and same-origin BroadcastChannel transport, deterministic maze bootstrap, movement, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current audit isolates loading-progress truth and readiness evidence. The five visible loading rows are advanced only by one animation frame plus a 90 ms timer. No named row executes or observes the work it claims. Maze bootstrap happens after the rows finish, while renderer, scene, post-processing and world construction begin only after the UI has already entered `PLAYING` and marked rendering ready.

## Plan ledger

**Goal:** make every displayed loading state derive from accepted subsystem work and prevent playable/readiness claims until the matching bootstrap, renderer and first visible frame are proven.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no eligible repository is new, missing, undocumented or runtime-ahead.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` under the oldest eligible rule.
- [x] Inspect `GameShell.tsx`, `LoadingScreen.tsx`, `GameCanvas.tsx`, session/runtime stores, protocol surfaces and package scripts.
- [x] Identify the complete interaction loop, active domains, all implemented kits and their services.
- [x] Define the loading-progress and readiness-evidence authority family.
- [x] Add a timestamped tracker, turn ledger and focused audit family.
- [x] Refresh all required root `.agent` documents and machine registry.
- [ ] Implement the authority and executable source/build/browser/Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
runtime-ahead repositories: 0
selected: HorrorCorridor
selection basis: oldest eligible central documentation timestamp
excluded: TheCavalryOfRome
```

## Complete interaction loop

```txt
solo or host selects start
  -> runLoadingSteps sets screen LOADING
  -> loading row 0 becomes active
  -> wait one requestAnimationFrame
  -> wait 90 ms
  -> repeat for five authored labels
  -> no subsystem command or receipt is associated with any row
  -> createInitialGameState executes after all rows
  -> session, snapshot, UI and readiness are committed
  -> screen becomes PLAYING
  -> GameCanvas mounts later
  -> renderer, scene, post-processing and maze world are constructed
  -> canvas and listeners are attached
  -> animation loop begins
  -> first visible frame is not acknowledged

client path
  -> SYNC is accepted
  -> screen and all readiness flags become ready immediately
  -> client bypasses the loading plan entirely
  -> GameCanvas mounts and attempts visual construction afterward
```

## Domains in use

```txt
application shell and route lifecycle
solo, host and client session entry
room, roster, peer identity, connection and readiness stores
loading plan, step identity, progress publication and cancellation
maze bootstrap, seed, topology, players, cubes and anomaly preparation
PeerJS and BroadcastChannel transport
protocol construction, serialization and message handling
runtime snapshot, pose, input, cadence and publication
first-person input, movement, collision, camera and pointer lock
cube interactions, ordered anomaly sequence and ooze pressure
React loading, lobby, pause, completion, HUD and minimap projection
Three.js renderer, scene, camera, world, bloom and frame scheduling
first-frame and visible-readiness evidence
cleanup, validation, build, deployment and central tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit: routing, solo/host/client entry, loading, pause, completion, exit
corridor-session-domain-kit: identity, room, roster, connection, readiness, reset
runtime-store-snapshot-kit: snapshot, pose, view, input flags, readiness
ui-pause-projection-kit: pause state, reason, overlay
ui-completion-projection-kit: terminal state, message, timestamp, routing
complete-screen-presentation-kit: outcome presentation, restart, title exit
lobby-screen-presentation-kit: room, roster, ready state, controls
peer-host-transport-kit: PeerJS host, BroadcastChannel bridge, connections, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit: PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy
peer-event-bus-kit: typed transport events, subscription, cleanup
protocol-message-construction-kit: START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit: encode, decode, protocol version, structural validation
maze-snapshot-bootstrap-kit: seed, maze, players, cubes, anomaly, initial snapshot
seeded-maze-rng-kit: topology, placement, target sequence
first-person-input-kit: keyboard, pointer lock, look, snapshots
movement-collision-camera-kit: movement, collision, eye pose, shake, camera
network-player-update-kit: sequence, cadence, pose envelope, host consume
corridor-interaction-domain-kit: pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit: ordered slots, validation, victory
ooze-trail-domain-kit: spawn, decay, variation, spacing, capacity, pressure
snapshot-outcome-routing-kit: snapshot state to UI outcome
corridor-authoritative-publication-kit: tick, clone, SYNC, broadcast
corridor-animation-loop-kit: RAF start, RAF stop, delta, elapsed, successor scheduling
corridor-render-world-kit: terrain, maze, objects, actors, lights, update, dispose
corridor-post-processing-kit: composer, bloom, resize, render, dispose
corridor-minimap-kit: maze, players, cubes, ooze, heading
runtime-debug-frame-kit: activation, bounded capture, overlay, export
runtime-resource-cleanup-kit: loop, subscriptions, listeners, observers, GPU cleanup
package-validation-kit: build, lint, harness, visual and live-player checks

implemented source-backed kit surfaces: 29
```

## Source-backed findings

```txt
loading labels: Maze field, Terrain raycast, Object kits, PBR materials, Lighting pass
per-row work command: absent
per-row result or receipt: absent
progress calculation: active array index
progress timing: one RAF plus 90 ms per row
maze bootstrap during named loading rows: no
maze bootstrap after rows finish: yes
renderer/scene/world construction during rows: no
render construction after PLAYING commit: yes
render readiness set before renderer creation: yes
client SYNC bypasses loading plan: yes
loading attempt identity: absent
cancellation or supersession after waits: absent
first visible frame acknowledgement: absent
```

## Main finding

The loading screen is a timed presentation sequence, not an observation of work. It can report `PBR materials` or `Lighting pass` complete before the renderer exists, can continue after route/session replacement, and can transition to `PLAYING` before any visual provider has committed a frame. The client path has a different readiness path and skips the same plan entirely.

## Required parent domain

```txt
corridor-loading-progress-readiness-evidence-authority-domain
```

## Candidate coordinating kits

```txt
load-command-kit
load-attempt-id-kit
load-generation-kit
load-work-plan-kit
load-step-id-kit
load-step-command-kit
load-step-result-kit
load-progress-derivation-kit
load-cancellation-kit
load-timeout-kit
maze-bootstrap-preparation-kit
render-provider-preparation-kit
world-resource-preparation-kit
readiness-evidence-kit
readiness-revocation-kit
first-render-submission-kit
first-visible-frame-ack-kit
load-terminal-result-kit
load-observation-journal-kit
load-progress-projection-kit
loading-truth-fixture-kit
loading-cancellation-fixture-kit
client-host-readiness-parity-fixture-kit
first-frame-readiness-fixture-kit
```

## Required transaction

```txt
CorridorLoadCommand
  -> bind route, session, room, roster and provider revisions
  -> allocate LoadAttemptId and LoadGeneration
  -> materialize an immutable work plan
  -> execute each named step through a real subsystem command
  -> publish progress only from accepted step results
  -> reject stale, duplicate, timed-out or cancelled continuations
  -> prepare maze bootstrap and visual resources before live adoption
  -> atomically commit session, runtime, UI and readiness evidence
  -> submit and acknowledge the matching first visible frame
  -> publish Completed, Failed, Cancelled, TimedOut, Stale or Superseded
  -> otherwise restore the predecessor route and resources
```

## Repo-local output

```txt
.agent/trackers/2026-07-13T23-38-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T23-38-39-04-00.md
.agent/architecture-audit/2026-07-13T23-38-39-04-00-loading-progress-readiness-evidence-dsk-map.md
.agent/render-audit/2026-07-13T23-38-39-04-00-loading-to-first-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T23-38-39-04-00-timed-loading-before-bootstrap-loop.md
.agent/interaction-audit/2026-07-13T23-38-39-04-00-load-command-step-result-map.md
.agent/loading-audit/2026-07-13T23-38-39-04-00-work-plan-progress-readiness-contract.md
.agent/deploy-audit/2026-07-13T23-38-39-04-00-loading-truth-fixture-gate.md
.agent/central-sync-audit/2026-07-13T23-38-39-04-00-repo-ledger-loading-evidence-reconciliation.md
```

## Validation

Documentation only. Runtime, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed. Existing browser and build commands were not executed. No truthful loading progress, cancellation, readiness evidence, visible-frame correlation or production-readiness claim is made.
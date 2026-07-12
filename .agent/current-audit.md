# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T14-30-36-04-00`

## Status

```txt
status: transport-error-retirement-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: current run
```

## Summary

The repository retains a 29-kit browser runtime spanning application routing, session and lobby state, PeerJS transport, a same-origin BroadcastChannel bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is transport-error retirement. `peer/error` is used for both peer-level and DataConnection-level failures but contains no error scope, remote peer, connection ID, connection generation, terminality or retryability. Host connection errors leave failed connections in the map. Client connection errors leave `activeConnection` installed. `GameShell` has no error-specific retirement branch, so room and roster state can remain authoritative after the underlying channel fails.

## Plan ledger

**Goal:** make every transport failure scoped, generation-bound, classifiable and reducible to one exactly-once retirement or recovery result with atomic session reconciliation and visible proof.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible root `.agent` entrypoints.
- [x] Select only `HorrorCorridor` because repo-local audit state was newer than central tracking.
- [x] Read current root `.agent` state and transport/session source.
- [x] Trace peer-level and connection-level errors through adapters and GameShell.
- [x] Identify the interaction loop, domains, 29 kits and services.
- [x] Define transport-error retirement authority and fixtures.
- [x] Refresh root and central documentation on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable retirement fixtures remain future work.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
selection reason: repo-local 2026-07-12T14-22-01-04-00 audit was newer than central 2026-07-12T12-21-38-04-00 tracking
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Product interaction loop

```txt
browser route
  -> choose solo, host or client

transport setup
  -> host creates PeerJS connection map or local bridge
  -> client creates active PeerJS connection or local bridge
  -> event bus publishes status, open, close, message and error

connection error
  -> DataConnection emits error
  -> adapter emits peer/error without connection identity or generation
  -> host leaves connection in map
  -> client leaves activeConnection installed
  -> GameShell ignores peer/error as a retirement transition

session and visible effect
  -> room and lobbyPlayers remain unchanged
  -> guest can remain visible as waiting or connected
  -> Start run remains available
  -> bootstrap can consume unreachable participant

replacement or late event
  -> retry can install another connection
  -> predecessor callbacks remain live
  -> no generation fence rejects late open, close, data or error
```

## Domains in use

```txt
application shell and screen routing
UI loading, pause, completion, settings and terminal projection
session mode, peer identity, room, roster, readiness and reset
lobby identity, actor binding, readiness, start and bootstrap
loading-step orchestration and transition generations
runtime startup, readiness, frame lifecycle, failure containment and cleanup
browser clocks, cadence, simulation time and clock generations
transport capability observation and mode selection
BroadcastChannel local bridge
PeerJS signalling and DataConnection transport
connection candidate, open, error, close, supersession and retirement
transport-error identity, scope, classification and policy
connection-to-actor binding and lobby-member reconciliation
room-roster revision, fingerprint and start eligibility
protocol envelopes, serialization, request and sequence admission
seeded maze topology, cube placement, target sequence and random streams
snapshot construction, publication, acceptance, delivery and backpressure
keyboard, mouse, pointer lock, focus, visibility and input lifecycle
movement, collision, camera, prediction and host admission
cube interactions, slot claims, anomaly sequence and ooze pressure
Three.js world, camera, post-processing, bloom and disposal
render-surface sizing, presentation policy and frame correlation
HUD, minimap, connection status and debug projection
validation, build, deployment and central audit tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion and exit
corridor-session-domain-kit            identity, room, roster, connection, readiness and reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, reason and overlay
ui-completion-projection-kit           terminal state, message, timestamp and routing
complete-screen-presentation-kit       outcome presentation, restart and title exit
lobby-screen-presentation-kit          room, roster, ready state and controls
peer-host-transport-kit                PeerJS host, local bridge, connection map, broadcast, targeted send, disconnect and destroy
peer-client-transport-kit              PeerJS client, local bridge, connect, send, status, disconnect and destroy
peer-event-bus-kit                     typed transport events, subscription and cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT
protocol-serialization-kit             encode, decode, version and shape validation
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly and initial snapshot
seeded-maze-rng-kit                    topology, placement and target sequence
first-person-input-kit                 keyboard, pointer lock, look and snapshots
movement-collision-camera-kit          movement, collision, eye pose, shake and camera
network-player-update-kit              sequence, cadence, pose envelope and host consume
corridor-interaction-domain-kit        pickup, drop, place, remove and held-cube synchronization
ordered-anomaly-sequence-kit           ordered slots, validation and victory
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           snapshot state to UI outcome
corridor-authoritative-publication-kit tick, clone, SYNC and broadcast
corridor-animation-loop-kit            RAF start/stop, delta, elapsed and successor scheduling
corridor-render-world-kit              terrain, maze, objects, actors, lights, update and disposal
corridor-post-processing-kit           composer, bloom, sizing, render and disposal
corridor-minimap-kit                   maze, players, cubes, ooze and heading
runtime-debug-frame-kit                activation, bounded capture, overlay and export
runtime-resource-cleanup-kit           loop, subscriptions, listeners, observers and GPU cleanup
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Transport-error findings

### Event contract

```txt
peer-level and connection-level errors share peer/error: yes
error scope field: no
remotePeerId field: no
connectionId field: no
connection generation field: no
terminal/retryable classification: no
error ID or idempotency key: no
```

### Host behavior

```txt
connection error emits peer/error: yes
connection map record removed: no
connection closed by error handler: no
connection-close event emitted: no
connection handlers detached: no
roster member reconciled: no
```

### Client behavior

```txt
connection error sets currentStatus=error: yes
peer/error emitted: yes
peer/status error emitted: yes
activeConnection cleared: no
connection handlers detached: no
room or roster policy applied: no
replacement generation allocated: no
```

### Consumer behavior

```txt
GameShell handles peer/status: yes
GameShell handles peer/connection-open: yes
GameShell handles peer/connection-close: yes
GameShell handles peer/message: yes
GameShell handles peer/error: no
```

### Late events and replacement

```txt
failed predecessor can later emit open: yes
failed predecessor can later emit close: yes
failed predecessor can later emit data: implementation callbacks remain attached
stale generation check: no
replacement supersession result: no
exactly-once retirement: no
```

## Concrete failure paths

```txt
host error without close
  -> connection remains in map
  -> guest remains in room and lobbyPlayers
  -> Start run can include unreachable actor
  -> initial broadcast skips failed channel

client error without close
  -> activeConnection remains owned
  -> status changes to error
  -> room and players remain visible
  -> retry can install replacement without retiring predecessor

late predecessor callback
  -> failed connection emits open or close later
  -> event carries no generation fence
  -> newer connection or roster state can be mutated by stale callback
```

## Missing authority

```txt
transport error identity
error scope and source classification
peer/connection/local-bridge distinction
connection and reconnect-attempt generations
error-to-connection binding
terminality and retry policy
exactly-once retirement command/result
handler detachment receipt
late-event quarantine
connection supersession result
roster reconciliation command/result
truthful status projection
start-eligibility recomputation
bounded failure observations and journal
first visible error-state frame acknowledgement
```

## Required parent domain

```txt
corridor-transport-error-retirement-authority-domain
```

## Candidate kits

```txt
transport-error-id-kit
transport-error-scope-kit
transport-error-classification-kit
connection-generation-kit
connection-error-binding-kit
connection-terminal-policy-kit
connection-retirement-command-kit
connection-retirement-admission-kit
connection-retirement-result-kit
connection-handler-detachment-kit
late-connection-event-quarantine-kit
peer-signalling-recovery-kit
client-reconnect-attempt-kit
connection-supersession-kit
roster-reconciliation-command-kit
roster-reconciliation-result-kit
session-status-projection-kit
transport-failure-observation-kit
transport-failure-journal-kit
first-error-state-frame-ack-kit
host-error-without-close-fixture-kit
client-error-without-close-fixture-kit
peer-vs-connection-error-fixture-kit
late-open-after-error-fixture-kit
replacement-connection-stale-close-fixture-kit
start-after-error-fixture-kit
```

## Required flow

```txt
TransportErrorEnvelope
  -> allocate error ID and bind session/transport revisions
  -> classify peer, connection or local-bridge scope
  -> bind remote peer, connection ID and connection generation
  -> classify terminal, retryable, stale, duplicate or rejected

terminal connection
  -> detach callbacks
  -> close exactly once
  -> remove host-map or client-active ownership
  -> retire connection generation
  -> reconcile actor binding, room and lobbyPlayers atomically
  -> recompute start eligibility
  -> publish typed retirement and roster results
  -> acknowledge first visible error-state frame

retryable signalling failure
  -> preserve admitted data channels only under explicit policy
  -> allocate reconnect attempt generation
  -> reject late predecessor attempt events
```

## Current audit family

```txt
.agent/trackers/2026-07-12T14-30-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T14-30-36-04-00.md
.agent/architecture-audit/2026-07-12T14-30-36-04-00-transport-error-retirement-dsk-map.md
.agent/render-audit/2026-07-12T14-30-36-04-00-errored-connection-visible-roster-gap.md
.agent/gameplay-audit/2026-07-12T14-30-36-04-00-error-without-close-ghost-participant-loop.md
.agent/interaction-audit/2026-07-12T14-30-36-04-00-peer-error-retirement-map.md
.agent/transport-error-audit/2026-07-12T14-30-36-04-00-scope-generation-retirement-contract.md
.agent/deploy-audit/2026-07-12T14-30-36-04-00-transport-error-retirement-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, package scripts, dependencies and deployment were not changed. No browser, error-without-close, replacement, stale-callback, roster-reconciliation or visible-frame fixture was run.
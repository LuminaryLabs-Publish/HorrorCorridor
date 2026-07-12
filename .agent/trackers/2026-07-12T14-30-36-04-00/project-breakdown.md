# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-12T14-30-36-04-00`  
**Status:** `transport-error-retirement-authority-audited`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

This run isolates transport-error retirement. PeerJS connection-level errors and peer-level signalling errors are emitted through the same `peer/error` event shape. Connection errors do not identify the remote peer, connection ID or connection generation. The host retains the failed `DataConnection` in its map, the client retains the failed `activeConnection`, and `GameShell` has no `peer/error` branch capable of reconciling roster or route state.

## Plan ledger

**Goal:** bind every transport failure to an explicit scope and generation, retire terminal connections exactly once, reconcile authoritative membership atomically, quarantine late callbacks and prove the first visible error or recovered state.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` because its `14:22:01` repo-local audit was newer than the central ledger.
- [x] Inspect root `.agent` state, `createHost.ts`, `createClient.ts`, `peerEvents.ts`, `peerTypes.ts`, `GameShell.tsx`, `sessionStore.ts` and `LobbyScreen.tsx`.
- [x] Identify the interaction loop, active domains, all 29 implemented kits and offered services.
- [x] Define the transport-error retirement authority and fixture boundary.
- [x] Add architecture, render, gameplay, interaction, transport-error and deploy audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement runtime retirement and executable error-order fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     central 2026-07-12T12-21-38-04-00, local 2026-07-12T14-22-01-04-00, selected unsynchronized
ZombieOrchard      2026-07-12T12-39-25-04-00
MyCozyIsland       2026-07-12T12-58-08-04-00
TheUnmappedHouse   2026-07-12T13-08-15-04-00
AetherVale         2026-07-12T13-20-00-04-00
TheOpenAbove       2026-07-12T13-29-56-04-00
IntoTheMeadow      2026-07-12T13-54-00-04-00
PhantomCommand     2026-07-12T13-59-50-04-00
PrehistoricRush    2026-07-12T14-10-22-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` is changed in the Publish organization.

## Product interaction loop

```txt
browser route
  -> choose solo, host or client

transport creation
  -> host owns a PeerJS connection map or local-bridge records
  -> client owns one active PeerJS connection or local-bridge record
  -> adapters publish status, open, close, message and error events

connection failure
  -> DataConnection emits error
  -> adapter publishes peer/error without remotePeerId, connectionId or generation
  -> host leaves failed connection in the map
  -> client leaves failed activeConnection installed
  -> GameShell ignores peer/error as a state transition

visible/session effect
  -> global status may become error on the client
  -> room and lobbyPlayers remain unchanged
  -> host roster can retain an errored guest
  -> Start run remains available and bootstrap consumes current lobbyPlayers

late or replacement callbacks
  -> old connection can later emit open or close
  -> no generation fence distinguishes predecessor from replacement
  -> stale callbacks can mutate current membership or status
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
transport-error scope, classification, terminality and retry policy
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

## Implemented kits and services

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

## Source-backed findings

```txt
peer/error distinguishes peer-level from connection-level failure: no
peer/error includes remotePeerId: no
peer/error includes connectionId: no
peer/error includes connection generation: no
peer/error includes terminal or retryable classification: no
host connection error removes connection map record: no
host connection error closes connection: no
host connection error emits connection-close: no
client connection error clears activeConnection: no
client connection error detaches callbacks: no
GameShell handles peer/error: no
room or roster reconciled after error-only terminal path: no
late events from failed connection generation rejected: no
typed retirement result: no
first visible error/recovery frame acknowledgement: no
```

## Concrete failure paths

```txt
host error without close
  -> guest may already be admitted
  -> DataConnection emits error
  -> peer/error has no connection identity
  -> connection remains in map
  -> GameShell leaves guest in room
  -> Start run can include unreachable participant

client error without close
  -> activeConnection remains installed
  -> global status becomes error
  -> room and roster remain visible
  -> retry can install a replacement while predecessor callbacks remain live

late predecessor event
  -> failed connection later emits open or close
  -> no generation comparison exists
  -> stale callback can alter current status or membership
```

## Required parent domain

```txt
corridor-transport-error-retirement-authority-domain
```

## Candidate coordinating kits

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

## Required transaction

```txt
TransportErrorEnvelope
  -> assign error identity, scope and observation timestamp
  -> bind peer, remote peer, connection ID and connection generation
  -> classify signalling, connection or local-bridge failure
  -> classify terminal, retryable, stale or duplicate
  -> validate current session and transport generations

terminal connection failure
  -> detach handlers and close exactly once
  -> remove host map or client activeConnection ownership
  -> retire connection generation
  -> atomically reconcile actor binding, roster and room
  -> recompute start eligibility
  -> publish ConnectionRetirementResult and roster result
  -> acknowledge first visible lobby/error frame

retryable signalling failure
  -> preserve admitted data channels only under explicit policy
  -> enter a revisioned reconnect attempt
  -> reject late events from superseded attempts
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, package scripts, dependencies and deployment are unchanged. No browser, error-without-close, retry, stale-callback, roster-reconciliation or visible-frame fixture was run.
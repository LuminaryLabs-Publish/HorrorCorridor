# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-13T07-00-29-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`

## Summary

HorrorCorridor remains a 29-kit cooperative browser runtime. This pass isolates cross-store session transition coherence: `GameShell` coordinates independent Zustand session, runtime and UI stores through ordered setter calls, while `GameCanvas`, `HUDOverlay`, lobby surfaces and diagnostics subscribe to different subsets of those stores.

The source has no transition identity, predecessor revisions, participant prepare/commit results, rollback, coherent frame envelope or visible acknowledgement. Host start and client `START_GAME`/`SYNC` handling can therefore expose intermediate combinations of room, roster, snapshot, readiness and screen state.

## Plan ledger

**Goal:** make each route, lobby, run-start, sync, pause, completion and exit transition one revisioned transaction whose session, runtime and UI participants either commit coherently or remain unchanged.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing or repo-local-newer-than-central.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` as the oldest eligible central entry.
- [x] Read `GameShell`, the session/runtime/UI stores, `GameCanvas` and `HUDOverlay`.
- [x] Identify the complete interaction loop, active domains, all 29 implemented kits and offered services.
- [x] Define the cross-store transition authority and fixture boundary.
- [x] Add the timestamped tracker, turn ledger and system audit family.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable cross-store fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 0

HorrorCorridor     2026-07-13T03-38-31-04-00 selected oldest
ZombieOrchard      2026-07-13T03-59-28-04-00
MyCozyIsland       2026-07-13T04-21-10-04-00
TheUnmappedHouse   2026-07-13T04-47-00-04-00
AetherVale         2026-07-13T05-00-02-04-00
TheOpenAbove       2026-07-13T05-19-21-04-00
IntoTheMeadow      2026-07-13T05-40-11-04-00
PhantomCommand     2026-07-13T05-59-03-04-00
PrehistoricRush    2026-07-13T06-39-10-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` was modified in the Publish organization.

## Complete interaction loop

```txt
route or network intent
  -> GameShell invokes independent session/runtime/UI store actions
  -> each action publishes its own store revision immediately
  -> React subscribers may render between participant mutations
  -> GameCanvas initializes from one runtime snapshot plus a fresh session read
  -> HUDOverlay independently combines UI, session and runtime selections
  -> Three.js world, lobby, HUD, minimap and overlays project the observed combination
  -> no combined transition result or coherent-frame acknowledgement is published
```

### Host start

```txt
host presses Start
  -> asynchronous loading steps
  -> create bootstrap from captured room and roster
  -> setRoom
  -> setLobbyPlayers again
  -> setAuthoritativeSnapshot
  -> resetUi
  -> setScreen / setGameScreen / setPaused / setOverlay
  -> setReadiness
  -> broadcast START_GAME
  -> broadcast SYNC separately
```

### Client start and sync

```txt
START_GAME
  -> replace room and roster
  -> update host identity and connection status
  -> leave prior/null snapshot, screen and readiness in place

later SYNC
  -> replace room and roster again
  -> replace authoritative snapshot
  -> mutate completion/pause/playing UI through additional calls
  -> set readiness
```

## Domains in use

```txt
application shell and route lifecycle
session mode, room, roster, peer identity and connection
runtime snapshot, local pose, input and readiness
UI screen, game-screen, overlay, pause and completion
cross-store transition identity, revision and atomic commit
client join and host start admission
PeerJS and BroadcastChannel transport
protocol START_GAME, SYNC and LOBBY_EVENT handling
seeded maze bootstrap and replicated state
input, movement, collision, camera and prediction
cube interaction, anomaly sequence and ooze pressure
Three.js world, post-processing, minimap and HUD projection
debug readback, cleanup, validation and Pages deployment
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
peer-host-transport-kit: PeerJS host, BroadcastChannel bridge, connection map, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit: PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy
peer-event-bus-kit: typed transport events, subscription, cleanup
protocol-message-construction-kit: START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit: encode, decode, protocol version, structural shape validation
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
corridor-animation-loop-kit: RAF start/stop, delta, elapsed, successor scheduling
corridor-render-world-kit: terrain, maze, objects, actors, lights, update, disposal
corridor-post-processing-kit: composer, bloom, sizing, render, disposal
corridor-minimap-kit: maze, players, cubes, ooze, heading
runtime-debug-frame-kit: activation, bounded capture, overlay, export
runtime-resource-cleanup-kit: loop, subscriptions, listeners, observers, GPU cleanup
package-validation-kit: build, lint, harness, visual, live-player checks
```

## Source-backed findings

```txt
single cross-store transaction owner: absent
transition ID or generation: absent
expected session/runtime/UI revisions: absent
participant prepare results: absent
participant commit or rollback results: absent
setRoom already updates lobbyPlayers: yes
GameShell commonly calls setLobbyPlayers again: yes
second roster call rewrites room.updatedAt with Date.now(): yes
START_GAME and SYNC correlated by one transition ID: no
START_GAME can install room before snapshot/UI/readiness: yes
host local commit happens before two separate network broadcasts: yes
GameCanvas combines runtime snapshot with a fresh session read: yes
HUDOverlay independently combines three stores: yes
readiness derived from a committed transition receipt: no
first coherent visible-frame acknowledgement: absent
```

## Required authority

```txt
corridor-cross-store-session-transition-authority-domain
```

## Candidate kits

```txt
session-transition-command-kit
transition-id-kit
transition-generation-kit
participant-revision-kit
transition-precondition-kit
session-transition-candidate-kit
runtime-transition-candidate-kit
ui-transition-candidate-kit
room-roster-coherence-kit
snapshot-room-coherence-kit
identity-snapshot-binding-kit
screen-snapshot-coherence-kit
readiness-derivation-kit
participant-prepare-result-kit
participant-commit-result-kit
participant-rollback-kit
cross-store-transition-result-kit
start-sync-correlation-kit
transition-late-event-quarantine-kit
transition-journal-kit
transition-observation-kit
coherent-frame-envelope-kit
first-coherent-frame-ack-kit
cross-store-zero-partial-fixture-kit
start-sync-order-fixture-kit
completion-transition-fixture-kit
```

## Required transaction

```txt
SessionTransitionCommand
  -> allocate TransitionId and generation
  -> validate expected session/runtime/UI revisions
  -> construct detached participant candidates
  -> validate room/roster/snapshot/identity/screen coherence
  -> prepare every participant without publishing
  -> commit all participant revisions or none
  -> publish one CrossStoreTransitionResult
  -> bind START_GAME and SYNC to the same transition generation
  -> derive readiness from the committed result
  -> render one CoherentFrameEnvelope
  -> publish FirstCoherentFrameAck
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, package scripts, dependencies and deployment were not changed. No atomic-store, transition-order, rollback, coherent-frame or production-readiness claim is made until focused fixtures pass on `main`.
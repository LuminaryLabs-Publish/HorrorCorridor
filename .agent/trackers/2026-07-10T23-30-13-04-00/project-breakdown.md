# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run:** `2026-07-10T23-30-13-04-00`

## Goal

Document the current pause and resume control path, prove where local UI pause diverges from authoritative simulation/network state, preserve the existing lifecycle gate ordering, and define a bounded pause-convergence fixture without changing runtime behavior.

## Plan ledger

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory against `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select one repository using the oldest documented-selection rule.
- [x] Inspect `GameShell`, `GameCanvas`, `uiStore`, shared replicated types, protocol constructors, runtime debug, and package scripts.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Identify implemented kits and the services they offer.
- [x] Identify pause/resume authority, input-suspension, and projection gaps.
- [x] Define candidate DSK cuts and a deterministic fixture gate.
- [x] Preserve the existing lobby-entry and run-exit dependency order.
- [x] Keep runtime source, dependencies, scripts, routes, visuals, and network behavior unchanged.
- [x] Create no branch or pull request.
- [x] Push only to `main`.
- [x] Synchronize the central repo ledger and internal change log.

## Selection

The accessible organization inventory contains ten repositories. All nine eligible non-Cavalry repositories were already tracked and had root `.agent` state. `HorrorCorridor` had the oldest eligible central review timestamp at the beginning of this run.

```txt
HorrorCorridor       selected / 2026-07-10T21-39-22-04-00
PhantomCommand       tracked  / 2026-07-10T21-49-26-04-00
ZombieOrchard        tracked  / 2026-07-10T22-11-24-04-00
TheUnmappedHouse     tracked  / 2026-07-10T22-21-17-04-00
MyCozyIsland         tracked  / 2026-07-10T22-29-21-04-00
PrehistoricRush      tracked  / 2026-07-10T22-42-00-04-00
AetherVale           tracked  / 2026-07-10T22-50-02-04-00
IntoTheMeadow        tracked  / 2026-07-10T22-58-36-04-00
TheOpenAbove         tracked  / 2026-07-10T23-20-41-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/HorrorCorridor` was changed.

## Interaction loop

```txt
solo, host, or client enters PLAYING
  -> GameCanvas installs global keyboard, pointer-lock, mouse, blur, resize, runtime, and transport handlers
  -> Escape or pointer-lock loss calls uiStore.setPaused and changes only local screen/overlay state
  -> animation loop checks uiState.screen before advancing local simulation
  -> currentGameState.gameState and replicated room phase remain playing/active
  -> host transport handler continues consuming PLAYER_UPDATE and TRY_INTERACT while host UI is paused
  -> host publication forces room.phase active and sends SYNC
  -> client GameShell consumes every SYNC and chooses PAUSED/PLAYING from snapshot.gameState
  -> snapshot.gameState was never changed to paused
  -> client pause is overwritten by the next host SYNC
  -> global key handlers remain installed and input flags are not atomically cleared
  -> interact can still execute because it checks currentGameState.gameState, not the UI pause transaction
  -> resume changes local UI back to PLAYING without an authority result or peer convergence proof
```

## Domains in use

```txt
application shell and screen routing
UI overlay, pause, completion, and game-screen projection
session mode, peer identity, room, roster, and connection state
runtime authoritative snapshot, pose, view, input flags, and readiness
lobby presentation and controls
PeerJS host/client transport and BroadcastChannel bridge
peer event bus and transport status projection
versioned protocol envelopes and serialization
seeded maze, cube, anomaly, room, and player bootstrap
room phase and replicated app/game state
pointer lock, keyboard, mouse, blur, and global input lifecycle
movement, collision, camera, walk shake, and client prediction
client player-update publication and host consumption
cube interaction, carry state, placement, removal, and rollback
ordered anomaly completion and victory
 ooze cadence, decay, spawn, spacing, and capacity
authoritative snapshot construction and publication
client snapshot replay and local projection
Three.js world, terrain, props, lights, cubes, players, ooze, and scene dressing
animation loop, resize, canvas, and resource ownership
post-processing and bloom
minimap and HUD projection
runtime debug frames and events
component cleanup and resource disposal
build, lint, harness, visual, object-kit, and live-player validation
planned lobby readiness/start admission authority
planned run-exit/session-epoch authority
planned pause/resume command and simulation admission authority
planned input suspension, projection convergence, and pause fixture
```

## Implemented kits and services

```txt
corridor-application-shell-kit
  screen routing, menu orchestration, run entry, local pause/resume callbacks, completion, exit callbacks
corridor-session-domain-kit
  session mode, peer identity, room, roster, connection status, reset
runtime-store-snapshot-kit
  authoritative snapshot, local pose, view angles, input flags, readiness, reset
ui-pause-projection-kit
  local pause flag, reason, overlay, screen switching, resume projection
lobby-screen-presentation-kit
  room metadata, roster, ready badges, controls, connection state
peer-host-transport-kit
  host peer, connection registry, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit
  host connection, send, local bridge, status, destroy
peer-event-bus-kit
  typed events, subscribe, unsubscribe, clear
protocol-message-construction-kit
  START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT envelopes
maze-snapshot-bootstrap-kit
  deterministic seed, maze, cubes, anomaly, active room, players, initial snapshot
first-person-input-kit
  keyboard flags, pointer lock, look accumulation, snapshots
movement-collision-camera-kit
  movement integration, collision, eye position, walk shake, camera projection
network-player-update-kit
  client send, host consume, pose projection, cadence
corridor-interaction-domain-kit
  pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit
  ordered validation, rollback, ending phase, victory
ooze-trail-domain-kit
  cadence, decay, spawn, spacing and capacity guards
corridor-authoritative-publication-kit
  snapshot tick, full sync, broadcast, reason, cadence accounting
corridor-animation-loop-kit
  RAF start/stop, delta calculation, cancellation
corridor-render-world-kit
  terrain, maze, cubes, players, anomaly, ooze, props, lights, attach/update/dispose
corridor-post-processing-kit
  composer, bloom, output, resize, render, dispose
corridor-minimap-kit
  maze and object top-down projection
runtime-debug-frame-kit
  bounded frame/event rows and JSON-safe export
runtime-resource-cleanup-kit
  RAF stop, transport unsubscribe, observer/listener removal, world/composer/renderer disposal, canvas removal
package-validation-kit
  build, lint, ProtoKit smoke, harness, visual match, object-kit review, live-player validation
```

## Source findings

1. `uiStore.setPaused()` updates only UI pause, overlay, and screen state. It does not mutate `ReplicatedGameSnapshot.gameState`, room phase, or an authority ledger.
2. The animation loop uses `uiState.screen === "PLAYING"` as its local simulation admission check.
3. The host transport subscription remains active while paused and continues applying remote `PLAYER_UPDATE` and `TRY_INTERACT` messages.
4. Host publication writes `room.phase: "active"` and emits a new snapshot even when the host UI is paused.
5. `GameShell` chooses client PAUSED versus PLAYING from `snapshot.gameState`, not `snapshot.appState` or an accepted pause result.
6. Local pause never changes `snapshot.gameState` to `paused`, so the next host `SYNC` sends clients back to PLAYING.
7. A client that presses Escape stops its own local simulation temporarily, but inbound authoritative traffic can immediately clear that pause projection.
8. Pointer-lock loss also uses the same local-only pause path and is therefore not stable under multiplayer sync.
9. Global key listeners remain installed during pause, input flags are not atomically cleared, and `interact` calls `applyInteraction()` before input-state mutation.
10. `applyInteraction()` admits work when `currentGameState.gameState === "playing"`; that value remains playing during local pause.
11. Resume is a local screen change with no request id, authority check, result, peer acknowledgement, or projection transaction.
12. Runtime debug records frame screen and pointer-lock state but has no pause command, result, authority source, accepted phase pair, input-suspension row, or convergence status.
13. No DOM-free pause/resume fixture or package command exists.

## Main finding

Pause is currently a presentation flag, not a gameplay/network authority boundary. Solo pause mostly halts local simulation, but multiplayer pause can diverge immediately: host UI pause does not stop remote command consumption, client pause is overwritten by the next `SYNC`, and interaction/input state remains partially live because replicated game state never enters a paused transaction.

## Required authority boundary

```txt
pause or resume intent
  -> command envelope with actor, role, room, game, epoch, reason, and request id
  -> authority policy selects solo-local, host-global, or client-local policy explicitly
  -> validate current phase and allowed transition
  -> atomically suspend or resume simulation, interaction, input, and publication policy
  -> produce accepted, rejected, or no-change result
  -> publish authoritative state when policy is global
  -> project UI, game state, pointer-lock expectation, readiness, and input suspension from one result
  -> retain bounded JSON-safe command/result/convergence rows
```

## Candidate kits

```txt
pause-command-kit
pause-authority-policy-kit
pause-transition-result-kit
simulation-admission-kit
input-suspension-kit
pointer-lock-pause-adapter-kit
pause-publication-policy-kit
pause-projection-transaction-kit
pause-convergence-ledger-kit
pause-debug-projection-kit
pause-resume-fixture-kit
legacy-local-pause-compatibility-kit
```

## Ordered safe ledges

```txt
1. HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
2. HorrorCorridor Run Exit Authority + Session Epoch Re-entry Fixture Gate
3. HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

Pause authority should consume the session identity, epoch, message-admission, and result conventions established by the first two gates rather than creating a parallel control model.

## Validation

Documentation only. Runtime source, package scripts, dependencies, routes, rendering behavior, deployment, and network behavior were not changed. Existing checks were not run because `fixture:pause-convergence` does not exist and current commands cannot prove multiplayer pause authority or input suspension.
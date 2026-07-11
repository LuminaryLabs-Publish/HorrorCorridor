# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T23-30-13-04-00`

## Status

```txt
status: run-exit-authority-first-pause-resume-authority-dependent
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-10T23-30-13-04-00-horrorcorridor-audit.md
```

## Selection

No eligible repository was new, absent from the central ledger, missing root `.agent` state, or otherwise undocumented. `HorrorCorridor` was the oldest eligible documented fallback. `TheCavalryOfRome` remained excluded.

## Interaction loop

```txt
enter solo, host, or client PLAYING state
  -> GameCanvas owns input, pointer lock, animation, local simulation/prediction, host command consumption, rendering, minimap, and runtime debug
  -> Escape, blur, or pointer-lock loss changes local UI pause state
  -> local RAF stops advancing simulation when screen is PAUSED
  -> currentGameState.gameState remains playing and room.phase remains active
  -> host transport callback still consumes remote player updates and interactions
  -> host publication emits new active SYNC rows
  -> client GameShell selects PAUSED only when snapshot.gameState is paused
  -> normal host snapshot therefore projects client back to PLAYING
  -> input state and interaction admission are not atomically suspended
  -> resume changes local UI only
```

## Domains in use

```txt
application shell and screen routing
UI overlay, pause, completion, and game-screen projection
session mode, identity, room, roster, and connection state
runtime snapshot, local pose, view angles, input flags, and readiness
lobby presentation and controls
PeerJS host/client transport and BroadcastChannel bridge
peer event bus and transport status projection
versioned protocol envelopes and serialization
seeded maze, cube, anomaly, room, and player bootstrap
room phase and replicated app/game state
pointer lock, keyboard, mouse, blur, and input lifecycle
movement, collision, camera, walk shake, and prediction
client player-update publication and host consumption
interaction, cube carry, placement, removal, rollback, and victory
ooze cadence, decay, spawn, spacing, and capacity
authoritative snapshot construction and publication
client snapshot replay and local pose projection
Three.js scene, maze world, terrain, props, lights, cubes, players, ooze, and dressing
animation loop, resize, canvas, and frame ownership
post-processing composer and bloom
minimap and HUD projection
runtime debug frames and events
resource disposal and component cleanup
build, lint, harness, visual, object-kit, and live-player validation
planned lobby readiness/start admission authority
planned run-exit/session-epoch authority
planned pause/resume command and policy authority
planned simulation/interaction admission and input suspension
planned pause projection convergence and fixture
```

## Implemented kits and services

```txt
corridor-application-shell-kit
  screen routing, menu orchestration, run entry, local pause/resume, completion, exit callbacks
corridor-session-domain-kit
  mode, peer identity, room, roster, connection status, reset
runtime-store-snapshot-kit
  authoritative snapshot, local pose, view angles, input flags, readiness, reset
ui-pause-projection-kit
  local pause flag, reason, overlay, PLAYING/PAUSED projection
lobby-screen-presentation-kit
  roster, ready badges, room status, controls, connection state
peer-host-transport-kit
  host peer, connection registry, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit
  host connection, send, local bridge, status, destroy
peer-event-bus-kit
  typed events, subscriptions, clear
protocol-message-construction-kit
  START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT envelopes
maze-snapshot-bootstrap-kit
  deterministic seed, maze, cubes, anomaly, active room, players, initial snapshot
first-person-input-kit
  keyboard/pointer state, pointer lock, look accumulation, snapshots
movement-collision-camera-kit
  movement integration, collision, eye position, walk shake, camera projection
network-player-update-kit
  client update send, host update consume, pose projection, cadence
corridor-interaction-domain-kit
  pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit
  ordered validation, rollback, ending phase, victory
ooze-trail-domain-kit
  cadence, decay, spawn, spacing and capacity guards
corridor-authoritative-publication-kit
  tick, full sync, broadcast, reason, cadence accounting
corridor-animation-loop-kit
  RAF start/stop and delta calculation
corridor-render-world-kit
  terrain, maze, cubes, players, anomaly, ooze, props, lights, attach/update/dispose
corridor-post-processing-kit
  composer, bloom, output, resize, render, dispose
corridor-minimap-kit
  maze and object top-down projection
runtime-debug-frame-kit
  bounded frame/event records and JSON-safe browser export
runtime-resource-cleanup-kit
  listener removal, observer disconnect, world/composer/renderer disposal, canvas removal
package-validation-kit
  build, lint, ProtoKit smoke, harness, visual match, object-kit review, live-player validation
```

## Source findings

```txt
uiStore.setPaused mutates local UI only
local simulation admission reads uiState.screen
host transport consumption does not consult pause state
host publication forces room.phase active
client SYNC projection reads snapshot.gameState
local pause never changes snapshot.gameState to paused
client pause can be erased by the next normal SYNC
pointer-lock loss uses the same local-only path
global key listeners remain active during pause
input flags and look deltas are not cleared atomically
interact may execute because applyInteraction checks currentGameState.gameState, which remains playing
resume has no command, result, authority source, revision, or acknowledgement
runtime debug has no pause command/result/convergence projection
no fixture:pause-convergence command exists
```

## Main finding

Pause is not a coherent runtime authority boundary. Solo, host, and client modes currently interpret pause differently through incidental UI and frame-loop behavior. Host UI pause can coexist with remote gameplay mutation, client pause can be overwritten by authoritative traffic, and input/interaction state is not suspended through one transaction.

## Current next safe ledge

```txt
HorrorCorridor Run Exit Authority + Session Epoch Re-entry Fixture Gate
```

## Newly documented dependent ledge

```txt
HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Required dependency order

```txt
lobby readiness/start admission authority
  -> sealed roster and initial session identity
  -> run-exit command/result authority
  -> authoritative phase/store transition and session epoch
  -> pause command/result authority
  -> simulation and interaction admission
  -> input suspension and pointer-lock adapter
  -> pause publication and projection transaction
  -> JSON-safe convergence ledger
  -> DOM-free pause fixture
  -> browser solo/host/client pause smoke
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
existing checks run: no
session lifecycle fixture: unavailable
pause convergence fixture: unavailable
repo-local docs pushed to main: yes
central ledger updated: yes
central change log added: yes
```
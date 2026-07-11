# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T01-01-32-04-00`

## Status

```txt
status: run-exit-commit-session-epoch-transport-quarantine-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-11T01-01-32-04-00-horror-corridor-run-exit-commit-transport-quarantine.md
```

## Selection

No eligible repository was new, absent from the central ledger, missing root `.agent` state, or otherwise undocumented. `HorrorCorridor` was the oldest eligible documented fallback. `TheCavalryOfRome` remained excluded.

## Interaction loop

```txt
enter solo, host, or client PLAYING state
  -> GameCanvas initializes local runtime ownership
  -> host/solo mutates and publishes authoritative state
  -> client predicts and sends gameplay commands
  -> victory or pause menu exposes restart/return controls
  -> returnToLobby resets UI and readiness only
  -> GameCanvas unmount cleanup stops local frame/render/input ownership
  -> active/ending room and authoritative snapshot remain stored
  -> PeerJS/BroadcastChannel transport remains connected
  -> GameShell transport handler remains active
  -> START_GAME/SYNC/LOBBY_EVENT are accepted without run-session admission
  -> late old-run SYNC can replace lobby projection
  -> re-entry creates a new bootstrap without monotonic epoch fencing
```

## Domains in use

```txt
application shell and screen routing
UI overlay, pause, completion, and game-screen projection
session mode, peer identity, room, roster, and connection state
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
planned run-session identity and epoch authority
planned run-exit command/result authority
planned lifecycle publication and projection commit
planned transport quarantine and stale callback admission
planned snapshot archive/reset and re-entry bootstrap
planned pause/resume and input-suspension authority
```

## Implemented kits and services

```txt
corridor-application-shell-kit
  screen routing, menu orchestration, run entry, local pause/resume, completion, exit callbacks
corridor-session-domain-kit
  session mode, peer identity, room, roster, connection status, session reset
runtime-store-snapshot-kit
  authoritative snapshot, local pose, view angles, input flags, runtime readiness, runtime reset
ui-pause-projection-kit
  local pause flag, pause reason, pause overlay, PLAYING/PAUSED local projection
lobby-screen-presentation-kit
  room metadata, roster projection, ready badges, primary/secondary controls, connection status
peer-host-transport-kit
  host peer, connection registry, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit
  host connection, send, local bridge, status, disconnect, destroy
peer-event-bus-kit
  typed transport events, subscribe, unsubscribe, clear
protocol-message-construction-kit
  versioned envelopes, START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
maze-snapshot-bootstrap-kit
  deterministic seed, maze, cubes, anomaly, active room, players, initial snapshot
first-person-input-kit
  keyboard state, pointer lock, look accumulation, input snapshots
movement-collision-camera-kit
  movement integration, maze collision, eye position, walk shake, camera projection
network-player-update-kit
  client update send, host update consume, pose projection, network cadence
corridor-interaction-domain-kit
  pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit
  ordered validation, rollback, ending phase, victory
ooze-trail-domain-kit
  cadence, decay, spawn, spacing guard, capacity guard
corridor-authoritative-publication-kit
  snapshot tick, full sync, broadcast, publication reason, cadence accounting
corridor-animation-loop-kit
  RAF start, RAF stop, delta calculation, idempotent running state
corridor-render-world-kit
  terrain, maze, cubes, players, anomaly, ooze, props, lights, attach, update, dispose
corridor-post-processing-kit
  composer, bloom, output, resize, render, dispose
corridor-minimap-kit
  maze projection, player markers, cube markers, anomaly markers
runtime-debug-frame-kit
  bounded frames, bounded events, overlay preferences, JSON-safe browser export
runtime-resource-cleanup-kit
  RAF stop, transport unsubscribe, observer disconnect, listener removal, world/composer/renderer disposal, canvas removal
package-validation-kit
  build, lint, ProtoKit smoke, harness, visual match, object-kit review, live-player validation
```

## Source findings

```txt
GameShell.returnToLobby resets UI and readiness but does not change room.phase
GameShell.returnToLobby does not clear/archive authoritativeSnapshot
GameShell.returnToLobby intentionally leaves transport connected
GameShell.handleTransportEvent accepts START_GAME, SYNC, and LOBBY_EVENT without exit/epoch preflight
SYNC directly selects COMPLETED, PAUSED, or PLAYING from snapshot.gameState
GameCanvas cleanup stops RAF, unsubscribes its transport listener, removes browser listeners, and disposes render resources
GameCanvas cleanup leaves networking readiness true
GameCanvas authoritative publication forces room.phase active
RoomState, ReplicatedGameSnapshot, and NetworkEnvelope have no runSessionId or sessionEpoch
transport destroy is available for title exit but returns no typed teardown result
no terminal lifecycle publication exists for lobby return, restart, client leave, host close, or room close
no transport quarantine blocks callbacks captured before an accepted exit
no fixture:session-lifecycle command exists
```

## Main finding

HorrorCorridor has a renderer/component teardown path, but no session transaction that commits exit across gameplay state, room phase, snapshot ownership, transport admission, peer projection, and re-entry identity. The highest-risk gap is not raw disposal. It is the interval after local cleanup while old transport callbacks remain admissible.

## Current next safe ledge

```txt
HorrorCorridor Run Exit Commit + Session Epoch Transport Quarantine Fixture Gate
```

## Dependent ledge

```txt
HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Required dependency order

```txt
lobby readiness/start admission authority
  -> sealed roster and initial runSessionId/sessionEpoch
  -> typed run-exit command/result
  -> freeze gameplay and transport command admission
  -> authoritative lifecycle publication
  -> UI/runtime/snapshot exit commit
  -> transport preserve/destroy policy
  -> old-epoch callback quarantine
  -> exactly-once teardown result
  -> fresh re-entry bootstrap and epoch increment
  -> JSON-safe lifecycle ledger
  -> DOM-free session lifecycle fixture
  -> browser solo/host/client re-entry smoke
  -> pause/resume authority
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
existing checks run: no
session lifecycle fixture: unavailable
transport quarantine fixture: unavailable
repo-local docs pushed to main: yes
central ledger updated: yes
central change log added: yes
```

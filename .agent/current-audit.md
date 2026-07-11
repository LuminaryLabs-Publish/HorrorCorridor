# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T21-39-22-04-00`

## Status

```txt
status: run-exit-authority-session-epoch-reentry-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-10T21-39-22-04-00-horror-corridor-run-exit-session-epoch.md
```

## Selection

No eligible repository was new, absent from the central ledger, missing root `.agent` state, or otherwise undocumented. `HorrorCorridor` was the oldest eligible documented fallback. `TheCavalryOfRome` remained excluded.

## Interaction loop

```txt
enter solo, host, or client run
  -> createInitialGameState publishes an active room and initial snapshot
  -> GameCanvas initializes render/runtime ownership from authoritativeSnapshot
  -> requestAnimationFrame advances local simulation or client prediction
  -> host publishes periodic SYNC rows
  -> pause, victory, or completion exposes Return to lobby / Restart
  -> returnToLobby changes local screen, overlay, pause, and readiness flags
  -> GameCanvas unmount cleanup stops RAF and disposes local render resources
  -> sessionStore room still carries active/ending phase
  -> runtimeStore still carries the previous authoritative snapshot
  -> transport remains connected
  -> no authoritative exit/reset message is published
  -> peers can disagree about phase and old traffic can enter a later run
```

## Domains in use

```txt
application shell and screen routing
session mode, identity, room, roster, and connection state
runtime snapshot, local pose, input, and readiness projection
lobby presentation and controls
PeerJS host/client transport and local BroadcastChannel bridge
peer event bus and transport status projection
versioned protocol envelopes and serialization
seeded maze, cube, anomaly, room, and player bootstrap
room phase and game-screen state
first-person input and pointer lock
movement, collision, camera, and prediction
authoritative host player update consumption
interaction, cube carry, placement, rollback, and victory rules
ooze cadence, decay, placement, and limits
authoritative snapshot construction and publication
client snapshot replay and local pose projection
Three.js scene, maze world, terrain, props, lights, cubes, players, ooze, and scene dressing
animation loop and resize ownership
post-processing composer and bloom
minimap and HUD projection
runtime debug frames and events
resource disposal and component unmount cleanup
build, lint, harness, visual, object-kit, and live-player validation
planned lobby entry authority
planned run-exit command/result authority
planned session epoch and stale-message admission
planned teardown ledger and re-entry fixture
```

## Implemented kits and services

```txt
corridor-application-shell-kit
  screen routing, menu orchestration, run entry, pause, completion, local exit callbacks
corridor-session-domain-kit
  mode, peer identity, room, roster, connection status, reset
runtime-store-snapshot-kit
  authoritative snapshot, local pose, view angles, input flags, readiness, reset
lobby-screen-presentation-kit
  roster, ready badges, room status, primary/secondary actions
peer-host-transport-kit
  host peer, connection registry, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit
  host connection, send, local bridge, status, destroy
peer-event-bus-kit
  typed transport events, subscriptions, clear
protocol-message-construction-kit
  START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT envelopes
maze-snapshot-bootstrap-kit
  deterministic seed, maze, cubes, anomaly, active room, players, initial snapshot
first-person-input-kit
  keyboard/pointer state, pointer lock, look accumulation, snapshots
movement-collision-camera-kit
  movement integration, maze collision, eye position, walk shake, camera projection
network-player-update-kit
  client update send, host update consume, pose projection
corridor-interaction-domain-kit
  pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit
  ordered validation, rollback, ending phase, victory
 ooze-trail-domain-kit
  cadence, decay, spawn, spacing and capacity guards
corridor-authoritative-publication-kit
  tick, full sync, broadcast, reason and cadence accounting
corridor-animation-loop-kit
  idempotent start/stop and RAF cancellation
corridor-render-world-kit
  terrain, maze, cubes, players, anomaly, ooze, props, lights, attach/update/dispose
corridor-post-processing-kit
  composer, bloom, output, resize, render, dispose
corridor-minimap-kit
  maze and object top-down projection
runtime-debug-frame-kit
  bounded frame/event records and JSON-safe browser export
runtime-resource-cleanup-kit
  listener removal, ResizeObserver disconnect, world/composer/renderer disposal
package-validation-kit
  build, lint, ProtoKit smoke, harness, visual, object-kit, and live-player commands
```

## Source findings

```txt
RoomPhase already defines idle, lobby, starting, active, ending, and closed.
createInitialGameState produces an active room.
winRules moves a completed room to ending.
returnToLobby does not mutate room phase or authoritative snapshot.
returnToLobby does not broadcast a lobby reset or run-exit result.
protocol messageTypes has no RUN_EXIT, SESSION_STATE, or lifecycle result message.
PLAYER_UPDATE and TRY_INTERACT identify only roomId and actor; they carry no run epoch.
SYNC carries gameId in the snapshot but GameShell accepts every SYNC without an exit/re-entry boundary.
GameCanvas cleanup stops RAF, unsubscribes its transport listener, removes DOM listeners, disposes the world/composer/renderer, and removes the canvas.
cleanup patches networking to true even for solo and after renderer teardown.
solo returnToLobby chooses LOBBY_CLIENT because only host mode maps to LOBBY_HOST.
LOBBY_CLIENT primary action calls startPlay, which routes non-host modes to toggleReady, so a returned solo run cannot cleanly restart.
client returnToLobby is local-only; a later host SYNC can set the client back to PLAYING.
host returnToLobby leaves clients active and ignores their PLAYER_UPDATE traffic outside GameCanvas.
no session epoch, exit request id, terminal result, teardown ledger, stale-message rejection, or DOM-free lifecycle fixture exists.
```

## Main finding

Render resources are mostly disposed on component unmount, but the gameplay/network session is not exited authoritatively. Local UI state, room phase, runtime snapshot, transport state, and remote peers can diverge across pause, completion, return-to-lobby, and restart paths.

## Next safe ledge

```txt
HorrorCorridor Run Exit Authority + Session Epoch Re-entry Fixture Gate
```

## Required dependency order

```txt
lobby readiness/start admission authority
  -> sealed roster and initial session epoch
  -> typed run-exit command/result
  -> host-owned active/ending -> lobby transition
  -> authoritative lobby reset publication
  -> deterministic runtime/store teardown
  -> epoch increment before re-entry
  -> stale PLAYER_UPDATE / TRY_INTERACT / SYNC rejection
  -> JSON-safe lifecycle ledger
  -> DOM-free exit/re-entry fixture
  -> browser solo and host/client lifecycle smoke
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
existing checks run: no
session lifecycle fixture: unavailable
repo-local docs pushed to main: yes
central ledger updated: yes
central change log added: yes
```
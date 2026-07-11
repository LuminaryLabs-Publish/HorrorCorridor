# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T01-10-28-04-00`

## Status

```txt
status: run-exit-commit-session-epoch-message-admission-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-11T01-10-28-04-00-horror-corridor-run-exit-session-epoch-admission.md
```

## Selection

The full accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remained excluded. All nine eligible repositories were centrally tracked and had root `.agent` state.

`HorrorCorridor` was selected because its repo-local `2026-07-11T01-01-32-04-00` audit was newer than its `2026-07-10T23-30-13-04-00` central ledger entry. This made it the highest-priority central catch-up and also the oldest eligible central-ledger record.

## Interaction loop

```txt
enter solo, host, or client PLAYING state
  -> GameCanvas initializes local runtime ownership
  -> host/solo mutates and publishes authoritative state
  -> client predicts and sends player/interact messages
  -> pause-return or completion-restart calls returnToLobby
  -> UI and readiness change locally
  -> GameCanvas unmount stops local frame/render/input resources
  -> room phase and authoritative snapshot remain active or ending
  -> transport and GameShell message handling remain live
  -> START_GAME, SYNC, and LOBBY_EVENT are admitted without run-session identity
  -> SYNC directly projects PLAYING, PAUSED, or COMPLETED
  -> stale old-run traffic can overwrite lobby projection or cross into re-entry
```

## Domains in use

```txt
application shell and screen routing
UI overlay, pause, completion, and game-screen projection
session mode, peer identity, room, roster, readiness, and connection state
runtime snapshot, local pose, view angles, input flags, and runtime readiness
lobby presentation and controls
PeerJS host/client transport and BroadcastChannel bridge
peer event bus and connection-status projection
versioned protocol envelopes and message construction
seeded maze, cube, anomaly, room, roster, and player bootstrap
room phase and replicated app/game state
pointer lock, keyboard, mouse, blur, and input lifecycle
movement, maze collision, camera, walk shake, and local prediction
client player-update publication and host consumption
interaction, cube carry, placement, removal, rollback, and victory
ooze cadence, decay, spawn, spacing, and capacity
authoritative snapshot construction and publication
client snapshot replay and local pose projection
Three.js scene, terrain, maze, props, lights, cubes, players, ooze, and dressing
animation loop, resize, canvas, and frame ownership
post-processing composer and bloom
minimap and HUD projection
runtime debug frames and events
resource disposal and component cleanup
build, lint, harness, visual, object-kit, and live-player validation
planned run-session identity and epoch authority
planned run-exit command/result and atomic commit authority
planned lifecycle publication and projection convergence
planned transport callback generation and stale-message admission
planned snapshot archive/reset and clean re-entry
planned pause/resume and input-suspension authority
```

## Implemented kits and services

```txt
corridor-application-shell-kit
  screen routing, menu orchestration, run entry, local pause/resume, completion, exit callbacks
corridor-session-domain-kit
  session mode, peer identity, room, roster, connection status, session reset
runtime-store-snapshot-kit
  authoritative snapshot, local pose, view angles, input flags, readiness, runtime reset
ui-pause-projection-kit
  local pause flag, pause reason, pause overlay, PLAYING/PAUSED projection
lobby-screen-presentation-kit
  room metadata, roster projection, ready badges, controls, connection status
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
returnToLobby does not clear or archive authoritativeSnapshot
returnToLobby intentionally preserves transport
GameCanvas local cleanup and GameShell transport admission are separate lifecycles
GameShell accepts START_GAME, SYNC, and LOBBY_EVENT without phase/epoch preflight
SYNC directly selects COMPLETED, PAUSED, or PLAYING from snapshot.gameState
RoomState has roomId and phase but no runSessionId or sessionEpoch
ReplicatedGameSnapshot has gameId but no sessionEpoch
NetworkEnvelope has roomId and optional requestId but no gameId/runSessionId/sessionEpoch
transport destroy is available for title exit but returns no typed teardown result
no terminal lifecycle publication exists for lobby return, restart, client leave, host close, or room close
no callback-generation fence rejects events captured before an accepted exit
no fixture:session-lifecycle or fixture:session-message-admission command exists
```

## Main finding

HorrorCorridor has a renderer/component teardown path but no authority transaction that closes a run across gameplay state, room phase, snapshot ownership, peer publication, transport admission, and re-entry identity. The key defect is not simply undisposed resources. It is that old message callbacks remain valid after local teardown and can overwrite the first lobby or next-run projection.

## Current next safe ledge

```txt
HorrorCorridor Run Exit Commit + Session Epoch Message Admission Fixture Gate
```

## Required dependency order

```txt
lobby readiness/start admission authority
  -> sealed roster and initial run identity
  -> typed run-exit command/result
  -> freeze gameplay and active-message admission
  -> authoritative terminal lifecycle publication
  -> atomic UI/room/snapshot/readiness commit
  -> transport preserve-or-destroy policy
  -> monotonic session epoch and callback generation
  -> stale/duplicate message rejection
  -> exactly-once teardown result
  -> clean re-entry with incremented epoch
  -> JSON-safe lifecycle and admission ledgers
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
session message-admission fixture: unavailable
transport quarantine fixture: unavailable
repo-local docs pushed to main: yes
central ledger updated: yes
central change log added: yes
```

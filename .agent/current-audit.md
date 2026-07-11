# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T03-08-43-04-00`

## Status

```txt
status: host-movement-admission-client-reconciliation-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-11T03-08-43-04-00-horror-corridor-host-movement-client-reconciliation.md
```

## Selection

The full accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remained excluded. All nine eligible repositories are centrally tracked and have root `.agent` state.

`TheOpenAbove` received a newer repo-local terrain audit at `2026-07-11T03-01-38-04-00`, so its previous central timestamp was not used as the fallback signal. `HorrorCorridor` was the oldest current eligible root audit at `2026-07-11T01-10-28-04-00` and was the only Publish repository changed in this run.

## Product and interaction loop

```txt
menu or lobby
  -> solo, host or client run bootstrap
  -> deterministic maze, players, cubes, anomaly and ooze snapshot
  -> GameCanvas creates input, movement, transport, render and debug adapters
  -> local browser input advances a predicted pose
  -> client sends PLAYER_UPDATE with input sequence plus completed pose
  -> host consumes the message and mutates the selected player pose
  -> host publishes SYNC with a new authoritative snapshot tick
  -> client GameShell stores the snapshot
  -> active client GameCanvas renders that snapshot but continues from local poseRef
  -> only paused/completed snapshot replay copies host pose into poseRef
  -> cube interaction and ordered anomaly completion continue beside movement
  -> return/restart enters the previously documented run-exit lifecycle gap
```

## Domains in use

```txt
application shell and screen routing
UI overlay, pause, completion and settings projection
session mode, peer identity, room, roster, readiness and connection state
runtime snapshot, local pose, view angles, input flags and readiness
lobby presentation and controls
PeerJS host/client transport and BroadcastChannel bridge
peer event bus and connection-status projection
versioned protocol envelopes and message construction
seeded maze, cube, anomaly, room, roster and player bootstrap
room phase and replicated app/game state
pointer lock, keyboard, mouse, blur and input lifecycle
local movement integration, maze collision, camera and walk shake
client prediction and player-update publication
host remote-player update consumption
remote sender/player identity and update sequence admission
movement budget, velocity and collision validation
host authoritative pose result and snapshot publication
client authoritative pose reconciliation and correction smoothing
interaction, cube carry, placement, removal, rollback and victory
ooze cadence, decay, spawn, spacing and capacity
authoritative snapshot construction and publication
client snapshot replay and local pose projection
Three.js scene, terrain, maze, props, lights, cubes, players, ooze and dressing
animation loop, resize, canvas and frame ownership
post-processing composer and bloom
minimap and HUD projection
runtime debug frames and events
resource disposal and component cleanup
build, lint, harness, visual, object-kit and live-player validation
planned lobby start admission, run-session identity, run exit and message epoch authority
planned host movement admission and active client reconciliation
planned pause/resume and input-suspension authority
```

## Implemented kits and services

```txt
corridor-application-shell-kit
  screen routing, menu orchestration, run entry, local pause/resume, completion and exit callbacks

corridor-session-domain-kit
  session mode, peer identity, room, roster, connection status and session reset

runtime-store-snapshot-kit
  authoritative snapshot, local pose, view angles, input flags, runtime readiness and runtime reset

ui-pause-projection-kit
  local pause flag, pause reason, pause overlay and PLAYING/PAUSED projection

lobby-screen-presentation-kit
  room metadata, roster projection, ready badges, controls and connection status

peer-host-transport-kit
  host peer, connection registry, broadcast, targeted send, disconnect and destroy

peer-client-transport-kit
  host connection, send, local bridge, status, disconnect and destroy

peer-event-bus-kit
  typed transport events, subscribe, unsubscribe and clear

protocol-message-construction-kit
  versioned START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes

maze-snapshot-bootstrap-kit
  deterministic seed, maze, cubes, anomaly, active room, players and initial snapshot

first-person-input-kit
  keyboard state, pointer lock, look accumulation and input snapshots

movement-collision-camera-kit
  movement integration, local maze collision, eye position, walk shake and camera projection

network-player-update-kit
  client update send, host update consume, pose projection and network cadence

corridor-interaction-domain-kit
  pickup, drop, place, remove and held-cube synchronization

ordered-anomaly-sequence-kit
  ordered validation, rollback, ending phase and victory

ooze-trail-domain-kit
  cadence, decay, spawn, spacing guard and capacity guard

corridor-authoritative-publication-kit
  snapshot tick, full sync, broadcast, publication reason and cadence accounting

corridor-animation-loop-kit
  RAF start, RAF stop, delta calculation and idempotent running state

corridor-render-world-kit
  terrain, maze, cubes, players, anomaly, ooze, props, lights, attach, update and dispose

corridor-post-processing-kit
  composer, bloom, output, resize, render and dispose

corridor-minimap-kit
  maze projection, player markers, cube markers and anomaly markers

runtime-debug-frame-kit
  bounded frames, bounded events, overlay preferences and JSON-safe browser export

runtime-resource-cleanup-kit
  RAF stop, transport unsubscribe, observer disconnect, listener removal, world/composer/renderer disposal and canvas removal

package-validation-kit
  build, lint, ProtoKit smoke, harness, visual match, object-kit review and live-player validation
```

## Source findings

```txt
PLAYER_UPDATE includes input.sequence, movement input and a completed client pose
host GameCanvas ignores input.sequence and all input fields during movement mutation
host uses payload.playerId without proving senderId owns that player
applyNetworkPlayerUpdate replaces position, rotationY, pitch and velocity verbatim
host does not re-simulate movement from input
host does not validate elapsed time, displacement, velocity, collision or room phase
host publishes the copied pose as authoritative immediately
active client simulation advances poseRef locally every frame
active client uses authoritative snapshot for rendering and carry state, not pose correction
host pose is copied into poseRef only in snapshot-replay when simulation is not advancing
no prediction history, acknowledgement sequence, correction delta or smoothing policy exists
no typed PlayerUpdateAdmissionResult or ReconciliationResult exists
no movement authority fixture or client correction fixture exists
```

## Main finding

The route labels the host snapshot authoritative, but remote movement is still client-authoritative in practice. The client sends a final pose, the host trusts and republishes it, and the active client never converges back to the host pose. This creates one combined integrity gap covering impersonation, stale or duplicate updates, impossible displacement, wall traversal, speed/velocity abuse and correction failure.

## Required movement boundary

```txt
client input sample + sequence
  -> connection/player identity preflight
  -> run/room/phase admission
  -> monotonic update-sequence policy
  -> host movement budget and collision authority
  -> typed authoritative pose result
  -> snapshot publication with acknowledged client sequence
  -> client prediction-history lookup
  -> correction delta classification
  -> snap, smooth or no-change reconciliation
  -> JSON-safe movement and correction ledgers
```

## Candidate kits

```txt
player-update-command-kit
connection-player-identity-kit
player-update-sequence-admission-kit
host-movement-budget-kit
host-maze-collision-authority-kit
host-movement-simulation-kit
authoritative-pose-result-kit
movement-admission-ledger-kit
client-prediction-history-kit
client-pose-reconciliation-kit
correction-smoothing-policy-kit
movement-debug-projection-kit
movement-authority-fixture-kit
client-reconciliation-fixture-kit
```

## Ordered safe ledges

```txt
1. Lobby Readiness Authority + Start Admission Fixture Gate
2. Run Exit Commit + Session Epoch Message Admission Fixture Gate
3. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
4. Host Movement Admission + Client Reconciliation Fixture Gate
5. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
rendering changed: no
network behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing checks run: no
movement authority fixture: unavailable
client reconciliation fixture: unavailable
repo-local docs pushed to main: yes
central ledger synchronized on main: yes
central internal change log added on main: yes
```

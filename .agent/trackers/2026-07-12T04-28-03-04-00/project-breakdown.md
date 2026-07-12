# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-12T04-28-03-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Scope:** documentation-only focus-loss input-retirement audit

## Summary

HorrorCorridor exposes a complete cooperative first-person loop, but physical input ownership is not retired consistently. The product permits movement without pointer lock, while `window.blur` only resets input indirectly when pointer lock is active. A missed keyup can leave movement latched across focus loss and continue affecting solo, host or client movement.

## Plan ledger

**Goal:** document the complete runtime and define one focus/visibility input-retirement authority that neutralizes stale controls before simulation or network publication can consume them.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all eligible repositories against `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm no eligible repository is new, ledger-missing or root-`.agent`-missing.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read the current root `.agent` state and retained authority audits.
- [x] Read the application shell, game runtime and player input domain.
- [x] Identify the interaction loop, all domains, all 29 implemented kits and their services.
- [x] Isolate the unlocked-blur missed-keyup failure.
- [x] Define the DSK/domain boundary, candidate kits and fixture gate.
- [x] Refresh required root `.agent` files.
- [x] Add timestamped architecture, render, gameplay, interaction, input-lifecycle and deploy audits.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Runtime implementation remains future work.

## Organization comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-12T02-49-19-04-00 selected oldest
PhantomCommand     2026-07-12T03-00-46-04-00
ZombieOrchard      2026-07-12T03-11-51-04-00
TheUnmappedHouse   2026-07-12T03-21-27-04-00
AetherVale         2026-07-12T03-28-44-04-00
MyCozyIsland       2026-07-12T03-39-52-04-00
PrehistoricRush    2026-07-12T03-51-15-04-00
TheOpenAbove       2026-07-12T04-00-32-04-00
IntoTheMeadow      2026-07-12T04-11-54-04-00
TheCavalryOfRome   excluded
```

## Product interaction loop

```txt
START
  -> solo, host or join selection
  -> lobby/session identity and transport setup
  -> loading and procedural snapshot bootstrap
  -> PLAYING mounts GameCanvas and HUDOverlay
  -> keyboard and pointer input update local input state
  -> solo/host runs movement, interaction, ooze and authoritative snapshots
  -> client predicts locally and sends player/interaction messages
  -> world, bloom, HUD, minimap attempt and debug frame render
  -> pause, completion, lobby return or title exit
```

### Focus-loss sub-loop

```txt
PLAYING without pointer lock
  -> keydown W
  -> forward held state becomes true
  -> window blur before keyup
  -> unlocked onBlur performs no input reset
  -> keyup is missed outside the page
  -> forward remains true
  -> simulation/client prediction continues to consume it
  -> focus returns with stale movement still active
```

## Domains in use

```txt
application shell and screen routing
loading, pause, completion, settings and terminal UI
session mode, peer identity, room, roster and connection state
lobby readiness, start and snapshot bootstrap
runtime startup, acquisition, readiness, cleanup and retry
run/session lifecycle, exit, disconnect and reconnect
PeerJS host/client transport
BroadcastChannel local transport bridge
protocol construction, serialization and message admission
seeded maze, cubes, target sequence and random streams
authoritative snapshots, delivery, cadence and backpressure
keyboard, mouse, pointer lock, focus and visibility input lifecycle
held-control lease, revision, neutralization and retirement
movement, collision, camera, prediction and reconciliation
cube interactions, slot claims, ordered anomaly and victory
ooze spawning, decay, pressure and capacity
Three.js world, post-processing, bloom and disposal
render-surface sizing, presentation policy and frame correlation
HUD, minimap and debug projection
validation, build and deployment
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit         modes, routes, loading, pause, completion and exits
corridor-session-domain-kit            identity, room, roster, connection, readiness and reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, reason and overlay
ui-completion-projection-kit           terminal state, message, time and routing
complete-screen-presentation-kit       outcome presentation, restart and title
lobby-screen-presentation-kit          room, roster, readiness and controls
peer-host-transport-kit                connections, broadcast, targeted send and destroy
peer-client-transport-kit              host connection, send, status and destroy
peer-event-bus-kit                     typed events, subscribe, unsubscribe and clear
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit             encode, decode, version and shape checks
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly and initial snapshot
seeded-maze-rng-kit                    deterministic topology, placement and sequence
first-person-input-kit                 keyboard mapping, held state, pointer lock, look and snapshots
movement-collision-camera-kit          movement, maze collision, eye pose, shake and camera
network-player-update-kit              client sequence/cadence, pose messages and host consume
corridor-interaction-domain-kit        pickup, drop, place, remove and held-cube synchronization
ordered-anomaly-sequence-kit           slot order, completion and victory
ooze-trail-domain-kit                  spawn, decay, spacing, variation and pressure
snapshot-outcome-routing-kit           snapshot game state to UI route
corridor-authoritative-publication-kit tick, clone, SYNC and broadcast
corridor-animation-loop-kit            RAF lifecycle and delta
corridor-render-world-kit              terrain, maze, actors, props, lights and disposal
corridor-post-processing-kit           composer, bloom, sizing, render and disposal
corridor-minimap-kit                   maze, players, cubes, ooze and heading
runtime-debug-frame-kit                activation, frame/event capture, overlay and export
runtime-resource-cleanup-kit           loop, transport subscription, listeners and GPU resources
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Main source finding

```txt
PlayerInputState stores buttons until explicitly changed.
setPlayerPointerLocked(false) creates a fully neutral state.
GameCanvas calls that reset through pointerlockchange.
onBlur only calls releasePointerLock when pointer lock is active.
No visibilitychange or pagehide listener exists.
GameCanvas cleanup removes listeners but does not publish a neutral input snapshot.
```

The unsafe path is not the pointer-locked mode. Pointer-lock loss already resets the input state. The defect exists in the explicitly supported unlocked WASD mode, where focus loss does not invalidate the current held-button state.

## Required parent domain

```txt
corridor-focus-loss-input-retirement-authority-domain
```

## Candidate kits

```txt
input-focus-state-kit
input-control-lease-kit
held-control-state-kit
input-revision-kit
focus-loss-event-adapter-kit
visibility-loss-event-adapter-kit
pagehide-input-adapter-kit
pointer-lock-retirement-adapter-kit
input-retirement-command-kit
input-retirement-admission-kit
input-neutralization-kit
client-zero-input-publication-kit
input-retirement-result-kit
input-retirement-journal-kit
stuck-input-fixture-kit
focus-visibility-browser-smoke-kit
client-zero-input-fixture-kit
runtime-teardown-input-fixture-kit
```

## Required transaction

```txt
browser/runtime ownership loss
  -> create revisioned retirement command
  -> validate runtime, run, screen and current control lease
  -> suspend movement and interaction admission
  -> clear every held button and look delta
  -> set pointer lock false in the canonical input snapshot
  -> project neutral input to runtimeStore
  -> send one client zero-input update when valid
  -> retire the control lease
  -> publish typed result and bounded journal row
  -> acknowledge first neutral simulation/render frame
```

## Required repo-local output

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

Added:

```txt
.agent/trackers/2026-07-12T04-28-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T04-28-03-04-00.md
.agent/architecture-audit/2026-07-12T04-28-03-04-00-focus-loss-input-retirement-dsk-map.md
.agent/render-audit/2026-07-12T04-28-03-04-00-unfocused-stale-movement-frame-gap.md
.agent/gameplay-audit/2026-07-12T04-28-03-04-00-blur-missed-keyup-movement-loop.md
.agent/interaction-audit/2026-07-12T04-28-03-04-00-focus-visibility-input-retirement-map.md
.agent/input-lifecycle-audit/2026-07-12T04-28-03-04-00-held-control-lease-neutralization-contract.md
.agent/deploy-audit/2026-07-12T04-28-03-04-00-focus-loss-input-fixture-gate.md
```

## Validation boundary

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
input behavior changed: no
network behavior changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing commands run: no
```

This audit documents the defect and the required authority. It does not claim that focus loss now stops movement.
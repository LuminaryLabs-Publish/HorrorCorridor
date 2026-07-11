# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run:** `2026-07-10T21-39-22-04-00`

## Goal

Document the current run-exit and re-entry architecture, identify every active domain and kit service involved, and define the smallest proof-first boundary that makes solo, host, and client lifecycle transitions authoritative without changing the corridor’s visual or gameplay output.

## Plan ledger

```txt
[x] Compare the complete accessible LuminaryLabs-Publish inventory.
[x] Compare all eligible repos against LuminaryLabs-Dev/LuminaryLabs repo-ledger state.
[x] Confirm root .agent state exists for all nine eligible non-Cavalry repos.
[x] Exclude TheCavalryOfRome.
[x] Select only HorrorCorridor as the oldest eligible documented fallback.
[x] Read GameShell entry, pause, completion, lobby-return, and title-return paths.
[x] Read GameCanvas runtime initialization, animation, networking, render, and cleanup paths.
[x] Read runtimeStore and sessionStore reset/projection behavior.
[x] Read RoomPhase and protocol message contracts.
[x] Read winRules ending-phase behavior.
[x] Read animationLoop, worldBuilder, post-processing, and host transport disposal paths.
[x] Identify the interaction loop.
[x] Identify domains in use.
[x] Identify implemented kits and services.
[x] Identify missing lifecycle kits and fixture gates.
[x] Update root .agent routing documents.
[x] Add timestamped architecture, render, gameplay, interaction, lifecycle, deploy, tracker, and turn-ledger records.
[x] Push repo-local findings to main.
[x] Update the central repo ledger.
[x] Add the central internal change-log entry.
[ ] Implement runtime source changes.
[ ] Add fixture:session-lifecycle.
[ ] Run runtime/browser validation after implementation.
```

## Selection comparison

```txt
HorrorCorridor       selected / 2026-07-10T20-08-46-04-00
PhantomCommand       tracked  / 2026-07-10T20-19-35-04-00
ZombieOrchard        tracked  / 2026-07-10T20-30-23-04-00
TheUnmappedHouse     tracked  / 2026-07-10T20-38-24-04-00
MyCozyIsland         tracked  / 2026-07-10T20-48-55-04-00
PrehistoricRush      tracked  / 2026-07-10T21-00-16-04-00
AetherVale           tracked  / 2026-07-10T21-08-52-04-00
IntoTheMeadow        tracked  / 2026-07-10T21-19-36-04-00
TheOpenAbove         tracked  / 2026-07-10T21-31-01-04-00
TheCavalryOfRome     excluded
```

## Product interaction loop

```txt
start menu
  -> solo bootstrap, host lobby, or client join
  -> seeded active room and authoritative snapshot
  -> GameCanvas initializes one runtime instance
  -> pointer-lock input and RAF simulation/render loop
  -> host publication or client prediction/replay
  -> pause or ordered anomaly victory
  -> Return to lobby / Restart
  -> local screen/readiness mutation
  -> GameCanvas render cleanup
  -> room/snapshot/transport authority remains unresolved
  -> peer divergence or broken solo re-entry
```

## Domain inventory

```txt
application shell and screen routing
UI screen, overlay, pause, completion, and game-screen projection
session mode, peer identity, room, roster, and connection status
runtime authoritative snapshot, pose, view, input, and readiness
lobby presentation and local controls
PeerJS host transport
PeerJS client transport
BroadcastChannel same-browser bridge
peer connection and message event bus
protocol envelope types, construction, serialization, and delivery
seeded maze and route generation
cube placement and target sequence generation
active room/player/bootstrap snapshot construction
pointer lock and keyboard/mouse input
camera look and walk-shake projection
player movement and maze collision
client prediction and player-update publication
host player-update consumption
interaction action derivation
cube pickup/drop/place/remove rules
held-cube synchronization
ordered anomaly completion and rollback
ooze generation, cadence, decay, spacing, and capacity
authoritative tick/snapshot/full-sync publication
client snapshot replay and UI projection
Three.js scene, terrain, walls, floors, ceilings, props, textures, lights, cubes, players, ooze, and flashlight
animation loop, resize, and canvas ownership
post-processing composer, bloom, and output
minimap and HUD projection
runtime debug frame/event collection
world, material, texture, composer, renderer, observer, listener, subscription, and canvas cleanup
build, lint, smoke, harness, visual, object-kit, and live-player validation
```

## Implemented kit catalog

```txt
corridor-application-shell-kit
corridor-session-domain-kit
runtime-store-snapshot-kit
lobby-screen-presentation-kit
peer-host-transport-kit
peer-client-transport-kit
peer-event-bus-kit
protocol-message-construction-kit
maze-snapshot-bootstrap-kit
first-person-input-kit
movement-collision-camera-kit
network-player-update-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
corridor-authoritative-publication-kit
corridor-animation-loop-kit
corridor-render-world-kit
corridor-post-processing-kit
corridor-minimap-kit
runtime-debug-frame-kit
runtime-resource-cleanup-kit
package-validation-kit
```

## Service map

```txt
session: mode, peer identity, room, roster, status, reset
runtime: authoritative snapshot, pose, view, input, readiness, reset
transport: host/client connect, send, broadcast, disconnect, destroy, status events
protocol: START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
bootstrap: seed, maze, cubes, anomaly, active room, players, initial snapshot
player: pointer lock, input, movement, collision, camera, prediction
rules: interactions, carried cubes, ordered sequence, rollback, victory, ooze
publication: ticks, reasons, full sync, cadence counters
render: world attach/update/dispose, post render/resize/dispose, minimap, HUD
cleanup: RAF cancellation, subscriptions, observer/listener removal, GPU/DOM disposal
debug: bounded frames/events and browser export
validation: lint, build, ProtoKit smoke, harness, visual, object-kit, live-player
```

## Main finding

`GameCanvas` has a concrete local render cleanup path, but `GameShell.returnToLobby()` does not perform a session transition. It leaves the replicated room phase and authoritative snapshot in active/ending state, publishes no host lifecycle result, keeps transport alive without an epoch boundary, and routes solo back to the client lobby. Existing active messages are correlated only by room, so late traffic can cross into a later run.

## Candidate kits

```txt
run-session-identity-kit
run-exit-command-kit
run-exit-authority-kit
session-phase-transaction-kit
session-state-publication-kit
runtime-teardown-result-kit
session-message-admission-kit
session-lifecycle-ledger-kit
session-lifecycle-debug-projection-kit
session-lifecycle-fixture-kit
```

## Next safe ledge

```txt
HorrorCorridor Run Exit Authority + Session Epoch Re-entry Fixture Gate
```

## Non-goals

```txt
runtime implementation in this pass
renderer replacement
PeerJS extraction
minimap or post-processing extraction
new maze content
visual restyling
gameplay or cadence tuning
```

## Validation state

```txt
documentation-only pass
runtime source changed: no
branch created: no
pull request created: no
existing commands run: no
fixture:session-lifecycle: missing
push target: main
```
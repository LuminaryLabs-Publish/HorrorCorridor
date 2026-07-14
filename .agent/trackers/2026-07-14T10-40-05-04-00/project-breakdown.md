# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-14T10-40-05-04-00`  
**Branch:** `main`  
**Status:** `settings-overlay-input-suspension-preference-authority-audited`

## Summary

HorrorCorridor was selected by the oldest eligible documentation rule after all 11 Publish repositories were compared, `TheCavalryOfRome` was excluded, and all ten eligible repositories were confirmed tracked, root-documented, and synchronized.

The current Settings surface is a static control reference, not an authoritative settings system. `Q` toggles the overlay while the game remains in `PLAYING`; movement, interaction, network updates, simulation, and pointer lock remain active. The ordinary PLAYING HUD exposes no visible Settings button, so the overlay is keyboard-only during play.

## Plan ledger

**Goal:** bind settings visibility, input suspension, pointer-lock ownership, preferences, and visible adoption to one typed transaction.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select only HorrorCorridor by the oldest eligible timestamp.
- [x] Inspect `GameShell`, `GameCanvas`, `HUDOverlay`, `SettingsOverlay`, `uiStore`, input, render, networking, and package surfaces.
- [x] Preserve the 29 implemented kits and two proof adapters.
- [x] Identify the complete interaction loop, domains, kits, and offered services.
- [x] Add the timestamped settings audit family.
- [x] Refresh required root `.agent` files and registry.
- [ ] Implement and execute settings/input/pointer-lock fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 0
selected: HorrorCorridor
reason: oldest eligible central documentation timestamp
```

## Complete interaction loop

```txt
start or lobby
  -> solo, host, or client run admission
  -> bootstrap snapshot
  -> mount GameCanvas and runtime listeners
  -> pointer lock and keyboard input drive simulation
  -> host publishes snapshots or client sends updates
  -> interactions mutate cube/anomaly state
  -> Three.js and minimap render current state

settings path
  -> Q toggles uiStore overlay kind=settings
  -> screen remains PLAYING
  -> pointer lock remains owned
  -> keydown/keyup handlers remain active
  -> movement and interaction continue behind overlay
  -> no preference candidate or accepted revision exists
  -> close requires Q again or an accessible close click

pause/completion
  -> pointer lock loss can force PAUSED
  -> PAUSED unmounts HUDOverlay and the settings overlay
  -> completion projects terminal UI and return actions
```

## Domains in use

```txt
application routing and screen lifecycle
session identity room roster connection and readiness
loading and deterministic maze bootstrap
PeerJS and BroadcastChannel transport
protocol construction serialization and admission
runtime snapshots pose view input and readiness
keyboard pointer-lock and focus input
settings overlay visibility and control-reference presentation
pause and completion projection
movement collision camera and local prediction
network player updates and host publication
pickup drop place remove and held-cube synchronization
ordered anomaly sequence and victory
 ooze trail pressure and decay
Three.js world post-processing minimap and frame scheduling
debug observation live-agent proof and package validation
resource cleanup build deployment and central tracking
```

## Implemented kits and offered services

```txt
1. corridor-application-shell-kit: routing, solo/host/client entry, loading, pause, completion, exit
2. corridor-session-domain-kit: identity, room, roster, connection, readiness, reset
3. runtime-store-snapshot-kit: snapshot, pose, view, input flags, readiness
4. ui-pause-projection-kit: pause state, reason, overlay
5. ui-completion-projection-kit: terminal state, message, timestamp, routing
6. complete-screen-presentation-kit: outcome presentation, restart, title exit
7. lobby-screen-presentation-kit: room, roster, ready state, controls
8. peer-host-transport-kit: host, local bridge, connections, broadcast, targeted send, disconnect, destroy
9. peer-client-transport-kit: client, local bridge, connect, send, status, disconnect, destroy
10. peer-event-bus-kit: typed transport events, subscription, cleanup
11. protocol-message-construction-kit: START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
12. protocol-serialization-kit: encode, decode, version, structural validation
13. maze-snapshot-bootstrap-kit: seed, maze, players, cubes, anomaly, initial snapshot
14. seeded-maze-rng-kit: topology, placement, target sequence
15. first-person-input-kit: keyboard, pointer lock, look, snapshots
16. movement-collision-camera-kit: movement, collision, eye pose, shake, camera
17. network-player-update-kit: sequence, cadence, pose envelope, host consume
18. corridor-interaction-domain-kit: pickup, drop, place, remove, held-cube synchronization
19. ordered-anomaly-sequence-kit: ordered slots, validation, victory
20. ooze-trail-domain-kit: spawn, decay, variation, spacing, capacity, pressure
21. snapshot-outcome-routing-kit: snapshot state to UI outcome
22. corridor-authoritative-publication-kit: tick, clone, SYNC, broadcast
23. corridor-animation-loop-kit: RAF start/stop, delta, elapsed, successor scheduling
24. corridor-render-world-kit: terrain, maze, objects, actors, lights, update, dispose
25. corridor-post-processing-kit: composer, bloom, resize, render, dispose
26. corridor-minimap-kit: maze, players, cubes, ooze, heading
27. runtime-debug-frame-kit: activation, bounded capture, overlay, export
28. runtime-resource-cleanup-kit: loop, subscriptions, listeners, observers, GPU cleanup
29. package-validation-kit: build, lint, harness, visual, live-player checks
```

Adapters:

```txt
live-agent-runner-adapter: episode scheduling, adaptive actions, child execution, JSONL history, latest summary
live-player-browser-proof-adapter: server/browser admission, route control, debug readback, screenshots, image probes, proof gates
```

## Source-backed settings findings

```txt
SettingsOverlay contains mutable settings controls: no
SettingsOverlay contains only a static control map: yes
PLAYING HUD shows a visible Settings button: no
Q toggles settings while PLAYING: yes
opening settings changes screen to PAUSED: no
opening settings clears held input: no
opening settings releases pointer lock: no
keydown/keyup admission checks overlay ownership: no
simulation checks settings visibility: no
network updates stop while settings is open: no
accepted settings revision exists: no
preference persistence exists: no
first visible settings-adoption frame exists: no
```

## Required authority

```txt
corridor-settings-overlay-input-suspension-preference-authority-domain
```

```txt
SettingsOpenCommand
  -> bind session, screen, input, pointer-lock and settings revisions
  -> release or transfer pointer ownership
  -> clear held movement/interact state
  -> suspend gameplay input and local prediction
  -> project one accessible settings surface
  -> publish SettingsOpenResult

SettingsApplyCommand
  -> validate a typed preference candidate
  -> atomically commit input, camera, render and accessibility consumers
  -> persist the accepted SettingsRevision
  -> acknowledge the first matching visible frame

SettingsCloseCommand
  -> restore the predecessor screen and input policy
  -> require a fresh pointer-lock gesture
  -> reject stale key releases and late input
  -> publish SettingsCloseResult
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, settings, package, test, workflow, or deployment behavior changed.
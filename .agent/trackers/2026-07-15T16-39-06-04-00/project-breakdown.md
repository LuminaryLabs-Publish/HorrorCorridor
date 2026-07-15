# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Run:** `2026-07-15T16-39-06-04-00`  
**Status:** `active-gameplay-hud-projection-mount-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client sessions, deterministic maze generation, PeerJS and BroadcastChannel transport, predictive movement, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, post-processing, a Canvas2D minimap, UI overlays and browser-proof tooling.

The current audit isolates active-run HUD composition. `HUDOverlay` explicitly handles both `PLAYING` and `COMPLETED`, but the `PLAYING` branch returns early with only the settings and debug overlays. The objective, anomaly sequence, held item, player status and minimap canvas are mounted only by the later `COMPLETED` branch. `GameCanvas` still searches for the minimap canvas and calls the draw function every frame, while `drawMinimapFrame()` returns immediately when that canvas is absent.

## Plan ledger

**Goal:** make every accepted playing frame project the authored gameplay HUD and minimap through one route-bound mount authority, while keeping completion presentation, settings and debug surfaces independently composable.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers.
- [x] Compare every eligible current `main` head with its recorded repo-local documentation head.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead priority repository.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` by the oldest synchronized timestamp.
- [x] Trace route, runtime, HUD, minimap canvas and frame-draw ownership.
- [x] Preserve all 29 implemented kits, two browser-proof adapters and offered services.
- [x] Add a timestamped HUD audit family under root `.agent`.
- [x] Change no runtime, networking, gameplay, rendering, package, test, workflow or deployment source.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement and execute active-run HUD mount and browser parity fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/HorrorCorridor
selection rule: oldest synchronized central timestamp
prior central timestamp: 2026-07-15T11-39-04-04-00
next oldest: LuminaryLabs-Publish/TheOpenAbove at 2026-07-15T12-02-38-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
start, solo, host or client route
  -> session and deterministic maze bootstrap
  -> GameCanvas creates input, transport, Three.js world, post-processing and RAF
  -> accepted local or host state advances movement, interactions, ooze and snapshots
  -> HUDOverlay mounts beside GameCanvas

PLAYING projection
  -> HUDOverlay detects screen === PLAYING
  -> returns SettingsOverlay and FrameDebugPanel only
  -> objective, sequence, held item, player status and Minimap are not mounted
  -> GameCanvas queries #runtime-minimap each RAF
  -> query returns null
  -> drawMinimapFrame receives canvas: null and returns without drawing
  -> post-processing renders the world frame

COMPLETED projection
  -> early PLAYING return no longer applies
  -> objective/status panels and Minimap mount
  -> GameCanvas can find and draw the minimap
  -> gameplay guidance becomes visible after terminal settlement
```

## Domains in use

```txt
application routing and browser lifecycle
session identity room roster connection readiness and reset
loading and deterministic maze bootstrap
PeerJS BroadcastChannel transport and versioned protocol
keyboard mouse pointer-lock and normalized input
client prediction host admission and authoritative publication
movement collision camera and interaction
cube pickup drop placement removal anomaly sequence ooze and victory
pause settings completion and route projection
Three.js world post-processing RAF resize and viewport
HUD route policy mount generation and overlay composition
objective anomaly sequence held-item player and hint projection
Canvas2D minimap surface acquisition sizing transform and drawing
active gameplay and terminal presentation separation
HUD projection result retirement and first-frame acknowledgement
runtime diagnostics fixture build Pages and central tracking
```

## Implemented kits and offered services

### Application, state and presentation

- **corridor-application-shell-kit:** routing, solo/host/client entry, loading, pause, completion and exit.
- **corridor-session-domain-kit:** identity, room, roster, connection, readiness and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, pose, view, input flags and readiness.
- **ui-pause-projection-kit:** pause state, reason and overlay.
- **ui-completion-projection-kit:** terminal state, message, timestamp and routing.
- **complete-screen-presentation-kit:** outcome presentation, restart and title exit.
- **lobby-screen-presentation-kit:** room, roster, ready state and controls.

### Networking and protocol

- **peer-host-transport-kit:** PeerJS host, BroadcastChannel bridge, connections, broadcast, targeted send, disconnect and destroy.
- **peer-client-transport-kit:** PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect and destroy.
- **peer-event-bus-kit:** typed transport events, subscription and cleanup.
- **protocol-message-construction-kit:** `START_GAME`, `PLAYER_UPDATE`, `TRY_INTERACT`, `SYNC` and `LOBBY_EVENT`.
- **protocol-serialization-kit:** encode, decode, protocol version and structural validation.

### World, movement and gameplay

- **maze-snapshot-bootstrap-kit:** seed, maze, players, cubes, anomaly and initial snapshot.
- **seeded-maze-rng-kit:** topology, placement and target sequence.
- **first-person-input-kit:** keyboard, pointer lock, look and snapshots.
- **movement-collision-camera-kit:** movement, collision, eye pose, shake and camera.
- **network-player-update-kit:** sequence, cadence, pose envelope and host consumption.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered slots, validation and victory.
- **ooze-trail-domain-kit:** spawn, decay, variation, spacing, capacity and pressure.
- **snapshot-outcome-routing-kit:** snapshot state to UI outcome.
- **corridor-authoritative-publication-kit:** tick, clone, `SYNC` and broadcast.

### Rendering, diagnostics and proof

- **corridor-animation-loop-kit:** RAF start, stop, delta, elapsed and successor scheduling.
- **corridor-render-world-kit:** terrain, maze, objects, actors, lights, update and disposal.
- **corridor-post-processing-kit:** composer, bloom, resize, render and disposal.
- **corridor-minimap-kit:** canvas acquisition, DPR sizing, logical transform, maze, ooze, cubes, players and heading.
- **runtime-debug-frame-kit:** activation, bounded capture, overlay and export.
- **runtime-resource-cleanup-kit:** loop, subscriptions, listeners, observers and GPU cleanup.
- **package-validation-kit:** build, lint, harness, visual and live-player checks.

### Browser-proof adapters

- **live-agent-runner-adapter:** episode scheduling, adaptive action selection, child execution, JSONL history and latest summary.
- **live-player-browser-proof-adapter:** server/browser admission, route control, debug readback, screenshots, image probes and proof gates.

```txt
implemented kits: 29
browser-proof adapters: 2
total implemented surfaces: 31
planned HUD authority surfaces: 18
```

## Source-backed findings

```txt
HUDOverlay accepted screens: PLAYING and COMPLETED
PLAYING early return: present
PLAYING objective panel: absent
PLAYING anomaly sequence panel: absent
PLAYING held-item projection: absent
PLAYING player/status projection: absent
PLAYING minimap component: absent
PLAYING settings overlay: present
PLAYING debug panel: present
COMPLETED full HUD: present
COMPLETED minimap component: present
GameCanvas minimap DOM query per frame: present
drawMinimapFrame null-canvas guard: immediate return
HUD mount generation: absent
HUD projection result: absent
FirstPlayingHudFrameAck: absent
active-run HUD browser fixture: absent
```

This proves a source-backed route-composition gap. It does not prove the exact user-visible impact on every browser because no runtime screenshot or interaction fixture was executed in this documentation-only run.

## Required authority

```txt
corridor-active-gameplay-hud-projection-mount-authority-domain
```

```txt
GameplayHudProjectionCommand
  -> bind document, route, screen, snapshot, local-player and HUD-policy revisions
  -> derive one immutable GameplayHudReadModel
  -> select required surfaces for PLAYING independently from COMPLETED
  -> adopt one HudMountGeneration
  -> mount objective, sequence, held item, player status and minimap during accepted PLAYING state
  -> compose settings and debug overlays without replacing the gameplay HUD
  -> bind minimap draw work to the accepted canvas generation
  -> publish GameplayHudProjectionResult
  -> acknowledge FirstPlayingHudFrameAck
  -> retire the mount and reject late draw work on route transition
```

## Planned authority surfaces

```txt
gameplay-hud-state-kit
gameplay-hud-route-policy-kit
hud-surface-identity-kit
hud-mount-generation-kit
objective-projection-kit
anomaly-sequence-progress-kit
held-item-projection-kit
local-player-status-projection-kit
minimap-mount-admission-kit
minimap-frame-binding-kit
settings-control-surface-kit
debug-overlay-composition-kit
hud-pointer-event-policy-kit
gameplay-hud-projection-result-kit
first-playing-hud-frame-ack-kit
hud-route-retirement-kit
playing-hud-browser-fixture-kit
source-build-pages-hud-parity-fixture-kit
```

## Repo-local output

```txt
.agent/trackers/2026-07-15T16-39-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T16-39-06-04-00.md
.agent/architecture-audit/2026-07-15T16-39-06-04-00-active-gameplay-hud-projection-dsk-map.md
.agent/render-audit/2026-07-15T16-39-06-04-00-playing-hud-canvas-absence-gap.md
.agent/gameplay-audit/2026-07-15T16-39-06-04-00-playing-state-hud-projection-loop.md
.agent/interaction-audit/2026-07-15T16-39-06-04-00-hud-projection-command-result-map.md
.agent/hud-audit/2026-07-15T16-39-06-04-00-active-run-overlay-mount-contract.md
.agent/deploy-audit/2026-07-15T16-39-06-04-00-playing-hud-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T16-39-06-04-00-oldest-selection-hud-projection-reconciliation.md
```

## Validation boundary

```txt
documentation changed: yes
runtime TypeScript changed: no
network behavior changed: no
input behavior changed: no
gameplay changed: no
Three.js behavior changed: no
Canvas2D behavior changed: no
packages dependencies tests workflows deployment changed: no
branch created: no
pull request created: no
runtime browser fixture: not run
```

No HUD repair, minimap availability, gameplay guidance correctness, visual parity, deployment parity or production readiness is claimed.
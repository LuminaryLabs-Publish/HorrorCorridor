# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-15T16-39-06-04-00`  
**Branch:** `main`  
**Status:** `active-gameplay-hud-projection-mount-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is active gameplay HUD composition: accepted route, snapshot and player state reach React and the Three.js frame host, but the `PLAYING` HUD branch returns before mounting objective, sequence, held-item, player-status and minimap surfaces.

## Plan ledger

**Goal:** preserve simulation, networking and rendering while giving `PLAYING` one complete, route-bound HUD mount and first matching frame result.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` states and current heads.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `GameShell.tsx`, `GameCanvas.tsx`, `HUDOverlay.tsx`, `Minimap.tsx`, package scripts and kit registry.
- [x] Preserve all 29 kits, two adapters and offered services.
- [x] Add and route the timestamped active gameplay HUD audit family.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
solo/host/client route
  -> deterministic maze and session admission
  -> GameCanvas initializes input, transport, world, minimap draw path and RAF
  -> accepted state advances movement, cubes, anomaly, ooze and outcomes
  -> authoritative snapshots update clients
  -> HUDOverlay reads screen, session and snapshot state

PLAYING
  -> returns SettingsOverlay and FrameDebugPanel only
  -> gameplay panels and Minimap do not mount
  -> GameCanvas queries runtime-minimap each frame
  -> drawMinimapFrame receives null and returns
  -> Three.js post-processing renders

COMPLETED
  -> objective, sequence, held item, player status and Minimap mount
  -> minimap canvas can be resolved and drawn
```

## Domains in use

```txt
application routing and browser lifecycle
session room roster connection readiness and reset
loading and deterministic maze bootstrap
PeerJS BroadcastChannel transport and protocol
keyboard mouse pointer-lock and normalized input
client prediction and authoritative publication
movement collision camera and interaction
cube anomaly ooze and victory
pause settings completion and route projection
Three.js world post-processing RAF and viewport
HUD route policy mount generation and overlay composition
objective sequence held-item player and hint projection
Canvas2D minimap surface acquisition sizing transform and drawing
active gameplay and terminal presentation separation
HUD projection result retirement and visible-frame acknowledgement
debug proof validation build deployment and central tracking
```

## Implemented inventory

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
planned HUD authority surfaces: 18
```

The complete kit-by-kit service inventory is in `.agent/kit-registry.json` and the latest tracker.

## Source-backed findings

```txt
HUDOverlay handles PLAYING and COMPLETED: yes
PLAYING early return: yes
PLAYING objective projection: absent
PLAYING anomaly sequence projection: absent
PLAYING held-item projection: absent
PLAYING player/session projection: absent
PLAYING minimap component: absent
PLAYING settings and debug surfaces: present
COMPLETED complete HUD and minimap: present
GameCanvas minimap DOM query per frame: present
drawMinimapFrame null-canvas return: present
HudMountGeneration: absent
GameplayHudProjectionResult: absent
FirstPlayingHudFrameAck: absent
active-run HUD browser fixture: absent
```

## Required authority

```txt
corridor-active-gameplay-hud-projection-mount-authority-domain
```

## Current file family

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

Documentation only. Runtime, networking, gameplay, Three.js rendering, Canvas2D behavior, scripts, dependencies, tests, workflows and deployment are unchanged.
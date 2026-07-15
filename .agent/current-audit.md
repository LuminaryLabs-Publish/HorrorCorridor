# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-15T02-00-17-04-00`  
**Branch:** `main`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is device-control action coverage: gameplay input is normalized into `PlayerInputState`, but the browser host supplies that state only from keyboard events and pointer-lock mouse deltas.

## Plan ledger

**Goal:** keep one input authority while making each supported device class capable of completing the same movement, interaction and pause loop.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` states and current heads.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `GameCanvas`, `PointerLockGate`, the player input domain, HUD projection, package scripts and browser proof surfaces.
- [x] Preserve all 29 kits, two adapters and services.
- [x] Add and route the timestamped device-control audit family.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
solo/host/client route
  -> GameCanvas initializes PlayerInputState
  -> window keydown/keyup produce movement, interact and pause buttons
  -> pointer-lock mousemove produces look deltas
  -> PointerLockGate instructs WASD + mouse + Esc
  -> frame loop advances movement and camera from normalized input
  -> interaction routes through local authority or TRY_INTERACT
  -> no touch producer can set movement axes, look deltas,
     interact, pause or an equivalent capture state
```

## Domains in use

```txt
application routing and browser lifecycle
session room roster connection readiness and reset
loading and deterministic maze bootstrap
PeerJS BroadcastChannel transport and protocol
keyboard mouse pointer-lock and normalized input
device capability and viewport classification
touch control surfaces and gesture arbitration
client prediction and authoritative publication
movement collision camera and interaction
cube anomaly ooze and victory
Three.js world post-processing minimap RAF and viewport
semantic control projection and visible action effects
debug proof validation build deployment and central tracking
```

## Implemented inventory

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
planned device-control authority surfaces: 21
```

The complete kit-by-kit service inventory is in `.agent/kit-registry.json` and the latest tracker.

## Source-backed findings

```txt
normalized PlayerInputState exists: yes
keyboard movement mapping exists: yes
keyboard interact and pause mapping exists: yes
pointer-lock mouse look exists: yes
touch or pointer gesture movement producer exists: no
touch look producer exists: no
touch interact control exists: no
touch pause control exists: no
playing HUD exposes gameplay touch controls: no
device capability admission result exists: no
FirstDeviceControlSurfaceFrameAck exists: no
FirstDeviceActionEffectFrameAck exists: no
```

## Required authority

```txt
corridor-device-control-action-coverage-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-15T02-00-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T02-00-17-04-00.md
.agent/architecture-audit/2026-07-15T02-00-17-04-00-device-control-action-coverage-dsk-map.md
.agent/render-audit/2026-07-15T02-00-17-04-00-touch-control-surface-visible-frame-gap.md
.agent/gameplay-audit/2026-07-15T02-00-17-04-00-touch-only-player-immobility-loop.md
.agent/interaction-audit/2026-07-15T02-00-17-04-00-device-action-command-result-map.md
.agent/device-control-audit/2026-07-15T02-00-17-04-00-keyboard-mouse-touch-action-coverage-contract.md
.agent/deploy-audit/2026-07-15T02-00-17-04-00-device-control-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T02-00-17-04-00-oldest-selection-device-control-reconciliation.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, scripts, dependencies, tests, workflows and deployment are unchanged.

# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-15T11-39-04-04-00`  
**Branch:** `main`  
**Status:** `minimap-backing-store-dpr-resize-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is minimap render-surface ownership: accepted snapshot and local-pose state reaches a Canvas2D map, but physical pixel sizing, integer quantization, context generation, resize admission and first matching frame proof are implicit.

## Plan ledger

**Goal:** preserve simulation, networking and content projection while giving the minimap one stable integer backing-store descriptor and lifecycle result.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` states and current heads.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `GameCanvas.tsx`, `Minimap.tsx`, animation ownership, package scripts and kit registry.
- [x] Preserve all 29 kits, two adapters and offered services.
- [x] Add and route the timestamped minimap audit family.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
solo/host/client route
  -> deterministic maze and session admission
  -> GameCanvas initializes input, transport, world and RAF
  -> accepted local or host state advances movement, cubes, anomaly and ooze
  -> replicated snapshots update clients
  -> Three.js world and Canvas2D minimap project accepted state
  -> minimap reacquires canvas/context and evaluates backing-store size every frame
  -> post-processing renders the world frame
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
Canvas2D minimap surface acquisition sizing transform and drawing
browser CSS size device-pixel-ratio and zoom observation
snapshot local-pose and heading minimap projection
integer pixel quantization context generation resize admission and retirement
visible-frame acknowledgement debug proof validation build deployment and central tracking
```

## Implemented inventory

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
planned minimap authority surfaces: 18
```

The complete kit-by-kit service inventory is in `.agent/kit-registry.json` and the latest tracker.

## Source-backed findings

```txt
logical minimap size: 168 x 168
DPR source: window.devicePixelRatio || 1
physical dimension expression: 168 * DPR
canvas physical property domain: integer
comparison target domain: floating point
explicit quantization policy: absent
accepted backing-store descriptor: absent
ContextGeneration: absent
unchanged-frame dimension-write receipt: absent
FirstMinimapResizeFrameAck: absent
fractional-DPR minimap fixture: absent
```

When `168 * DPR` is non-integral, assigning the value to the integer canvas property can leave the next strict comparison unequal. Both backing-store dimensions may then be assigned again on the next frame even though the effective surface policy did not change.

## Required authority

```txt
corridor-minimap-backing-store-revision-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-15T11-39-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T11-39-04-04-00.md
.agent/architecture-audit/2026-07-15T11-39-04-04-00-minimap-backing-store-dpr-dsk-map.md
.agent/render-audit/2026-07-15T11-39-04-04-00-fractional-dpr-canvas-reset-gap.md
.agent/gameplay-audit/2026-07-15T11-39-04-04-00-snapshot-to-minimap-frame-loop.md
.agent/interaction-audit/2026-07-15T11-39-04-04-00-minimap-surface-command-result-map.md
.agent/minimap-audit/2026-07-15T11-39-04-04-00-backing-store-quantization-context-contract.md
.agent/deploy-audit/2026-07-15T11-39-04-04-00-fractional-dpr-minimap-fixture-gate.md
.agent/central-sync-audit/2026-07-15T11-39-04-04-00-oldest-selection-minimap-reconciliation.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, Three.js rendering, Canvas2D behavior, scripts, dependencies, tests, workflows and deployment are unchanged.
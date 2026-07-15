# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-15T07-00-28-04-00`  
**Branch:** `main`  
**Status:** `audio-event-projection-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is audio event projection: accepted gameplay, session and terminal state reaches visual presentation and diagnostics, but no owned audio domain converts those results into lifecycle-safe audible output.

## Plan ledger

**Goal:** preserve simulation and network authority while making audio a revisioned projection with explicit capability, unlock, preference, spatial, deduplication and proof contracts.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` states and current heads.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `GameCanvas.tsx`, interaction rules, settings, package scripts and the kit registry.
- [x] Preserve all 29 kits, two adapters and offered services.
- [x] Add and route the timestamped audio audit family.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
solo/host/client route
  -> deterministic maze and session admission
  -> GameCanvas initializes input, movement, transport, world and RAF
  -> accepted local or host state advances movement, cubes, anomaly and ooze
  -> replicated snapshots update clients
  -> Three.js world, minimap, HUD and debug surfaces project state
  -> pause or completion changes application presentation
  -> no semantic audio event, cue admission or audible acknowledgement occurs
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
Three.js world post-processing minimap RAF and viewport
browser audio capability context lifecycle and gesture unlock
semantic audio events cue descriptors and deduplication
listener pose spatial source ambience bus preferences and voice budget
audiovisual convergence debug proof validation build deployment and central tracking
```

## Implemented inventory

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
planned audio authority surfaces: 22
```

The complete kit-by-kit service inventory is in `.agent/kit-registry.json` and the latest tracker.

## Source-backed findings

```txt
GameCanvas audio service or cue dispatcher: absent
AudioContext construction: absent
HTML audio or new Audio construction: absent
semantic audio event identity: absent
cue descriptor registry: absent
master/category volume preference: absent
mute state: absent
listener pose projection: absent
spatial source projection: absent
cue deduplication and voice budget: absent
pause/visibility/route audio retirement: absent
FirstAudibleCueAck: absent
browser audio fixture: absent
```

The settings overlay exposes only a control map. The package and implemented kit registry contain no audio domain. Existing interaction and outcome state provides clear semantic producer boundaries for future cues.

## Required authority

```txt
corridor-audio-event-projection-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-15T07-00-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T07-00-28-04-00.md
.agent/architecture-audit/2026-07-15T07-00-28-04-00-audio-event-projection-dsk-map.md
.agent/render-audit/2026-07-15T07-00-28-04-00-silent-state-audiovisual-frame-gap.md
.agent/gameplay-audit/2026-07-15T07-00-28-04-00-silent-hazard-interaction-outcome-loop.md
.agent/interaction-audit/2026-07-15T07-00-28-04-00-audio-cue-command-result-map.md
.agent/audio-audit/2026-07-15T07-00-28-04-00-browser-audio-unlock-spatial-cue-contract.md
.agent/deploy-audit/2026-07-15T07-00-28-04-00-browser-audio-fixture-gate.md
.agent/central-sync-audit/2026-07-15T07-00-28-04-00-oldest-selection-audio-reconciliation.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, scripts, dependencies, tests, workflows and deployment are unchanged.

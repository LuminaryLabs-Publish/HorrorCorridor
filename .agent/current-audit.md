# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-15T21-39-15-04-00`  
**Branch:** `main`  
**Status:** `pointer-lock-acquisition-failure-fallback-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is browser pointer-lock acquisition: accepted user clicks can call `requestPointerLock()`, but capability, acceptance, rejection, interruption, retry, fallback, readiness, frame acknowledgement, and retirement are not represented as one versioned transaction.

## Plan ledger

**Goal:** preserve simulation, networking, movement, camera, rendering, HUD, and minimap behavior while giving mouse-look capture one typed admission and fallback lifecycle.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` states, and current heads.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `GameCanvas.tsx`, `PointerLockGate.tsx`, player input state, package scripts, proof adapters, and current audit state.
- [x] Preserve all 29 kits, two adapters, and offered services.
- [x] Add and route the timestamped pointer-lock audit family.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
solo/host/client route
  -> deterministic maze and session admission
  -> GameCanvas initializes transport input world renderer minimap and RAF
  -> input readiness is published

capture attempt
  -> unlocked world click
  -> requestPointerLock on the mount
  -> no PointerLockAdmissionCommand
  -> no accepted/rejected result

accepted path
  -> pointerlockchange observes ownership
  -> PlayerInputState records pointerLocked=true
  -> mousemove accumulates look deltas
  -> frame applies look movement collision camera world minimap and post-processing

failed path
  -> denied unsupported interrupted or unaccepted request
  -> no pointerlockerror observer
  -> no visible failure or fallback state
  -> mousemove is ignored while unlocked
  -> keyboard movement and normal rendering can continue

retirement
  -> release pause blur completion route exit or cleanup
  -> observed unlock resets input
  -> no acquisition-generation retirement receipt
```

## Domains in use

```txt
application routing and browser lifecycle
session identity room roster connection readiness and reset
deterministic maze bootstrap
PeerJS BroadcastChannel transport and protocol
keyboard mouse pointer-lock and normalized input
pointer-lock capability gesture acquisition failure classification and fallback
client prediction and authoritative publication
movement collision camera and interaction
cube anomaly ooze and victory
pause settings completion and route projection
Three.js world post-processing RAF and viewport
Canvas2D minimap and HUD projection
pointer-lock result retirement and visible-frame acknowledgement
debug proof validation build deployment and central tracking
```

## Implemented inventory

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
planned pointer-lock authority surfaces: 18
```

The complete kit-by-kit service inventory is in `.agent/kit-registry.json` and the latest tracker.

## Source-backed findings

```txt
requestPointerLock invocation: present
result or promise handling: absent
pointerlockchange observer: present
pointerlockerror observer: absent
input readiness before accepted lock: present
capture chrome while unlocked: hidden
visible failed-capture state: absent
retry result: absent
fallback look profile: absent
mousemove ignored while unlocked: present
PointerLockGeneration: absent
PointerLockAdmissionResult: absent
FirstPointerLockFrameAck: absent
browser denial/unsupported fixture: absent
```

## Required authority

```txt
corridor-pointer-lock-acquisition-failure-fallback-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-15T21-39-15-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T21-39-15-04-00.md
.agent/architecture-audit/2026-07-15T21-39-15-04-00-pointer-lock-acquisition-dsk-map.md
.agent/render-audit/2026-07-15T21-39-15-04-00-mouse-look-readiness-visible-frame-gap.md
.agent/gameplay-audit/2026-07-15T21-39-15-04-00-capture-failure-no-look-loop.md
.agent/interaction-audit/2026-07-15T21-39-15-04-00-pointer-lock-command-result-map.md
.agent/pointer-lock-audit/2026-07-15T21-39-15-04-00-acquisition-failure-fallback-contract.md
.agent/deploy-audit/2026-07-15T21-39-15-04-00-pointer-lock-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T21-39-15-04-00-oldest-selection-pointer-lock-reconciliation.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, input behavior, React, Three.js, Canvas2D, scripts, dependencies, tests, workflows, build, and deployment are unchanged.
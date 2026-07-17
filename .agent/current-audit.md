# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-17T03-58-09-04-00`  
**Branch:** `main`  
**Status:** `debug-preference-storage-fault-isolation-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is optional debug-preference persistence: `runtimeDebugStore.ts` reads and writes browser storage directly without a capability result, exception classification or memory-only settlement, and `GameCanvas` invokes debug initialization before renderer/world construction.

## Plan ledger

**Goal:** keep debug preferences useful while ensuring browser storage denial cannot block the playable runtime or interrupt an accepted toggle.

- [x] Compare the full Publish inventory, central ledgers and root `.agent` states.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `runtimeDebugStore.ts`, `GameCanvas.tsx` and package validation scripts.
- [x] Preserve all 29 kits, two adapters and offered services.
- [x] Confirm two unguarded preference reads and two unguarded writes.
- [x] Confirm debug initialization precedes renderer/world creation.
- [x] Confirm no typed capability/read/write result or memory-only fallback exists.
- [x] Add and route the timestamped debug-storage audit family.
- [ ] Implement host-storage capability classification.
- [ ] Implement safe read/write settlement and in-memory fallback.
- [ ] Execute storage-denial, quota, malformed-value, build and deployed-origin fixtures.

## Current bootstrap path

```txt
authoritative snapshot admitted
  -> GameCanvas.initializeRuntime
  -> initializeRuntimeDebug
     -> localStorage.getItem(enabled)
     -> localStorage.getItem(overlay)
     -> optional setEnabled/setOverlayVisible
     -> attach debug window API
  -> create renderer, scene, camera and post-processing
  -> build maze world
  -> patch readiness
  -> start RAF
```

## Main finding

```txt
storage read throws
  -> debug initialization exits by exception
  -> renderer/world/listeners/RAF are not created
  -> no typed storage failure is published
  -> no memory-only default is selected
  -> no first playable frame acknowledgement exists

storage write throws during a toggle
  -> store action exits before normal settlement
  -> no durable or memory-only result exists
  -> no status explains the failed persistence
```

## Required authority

```txt
corridor-debug-preference-storage-fault-isolation-authority-domain
```

## Required results

```txt
DebugPreferenceCapabilityResult
DebugPreferenceReadResult
DebugPreferenceWriteResult
DebugBootstrapSettlementResult
FirstPlayableFrameAck
FirstDebugPreferenceStatusFrameAck
```

## Claim boundary

Documentation only. The source-backed risk is that optional debug persistence can control startup or toggle availability in storage-restricted contexts. No browser storage failure was reproduced and no runtime implementation is claimed.
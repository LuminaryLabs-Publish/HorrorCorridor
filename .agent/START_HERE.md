# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-17T03-58-09-04-00`  
**Status:** `debug-preference-storage-fault-isolation-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, client prediction, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates optional debug-preference persistence. Runtime bootstrap reads two `localStorage` keys before constructing the renderer and world, while keyboard/window debug toggles synchronously write both keys. The storage calls are unguarded and have no typed capability result or memory-only fallback, so a denied storage surface can block the first playable frame or interrupt a toggle.

## Plan ledger

**Goal:** prevent optional debug persistence from controlling gameplay-runtime availability while retaining safe in-memory preferences and explicit host-storage results.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented, root-agent-missing or runtime-ahead priority case.
- [x] Select only HorrorCorridor under the oldest synchronized rule.
- [x] Preserve the complete 29-kit and two-adapter inventory.
- [x] Add the timestamped debug storage fault-isolation audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement storage capability, typed read/write results and memory-only fallback.
- [ ] Execute storage-denial, source/build and deployed-origin fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-17T03-58-09-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-17T03-58-09-04-00-debug-preference-storage-fault-isolation-dsk-map.md`
7. `.agent/render-audit/2026-07-17T03-58-09-04-00-storage-denial-first-playable-frame-gap.md`
8. `.agent/gameplay-audit/2026-07-17T03-58-09-04-00-debug-preference-bootstrap-toggle-loop.md`
9. `.agent/interaction-audit/2026-07-17T03-58-09-04-00-debug-preference-command-result-map.md`
10. `.agent/debug-storage-audit/2026-07-17T03-58-09-04-00-host-storage-capability-fallback-contract.md`
11. `.agent/deploy-audit/2026-07-17T03-58-09-04-00-storage-denial-browser-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-17T03-58-09-04-00-oldest-selection-debug-storage-reconciliation.md`

## Current authority boundary

```txt
corridor-debug-preference-storage-fault-isolation-authority-domain
```

## Required transaction

```txt
DebugPreferenceCapabilityCommand
  -> classify host storage capability
  -> publish DebugPreferenceCapabilityResult

DebugPreferenceReadCommand
  -> validate schema/build-scoped public-safe preferences
  -> select persisted value or memory-only default
  -> publish DebugPreferenceReadResult

DebugPreferenceWriteCommand
  -> apply accepted in-memory preference
  -> attempt bounded durable write
  -> publish persisted, memory-only, unavailable or failed result

DebugBootstrapSettlementCommand
  -> isolate preference failures from runtime boot
  -> publish DebugBootstrapSettlementResult
  -> publish FirstPlayableFrameAck
  -> publish FirstDebugPreferenceStatusFrameAck
```

## Validation boundary

Documentation only. No storage-fault isolation, fallback correctness, first-frame convergence, artifact parity, deployed parity or production readiness is claimed.
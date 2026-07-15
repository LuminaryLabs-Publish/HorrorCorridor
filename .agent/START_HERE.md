# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-15T11-39-04-04-00`  
**Status:** `minimap-backing-store-dpr-resize-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, local prediction, authoritative snapshots, cube/anomaly interactions, ooze, Three.js world rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates minimap backing-store ownership. The minimap compares integer canvas dimensions with raw floating-point `168 * devicePixelRatio` products and assigns both dimensions when unequal. Effective DPR values that produce non-integral products can therefore permit repeated backing-store and context-state resets on unchanged frames.

## Plan ledger

**Goal:** make the minimap a revisioned, integer-quantized render surface while preserving all gameplay, snapshot and visual-content ownership.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented or runtime-ahead priority case.
- [x] Select only HorrorCorridor under the oldest synchronized rule.
- [x] Preserve the complete 29-kit, two-adapter inventory and offered services.
- [x] Add the timestamped minimap audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement and execute fractional-DPR, resize, context-generation and parity fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-15T11-39-04-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-15T11-39-04-04-00-minimap-backing-store-dpr-dsk-map.md`
7. `.agent/render-audit/2026-07-15T11-39-04-04-00-fractional-dpr-canvas-reset-gap.md`
8. `.agent/gameplay-audit/2026-07-15T11-39-04-04-00-snapshot-to-minimap-frame-loop.md`
9. `.agent/interaction-audit/2026-07-15T11-39-04-04-00-minimap-surface-command-result-map.md`
10. `.agent/minimap-audit/2026-07-15T11-39-04-04-00-backing-store-quantization-context-contract.md`
11. `.agent/deploy-audit/2026-07-15T11-39-04-04-00-fractional-dpr-minimap-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-15T11-39-04-04-00-oldest-selection-minimap-reconciliation.md`

## Current authority boundary

```txt
corridor-minimap-backing-store-revision-authority-domain
```

## Required transaction

```txt
MinimapSurfaceAdmissionCommand
  -> bind surface, viewport, DPR-policy and prior-context revisions
  -> quantize logical size and effective DPR into integer physical dimensions
  -> compare accepted integer descriptors
  -> resize only when the descriptor changes
  -> retain one context for the active surface generation
  -> bind accepted snapshot, local pose and heading revisions
  -> execute one immutable minimap frame plan
  -> publish MinimapSurfaceResult and MinimapFrameResult
  -> acknowledge FirstMinimapResizeFrameAck
  -> retire the surface and reject late work
```

## Validation boundary

Documentation only. No Canvas2D repair, performance improvement, visual defect reproduction, stable context generation or production parity is claimed.
# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-15T21-39-15-04-00`  
**Status:** `pointer-lock-acquisition-failure-fallback-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, local prediction, authoritative snapshots, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap, and browser-proof tooling.

The current audit isolates pointer-lock acquisition. The world click directly calls `requestPointerLock()`, but no accepted/rejected result is observed, no `pointerlockerror` listener exists, input readiness is published before mouse-look ownership is accepted, capture chrome is hidden, and no visible retry, fallback, or first matching mouse-look frame acknowledgement exists.

## Plan ledger

**Goal:** admit mouse-look ownership through one explicit browser capability transaction and preserve an operable, visible fallback when acquisition fails.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented, root-agent-missing, or runtime-ahead priority case.
- [x] Select only HorrorCorridor under the oldest synchronized rule.
- [x] Preserve the complete 29-kit and two-adapter inventory.
- [x] Add the timestamped pointer-lock audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement and execute pointer-lock acceptance, failure, fallback, retirement, and parity fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-15T21-39-15-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-15T21-39-15-04-00-pointer-lock-acquisition-dsk-map.md`
7. `.agent/render-audit/2026-07-15T21-39-15-04-00-mouse-look-readiness-visible-frame-gap.md`
8. `.agent/gameplay-audit/2026-07-15T21-39-15-04-00-capture-failure-no-look-loop.md`
9. `.agent/interaction-audit/2026-07-15T21-39-15-04-00-pointer-lock-command-result-map.md`
10. `.agent/pointer-lock-audit/2026-07-15T21-39-15-04-00-acquisition-failure-fallback-contract.md`
11. `.agent/deploy-audit/2026-07-15T21-39-15-04-00-pointer-lock-browser-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-15T21-39-15-04-00-oldest-selection-pointer-lock-reconciliation.md`

## Current authority boundary

```txt
corridor-pointer-lock-acquisition-failure-fallback-authority-domain
```

## Required transaction

```txt
PointerLockAdmissionCommand
  -> bind document runtime route surface gesture and policy revisions
  -> observe API and permissions-policy capability
  -> create one acquisition generation
  -> classify accepted denied unsupported interrupted stale or retired
  -> publish PointerLockAdmissionResult exactly once
  -> mark mouse-look ready only after accepted ownership
  -> expose visible retry or fallback controls after failure
  -> acknowledge FirstPointerLockFrameAck after matching look evidence renders
  -> retire ownership and clear input exactly once
```

## Validation boundary

Documentation only. No runtime repair, pointer-lock failure reproduction, fallback support, visible-frame convergence, build parity, deployed parity, or production readiness is claimed.
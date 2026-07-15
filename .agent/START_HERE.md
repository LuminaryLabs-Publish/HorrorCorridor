# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-15T02-00-17-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, deterministic maze bootstrap, PeerJS and BroadcastChannel transport, predictive movement, host snapshots, cube/anomaly interactions, ooze, Three.js presentation, post-processing, minimap and browser-proof tooling.

The current audit isolates device-control coverage. Runtime gameplay actions are produced by keyboard events and pointer-lock mouse movement. The active game exposes no touch movement surface, touch-look gesture, touch interaction control or touch pause control, so a touch-only browser cannot complete the movement and anomaly loop through the documented input path.

## Plan ledger

**Goal:** preserve one normalized player-input model while giving every admitted device class complete, non-conflicting coverage for movement, look, interaction, pause and capture state.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only HorrorCorridor under the oldest eligible synchronized rule.
- [x] Preserve the complete 29-kit, two-adapter inventory and offered services.
- [x] Add the timestamped device-control audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement and execute touch, hybrid-input and visible-effect fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-15T02-00-17-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-15T02-00-17-04-00-device-control-action-coverage-dsk-map.md`
7. `.agent/render-audit/2026-07-15T02-00-17-04-00-touch-control-surface-visible-frame-gap.md`
8. `.agent/gameplay-audit/2026-07-15T02-00-17-04-00-touch-only-player-immobility-loop.md`
9. `.agent/interaction-audit/2026-07-15T02-00-17-04-00-device-action-command-result-map.md`
10. `.agent/device-control-audit/2026-07-15T02-00-17-04-00-keyboard-mouse-touch-action-coverage-contract.md`
11. `.agent/deploy-audit/2026-07-15T02-00-17-04-00-device-control-browser-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-15T02-00-17-04-00-oldest-selection-device-control-reconciliation.md`

## Current authority boundary

```txt
corridor-device-control-action-coverage-authority-domain
```

## Required transaction

```txt
DeviceControlAdmissionCommand
  -> bind document, viewport, device capabilities,
     control generation and input-map revision
  -> resolve the required gameplay action set
  -> admit keyboard, mouse, touch or hybrid producers
  -> require movement, look, interact, pause and capture/release coverage
  -> arbitrate gestures and prevent duplicate multi-device actions
  -> route all accepted actions through PlayerInputState
  -> publish DeviceControlAdmissionResult
  -> publish FirstDeviceControlSurfaceFrameAck
  -> publish FirstDeviceActionEffectFrameAck
```

## Validation boundary

Documentation only. No touch playability, hybrid-input arbitration, semantic control coverage, first-action frame convergence or production-readiness claim is made.

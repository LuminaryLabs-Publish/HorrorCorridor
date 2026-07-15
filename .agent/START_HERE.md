# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-15T16-39-06-04-00`  
**Status:** `active-gameplay-hud-projection-mount-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, local prediction, authoritative snapshots, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates active gameplay HUD composition. The `PLAYING` branch returns only settings and debug surfaces; the objective, anomaly sequence, held item, player status and minimap canvas are mounted only by the later `COMPLETED` branch. The render loop still looks for and attempts to draw the minimap every frame, producing a null-canvas no-op during active play.

## Plan ledger

**Goal:** make every accepted `PLAYING` route own one complete HUD and minimap mount generation while keeping settings and debug overlays additive.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented or runtime-ahead priority case.
- [x] Select only HorrorCorridor under the oldest synchronized rule.
- [x] Preserve the complete 29-kit, two-adapter inventory and offered services.
- [x] Add the timestamped active gameplay HUD audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement and execute active-run HUD, minimap, retirement and parity fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-15T16-39-06-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-15T16-39-06-04-00-active-gameplay-hud-projection-dsk-map.md`
7. `.agent/render-audit/2026-07-15T16-39-06-04-00-playing-hud-canvas-absence-gap.md`
8. `.agent/gameplay-audit/2026-07-15T16-39-06-04-00-playing-state-hud-projection-loop.md`
9. `.agent/interaction-audit/2026-07-15T16-39-06-04-00-hud-projection-command-result-map.md`
10. `.agent/hud-audit/2026-07-15T16-39-06-04-00-active-run-overlay-mount-contract.md`
11. `.agent/deploy-audit/2026-07-15T16-39-06-04-00-playing-hud-browser-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-15T16-39-06-04-00-oldest-selection-hud-projection-reconciliation.md`

## Current authority boundary

```txt
corridor-active-gameplay-hud-projection-mount-authority-domain
```

## Required transaction

```txt
GameplayHudProjectionCommand
  -> bind document, route, screen, snapshot, local-player and HUD-policy revisions
  -> derive one immutable GameplayHudReadModel
  -> select required PLAYING surfaces independently from COMPLETED
  -> adopt one HudMountGeneration
  -> mount objective, sequence, held item, player status and minimap
  -> compose settings and debug without replacing the gameplay HUD
  -> bind minimap draw work to the accepted canvas generation
  -> publish GameplayHudProjectionResult
  -> acknowledge FirstPlayingHudFrameAck
  -> retire the mount and reject late draw work on route transition
```

## Validation boundary

Documentation only. No HUD repair, minimap availability, visual parity or production readiness is claimed.
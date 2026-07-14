# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-14T10-40-05-04-00`  
**Status:** `settings-overlay-input-suspension-preference-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host, and client routes, deterministic bootstrap, PeerJS/local transport, interaction gameplay, Three.js presentation, and browser proof tooling.

The current audit isolates Settings ownership. `Q` makes a static control-reference overlay visible while the UI remains `PLAYING`; pointer lock, held input, movement, interaction, prediction, publication, and rendering remain active. No typed preference, accepted settings revision, persistence result, or matching visible-frame receipt exists.

## Plan ledger

**Goal:** make settings entry, preference adoption, and exit one transaction that owns input suspension, pointer-lock transfer, persistence, rollback, and visible proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only HorrorCorridor under the oldest eligible rule.
- [x] Preserve the full interaction loop, domains, 29-kit inventory, two adapters, and services.
- [x] Add the timestamped settings audit family.
- [x] Refresh root docs and machine registry.
- [ ] Implement and execute settings, input, pointer-lock, persistence, and frame fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-14T10-40-05-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-14T10-40-05-04-00-settings-overlay-input-suspension-dsk-map.md`
7. `.agent/render-audit/2026-07-14T10-40-05-04-00-settings-overlay-visible-input-ownership-gap.md`
8. `.agent/settings-audit/2026-07-14T10-40-05-04-00-control-preference-input-suspension-contract.md`
9. `.agent/deploy-audit/2026-07-14T10-40-05-04-00-settings-overlay-fixture-gate.md`
10. `.agent/central-sync-audit/2026-07-14T10-40-05-04-00-repo-ledger-settings-overlay-reconciliation.md`

## Current authority boundary

```txt
corridor-settings-overlay-input-suspension-preference-authority-domain
```

## Required transaction

```txt
SettingsOpenCommand
  -> suspend gameplay input and local prediction
  -> clear held input and release pointer lock
  -> project an accessible overlay

SettingsApplyCommand
  -> validate and atomically adopt one SettingsRevision
  -> persist and acknowledge the matching visible frame

SettingsCloseCommand
  -> retire overlay ownership
  -> restore predecessor policy
  -> require fresh pointer lock and reject stale input
```

## Validation boundary

Documentation only. No settings behavior, input suspension, pointer-lock transfer, persistence, visible-frame convergence, or production-readiness claim is made.
# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-14T10-40-05-04-00`  
**Branch:** `main`  
**Status:** `settings-overlay-input-suspension-preference-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is Settings ownership: a static control overlay is toggled inside `PLAYING`, but input, pointer lock, local prediction, interaction, networking, and frame production are not suspended or version-bound.

## Plan ledger

**Goal:** establish one settings transaction from overlay entry through preference adoption, persistence, visible proof, and safe return to play.

- [x] Compare 11 Publish repositories and ten eligible central ledgers.
- [x] Confirm root `.agent` coverage and synchronization.
- [x] Select HorrorCorridor by the oldest eligible timestamp.
- [x] Inspect `GameShell`, `GameCanvas`, `HUDOverlay`, `SettingsOverlay`, `uiStore`, and package surfaces.
- [x] Preserve all 29 kits, two adapters, and services.
- [x] Add and route the timestamped settings audit family.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
start/lobby
  -> solo, host, or client admission
  -> bootstrap snapshot
  -> GameCanvas initializes world, input, network, and RAF
  -> movement and interaction advance the maze loop
  -> host publishes or client sends updates
  -> renderer and minimap project state

settings
  -> Q directly toggles overlay visibility
  -> screen remains PLAYING
  -> pointer lock and listeners remain active
  -> simulation/prediction and networking continue
  -> no typed preference or accepted revision exists
  -> Q or Close hides the overlay without a settled return transaction
```

## Domains in use

```txt
routing and screen lifecycle
session room roster connection and readiness
loading and deterministic bootstrap
transport protocol and snapshot publication
keyboard pointer-lock focus and input state
settings overlay visibility and control reference
pause completion and UI projection
movement collision camera and prediction
interaction anomaly ooze and victory
Three.js world post-processing minimap and RAF
debug proof cleanup package build and deployment
```

## Implemented inventory

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
```

The full kit-by-kit service inventory remains in `.agent/kit-registry.json` and the latest tracker.

## Source-backed findings

```txt
mutable settings controls: no
static control map: yes
visible Settings button during PLAYING: no
Q opens overlay while PLAYING: yes
held input cleared on open: no
pointer lock released on open: no
gameplay input checks settings ownership: no
simulation checks settings ownership: no
network send suspension: no
accepted SettingsRevision: no
preference persistence: no
matching visible-frame acknowledgement: no
```

## Required authority

```txt
corridor-settings-overlay-input-suspension-preference-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-14T10-40-05-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T10-40-05-04-00.md
.agent/architecture-audit/2026-07-14T10-40-05-04-00-settings-overlay-input-suspension-dsk-map.md
.agent/render-audit/2026-07-14T10-40-05-04-00-settings-overlay-visible-input-ownership-gap.md
.agent/gameplay-audit/2026-07-14T10-40-05-04-00-settings-open-live-simulation-loop.md
.agent/interaction-audit/2026-07-14T10-40-05-04-00-settings-command-input-admission-map.md
.agent/settings-audit/2026-07-14T10-40-05-04-00-control-preference-input-suspension-contract.md
.agent/deploy-audit/2026-07-14T10-40-05-04-00-settings-overlay-fixture-gate.md
.agent/central-sync-audit/2026-07-14T10-40-05-04-00-repo-ledger-settings-overlay-reconciliation.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, settings, scripts, dependencies, tests, workflows, and deployment are unchanged.
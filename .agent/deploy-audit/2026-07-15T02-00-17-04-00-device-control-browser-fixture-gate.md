# Deploy Audit: Device-Control Browser Fixture Gate

**Timestamp:** `2026-07-15T02-00-17-04-00`

## Summary

Current package scripts can build, lint, run game harnesses and collect browser proof, but there is no dedicated touch-only or hybrid-input fixture gate.

## Plan ledger

**Goal:** prevent device-control claims until source, production build and deployed origin demonstrate complete action coverage.

- [x] Inspect package scripts.
- [x] Identify available browser proof adapters.
- [x] Define required device fixture matrix.
- [ ] Implement fixtures.
- [ ] Run against source/dev.
- [ ] Run against production build.
- [ ] Run against deployed origin.

## Required fixtures

```txt
desktop-keyboard-mouse
touch-only-portrait
touch-only-landscape
hybrid-touch-keyboard
hybrid-touch-mouse
pointercancel-during-movement
blur-during-look
visibility-hide-during-movement
settings-overlay-gesture-conflict
interact-single-fire
pause-resume
first-action-effect-frame
```

## Required proof per fixture

```txt
resolved control profile
visible control surface screenshot
action coverage manifest
normalized input snapshots
accepted/rejected action results
player pose or interaction effect
first matching frame acknowledgement
cleanup state after cancellation
```

## Artifact parity gate

```txt
source route
  == production build
  == deployed origin
```

Parity includes profile selection, control layout, normalized action semantics, cancellation, and first effect frame.

## Current validation state

```txt
touch fixtures: unavailable
hybrid fixtures: unavailable
production build: not run
deployed origin: not run
```

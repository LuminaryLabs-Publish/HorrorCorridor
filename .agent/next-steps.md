# HorrorCorridor Next Steps

**Updated:** `2026-07-14T10-40-05-04-00`

## Summary

Replace the direct Settings overlay toggle with a small authority that suspends gameplay input, transfers pointer ownership, validates supported preferences, persists one accepted revision, and proves visible adoption before returning to play.

## Plan ledger

**Goal:** implement settings authority with minimal changes to the existing stores and `GameCanvas` lifecycle.

### Documentation

- [x] Audit Settings, input, pointer lock, simulation, networking, and presentation.
- [x] Preserve the 29-kit and two-adapter inventory.
- [x] Define the parent domain and fixture gate.

### Gate 1: settings session and command admission

- [ ] Add `SettingsSessionId`, `SettingsRevision`, and command IDs.
- [ ] Replace direct `toggleSettingsOverlay()` entry with `SettingsOpenCommand`.
- [ ] Return typed open, apply, and close results.
- [ ] Reject stale or duplicate settings commands.

### Gate 2: input and pointer ownership

- [ ] Clear held movement, look, interact, and pause input on open.
- [ ] Release pointer lock and record the transfer result.
- [ ] Block gameplay key and mouse admission while settings owns focus.
- [ ] Suspend local prediction and client player-update sends.
- [ ] Continue passive authoritative snapshot receipt.

### Gate 3: accessible presentation

- [ ] Add a visible Settings entry during PLAYING.
- [ ] Add focus trap, keyboard navigation, Escape/Close behavior, and focus restoration.
- [ ] Ensure PAUSED and route-exit behavior retire the settings session explicitly.
- [ ] Require a fresh pointer gesture after close.

### Gate 4: preferences

- [ ] Declare only preferences with real consumers.
- [ ] Validate ranges and capability support.
- [ ] Atomically adopt camera, input, render, UI, and accessibility consumers.
- [ ] Persist the accepted revision with schema/version metadata.
- [ ] Roll back all participants on mandatory-consumer failure.

### Gate 5: visible proof

- [ ] Bind Settings frames to session and settings revisions.
- [ ] Record input-suspension and pointer-lock receipts.
- [ ] Acknowledge the first matching visible frame.
- [ ] Verify source, production build, and deployed origin.

### Gate 6: fixtures

- [ ] Hold W while opening Settings.
- [ ] Press interaction keys while Settings is open.
- [ ] Open while pointer locked.
- [ ] Open as a client while receiving SYNC.
- [ ] Close with stale held keys.
- [ ] Apply, reload, reject invalid values, inject persistence failure, and exit route mid-session.

## Dependency order

```txt
settings command identity
  -> input suspension and pointer transfer
  -> accessible overlay ownership
  -> typed preference adoption
  -> persistence and rollback
  -> visible-frame proof
  -> source/build/deployed fixtures
```

## Completion boundary

Do not treat the Settings surface as functional or safe during play until input suspension, preference adoption, persistence, and re-entry fixtures pass on `main`.
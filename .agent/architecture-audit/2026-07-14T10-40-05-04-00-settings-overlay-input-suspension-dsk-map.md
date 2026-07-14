# Settings Overlay Input Suspension DSK Map

**Timestamp:** `2026-07-14T10-40-05-04-00`

## Summary

The current overlay is projected by `uiStore` and `HUDOverlay`, while input, pointer lock, prediction, publication, and rendering remain owned by `GameCanvas`. No coordinating domain settles those participants together.

## Plan ledger

**Goal:** define the minimum domain family needed to make settings entry, preference adoption, and exit atomic.

- [x] Map current owners.
- [x] Preserve existing kit responsibilities.
- [x] Define coordinating surfaces without treating them as implemented.
- [ ] Implement and prove the family.

## Existing ownership

```txt
uiStore
  overlay kind and visibility

HUDOverlay / SettingsOverlay
  static control reference and close action

GameCanvas
  Q admission
  pointer lock
  keyboard and mouse listeners
  local movement and prediction
  interaction admission
  host publication and client updates
  frame rendering
```

## Parent domain

```txt
corridor-settings-overlay-input-suspension-preference-authority-domain
```

## Planned DSK surfaces

```txt
settings-command-kit
settings-session-generation-kit
settings-preference-schema-kit
settings-candidate-validation-kit
settings-revision-kit
settings-persistence-kit
settings-overlay-projection-kit
settings-focus-trap-kit
settings-accessible-entry-kit
input-suspension-kit
held-input-retirement-kit
pointer-lock-transfer-kit
pointer-lock-reacquisition-kit
local-prediction-suspension-kit
network-input-suspension-kit
camera-preference-adoption-kit
render-preference-adoption-kit
accessibility-preference-adoption-kit
settings-participant-receipt-kit
settings-visible-frame-ack-kit
settings-rollback-kit
settings-command-journal-kit
settings-fixture-matrix-kit
```

## Command flow

```txt
SettingsOpenCommand
  -> bind active run and UI revisions
  -> suspend gameplay input
  -> clear held input
  -> release pointer lock
  -> project accessible overlay
  -> publish SettingsOpenResult

SettingsApplyCommand
  -> validate typed candidate
  -> prepare all consumers
  -> commit one SettingsRevision
  -> persist revision
  -> acknowledge matching visible frame

SettingsCloseCommand
  -> retire overlay ownership
  -> restore predecessor screen policy
  -> require fresh pointer gesture
  -> reject stale input releases
  -> publish SettingsCloseResult
```

## Boundary

These surfaces are planned coordination contracts, not implemented kits.
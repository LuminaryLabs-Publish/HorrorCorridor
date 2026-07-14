# Settings Command Input Admission Map

**Timestamp:** `2026-07-14T10-40-05-04-00`

## Summary

Settings is currently a direct overlay mutation rather than a typed command. It has no request identity, accepted predecessor, participant receipts, stale-event classification, or terminal result.

## Plan ledger

**Goal:** replace direct overlay toggling with explicit settings commands and input-admission results.

- [x] Map current entry and close paths.
- [x] Map input participants.
- [x] Define typed outcomes.
- [ ] Implement command routing and journal proof.

## Current map

```txt
Q -> toggleSettingsOverlay()
button Close -> toggleSettingsOverlay(false)

missing:
  command ID
  settings session generation
  expected UI revision
  input suspension receipt
  pointer-lock receipt
  persistence result
  visible-frame receipt
```

## Required results

```txt
SettingsOpenResult
  Opened | AlreadyOpen | Rejected | Stale | Failed

SettingsApplyResult
  Applied | NoChange | Invalid | Conflict | Stale | Failed

SettingsCloseResult
  Closed | AlreadyClosed | Stale | Failed

InputSuspensionResult
  Suspended | AlreadySuspended | Failed

PointerLockTransferResult
  Released | NotOwned | Failed
```

## Admission rule

```txt
when SettingsSession is Open:
  allow settings navigation and close/apply commands
  allow passive network receive
  reject movement, look, pickup, drop, place, remove, and pause-toggle gameplay commands
  clear predecessor held-input state
```

## Validation boundary

No command implementation or executable result fixture exists.
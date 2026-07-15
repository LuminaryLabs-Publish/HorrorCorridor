# Device Control Audit: Keyboard, Mouse and Touch Action-Coverage Contract

**Timestamp:** `2026-07-15T02-00-17-04-00`

## Summary

This contract defines device-profile admission, complete action coverage, gesture ownership and retirement for HorrorCorridor.

## Plan ledger

**Goal:** make device coverage explicit, complete and testable without fragmenting gameplay logic.

- [x] Freeze the required action set.
- [x] Freeze desktop coverage.
- [x] Define touch coverage.
- [x] Define hybrid arbitration.
- [x] Define cancellation and retirement.
- [ ] Implement and validate.

## Required action set

```txt
MoveForward
MoveBackward
MoveLeft
MoveRight
LookHorizontal
LookVertical
Interact
Pause
CaptureOrActivateControlProfile
ReleaseOrCancelControlProfile
```

## Desktop profile

```txt
keyboard
  -> movement
  -> interact
  -> pause

pointer-lock mouse
  -> look
  -> capture/release
```

## Touch profile

```txt
movement pointer
  -> bounded two-axis movement
  -> dead zone
  -> pointer capture
  -> cancel clears axes

look pointer
  -> bounded delta look
  -> separate gesture region
  -> pointer capture
  -> cancel clears deltas

semantic buttons
  -> interact
  -> pause
```

## Hybrid profile

```txt
keyboard and mouse may coexist with touch
each physical pointer/key owns one action generation
duplicate semantic actions are coalesced
latest device does not silently retire another held action
overlay gestures have explicit priority
```

## Retirement triggers

```txt
pointerup
pointercancel
lostpointercapture
window blur
visibility hidden
pagehide/freeze
route exit
control-profile replacement
runtime cleanup
```

## Invariants

```txt
all profiles route through PlayerInputState
no profile may omit a required action
no stale pointer may leave movement held
no one gesture may trigger interaction twice
no hidden control generation may continue producing input
```

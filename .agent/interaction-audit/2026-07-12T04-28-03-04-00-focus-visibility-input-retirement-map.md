# HorrorCorridor Focus and Visibility Input-Retirement Map

**Timestamp:** `2026-07-12T04-28-03-04-00`

## Event map

```txt
keydown movement
  -> setPlayerInputButton(..., true)

keyup movement
  -> setPlayerInputButton(..., false)

pointerlockchange to unlocked
  -> setPlayerPointerLocked(false)
  -> full neutral input state
  -> PLAYING transitions to PAUSED

window blur while pointer locked
  -> exitPointerLock
  -> pointerlockchange performs neutralization

window blur while pointer unlocked
  -> no action

visibilitychange hidden
  -> no listener

pagehide
  -> no listener

GameCanvas cleanup
  -> remove listeners and dispose render resources
  -> no neutral runtime input publication
```

## Current ownership problem

The same held-button state is treated as valid until keyup or pointer-lock loss. Browser focus and visibility are not part of the input identity, so the runtime cannot distinguish:

```txt
key is physically still held
key was released while the page was unfocused
page was hidden and resumed
runtime was replaced while a stale callback remained
```

## Required normalized commands

```txt
RetireInput(reason = window-blur)
RetireInput(reason = document-hidden)
RetireInput(reason = pagehide)
RetireInput(reason = pointer-lock-lost)
RetireInput(reason = pause)
RetireInput(reason = route-exit)
RetireInput(reason = transport-loss)
RetireInput(reason = runtime-stop)
RetireInput(reason = runtime-replacement)
```

## Required event ordering

```txt
ownership-loss event
  -> normalize reason
  -> capture expected runtime/run/input revisions
  -> admit retirement once
  -> block movement and interaction admission
  -> commit neutral input
  -> update runtime store
  -> publish zero-input correction if eligible
  -> release pointer lock if required
  -> append result
  -> acknowledge first neutral frame
```

## Deduplication rules

A browser may emit overlapping events, such as:

```txt
blur
pointerlockchange
visibilitychange
pagehide
```

All events referring to the same prior `inputRevision` and `controlLeaseId` must converge on one committed retirement. Later events return `Duplicate` or `AcceptedAlreadyNeutral` without incrementing the revision again or publishing another zero-input message.

## Focus regain rules

```txt
focus or visibility regain alone
  -> does not restore prior held controls
  -> does not create a control lease

new physical keydown while admitted
  -> creates or renews the control lease
  -> advances input revision
  -> becomes eligible for simulation consumption
```

## Interaction edge controls

Retirement must also clear:

```txt
interact
pause
lookDeltaX
lookDeltaY
```

This prevents a stale interaction edge or accumulated look delta from firing on the first frame after focus returns.

## Required observations

```txt
last browser lifecycle event
last retirement command and result
current input revision
current control lease
current focus and visibility state
prior and committed axes
zero-input publication status
first neutral frame ID
```

## Validation boundary

No event listener or input code changed. The map defines the missing convergence contract only.
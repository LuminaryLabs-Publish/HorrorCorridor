# HorrorCorridor Unfocused Stale-Movement Frame Gap

**Timestamp:** `2026-07-12T04-28-03-04-00`

## Summary

The renderer can present camera and player movement caused by a stale held-button state after the browser has lost focus. There is no frame-level proof that movement consumed by the rendered frame came from a currently valid physical input lease.

## Current frame path

```txt
keydown
  -> persistent held-button state
  -> animation loop reads PLAYING
  -> stepLocalPose consumes axes
  -> camera follows resolved pose
  -> world updates from pose
  -> post-processing submits frame
```

## Failure path

```txt
unlocked W movement
  -> window blur
  -> no input neutralization
  -> keyup missed outside the page
  -> forward remains true
  -> subsequent frame advances pose
  -> camera and world render the unintended movement
```

The browser may throttle hidden tabs, but throttling does not repair the held state. When rendering resumes, the first visible frame can still consume stale forward or strafe input.

## Missing render provenance

```txt
frameId: available only in debug-local numbering
inputRevision: absent
controlLeaseId: absent
focus revision: absent
visibility revision: absent
retirement result ID: absent
movement admission result: absent
first neutral frame receipt: absent
```

## Required frame contract

Every gameplay frame that advances local movement must cite:

```txt
runtimeId
runId
frameId
inputRevision
controlLeaseId
focusState
visibilityState
movementAdmissionStatus
consumedAxes
```

After retirement, the first frame must prove:

```txt
consumedAxes = { forward: 0, strafe: 0 }
lookDelta = { x: 0, y: 0 }
controlLeaseId = null
inputRevision = committed retirement revision
```

## Required behavior

```txt
ownership-loss event
  -> commit neutral input
  -> prevent stale movement admission
  -> render first neutral frame
  -> attach InputRetirementResult and input revision
  -> publish frame acknowledgement
```

## Required fixtures

```txt
unlocked W + blur before keyup
  -> next rendered frame has unchanged player position

hidden tab + missed keyup
  -> first resumed frame consumes zero axes

pointer-lock loss + blur
  -> one retirement revision, not two

route exit/unmount
  -> no post-unmount movement frame
```

## Validation boundary

No render code changed. This audit identifies a provenance and visible-frame gap; it does not claim that unintended movement has been removed.
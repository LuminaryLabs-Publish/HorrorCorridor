# HorrorCorridor Next Steps

**Updated:** `2026-07-15T21-39-15-04-00`

## Summary

The next implementation should turn pointer-lock capture into a typed browser capability transaction. Mouse-look readiness must follow accepted ownership, while denial, unsupported capability, interruption, retry, fallback, and retirement each publish explicit results.

## Plan ledger

**Goal:** implement one complete pointer-lock admission lifecycle with visible recovery and source/build/deployed proof.

- [ ] Define `PointerLockPolicyRevision`, `SurfaceId`, `UserGestureId`, and `PointerLockGeneration`.
- [ ] Observe Pointer Lock API support and permissions-policy eligibility before requesting ownership.
- [ ] Normalize promise-returning and void-returning `requestPointerLock()` behavior.
- [ ] Add a `pointerlockerror` observer and classify denied, unsupported, interrupted, stale, and retired outcomes.
- [ ] Publish `PointerLockAdmissionResult` exactly once per accepted capture gesture.
- [ ] Mark mouse-look readiness only after the mount is the observed pointer-lock owner.
- [ ] Keep input readiness and mouse-look readiness as separate revisions.
- [ ] Expose a visible capture-failure message and retry action when acquisition fails.
- [ ] Provide a compatible fallback look profile or explicitly reject route admission when pointer lock is unavailable.
- [ ] Keep keyboard movement safe while a reduced profile is active.
- [ ] Bind consumed look deltas and camera state to the accepted pointer-lock generation.
- [ ] Publish `FirstPointerLockFrameAck` for the first matching camera/render frame.
- [ ] Release accepted ownership once on pause, completion, blur, hidden state, page retirement, route exit, surface replacement, and cleanup.
- [ ] Clear held buttons and look deltas during retirement.
- [ ] Reject late change/error callbacks from retired generations.
- [ ] Add accepted, denied, unsupported, interrupted, retry, fallback, and retirement browser fixtures.
- [ ] Prove source, production-build, and deployed-origin parity.

## Checkpoints

```txt
Checkpoint A
  every capture gesture settles as one typed result

Checkpoint B
  input readiness does not imply mouse-look readiness

Checkpoint C
  accepted ownership produces FirstPointerLockFrameAck

Checkpoint D
  denial or unsupported capability produces visible retry/fallback state

Checkpoint E
  pause blur hide and route exit retire the accepted generation exactly once

Checkpoint F
  stale callbacks cannot reactivate retired ownership

Checkpoint G
  source build and deployed origin produce matching result receipts
```

## Retained work

Previous active-HUD, minimap, audio, lifecycle, loading, protocol, movement, device-control, render, and deployment findings remain open. The pointer-lock authority composes with rather than replaces those boundaries.

## Do not claim

Do not claim pointer-lock reliability, mouse-look completeness, fallback operability, lifecycle safety, frame convergence, or production parity until the fixture matrix passes.
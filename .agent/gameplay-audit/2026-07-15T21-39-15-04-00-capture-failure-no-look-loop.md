# Gameplay Audit: Capture-Failure No-Look Loop

**Timestamp:** `2026-07-15T21-39-15-04-00`

## Summary

Keyboard movement can remain available while mouse-look capture is unaccepted. Because capture failure has no classified result or fallback profile, the player can enter a reduced-control loop that is not represented in gameplay state or readiness.

## Plan ledger

**Goal:** make reduced-control gameplay explicit and recoverable rather than silently treating it as full input readiness.

- [x] Trace movement, pointer lock, look, camera, and frame consumption.
- [x] Separate movement availability from mouse-look readiness.
- [x] Define failure and fallback outcomes.
- [ ] Implement and validate.

## Current loop

```txt
PLAYING
  -> keyboard movement buttons can update PlayerInputState
  -> click requests pointer lock
  -> request remains unclassified if not accepted
  -> mousemove is ignored while unlocked
  -> movement and rendering continue
  -> no gameplay state says mouse look is unavailable
  -> no retry or fallback action is projected
```

## Required gameplay result

```txt
MouseLookCapabilityResult
  accepted
  denied
  unsupported
  interrupted
  fallback-active
  retired
```

Gameplay may continue in a reduced profile only when that profile is explicitly admitted, visible, and complete enough for the route. No route-blocking failure was reproduced.
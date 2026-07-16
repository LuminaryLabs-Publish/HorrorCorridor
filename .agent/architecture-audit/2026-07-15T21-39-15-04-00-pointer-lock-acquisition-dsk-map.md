# Architecture Audit: Pointer-Lock Acquisition DSK Map

**Timestamp:** `2026-07-15T21-39-15-04-00`

## Summary

The current first-person input kit owns keyboard state, pointer-lock observation, mouse deltas, and snapshots, but browser acquisition is an untyped host call. The missing boundary is an admission domain between browser capability evidence and accepted mouse-look readiness.

## Plan ledger

**Goal:** define the smallest domain/service-kit family that classifies pointer-lock acquisition and preserves existing gameplay ownership.

- [x] Preserve existing input, movement, camera, route, and render kits.
- [x] Isolate browser capability and gesture admission.
- [x] Define accepted, failed, fallback, and retired results.
- [ ] Implement and validate.

## Current map

```txt
PointerLockGate click
  -> GameCanvas requestPointerLock()
  -> browser outcome is not represented

pointerlockchange
  -> setPlayerPointerLocked
  -> PlayerInputState
  -> mousemove accumulation
  -> camera look
  -> rendered frame
```

## Required parent domain

```txt
corridor-pointer-lock-acquisition-failure-fallback-authority-domain
```

## Child kits and services

```txt
pointer-lock-capability-observation-kit
  -> API support
  -> permissions-policy state
  -> active document and surface eligibility

pointer-lock-policy-kit
  -> route eligibility
  -> retry limits
  -> fallback requirements

pointer-lock-surface-identity-kit
  -> SurfaceId
  -> mount generation

user-gesture-identity-kit
  -> UserGestureId
  -> freshness and consumption

pointer-lock-generation-kit
  -> one acquisition generation
  -> predecessor/successor relation

pointer-lock-request-adapter-kit
  -> requestPointerLock invocation
  -> promise/void normalization

pointer-lock-change-observer-kit
  -> ownership observation
  -> accepted/released evidence

pointer-lock-error-observer-kit
  -> browser error evidence
  -> denied/interrupted classification

pointer-lock-outcome-classification-kit
  -> accepted
  -> denied
  -> unsupported
  -> interrupted
  -> stale
  -> retired

mouse-look-readiness-kit
  -> readiness only after accepted ownership
  -> input snapshot binding

capture-retry-policy-kit
  -> visible retry state
  -> duplicate suppression

mouse-look-fallback-profile-kit
  -> keyboard look
  -> touch look
  -> gamepad look
  -> reduced-capability declaration

visible-capture-failure-projection-kit
  -> failure message
  -> retry action
  -> fallback instructions

pointer-lock-admission-result-kit
  -> typed result
  -> revision receipts

first-pointer-lock-frame-ack-kit
  -> accepted look evidence
  -> matching camera/render frame

pointer-lock-retirement-kit
  -> release once
  -> clear input
  -> reject late callbacks

pointer-lock-browser-fixture-kit
  -> accepted denied unsupported interrupted retry cases

source-build-pages-pointer-lock-parity-kit
  -> source/build/deployed identity and result parity
```

## Composition invariant

The new domain may admit or reject mouse-look ownership, but it must not mutate maze, movement, interaction, networking, route, or render truth directly. Those systems consume only accepted input snapshots and revision-bound results.
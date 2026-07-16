# Pointer-Lock Audit: Acquisition, Failure, and Fallback Contract

**Timestamp:** `2026-07-15T21-39-15-04-00`

## Summary

This contract makes browser pointer-lock ownership explicit. It separates API support, gesture admission, browser acceptance, mouse-look readiness, visible failure handling, fallback controls, and retirement.

## Plan ledger

**Goal:** prevent silent reduced-control sessions by requiring one terminal result for every capture attempt.

- [x] Define acquisition evidence.
- [x] Define failure classes.
- [x] Define retry and fallback requirements.
- [x] Define lifecycle retirement.
- [ ] Implement and validate.

## Admission contract

```txt
preconditions
  active document
  active PLAYING route
  live runtime and surface generation
  fresh accepted user gesture
  pointer-lock API and policy observation

request
  exactly one browser request per admission command

settlement
  accepted
  denied
  unsupported
  interrupted
  stale
  retired
```

## Failure projection contract

```txt
denied or interrupted
  -> explain that mouse capture was not accepted
  -> keep a visible retry action
  -> preserve keyboard movement safely

unsupported
  -> publish a compatible look-control fallback
  -> or block route admission with a clear capability result

all failures
  -> do not publish mouse-look readiness
  -> do not publish FirstPointerLockFrameAck
  -> do not consume stale callbacks
```

## Retirement triggers

```txt
manual release
pause
completion
route exit
window blur
document hidden
pagehide/freeze
surface replacement
runtime cleanup
```

## Retirement invariant

The accepted generation releases once, clears held buttons and look deltas, publishes a retirement receipt, and rejects all later events associated with that generation.
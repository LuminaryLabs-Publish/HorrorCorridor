# Render Audit: Mouse-Look Readiness Visible-Frame Gap

**Timestamp:** `2026-07-15T21-39-15-04-00`

## Summary

The render loop can publish normal world frames before mouse-look ownership is accepted. Input readiness is set during initialization, but there is no render-bound result proving that a pointer-lock generation accepted look evidence and produced the first matching camera frame.

## Plan ledger

**Goal:** bind accepted pointer-lock ownership, consumed look deltas, camera state, and one visible frame.

- [x] Identify the current camera and render path.
- [x] Identify missing acquisition and frame acknowledgements.
- [ ] Implement a revision-bound visible-frame receipt.

## Current path

```txt
runtime initialization
  -> patch input readiness true
  -> render world frames

world click
  -> request pointer lock
  -> no admission result

pointerlockchange accepted
  -> pointerLocked=true
  -> mousemove deltas accumulate
  -> frame applies look
  -> camera updates
  -> post-processing renders
  -> no FirstPointerLockFrameAck
```

## Gap

```txt
PointerLockGeneration: absent
PointerLockAdmissionResult: absent
LookInputRevision: absent
CameraFrameRevision: absent
FirstPointerLockFrameAck: absent
failed-capture visual result: absent
fallback-control frame result: absent
```

## Required evidence

A passing frame must cite the accepted pointer-lock generation, look-input revision, camera revision, renderer generation, route revision, and frame number. A failed acquisition must instead cite a visible failure/fallback projection result.

No visual defect or pointer-lock failure was reproduced in this documentation-only run.
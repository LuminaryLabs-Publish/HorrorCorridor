# HorrorCorridor Minimap Surface Command/Result Map

**Timestamp:** `2026-07-15T11-39-04-04-00`

## Summary

Minimap rendering currently has no explicit command/result boundary. Browser state is read and canvas state is mutated directly during the main frame callback.

## Plan ledger

**Goal:** make every minimap resize, draw and retirement action attributable to an immutable command and typed result.

- [x] Identify browser observations and direct mutations.
- [x] Identify content inputs and ownership.
- [x] Define command identity, admission and result surfaces.
- [ ] Implement idempotency, stale-work rejection and fixture rows.

## Current direct path

```txt
render callback
  -> document.getElementById
  -> canvas.getContext
  -> window.devicePixelRatio
  -> canvas.width assignment
  -> canvas.height assignment
  -> context.setTransform
  -> draw calls
```

## Required command map

```txt
ObserveMinimapSurfaceCommand
  inputs
    route revision
    mount revision
    DOM canvas reference
    logical CSS size
    observed DPR
  result
    MinimapSurfaceObservationResult

MinimapSurfaceAdmissionCommand
  inputs
    MinimapSurfaceId
    previous descriptor
    observed logical size
    DprPolicyRevision
    quantization policy
  result
    MinimapSurfaceResult
      adopted | unchanged | rejected | retired
      dimensionWrites
      ContextGeneration
      accepted descriptor

MinimapFrameCommand
  inputs
    MinimapFrameId
    accepted surface descriptor
    ContextGeneration
    SnapshotRevision
    LocalPoseRevision
    HeadingRevision
  result
    MinimapFrameResult
      executed | rejected | retired
      draw receipt
      visible candidate

MinimapSurfaceRetirementCommand
  inputs
    MinimapSurfaceId
    expected ContextGeneration
    reason
  result
    MinimapSurfaceRetirementReceipt

AcknowledgeMinimapFrameCommand
  inputs
    visible candidate
    accepted descriptor fingerprint
    source revisions
  result
    FirstMinimapResizeFrameAck
```

## Admission rules

```txt
same command id
  -> return prior result
  -> perform no second dimension write

stale surface id
  -> reject
  -> preserve accepted surface

unchanged integer descriptor
  -> unchanged result
  -> zero dimension writes
  -> same context generation

changed descriptor
  -> one admitted resize transaction
  -> next context generation
  -> matching frame required

retired route or canvas
  -> reject late resize and draw work
```

## Result evidence

```txt
command id
surface id
descriptor fingerprint
previous and next context generation
width writes
height writes
snapshot revision
local pose revision
draw count
visible candidate id
acknowledgement status
reject reason
```

## Validation boundary

No commands or results were implemented. This file defines the intended interaction contract only.
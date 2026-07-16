# Interaction Audit: Pointer-Lock Command/Result Map

**Timestamp:** `2026-07-15T21-39-15-04-00`

## Summary

Pointer-lock capture is currently an ambient browser side effect rather than a typed interaction command. This map freezes the command, result, retry, fallback, frame-acknowledgement, and retirement boundaries.

## Plan ledger

**Goal:** ensure every capture gesture settles once and every visible mouse-look effect cites an accepted result.

- [x] Define command inputs.
- [x] Define terminal outcomes.
- [x] Define frame and retirement receipts.
- [ ] Implement and validate.

## Command map

```txt
PointerLockAdmissionCommand
  DocumentGeneration
  RuntimeGeneration
  RouteRevision
  SurfaceId
  SurfaceGeneration
  UserGestureId
  PointerLockPolicyRevision
  expected prior PointerLockGeneration
```

## Result map

```txt
PointerLockAdmissionResult
  accepted
    -> PointerLockGeneration
    -> accepted owner element
    -> MouseLookReadinessRevision

  denied
    -> browser rejection evidence
    -> retry/fallback descriptor

  unsupported
    -> capability evidence
    -> required fallback descriptor

  interrupted
    -> competing owner or lifecycle evidence
    -> retry/fallback descriptor

  stale
    -> rejected callback generation

  retired
    -> route/runtime no longer eligible
```

## Follow-up results

```txt
FirstPointerLockFrameAck
  -> PointerLockGeneration
  -> LookInputRevision
  -> CameraFrameRevision
  -> VisibleFrameRevision

PointerLockRetirementReceipt
  -> released owner
  -> cleared input revision
  -> rejected late callbacks
```

## Invariants

```txt
one gesture creates at most one admission result
input readiness does not imply mouse-look readiness
failed capture produces visible retry or fallback state
late callbacks cannot reactivate a retired generation
camera frames never claim pointer-lock provenance without accepted ownership
```
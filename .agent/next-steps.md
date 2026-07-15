# HorrorCorridor Next Steps

**Updated:** `2026-07-15T11-39-04-04-00`

## Summary

The next implementation should separate minimap surface admission from minimap content drawing. Logical size and DPR must become one explicit integer backing-store descriptor before any canvas dimension comparison or write occurs.

## Plan ledger

**Goal:** implement one stable minimap surface lifecycle with deterministic quantization, context generations, immutable frame plans and browser parity proof.

- [ ] Define `MinimapSurfaceId`, `ViewportRevision`, `DprPolicyRevision` and `ContextGeneration`.
- [ ] Define immutable logical and physical surface descriptors.
- [ ] Choose and freeze an integer pixel quantization policy.
- [ ] Normalize and optionally clamp effective DPR before quantization.
- [ ] Move dimension comparison and writes out of the draw executor.
- [ ] Cache the active canvas and 2D context for one surface generation.
- [ ] Resize only when the accepted integer descriptor changes.
- [ ] Restore the logical transform only after an admitted resize or context replacement.
- [ ] Bind snapshot, local-pose and heading revisions into `MinimapFramePlan`.
- [ ] Publish `MinimapSurfaceResult` with dimension-write and context-generation receipts.
- [ ] Publish `MinimapFrameResult` with source revisions and draw receipts.
- [ ] Reject stale frame work after route, canvas or surface replacement.
- [ ] Publish `FirstMinimapResizeFrameAck` for the matching visible frame.
- [ ] Add dimension-write and context-generation counters to diagnostics.
- [ ] Add a fractional-DPR browser fixture matrix.
- [ ] Add browser zoom, remount and canvas replacement rows.
- [ ] Prove source, production-build and deployed-origin parity.

## Checkpoints

```txt
Checkpoint A
  physical dimensions are integers before comparison

Checkpoint B
  unchanged frames write neither width nor height

Checkpoint C
  one accepted descriptor change creates at most one context generation

Checkpoint D
  the draw executor never reads raw DPR or assigns canvas dimensions

Checkpoint E
  each frame result references the accepted descriptor fingerprint

Checkpoint F
  route or canvas retirement rejects later frame work

Checkpoint G
  source, production build and deployed origin produce matching receipts
```

## Retained work

Previous audio, lifecycle, loading, protocol, movement, device-control, render and deployment findings remain open. This minimap task must not silently absorb or replace those authorities.

## Do not claim

Do not claim stable DPR behavior, allocation reduction, context preservation, visible equivalence or production parity until the fixture matrix passes.
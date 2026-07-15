# HorrorCorridor Fractional-DPR Canvas Reset Gap

**Timestamp:** `2026-07-15T11-39-04-04-00`

## Summary

The minimap uses a fixed logical size of 168 pixels and recalculates its physical backing-store size from the raw browser DPR on every draw. The comparison mixes integer canvas properties with floating-point products, so effective DPR values that produce non-integral dimensions can keep the resize condition true across unchanged frames.

## Plan ledger

**Goal:** make minimap resize behavior deterministic, revision-bound and observable without changing minimap content or gameplay state.

- [x] Trace minimap invocation from the main render frame.
- [x] Trace canvas acquisition, size comparison and transform setup.
- [x] Separate source-permitted behavior from measured runtime behavior.
- [x] Define the missing render-surface result and acknowledgement.
- [ ] Prove the behavior with controlled browser fixtures.

## Active render order

```txt
update camera
  -> update Three.js world
  -> locate minimap canvas
  -> draw minimap
      -> get 2D context
      -> read DPR
      -> compute floating physical dimensions
      -> conditionally assign width and height
      -> set logical transform
      -> clear and redraw content
  -> capture debug frame
  -> render post-processing composer
```

## Source-permitted mismatch

```txt
canvas.width and canvas.height are integer backing-store properties
scaledWidth and scaledHeight are floating-point expressions
comparison uses strict inequality
assignment performs implicit integer conversion
next frame recomputes the original floating-point expression
```

When the floating product is not exactly integral, the stored integer may remain unequal to the next floating product. Both dimensions can therefore be assigned again even though CSS size and effective DPR did not change.

## Consequences that remain possible

```txt
repeated backing-store allocation
repeated context-state reset
repeated bitmap clear before the explicit clear
unstable ContextGeneration identity
extra per-frame CPU and memory work
loss of any future cached context state
lack of an auditable resize count
```

These are permitted by the source path. No browser trace was run, so this audit does not claim a measured performance regression or visible flicker.

## Required render contract

```txt
MinimapBackingStoreDescriptor
  logicalWidth
  logicalHeight
  effectiveDpr
  physicalWidthInteger
  physicalHeightInteger
  viewportRevision
  dprPolicyRevision
  descriptorFingerprint

MinimapSurfaceResult
  changed
  dimensionWrites
  contextGeneration
  previousDescriptor
  acceptedDescriptor
  rejectReason

MinimapFrameResult
  surfaceDescriptorFingerprint
  snapshotRevision
  localPoseRevision
  drawReceipt
  visibleCandidateId
```

## Acceptance rules

```txt
unchanged integer descriptor
  -> no width write
  -> no height write
  -> same ContextGeneration

changed integer descriptor
  -> write width and height once
  -> create next ContextGeneration
  -> restore logical transform
  -> draw one matching frame
  -> publish FirstMinimapResizeFrameAck

stale surface or frame
  -> reject
  -> do not mutate the accepted canvas
```

## Fixture gate

```txt
DPR: 0.90, 1.00, 1.10, 1.25, 1.333333, 1.50, 1.75, 2.00, 2.625
zoom transition without route change
route remount
canvas replacement
null snapshot
active snapshot
source dev server
production build
published origin
```

## Validation boundary

Documentation only. No render code or visual output changed.
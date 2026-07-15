# HorrorCorridor Known Gaps

**Updated:** `2026-07-15T11-39-04-04-00`

## Summary

The highest current undocumented product gap is minimap backing-store ownership. Minimap content is complete, but raw DPR observation, floating-point sizing, integer coercion, context generation, resize admission and visible-frame proof are not represented as one authority.

## Plan ledger

**Goal:** prioritize a stable minimap surface contract while retaining every previous lifecycle, loading, session, transport, protocol, movement, interaction, device-control, audio, rendering and proof finding.

- [x] Preserve previous audits.
- [x] Add and route the minimap backing-store gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. MinimapSurfaceId and mount generation
2. logical minimap size descriptor
3. browser DPR capability snapshot
4. DprPolicyRevision
5. explicit integer physical-pixel quantization
6. accepted backing-store descriptor
7. descriptor fingerprint
8. changed/unchanged resize admission
9. width and height write receipts
10. Canvas2D ContextGeneration
11. cached canvas and context ownership
12. logical-transform restoration policy
13. immutable MinimapFramePlan
14. SnapshotRevision binding
15. LocalPoseRevision and HeadingRevision binding
16. MinimapSurfaceResult
17. MinimapFrameResult
18. stale frame rejection
19. surface retirement receipt
20. FirstMinimapResizeFrameAck
21. dimension-write diagnostics
22. context-generation diagnostics
23. fractional-DPR fixture matrix
24. zoom, remount and replacement fixtures
25. source/build/deployed-origin parity
26. retained audio, lifecycle, transport and device-control gaps
```

## Current coverage gap

```txt
explicit integer quantization: no
accepted physical descriptor: no
surface revision: no
context generation: no
unchanged-frame write receipt: no
frame/source revision tuple: no
retirement result: no
visible frame acknowledgement: no
fractional-DPR fixture: no
```

## Failure path

```txt
unchanged frame
  -> read raw DPR
  -> compute 168 * DPR as floating point
  -> compare against integer canvas properties
  -> implicit integer conversion occurs on assignment
  -> next frame can observe the same mismatch
  -> backing store and context state can reset again
  -> no typed result records the lifecycle mutation
```

## Required invariants

```txt
physical dimensions are positive integers before comparison
unchanged descriptors produce zero dimension writes
one descriptor change produces at most one context generation
frame results bind the accepted descriptor and source revisions
retired surfaces execute no late frames
```

## Retained gaps

All previous page-lifecycle, settings, device-control, proof provenance, loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, movement, prediction, snapshot, interaction, terminal outcome, debug, audio and deployment findings remain open.

## Do not claim

Do not claim a runtime fix, stable backing store, lower allocations, preserved context, visual equivalence, browser parity or production readiness until implementation and fixtures pass on `main`.
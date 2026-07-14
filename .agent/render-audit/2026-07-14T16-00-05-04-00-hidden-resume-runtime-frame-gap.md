# Hidden Resume Runtime Frame Gap

**Timestamp:** `2026-07-14T16-00-05-04-00`

## Summary

The Three.js world, composer, minimap and debug capture resume implicitly after browser throttling or BFCache restore. No application result proves that the resumed renderer, viewport, snapshot, pose and transport generation agree on the first visible frame.

## Plan ledger

**Goal:** require one resumed presentation candidate and one frame receipt before the page is treated as visibly current.

- [x] Inspect RAF, renderer, world, composer, minimap and debug ownership.
- [x] Identify hidden/resume timing and identity gaps.
- [ ] Add renderer revalidation and first-frame fixtures.

## Current path

```txt
RAF running
  -> page becomes hidden/frozen
  -> browser may throttle or suspend callbacks
  -> loop remains logically running
  -> renderer/world/composer remain allocated
  -> page resumes
  -> next callback uses predecessor loop identity
  -> world, minimap and debug render immediately
```

## Gaps

```txt
no DocumentGeneration
no RuntimeGeneration
no render clock checkpoint policy
no viewport revalidation result
no WebGL/context/resource probe bound to resume
no stale frame rejection
no duplicate RAF generation proof
no resumed snapshot/frame correlation
no FirstResumedRuntimeFrameAck
```

## Required evidence

```txt
ResumePresentationCandidate
  documentGeneration
  runtimeGeneration
  rendererGeneration
  worldGeneration
  viewportRevision
  snapshotTick
  localPoseRevision
  transportGeneration

FirstResumedRuntimeFrameAck
  accepted candidate identity
  submission time
  visible canvas dimensions
  snapshot tick rendered
  minimap revision
  debug frame identity
```

## Validation boundary

No renderer revalidation, resumed-frame correlation, BFCache presentation safety or deployed-browser proof is claimed.
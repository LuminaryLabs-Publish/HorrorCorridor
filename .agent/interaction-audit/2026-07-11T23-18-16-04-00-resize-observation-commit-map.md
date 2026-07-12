# HorrorCorridor Resize Observation and Commit Map

**Timestamp:** `2026-07-11T23-18-16-04-00`

## Plan ledger

**Goal:** make resize inputs explicit, ordered and attributable before they mutate visible resources.

- [x] ResizeObserver ingress traced.
- [x] window resize ingress traced.
- [x] main and minimap device-scale reads traced.
- [x] missing admission and result contracts defined.
- [ ] Runtime implementation remains future work.

## Current ingress

```txt
ResizeObserver callback
  -> resizeRenderer(renderer, camera, mount, postProcessing)

window resize callback
  -> resizeRenderer(renderer, camera, mount, postProcessing)

minimap frame
  -> read window.devicePixelRatio independently
  -> mutate canvas size when needed
```

There is no event identity, ordering, coalescing or stale-observation rejection. One browser layout change can produce multiple direct mutation calls, and the minimap can sample a different DPR moment than the main surface.

## Required command envelope

```txt
ResizeSurfaceCommand
  commandId
  runtimeSessionId
  runtimeGeneration
  mountId
  observationId
  source: startup | resize-observer | window-resize | dpr-change | recovery
  observedCssWidth
  observedCssHeight
  observedDeviceScale
  observedAtMs
  priorSurfaceRevision
```

## Required admission result

```txt
accepted
coalesced
no-change
zero-area
stale-generation
stale-observation
invalid-size
capability-fallback
failed
```

## Required commit map

```txt
admitted observation
  -> named quality/pixel policy
  -> one resize plan
  -> renderer adapter result
  -> composer/bloom adapter result
  -> camera adapter result
  -> minimap adapter result
  -> aggregate surface commit
  -> surface revision publication
  -> next visible frame acknowledgement
```

## Interaction guarantee

Input and UI systems may continue to operate only under the lifecycle policy attached to the current surface result. A silent resize no-op cannot be treated as a committed current surface.

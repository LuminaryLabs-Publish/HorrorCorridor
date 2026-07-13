# WebGL Context Generation and Resource Adoption Contract

**Timestamp:** `2026-07-13T11-58-45-04-00`

## Summary

The renderer, composer and world currently share implicit component-lifetime ownership. This contract introduces explicit context and resource generations so a restored browser context cannot silently reuse, replace or partially rebuild the active presentation graph.

## Plan ledger

**Goal:** guarantee that one accepted resource generation owns every submitted frame and that failed or stale recovery work cannot mutate the active graph.

- [x] Identify current resource owners.
- [x] Define lifecycle states and generations.
- [x] Define preparation, probe, adoption and disposal rules.
- [ ] Implement immutable resource manifests.
- [ ] Implement atomic successor adoption.
- [ ] Add repeated-loss and disposal fixtures.

## Lifecycle state

```txt
Uninitialized
Ready(contextGeneration, resourceGeneration)
Lost(contextGeneration)
Restoring(predecessorContextGeneration, candidateResourceGeneration)
Failed(contextGeneration, failureReason)
Disposed(surfaceGeneration)
```

## Resource manifest

```txt
RendererResourceManifest
  renderer identity
  canvas identity
  context attributes
  capability fingerprint
  output color space
  tone mapping and exposure
  pixel ratio and drawing-buffer size

PostProcessingResourceManifest
  composer identity
  render pass identity
  bloom pass identity
  output pass identity
  render-target dimensions

WorldGpuResourceManifest
  scene identity
  mesh/material/texture counts
  actor and maze resource ownership
  disposal generation
```

## Preparation rule

A recovery candidate must be complete and detached from the accepted generation. Preparing a renderer without its composer, render targets or world resources is not an adoptable result.

## Probe rule

```txt
candidate prepared
  -> apply committed viewport revision
  -> update one deterministic camera/world projection
  -> submit one probe draw
  -> check synchronous errors and context state
  -> classify ProbeAccepted or ProbeFailed
```

The probe is evidence for candidate viability, not final visible proof.

## Adoption rule

```txt
all manifests valid
and probe accepted
and predecessor loss generation still current
and surface not disposed
  -> atomically install candidate generation
  -> start one successor frame-loop generation
  -> retain predecessor only until first recovered frame acknowledgement
  -> dispose predecessor resources
```

## Rejection rule

```txt
stale generation
incomplete manifest
capability mismatch
probe failure
newer loss
unmount/disposal
  -> publish terminal rejection
  -> dispose candidate resources
  -> preserve Lost, Restoring or Failed state
  -> do not set rendering readiness true
```

## Readiness rule

```txt
renderer/composer constructed: insufficient
probe accepted: insufficient
candidate adopted: insufficient
FirstRecoveredFrameAck: rendering readiness may become true
```

## Frame submission rule

Every render submission must carry:

```txt
surfaceId
contextGeneration
resourceGeneration
frameLoopGeneration
viewportRevision
snapshotTick
```

Submissions with stale or non-Ready generations are rejected before world or composer mutation.

## Disposal rule

Cleanup owns exactly one accepted resource generation plus at most one recovery candidate. Disposal must be idempotent, stop all frame-loop generations, remove context listeners, dispose candidate and accepted resources, and publish a terminal `Disposed` result.

## Diagnostics

Expose detached readback only:

```txt
lifecycle state
active context/resource generations
recovery attempt ID
last loss reason/time
last preparation/probe/commit results
fallback state
first recovered frame receipt
```

## Claims withheld

No claim is made that the current runtime owns these generations or adoption guarantees.
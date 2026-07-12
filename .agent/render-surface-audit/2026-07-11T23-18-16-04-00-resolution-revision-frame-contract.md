# HorrorCorridor Resolution, Revision and Frame Contract

**Timestamp:** `2026-07-11T23-18-16-04-00`

## Plan ledger

**Goal:** define the authoritative product contract for surface quality, resizing, readback and visible-frame correlation.

- [x] Current scale policies captured.
- [x] Current mutation services separated from future authority services.
- [x] Required identities and result fields defined.
- [x] Required lifecycle and frame invariants defined.
- [ ] Implementation and browser proof remain future work.

## Product policy descriptor

```txt
RenderSurfacePolicy
  policyId
  qualityTier
  minimumPixelRatio
  maximumPixelRatio
  maximumPhysicalPixels
  zeroAreaPolicy
  resizeCoalescingWindowMs
  minimapScalePolicy
  capabilityFallbackOrder
```

## Surface identity

```txt
RenderSurfaceIdentity
  runtimeSessionId
  runtimeGeneration
  mountId
  surfaceId
  surfaceRevision
```

## Commit result

```txt
RenderSurfaceCommitResult
  status
  identity
  sourceObservationId
  cssWidth
  cssHeight
  observedDeviceScale
  acceptedPixelRatio
  requestedPhysicalWidth
  requestedPhysicalHeight
  actualDrawingBufferWidth
  actualDrawingBufferHeight
  actualComposerWidth
  actualComposerHeight
  bloomWidth
  bloomHeight
  cameraAspect
  minimapPhysicalWidth
  minimapPhysicalHeight
  fallbackReason
  committedAtMs
```

## Invariants

```txt
surface revisions are monotonic within one runtime generation
only the active generation may commit a surface
all adapter results must agree before aggregate commit
zero-area is a typed result, never a silent return
main canvas and minimap scale through named policies
rendering readiness requires one valid committed surface
visible frames cite surface revision
captures and debug frames cite the same revision
stale observer callbacks cannot replace a newer surface
no-change observations do not create false revisions
```

## Frame receipt extension

```txt
frameId
snapshotTick
runtimeGeneration
surfaceId
surfaceRevision
actualDrawingBufferWidth
actualDrawingBufferHeight
cameraAspect
minimapSurfaceRevision
submittedAtMs
presentedAtMs or presentation status
```

## Ownership

The authority domain owns policy, identity, admission, revision and aggregate results. Existing Three.js and canvas code remains the implementation adapter for renderer, composer, camera and minimap mutations.

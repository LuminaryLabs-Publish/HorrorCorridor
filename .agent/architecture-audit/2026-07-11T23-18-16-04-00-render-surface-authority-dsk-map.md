# HorrorCorridor Render Surface Authority DSK Map

**Timestamp:** `2026-07-11T23-18-16-04-00`

## Plan ledger

**Goal:** place surface policy and transaction ownership above existing Three.js, camera, post-processing and minimap adapters without duplicating their rendering services.

- [x] Existing render services identified.
- [x] Mutation boundaries identified.
- [x] Missing identities, results and observations identified.
- [x] Parent domain and candidate kits defined.
- [ ] Runtime composition remains future work.

## Current composition

```txt
GameCanvas
  -> sample mount.clientWidth/clientHeight
  -> sample window.devicePixelRatio
  -> renderer.setPixelRatio
  -> renderer.setSize
  -> camera.aspect/updateProjectionMatrix
  -> composer.setPixelRatio/setSize
  -> bloom resolution mutation

Minimap
  -> sample window.devicePixelRatio again
  -> resize 2D canvas independently
```

## Existing implementation domains

```txt
corridor-render-world-kit
corridor-post-processing-kit
corridor-minimap-kit
corridor-animation-loop-kit
runtime-debug-frame-kit
runtime-resource-cleanup-kit
```

These remain adapters and consumers. They should not independently decide product scale policy or publish readiness.

## Missing parent domain

```txt
corridor-render-surface-authority-domain
```

### Policy and command

```txt
render-surface-policy-kit
render-surface-command-kit
render-surface-admission-kit
pixel-budget-kit
surface-capability-result-kit
```

### Identity and observation

```txt
render-surface-id-kit
render-surface-revision-kit
container-size-observation-kit
device-scale-observation-kit
resize-source-observation-kit
```

### Planning and commit

```txt
surface-resize-plan-kit
surface-resize-coalescing-kit
renderer-size-commit-kit
post-processing-size-commit-kit
camera-projection-commit-kit
minimap-surface-adapter-kit
surface-commit-result-kit
```

### Proof and diagnostics

```txt
surface-frame-correlation-kit
surface-debug-projection-kit
surface-journal-kit
zero-area-surface-fixture-kit
dpr-parity-fixture-kit
resize-storm-fixture-kit
```

## Required service boundaries

```txt
policy owns:
  quality tier
  DPR cap/floor
  max physical pixels
  zero-area behavior
  resize coalescing
  fallback order

adapters own:
  renderer API calls
  composer/pass API calls
  camera projection update
  minimap canvas resize

commit result owns:
  requested CSS size
  observed device scale
  accepted pixel ratio
  requested physical size
  actual drawing-buffer size
  actual post target size
  camera aspect
  minimap surface result
  surface revision
  failures and fallbacks
```

## Dependency rule

No RAF frame, capture, minimap frame, debug frame or readiness projection may claim the current render surface without citing an accepted surface revision from the active runtime generation.

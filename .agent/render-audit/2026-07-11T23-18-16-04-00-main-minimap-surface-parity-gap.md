# HorrorCorridor Main and Minimap Surface Parity Gap

**Timestamp:** `2026-07-11T23-18-16-04-00`

## Plan ledger

**Goal:** document the visual and evidence gap created by independent main-canvas and minimap scaling policies.

- [x] Main renderer scaling traced.
- [x] post-processing scaling traced.
- [x] minimap scaling traced.
- [x] frame readback inspected.
- [ ] Browser parity fixtures remain future work.

## Current main surface

```txt
MAX_PIXEL_RATIO = 1
pixelRatio = min(window.devicePixelRatio, 1)
renderer.setPixelRatio(pixelRatio)
renderer.setSize(mount.clientWidth, mount.clientHeight, false)
camera.aspect = width / height
composer.setPixelRatio(pixelRatio)
composer.setSize(width, height)
bloom resolution = width * pixelRatio, height * pixelRatio
```

## Current minimap surface

```txt
dpr = window.devicePixelRatio
canvas.width = 168 * dpr
canvas.height = 168 * dpr
context transform = dpr
```

## Gap

The main surface and minimap use different scale policies without an explicit product contract. The main view is capped at 1 DPR while the minimap consumes full browser DPR. Neither result has a surface ID or revision, and no visible-frame receipt records their accepted sizes.

`resizeRenderer()` silently returns when the mount has zero width or height. Rendering readiness and the RAF can remain active, while the previous physical buffers and camera aspect remain the latest committed values.

## Missing evidence

```txt
requested CSS width/height
observed browser DPR
accepted product DPR
physical pixel budget
actual WebGL drawing-buffer size
actual composer target size
actual bloom resolution
camera aspect revision
minimap physical size
surface fallback reason
surface revision on frame/debug/capture
```

## Required invariant

```txt
one browser observation
  -> one admitted surface policy
  -> one renderer/composer/camera/minimap commit result
  -> one monotonic surface revision
  -> every visible frame cites that revision
```

## Validation boundary

No claim is made that current output is visually incorrect at every size. The proven gap is absence of a shared policy, transactional result and frame-correlated readback.

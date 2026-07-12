# Pre-First-Frame Readiness and Rollback Gap

**Timestamp:** `2026-07-11T21-21-12-04-00`

## Finding

`GameShell` sets `rendering: true` when it stores the bootstrap snapshot and routes to `PLAYING`. React mounts `GameCanvas` later. The renderer, composer, world, canvas attachment, resize and RAF do not yet exist when the readiness claim is made.

`GameCanvas` writes readiness again after attaching resources but still before `loop.start()` has produced a frame. No visible-frame acknowledgement backs either claim.

## Failure sequence

```txt
readiness.rendering = true
  -> GameCanvas mounts
  -> renderer acquired
  -> post/world/attach/resize/listener step throws
  -> no committed frame
  -> no rollback result
  -> readiness may remain true
```

## Render resources at risk

```txt
WebGLRenderer and context
renderer canvas
EffectComposer and render targets
RenderPass, bloom and output passes
scene/world geometries, materials, textures and lights
ResizeObserver
window and document listeners
animation-frame lease
```

## Required render commit

```txt
renderer created
post-processing created
world attached
canvas attached
initial resize accepted
RAF generation admitted
world update completed
minimap projection completed
post-processing render completed
frame ID committed
matching readiness revision published
```

## Required result

```txt
startup-render-result
  accepted-ready
  failed-renderer-create
  failed-post-create
  failed-world-create
  failed-attach
  failed-resize
  failed-first-frame
  rejected-stale-generation
  rolled-back
  rollback-incomplete
```

## Proof surface

Debug/readback should expose startup transaction ID, runtime generation, phase, live lease counts, first frame ID, snapshot revision, readiness revision, rollback receipts and unresolved resources.

No rendering source or visual output changed in this audit.

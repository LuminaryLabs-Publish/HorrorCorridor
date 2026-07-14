# HorrorCorridor Render Audit: Loading to First Visible Frame Gap

**Timestamp:** `2026-07-13T23-38-39-04-00`

## Finding

The loading UI can mark `PBR materials` and `Lighting pass` done before a renderer, scene, post-processing chain or maze world exists. `GameShell` then sets rendering ready and enters `PLAYING`; only afterward does React mount `GameCanvas` and attempt visual construction.

## Current order

```txt
timed loading rows complete
  -> create initial state
  -> set authoritative snapshot
  -> set screen PLAYING
  -> set rendering ready
  -> GameCanvas mounts
  -> createRenderer
  -> createScene
  -> createPostProcessing
  -> buildMazeWorld
  -> attach canvas
  -> start animation loop
  -> no first-frame acknowledgement
```

## Risk

A renderer creation, world construction, context, resize, composer or first-render failure can leave the product in `PLAYING` with `rendering: true`. The loading screen has already disappeared and provides no failure, retry or degraded path.

## Required render evidence

```txt
RenderProviderPrepareResult
ScenePrepareResult
PostProcessingPrepareResult
WorldResourcePrepareResult
CanvasAttachResult
ResizeResult
AnimationLoopAdmissionResult
FirstRenderSubmission
FirstVisibleFrameAck
RenderReadinessEvidence
```

## Acceptance rule

`rendering: true` and the transition to `PLAYING` must cite one admitted provider generation and one matching visible frame. A timer or React mount request is not sufficient evidence.

## Fixture boundary

Test renderer creation failure, zero-sized mount, world build failure, context loss before first frame, route replacement, first-frame timeout and successful visible-frame acknowledgement on source, production build and deployed origin.
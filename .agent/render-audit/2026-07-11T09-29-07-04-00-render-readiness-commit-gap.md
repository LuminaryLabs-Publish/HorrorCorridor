# Render Readiness Commit Gap

**Timestamp:** `2026-07-11T09-29-07-04-00`

## Finding

`GameShell` sets `rendering: true` before `GameCanvas` has created a renderer, scene, post-processing chain, world, canvas attachment or RAF. A received SYNC also sets rendering ready without proving that the visual provider mounted successfully.

## Current sequence

```txt
startPlay or enterSoloRun
  -> set authoritative snapshot
  -> set screen PLAYING
  -> set readiness.rendering = true
  -> React mounts GameCanvas later
  -> createRenderer
  -> createScene
  -> createPostProcessing
  -> buildMazeWorld
  -> attach canvas and world
  -> start RAF
```

## Failure implication

If any render initialization step throws or a mount is replaced, the store can retain `rendering: true` without a committed visible frame. The current readiness shape cannot report partial setup, failure, rollback or which runtime generation produced the claim.

## Required render proof

```txt
renderer created
scene created
camera created
post-processing created
world attached
canvas attached
resize completed
RAF accepted
first frame submitted
matching session and runtime generation
```

## Required result

```txt
render-readiness-result
  accepted-ready
  rejected-stale-generation
  failed-renderer-create
  failed-world-attach
  failed-first-frame
  revoked
  no-change
```

## Projection requirement

Debug and host readback should expose:

```txt
runtimeGeneration
renderProviderId
renderReadinessRevision
proofId
firstCommittedFrameId
failureReason
```

No rendering source or visual output changed in this pass.
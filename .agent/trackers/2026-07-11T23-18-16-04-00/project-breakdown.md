# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-11T23-18-16-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`

## Plan ledger

**Goal:** define one authoritative render-surface transaction that converts container size, device scale and performance policy into a committed renderer, post-processing, camera and minimap surface revision that every visible frame can cite.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and retain root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible central entry.
- [x] Trace browser startup, resize observation, renderer sizing, post-processing sizing, camera projection, minimap scaling and debug-frame readback.
- [x] Identify the interaction loop, domains, implemented kits and kit services.
- [x] Identify the main-canvas and minimap pixel-ratio policy split.
- [x] Define render-surface admission, revision, commit, observation and fixture contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh the required root `.agent` documents and kit registry.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-11T21-21-12-04-00 selected
PhantomCommand     2026-07-11T21-31-19-04-00
ZombieOrchard      2026-07-11T21-40-49-04-00
TheUnmappedHouse   2026-07-11T21-48-44-04-00
AetherVale         2026-07-11T22-02-01-04-00
IntoTheMeadow      2026-07-11T22-08-13-04-00
MyCozyIsland       2026-07-11T22-20-00-04-00
PrehistoricRush    2026-07-11T22-38-54-04-00
TheOpenAbove       2026-07-11T22-58-50-04-00
TheCavalryOfRome   excluded
```

## Product interaction loop

```txt
mode selection and lobby
  -> snapshot bootstrap
  -> GameCanvas startup
  -> renderer, scene, camera, post-processing and world acquisition
  -> mount size and device pixel ratio sampled
  -> renderer, composer, bloom and camera mutated
  -> RAF simulation and render
  -> minimap independently sizes itself from uncapped device pixel ratio
  -> world, minimap, HUD and debug projection
```

## Main finding

The main 3D surface and minimap do not share one admitted surface policy.

```txt
main canvas:
  pixelRatio = min(window.devicePixelRatio, 1)
  size = mount.clientWidth x mount.clientHeight

minimap:
  pixelRatio = window.devicePixelRatio
  size = 168 x 168 CSS pixels
```

`resizeRenderer()` mutates the WebGL renderer, camera, EffectComposer and bloom target directly. A `ResizeObserver` and a window `resize` listener can both call it. Zero width or height silently returns. There is no surface identity, resize revision, source-event identity, coalescing policy, requested/actual drawing-buffer result, pixel budget, capability fallback, commit receipt or frame correlation.

The RAF and debug records continue without recording which surface configuration produced the frame. Rendering readiness can remain true when a resize was skipped because the mount had zero area.

## Domains in use

```txt
application shell and screen routing
session, lobby, transport and protocol
snapshot bootstrap, acceptance and publication
input, pointer lock, movement, collision and camera
interaction, cube ownership, anomaly progression and ooze pressure
runtime startup, readiness, lifecycle and cleanup
Three.js renderer, scene, world and post-processing
container observation, render-surface sizing and camera projection
minimap 2D canvas sizing and projection
HUD, completion and debug readback
validation, build and Pages deployment
```

## Implemented kits and offered services

The repository retains 29 source-backed kit responsibilities. Their services cover routing, session state, snapshots, UI projection, PeerJS and BroadcastChannel transport, protocol construction, deterministic maze bootstrap, input, movement, network updates, interactions, anomaly evaluation, ooze, authoritative publication, RAF lifecycle, Three.js world construction, post-processing, minimap rendering, bounded debug readback, cleanup and package validation.

The directly relevant implemented kits are:

```txt
corridor-render-world-kit       scene resources, update, attach and dispose
corridor-post-processing-kit    composer, bloom, output, resize, render and dispose
corridor-minimap-kit            2D map sizing and entity projection
corridor-animation-loop-kit     RAF delta and lifecycle
runtime-debug-frame-kit         bounded frame/event readback
runtime-resource-cleanup-kit    observer/listener/GPU cleanup
```

## Required parent domain

```txt
corridor-render-surface-authority-domain
```

Candidate kits:

```txt
render-surface-policy-kit
render-surface-command-kit
render-surface-admission-kit
render-surface-id-kit
render-surface-revision-kit
container-size-observation-kit
device-scale-observation-kit
pixel-budget-kit
surface-capability-result-kit
surface-resize-plan-kit
surface-resize-coalescing-kit
renderer-size-commit-kit
post-processing-size-commit-kit
camera-projection-commit-kit
minimap-surface-adapter-kit
surface-commit-result-kit
surface-frame-correlation-kit
surface-debug-projection-kit
surface-journal-kit
zero-area-surface-fixture-kit
dpr-parity-fixture-kit
resize-storm-fixture-kit
```

## Required transaction

```txt
ResizeObservation
  -> validate runtime generation and mount identity
  -> sample CSS size and device scale once
  -> apply named product pixel budget and capability fallback
  -> create one surface plan and revision
  -> resize renderer, post-processing and camera under that plan
  -> adapt minimap through an explicit policy
  -> read back actual drawing-buffer and target sizes
  -> commit one SurfaceResult
  -> require subsequent visible frames and captures to cite that revision
```

## Validation boundary

```txt
runtime source changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
browser resize fixtures: unavailable
DPR parity fixture: unavailable
zero-area fixture: unavailable
surface/frame correlation fixture: unavailable
```

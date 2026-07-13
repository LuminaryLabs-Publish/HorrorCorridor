# WebGL Context and Resource Recovery DSK Map

**Timestamp:** `2026-07-13T11-58-45-04-00`

## Summary

Three.js rendering, post-processing and world resources are valid bounded participants. The missing layer is a coordinating domain that owns context generations, submission admission, recovery candidates, resource manifests and terminal recovery results.

## Plan ledger

**Goal:** keep renderer, post-processing, world, runtime and UI ownership separate while composing one recoverable presentation transaction.

- [x] Identify current renderer and composer ownership.
- [x] Identify the RAF scheduling boundary.
- [x] Identify readiness and cleanup projections.
- [x] Define the parent authority and child kits.
- [ ] Implement the parent domain without moving gameplay or network truth into rendering.
- [ ] Prove loss, restoration, repeated loss and failed restoration.

## Current composition

```txt
GameCanvas
  -> createRenderer
  -> createScene and createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> append canvas
  -> mark rendering ready
  -> createAnimationLoop
  -> postProcessing.render each frame
```

## Missing boundary

```txt
browser WebGL context event
  -> no application lifecycle command
  -> no context/resource generation
  -> no submission lease
  -> no rebuild manifest
  -> no recovery result
  -> no visible recovered-frame proof
```

## Parent domain

```txt
corridor-webgl-context-resource-recovery-authority-domain
```

## Child kits

```txt
render-surface-identity-kit
  owns stable render-surface identity

webgl-context-event-adapter-kit
  converts browser context events into typed samples

webgl-context-generation-kit
  allocates and retires monotonic context generations

gpu-resource-generation-kit
  identifies renderer, composer, render-target and world-resource generations

webgl-lifecycle-state-kit
  owns Ready, Lost, Restoring, Failed and Disposed states

context-loss-command-kit
  validates loss against the active surface/context generation

context-loss-result-kit
  returns Accepted, Duplicate, Stale, Disposed or Failed

render-submission-lease-kit
  admits or rejects draw submission by generation and state

simulation-during-loss-policy-kit
  decides Pause, ContinueBounded or Stop for simulation/network work

rendering-readiness-projection-kit
  projects lifecycle state into runtime readiness

webgl-independent-fallback-kit
  presents recovering/failed state without the lost context

renderer-resource-manifest-kit
  describes renderer capabilities and owned GPU state

postprocessing-resource-manifest-kit
  describes composer, passes and render targets

world-gpu-resource-manifest-kit
  describes scene meshes, materials, textures and disposal ownership

recovery-candidate-kit
  prepares a complete successor resource generation off the active commit

recovery-capability-validation-kit
  validates dimensions, extensions, limits and required resources

recovery-probe-frame-kit
  submits and classifies one successor probe draw

recovered-generation-commit-kit
  atomically adopts the successor or preserves failed/recovering state

context-recovery-result-kit
  publishes Restored, Failed, Superseded, Cancelled or Disposed

first-recovered-frame-ack-kit
  binds accepted context/resource generations to the visible frame

webgl-context-recovery-fixture-kit
  drives deterministic loss/restoration/failure cases
```

## Transaction

```txt
ContextLostSample
  -> validate active surface/context generation
  -> prevent default when recovery policy permits
  -> retire render-submission lease
  -> project rendering not-ready
  -> apply simulation-during-loss policy
  -> show fallback
  -> publish ContextLossResult

ContextRestoredSample
  -> allocate successor context/resource generation
  -> prepare renderer/composer/world resource candidates
  -> validate capability and resource manifests
  -> submit probe frame
  -> adopt all recovered participants or none
  -> publish ContextRecoveryResult
  -> hide fallback after FirstRecoveredFrameAck
```

## Boundaries

```txt
session/runtime domains own gameplay truth
network domains own transport and replication
render-world owns scene projection
post-processing owns composer/passes
browser adapter owns raw context events
recovery authority owns cross-participant generation and result
UI owns fallback presentation from typed lifecycle state
```

## Non-goals

```txt
no gameplay redesign
no network protocol redesign
no renderer replacement
no claim that Three.js lacks internal context handling
no direct browser event mutation of gameplay state
```

## Proof gates

```txt
loss before first frame
loss during active solo frame
loss during host publication
loss during client replay
restore with same CSS size
restore after resize/DPR change
restore with resource preparation failure
repeated loss during restore
unmount during restore
first recovered frame correlation
```

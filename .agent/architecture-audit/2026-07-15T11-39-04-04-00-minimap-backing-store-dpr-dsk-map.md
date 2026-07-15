# HorrorCorridor Minimap Backing-Store DPR DSK Map

**Timestamp:** `2026-07-15T11-39-04-04-00`  
**Status:** `minimap-backing-store-dpr-resize-authority-audited`

## Summary

The implemented `corridor-minimap-kit` owns minimap content drawing but does not own a stable render-surface descriptor. Browser DPR, integer pixel quantization, resize admission, context generation, frame identity and visible acknowledgement remain implicit inside `drawMinimapFrame()`.

## Plan ledger

**Goal:** split minimap content projection from render-surface admission so the canvas backing store changes only when an accepted integer descriptor changes.

- [x] Preserve existing session, simulation, networking and render ownership.
- [x] Preserve the current `corridor-minimap-kit` content services.
- [x] Identify the missing surface and lifecycle services.
- [x] Define one parent authority and 18 bounded surfaces.
- [ ] Implement only after deterministic fixtures exist.

## Current DSK boundary

```txt
corridor-minimap-kit
  input
    canvas lookup
    authoritative snapshot or null
    local player id
    local position
    yaw

  implicit environment
    window.devicePixelRatio
    Canvas2D integer backing-store coercion
    current DOM element identity
    current 2D context identity

  output
    immediate Canvas2D pixels

  missing
    command identity
    surface identity
    viewport revision
    DPR policy revision
    explicit integer quantization
    accepted backing-store descriptor
    context generation
    frame plan
    typed result
    resize receipt
    visible-frame acknowledgement
    retirement receipt
```

## Required parent domain

```txt
corridor-minimap-backing-store-revision-authority-domain
```

## Domain composition

```txt
corridor-minimap-backing-store-revision-authority-domain
  -> minimap-surface-identity-kit
  -> minimap-logical-size-descriptor-kit
  -> browser-dpr-capability-snapshot-kit
  -> minimap-dpr-policy-revision-kit
  -> physical-pixel-quantization-kit
  -> minimap-backing-store-descriptor-kit
  -> minimap-resize-admission-kit
  -> canvas-context-generation-kit
  -> minimap-logical-transform-kit
  -> minimap-frame-plan-kit
  -> minimap-snapshot-revision-kit
  -> minimap-player-pose-revision-kit
  -> minimap-draw-execution-kit
  -> minimap-surface-result-kit
  -> minimap-frame-result-kit
  -> first-minimap-resize-frame-ack-kit
  -> minimap-surface-retirement-kit
  -> fractional-dpr-minimap-fixture-kit
```

## Service map

```txt
minimap-surface-identity-kit
  MinimapSurfaceId
  mount generation
  route ownership

minimap-logical-size-descriptor-kit
  logical width
  logical height
  CSS contract

browser-dpr-capability-snapshot-kit
  observed DPR
  support state
  capture timestamp

minimap-dpr-policy-revision-kit
  normalized DPR
  optional clamp
  policy revision

physical-pixel-quantization-kit
  deterministic integer conversion
  minimum size
  overflow guard

minimap-backing-store-descriptor-kit
  physical width
  physical height
  logical width
  logical height
  DPR revision
  descriptor fingerprint

minimap-resize-admission-kit
  changed/unchanged classification
  dimension writes
  resize result

canvas-context-generation-kit
  context acquisition
  ContextGeneration
  reset accounting

minimap-logical-transform-kit
  logical-coordinate transform
  transform restoration after resize

minimap-frame-plan-kit
  immutable draw order
  accepted descriptor
  snapshot and pose revisions

minimap-snapshot-revision-kit
  snapshot identity
  snapshot tick
  terminal/null classification

minimap-player-pose-revision-kit
  local position
  local yaw
  pose revision

minimap-draw-execution-kit
  maze cells
  ooze
  cubes
  remote players
  local heading

minimap-surface-result-kit
  descriptor adopted
  resize count
  context generation
  reject reason

minimap-frame-result-kit
  source revisions
  draw receipt
  visible candidate

first-minimap-resize-frame-ack-kit
  matching descriptor acknowledgement
  first visible frame proof

minimap-surface-retirement-kit
  unmount
  replacement
  late-frame rejection
  retirement receipt

fractional-dpr-minimap-fixture-kit
  DPR matrix
  zoom transitions
  dimension-write trace
  context-generation trace
  source/build/deployed parity
```

## Command/result boundary

```txt
MinimapSurfaceAdmissionCommand
  -> MinimapSurfaceResult

MinimapFrameCommand
  -> MinimapFrameResult

MinimapSurfaceRetirementCommand
  -> MinimapSurfaceRetirementReceipt

FirstMinimapResizeFrameCandidate
  -> FirstMinimapResizeFrameAck
```

## Ownership rule

The browser adapter may observe DOM and DPR state. The minimap authority must normalize that state into immutable descriptors. Gameplay and snapshot domains remain unaware of canvas dimensions and browser pixel density. The draw executor may render only an accepted frame plan.

## Validation boundary

No runtime DSK was implemented. The map defines the minimum architecture needed to prove stable backing-store ownership.
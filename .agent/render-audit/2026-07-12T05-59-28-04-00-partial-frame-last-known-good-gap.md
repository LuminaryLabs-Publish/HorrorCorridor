# HorrorCorridor Partial-Frame and Last-Known-Good Render Gap

**Timestamp:** `2026-07-12T05-59-28-04-00`

## Summary

The visible WebGL frame is the last stage of a larger mutable frame. Camera, world objects, minimap pixels and debug observations can advance before post-processing submits the main canvas. A later exception can therefore leave several surfaces and stores on different revisions.

## Plan ledger

**Goal:** require every visible surface to cite one committed frame identity and preserve the previous coherent frame when any mandatory render stage fails.

- [x] Trace camera synchronization.
- [x] Trace world updates.
- [x] Trace minimap projection.
- [x] Trace debug-frame recording.
- [x] Trace post-processing submission.
- [x] Identify partial-visible-state combinations.
- [x] Define last-known-good and render-freeze requirements.
- [ ] Implement and test the render contract.

## Current render order

```txt
sync camera from local pose
  -> world.update(snapshot, local pose, view)
  -> find minimap canvas by DOM id
  -> draw minimap frame
  -> optionally append debug frame
  -> postProcessing.render()
```

## Failure combinations

```txt
world update succeeds, minimap throws
  camera/world memory: current
  minimap: partial or prior
  main canvas: prior
  next RAF: absent

minimap succeeds, post-processing throws
  camera/world memory: current
  minimap: current
  debug frame: current when enabled
  main canvas: prior or partially submitted
  next RAF: absent

post-processing throws after internal GPU work
  renderer/composer state: uncertain
  visible canvas: not authoritatively acknowledged
  readiness: still true
```

## Missing render authority

```txt
frameId
source snapshot revision
world consumer receipt
minimap consumer receipt
debug consumer receipt
post-processing result
visible canvas acknowledgement
last-known-good frame ID
last-known-good surface set
partial-frame classification
render freeze policy
fatal overlay revision
```

## Required contract

```txt
mandatory consumers cite the same FramePlan
  -> camera receipt
  -> world receipt
  -> minimap receipt when leased
  -> post-processing receipt
  -> visible-frame acknowledgement

any mandatory failure
  -> do not publish current frame as visible
  -> retain previous committed frame identity
  -> freeze main canvas or replace with bounded failure surface
  -> mark minimap and debug observations as partial or predecessor
  -> revoke rendering readiness
```

## Required proof

```txt
no frame is called committed before post-processing success
minimap cannot claim a newer committed frame than the main canvas
partial debug records are labeled failed and excluded from normal replay
last-known-good frame survives world/minimap/post faults
resize and render faults are distinguishable
first replacement frame replaces the failure surface atomically
```
# HUD Projection Command and Result Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-15T16-39-06-04-00`

## Summary

The active HUD currently follows local component branching rather than an admitted command/result boundary. This map defines how route, accepted snapshot, local-player identity and surface policy should settle into a complete `PLAYING` HUD or a typed rejection.

## Plan ledger

**Goal:** make HUD projection deterministic, inspectable and safe across route transitions, remounts and minimap frame execution.

- [x] Identify command inputs and current consumers.
- [x] Define success, rejection and retirement results.
- [x] Define matching frame acknowledgement.
- [ ] Implement the command ledger and fixtures.

## Command

```txt
GameplayHudProjectionCommand
  commandId
  documentGeneration
  routeRevision
  screenRevision
  snapshotRevision
  localPlayerRevision
  hudPolicyRevision
  expectedMountGeneration
```

## Admission

```txt
screen is PLAYING
route and document generations are active
snapshot and local player are accepted
command is not stale or duplicate
expected predecessor mount is current
required surface policy is valid
```

## Preparation

```txt
derive GameplayHudReadModel
allocate or retain HudMountGeneration
resolve objective surface
resolve anomaly sequence surface
resolve held-item surface
resolve player-status surface
resolve minimap canvas surface
compose settings and debug overlays
```

## Result

```txt
GameplayHudProjectionResult
  commandId
  routeRevision
  screenRevision
  snapshotRevision
  HudMountGeneration
  requiredSurfaceIds
  mountedSurfaceIds
  minimapCanvasGeneration
  status: adopted | unchanged | rejected | stale | retired | failed
  reason
```

## Failure and rejection reasons

```txt
not-playing
missing-snapshot
missing-local-player
stale-route
stale-screen
stale-snapshot
superseded-mount
missing-required-surface
minimap-canvas-unavailable
retired-document
projection-failed
```

## Frame acknowledgement

```txt
FirstPlayingHudFrameAck
  HudMountGeneration
  routeRevision
  screenRevision
  snapshotRevision
  objectiveFrameReceipt
  sequenceFrameReceipt
  minimapFrameReceipt
  worldFrameReceipt
```

## Retirement

```txt
HudRouteRetirementCommand
  -> close current mount generation
  -> remove route-owned surface leases
  -> invalidate minimap canvas generation
  -> reject late projection and draw commands
  -> publish HudRouteRetirementReceipt
```

## Validation boundary

No runtime command surface exists yet. This is a documentation contract only.
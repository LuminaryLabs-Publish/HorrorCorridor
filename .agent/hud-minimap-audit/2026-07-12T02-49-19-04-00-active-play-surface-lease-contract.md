# HorrorCorridor Active-Play HUD and Minimap Surface Lease Contract

**Timestamp:** `2026-07-12T02-49-19-04-00`

## Goal

Replace per-frame global DOM discovery with explicit HUD and minimap surface ownership across active play, pause, completion, runtime replacement and teardown.

## Current ownership

```txt
React owns whether Minimap exists
GameCanvas owns when minimap drawing is attempted
canvas identity is a global string id
no owner publishes mount readiness
no lease binds the canvas to runtime or screen generation
no consumer result records missing or stale surfaces
```

## Required HUD surface lease

```txt
HudSurfaceLease
  leaseId
  sessionId
  runEpoch
  runtimeGeneration
  screenRevision
  mountRevision
  mountedAt
  permittedConsumers
  revokedAt
  revokeReason
```

## Required minimap surface lease

```txt
MinimapSurfaceLease
  leaseId
  hudLeaseId
  canvas reference or controlled handle
  logical width and height
  physical width and height
  DPR
  surfaceRevision
  screen eligibility
  mountedAt
  revokedAt
```

## Acquisition flow

```txt
HUD tree mounts active-play shell
  -> acquire HUD surface lease
  -> mount minimap canvas when policy requires it
  -> acquire minimap surface lease
  -> publish readiness to presentation consumer registry
  -> allow frame planner to require minimap acknowledgement
```

## Revocation flow

```txt
screen transition or runtime stop
  -> stop admitting new projections
  -> revoke minimap lease
  -> publish final consumer result
  -> revoke HUD lease
  -> reject stale frame plans
```

## Draw contract

```txt
DrawMinimapCommand
  frameId
  snapshotTick
  localPoseRevision
  minimapSurfaceLeaseId
  expectedSurfaceRevision
  projection payload

MinimapProjectionResult
  accepted | skipped | unavailable | stale | failed
  frameId
  leaseId
  surfaceRevision
  mazeCellsDrawn
  oozeMarksDrawn
  cubesDrawn
  remotePlayersDrawn
  headingDrawn
  reason
```

## Invariants

```txt
active-play required surface is mounted before rendering readiness
GameCanvas does not search the document by id each RAF
missing required canvas cannot return void silently
one lease belongs to one runtime generation and screen revision
revoked leases reject later frame plans
logical and physical size changes advance surfaceRevision
completed state cannot accidentally become the first valid minimap owner
```

## Migration path

```txt
1. Move active HUD shell and Minimap into the PLAYING composition.
2. Retain the canvas through an explicit ref callback.
3. Publish a minimap surface lease to GameCanvas/presentation authority.
4. Replace document.getElementById with the leased handle.
5. Return typed projection results.
6. Add screen-transition and runtime-stop revocation.
7. Correlate the first successful active minimap draw with a committed frame.
```

## Validation state

```txt
surface lease implementation: absent
active minimap mount: absent
typed draw result: absent
revocation fixture: absent
```

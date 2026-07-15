# Playing HUD Canvas Absence Gap

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-15T16-39-06-04-00`

## Summary

The Three.js world continues rendering during `PLAYING`, but the HUD branch mounted beside it does not include the minimap canvas or authored gameplay panels. The render loop still attempts minimap projection every callback and receives no canvas until a different screen branch mounts it.

## Plan ledger

**Goal:** bind active gameplay rendering and HUD/minimap surface availability to the same accepted route and mount generation.

- [x] Trace HUD branching.
- [x] Trace the per-frame minimap lookup and draw guard.
- [x] Separate source evidence from unexecuted visual claims.
- [ ] Add a matching visible-frame fixture after implementation.

## Render path

```txt
PLAYING frame
  -> Three.js world update
  -> document.getElementById(runtime-minimap)
  -> no PLAYING Minimap component exists
  -> canvas is null
  -> drawMinimapFrame returns
  -> post-processing renders

COMPLETED frame
  -> completed HUD branch mounts Minimap
  -> DOM query can resolve the canvas
  -> drawMinimapFrame executes
  -> post-processing renders
```

## Source-backed gap

```txt
Three.js render during PLAYING: present
PLAYING minimap component: absent
PLAYING objective/status surfaces: absent
per-frame minimap lookup: present
null-canvas guard: present
COMPLETED minimap component: present
surface admission result: absent
canvas generation binding: absent
FirstPlayingHudFrameAck: absent
```

## Required render result

```txt
GameplayHudFrameResult
  routeRevision
  screenRevision
  snapshotRevision
  HudMountGeneration
  minimapCanvasGeneration
  requiredSurfaceIds
  mountedSurfaceIds
  minimapDrawReceipt
  worldFrameReceipt
  outcome: rendered | incomplete | stale | retired | failed
```

## Required proof

```txt
enter PLAYING
  -> required HUD surfaces are mounted
  -> minimap canvas exists before draw admission
  -> objective and sequence match accepted snapshot
  -> first world frame and first HUD frame share route/snapshot revisions
  -> settings/debug toggles do not remove gameplay surfaces
  -> leaving PLAYING retires the mount and late draws are rejected
```

## Claim boundary

No screenshot, browser trace or deployed-origin fixture was run. This audit proves source-permitted surface absence, not a measured frame defect or visual regression.
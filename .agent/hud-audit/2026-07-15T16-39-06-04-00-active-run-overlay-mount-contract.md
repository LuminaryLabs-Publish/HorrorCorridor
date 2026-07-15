# Active-Run Overlay Mount Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-15T16-39-06-04-00`

## Summary

Active gameplay requires a stable base HUD layer plus optional control and diagnostic overlays. The current `PLAYING` branch substitutes settings/debug composition for the gameplay HUD, so this contract defines required surfaces and additive overlay rules.

## Plan ledger

**Goal:** guarantee one complete active-run HUD mount for every accepted `PLAYING` generation and retire it cleanly on route change.

- [x] Classify base, optional and terminal surfaces.
- [x] Define mount and pointer-event invariants.
- [x] Define minimap canvas ownership.
- [ ] Implement and verify the contract.

## Surface classes

```txt
Required PLAYING surfaces
  objective
  anomaly sequence progress
  held item
  local player/session status
  minimap canvas

Optional additive surfaces
  settings control
  frame debug panel

Terminal surfaces
  completion status
  completion hint
  restart and title controls
```

## Mount invariants

```txt
one HudMountGeneration exists for accepted PLAYING
all required PLAYING surfaces share that generation
optional overlays never replace required surfaces
settings remains pointer-interactive without enabling the passive HUD layer
minimap canvas identity remains stable for the mount generation
GameCanvas draw work targets only the admitted minimap generation
COMPLETED can replace or augment the HUD only after terminal route adoption
route retirement removes all leases exactly once
```

## Read model

```txt
GameplayHudReadModel
  objectiveText
  roomLabel
  sessionMode
  localPlayerName
  heldItemLabel
  requiredSequence
  occupiedSequenceSlots
  localPosition
  localHeading
  remotePlayers
  cubeLocations
  oozeLocations
```

## Mount result

```txt
HudMountResult
  generation
  routeRevision
  screenRevision
  requiredCount
  mountedCount
  missingSurfaceIds
  minimapCanvasGeneration
  settingsOverlayState
  debugOverlayState
  status
```

## Checkpoints

```txt
A: entering PLAYING mounts every required surface
B: opening settings preserves the base HUD and minimap
C: toggling debug preserves the base HUD and minimap
D: accepted snapshot changes update sequence and item projections
E: minimap draw receipt references the active canvas generation
F: completion transition retires the PLAYING generation once
G: lobby/title transition rejects late draw and projection work
```

## Validation boundary

The contract is not implemented. No active-run HUD or minimap availability claim is made.
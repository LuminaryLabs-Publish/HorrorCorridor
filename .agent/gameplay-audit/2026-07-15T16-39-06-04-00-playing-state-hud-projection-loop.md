# Playing-State HUD Projection Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-15T16-39-06-04-00`

## Summary

Gameplay state contains the objective context, anomaly sequence, held-cube state, player identity and spatial data needed by the minimap. During active play, those values continue changing, but the main HUD branch omits their presentation and exposes only settings/debug surfaces.

## Plan ledger

**Goal:** make accepted gameplay state produce a complete active-run read model and visible HUD result without transferring gameplay authority into React presentation.

- [x] Trace accepted state into HUD selectors.
- [x] Trace PLAYING and COMPLETED route branches.
- [x] Define the missing projection transaction.
- [ ] Implement meaningful-change and first-frame fixtures.

## Current loop

```txt
player input
  -> local prediction or host authority
  -> collision and movement
  -> cube interaction and anomaly progression
  -> ooze advancement and authoritative snapshot
  -> runtime/session/UI stores update
  -> HUDOverlay reads screen and accepted stores

when PLAYING
  -> returns before gameplay read model is projected
  -> settings and debug remain available
  -> objective, sequence, held item, player state and minimap are omitted

when COMPLETED
  -> terminal branch derives held item, objective, sequence and player labels
  -> full panels and minimap mount
```

## Gameplay information already available

```txt
screen and route state
room and join code
session mode and local player identity
authoritative snapshot
anomaly required sequence
anomaly occupied slots
held cube and color
remote player positions
local predicted position and heading
completion status and message
```

## Missing projection authority

```txt
GameplayHudReadModel
HudPolicyRevision
HudMountGeneration
required PLAYING surface set
objective result
sequence progress result
held-item result
local-player result
minimap mount result
first matching HUD frame acknowledgement
route retirement receipt
```

## Required behavior

```txt
accepted PLAYING state
  -> derive detached HUD read model
  -> project objective and anomaly progress
  -> project held item and local player status
  -> mount and bind minimap canvas
  -> keep settings/debug additive
  -> publish result tied to state revision
  -> acknowledge the first matching active-run frame
```

## Validation boundary

No gameplay behavior changed. This file documents a presentation/projection gap and does not claim that movement, interactions, victory or authoritative snapshots are incorrect.
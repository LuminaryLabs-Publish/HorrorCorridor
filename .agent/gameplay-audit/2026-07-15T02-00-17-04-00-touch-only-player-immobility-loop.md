# Gameplay Audit: Touch-Only Player Immobility Loop

**Timestamp:** `2026-07-15T02-00-17-04-00`

## Summary

A touch-only player can reach the game route, but the source exposes no touch producer for the actions required to traverse the maze or manipulate anomaly cubes.

## Plan ledger

**Goal:** define the complete gameplay coverage needed for touch parity.

- [x] Trace route entry to active gameplay.
- [x] Trace each gameplay action to its current producer.
- [x] Identify the touch-only dead end.
- [x] Define parity checkpoints.
- [ ] Execute after runtime implementation.

## Current loop

```txt
touch-only browser
  -> enter solo, host or client game
  -> PointerLockGate requests mouse-look capture
  -> no keyboard movement producer is available
  -> no touch movement axes are written
  -> no touch look deltas are written
  -> no touch interact command is written
  -> player remains unable to traverse or carry/place cubes
```

## Required gameplay parity

```txt
move through corridors
turn and inspect surroundings
pause and resume
pick up one cube
carry and drop one cube
place a cube at the anomaly
remove the last placed cube
complete the ordered sequence
receive the same authoritative result path
```

## Acceptance matrix

| Action | Desktop producer | Required touch producer |
|---|---|---|
| move | WASD/arrows | directional pad or virtual stick |
| look | pointer-lock mouse | captured look region |
| interact | `E` | semantic interact button |
| pause | `P` / route UI | semantic pause button |
| release/cancel | Escape/pointer lock | explicit cancel plus pointer cancellation |

## Guardrail

Touch support is incomplete unless one touch-only run can finish the same anomaly loop without a hardware keyboard or mouse.

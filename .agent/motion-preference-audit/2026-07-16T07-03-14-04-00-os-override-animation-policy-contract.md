# OS and Product Motion Preference Contract

**Timestamp:** `2026-07-16T07-03-14-04-00`

## Summary

HorrorCorridor needs one motion policy that resolves operating-system preference, an optional product override and route lifecycle into a stable presentation profile.

## Plan ledger

**Goal:** define a complete motion-preference contract before runtime implementation.

- [x] Define sources and precedence.
- [x] Define producer classifications.
- [x] Define lifecycle and proof requirements.
- [ ] Implement persistence, UI and browser fixtures.

## Preference sources

```txt
system: prefers-reduced-motion
product override: system | normal | reduced
resolved profile: normal | reduced
```

Precedence:

```txt
explicit product override
  -> otherwise current operating-system preference
  -> otherwise normal profile
```

## Producer classification

```txt
essential
  player movement and collision
  camera yaw and pitch needed for control
  remote-player and cube state placement
  network and authoritative state progression
  minimap and HUD state projection

ornamental
  walk side bob
  walk vertical bob
  camera roll
  scene emissive pulses
  scene and texture opacity pulses
  exit light and halo pulses
  nonessential transition animation
```

## Lifecycle

- Subscribe when the active document and route are admitted.
- Resolve the initial preference before claiming a ready presentation profile.
- Apply live media-query changes without resetting gameplay.
- Persist only the product override, not the derived system value.
- Remove listeners and retire the policy on route exit or runtime cleanup.
- Reject late changes from retired document or route generations.

## Proof gate

A reduced-motion claim requires normal/reduced simulation parity, live preference-change coverage, source/build/Pages visual evidence and `FirstReducedMotionGameplayFrameAck`.
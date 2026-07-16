# Reduced Motion Browser Fixture Gate

**Timestamp:** `2026-07-16T07-03-14-04-00`

## Summary

Source inspection is insufficient to claim reduced-motion support. The policy must be verified in the source route, production build and deployed origin.

## Plan ledger

**Goal:** define executable proof for capability observation, profile adoption, simulation parity and visible-frame convergence.

- [x] Define fixture matrix.
- [x] Define required readbacks and screenshots.
- [x] Preserve deployment status as unproven.
- [ ] Add and run the fixtures.

## Required fixture matrix

```txt
system normal / override system
system reduced / override system
system normal / override reduced
system reduced / override normal
live normal -> reduced change
live reduced -> normal change
route exit during preference change
runtime cleanup during preference change
```

## Required assertions

```txt
resolved preference and source are correct
camera bob/roll descriptors match the profile
scene pulse descriptors match the profile
movement and collision results are identical
network and authoritative snapshots are identical
no duplicate listener or policy generation survives cleanup
FirstReducedMotionGameplayFrameAck cites the accepted profile
```

## Required artifacts

```txt
source fixture JSON
production-build fixture JSON
source normal/reduced screenshots
build normal/reduced screenshots
deployed-origin normal/reduced screenshots
simulation parity hashes
policy and frame acknowledgement readback
```

## Current state

No reduced-motion fixture, build smoke, deployed-origin smoke or artifact comparison was executed in this documentation turn.
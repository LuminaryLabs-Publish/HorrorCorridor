# HorrorCorridor Next Steps

**Updated:** `2026-07-16T07-03-14-04-00`

## Summary

The next implementation should resolve operating-system and product motion preferences before optional camera and environmental motion is projected. Gameplay, collision, networking and authoritative snapshots must remain unchanged.

## Plan ledger

**Goal:** implement a complete reduced-motion policy with live preference settlement and source/build/deployed proof.

- [ ] Add a `prefers-reduced-motion` capability observer with listener cleanup.
- [ ] Add a product override with `system`, `normal` and `reduced` values.
- [ ] Define `DocumentRevision`, `RouteRevision`, `PreferenceRevision`, `PolicyRevision` and `FrameRevision`.
- [ ] Classify movement, collision, camera yaw/pitch, networking, interaction and state projection as essential.
- [ ] Classify walk bob, camera roll, scene pulses, exit-light pulses and nonessential transitions as ornamental.
- [ ] Resolve one immutable motion profile per accepted policy revision.
- [ ] Make `syncCameraFromPlayer` consume a camera-motion descriptor.
- [ ] Make scene-dressing pulses consume an environmental-motion descriptor.
- [ ] Make exit-light and halo pulses consume the same accepted profile.
- [ ] Preserve the authoritative simulation and minimap/HUD update path.
- [ ] Publish `MotionProjectionResult` on initial and live preference settlement.
- [ ] Reject stale preference work from retired document and route generations.
- [ ] Publish `FirstReducedMotionGameplayFrameAck` after the first matching frame.
- [ ] Add normal-versus-reduced simulation parity hashes.
- [ ] Add system/override precedence fixtures.
- [ ] Add live media-query change and route-retirement fixtures.
- [ ] Run source, production-build and deployed-origin screenshot/readback comparisons.

## Completion gate

Do not claim reduced-motion support until browser capability, override precedence, simulation parity, live changes, cleanup and visible-frame acknowledgements pass on `main`.
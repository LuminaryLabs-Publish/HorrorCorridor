# HorrorCorridor Next Steps

**Updated:** `2026-07-15T02-00-17-04-00`

## Summary

The next implementation should add a device-control admission boundary before adding isolated touch buttons. Every admitted device profile must cover the whole playable action set and feed the existing `PlayerInputState` rather than bypassing it.

## Plan ledger

**Goal:** make keyboard/mouse, touch and hybrid devices produce equivalent normalized gameplay intent without duplicate actions or gesture conflicts.

- [ ] Define `DeviceCapabilitySnapshot`, `ControlProfileId` and `InputMapRevision`.
- [ ] Define the required action set: move forward/back/left/right, look, interact, pause, capture/release.
- [ ] Add `DeviceControlAdmissionCommand` and `DeviceControlAdmissionResult`.
- [ ] Keep keyboard and pointer-lock mouse as the desktop profile.
- [ ] Add a semantic touch movement control with cancellation and dead-zone policy.
- [ ] Add a touch-look region with pointer capture and bounded delta normalization.
- [ ] Add explicit touch interact and pause controls.
- [ ] Ensure settings/debug controls do not overlap gameplay gestures.
- [ ] Arbitrate hybrid mouse, touch and keyboard input by pointer identity and generation.
- [ ] Reset held actions on blur, visibility loss, route retirement and pointer cancellation.
- [ ] Route all producers through `PlayerInputState`.
- [ ] Publish `FirstDeviceControlSurfaceFrameAck`.
- [ ] Publish `FirstDeviceActionEffectFrameAck` after movement, look and interaction fixtures.
- [ ] Add desktop, touch-only and hybrid browser fixtures.
- [ ] Validate source, production build and deployed-origin parity.

## Checkpoints

```txt
Checkpoint A
  every admitted control profile covers every required action

Checkpoint B
  no touch control mutates gameplay state outside PlayerInputState

Checkpoint C
  one gesture produces at most one accepted action

Checkpoint D
  cancelled or hidden pointers leave no held movement behind

Checkpoint E
  visible controls and resulting world effects share one revision

Checkpoint F
  desktop behavior remains unchanged
```

## Do not claim

Do not claim mobile playability, controller equivalence, hybrid-input safety or production parity until the corresponding fixtures pass.

# Continuous Motion Reduced-Frame Gap

**Timestamp:** `2026-07-16T07-03-14-04-00`

## Summary

The Three.js frame is continuously animated even when all authoritative state is unchanged. Camera bob/roll and multiple material/light pulses depend on elapsed time, but the frame cites no accepted motion preference.

## Plan ledger

**Goal:** bind every optional motion producer to one accepted policy and prove the first matching visible frame.

- [x] Identify camera and environmental motion producers.
- [x] Identify the per-frame consumers.
- [x] Define a reduced-motion frame descriptor and acknowledgement.
- [ ] Implement and capture source/build/Pages evidence.

## Visible-frame path

```txt
requestAnimationFrame
  -> syncCameraFromPlayer(elapsedMs, movementSpeed)
  -> world.update(elapsedMs)
  -> scene prop and texture pulse
  -> exit light and halo pulse
  -> postProcessing.render()
```

## Missing frame evidence

```txt
MotionPreferenceRevision
MotionPolicyRevision
CameraMotionProfile
EnvironmentalMotionProfile
TransitionMotionProfile
MotionProjectionResult
FirstReducedMotionGameplayFrameAck
```

## Required reduced profile

```txt
camera side bob: zero or bounded static offset
camera vertical bob: zero or bounded static offset
camera roll: zero
scene emissive pulse: static accepted intensity
scene opacity pulse: static accepted opacity
exit light and halo pulse: static accepted values
world state and minimap: unchanged
network and gameplay state: unchanged
```

## Claim boundary

No reduced-motion frame was rendered, captured or compared in this documentation turn.
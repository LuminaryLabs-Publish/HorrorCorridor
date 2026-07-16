# Motion Preference Animation Admission DSK Map

**Timestamp:** `2026-07-16T07-03-14-04-00`

## Summary

The current runtime has motion producers but no shared preference authority. Camera bob/roll and environmental pulses are emitted directly from elapsed time during rendering.

## Plan ledger

**Goal:** introduce one renderer-neutral policy boundary that preserves essential gameplay while controlling optional presentation motion.

- [x] Identify existing producers and consumers.
- [x] Separate simulation truth from presentation motion.
- [x] Define command, result, revision and frame acknowledgement surfaces.
- [ ] Implement the DSKs and fixtures.

## Existing flow

```txt
RAF elapsedMs + movement velocity
  -> syncCameraFromPlayer
  -> camera side bob vertical bob and roll

RAF elapsedMs
  -> world.update
  -> prop emissive/opacity pulses
  -> exit light/halo pulses
  -> post-processing render
```

## Required parent domain

```txt
corridor-motion-preference-animation-admission-authority-domain
```

## DSK decomposition

```txt
capability
  motion-capability-observer-kit
  browser media-query subscription and live-change evidence

policy
  motion-preference-policy-kit
  product-motion-override-kit
  motion-classification-kit
  route-motion-generation-kit

projection
  camera-bob-projection-kit
  camera-roll-projection-kit
  scene-emissive-pulse-policy-kit
  scene-opacity-pulse-policy-kit
  exit-light-pulse-policy-kit
  transition-motion-profile-kit

integrity
  essential-simulation-preservation-kit
  live-preference-change-kit
  motion-policy-retirement-kit

results and proof
  reduced-motion-frame-descriptor-kit
  motion-projection-result-kit
  first-reduced-motion-gameplay-frame-ack-kit
  reduced-motion-source-fixture-kit
  browser-media-query-fixture-kit
  source-build-pages-motion-parity-kit
```

## Command/result contract

```txt
MotionPreferenceAdmissionCommand
  documentRevision
  routeRevision
  runtimeRevision
  preferenceRevision
  policyRevision
  expectedFrameRevision

MotionProjectionResult
  accepted preference and source
  essential-motion disposition
  camera-motion disposition
  environmental-motion disposition
  transition-motion disposition
  committed frame revision

FirstReducedMotionGameplayFrameAck
  accepted policy revision
  visible frame revision
  camera descriptor
  world-motion descriptor
```

## Invariants

- Motion preference never changes authoritative gameplay state.
- Movement, collision, interaction and network cadence remain semantically identical.
- Ornamental motion reads one accepted policy snapshot per frame.
- Live preference changes settle once and retire stale route generations.
- A reduced-motion claim requires a visible-frame acknowledgement and source/build/deployed parity fixtures.
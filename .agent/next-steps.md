# HorrorCorridor Next Steps

**Updated:** `2026-07-15T07-00-28-04-00`

## Summary

The next implementation should introduce a semantic audio authority before adding isolated sound calls. Audio must consume accepted gameplay and lifecycle results, unlock through an admitted browser gesture, deduplicate prediction and snapshots, and retire with the owning route and runtime generation.

## Plan ledger

**Goal:** implement one browser-safe audio projection path with explicit event identity, cue policy, preferences, spatial ownership and proof.

- [ ] Define `AudioCapabilitySnapshot`, `AudioContextGeneration` and `AudioPolicyRevision`.
- [ ] Define stable `AudioEventId`, `CueDescriptorId`, `BusId` and `VoiceId` types.
- [ ] Add `AudioProjectionAdmissionCommand` and `AudioProjectionResult`.
- [ ] Create one Web Audio context only after an accepted user gesture.
- [ ] Add explicit unsupported, locked, suspended and failed states.
- [ ] Map accepted cube, anomaly, ooze, session, pause and outcome results into semantic audio events.
- [ ] Keep rejected gameplay commands from producing success cues.
- [ ] Deduplicate local prediction, authoritative acknowledgement and repeated snapshots.
- [ ] Add a cue descriptor registry with procedural or asset-backed fallback policy.
- [ ] Add master, ambience, effects, UI and outcome buses.
- [ ] Add persisted master volume, category volume and mute preferences.
- [ ] Project listener pose from the accepted local camera/player revision.
- [ ] Project world sources from accepted player, cube, anomaly and ooze revisions.
- [ ] Add distance, occlusion, concurrency, priority and voice-budget policy.
- [ ] Suspend or attenuate on pause and visibility loss.
- [ ] Retire loops, nodes, handlers and timers on route/runtime replacement.
- [ ] Publish `FirstAudibleCueAck`.
- [ ] Publish `FirstAudioVisualConvergenceAck`.
- [ ] Add source, production-build and deployed-origin browser fixtures.

## Checkpoints

```txt
Checkpoint A
  no cue is emitted directly from a render callback or raw input event

Checkpoint B
  accepted one-shot gameplay results produce at most one cue

Checkpoint C
  rejected or stale gameplay results do not sound successful

Checkpoint D
  one context generation owns every active bus and voice

Checkpoint E
  pause, hide and route retirement leave no orphaned loops or nodes

Checkpoint F
  audible and visible results reference the same semantic source revision

Checkpoint G
  unsupported or locked audio never blocks visual gameplay
```

## Do not claim

Do not claim audible gameplay, autoplay-unlock reliability, spatial correctness, preference persistence, lifecycle safety or production parity until the corresponding fixtures pass.

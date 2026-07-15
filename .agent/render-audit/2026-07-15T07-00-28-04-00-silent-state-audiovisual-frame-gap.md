# Silent State Audiovisual Frame Gap

**Timestamp:** `2026-07-15T07-00-28-04-00`

## Summary

Three.js world rendering, post-processing, minimap and HUD all consume runtime state, but there is no matching audio projection. A visible pickup, placement, ooze-pressure change, remote-player update or terminal outcome has no owned audible counterpart and no convergence receipt.

## Plan ledger

**Goal:** bind accepted semantic state, visible presentation and audible presentation to one revision without letting render callbacks invent gameplay cues.

- [x] Identify visual consumers.
- [x] Identify missing audio consumer.
- [x] Define audiovisual acknowledgement requirements.
- [ ] Implement cue projection.
- [ ] Prove matching visual and audible revisions.

## Current projection

```txt
accepted snapshot or local state
  -> worldBuilder update
  -> post-processing render
  -> minimap draw
  -> HUD/store sync
  -> debug frame capture
  -> no audio event projection
```

## Risks

```txt
silent interaction feedback
silent hazard pressure changes
silent remote-player presence
silent anomaly success or rejection
silent terminal outcome
future duplicate cues from both prediction and authoritative snapshots
future audio nodes surviving route or lifecycle retirement
```

## Required evidence

```txt
AudioEventId
AudioPolicyRevision
AudioContextGeneration
CueDescriptorId
source semantic revision
visible frame revision
AudioProjectionResult
FirstAudibleCueAck
FirstAudioVisualConvergenceAck
```

## Render boundary

The render world may expose listener and source transforms, but it must not decide whether a cue is valid. Cue admission belongs to the audio authority and must consume accepted simulation/session results.

## Claim boundary

No audiovisual convergence, audible feedback or audio lifecycle correctness is currently proved.

# Audio Event Projection DSK Map

**Timestamp:** `2026-07-15T07-00-28-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

## Summary

The runtime has clear simulation, networking, interaction, rendering and UI ownership, but no audio ownership. This audit defines a future parent domain that consumes accepted semantic results instead of reading mutable render state or replaying predicted events directly.

## Plan ledger

**Goal:** establish a minimal audio DSK boundary that is deterministic at the event layer, browser-safe at the host layer and independent from Three.js implementation details.

- [x] Preserve existing gameplay and render domains.
- [x] Identify semantic event sources.
- [x] Separate audio policy from browser adapter concerns.
- [x] Define command, result and acknowledgement surfaces.
- [ ] Implement the parent and kits.
- [ ] Add executable browser fixtures.

## Existing producer domains

```txt
corridor-session-domain-kit
  connection, ready, join, leave, reset

movement-collision-camera-kit
  movement speed, collision, camera pose

corridor-interaction-domain-kit
  pickup, drop, place, remove

ordered-anomaly-sequence-kit
  accepted slot, rejected order, completion

ooze-trail-domain-kit
  spawn, pressure, decay, proximity

ui-pause-projection-kit
ui-completion-projection-kit
complete-screen-presentation-kit
  pause, resume, success, failure, route transition
```

## Planned parent domain

```txt
corridor-audio-event-projection-authority-domain
```

## Planned subdomains

```txt
n:audio:capability
  browser support and output-device capability snapshot

n:audio:lifecycle
  context creation, gesture unlock, suspend, resume and retirement

n:audio:events
  semantic event identity, source revision and deduplication

n:audio:cues
  cue descriptors, variants, duration and priority

n:audio:spatial
  listener pose, source pose, attenuation and occlusion policy

n:audio:mix
  buses, mute, volume, pooling and voice budget

n:audio:presentation
  accepted cue scheduling, result publication and acknowledgements

n:audio:proof
  fixture capture, counters, policy readback and parity
```

## Planned kit contract

| Kit | Service boundary |
|---|---|
| `audio-capability-snapshot-kit` | detect AudioContext support, state and output constraints |
| `audio-context-lifecycle-kit` | create, resume, suspend and close one context generation |
| `user-gesture-audio-unlock-kit` | bind an accepted browser gesture to context admission |
| `audio-policy-revision-kit` | identify the active cue, mix and fallback policy |
| `audio-cue-descriptor-registry-kit` | register stable cue IDs and procedural/asset descriptors |
| `semantic-audio-event-kit` | publish immutable event IDs from accepted gameplay results |
| `gameplay-event-audio-map-kit` | map movement, interaction, anomaly and ooze results to cues |
| `ui-audio-map-kit` | map menu, pause, completion and rejection results to cues |
| `ambience-loop-kit` | own corridor ambience generations and transitions |
| `listener-pose-projection-kit` | project accepted local camera/player pose into listener state |
| `spatial-source-projection-kit` | project world/player/cube sources into audio space |
| `occlusion-distance-policy-kit` | apply distance, maze-wall and priority policy |
| `audio-bus-graph-kit` | own master, ambience, effects and UI buses |
| `master-volume-preference-kit` | settle and persist master gain |
| `category-volume-preference-kit` | settle and persist per-bus gains |
| `mute-state-kit` | apply explicit mute without destroying context state |
| `cue-deduplication-kit` | reject duplicate prediction/snapshot/event revisions |
| `voice-budget-pooling-kit` | bound simultaneous voices and reuse nodes safely |
| `pause-visibility-audio-suspension-kit` | suspend or attenuate on pause, hide and route exit |
| `audio-projection-result-kit` | publish accepted, rejected, deferred and failed results |
| `first-audible-cue-ack-kit` | acknowledge one started audible cue generation |
| `audio-browser-fixture-parity-kit` | compare source, build and deployed-origin behavior |

## Required transaction

```txt
AudioProjectionAdmissionCommand
  -> bind AudioEventId, source revision, session generation,
     audio policy revision and context generation
  -> validate browser capability and unlock state
  -> resolve one CueDescriptor and bus
  -> deduplicate predicted, authoritative and repeated work
  -> project listener/source transforms
  -> enforce priority, volume, mute and voice budget
  -> schedule or reject without partial ownership
  -> publish AudioProjectionResult
  -> publish FirstAudibleCueAck
  -> publish FirstAudioVisualConvergenceAck
```

## Ownership rules

```txt
simulation owns semantic truth
audio domain owns cue admission and mix policy
browser adapter owns Web Audio objects
render domain does not trigger cues directly
network snapshots do not replay already accepted cue IDs
pause and lifecycle domains may suspend but not orphan audio nodes
```

## Claim boundary

No audio DSK is implemented. This is an architecture contract only.

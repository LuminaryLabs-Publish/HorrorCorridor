# Browser Audio Fixture Gate

**Timestamp:** `2026-07-15T07-00-28-04-00`

## Summary

Existing validation covers build, lint, visual and live-player behavior but does not prove browser audio capability, unlock, lifecycle, cue admission, spatial updates or deployed-origin parity.

## Plan ledger

**Goal:** require executable browser evidence before any audio-readiness claim.

- [x] Identify missing fixture rows.
- [x] Define source, build and deployed-origin parity requirements.
- [ ] Add browser fixtures.
- [ ] Run supported-browser matrix.
- [ ] Record durable artifacts and results.

## Required fixture matrix

```txt
capability
  supported AudioContext
  unsupported/fallback path

unlock
  context locked before gesture
  accepted gesture starts one context generation
  repeated gestures do not create duplicate contexts

preferences
  master volume
  category volume
  mute/unmute
  persistence and reset

cues
  accepted pickup sounds once
  rejected pickup does not sound successful
  authoritative snapshot does not replay local accepted cue
  remote accepted interaction sounds once
  terminal result preempts lower-priority effects

spatial
  listener tracks accepted local pose
  world source tracks accepted source pose
  distance attenuation remains bounded

lifecycle
  pause policy
  visibility suspension
  resume
  route exit retirement
  BFCache or page restoration policy

parity
  source development route
  production build
  deployed origin
```

## Proof artifacts

```txt
AudioCapabilitySnapshot
AudioContextGeneration ledger
AudioProjectionResult ledger
voice and bus counters
preference snapshot
FirstAudibleCueAck
FirstAudioVisualConvergenceAck
browser console and failure log
```

## Current validation state

```txt
npm install: not run
npm run lint: not run
npm run build: not run
audio capability fixture: unavailable
autoplay unlock fixture: unavailable
cue deduplication fixture: unavailable
spatial fixture: unavailable
lifecycle fixture: unavailable
production-build audio smoke: not run
deployed-origin audio smoke: not run
```

## Claim boundary

No source, build or deployed-origin audio parity is claimed.

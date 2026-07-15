# Browser Audio Unlock Spatial Cue Contract

**Timestamp:** `2026-07-15T07-00-28-04-00`

## Summary

A future audio implementation must account for browser autoplay policy, one owned AudioContext generation, user preferences, spatial source projection, bounded voice allocation and page lifecycle. Creating isolated sounds directly inside React or render callbacks would not satisfy this contract.

## Plan ledger

**Goal:** make audio initialization, playback, suspension and retirement explicit and recoverable across solo, host and client routes.

- [x] Define unlock requirements.
- [x] Define context lifecycle ownership.
- [x] Define listener and source projection.
- [x] Define mix and voice-budget policy.
- [x] Define lifecycle retirement.
- [ ] Implement Web Audio adapter.
- [ ] Prove behavior in supported browsers.

## Context lifecycle

```txt
uninitialized
  -> accepted user gesture
  -> creating
  -> running
  -> suspended by pause/visibility/policy
  -> resumed by accepted lifecycle command
  -> closed on route/runtime retirement
```

Only one context generation may be current. Stale nodes, timers and unlock handlers must be rejected after a route, document or runtime generation changes.

## Cue descriptors

```txt
id
category: ui | player | world | ambience | outcome
source: procedural | buffer | oscillator | noise
priority
gain
duration
loop
variation policy
spatial policy
attenuation range
concurrency group
fallback policy
```

## Spatial contract

```txt
listener pose
  <- accepted local camera/player revision

world source pose
  <- accepted player, cube, anomaly or ooze revision

projection
  -> stable coordinate conversion
  -> distance attenuation
  -> optional maze-wall occlusion policy
  -> bounded update cadence
```

## Mix contract

```txt
master bus
  ambience bus
  effects bus
  ui bus
  outcome bus

master mute and gain
category gain
voice limit per category
priority eviction
loop ownership
fade-in and fade-out policy
```

## Browser failure policy

```txt
unsupported Web Audio
  -> continue visual gameplay
  -> publish explicit unavailable result

context remains locked
  -> expose a visible/semantic unlock action
  -> defer cues without replaying stale one-shots

context interrupted or suspended
  -> publish state
  -> resume only through accepted lifecycle work

node or decode failure
  -> reject one cue
  -> preserve the context and other buses
```

## Claim boundary

No browser audio context, cue, spatial projection, mix graph or preference implementation exists at the audited head.

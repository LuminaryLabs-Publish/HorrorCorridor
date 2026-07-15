# HorrorCorridor Known Gaps

**Updated:** `2026-07-15T07-00-28-04-00`

## Summary

The highest current undocumented product gap is audio event projection. Simulation, multiplayer and rendering expose meaningful accepted state, but no audio domain owns browser capability, cue mapping, preferences, spatialization, lifecycle or proof.

## Plan ledger

**Goal:** prioritize one authoritative audio path while retaining every previous lifecycle, loading, session, transport, protocol, movement, interaction, device-control, rendering and proof finding.

- [x] Preserve previous audits.
- [x] Add and route the audio projection gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. browser audio capability snapshot
2. one AudioContext generation owner
3. accepted user-gesture unlock
4. audio policy revision
5. stable semantic AudioEventId
6. cue descriptor registry
7. gameplay result to cue mapping
8. UI and terminal result to cue mapping
9. ambience loop ownership
10. listener pose projection
11. spatial source projection
12. distance and maze-occlusion policy
13. master and category bus graph
14. master volume preference
15. category volume preferences
16. mute state
17. prediction/snapshot cue deduplication
18. voice pooling and concurrency budget
19. pause, visibility and route audio suspension
20. AudioProjectionResult
21. FirstAudibleCueAck
22. FirstAudioVisualConvergenceAck
23. unsupported/locked/failure fallback behavior
24. source/build/deployed-origin browser parity
25. retained device-control and multiplayer authority gaps
```

## Current coverage gap

```txt
browser audio context: no
semantic audio events: no
cue descriptors: no
gameplay cue mapping: no
UI cue mapping: no
ambience: no
spatial listener/source projection: no
volume controls: no
mute: no
cue deduplication: no
voice budget: no
lifecycle suspension/retirement: no
audible acknowledgement: no
browser audio fixture: no
```

## Failure path

```txt
accepted gameplay or session result
  -> visual world, minimap, HUD or terminal projection updates
  -> no audio event is published
  -> no cue is admitted
  -> no audible result or failure state is exposed
```

## Future duplication risk

```txt
local prediction emits cue
  + host authoritative snapshot repeats the same event
  + repeated snapshot or React rerender emits again
  -> duplicate audio unless keyed to semantic result identity and revision
```

## Retained gaps

All previous page-lifecycle, settings, device-control, proof provenance, loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, movement, prediction, snapshot, interaction, terminal outcome, debug and deployment findings remain open.

## Do not claim

Do not claim audio support, audible gameplay feedback, preference persistence, spatial correctness, duplicate suppression, lifecycle safety, audiovisual convergence or production parity until the authority and fixtures pass on `main`.

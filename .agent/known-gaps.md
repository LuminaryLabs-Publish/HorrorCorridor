# HorrorCorridor Known Gaps

**Updated:** `2026-07-15T21-39-15-04-00`

## Summary

The highest current undocumented boundary is pointer-lock acquisition and fallback. The source can request ownership and observe successful changes, but it does not classify denied, unsupported, interrupted, stale, or retired attempts, and it publishes no visible recovery or first matching mouse-look frame result.

## Plan ledger

**Goal:** prioritize explicit mouse-look capability admission while retaining every prior HUD, minimap, lifecycle, loading, session, transport, protocol, movement, audio, rendering, and proof finding.

- [x] Preserve previous audits.
- [x] Add and route the pointer-lock acquisition/fallback gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. PointerLockPolicyRevision
2. SurfaceId and SurfaceGeneration
3. UserGestureId
4. PointerLockGeneration
5. API capability observation
6. permissions-policy observation
7. request result normalization
8. pointerlockerror observation
9. accepted/denied/unsupported/interrupted classification
10. stale callback rejection
11. input readiness versus mouse-look readiness separation
12. visible capture-failure projection
13. retry command and receipt
14. fallback look control profile
15. reduced-control route policy
16. PointerLockAdmissionResult
17. look-input revision binding
18. camera-frame revision binding
19. FirstPointerLockFrameAck
20. retirement command and receipt
21. blur/hidden/pagehide retirement
22. held-input and look-delta clearing
23. accepted browser fixture
24. denied browser fixture
25. unsupported and permissions-policy fixtures
26. interruption and retry fixtures
27. fallback-profile fixture
28. source/build/deployed-origin parity
29. retained active-HUD, minimap, audio, lifecycle, protocol, movement, and device-control gaps
```

## Current coverage gap

```txt
requestPointerLock call: yes
pointerlockchange handling: yes
pointerlockerror handling: no
accepted result object: no
denied/unsupported result object: no
input readiness before accepted ownership: yes
visible failure state: no
visible retry state: no
fallback look profile: no
first accepted mouse-look frame acknowledgement: no
browser fixture: no
```

## Failure path

```txt
accepted PLAYING route
  -> input readiness published
  -> player clicks world
  -> requestPointerLock invoked
  -> browser does not accept ownership
  -> no error observer or terminal result
  -> mousemove remains ignored
  -> keyboard movement and rendering can continue
  -> no visible explanation retry fallback or reduced-profile status
```

## Required invariants

```txt
every capture gesture settles once
mouse-look readiness follows accepted ownership only
failed capture remains visible and recoverable
unsupported capability produces an admitted fallback or explicit route rejection
late callbacks cannot reactivate retired generations
first mouse-look frame cites accepted ownership and look evidence
retirement clears all input and publishes a receipt
```

## Retained gaps

All previous active-HUD, minimap backing-store, page-lifecycle, settings, device-control, proof provenance, loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, movement, prediction, snapshot, interaction, terminal outcome, debug, audio, and deployment findings remain open.

## Do not claim

Do not claim a runtime fix, pointer-lock reliability, fallback operability, mouse-look completeness, lifecycle correctness, browser parity, or production readiness until implementation and fixtures pass on `main`.
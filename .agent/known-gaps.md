# HorrorCorridor Known Gaps

**Updated:** `2026-07-15T16-39-06-04-00`

## Summary

The highest current undocumented product gap is active gameplay HUD mounting. Accepted run state contains objective, anomaly, held-item, player and minimap data, but `HUDOverlay` returns early during `PLAYING` and mounts only settings/debug surfaces. The complete gameplay HUD and minimap are deferred to `COMPLETED`.

## Plan ledger

**Goal:** prioritize a complete route-bound gameplay HUD while retaining every previous lifecycle, loading, session, transport, protocol, movement, audio, rendering, minimap and proof finding.

- [x] Preserve previous audits.
- [x] Add and route the active gameplay HUD mount gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. GameplayHudReadModel
2. HudPolicyRevision
3. required PLAYING surface manifest
4. HudSurfaceId
5. HudMountGeneration
6. objective projection during PLAYING
7. anomaly sequence progress during PLAYING
8. held-item projection during PLAYING
9. local player/session status during PLAYING
10. minimap mount admission during PLAYING
11. minimap canvas generation binding
12. settings overlay additive composition
13. debug overlay additive composition
14. passive/interactive pointer-event policy
15. GameplayHudProjectionResult
16. required-versus-mounted surface receipts
17. stale route/snapshot rejection
18. HUD route retirement receipt
19. FirstPlayingHudFrameAck
20. world/HUD revision convergence
21. solo active-run browser fixture
22. host active-run browser fixture
23. client active-run browser fixture
24. settings/debug preservation fixtures
25. completion and route-retirement fixtures
26. source/build/deployed-origin parity
27. retained minimap DPR, audio, lifecycle, protocol and movement gaps
```

## Current coverage gap

```txt
PLAYING objective: no
PLAYING anomaly sequence: no
PLAYING held item: no
PLAYING player/session status: no
PLAYING minimap canvas: no
PLAYING settings/debug: yes
COMPLETED full HUD/minimap: yes
HUD mount generation: no
HUD projection result: no
first active-run HUD frame acknowledgement: no
browser fixture: no
```

## Failure path

```txt
accepted PLAYING state
  -> HUDOverlay enters PLAYING branch
  -> early return mounts settings/debug only
  -> gameplay surfaces are skipped
  -> GameCanvas queries runtime-minimap
  -> query returns null
  -> drawMinimapFrame exits without drawing
  -> world frame renders without a matching complete HUD result
```

## Required invariants

```txt
PLAYING mounts every required gameplay HUD surface
settings and debug are additive rather than substitutive
minimap canvas exists before admitted draw work
HUD and world frames bind the same accepted route and snapshot revisions
terminal presentation does not define active-run surface availability
route retirement rejects late projection and minimap work
```

## Retained gaps

All previous minimap backing-store, page-lifecycle, settings, device-control, proof provenance, loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, movement, prediction, snapshot, interaction, terminal outcome, debug, audio and deployment findings remain open.

## Do not claim

Do not claim a runtime fix, active HUD availability, minimap availability, gameplay guidance correctness, visual equivalence, browser parity or production readiness until implementation and fixtures pass on `main`.
# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T23-18-16-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime startup acquisition, rollback and clean retry
6. runtime readiness leases and generation fencing
7. render-surface resolution, revision and frame correlation
8. snapshot acceptance ordering and monotonic revision
9. explicit interaction targets and cube/slot claims
10. active-run disconnect, player retirement and reconnect claims
11. monotonic terminal outcome authority
12. host network cadence and fixed simulation authority
13. host movement admission and client reconciliation
14. snapshot delivery, payload budgeting and backpressure authority
15. authoritative randomness, checkpoint and replay authority
16. replicated pause/resume convergence
```

## Current render-surface gap

```txt
main WebGL DPR policy: capped at 1
minimap DPR policy: uncapped browser DPR
main CSS size source: live mount dimensions
resize ingress: startup, ResizeObserver and window resize
aggregate surface command/result: absent
surface revision: absent
actual physical-size readback: absent
zero-area typed result: absent
frame/capture correlation: absent
```

`resizeRenderer()` directly mutates the renderer, camera, composer and bloom pass. It returns silently when the mount has no area. The minimap samples device scale independently during frame drawing. No product pixel budget or common quality policy joins those paths.

## Missing surface authority

```txt
surface policy identity and quality tier
runtime/mount/surface identity
resize observation and source identity
monotonic surface revision
DPR floor, cap and maximum physical-pixel budget
capability fallback result
resize coalescing and stale-observation rejection
renderer/composer/camera/minimap adapter results
actual drawing-buffer and target-size readback
zero-area lifecycle result
surface debug projection and journal
visible-frame and capture correlation
zero-area, DPR parity and resize-storm fixtures
```

## Consequences

```txt
main view and minimap can follow different scale rules
multiple callbacks can mutate the same surface without ordering evidence
zero-area observations leave stale physical buffers as implicit current state
simulation and networking can continue while no current visible surface exists
rendering readiness does not prove a valid current surface
frames and captures cannot identify which resize result produced them
performance and quality decisions are hidden constants rather than product policy
```

## Retained gaps

The prior startup, readiness, randomness, snapshot-delivery, network-cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open. This audit does not supersede them.

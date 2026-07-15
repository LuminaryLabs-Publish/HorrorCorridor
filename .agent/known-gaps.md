# HorrorCorridor Known Gaps

**Updated:** `2026-07-15T02-00-17-04-00`

## Summary

The highest current product gap is device-control action coverage. The normalized input model is complete enough for movement, look, interaction and pause, but the browser host supplies those actions only from keyboard and pointer-lock mouse input.

## Plan ledger

**Goal:** prioritize complete device action coverage while retaining every previous lifecycle, loading, session, transport, protocol, movement, interaction, rendering and proof finding.

- [x] Preserve previous audits.
- [x] Add and route the device-control gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. device capability snapshot and control-profile identity
2. required action-set manifest
3. touch movement producer
4. touch look producer
5. touch interact control
6. touch pause and settings separation
7. pointer capture and cancellation
8. movement dead zone and look sensitivity policy
9. hybrid keyboard/mouse/touch arbitration
10. duplicate action suppression
11. held-action retirement on blur, hide and route exit
12. semantic labels and control hit targets
13. normalized PlayerInputState routing
14. control-generation rejection
15. DeviceControlAdmissionResult
16. FirstDeviceControlSurfaceFrameAck
17. FirstDeviceActionEffectFrameAck
18. touch-only movement/look/interact fixture
19. hybrid-input conflict fixture
20. source/build/deployed-origin parity
21. retained multiplayer movement and interaction authority gaps
```

## Current coverage gap

```txt
keyboard movement: yes
keyboard interact: yes
keyboard pause: yes
pointer-lock mouse look: yes
touch movement: no
touch look: no
touch interact: no
touch pause: no
hybrid arbitration: no
device admission result: no
first control-surface frame receipt: no
first action-effect frame receipt: no
```

## Failure path

```txt
touch-only player enters PLAYING
  -> PointerLockGate offers mouse capture instructions
  -> no keyboard producer exists on the device
  -> no touch movement or look surface is mounted
  -> PlayerInputState movement axes remain zero
  -> no interact command can be produced
  -> maze and anomaly loop cannot be completed
```

## Retained gaps

All previous page-lifecycle, settings, proof provenance, loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, movement, prediction, snapshot, interaction, terminal outcome, debug and deployment findings remain open.

## Do not claim

Do not claim touch playability, semantic mobile controls, hybrid-input safety, visible action convergence or production parity until the authority and fixtures pass on `main`.

# HorrorCorridor Known Gaps

**Updated:** `2026-07-16T16-00-12-04-00`

## Summary

The highest current undocumented boundary is remote-player snapshot presentation. Accepted network state reaches both visual surfaces, but neither surface consumes a bounded interpolation result.

## Intent

Prioritize coherent remote-actor projection while retaining every earlier networking, input, lifecycle, rendering, motion, audio, determinism and deployment finding.

## What needs to happen

```txt
1. authoritative sample identity
2. snapshot receive-time evidence
3. bounded per-actor sample history
4. stale and duplicate sample rejection
5. actor retirement generation
6. interpolation clock
7. bounded interpolation delay
8. shortest-arc yaw interpolation
9. pitch interpolation policy
10. position interpolation policy
11. teleport threshold
12. history reset after teleport
13. bounded extrapolation duration
14. loss timeout and freeze policy
15. packet reorder handling
16. late sample recovery
17. one immutable RemoteActorPoseSet
18. Three.js remote-player projection binding
19. Canvas2D minimap projection binding
20. projection revision parity
21. RemoteActorSampleAdmissionResult
22. RemoteActorProjectionResult
23. FirstSmoothedMultiplayerFrameAck
24. steady-cadence fixture
25. jitter fixture
26. packet-loss fixture
27. packet-reorder fixture
28. teleport fixture
29. actor-retirement fixture
30. source/build/Pages parity fixture
31. retained motion, pointer-lock, HUD, audio, lifecycle, protocol and deployment gaps
```

## Current coverage gap

```txt
host snapshot cadence: 50 ms
client snapshot replacement: present
remote Three.js mesh direct pose copy: present
remote minimap direct pose copy: present
sample history: absent
interpolation clock: absent
teleport policy: absent
bounded extrapolation: absent
shared 3D/minimap pose result: absent
smoothed multiplayer frame acknowledgement: absent
```

## Failure path

```txt
network delivery spacing varies
  -> latest authoritative snapshot is replaced
  -> remote mesh and marker retain the old pose
  -> next accepted pose is copied immediately
  -> visible motion can step or jitter
  -> no typed projection result explains the frame
```

## Required invariants

```txt
authoritative gameplay state remains snapshot-owned
local prediction remains independent of remote interpolation
presentation never invents unbounded motion
stale and reordered samples never move an actor backward
teleports are immediate and clear incompatible history
Three.js and minimap consume the same projection revision
retired actors own no remaining sample buffers or visible projections
```

## Retained gaps

All previous pointer-lock, HUD, minimap sizing, motion preference, audio, page lifecycle, settings, device-control, loading, host-start, WebGL recovery, session, transport, protocol, movement validation, snapshot acceptance, interaction, terminal outcome, debug, ooze determinism and deployment findings remain open.

## Do not claim

Do not claim smooth multiplayer motion, network-jitter tolerance, packet-loss resilience, 3D/minimap convergence, browser parity or production readiness until implementation and fixtures pass on `main`.
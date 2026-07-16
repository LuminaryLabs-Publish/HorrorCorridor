# HorrorCorridor Known Gaps

**Updated:** `2026-07-16T07-03-14-04-00`

## Summary

The highest current undocumented boundary is motion-preference ownership. The active renderer applies camera and environmental animation continuously, but no operating-system preference, product override or accepted motion profile reaches the frame.

## Plan ledger

**Goal:** prioritize motion-policy admission while retaining every prior networking, input, lifecycle, rendering, audio, determinism and proof finding.

- [x] Preserve previous audits.
- [x] Add and route the motion-preference gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. prefers-reduced-motion capability observer
2. product override: system normal reduced
3. preference source identity
4. DocumentRevision
5. RouteRevision
6. PreferenceRevision
7. PolicyRevision
8. FrameRevision
9. essential versus ornamental motion classifier
10. accepted CameraMotionProfile
11. accepted EnvironmentalMotionProfile
12. accepted TransitionMotionProfile
13. camera side-bob policy
14. camera vertical-bob policy
15. camera-roll policy
16. emissive-pulse policy
17. opacity-pulse policy
18. exit-light and halo pulse policy
19. live media-query change settlement
20. duplicate evidence suppression
21. stale route/policy rejection
22. policy retirement and listener cleanup
23. MotionProjectionResult
24. FirstReducedMotionGameplayFrameAck
25. normal/reduced simulation parity hash
26. source browser fixture
27. production-build browser fixture
28. deployed-origin browser fixture
29. retained pointer-lock HUD minimap audio lifecycle protocol movement snapshot determinism and deployment gaps
```

## Current coverage gap

```txt
camera bob/roll: present
scene and texture pulses: present
exit light/halo pulses: present
per-frame world update: present
OS motion observer: absent
product override: absent
motion classifier: absent
live preference result: absent
reduced-motion frame acknowledgement: absent
browser fixture: absent
```

## Failure path

```txt
user requests reduced motion
  -> runtime has no capability observer
  -> renderer receives no alternate policy
  -> elapsed-time camera and environmental motion continues
  -> no typed result or visible-frame proof exists
```

## Required invariants

```txt
authoritative gameplay state is independent of motion preference
movement collision interaction and networking remain semantically identical
ornamental motion consumes one accepted policy per frame
live preference changes do not reset the run
retired routes publish no late motion results
reduced-motion claims require visible source build and deployed proof
```

## Retained gaps

All previous pointer-lock, HUD, minimap, audio, page-lifecycle, settings, device-control, loading, host-start, WebGL recovery, session, transport, protocol, movement, snapshot, interaction, terminal outcome, debug, ooze determinism and deployment findings remain open.

## Do not claim

Do not claim reduced-motion support, accessibility conformance, vestibular safety, simulation parity, frame convergence, browser parity or production readiness until implementation and fixtures pass on `main`.
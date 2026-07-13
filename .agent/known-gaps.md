# HorrorCorridor Known Gaps

**Updated:** `2026-07-13T11-58-45-04-00`

## Summary

The highest current gap is application-owned WebGL context and GPU-resource recovery. The active runtime has one renderer/composer/world generation but no context lifecycle transaction, recovery candidate, fallback, readiness convergence or recovered-frame proof. All retained session, transport, protocol, simulation, input and presentation gaps remain open.

## Plan ledger

**Goal:** place context/resource recovery authority before further presentation work while preserving every earlier multiplayer and runtime finding.

- [x] Preserve prior cross-store, join, transport, protocol, roster, lifecycle, simulation and rendering findings.
- [x] Add and centrally reconcile the WebGL recovery gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. WebGL context lifecycle identity, admission and terminal results
2. renderer/composer/world resource-generation reconstruction and atomic adoption
3. render-submission retirement while context is lost or restoring
4. rendering-readiness downgrade and WebGL-independent fallback
5. explicit solo/host/client simulation and network policy during presentation loss
6. first recovered visible-frame acknowledgement
7. cross-store session/runtime/UI transition identity and atomic commit
8. coherent room/roster/snapshot/identity/screen/readiness invariants
9. START_GAME/SYNC transition correlation and late-generation quarantine
10. room ID, join-code, host-player and host-peer allocation authority
11. room capacity, slot reservation and member admission
12. client join attempt identity, timeout, acknowledgement and cancellation
13. local bridge capability, packet admission and connection lease
14. canonical peer/player/actor binding and source admission
15. transport reachability, open-state admission, retirement and replacement
16. protocol enum/range/cross-field semantic admission
17. sealed lobby start and loading-generation cancellation
18. run exit, runtime acquisition, rollback and readiness leases
19. render-surface revision and active presentation acknowledgement
20. debug capability, redaction and revocation
21. focus, visibility and held-control retirement
22. frame-failure containment and cold restart
23. canonical runtime clock and temporal provenance
24. snapshot ordering, payload budgeting and backpressure
25. interaction target and cube/slot claim authority
26. disconnect/reconnect owned-state retirement
27. monotonic terminal outcome authority
28. host cadence and fixed simulation authority
29. host movement admission and client reconciliation
30. authoritative randomness, checkpoint and replay
31. replicated pause/resume convergence
```

## Current WebGL recovery gap

```txt
WebGLRenderer generation: implicit component lifetime
EffectComposer/pass generation: implicit component lifetime
world GPU-resource generation: implicit component lifetime
application context generation: absent
application resource generation: absent
webglcontextlost/restored listeners: absent
context-loss preventDefault policy: absent
render-submission lease: absent
rendering readiness retired on loss: no
simulation/network continuation result: absent
WebGL-independent fallback: absent
recovery resource manifest: absent
recovery candidate preparation: absent
probe-frame result: absent
atomic recovered-generation adoption: absent
first recovered frame acknowledgement: absent
context-loss fixture: absent
```

## Failure paths

### Context loss during an active frame

```txt
gameplay/network work may mutate first
  -> world/minimap/debug update
  -> composer render reaches unusable context
  -> no partial-frame result
  -> callback may throw before successor RAF scheduling
  -> presentation and host/client cadence can stop without lifecycle result
```

### Opaque restoration

```txt
browser/library restoration occurs
  -> application owns no successor generation
  -> renderer/composer/world resource parity is unproven
  -> readiness can remain true throughout
  -> no probe or visible recovered-frame receipt exists
```

### Repeated loss or unmount during restoration

```txt
no recovery attempt identity
  -> no supersession/cancellation policy
  -> no candidate ownership or disposal result
  -> possible stale work cannot be classified
```

## Missing authority

```txt
RenderSurfaceId
ContextGeneration
ResourceGeneration
WebGLLifecycleState
ContextLossCommand and ContextLossResult
RenderSubmissionLease
SimulationDuringLossPolicyResult
WebGLIndependentFallbackResult
Renderer/PostProcessing/World resource manifests
RecoveryCandidate and preparation receipts
RecoveryProbeFrameResult
RecoveredGenerationCommitResult
ContextRecoveryResult
FirstRecoveredFrameAck
```

## Retained gaps

All previous cross-store transition, room identity, capacity, readiness, client join, local bridge, transport, connection, roster, lobby-start, loading, run lifecycle, clock, snapshot, input, movement, interaction, outcome, debug and deployment findings remain open.

## Do not claim

Do not claim application-owned context recovery, GPU-resource parity, bounded continuation, fallback coverage or recovered visible presentation until the authority and fixtures pass on `main`.
# HorrorCorridor Known Gaps

**Updated:** `2026-07-13T23-38-39-04-00`

## Summary

The highest current gap is loading-progress and readiness evidence. Five fixed-delay rows claim maze, raycast, object, material and lighting progress without executing or observing those systems. Bootstrap and visual construction happen after the displayed sequence, while `PLAYING` and readiness can be committed before a visible frame exists.

## Plan ledger

**Goal:** prioritize a real, cancellable loading transaction while retaining every earlier session, transport, protocol, rendering and lifecycle finding.

- [x] Preserve previous audits.
- [x] Add and route the loading-evidence gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. load command identity and expected revisions
2. immutable work plan with real subsystem steps
3. typed step results and artifact fingerprints
4. progress derived from accepted work instead of elapsed delay
5. load generation, cancellation, timeout and supersession
6. detached maze/bootstrap preparation
7. renderer, scene, post-processing and world preparation
8. evidence-backed readiness settlement and revocation
9. first render submission and visible-frame acknowledgement
10. host, solo and client loading/readiness parity
11. rollback and partial-resource retirement
12. host-start sealed roster and client convergence
13. WebGL context and GPU-resource recovery
14. cross-store session/runtime/UI atomic transition
15. room identity, capacity and join admission
16. local bridge and transport lifecycle
17. protocol semantic and source admission
18. focus, visibility and input retirement
19. snapshot ordering, budgeting and backpressure
20. interaction claim authority
21. disconnect/reconnect and outcome convergence
```

## Current loading gap

```txt
visible labels: 5
actual step commands: 0
actual step results: 0
progress source: active index plus RAF/timeout
bootstrap during rows: no
bootstrap after rows: yes
renderer/world ready before rendering flag: no
first visible frame gate: no
client load-plan parity: no
load attempt/generation: no
cancellation after await: no
rollback result: no
```

## Failure paths

### Route replacement

```txt
loading begins
  -> user returns or session changes
  -> pending RAF/timer continuation remains live
  -> later continuation can commit PLAYING
```

### Visual initialization failure

```txt
rows finish
  -> PLAYING and rendering ready commit
  -> GameCanvas mounts
  -> renderer or world creation fails
  -> no terminal load failure or predecessor restoration
```

### Client divergence

```txt
client receives SYNC
  -> marks all readiness true
  -> bypasses host/solo work plan
  -> visual construction still occurs afterward
```

## Missing authority

```txt
CorridorLoadCommand
LoadAttemptId
LoadGeneration
LoadWorkPlan
LoadStepCommand
LoadStepResult
LoadProgressSnapshot
LoadCancellationResult
BootstrapPreparationResult
RenderProviderPreparationResult
ReadinessEvidence
ReadinessRevocation
FirstRenderSubmission
FirstVisibleFrameAck
CorridorLoadResult
LoadRollbackResult
```

## Retained gaps

All previous host-start, WebGL recovery, cross-store transition, room identity, capacity, client join, transport, protocol, runtime lifecycle, clock, snapshot, input, movement, interaction, outcome, debug and deployment findings remain open.

## Do not claim

Do not claim truthful loading progress, cancellable loading, complete readiness, first-frame completion or production parity until the authority and fixtures pass on `main`.
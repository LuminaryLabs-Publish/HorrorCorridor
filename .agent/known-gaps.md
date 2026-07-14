# HorrorCorridor Known Gaps

**Updated:** `2026-07-14T16-00-05-04-00`

## Summary

The highest current product gap is browser page-lifecycle ownership. Hidden, frozen, pagehide and BFCache transitions do not settle held input, RAF, transport, snapshot, renderer or debug participants through one application-owned transaction.

## Plan ledger

**Goal:** prioritize a safe lifecycle transaction while retaining every previous settings, loading, session, transport, protocol, rendering, gameplay and proof finding.

- [x] Preserve previous audits.
- [x] Add and route the page-lifecycle gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. document, lifecycle-attempt and runtime generation identity
2. visibility/pagehide/pageshow/freeze/resume event admission
3. BFCache persisted-page classification
4. held-input retirement before hidden local work
5. pointer-lock release and fresh reacquisition
6. one accepted RAF suspension lease
7. render-clock checkpoint and restart policy
8. client-send suspension and host-publication policy
9. passive snapshot receive or bounded buffering policy
10. session and participant checkpoint fingerprint
11. renderer, world, viewport and transport revalidation
12. stale RAF, listener and transport callback rejection
13. atomic resumed participant adoption or rollback
14. PageLifecycleResult and participant receipts
15. FirstResumedRuntimeFrameAck
16. source, production-build and deployed-origin lifecycle fixtures
17. settings command and input suspension authority
18. live-agent proof provenance and retirement
19. truthful loading-progress and readiness settlement
20. sealed host-start roster and client convergence
21. WebGL context and GPU-resource recovery
22. cross-store session/runtime/UI atomic transition
23. protocol semantic and source admission
24. snapshot ordering, budgeting and backpressure
25. interaction claim authority and terminal outcome convergence
```

## Current lifecycle gap

```txt
blur handler: yes
visibilitychange: no
pagehide/pageshow: no
freeze/resume: no
BFCache classification: no
held input retired on hide: no
RAF suspension lease: no
network-send suspension policy: no
transport restore result: no
participant checkpoint: no
stale callback rejection: no
atomic resume adoption: no
first resumed frame receipt: no
```

## Failure paths

### Missed keyup

```txt
player holds W
  -> page becomes hidden
  -> keyup is not delivered
  -> input state remains true
  -> page resumes PLAYING
  -> predecessor movement can continue
```

### Implicit network catch-up

```txt
client or host becomes hidden
  -> Date.now cadence advances while RAF is throttled
  -> page resumes
  -> outbound update or publication becomes immediately due
  -> no lifecycle generation binds the work
```

### BFCache restore

```txt
pagehide persisted=true
  -> React component may remain mounted
  -> RAF, listeners, transport and GPU objects remain owned
  -> pageshow restores the same participants implicitly
  -> no revalidation or resumed-frame result exists
```

### Partial resume

```txt
renderer, transport or context is invalid after suspension
  -> no joint participant probe
  -> surviving participants can continue independently
  -> no atomic failure or recoverable fallback result exists
```

## Missing authority

```txt
DocumentGeneration
LifecycleAttemptId
RuntimeSuspensionLease
PageSuspendCommand and Result
PageResumeCommand and Result
HeldInputRetirementResult
TransportLivenessPolicyResult
SessionCheckpoint
ParticipantRevalidationResult
AtomicResumeAdoptionResult
LifecycleObservationJournal
FirstResumedRuntimeFrameAck
```

## Retained gaps

All previous settings, proof provenance, loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, runtime clock, snapshot, movement, interaction, outcome, debug and deployment findings remain open.

## Do not claim

Do not claim lifecycle safety, BFCache compatibility, multiplayer restoration, stale-input retirement, atomic resume, visible-frame convergence or production parity until the authority and fixtures pass on `main`.
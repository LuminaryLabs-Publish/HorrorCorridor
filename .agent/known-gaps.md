# HorrorCorridor Known Gaps

**Updated:** `2026-07-13T17-40-04-04-00`

## Summary

The highest current gap is multiplayer host-start admission. The host can begin from an unsealed mutable lobby, continue stale asynchronous loading, commit locally before transport convergence, and send independent start messages without client acknowledgement or first coherent multiplayer-frame proof.

## Plan ledger

**Goal:** prioritize a sealed, cancellable and rollback-safe host-start transaction while retaining every earlier session, transport, protocol, rendering and lifecycle finding.

- [x] Preserve previous audits.
- [x] Add and centrally route the host-start gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. host-start command identity and expected revisions
2. sealed roster, connected-member and all-ready policy
3. loading generation, cancellation, timeout and supersession
4. detached initial-snapshot preparation
5. client preparation and commit acknowledgements
6. START_GAME/SYNC correlation and source admission
7. aggregate host/client commit or rollback
8. first coherent multiplayer-frame acknowledgement
9. WebGL context and GPU-resource recovery
10. cross-store session/runtime/UI atomic transition
11. room identity and capacity admission
12. client join acknowledgement and cancellation
13. local bridge and transport lifecycle
14. protocol semantic admission
15. render-surface and presentation acknowledgement
16. focus/visibility/input retirement
17. frame failure containment and runtime clock
18. snapshot ordering, budgeting and backpressure
19. interaction claim authority
20. disconnect/reconnect retirement
21. outcome, pause and replay convergence
```

## Current host-start gap

```txt
host/room checks: present
all-ready connected sealed roster gate: absent
room/roster/transport revision preconditions: absent
StartAttemptId: absent
LoadingGeneration: absent
cancellation after waits: absent
initial snapshot candidate: implicit live commit
client preparation request/result: absent
client start acknowledgement: absent
START_GAME/SYNC shared correlation: absent
late/duplicate quarantine: absent
aggregate rollback: absent
first coherent participant frame acknowledgement: absent
```

## Failure paths

### Roster changes during loading

```txt
Start accepted optimistically
  -> asynchronous waits
  -> membership/readiness/connection changes
  -> stale continuation reads changed state
  -> run commits without a terminal policy result
```

### Message reordering

```txt
host commits locally
  -> START_GAME and SYNC broadcast separately
  -> client may observe either independently
  -> no shared transition identity or acknowledgement
```

### Cancellation or route replacement

```txt
host returns to title or transport changes
  -> pending loading continuation is not generation-fenced
  -> later continuation can still mutate session/runtime/UI
```

## Missing authority

```txt
HostStartCommand
StartAttemptId
LobbyRevision and SealedRosterFingerprint
LoadingGeneration and cancellation result
InitialSnapshotCandidate
ClientPrepareResult
HostStartCommitResult and ClientStartCommitResult
StartRollbackResult
LateStartMessageQuarantine
HostStartResult
FirstMultiplayerFrameAck
```

## Retained gaps

All previous WebGL recovery, cross-store transition, room identity, capacity, client join, local bridge, transport, protocol, runtime lifecycle, clock, snapshot, input, movement, interaction, outcome, debug and deployment findings remain open.

## Do not claim

Do not claim sealed-lobby start, all-ready enforcement, cancellable loading, start-message convergence, atomic multiplayer commit, rollback or visible-frame parity until the authority and fixtures pass on `main`.
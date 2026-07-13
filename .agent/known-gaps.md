# HorrorCorridor Known Gaps

**Updated:** `2026-07-13T07-00-29-04-00`

## Summary

The highest current gap is cross-store session transition coherence. Session, runtime and UI are mutated through independent setter calls, so route, lobby, gameplay, snapshot, readiness and visible presentation can temporarily or permanently cite different transitions. The retained client-join, transport, protocol, roster, simulation and rendering gaps remain open.

## Plan ledger

**Goal:** place atomic cross-store transition authority before all multi-domain route and network adoption while preserving every previously documented multiplayer gap.

- [x] Preserve prior identity, capacity, join, transport, packet, roster, lifecycle, simulation, rendering and proof findings.
- [x] Add and centrally reconcile the cross-store transition gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. cross-store session/runtime/UI transition identity, preparation and atomic commit
2. coherent room/roster/snapshot/identity/screen/readiness invariants
3. START_GAME/SYNC transition correlation and late-generation quarantine
4. first coherent visible-frame acknowledgement
5. room ID, join-code, host-player and host-peer allocation authority
6. room capacity policy, slot reservation and capacity revision
7. member candidate identity, duplicate detection and atomic admission
8. client join input, attempt identity, timeout, acknowledgement and cancellation
9. local bridge session capability and generation
10. local packet runtime schema, ID and sequence admission
11. local connection lease and canonical actor binding
12. local message and disconnect ownership
13. exact-once local broadcast fanout and per-recipient results
14. canonical lobby member, peer and gameplay-player identity
15. explicit transport mode, reachability handshake and fallback
16. actual data-channel-open admission and connection generation
17. scoped transport-error classification and exactly-once retirement
18. late connection-event quarantine and replacement supersession
19. authoritative host-message source, room and generation admission
20. protocol exact enums, ranges, unique IDs and cross-field semantic admission
21. room-roster revision, fingerprint and sealed start eligibility
22. sealed lobby start transaction and correlated initial SYNC
23. loading transition generation, cancellation and atomic commit
24. run exit, session epoch and late-message quarantine
25. runtime startup acquisition, rollback and clean retry
26. runtime readiness leases and generation fencing
27. render-surface resolution, revision and frame correlation
28. active gameplay presentation and consumer acknowledgement
29. debug-observability capability, redaction and revocation
30. focus, visibility and held-control retirement
31. runtime frame-failure containment and cold restart
32. canonical runtime clock and temporal provenance
33. snapshot acceptance ordering and monotonic revision
34. explicit interaction targets and cube/slot claims
35. active-run disconnect and reconnect claims
36. monotonic terminal outcome authority
37. host cadence and fixed simulation authority
38. host movement admission and client reconciliation
39. snapshot payload budgeting and backpressure
40. authoritative randomness, checkpoint and replay
41. replicated pause/resume convergence
```

## Current cross-store transition gap

```txt
aggregate transition command/result: absent
transition ID and generation: absent
expected session/runtime/UI revisions: absent
participant prepare receipts: absent
atomic multi-store commit: absent
rollback result: absent
setRoom already updates room.players and lobbyPlayers: yes
redundant setLobbyPlayers after setRoom: common
redundant call rewrites room.updatedAt: yes
host start uses captured room/roster after async loading: yes
host local state commits before START_GAME/SYNC broadcasts: yes
START_GAME and SYNC share transition identity: no
client START_GAME can install room before snapshot/UI/readiness: yes
GameCanvas validates session/snapshot coherence: no
HUDOverlay cites a shared participant revision: no
readiness derives from aggregate commit: no
first coherent visible-frame acknowledgement: absent
```

## Failure paths

### START_GAME without correlated SYNC

```txt
receive START_GAME
  -> install room and roster
  -> update host identity and connection
  -> retain prior/null authoritative snapshot
  -> retain prior route and readiness
  -> visible state can combine new session with predecessor runtime/UI
```

### Stale host bootstrap

```txt
host captures room and roster
  -> asynchronous loading steps run
  -> player joins, leaves or changes readiness
  -> bootstrap uses captured predecessor values
  -> no expected roster revision rejects stale candidate
```

### Partial local transition

```txt
setRoom succeeds
  -> subscribers render
  -> later runtime or UI action fails or is delayed
  -> no rollback or partial-result classification
  -> world/HUD/lobby can cite different transitions
```

## Missing authority

```txt
SessionTransitionCommand
TransitionId and generation
participant revision counters
detached session/runtime/UI candidates
room-roster coherence result
snapshot-room coherence result
identity-snapshot binding result
screen-snapshot coherence result
readiness derivation result
participant prepare/commit/rollback receipts
CrossStoreTransitionResult
START_GAME/SYNC correlation
late-generation quarantine
CoherentFrameEnvelope
FirstCoherentFrameAck
```

## Retained gaps

All previous room identity, capacity, readiness, client join, local bridge, transport, connection, roster, lobby-start, loading, lifecycle, clock, snapshot, input, movement, interaction, outcome, rendering, debug and deployment findings remain open.

## Do not claim

Do not claim atomic store adoption, stale-transition rejection, rollback safety, START_GAME/SYNC convergence or visible-state coherence until the authority and fixtures pass on `main`.
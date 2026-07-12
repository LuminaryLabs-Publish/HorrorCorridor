# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T18-31-01-04-00`

## Summary

The highest current gap is room and join-code allocation authority. The host advertises a randomly generated four-character code before proving that the corresponding PeerJS identity was acquired and before committing one canonical identity manifest.

## Plan ledger

**Goal:** preserve the ordered multiplayer authority gaps while moving room identity allocation ahead of transport, roster and message authority.

- [x] Preserve prior identity, transport, lifecycle, clock, snapshot, movement, rendering and debug findings.
- [x] Add reservation, collision, ownership, retry and visible-hosting findings.
- [ ] Implement and prove the complete multiplayer authority chain.

## Primary ordered gaps

```txt
1. room ID, join-code and host-peer allocation authority
2. canonical lobby member, peer and gameplay-player identity
3. explicit transport mode, reachability handshake and fallback
4. actual data-channel-open admission and connection generation
5. scoped transport-error classification and exactly-once retirement
6. late connection-event quarantine and replacement supersession
7. connection-to-actor binding and atomic roster membership
8. authoritative host-message source, room and generation admission
9. room-roster revision, fingerprint and sealed start eligibility
10. sealed lobby start transaction and correlated initial SYNC
11. loading transition generation, cancellation and atomic commit
12. run exit, session epoch and late-message quarantine
13. runtime startup acquisition, rollback and clean retry
14. runtime readiness leases and generation fencing
15. render-surface resolution, revision and frame correlation
16. active gameplay presentation and consumer acknowledgement
17. debug-observability capability, redaction and revocation
18. focus, visibility and held-control retirement
19. runtime frame-failure containment and cold restart
20. canonical runtime clock and temporal provenance
21. snapshot acceptance ordering and monotonic revision
22. explicit interaction targets and cube/slot claims
23. active-run disconnect and reconnect claims
24. monotonic terminal outcome authority
25. host cadence and fixed simulation authority
26. host movement admission and client reconciliation
27. snapshot payload budgeting and backpressure
28. authoritative randomness, checkpoint and replay
29. replicated pause/resume convergence
```

## Current room identity gap

```txt
random candidate generation: yes
four-character join code: yes
candidate reservation: absent
PeerJS ownership proof before lobby projection: absent
collision-specific classification: absent
bounded retry generation: absent
partial-resource rollback: absent
canonical room identity manifest: absent
late predecessor event quarantine: absent
first accepted-hosting frame receipt: absent
```

## Failure path

```txt
candidate code is advertised
  -> PeerJS ID acquisition fails or collides
  -> generic peer/error is emitted
  -> lobby retains the code
  -> local bridge may remain available
  -> clients cannot distinguish accepted global identity from partial local identity
```

## Missing authority

```txt
room identity generation and fingerprint
join-code normalization and reservation
PeerJS peer-ID ownership admission
local-bridge identity binding
collision and unavailable-ID results
bounded retry and supersession
partial resource cleanup
atomic manifest commit
bounded observations and journal
first accepted-hosting frame acknowledgement
```

## Retained gaps

All previous transport, connection, roster, lobby-start, loading, lifecycle, clock, snapshot, input, movement, interaction, outcome, rendering, debug and deployment findings remain open.

## Do not claim

Do not claim globally joinable rooms, collision safety, retry safety or transport-mode identity parity until the authority and fixtures pass on `main`.
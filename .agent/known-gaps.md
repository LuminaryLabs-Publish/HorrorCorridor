# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T20-20-02-04-00`

## Summary

The highest current gap is local-bridge packet admission and exact-once fanout. The same-origin `BroadcastChannel` path trusts self-asserted packet identity and connection fields, while host broadcast produces duplicate deliveries that grow quadratically with local client count.

## Plan ledger

**Goal:** preserve the ordered multiplayer authority gaps while placing packet capability, lease ownership and exact-once local delivery before further lobby, gameplay or presentation claims.

- [x] Preserve prior room identity, transport, roster, protocol, lifecycle, clock, snapshot, movement, rendering and debug findings.
- [x] Add the local bridge packet and fanout gap.
- [ ] Implement and prove the complete multiplayer authority chain.

## Primary ordered gaps

```txt
1. room ID, join-code, host-player and host-peer allocation authority
2. local bridge session capability and generation
3. local packet runtime schema, ID and sequence admission
4. local connection lease and canonical actor binding
5. local message and disconnect ownership
6. exact-once local broadcast fanout and per-recipient results
7. canonical lobby member, peer and gameplay-player identity
8. explicit transport mode, reachability handshake and fallback
9. actual data-channel-open admission and connection generation
10. scoped transport-error classification and exactly-once retirement
11. late connection-event quarantine and replacement supersession
12. authoritative host-message source, room and generation admission
13. room-roster revision, fingerprint and sealed start eligibility
14. sealed lobby start transaction and correlated initial SYNC
15. loading transition generation, cancellation and atomic commit
16. run exit, session epoch and late-message quarantine
17. runtime startup acquisition, rollback and clean retry
18. runtime readiness leases and generation fencing
19. render-surface resolution, revision and frame correlation
20. active gameplay presentation and consumer acknowledgement
21. debug-observability capability, redaction and revocation
22. focus, visibility and held-control retirement
23. runtime frame-failure containment and cold restart
24. canonical runtime clock and temporal provenance
25. snapshot acceptance ordering and monotonic revision
26. explicit interaction targets and cube/slot claims
27. active-run disconnect and reconnect claims
28. monotonic terminal outcome authority
29. host cadence and fixed simulation authority
30. host movement admission and client reconciliation
31. snapshot payload budgeting and backpressure
32. authoritative randomness, checkpoint and replay
33. replicated pause/resume convergence
```

## Current local bridge gap

```txt
channel namespace based on join code: yes
channel namespace treated as discovery only: no
runtime packet schema validation: absent
session generation: absent
client capability/token: absent
packet ID: absent
per-lease sequence: absent
connection lease: absent
actor/connection owner binding: absent
unknown client-message connection rejection: absent
disconnect actor ownership comparison: absent
broadcast ID: absent
host posts one packet per local connection: yes
broadcast targetPeerId null: yes
client accepts every null-target packet: yes
exact-once client delivery: absent
per-recipient result: absent
first visible broadcast-frame acknowledgement: absent
```

## Failure paths

### Forged member

```txt
same-origin publisher knows join code
  -> posts client-connect with chosen actor/connection IDs
  -> host admits open connection
  -> GameShell admits chosen actor as lobby player
```

### Unowned message

```txt
publisher posts client-message with unknown connection ID
  -> host forwards peer/message without lease lookup
  -> protocol/gameplay consumers receive the packet
```

### Forged disconnect

```txt
publisher posts existing connectionId
  -> host checks connection ID existence only
  -> connection closes without proving caller ownership
```

### Quadratic broadcast

```txt
N local clients
  -> N host posts
  -> each client accepts N posts
  -> N² client events for one logical broadcast
```

## Missing authority

```txt
bridge session generation
scoped client capability
runtime packet schema
packet identity and sequence ledger
connection lease and actor binding
message/disconnect ownership admission
broadcast identity and intended recipient set
exact-once delivery and deduplication
per-recipient terminal result
bounded secret-free observations and journal
first visible local-bridge frame acknowledgement
```

## Retained gaps

All previous identity, transport, connection, roster, lobby-start, loading, lifecycle, clock, snapshot, input, movement, interaction, outcome, rendering, debug and deployment findings remain open.

## Do not claim

Do not claim local-bridge authentication, spoof resistance, connection ownership, exact-once fanout, PeerJS parity or visible multiplayer provenance until the authority and fixtures pass on `main`.
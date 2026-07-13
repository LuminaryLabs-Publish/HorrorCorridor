# HorrorCorridor Known Gaps

**Updated:** `2026-07-13T03-31-44-04-00`

## Summary

The highest current gap is client join-attempt admission. The UI and session stores treat a requested room as joined before validated input, host-presence proof or room-membership acknowledgement exists. The retained transport, protocol, roster and runtime authority gaps remain open.

## Plan ledger

**Goal:** preserve the ordered multiplayer authority gaps while placing validated, cancellable client join admission before canonical client lobby state.

- [x] Preserve prior identity, capacity, transport, packet, roster, lifecycle, simulation, rendering and proof findings.
- [x] Add the client join-attempt admission gap.
- [ ] Implement and prove the complete multiplayer authority chain.

## Primary ordered gaps

```txt
1. room ID, join-code, host-player and host-peer allocation authority
2. room capacity policy, slot reservation and capacity revision
3. member candidate identity, duplicate detection and atomic admission
4. client join input, attempt identity, timeout, acknowledgement and cancellation
5. local bridge session capability and generation
6. local packet runtime schema, ID and sequence admission
7. local connection lease and canonical actor binding
8. local message and disconnect ownership
9. exact-once local broadcast fanout and per-recipient results
10. canonical lobby member, peer and gameplay-player identity
11. explicit transport mode, reachability handshake and fallback
12. actual data-channel-open admission and connection generation
13. scoped transport-error classification and exactly-once retirement
14. late connection-event quarantine and replacement supersession
15. authoritative host-message source, room and generation admission
16. protocol exact enums, ranges, unique IDs and cross-field semantic admission
17. room-roster revision, fingerprint and sealed start eligibility
18. sealed lobby start transaction and correlated initial SYNC
19. loading transition generation, cancellation and atomic commit
20. run exit, session epoch and late-message quarantine
21. runtime startup acquisition, rollback and clean retry
22. runtime readiness leases and generation fencing
23. render-surface resolution, revision and frame correlation
24. active gameplay presentation and consumer acknowledgement
25. debug-observability capability, redaction and revocation
26. focus, visibility and held-control retirement
27. runtime frame-failure containment and cold restart
28. canonical runtime clock and temporal provenance
29. snapshot acceptance ordering and monotonic revision
30. explicit interaction targets and cube/slot claims
31. active-run disconnect and reconnect claims
32. monotonic terminal outcome authority
33. host cadence and fixed simulation authority
34. host movement admission and client reconciliation
35. snapshot payload budgeting and backpressure
36. authoritative randomness, checkpoint and replay
37. replicated pause/resume convergence
```

## Current client join gap

```txt
shared host/client join-code grammar: absent
join-code maxlength and character policy: absent
display-name bound and character policy: absent
empty input rejection: absent
provisional room installed before acknowledgement: yes
provisional roster installed before acknowledgement: yes
Joined room projection before acknowledgement: yes
accepted networking readiness before acknowledgement: yes
join attempt ID and generation: absent
bounded PeerJS connect timeout: absent
bounded host-presence timeout: absent
bounded room-admission timeout: absent
host challenge/acknowledgement: absent
local bridge one-way post reports connected: yes
typed join result: absent
idempotent cancellation receipt: absent
retry generation fence: absent
late predecessor acknowledgement quarantine: absent
first accepted-lobby visible-frame acknowledgement: absent
```

## Failure paths

### Unknown requested room

```txt
enter code X
  -> create and commit provisional room X
  -> show client lobby and Joined room X
  -> no host accepts the client
  -> no bounded timeout or typed room-unavailable result
  -> provisional membership remains until manual cleanup or an unscoped event
```

### Local bridge false acceptance

```txt
BroadcastChannel exists
  -> create channel for X
  -> post client-connect
  -> no host listener or wrong host generation
  -> client immediately emits connection-open and connected
  -> UI presents connected lobby without host presence proof
```

### Cancel and retry

```txt
attempt A starts
  -> user exits and starts attempt B
  -> callbacks carry no join-attempt generation
  -> late A event reaches shared status or message consumers
  -> B cannot distinguish predecessor ownership
```

## Missing authority

```txt
ClientJoinCommand
JoinAttemptId and generation
shared join-code schema
display-name policy
detached join candidate
explicit transport selection
bounded transport and acknowledgement deadlines
host-presence challenge
source-admitted HostJoinAck
canonical room manifest
member-admission result
atomic accepted-session commit
complete non-accepted rollback
idempotent cancellation receipt
late predecessor quarantine
bounded observations and journal
first accepted-lobby frame acknowledgement
```

## Retained gaps

All previous room identity, capacity, readiness, local bridge, transport, connection, roster, lobby-start, loading, lifecycle, clock, snapshot, input, movement, interaction, outcome, rendering, debug and deployment findings remain open.

## Do not claim

Do not claim validated join input, host presence, room membership, bounded timeout, exact cancellation, retry isolation, transport parity or accepted-lobby visible-state consistency until the authority and fixtures pass on `main`.

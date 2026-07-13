# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T22-29-30-04-00`

## Summary

The highest current gap is lobby-capacity admission. Rooms declare a maximum of four players, but all active member-intake and bootstrap paths can exceed that limit. Previous room identity, packet, transport, roster, lifecycle, simulation, rendering and proof findings remain open.

## Plan ledger

**Goal:** preserve the ordered multiplayer authority gaps while placing capacity reservations and capacity-valid roster commits before further lobby, start or presentation claims.

- [x] Preserve prior identity, transport, packet, roster, protocol, lifecycle, clock, snapshot, movement, rendering and debug findings.
- [x] Add the lobby-capacity admission gap.
- [ ] Implement and prove the complete multiplayer authority chain.

## Primary ordered gaps

```txt
1. room ID, join-code, host-player and host-peer allocation authority
2. room capacity policy, slot reservation and capacity revision
3. member candidate identity, duplicate detection and atomic admission
4. local bridge session capability and generation
5. local packet runtime schema, ID and sequence admission
6. local connection lease and canonical actor binding
7. local message and disconnect ownership
8. exact-once local broadcast fanout and per-recipient results
9. canonical lobby member, peer and gameplay-player identity
10. explicit transport mode, reachability handshake and fallback
11. actual data-channel-open admission and connection generation
12. scoped transport-error classification and exactly-once retirement
13. late connection-event quarantine and replacement supersession
14. authoritative host-message source, room and generation admission
15. room-roster revision, fingerprint and sealed start eligibility
16. sealed lobby start transaction and correlated initial SYNC
17. loading transition generation, cancellation and atomic commit
18. run exit, session epoch and late-message quarantine
19. runtime startup acquisition, rollback and clean retry
20. runtime readiness leases and generation fencing
21. render-surface resolution, revision and frame correlation
22. active gameplay presentation and consumer acknowledgement
23. debug-observability capability, redaction and revocation
24. focus, visibility and held-control retirement
25. runtime frame-failure containment and cold restart
26. canonical runtime clock and temporal provenance
27. snapshot acceptance ordering and monotonic revision
28. explicit interaction targets and cube/slot claims
29. active-run disconnect and reconnect claims
30. monotonic terminal outcome authority
31. host cadence and fixed simulation authority
32. host movement admission and client reconciliation
33. snapshot payload budgeting and backpressure
34. authoritative randomness, checkpoint and replay
35. replicated pause/resume convergence
```

## Current capacity gap

```txt
room maxPlayers value: 4
capacity policy object: absent
capacity revision/fingerprint: absent
slot reservation: absent
remote connection capacity check: absent
local client-connect capacity check: absent
placeholder capacity check: absent
store roster invariant: absent
protocol players.length relation check: absent
bootstrap capacity check: absent
full-state UI: absent
first capacity-consistent frame acknowledgement: absent
```

## Failure paths

### Connection overflow

```txt
four members already committed
  -> another unique connection-open arrives
  -> GameShell upserts another connected guest
  -> room.players exceeds maxPlayers
```

### Placeholder overflow

```txt
host presses Add guest repeatedly
  -> each request generates a unique player ID
  -> sessionStore appends every placeholder
  -> no capacity or reservation result exists
```

### Over-capacity run

```txt
over-capacity lobbyPlayers
  -> host presses Start run
  -> bootstrap maps every source member into an actor
  -> active room still declares maxPlayers = 4
  -> START_GAME and SYNC publish contradictory state
```

### Over-capacity protocol acceptance

```txt
structurally valid room with players.length > maxPlayers
  -> serializer validates maxPlayers as a finite number
  -> validates each player shape
  -> does not validate the relationship
  -> payload is accepted
```

## Missing authority

```txt
canonical room-capacity policy
room generation and capacity revision
atomic slot reservation and release
candidate source classification
identity uniqueness and connection ownership
capacity-safe store commit
capacity-aware protocol validation
capacity-valid start sealing and bootstrap
bounded observations and journal
first capacity-consistent visible frame acknowledgement
```

## Retained gaps

All previous room identity, local bridge, transport, connection, roster, lobby-start, loading, lifecycle, clock, snapshot, input, movement, interaction, outcome, rendering, debug and deployment findings remain open.

## Do not claim

Do not claim four-player enforcement, race-safe final-slot admission, protocol capacity integrity, capacity-valid bootstrap or visible roster consistency until the authority and fixtures pass on `main`.

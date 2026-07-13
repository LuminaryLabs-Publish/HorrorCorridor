# HorrorCorridor Known Gaps

**Updated:** `2026-07-13T01-08-28-04-00`

## Summary

The highest current gap is protocol semantic admission. PeerJS messages receive structural decoding, but exact enums, ranges, unique identities and relationships between envelope, room, snapshot, actor, host and tick fields are not enforced. The retained local-bridge packet gap can bypass even that decoder.

## Plan ledger

**Goal:** preserve the ordered multiplayer authority gaps while placing semantic message admission before any decoded candidate can change lobby, runtime or visible state.

- [x] Preserve prior identity, capacity, transport, packet, roster, lifecycle, simulation, rendering and proof findings.
- [x] Add the protocol semantic-admission gap.
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
15. protocol exact enums, ranges, unique IDs and cross-field semantic admission
16. room-roster revision, fingerprint and sealed start eligibility
17. sealed lobby start transaction and correlated initial SYNC
18. loading transition generation, cancellation and atomic commit
19. run exit, session epoch and late-message quarantine
20. runtime startup acquisition, rollback and clean retry
21. runtime readiness leases and generation fencing
22. render-surface resolution, revision and frame correlation
23. active gameplay presentation and consumer acknowledgement
24. debug-observability capability, redaction and revocation
25. focus, visibility and held-control retirement
26. runtime frame-failure containment and cold restart
27. canonical runtime clock and temporal provenance
28. snapshot acceptance ordering and monotonic revision
29. explicit interaction targets and cube/slot claims
30. active-run disconnect and reconnect claims
31. monotonic terminal outcome authority
32. host cadence and fixed simulation authority
33. host movement admission and client reconciliation
34. snapshot payload budgeting and backpressure
35. authoritative randomness, checkpoint and replay
36. replicated pause/resume convergence
```

## Current protocol semantic gap

```txt
exact RoomPhase validation: absent
exact ConnectionState validation: absent
exact app/game screen-state validation: absent
exact interaction action validation: absent
exact SYNC reason validation: absent
exact lobby event validation: absent
optional requestId validation: absent
integer/range policy: absent
unique collection identity checks: absent
envelope/payload room relation: absent
payload/snapshot room consistency: absent
authoritativeTick/snapshot.tick consistency: absent
host-player/room-host relation: absent
sender/actor/connection relation: absent
typed semantic admission result: absent
first semantically admitted visible-frame acknowledgement: absent
```

## Failure paths

### Contradictory SYNC

```txt
structurally valid version-1 SYNC
  -> envelope roomId, payload room and snapshot room disagree
  -> authoritativeTick differs from snapshot.tick
  -> decoder accepts
  -> room and snapshot are installed independently
  -> route, world and HUD can cite contradictory state
```

### Undeclared enum strings

```txt
payload uses an undeclared room phase, game state, action, reason or event
  -> runtime validator checks only typeof value === string
  -> message is accepted
  -> downstream branching may treat it as an unintended default path
```

### Identity and collection mismatch

```txt
message contains duplicate actor/cube/cell IDs or unknown owner references
  -> every item is structurally valid
  -> no uniqueness or canonical-reference check runs
  -> consumers receive ambiguous identity state
```

## Missing authority

```txt
protocol candidate and admission identity
exact runtime enum schemas
optional-field policy
numeric and collection budgets
unique identity and reference validation
envelope/payload relation validation
room/snapshot canonicalization
actor/source/connection binding
tick and revision consistency
typed terminal admission result
zero-mutation rejection
bounded observations and journal
first admitted visible-frame acknowledgement
```

## Retained gaps

All previous room identity, capacity, local bridge, transport, connection, roster, lobby-start, loading, lifecycle, clock, snapshot, input, movement, interaction, outcome, rendering, debug and deployment findings remain open.

## Do not claim

Do not claim protocol semantic integrity, transport parity, canonical room/snapshot convergence, zero-mutation rejection or visible-frame consistency until the authority and fixtures pass on `main`.
# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T16-39-35-04-00`

## Summary

The highest current gap is authoritative message-source admission. Structural protocol validity does not prove current host authority, active-room membership, session epoch, connection generation, monotonic authority revision or duplicate status.

## Plan ledger

**Goal:** preserve the ordered multiplayer authority gaps while elevating source-bound host-message admission after connection and actor ownership.

- [x] Preserve prior identity, transport, lifecycle, clock, snapshot, movement, rendering and debug findings.
- [x] Add explicit host-source, sender, room, session, generation and duplicate findings.
- [x] Reconcile repo-local and central audit state.
- [ ] Implement and prove complete multiplayer authority and convergence.

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. explicit transport mode, reachability handshake and fallback
3. actual data-channel-open admission and connection generation
4. scoped transport-error classification and exactly-once retirement
5. late connection-event quarantine and replacement supersession
6. connection-to-actor binding and atomic roster membership
7. authoritative host-message source, room and generation admission
8. room-roster revision, fingerprint and sealed start eligibility
9. sealed lobby start transaction and correlated initial SYNC
10. loading transition generation, cancellation and atomic commit
11. run exit, session epoch and late-message quarantine
12. runtime startup acquisition, rollback and clean retry
13. runtime readiness leases and generation fencing
14. render-surface resolution, revision and frame correlation
15. active gameplay presentation and consumer acknowledgement
16. debug-observability capability, redaction and revocation
17. focus, visibility and held-control retirement
18. runtime frame-failure containment and cold restart
19. canonical runtime clock and temporal provenance
20. snapshot acceptance ordering and monotonic revision
21. explicit interaction targets and cube/slot claims
22. active-run disconnect and reconnect claims
23. monotonic terminal outcome authority
24. host cadence and fixed simulation authority
25. host movement admission and client reconciliation
26. snapshot payload budgeting and backpressure
27. authoritative randomness, checkpoint and replay
28. replicated pause/resume convergence
```

## Current message-source gap

```txt
transport event provides remotePeerId: yes
transport event provides connectionId: yes
protocol envelope provides senderId: yes
protocol envelope provides roomId: yes
serializer proves structural validity: yes
sender-to-peer consistency: absent
current-host peer consistency: absent
active-room consistency: absent
session-epoch consistency: absent
connection-generation consistency: absent
authority-revision ordering: absent
duplicate message suppression: absent
typed zero-mutation rejection: absent
first accepted-message visible-frame receipt: absent
```

## Failure paths

```txt
forged START_GAME
  -> room, roster, host identity and status can be replaced

forged SYNC
  -> authoritative snapshot, route and readiness can be replaced

wrong-room LOBBY_EVENT
  -> active room and visible roster can be replaced

late predecessor message
  -> stale connection generation can mutate successor session

duplicate host message
  -> no explicit exactly-once result exists
```

## Missing authority

```txt
authoritative message class and identity
host authority capability
message source binding
sender-to-peer binding
room binding
session epoch
transport revision
connection generation
monotonic authority revision
duplicate ledger
typed Accepted, Rejected, Stale and Duplicate result
atomic room, roster, snapshot, route and readiness commit
bounded authority observation and journal
first accepted-message visible-frame acknowledgement
```

## Consequences

```txt
structurally valid messages can be contextually unauthorized
wrong-source messages can replace client gameplay state
wrong-room messages can replace visible lobby state
stale predecessor messages can cross reconnect boundaries
duplicate delivery has no explicit exactly-once outcome
rendered state has no accepted-source provenance
local-bridge and PeerJS authority parity is unproven
```

## Retained gaps

All prior transport-mode, connection-open, transport-error, lobby-readiness, loading-transition, canonical-clock, frame-failure, input-lifecycle, presentation, debug, render-surface, startup, randomness, snapshot-delivery, cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open.

## Do not claim

Do not claim authenticated host state, wrong-room isolation, stale-message quarantine, duplicate suppression or authoritative visible frames until source admission and adversarial fixtures pass on `main`.
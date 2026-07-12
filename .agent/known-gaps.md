# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T16-29-56-04-00`

## Summary

The newest documented gap is authoritative message-source admission. Structural protocol validation currently precedes direct client state mutation, but no boundary proves that a host-class message came from the current admitted host connection, belongs to the active room or cites the current session and authority generation.

## Plan ledger

**Goal:** preserve the ordered multiplayer authority gaps while placing host-message source admission between connection/actor binding and client-authoritative state commit.

- [x] Preserve prior identity, transport-mode, channel-admission, error-retirement, loading, lifecycle, clock, snapshot, movement, rendering and debug findings.
- [x] Add explicit sender, peer, room, session, generation and authority-revision gaps.
- [ ] Implement and prove complete message-source admission.

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. explicit transport mode, reachability handshake and fallback
3. actual data-channel-open admission and connection generation
4. scoped transport-error classification and exactly-once retirement
5. late connection-event quarantine and replacement supersession
6. connection-to-actor binding and atomic roster membership
7. authoritative host-message source, room and generation admission
8. sealed lobby start transaction and correlated initial SYNC
9. loading transition generation, cancellation and atomic commit
10. run exit, session epoch and late-message quarantine
11. runtime startup acquisition, rollback and clean retry
12. runtime readiness leases and generation fencing
13. render-surface resolution, revision and frame correlation
14. active gameplay presentation and consumer acknowledgement
15. debug-observability capability, redaction and revocation
16. focus, visibility and held-control retirement
17. runtime frame-failure containment and cold restart
18. canonical runtime clock and temporal provenance
19. snapshot acceptance ordering and monotonic revision
20. explicit interaction targets and cube/slot claims
21. active-run disconnect and reconnect claims
22. monotonic terminal outcome authority
23. host cadence and fixed simulation authority
24. host movement admission and client reconciliation
25. snapshot payload budgeting and backpressure
26. authoritative randomness, checkpoint and replay
27. replicated pause/resume convergence
```

## Current message-source gap

```txt
peer/message carries remotePeerId: yes
peer/message carries connectionId: yes
protocol envelope carries senderId and roomId: yes
structural shape validation: yes
host-only message classification: implicit by consumer branch
remote peer compared with current host: no
senderId compared with host player: no
connection generation compared: no
session epoch compared: no
active room compared: no
payload room compared with envelope room: no
authority revision compared: no
duplicate authoritative message result: no
zero-mutation rejection result: no
first authoritative-message frame acknowledgement: no
```

## Failure paths

### Forged START_GAME

```txt
non-host source emits shape-valid START_GAME
  -> GameShell accepts message type
  -> room and lobbyPlayers replaced
  -> host identity updated from payload
  -> connection status becomes connected
```

### Forged SYNC

```txt
non-host source emits shape-valid SYNC
  -> room and roster replaced
  -> authoritative snapshot replaced
  -> payload gameState selects playing, paused or victory
  -> readiness becomes true
```

### Wrong-room lobby replacement

```txt
shape-valid LOBBY_EVENT cites another room
  -> no active-room admission
  -> client room and visible players replaced
```

### Late predecessor message

```txt
client reconnects to successor connection
  -> predecessor later emits SYNC or LOBBY_EVENT
  -> event has no connection-generation fence
  -> successor session can adopt predecessor state
```

## Missing authority

```txt
authoritative message ID and class
current host capability
message-source binding
sender-to-peer consistency
host-peer consistency
connection-generation admission
session epoch admission
room identity consistency
authority revision and monotonic ordering
duplicate authoritative message result
wrong-source and wrong-room rejection result
bounded authority observations and journal
first authoritative-message visible-frame acknowledgement
```

## Consequences

```txt
shape-valid data can be mistaken for trusted authority
non-host peers can potentially replace client state
wrong-room state can cross session boundaries
predecessor connections can mutate successor sessions
lobby and gameplay presentation cannot prove host provenance
client readiness can be enabled by an unadmitted source
victory, pause or active-play projection can be source-untrusted
```

## Retained gaps

All preceding transport-error, transport-mode, connection-open, lobby readiness, loading-transition, canonical-clock, frame-failure, input-lifecycle, active-presentation, debug, render-surface, startup, runtime-readiness, randomness, snapshot-delivery, cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open.

## Do not claim

Do not claim authenticated host state, wrong-room isolation, stale-message quarantine, duplicate suppression or authoritative visible frames until source admission and adversarial fixtures pass on `main`.
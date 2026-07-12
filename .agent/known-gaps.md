# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T14-22-01-04-00`

## Plan ledger

**Goal:** preserve the ordered runtime authority gaps while elevating data-channel-open and roster admission ahead of higher-level lobby, start and multiplayer correctness claims.

- [x] Preserve prior identity, transport-mode, loading, lifecycle, clock, snapshot, movement, rendering and debug findings.
- [x] Add explicit connection-candidate, open-admission and ghost-member findings.
- [ ] Implement and prove connection admission, roster revision and sealed start eligibility.

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. explicit transport mode, reachability handshake and fallback
3. actual data-channel-open admission and connection generation
4. connection-to-actor binding and atomic roster membership
5. sealed lobby start transaction and correlated initial SYNC
6. loading transition generation, cancellation and atomic commit
7. run exit, session epoch and late-message quarantine
8. runtime startup acquisition, rollback and clean retry
9. runtime readiness leases and generation fencing
10. render-surface resolution, revision and frame correlation
11. active gameplay presentation and consumer acknowledgement
12. debug-observability capability, redaction and revocation
13. focus, visibility and held-control retirement
14. runtime frame-failure containment and cold restart
15. canonical runtime clock and temporal provenance
16. snapshot acceptance ordering and monotonic revision
17. explicit interaction targets and cube/slot claims
18. active-run disconnect and reconnect claims
19. monotonic terminal outcome authority
20. host cadence and fixed simulation authority
21. host movement admission and client reconciliation
22. snapshot payload budgeting and backpressure
23. authoritative randomness, checkpoint and replay
24. replicated pause/resume convergence
```

## Current connection-admission gap

```txt
host stores connection candidate before channel open
host emits connection-open unconditionally
connection-open event has no actual-open evidence
GameShell marks guest connected and mutates room roster
lobby publication can send to zero open channels
true later open callback is suppressed by one-shot guard
error does not remove transport map entry or roster member
start bootstrap can consume ghost member
visible lobby has no roster revision or frame receipt
```

## Failure paths

### Never-open candidate

```txt
PeerJS connection callback arrives
  -> connection.open is false
  -> connection-open event still emitted
  -> guest added as connected
  -> actual open never occurs
  -> guest remains in room
```

### Delayed true open

```txt
premature event sets connectionOpenEmitted
  -> guest added before channel usable
  -> actual open callback fires later
  -> guard returns
  -> no authoritative true-open admission or lobby republish
```

### Error without close

```txt
connection emits error
  -> peer/error published
  -> connection map record remains
  -> GameShell does not remove guest
  -> connected roster can remain stale
```

### Ghost-member start

```txt
host clicks Start run
  -> no admitted-channel or all-ready gate
  -> bootstrap uses current lobbyPlayers
  -> ghost participant enters snapshot
  -> START_GAME and SYNC skip unopened connection
  -> host and client routes diverge
```

## Missing authority

```txt
connection candidate ID
connection generation
data-channel state model
actual-open observation
open admission result
identity claim and actor binding
lobby-member admission command/result
roster revision and fingerprint
atomic room membership commit
lobby publication delivery result
start eligibility result
error-only terminal retirement
ghost-member reconciliation
first visible lobby-roster frame acknowledgement
first shared gameplay-frame roster acknowledgement
```

## Consequences

```txt
visible player count can overstate reachable members
host and client room states can diverge
true channel-open transition can be lost
never-open and error-only candidates can create ghost members
host can start with participants who never receive the run
snapshot, minimap and outcomes can include unreachable actors
reconnect can collide with stale member and slot ownership
diagnostics cannot prove which roster revision was shared
```

## Retained gaps

All preceding transport-mode, loading-transition, canonical-clock, frame-failure, input-lifecycle, active-presentation, debug, render-surface, startup, readiness, randomness, snapshot-delivery, cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open.
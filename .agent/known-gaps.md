# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T12-21-38-04-00`

## Plan ledger

**Goal:** preserve the ordered runtime authority gaps while elevating transport-mode reachability ahead of higher-level multiplayer correctness claims.

- [x] Preserve prior identity, loading, lifecycle, clock, snapshot, movement, rendering and debug findings.
- [x] Add explicit transport-mode and reachability findings.
- [ ] Implement and prove transport selection, handshake and fallback.

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. explicit transport mode, reachability handshake and fallback
3. transport actor binding and message admission
4. sealed lobby start transaction and correlated initial SYNC
5. loading transition generation, cancellation and atomic commit
6. run exit, session epoch and late-message quarantine
7. runtime startup acquisition, rollback and clean retry
8. runtime readiness leases and generation fencing
9. render-surface resolution, revision and frame correlation
10. active gameplay presentation and consumer acknowledgement
11. debug-observability capability, redaction and revocation
12. focus, visibility and held-control retirement
13. runtime frame-failure containment and cold restart
14. canonical runtime clock and temporal provenance
15. snapshot acceptance ordering and monotonic revision
16. explicit interaction targets and cube/slot claims
17. active-run disconnect and reconnect claims
18. monotonic terminal outcome authority
19. host cadence and fixed simulation authority
20. host movement admission and client reconciliation
21. snapshot payload budgeting and backpressure
22. authoritative randomness, checkpoint and replay
23. replicated pause/resume convergence
```

## Current transport-mode gap

```txt
BroadcastChannel capability selects local bridge implicitly
local bridge suppresses PeerJS connection handling
client marks connected without host acknowledgement
no timeout, retry or fallback exists
no transport mode ID or revision exists
no host-presence result exists
no delivery result exists
no first visible remote-player frame receipt exists
```

## Failure paths

### Remote client

```txt
client on another device or origin
  -> BroadcastChannel exists locally
  -> local bridge selected
  -> peer.connect skipped
  -> host never receives packet
  -> client reports connected
```

### Late local host

```txt
client posts client-connect before host listener exists
  -> BroadcastChannel does not replay the packet
  -> client reports connected
  -> host roster never admits client
```

### No host

```txt
client enters any join code
  -> local bridge packet posted
  -> no acknowledgement required
  -> connected status shown despite absent host
```

## Missing authority

```txt
capability observation result
explicit transport policy
mode identity and revision
attempt identity and generation
host handshake and acknowledgement
reachability result
fallback and path-switch result
predecessor retirement
message delivery result
status projection contract
transport observation and journal
first remote-player frame acknowledgement
```

## Consequences

```txt
same-origin tests can mask broken network multiplayer
cross-device joins can never reach the host under selected path
lobby status can lie about connectivity
host and client rosters can diverge
START_GAME and SYNC can be unreachable
fallback can never recover the session
current diagnostics cannot identify the active transport path
```

## Retained gaps

All preceding loading-transition, canonical-clock, frame-failure, input-lifecycle, active-presentation, debug, render-surface, startup, readiness, randomness, snapshot-delivery, cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open.
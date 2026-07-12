# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T14-30-36-04-00`

## Plan ledger

**Goal:** preserve the ordered runtime authority gaps while elevating scoped transport-error retirement and stale-event quarantine directly after channel admission.

- [x] Preserve prior identity, transport-mode, connection-admission, loading, lifecycle, clock, snapshot, movement, rendering and debug findings.
- [x] Add explicit error-scope, terminality, retirement, replacement and late-callback findings.
- [ ] Implement and prove complete transport and session reconciliation.

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. explicit transport mode, reachability handshake and fallback
3. actual data-channel-open admission and connection generation
4. scoped transport-error classification and exactly-once retirement
5. late connection-event quarantine and replacement supersession
6. connection-to-actor binding and atomic roster membership
7. sealed lobby start transaction and correlated initial SYNC
8. loading transition generation, cancellation and atomic commit
9. run exit, session epoch and late-message quarantine
10. runtime startup acquisition, rollback and clean retry
11. runtime readiness leases and generation fencing
12. render-surface resolution, revision and frame correlation
13. active gameplay presentation and consumer acknowledgement
14. debug-observability capability, redaction and revocation
15. focus, visibility and held-control retirement
16. runtime frame-failure containment and cold restart
17. canonical runtime clock and temporal provenance
18. snapshot acceptance ordering and monotonic revision
19. explicit interaction targets and cube/slot claims
20. active-run disconnect and reconnect claims
21. monotonic terminal outcome authority
22. host cadence and fixed simulation authority
23. host movement admission and client reconciliation
24. snapshot payload budgeting and backpressure
25. authoritative randomness, checkpoint and replay
26. replicated pause/resume convergence
```

## Current transport-error gap

```txt
peer and DataConnection errors use one peer/error event shape
peer/error has no scope
peer/error has no remotePeerId
peer/error has no connectionId or generation
peer/error has no terminal or retryable classification
host error handler leaves connection in map
client error handler leaves activeConnection installed
GameShell performs no error-specific reconciliation
callbacks remain attached after error
replacement has no predecessor supersession result
late events are not generation-fenced
room and roster can remain stale
visible player rows have no disconnected/error state
```

## Failure paths

### Host error without close

```txt
DataConnection emits error
  -> peer/error published
  -> no connection record removed
  -> no connection-close event published
  -> GameShell does not remove or mark guest
  -> Start run can consume unreachable participant
```

### Client error without close

```txt
DataConnection emits error
  -> currentStatus becomes error
  -> activeConnection remains installed
  -> room and players remain visible
  -> reconnect can create replacement
  -> predecessor callbacks remain live
```

### Late predecessor open

```txt
terminal error observed
  -> predecessor not retired
  -> predecessor later emits open
  -> no generation comparison
  -> stale connection can report connected again
```

### Late predecessor close after replacement

```txt
replacement becomes active
  -> old connection later emits close
  -> close event has no connection generation
  -> current route/status or membership can be changed by predecessor
```

### Ghost-member start

```txt
host retains errored guest
  -> lobby still projects guest
  -> Start run remains enabled
  -> bootstrap creates guest actor
  -> initial messages cannot reach failed channel
```

## Missing authority

```txt
transport error ID
error scope and source
peer/connection/local-bridge classification
error-to-connection binding
connection and reconnect-attempt generations
terminality and retryability policy
exactly-once retirement command/result
handler-detachment receipt
late-event quarantine
connection supersession result
roster reconciliation command/result
truthful disconnected/error projection
start-eligibility recomputation
first visible error-state frame acknowledgement
```

## Consequences

```txt
failed connections can remain owned indefinitely
visible roster can overstate reachable participants
host and client session state can diverge
retry can overlap predecessor callbacks
stale events can mutate successor state
bootstrap can include unreachable actors
initial run delivery can omit retained participants
reconnect can collide with stale identity and slot ownership
diagnostics cannot prove complete retirement
```

## Retained gaps

All preceding transport-mode, connection-open, lobby readiness, loading-transition, canonical-clock, frame-failure, input-lifecycle, active-presentation, debug, render-surface, startup, runtime-readiness, randomness, snapshot-delivery, cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open.
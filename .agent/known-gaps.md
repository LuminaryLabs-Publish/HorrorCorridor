# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T21-21-12-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime startup acquisition, rollback and clean retry
6. runtime readiness leases and generation fencing
7. snapshot acceptance ordering and monotonic revision
8. explicit interaction targets and cube/slot claims
9. active-run disconnect, player retirement and reconnect claims
10. monotonic terminal outcome authority
11. host network cadence and fixed simulation authority
12. host movement admission and client reconciliation
13. snapshot delivery, payload budgeting and backpressure authority
14. authoritative randomness, checkpoint and replay authority
15. replicated pause/resume convergence
```

## Current startup gap

```txt
snapshot/store bootstrap: present
cosmetic loading projection: present
renderer/world/post construction: present
normal successful unmount cleanup: present
startup transaction: absent
partial-acquisition rollback: absent
first-frame readiness commit: absent
clean retry contract: absent
```

`GameShell` marks the runtime ready before `GameCanvas` exists. `GameCanvas.initializeRuntime()` sets `initialized = true` before fallible renderer, post-processing and world acquisition. The cleanup closure remains a no-op until setup completes.

## Missing startup authority

```txt
start command and admission result
session/run/epoch/runtime-generation correlation
startup phase machine
resource and callback acquisition ledger
lease identity and dependency order
partial-start failure result
reverse-order rollback plan
idempotent retirement receipts
readiness commit after first frame
stale callback rejection
retry baseline and new generation
bounded startup journal and observation
failure injection and clean retry fixtures
```

## Consequences

```txt
readiness can report success before a renderer or frame exists
partial GPU resources may survive a failed startup
listeners or observers may survive if failure lands after installation
initialized can remain true after failure and suppress retry
a first-frame exception has no startup failure result
normal cleanup and failed-start cleanup follow different ownership paths
host/client UI cannot distinguish loading, partial, failed, rolled back or committed
```

## Retained gaps

The prior randomness, snapshot-delivery, network-cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open. This audit does not supersede them.

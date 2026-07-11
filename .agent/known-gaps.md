# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T19-38-14-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime readiness leases and generation fencing
6. snapshot acceptance ordering and monotonic revision
7. explicit interaction targets and cube/slot claims
8. active-run disconnect, player retirement and reconnect claims
9. monotonic terminal outcome authority
10. host network cadence and fixed simulation authority
11. host movement admission and client reconciliation
12. snapshot delivery, payload budgeting and backpressure authority
13. authoritative randomness, checkpoint and replay authority
14. replicated pause/resume convergence
```

## Current randomness gap

```txt
seeded maze topology: present
seeded cube placement: present
seeded target sequence: present
seeded authoritative ooze stream: absent
```

`advanceOozeTrail()` defaults to `Math.random()` when no RNG is supplied. The authoritative host supplies no RNG, so decay survival, ooze height and ooze rotation depend on ambient process state and call count.

## Missing random authority

```txt
run-scoped random seed derivation
named stream identity
PRNG algorithm version
serializable stream state
monotonic draw index
simulation-step draw budget
typed draw receipts
atomic gameplay + RNG commit
snapshot checkpoint projection
save/replay checkpoint projection
restore and migration admission
bounded draw journal
frame correlation
```

## Consequences

```txt
same seed/input history can produce different ooze evolution
snapshot restore cannot prove the next random result
host migration cannot continue the exact stream
failed or duplicate steps can consume untracked draws
timing/cadence changes can alter call count and future results
debug captures cannot reconstruct why an ooze item survived or spawned
fixtures cannot prove deterministic replay beyond the seeded maze
```

## Retained transport and lifecycle gaps

The prior snapshot-delivery, network-cadence, movement, disconnect, interaction, outcome, startup and pause findings remain open. This audit does not supersede them.

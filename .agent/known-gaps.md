# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T07-41-06-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime startup acquisition, rollback and clean retry
6. runtime readiness leases and generation fencing
7. render-surface resolution, revision and frame correlation
8. active gameplay presentation, HUD/minimap reachability and consumer acknowledgement
9. debug-observability capability, redaction and revocation
10. focus, visibility and held-control retirement
11. runtime frame-failure containment, disposal and cold restart
12. canonical runtime clock and temporal provenance
13. snapshot acceptance ordering and monotonic revision
14. explicit interaction targets and cube/slot claims
15. active-run disconnect, player retirement and reconnect claims
16. monotonic terminal outcome authority
17. host network cadence and fixed simulation authority
18. host movement admission and client reconciliation
19. snapshot delivery, payload budgeting and backpressure authority
20. authoritative randomness, checkpoint and replay authority
21. replicated pause/resume convergence
```

## Current canonical-clock gap

```txt
RAF clock used for delta and visual elapsed time: yes
Date.now used for gameplay/network cadence: yes
Date.now used for snapshot and room timestamps: yes
Date.now used for ooze decay eligibility: yes
shared clock ID and revision: absent
clock discontinuity result: absent
monotonic simulation elapsed time: absent
fixed-step sequence and bounded batch result: absent
pause/resume clock policy: implicit
reset clock generation: absent
snapshot simulation-time projection: absent
render-to-simulation clock receipt: absent
```

## Backward-jump path

```txt
wall time moves behind last accepted cadence timestamp
  -> network and UI age checks can become negative
  -> authoritative publication can stall
  -> ooze decay can stall
  -> RAF movement and visuals continue
```

## Forward-jump path

```txt
wall time jumps ahead
  -> cadence and decay become immediately eligible
  -> snapshot timestamps jump
  -> gameplay changes without a corresponding simulation-step explanation
```

## Missing clock authority

```txt
runtime clock identity
clock-state revision
source identity and adapter
sample command and result
regression/jump/stall classification
simulation-time state
step sequence and work budget
pause, resume and reset generations
network/UI/ooze cadence projections
snapshot clock projection
render-time projection
frame acknowledgement and bounded clock journal
```

## Consequences

```txt
system clock maintenance can alter gameplay cadence
same inputs can produce different timing outcomes
snapshot restore depends on ambient wall time
pause/resume can inherit unbounded elapsed wall time
rendered motion and authoritative state can cite different temporal histories
current diagnostics expose values but no clock provenance
```

## Retained gaps

The preceding frame-failure, input-lifecycle, active-presentation, debug, render-surface, startup, readiness, randomness, snapshot-delivery, cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open. This audit adds canonical runtime-clock authority and does not supersede them.

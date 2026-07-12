# HorrorCorridor Known Gaps

**Updated:** `2026-07-12T09-38-46-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. loading transition generation, cancellation and atomic commit
5. run exit, session epoch and late-message quarantine
6. runtime startup acquisition, rollback and clean retry
7. runtime readiness leases and generation fencing
8. render-surface resolution, revision and frame correlation
9. active gameplay presentation, HUD/minimap reachability and consumer acknowledgement
10. debug-observability capability, redaction and revocation
11. focus, visibility and held-control retirement
12. runtime frame-failure containment, disposal and cold restart
13. canonical runtime clock and temporal provenance
14. snapshot acceptance ordering and monotonic revision
15. explicit interaction targets and cube/slot claims
16. active-run disconnect, player retirement and reconnect claims
17. monotonic terminal outcome authority
18. host network cadence and fixed simulation authority
19. host movement admission and client reconciliation
20. snapshot delivery, payload budgeting and backpressure authority
21. authoritative randomness, checkpoint and replay authority
22. replicated pause/resume convergence
```

## Current loading-transition gap

```txt
async loading steps: five RAF + timeout pairs
loading command ID: absent
loading generation: absent
single-flight admission: absent
cancel/supersede result: absent
owned timeout and RAF leases: absent
sealed room/roster/readiness inputs: absent
predecessor route/session check: absent
candidate bootstrap validation: absent
atomic multi-store commit: absent
duplicate START_GAME/SYNC suppression: absent
first visible run-frame receipt: absent
```

## Stale closure path

```txt
startPlay captures room, lobbyPlayers, peerIdentity and connectionStatus
  -> await runLoadingSteps()
  -> transport/lobby state may change
  -> bootstrap uses captured predecessor values
  -> live stores and network messages receive stale start state
```

## Late completion path

```txt
loading A begins
  -> route, session or component lifetime changes
  -> no AbortSignal or generation fence is consulted
  -> loading A resumes
  -> writes session, snapshot, route and readiness after its owner is obsolete
```

## Retained-world divergence

```txt
GameCanvas initializes once from snapshot A
  -> retained maze/world geometry is built from A
snapshot B commits after initialization
  -> authoritativeSnapshot changes to B
  -> retained world is not rebuilt
  -> B can be rendered through A's topology and object inventory
```

## Missing loading authority

```txt
command and generation identity
single-flight/supersession policy
cancellation token
owned async leases
sealed predecessor revisions
candidate bootstrap
validation result
atomic commit receipt
rollback result
stale-result rejection
world/bootstrap generation parity
first visible frame acknowledgement
bounded loading journal
```

## Consequences

```txt
stale lobby membership can enter a run
cancelled loading can resurrect PLAYING state
overlapping starts can commit more than once
host can emit duplicate start/sync pairs
session, runtime and UI stores can expose mixed generations
retained world geometry can disagree with the latest snapshot
current diagnostics cannot identify which load produced the visible run
```

## Retained gaps

All preceding canonical-clock, frame-failure, input-lifecycle, active-presentation, debug, render-surface, startup, readiness, randomness, snapshot-delivery, cadence, movement, disconnect, interaction, outcome, snapshot-acceptance, lobby, exit and pause findings remain open.

# HorrorCorridor Known Gaps

**Updated:** `2026-07-16T02-40-29-04-00`

## Summary

The highest current undocumented boundary is ooze random-stream ownership. The run has a seed and the host replicates concrete ooze values, but production ooze updates consume ambient `Math.random()` and cannot publish or restore exact random identity.

## Plan ledger

**Goal:** prioritize deterministic ooze evolution while retaining every prior pointer-lock, HUD, minimap, lifecycle, loading, session, protocol, movement, audio, rendering and proof finding.

- [x] Preserve previous audits.
- [x] Add and route the ooze RNG stream/replay gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. RunGeneration
2. SeedEncodingVersion
3. RngAlgorithmId and RngAlgorithmVersion
4. RngDerivationVersion
5. isolated OozeStreamId
6. RngRevision
7. RngCursor
8. RngDrawCount
9. OozeTrailRevision
10. host-step admission against expected revisions
11. ordered random-draw purpose identity
12. deterministic decay-survival decision
13. deterministic spawn-height decision
14. deterministic spawn-rotation decision
15. idempotent duplicate command handling
16. stale cursor and generation rejection
17. snapshot RNG-state serialization
18. exact restore to next draw
19. legacy snapshot migration/rejection policy
20. canonical numeric normalization
21. canonical ooze-state hash
22. replay command log
23. OozeSimulationStepResult
24. OozeReplayResult
25. FirstSeedBoundOozeFrameAck
26. run and stream retirement receipt
27. same-seed fixture
28. different-seed fixture
29. save/restore fixture
30. stream-isolation fixture
31. duplicate/stale fixture
32. source/build/deployed-origin parity
33. retained pointer-lock, HUD, minimap, audio, lifecycle, protocol, movement and device-control gaps
```

## Current coverage gap

```txt
run seed: yes
optional injected ooze RNG: yes
production injected ooze RNG: no
ambient Math.random fallback: yes
concrete trail replication: yes
algorithm version: no
named stream: no
cursor or draw count: no
snapshot random state: no
replay hash: no
seed-bound frame acknowledgement: no
executable deterministic fixture: no
```

## Failure path

```txt
accepted run seed
  -> host reaches ooze cadence
  -> ambient PRNG state supplies draws
  -> unrelated ambient draws may alter later ooze values
  -> snapshot stores only the resulting trail
  -> restore cannot resume the exact next draw
  -> replay cannot prove the same trail from seed and commands
```

## Required invariants

```txt
one run generation owns one immutable seed identity
ooze consumes only its isolated named stream
all random draws are ordered and revisioned
snapshot restore resumes at the exact next cursor
duplicate and stale commands consume no draws
clients continue consuming accepted host state
world and minimap frames cite accepted trail and RNG revisions
retired generations cannot publish later draws
```

## Retained gaps

All previous pointer-lock, active-HUD, minimap backing-store, page-lifecycle, settings, device-control, proof provenance, loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, movement, prediction, snapshot, interaction, terminal outcome, debug, audio and deployment findings remain open.

## Do not claim

Do not claim a runtime fix, deterministic ooze, exact replay, restore correctness, stream isolation, visual convergence, browser parity or production readiness until implementation and fixtures pass on `main`.
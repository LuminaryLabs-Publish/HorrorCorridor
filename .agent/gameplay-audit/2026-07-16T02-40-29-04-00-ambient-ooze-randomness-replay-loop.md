# HorrorCorridor Ambient Ooze Randomness Replay Loop

**Timestamp:** `2026-07-16T02-40-29-04-00`

## Summary

Ooze is host-authoritative during live play, but its evolution is not reproducible from the run seed and accepted gameplay commands. Ambient random draws affect decay and decal variation without being named, versioned, serialized or replayed.

## Plan ledger

**Goal:** make ooze gameplay evolution deterministic without changing host authority or client snapshot consumption.

- [x] Trace the host/solo ooze step.
- [x] Separate live replication from replay determinism.
- [x] Identify all random decisions.
- [x] Define exact replay checkpoints.
- [ ] Implement and execute same-seed gameplay fixtures.

## Current gameplay loop

```txt
accepted run seed
  -> deterministic maze bootstrap
  -> players move through the maze
  -> host cadence reaches NETWORK_TICK_RATE
  -> advanceOozeTrail receives player positions and wall time
  -> ambient Math.random decides decay survival
  -> ambient Math.random chooses new decal height and rotation
  -> host publishes the resulting concrete trail
  -> clients and renderers consume host state
```

## Replay gap

```txt
same maze seed
same player input sequence
same accepted interaction sequence
same host tick sequence

cannot prove same ooze trail because:
  ambient PRNG state is external to the run
  algorithm version is unspecified
  draw ordering is not recorded
  cursor is not serialized
  unrelated Math.random consumers can perturb results
```

## Required gameplay checkpoints

```txt
run admitted
first ooze spawn
first decay interval
cube pickup
cube drop or placement
pause and resume
snapshot save and restore
completion or route retirement
```

At each checkpoint, compare:

```txt
host tick
trail revision
normalized trail items
RNG revision
stream cursor
draw count
canonical ooze hash
```

## Safety boundary

Clients should continue treating the accepted host snapshot as gameplay truth. The proposed authority adds reproducibility and restoration evidence; it does not move ooze mutation to clients.

No live desynchronization, gameplay defect or visual mismatch was reproduced.
# Architecture Audit: Authoritative Randomness and Replay DSK Map

**Timestamp:** `2026-07-11T19-38-14-04-00`

## Summary

HorrorCorridor uses deterministic seeded maze generation but ambient randomness for authoritative ooze behavior. This audit defines one DSK boundary for gameplay random streams, checkpoints, restore and replay.

## Plan ledger

**Goal:** map the parent domain and kit responsibilities without creating a second simulation framework.

- [x] Identify current random producers.
- [x] Identify authoritative consumers.
- [x] Identify missing state and protocol surfaces.
- [x] Define parent domain.
- [x] Define kit and service boundaries.
- [ ] Implement after fixed simulation and run/session identity are authoritative.

## Current map

```txt
createInitialGameState
  -> hashSeed(seedSource)
  -> generateMaze(seed)
  -> createSeededMazeRng
  -> deterministic topology, cubes and sequence

GameCanvas host loop
  -> advanceOozeTrail without rng
  -> Math.random
  -> decay survival, spawn height and spawn rotation
```

## Parent domain

```txt
corridor-authoritative-randomness-replay-authority-domain
```

It composes the existing run seed, future session epoch, fixed simulation step and snapshot authority. It does not own rendering, transport or general game-state mutation.

## DSK breakdown

```txt
run-random-seed-kit
random-algorithm-version-kit
named-random-stream-kit
random-stream-state-kit
random-draw-index-kit
simulation-random-budget-kit
random-draw-command-kit
random-draw-result-kit
ooze-random-stream-kit
random-checkpoint-kit
snapshot-random-checkpoint-projection-kit
random-restore-admission-kit
host-migration-random-transfer-kit
random-draw-journal-kit
random-observation-kit
deterministic-ooze-replay-fixture-kit
random-checkpoint-roundtrip-fixture-kit
host-migration-random-continuation-fixture-kit
random-frame-parity-fixture-kit
```

## Dependency order

```txt
run/session identity
  -> fixed simulation step identity
  -> named stream authority
  -> atomic state and checkpoint commit
  -> snapshot/save/replay projection
  -> migration/restore
  -> frame correlation
```

## Non-goals

```txt
do not seed cosmetic renderer noise through gameplay authority
do not reuse one stream across unrelated systems
do not infer stream position from snapshot tick
do not advance committed random state on rejected or failed commands
```

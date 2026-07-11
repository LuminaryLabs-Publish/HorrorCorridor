# Randomness Audit: Seeded Stream and Checkpoint Contract

**Timestamp:** `2026-07-11T19-38-14-04-00`

## Summary

This contract extends the existing seeded maze approach into ongoing authoritative simulation while keeping streams isolated and serializable.

## Plan ledger

**Goal:** define the canonical state, transition and persistence rules for authoritative randomness.

- [x] Define stream identity.
- [x] Define serializable checkpoint.
- [x] Define atomic commit.
- [x] Define restore and migration.
- [x] Define observation.
- [ ] Implement and fixture.

## Canonical stream state

```txt
RandomStreamCheckpoint
  algorithm: corridor-lcg-v1
  streamId: authoritative/ooze
  rootSeed
  derivedSeed
  state
  drawIndex
  checkpointRevision
  committedSimulationStep
  fingerprint
```

## Commit contract

```txt
prior game state + prior checkpoint
  -> stage random values
  -> stage ooze mutation
  -> validate invariants
  -> atomically commit game state + next checkpoint
  -> publish one result
```

No committed checkpoint advancement is allowed when gameplay mutation fails.

## Snapshot and persistence

Replication, save and replay state must carry enough information to continue the next value exactly. A compact checkpoint is sufficient; a complete draw journal may remain bounded diagnostics.

## Restore and migration

```txt
candidate checkpoint
  -> algorithm support
  -> stream identity
  -> run and epoch ownership
  -> revision monotonicity
  -> fingerprint validation
  -> install atomically with gameplay snapshot
```

## Observation

Expose only immutable summaries and bounded receipts. Do not expose a callable RNG through the public host or debug surfaces.

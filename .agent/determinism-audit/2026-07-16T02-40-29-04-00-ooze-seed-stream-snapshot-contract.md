# HorrorCorridor Ooze Seed Stream Snapshot Contract

**Timestamp:** `2026-07-16T02-40-29-04-00`

## Summary

A replayable ooze system needs more than the existing maze seed and concrete trail array. It needs a versioned named stream, exact cursor state, draw ordering, trail revision and checkpoint hash serialized with authoritative state.

## Plan ledger

**Goal:** define the minimum deterministic schema for creation, publication, save, restore, replay and retirement of ooze randomness.

- [x] Identify missing random identity fields.
- [x] Define stream derivation and isolation.
- [x] Define snapshot and restore invariants.
- [x] Define canonical hashing.
- [ ] Implement schema migration and deterministic fixtures.

## Required identity

```txt
RunGeneration
SeedValue
SeedEncodingVersion
RngAlgorithmId
RngAlgorithmVersion
RngDerivationVersion
OozeStreamId = "ooze-trail"
RngRevision
RngCursor
RngDrawCount
OozeTrailRevision
HostTickRevision
```

## Stream derivation

```txt
oozeSeed = derive(
  runSeed,
  "ooze-trail",
  rngDerivationVersion
)
```

The ooze stream must be isolated from maze topology, cube placement, target sequence, entity identity, audio, rendering and diagnostics. Additional draws in those domains must not change ooze outcomes.

## Authoritative snapshot extension

```txt
oozeRandomState: {
  streamId,
  algorithmId,
  algorithmVersion,
  derivationVersion,
  cursor,
  drawCount,
  rngRevision,
  trailRevision,
  canonicalHash
}
```

## Restore contract

```txt
RestoreOozeRandomStateCommand
  -> validate run generation and seed
  -> validate algorithm and derivation versions
  -> validate trail revision and canonical hash
  -> restore exact next cursor
  -> reject partial or incompatible records
  -> publish RestoreOozeRandomStateResult
```

## Canonical hash input

```txt
run generation
seed identity
algorithm and derivation versions
stream id
cursor and draw count
trail revision
ordered normalized trail items:
  x z y rotY scale
```

Use a declared numeric normalization policy before hashing so source, production builds and deployed Pages compare identical values.

## Replay invariants

```txt
same accepted seed and commands -> same checkpoint hashes
different seed -> permitted divergence
save then restore -> next draw matches uninterrupted run
retry same seed -> initial stream state matches
unrelated stream draws -> no ooze change
duplicate step command -> no additional draws
retired generation -> no accepted draw or frame
```

## Migration policy

Older snapshots without `oozeRandomState` cannot claim exact replay. They must be explicitly classified as legacy, migrated with a declared approximation policy, or rejected for deterministic replay.

No schema implementation, migration, restore or hash fixture was executed.
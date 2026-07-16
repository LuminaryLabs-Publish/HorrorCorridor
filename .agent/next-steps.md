# HorrorCorridor Next Steps

**Updated:** `2026-07-16T02-40-29-04-00`

## Summary

The next implementation should remove ambient randomness from host-authoritative ooze evolution. A named, versioned stream must own every decay and visual-variation draw, serialize its exact next cursor and prove the first matching world/minimap frame.

## Plan ledger

**Goal:** implement one complete seeded ooze lifecycle with deterministic save, restore, replay and source/build/deployed proof.

- [ ] Define `RunGeneration`, `SeedValue`, `RngAlgorithmVersion`, `RngDerivationVersion` and `OozeStreamId`.
- [ ] Derive an isolated `ooze-trail` stream from the accepted run seed.
- [ ] Replace `resolveRng(input.rng ?? Math.random)` in production execution with an admitted stream provider.
- [ ] Keep explicit RNG injection for pure unit fixtures.
- [ ] Define `RngRevision`, `RngCursor`, `RngDrawCount` and `OozeTrailRevision`.
- [ ] Admit each host ooze step against expected run, host-tick, trail and RNG revisions.
- [ ] Record ordered purposes for decay-survival, spawn-height and spawn-rotation draws.
- [ ] Publish `OozeRandomDrawResult` and `OozeSimulationStepResult`.
- [ ] Make duplicate step commands idempotent without consuming new draws.
- [ ] Serialize algorithm, derivation, stream, cursor, draw count and trail revision with authoritative snapshots.
- [ ] Define a legacy-snapshot migration or explicit deterministic-replay rejection policy.
- [ ] Restore the exact next random draw after save/load or reconnect recovery.
- [ ] Isolate ooze draws from maze, audio, rendering, diagnostics and entity identity streams.
- [ ] Define a canonical numeric normalization and ooze-state hash.
- [ ] Bind world and minimap rendering to accepted trail and RNG revisions.
- [ ] Publish `FirstSeedBoundOozeFrameAck` after the first matching visible frame.
- [ ] Retire the stream once on completion, title exit, session replacement and runtime cleanup.
- [ ] Reject late draws and replay work from retired run generations.
- [ ] Add same-seed, different-seed, retry, restore, duplicate, stale, stream-isolation and retirement fixtures.
- [ ] Prove source, production-build and deployed-origin parity.

## Checkpoints

```txt
Checkpoint A
  all production ooze draws use the named stream

Checkpoint B
  same seed and accepted commands produce identical checkpoint hashes

Checkpoint C
  save and restore resume at the exact next cursor

Checkpoint D
  unrelated random consumers cannot change ooze outcomes

Checkpoint E
  duplicate or stale commands consume no draws

Checkpoint F
  accepted step results produce FirstSeedBoundOozeFrameAck

Checkpoint G
  source build and deployed origin produce matching hashes
```

## Retained work

Previous pointer-lock, active-HUD, minimap, audio, lifecycle, loading, protocol, movement, device-control, render and deployment findings remain open. The ooze RNG authority composes with rather than replaces those boundaries.

## Do not claim

Do not claim deterministic ooze evolution, exact restore, same-seed replay, stream isolation, visible-frame convergence or production parity until the fixture matrix passes.
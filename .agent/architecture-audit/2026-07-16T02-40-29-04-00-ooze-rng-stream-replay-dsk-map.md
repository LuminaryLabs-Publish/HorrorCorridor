# HorrorCorridor Ooze RNG Stream Replay DSK Map

**Timestamp:** `2026-07-16T02-40-29-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Status:** `ooze-rng-stream-replay-authority-audited`

## Summary

The maze bootstrap has an explicit seed, but ooze simulation does not consume the seeded maze RNG or another named deterministic stream. Host-authoritative ooze decay and visual variation fall back to ambient `Math.random()`, and replicated snapshots carry only the resulting trail values.

## Plan ledger

**Goal:** define one DSK boundary that owns ooze random identity, draw order, state revision, replay and visible-frame acknowledgement.

- [x] Trace host cadence into `advanceOozeTrail()`.
- [x] Confirm the optional RNG is omitted by the host.
- [x] Confirm ambient fallback controls decay, height and rotation.
- [x] Confirm snapshots omit RNG algorithm, stream and cursor.
- [x] Preserve all existing runtime kits.
- [x] Define the parent domain and coordinating kits.
- [ ] Implement and prove the contract.

## Current ownership map

```txt
seeded-maze-rng-kit
  -> maze topology
  -> cube placement
  -> target sequence
  -> does not own ooze evolution

corridor-animation-loop-kit
  -> RAF cadence
  -> wall-time delta and elapsed time

corridor-authoritative-publication-kit
  -> host tick and snapshot publication

GameCanvas host cadence
  -> invokes advanceOozeTrail
  -> supplies nowMs and playerPositions
  -> supplies no rng

ooze-trail-domain-kit
  -> resolveRng(input.rng)
  -> fallback Math.random
  -> random decay survival
  -> random spawn height
  -> random spawn rotation
  -> trail spacing and capacity

runtime-store-snapshot-kit
  -> stores concrete oozeTrail and oozeLevel
  -> stores no ooze RNG state

corridor-render-world-kit and corridor-minimap-kit
  -> render concrete trail values
  -> acknowledge no seed or draw revision
```

## Parent authority

```txt
corridor-ooze-rng-stream-replay-authority-domain
```

## Coordinating kits

| Planned kit | Responsibility |
|---|---|
| `run-generation-identity-kit` | bind one run lifetime and reject retired work |
| `run-seed-derivation-policy-kit` | normalize seed and derive independent named streams |
| `ooze-rng-algorithm-version-kit` | freeze the PRNG algorithm and serialization version |
| `ooze-rng-stream-identity-kit` | own the `ooze-trail` stream identity |
| `ooze-rng-state-kit` | hold cursor, draw count and expected RNG revision |
| `ooze-random-draw-command-kit` | admit and record ordered random draws |
| `ooze-spawn-decision-kit` | deterministically settle spawn eligibility |
| `ooze-decay-decision-kit` | deterministically settle retained/decayed items |
| `ooze-visual-parameter-kit` | derive height and rotation from accepted draws |
| `ooze-trail-revision-kit` | version trail mutation independently from render state |
| `host-ooze-step-admission-kit` | admit one host step against expected revisions |
| `replicated-ooze-rng-state-kit` | publish the accepted stream state with authoritative state |
| `snapshot-rng-cursor-kit` | serialize and restore cursor/draw count |
| `ooze-replay-command-log-kit` | retain accepted step inputs and outcomes |
| `canonical-ooze-hash-kit` | hash normalized trail and RNG state checkpoints |
| `first-seed-bound-ooze-frame-ack-kit` | prove the first matching world/minimap frame |
| `ooze-rng-retirement-kit` | retire stream state exactly once |
| `same-seed-ooze-fixture-kit` | prove same-seed and same-command equivalence |
| `stream-isolation-fixture-kit` | prove unrelated random draws cannot perturb ooze |
| `source-build-pages-ooze-parity-kit` | compare source, production build and deployed origin |

## Required transaction

```txt
OozeSimulationStepCommand
  -> bind RunGeneration SeedValue RngAlgorithmVersion OozeStreamId
  -> require expected RngRevision TrailRevision HostTickRevision
  -> bind wall-time policy and accepted player positions
  -> consume deterministic draws in declared order
  -> settle decay spawn and visual parameters atomically
  -> publish OozeSimulationStepResult
  -> persist next cursor and draw count
  -> render matching world and minimap frames
  -> publish FirstSeedBoundOozeFrameAck
```

## Invariants

```txt
one run has one immutable seed identity
one ooze stream has one algorithm version
all ooze random draws are ordered and revisioned
snapshot restore resumes at the exact next draw
unrelated streams cannot alter ooze outcomes
clients consume accepted host state only
render frames cite the accepted trail and RNG revisions
retired run generations cannot publish later draws
```

## Validation boundary

Documentation only. No runtime extraction, PRNG implementation, schema migration, replay execution or browser parity proof was performed.
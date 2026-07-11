# Render Audit: Ooze RNG State and Frame Provenance Gap

**Timestamp:** `2026-07-11T19-38-14-04-00`

## Summary

The rendered ooze trail contains authoritative random outputs, but frame and debug records cannot identify the random checkpoint that produced those values.

## Plan ledger

**Goal:** correlate visible ooze geometry with the committed simulation and random-stream revisions that generated it.

- [x] Trace ooze fields in replicated snapshots.
- [x] Trace world and debug-frame projection.
- [x] Confirm snapshots include output values only.
- [x] Define required frame provenance.
- [ ] Add runtime correlation and visual fixtures.

## Current flow

```txt
ambient random values
  -> oozeTrail item y, rotY and survival
  -> ReplicatedGameSnapshot.oozeTrail
  -> world.update(snapshot)
  -> render
```

The snapshot exposes `tick`, `timestampMs`, `oozeTrail` and `oozeLevel`. It does not expose stream ID, algorithm version, draw index or checkpoint fingerprint.

## Gap

```txt
visible ooze item
  can cite snapshot tick
  cannot cite random draw receipt
  cannot cite committed RNG checkpoint
  cannot prove deterministic regeneration
```

## Required frame evidence

```txt
runSessionId
sessionEpoch
simulationStep
snapshotRevision
randomAlgorithmVersion
oozeStreamId
oozeCheckpointRevision
oozeDrawIndex
oozeStateFingerprint
frameNumber
presentedAtMs
```

## Required behavior

- The renderer consumes only committed ooze state.
- A debug frame reports the checkpoint associated with that state.
- Replay and restored sessions produce the same ooze fingerprint at the same step.
- Cosmetic animation time remains separate from gameplay random state.

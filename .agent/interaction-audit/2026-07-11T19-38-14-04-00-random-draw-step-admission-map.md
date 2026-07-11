# Interaction Audit: Random Draw and Simulation-Step Admission Map

**Timestamp:** `2026-07-11T19-38-14-04-00`

## Summary

Random values are currently implicit function calls. They need explicit admission against run, epoch, fixed step, stream and expected draw index.

## Plan ledger

**Goal:** make random consumption an observable simulation command rather than ambient process behavior.

- [x] Identify current implicit random sites.
- [x] Define admission inputs.
- [x] Define result states.
- [x] Define duplicate and stale behavior.
- [ ] Implement after fixed-step identity exists.

## Admission map

```txt
RandomDrawCommand
  runSessionId
  sessionEpoch
  simulationStep
  streamId
  purpose
  expectedCheckpointRevision
  expectedDrawIndex
  count
```

```txt
admit
  -> validate active run and epoch
  -> validate current simulation step
  -> validate stream and algorithm version
  -> validate expected checkpoint and draw index
  -> enforce per-step random budget
  -> stage values and next stream state
  -> return receipt
```

## Result states

```txt
accepted
duplicate-with-prior-receipt
stale-step
wrong-epoch
wrong-stream
checkpoint-mismatch
draw-index-mismatch
budget-exceeded
transaction-rolled-back
```

## Interaction guarantees

- Network messages never request arbitrary random values.
- Only authoritative simulation owners consume gameplay streams.
- Duplicate command replay returns the prior receipt without advancing the stream.
- Rollback discards staged random state.
- UI and renderer receive observations, not mutable stream owners.

# HorrorCorridor Unbound Ooze RNG Visible Frame Gap

**Timestamp:** `2026-07-16T02-40-29-04-00`

## Summary

The Three.js world and Canvas2D minimap render concrete ooze values from the accepted snapshot, but the frame cannot cite the random-stream state that produced those values. Visual consistency within one host session is possible while seed-bound replay evidence remains absent.

## Plan ledger

**Goal:** bind each rendered ooze projection to accepted trail, RNG stream and host-step revisions.

- [x] Trace snapshot selection into world and minimap rendering.
- [x] Confirm concrete ooze values are available to both surfaces.
- [x] Confirm no RNG cursor or draw revision accompanies the frame.
- [x] Define the first matching frame acknowledgement.
- [ ] Implement and execute visual replay fixtures.

## Current render path

```txt
host advanceOozeTrail
  -> ambient random decisions
  -> authoritative snapshot with concrete oozeTrail
  -> renderFrame(snapshotForFrame)
  -> world.update(snapshot)
  -> drawMinimapFrame(snapshot)
  -> debug capture
  -> postProcessing.render
```

## Missing frame identity

```txt
RunGeneration: absent from frame contract
OozeStreamId: absent
RngAlgorithmVersion: absent
RngRevision: absent
RngCursor: absent
OozeTrailRevision: absent
OozeSimulationStepResultId: absent
FirstSeedBoundOozeFrameAck: absent
canonical visual checkpoint hash: absent
```

## Required frame contract

```txt
SeedBoundOozeFramePlan
  runGeneration
  snapshotRevision
  hostTickRevision
  oozeTrailRevision
  oozeStreamId
  rngAlgorithmVersion
  rngRevision
  rngCursor
  worldSurfaceGeneration
  minimapSurfaceGeneration

FirstSeedBoundOozeFrameAck
  frameId
  accepted step result id
  world frame revision
  minimap frame revision
  canonical ooze hash
```

## Claim boundary

This is not a claim that clients currently display different host snapshots. It is a proof gap: a visible frame cannot demonstrate that it came from the same deterministic random generation as a retry, restore or replay.

No runtime rendering, screenshot comparison, source/build parity or deployed-origin fixture was executed.
# Render Audit: Simulation, Publication and Frame Correlation Gap

**Timestamp:** `2026-07-11T16-38-10-04-00`

## Summary

The rendered world consumes the latest snapshot or host state, but a frame cannot identify which fixed simulation step produced that state because no authoritative fixed-step sequence exists. Snapshot tick currently increments for each publication, including publications triggered directly by client movement packets.

## Plan ledger

**Goal:** make each visible frame identify the committed simulation revision and bounded publication that supplied its state.

- [x] Trace snapshot tick creation and render consumption.
- [x] Trace frame/debug identity fields.
- [x] Identify publication-driven tick inflation.
- [x] Identify the missing simulation-step and delivery correlation.
- [ ] Add frame acknowledgement after the cadence authority exists.

## Current render chain

```txt
host client packet callback
  -> direct player-state mutation
  -> tick += 1
  -> full snapshot build
  -> broadcast
  -> latestHostSnapshot assignment

RAF
  -> select latestHostSnapshot or runtime-store snapshot
  -> world.update(snapshot)
  -> drawMinimapFrame(snapshot)
  -> record debug frame
  -> postProcessing.render()
```

## Missing identity chain

```txt
runSessionId
sessionEpoch
simulationStepSequence
committedStateRevision
snapshotPublicationSequence
snapshotRevision/fingerprint
per-peer delivery result
projection revision
rendered frame sequence
```

## Visible inconsistency risk

A packet-driven publication can advance `snapshot.tick` without running the periodic ooze branch. The frame can therefore show:

```txt
newer player pose
higher snapshot tick
unchanged ooze/system progression
```

The tick alone cannot tell whether the visible state came from a complete authoritative step or a packet-triggered partial mutation/publication.

## Current debug limitation

The debug frame records:

```txt
frame number
delta and elapsed time
screen and pointer lock
snapshot tick and timestamp
player/cube/anomaly counts
aggregate publication/update rates
```

It does not record:

```txt
input admission result
per-player accepted sequence
simulation-step sequence
systems advanced in the step
committed state revision
publication plan/result
per-peer delivery rows
first frame that consumed the publication
```

## Required frame contract

```txt
CommittedSimulationFrame
  runSessionId
  sessionEpoch
  simulationStepSequence
  stateRevision
  selectedInputSequenceSet
  advancedSystems

SnapshotPublicationReceipt
  publicationSequence
  stateRevision
  snapshotRevision
  intendedPeerSet
  deliveryRows

RenderedFrameReceipt
  renderFrameSequence
  stateRevision
  snapshotRevision
  worldAck
  minimapAck
  hudAck
  debugAck
```

## Required guarantees

```txt
rendering never treats publication count as simulation-step identity
world, minimap, HUD and debug consume one admitted snapshot revision
packet arrival cannot create a frame that claims a complete step when periodic systems did not advance
first visible frame for a publication can be identified
failed or partial publication remains distinguishable from local host rendering
```

## Fixture needs

```txt
packet-driven publication versus fixed-step frame
continuous client update stream while ooze continues advancing
multiple client updates coalesced into one committed step/frame
snapshot tick and simulation-step sequence divergence detection
partial peer delivery with correct local frame identity
```

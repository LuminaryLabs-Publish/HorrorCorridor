# HorrorCorridor Runtime Debug Publish Correlation Gap

**Timestamp:** `2026-07-10T15-31-03-04-00`

## Current render/readback path

```txt
ReplicatedGameSnapshot
  -> GameCanvas render frame
  -> world.update
  -> minimap projection
  -> post-processing render
  -> RuntimeDebugFrameRecord
```

`runtimeDebugStore.ts` already offers bounded frame and event arrays, cloning, localStorage preferences, overlay state, and a window export API.

## Gap

The debug surface can show that a snapshot was published and can show the resulting frame, but it cannot prove why that snapshot exists.

Missing fields:

```txt
commandId
correlationId
requestId
command source
command kind
authority mode
result status
result reason
semantic changed flag
publish decision
publication reason
published snapshot tick
consumer action
fixture parity status
```

## Current ambiguity

```txt
interaction event says a local request occurred
sync event says a snapshot was published
frame says a later tick was rendered
```

There is no durable join key proving those rows belong to the same causal chain. Cadence publications and command publications also look alike once reduced to a sync event and aggregate frame.

## Required additive projection

```txt
latestCommandCorrelation
recentCommandCorrelations
commandCountsBySource
commandCountsByStatus
publishCountsByDecision
correlationCompleteness
latestPublishedCommandTick
latestCadencePublicationTick
authorityParityFixtureSummary
```

## Render safety rule

Do not modify Three.js world construction, post-processing, minimap geometry, or frame cadence to add this proof. Runtime debug should consume detached JSON-safe correlation records produced by the authority domain.

## Acceptance

A browser export must be able to answer:

```txt
which command was requested?
which domain result was produced?
which authority consumer handled it?
was publication requested or skipped?
which snapshot tick was published?
was the rendered frame command-driven or cadence-driven?
```

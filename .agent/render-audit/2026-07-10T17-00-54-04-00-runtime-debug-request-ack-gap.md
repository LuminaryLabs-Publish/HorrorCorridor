# Runtime Debug Request Acknowledgement Gap

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T17-00-54-04-00`

## Current render and debug surface

The runtime renders from the latest replicated snapshot and captures aggregate frame state. Debug events are independent records with random ids.

## Gap

```txt
no source request id in frames
no pending request count
no latest authority result
no acknowledgement status
no publish decision
no acknowledged snapshot tick
no request-to-ack latency
no request-to-snapshot latency
no duplicate or timeout counters
```

The renderer itself does not need to own command semantics. The browser debug surface should project a read-only request ledger so a visual frame can be related to the command and acknowledgement that produced its source snapshot.

## Required additive projection

```txt
latestRequest
latestResult
latestPublishDecision
latestAcknowledgement
latestAcknowledgedTick
pendingRequestCount
duplicateRequestCount
timedOutRequestCount
requestToAckMs
requestToSnapshotMs
```

## Non-goal

Do not rewrite Three.js, post-processing, minimap, world building, or scene dressing for this slice.

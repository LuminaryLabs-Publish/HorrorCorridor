# Document, Runtime and Transport Resume Contract

**Timestamp:** `2026-07-14T16-00-05-04-00`

## Summary

The page must treat browser suspension as a transaction across document, runtime, transport, input and presentation generations. Browser throttling alone is not an ownership policy.

## Plan ledger

**Goal:** specify invariants for safe hide, freeze, BFCache and restore behavior.

- [x] Identify mandatory participants.
- [x] Define suspension and resume invariants.
- [ ] Implement the contract and fixture matrix.

## Mandatory identities

```txt
DocumentGeneration
SessionGeneration
RuntimeGeneration
TransportGeneration
RendererGeneration
SnapshotRevision
LifecycleAttemptId
```

## Suspension invariants

1. One accepted runtime owns at most one active RAF generation.
2. Hidden-page entry retires held input before any further local simulation or send.
3. Pointer lock is released or explicitly recorded unavailable.
4. Client player updates and interaction requests stop under the accepted lease.
5. Host publication either stops or continues under a declared authoritative policy.
6. The latest accepted snapshot and terminal outcome remain immutable checkpoint truth.
7. Persisted pagehide does not dispose participants required for BFCache unless the restore path can rebuild them.
8. Non-persisted pagehide retires transport, listeners and GPU resources with receipts.

## Resume invariants

1. Resume is bound to the current document and session generations.
2. Persisted pageshow is distinguished from a fresh route boot.
3. Predecessor RAF, transport and listener callbacks are rejected.
4. Held input remains clear until fresh user events arrive.
5. Renderer, world, viewport, post-processing and minimap are probed before adoption.
6. Transport state is validated or reconnected before local sends resume.
7. Snapshot reconciliation precedes authoritative or predictive movement.
8. Exactly one successor runtime generation is adopted.
9. The first visible frame acknowledges the adopted identities and snapshot revision.

## Failure policy

```txt
mandatory participant failure
  -> keep local commands suspended
  -> preserve accepted checkpoint truth
  -> expose recoverable UI result
  -> reconnect, rebuild or route safely
  -> never resume a partial participant set
```

## Validation boundary

No lifecycle invariant is executable or proven by this documentation-only turn.
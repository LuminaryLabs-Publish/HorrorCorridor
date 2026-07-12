# Host Identity Command and Result Reconciliation Map

**Timestamp:** `2026-07-12T18-38-51-04-00`

## Summary

The Host Game interaction currently performs direct store mutations and transport construction without a command identity, expected predecessor revision, cancellation token, or terminal allocation result.

## Plan ledger

**Goal:** replace optimistic Host Game mutation with one revision-bound command/result transaction.

- [x] Map the current interaction path.
- [x] Identify missing admission, result, rollback, and frame evidence.
- [ ] Implement the command boundary and fixture matrix.

## Current path

```txt
Host Game click
  -> enterHostLobby()
  -> destroy current transport
  -> generate room, code, player, and peer IDs
  -> mutate session, room, roster, UI, and readiness stores
  -> create host transport
  -> set connection status connecting
  -> asynchronous open/error events update generic status
```

## Missing command envelope

```txt
commandId
runtimeSessionId
sessionEpoch
expectedSessionRevision
identityGeneration
candidatePolicyRevision
transportMode
cancellationToken
retryBudget
```

## Required result types

```txt
Accepted(manifest, receipts)
Collision(candidate, reason, retryable)
Unavailable(candidate, reason, retryable)
TimedOut(candidate, deadline)
Cancelled(commandId, generation)
Stale(commandId, expectedRevision, actualRevision)
Failed(candidate, classifiedError)
```

## Admission map

```txt
Host Game evidence
  -> validate current route and runtime session
  -> reject duplicate or stale command ID
  -> allocate detached identity generation
  -> reserve candidate code
  -> acquire transport ownership
  -> validate local-bridge parity
  -> atomically commit manifest or perform zero live-store mutation
  -> publish result and observation
  -> render matching state
```

## Validation boundary

No interaction code changed. Host identity still lacks a typed command/result boundary.
# Interaction Audit: Peer Error Retirement Map

**Timestamp:** `2026-07-12T14-30-36-04-00`

## Summary

The transport event contract does not provide enough identity to convert a connection error into a safe retirement command. `peer/error` conflates peer-level and connection-level failures, and `GameShell` cannot determine which connection, actor or roster member should change.

## Plan ledger

**Goal:** normalize every transport error into a scoped, identity-bound command with a typed terminal result and no ambiguous mutation.

- [x] Inspect transport event union.
- [x] Inspect host and client error emitters.
- [x] Inspect GameShell event routing.
- [x] Identify missing identity, generation and terminality fields.
- [x] Define admitted error and retirement interactions.
- [ ] Implement and prove the interaction contract.

## Current event map

```txt
peer-level error
  -> peer/error { role, roomId, peerId, message, timestampMs, error }

DataConnection error
  -> peer/error { role, roomId, peerId, message, timestampMs, error }
```

The consumer cannot distinguish the two sources.

## Missing envelope fields

```txt
errorId
errorScope
errorCode
retryable
terminal
remotePeerId
connectionId
connectionGeneration
transportModeId
transportRevision
sessionEpoch
attemptGeneration
```

## Current consumer map

```txt
GameShell.handleTransportEvent
  peer/status           -> update global connection status
  peer/connection-open  -> add/update host guest
  peer/connection-close -> remove host guest
  peer/message          -> update room, snapshot or outcome
  peer/error            -> falls through and returns
```

## Required interaction map

```txt
raw PeerJS error callback
  -> TransportErrorEnvelope
  -> TransportErrorClassificationResult
  -> validate session, transport and connection generations

connection terminal
  -> ConnectionRetirementCommand
  -> ConnectionRetirementResult
  -> RosterReconciliationCommand
  -> RosterReconciliationResult
  -> StartEligibilityResult
  -> visible frame acknowledgement

peer signalling retryable
  -> PeerRecoveryCommand
  -> ReconnectAttemptResult
  -> status projection
  -> preserve admitted connection membership only under explicit policy
```

## Idempotency rules

```txt
same errorId twice                 -> one terminal result
error after retired generation     -> stale, zero mutation
close after terminal error         -> duplicate retirement, zero second mutation
open after terminal error          -> stale, zero mutation
old close after replacement        -> stale, replacement preserved
peer error without connection ID   -> cannot retire arbitrary member
```

## Acceptance boundary

No consumer should infer a specific connection retirement from the current `peer/error` event. The event contract must first carry or resolve the necessary scope, identity and generation.
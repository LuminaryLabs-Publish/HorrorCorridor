# Sender, Peer, Room and Generation Reconciliation Contract

**Timestamp:** `2026-07-12T16-39-35-04-00`

## Summary

Protocol structure and protocol authority are separate concerns. Decoding proves that fields exist; admission must prove that those fields agree with the current transport and session authority.

## Plan ledger

**Goal:** bind each authoritative protocol message to one current host connection, room and session generation.

- [x] Separate structural decoding from contextual admission.
- [x] Define identity and generation consistency rules.
- [x] Define stale and duplicate handling.
- [ ] Implement and prove the contract.

## Consistency rules

```txt
event.remotePeerId == currentHostPeerId
message.senderId == currentHostPlayerId
event.connectionId == currentHostConnectionId
event.connectionGeneration == currentHostConnectionGeneration
message.roomId == activeRoomId
payload.roomId == activeRoomId when present
message.sessionEpoch == currentSessionEpoch
message.transportRevision == currentTransportRevision
message.authorityRevision >= lastAcceptedAuthorityRevision
message.messageId not previously committed
```

## Result contract

```txt
Accepted
  state mutation allowed exactly once

Rejected
  identity or room mismatch
  zero mutation

Stale
  predecessor session, connection or authority revision
  zero mutation

Duplicate
  already committed message identity
  zero mutation
```

## Journal policy

Record bounded metadata only: message ID, class, source IDs, revisions, result, reason and predecessor/successor fingerprints. Do not retain unbounded full snapshots or payloads.
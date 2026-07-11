# Connection, Peer and Player Binding Contract

**Timestamp:** `2026-07-11T07-30-40-04-00`

## Plan ledger

**Goal:** define canonical ownership from a live connection through a peer and lobby member to one gameplay player.

- [x] Identify transport connection facts already available.
- [x] Identify roster/player facts required for binding.
- [x] Define admission and retirement invariants.
- [ ] Implement the binding ledger.
- [ ] Prove disconnect, reconnect and duplicate handling.

## Canonical binding record

```txt
connectionId
remotePeerId
memberId
memberKind
playerId
roomId
runSessionId
sessionEpoch
connectedRevision
lastAcceptedSequence
lastAcceptedRequestId
status: active | reconnecting | retired
```

## Admission invariants

- A connection ID belongs to one remote peer.
- A remote peer has at most one active connection admitted for gameplay.
- A peer resolves to one non-reserved lobby member.
- A member resolves to one gameplay player.
- Envelope sender and payload player must match the bound player.
- Retired connections cannot send accepted commands.
- Reconnect creates or transfers authority through a typed transaction, not an implicit overwrite.
- Duplicate connections return a stable conflict result.

## Retirement invariants

```txt
disconnect
  -> mark binding retired
  -> reject later callbacks from that connection
  -> preserve bounded terminal observation
  -> apply explicit member/player disconnect policy
  -> never transfer ownership from message claims alone
```

## Observability

The host debug surface should expose active bindings, retired bindings, last accepted sequence, rejection counts and the exact reason for each bounded rejected message without exposing mutable internal references.
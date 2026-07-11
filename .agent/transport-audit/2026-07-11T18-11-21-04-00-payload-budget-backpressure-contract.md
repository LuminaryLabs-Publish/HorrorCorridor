# Transport Audit: Payload Budget and Backpressure Contract

**Timestamp:** `2026-07-11T18-11-21-04-00`

## Summary

The host transport contract exposes `broadcast(message): number` and `sendTo(peer, message): boolean`. Those shapes cannot express payload cost, intended recipients, partial success, queue pressure, exception state or slow-peer policy.

## Plan ledger

**Goal:** define the transport capabilities and results required by snapshot delivery authority without leaking PeerJS-specific behavior into gameplay domains.

- [x] Inspect `HostTransportAdapter`.
- [x] Inspect `createHost.sendMessage()` and `broadcast()`.
- [x] Inspect BroadcastChannel parity behavior.
- [x] Identify missing capability and result fields.
- [x] Define transport-neutral backpressure contract.
- [ ] Implement and fixture-test the contract.

## Current contract

```txt
broadcast(message) -> number
sendTo(remotePeerId, message) -> boolean
connections -> remotePeerId, connectionId, label, open
```

## Current send behavior

```txt
if !connection.open -> false
connection.send(JSON string)
return true
```

No typed result is produced when `send()` throws, buffers internally, stalls or accepts data that has not reached the remote peer.

## Required transport capability

```txt
PeerSendCapability
  connection ID
  remote peer ID
  actor binding
  open/closing/closed state
  pending buffered bytes
  queue depth
  oldest queued age
  maximum accepted payload bytes
  supports delta/compression/acknowledgement
```

## Required transport result

```txt
PeerSendResult
  publication ID
  connection and peer identity
  status
  reason
  attempted bytes
  pending bytes before/after
  started/completed timestamps
  duration
  exception code/category
  retry eligibility
```

## Required policy

```txt
healthy peer -> send now
closed peer -> closed result
near budget -> defer or coalesce
above budget -> backpressured result
send exception -> failed result and continue remaining plan
persistent pressure -> isolate, degrade or disconnect
newer payload -> supersede stale queued payload under explicit revision policy
```

## Required guarantees

```txt
transport implementation details remain behind typed capabilities/results
one peer failure cannot abort unattempted peers silently
BroadcastChannel and PeerJS paths produce equivalent result semantics
queue and retry work remain bounded
transport pressure is observable by publication authority and diagnostics
```

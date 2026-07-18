# Peer Signalling Recovery Contract

**Timestamp:** `2026-07-17T09-17-19-04-00`

## Source contract gap

The host and client adapters subscribe to PeerJS `disconnected` and publish `reconnecting`. They do not invoke `peer.reconnect()`, schedule a retry, expose a reconnect method, or publish attempt and settlement results.

The public transport interfaces expose connect, send, disconnect and destroy operations, but no reconnect command or recovery observation.

## Required state

```txt
TransportGeneration
SignallingState
DataPathState
ReconnectAttemptId
ReconnectGeneration
AttemptOrdinal
AttemptDeadline
TerminalIntentRevision
LastReconnectResult
LastRecoveredMessageRevision
LastRecoveredFrameRevision
```

## Required policy

```txt
involuntary signalling loss
  -> observe active data channels
  -> admit bounded reconnect attempt
  -> retain active channels unless policy retires them

explicit disconnect or destroy
  -> publish terminal intent before PeerJS side effect
  -> reject later reconnect admission
  -> ignore stale disconnected/open events

reconnect success
  -> restore signalling capability
  -> prove host can accept or client can create connections
  -> require recovered protocol and frame evidence before full recovery claim

reconnect failure
  -> retry only within budget and deadline
  -> settle failed, timed-out, cancelled or terminal
```

## Minimum results

```txt
SignallingDisconnectResult
DataChannelLivenessResult
ReconnectAdmissionResult
ReconnectAttemptResult
ReconnectSettlementResult
RecoveredTransportProjectionResult
FirstRecoveredMessageAck
FirstRecoveredRemotePlayerFrameAck
```

## External API note

PeerJS documents that signalling disconnection leaves existing peer connections alive, prevents creation or acceptance of new connections, and can be recovered by calling `peer.reconnect()` on a disconnected peer. This audit uses that distinction; it does not assume existing gameplay data channels have failed.

## Validation boundary

No reconnect implementation or network fixture was added.
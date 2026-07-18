# Reconnecting Status Without Recovered Frame Gap

**Timestamp:** `2026-07-17T09-17-19-04-00`

## Finding

The transport adapters can publish `reconnecting` immediately after signalling loss. `GameShell` maps that value into session connection state, but no explicit reconnect attempt, settled recovery result, recovered protocol message or matching remote-player frame is required.

```txt
signalling lost
  -> peer/status reconnecting
  -> session connectionStatus reconnecting
  -> existing gameplay/render loop may continue
  -> no attempt-bound recovery evidence
  -> no first recovered visible frame acknowledgement
```

PeerJS distinguishes signalling-server availability from existing peer-to-peer DataConnections. A visible status therefore cannot infer either total gameplay failure or complete recovery from the signalling event alone.

## Missing frame authority

```txt
TransportGeneration
ReconnectAttemptId
ReconnectGeneration
RecoveredMessageRevision
RecoveredSnapshotRevision
RenderedRemoteActorRevision
FirstRecoveredMessageAck
FirstRecoveredRemotePlayerFrameAck
```

## Required projection rule

The UI may show bounded states such as `signalling unavailable`, `data path retained`, `reconnect attempting`, `recovered` or `closed`, but `recovered` must require a settled attempt plus matching protocol and visible-frame evidence.

## Claim boundary

No visual reconnect bug was reproduced. This is a source-backed status-to-frame correlation gap.
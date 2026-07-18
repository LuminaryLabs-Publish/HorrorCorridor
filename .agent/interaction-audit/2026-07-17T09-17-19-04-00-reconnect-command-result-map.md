# Reconnect Command and Result Map

**Timestamp:** `2026-07-17T09-17-19-04-00`

## Current event map

```txt
peer disconnected event
  -> currentStatus = reconnecting
  -> peer/status event
  -> session connectionStatus = reconnecting
```

No command owns the transition and no result closes it.

## Required map

```txt
SignallingDisconnectCommand
  inputs:
    TransportGeneration
    SessionRevision
    PeerId
    explicitTerminalIntent
    activeDataConnections
    observedAt
  result:
    SignallingDisconnectResult
    classification = involuntary | explicit | destroyed | indeterminate
    dataPath = retained | lost | mixed | unknown

ReconnectAdmissionCommand
  inputs:
    DisconnectResultId
    expectedTransportGeneration
    policy
    attemptBudget
    deadline
  result:
    ReconnectAdmissionResult
    accepted | rejected | duplicate | stale | terminal

ReconnectAttemptCommand
  inputs:
    ReconnectAttemptId
    ReconnectGeneration
    PeerId
  effect:
    peer.reconnect()
  result:
    ReconnectAttemptResult

ReconnectSettlementCommand
  inputs:
    matching open | error | close evidence
  result:
    recovered | failed | cancelled | timed-out | stale | indeterminate

RecoveredTransportProjectionCommand
  -> connection status
  -> FirstRecoveredMessageAck
  -> FirstRecoveredRemotePlayerFrameAck
```

## Arbitration rules

```txt
explicit disconnect wins over later disconnected events
only one active attempt per transport generation
attempt results cannot cross route or session replacement
open settles signalling recovery but not remote gameplay recovery
recovered gameplay requires a matching protocol message and rendered frame
```

## Scope boundary

This is a proposed command/result contract. No API or runtime behavior was added.
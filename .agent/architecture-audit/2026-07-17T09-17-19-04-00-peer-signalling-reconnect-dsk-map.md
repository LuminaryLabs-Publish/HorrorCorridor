# Peer Signalling Reconnect DSK Map

**Timestamp:** `2026-07-17T09-17-19-04-00`  
**Status:** documentation-only

## Current composition

```txt
corridor-session-domain
  -> room, roster, peer identity, connection status, readiness

peer-host-transport-kit
  -> PeerJS peer
  -> optional BroadcastChannel path
  -> DataConnection registry
  -> status and message events

peer-client-transport-kit
  -> PeerJS peer
  -> optional BroadcastChannel path
  -> active DataConnection
  -> status and message events

GameShell
  -> maps PeerTransportStatus into session connectionStatus
  -> projects lobby and route state
```

## Current disconnect path

```txt
PeerJS disconnected event
  -> adapter writes reconnecting
  -> event bus publishes peer/status
  -> GameShell writes session reconnecting
  -> no recovery command is admitted
  -> no peer.reconnect call is issued
  -> no result settles the status
```

## Required parent domain

```txt
corridor-peer-signalling-reconnect-admission-settlement-authority-domain
```

## Required DSK split

```txt
n:corridor:transport:signalling-recovery
├─ disconnect-classification
├─ data-channel-liveness
├─ reconnect-policy
├─ attempt-identity
├─ attempt-generation
├─ backoff-deadline
├─ cancellation
├─ peerjs-reconnect-adapter
├─ stale-result-rejection
├─ explicit-close-arbitration
├─ host-acceptance-readiness
├─ client-connect-readiness
├─ recovery-settlement
├─ status-projection
├─ recovered-message-proof
└─ recovered-frame-proof
```

## Command/result contract

```txt
SignallingDisconnectCommand
  -> SignallingDisconnectResult

ReconnectAdmissionCommand
  -> ReconnectAdmissionResult

ReconnectAttemptCommand
  -> ReconnectAttemptResult

ReconnectSettlementCommand
  -> ReconnectSettlementResult

RecoveredTransportProjectionCommand
  -> RecoveredTransportProjectionResult
  -> FirstRecoveredMessageAck
  -> FirstRecoveredRemotePlayerFrameAck
```

## Invariants

```txt
reconnecting means an admitted attempt exists
explicit disconnect cannot be rewritten as reconnecting by a late event
existing DataConnections are observed independently from signalling health
only one attempt generation can settle
stale open, close and error events cannot mutate a replacement transport
host acceptance and client new-connection capability are separately proven
visible recovered status requires matching message and frame evidence
```

## Scope boundary

This audit does not change transport mode selection, protocol semantics, gameplay state, rendering or deployment.
# Architecture Audit: Transport Error Retirement DSK Map

**Timestamp:** `2026-07-12T14-30-36-04-00`

## Summary

The current PeerJS adapters expose failures as undifferentiated `peer/error` events. Connection-level errors cannot be bound to a connection owner or generation, so terminal cleanup, roster reconciliation and retry supersession are not authoritative.

## Plan ledger

**Goal:** introduce one bounded domain that classifies transport failures and coordinates exactly-once retirement across transport, session, lobby, gameplay admission and visible projection.

- [x] Identify existing transport, event, session and lobby owners.
- [x] Separate peer-signalling failure from DataConnection failure.
- [x] Define error and connection generations.
- [x] Define terminal and retryable policies.
- [x] Define retirement, reconciliation and stale-event quarantine.
- [x] Define typed results, journals and frame acknowledgements.
- [ ] Implement the domain and fixtures.

## Existing composition

```txt
peer-host-transport-kit
  -> PeerJS host
  -> connection map
  -> broadcast/send/disconnect/destroy

peer-client-transport-kit
  -> PeerJS client
  -> activeConnection
  -> connect/send/disconnect/destroy

peer-event-bus-kit
  -> status/open/connection-open/connection-close/message/error events

corridor-session-domain-kit
  -> room
  -> lobbyPlayers
  -> connectionStatus

corridor-application-shell-kit
  -> consumes transport events
  -> owns lobby and run transitions
```

## Current boundary violation

```txt
DataConnection error
  -> emitted through peer/error
  -> no connection identity
  -> no connection generation
  -> no terminality decision
  -> no retirement command/result
  -> no roster reconciliation
```

Peer-level signalling errors use the same shape, so a consumer cannot safely decide whether to preserve admitted channels, reconnect signalling, retire one channel or tear down the complete transport.

## Required parent domain

```txt
corridor-transport-error-retirement-authority-domain
```

## Candidate DSK composition

### Identity and scope

```txt
transport-error-id-kit
transport-error-scope-kit
connection-generation-kit
connection-error-binding-kit
```

Services:

```txt
allocate stable error identity
classify peer, connection or local-bridge scope
bind remote peer and connection ID
bind current session and connection generations
reject ambiguous or stale bindings
```

### Classification and policy

```txt
transport-error-classification-kit
connection-terminal-policy-kit
peer-signalling-recovery-kit
```

Services:

```txt
classify terminal, retryable, stale or duplicate
separate signalling availability from data-channel health
select preserve, reconnect, retire or full teardown policy
return a deterministic policy decision
```

### Retirement ownership

```txt
connection-retirement-command-kit
connection-retirement-admission-kit
connection-retirement-result-kit
connection-handler-detachment-kit
late-connection-event-quarantine-kit
```

Services:

```txt
admit one revisioned retirement command
detach callbacks
close connection exactly once
remove host-map or client-active ownership
retire generation
reject late open, close, data and error callbacks
publish typed accepted, stale, duplicate or failed result
```

### Replacement and recovery

```txt
client-reconnect-attempt-kit
connection-supersession-kit
```

Services:

```txt
allocate replacement-attempt generation
atomically supersede predecessor connection
preserve only explicitly admissible state
reject predecessor callbacks after replacement
```

### Session and roster reconciliation

```txt
roster-reconciliation-command-kit
roster-reconciliation-result-kit
session-status-projection-kit
```

Services:

```txt
resolve connection-to-actor binding
apply named remove, disconnected or grace policy
atomically update room and lobbyPlayers
increment roster revision and fingerprint
recompute start eligibility
project truthful connection and membership state
```

### Observation and proof

```txt
transport-failure-observation-kit
transport-failure-journal-kit
first-error-state-frame-ack-kit
```

Services:

```txt
publish bounded error and retirement observations
record scope, generations, policy, result and timings
correlate visible lobby/status frame with retirement and roster revisions
```

### Fixtures

```txt
host-error-without-close-fixture-kit
client-error-without-close-fixture-kit
peer-vs-connection-error-fixture-kit
late-open-after-error-fixture-kit
replacement-connection-stale-close-fixture-kit
start-after-error-fixture-kit
```

## Required transaction

```txt
TransportErrorEnvelope {
  errorId
  sessionEpoch
  transportModeId
  transportRevision
  scope
  peerId
  remotePeerId?
  connectionId?
  connectionGeneration?
  observedAtMs
  errorCode?
}

  -> validate current session and transport generations
  -> bind error to peer or connection owner
  -> classify terminality and retryability
  -> return TransportErrorPolicyResult

terminal connection
  -> reserve retirement revision
  -> detach callbacks
  -> close exactly once
  -> remove transport ownership
  -> retire connection generation
  -> reconcile actor binding, room and lobbyPlayers atomically
  -> recompute sealed start eligibility
  -> publish ConnectionRetirementResult
  -> publish RosterReconciliationResult
  -> acknowledge first visible frame

retryable signalling failure
  -> preserve admitted data channels only under explicit policy
  -> allocate reconnect attempt generation
  -> supersede old attempt atomically
  -> reject late predecessor events
```

## Domain boundaries

This domain does not own maze simulation, movement, rendering or protocol payload semantics. It owns the transport-failure decision and the cross-domain transaction required to ensure failed connections cannot remain authoritative participants.

## Acceptance boundary

Do not claim reliable multiplayer recovery until connection errors carry scope and generation, terminal failures retire exactly once, roster state reconciles atomically, predecessor callbacks are quarantined and browser fixtures prove the visible result.
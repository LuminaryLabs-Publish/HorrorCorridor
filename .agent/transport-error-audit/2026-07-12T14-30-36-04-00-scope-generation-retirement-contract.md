# Transport Error Audit: Scope, Generation and Retirement Contract

**Timestamp:** `2026-07-12T14-30-36-04-00`

## Summary

Transport failure handling needs a first-class contract because PeerJS can report errors at peer and DataConnection scopes, while close may be delayed or absent. Current adapters neither bind connection errors to owner generations nor retire them.

## Plan ledger

**Goal:** define the exact state machine, command envelope, terminal results and late-event rules for host and client transport failures.

- [x] Define failure scopes.
- [x] Define connection and attempt generations.
- [x] Define terminality policy.
- [x] Define host and client ownership retirement.
- [x] Define session and roster reconciliation.
- [x] Define late-event quarantine and fixture matrix.
- [ ] Implement the contract.

## Failure scopes

```txt
peer-signalling
  PeerJS peer cannot reach or maintain signalling service.

peer-terminal
  Peer instance is invalid, destroyed or cannot recover.

connection
  One DataConnection fails independently of the peer.

local-bridge
  One BroadcastChannel-derived logical connection is invalid or retired.

codec-or-message
  Data channel remains usable, but one payload is rejected.
```

A codec or message failure must not be promoted to connection retirement without explicit policy. A connection failure must not automatically destroy unrelated admitted channels. A peer-terminal failure may retire all owned channels through one aggregate result.

## Connection lifecycle

```txt
created
opening
open-observed
admitted
error-observed
retirement-pending
retired
superseded
```

Only the current generation may transition. `retired` and `superseded` are terminal.

## Required error envelope

```txt
TransportErrorEnvelope {
  errorId: string
  errorScope: peer-signalling | peer-terminal | connection | local-bridge | codec-or-message
  role: host | client
  sessionEpoch: number
  transportModeId: string
  transportRevision: number
  peerId: string | null
  remotePeerId: string | null
  connectionId: string | null
  connectionGeneration: number | null
  attemptGeneration: number | null
  observedAtMs: number
  code: string | null
  message: string
}
```

## Required policy result

```txt
TransportErrorPolicyResult {
  errorId
  classification: terminal | retryable | stale | duplicate | rejected
  action: preserve | reconnect-peer | retire-connection | retire-all | reject-message
  expectedConnectionGeneration
  expectedRosterRevision
  reason
}
```

## Host retirement

```txt
terminal connection result
  -> find exact map entry by connectionId and generation
  -> detach open, data, close and error callbacks
  -> remove map ownership
  -> close once
  -> retire connection-to-actor binding
  -> reconcile room and lobbyPlayers atomically
  -> publish player-disconnected or player-left result
  -> recompute start eligibility
```

A failed lookup must not remove another connection sharing the same remote peer ID.

## Client retirement

```txt
terminal active connection result
  -> compare connectionId and generation with activeConnection
  -> detach callbacks
  -> clear active ownership
  -> close once
  -> move status to disconnected or error under named policy
  -> preserve or clear room state under named session policy
  -> allocate reconnect attempt only after retirement commit
```

## Late-event rules

```txt
open after terminal error       -> stale
close after retirement          -> duplicate
message after retirement        -> stale
error after retirement          -> duplicate or stale
old close after replacement     -> stale
old open after replacement      -> stale
replacement error               -> evaluated against replacement generation only
```

All stale and duplicate results perform zero authoritative mutation.

## Roster policies

```txt
remove
  Remove actor/member immediately.

disconnected-slot
  Preserve named slot but mark disconnected and ineligible for start.

grace-period
  Preserve for bounded deadline with explicit reconnect capability.
```

The product must choose one policy. The current implicit behavior preserves a connected-looking member indefinitely and is not an acceptable named policy.

## Observation contract

```txt
error observation
policy decision
retirement start
handler detachment
transport owner release
roster reconciliation
retry or terminal result
first visible state frame
```

Each observation cites error, session, transport, connection, roster and frame revisions.

## Fixture matrix

```txt
host connection error followed by no close
client connection error followed by no close
connection error followed by close
connection error followed by late open
peer signalling error with admitted channels
peer terminal error with multiple channels
replacement connection then predecessor close
connection ID reuse under new generation
error during loading transition
error during active run
start while retirement pending
```

## Acceptance boundary

The transport is not recoverable or safely terminal until every error is scoped, bound to a current generation, reduced to one typed policy result and followed by complete ownership and session reconciliation.
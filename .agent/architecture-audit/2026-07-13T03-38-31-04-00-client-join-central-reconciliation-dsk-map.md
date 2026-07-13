# Client Join Attempt Central Reconciliation DSK Map

**Timestamp:** `2026-07-13T03-38-31-04-00`

## Summary

Client joining currently spans UI, session stores, transport adapters and lobby presentation without one semantic owner. The missing parent domain must keep requested room data detached until a source-admitted host acknowledgement produces one terminal result.

## Plan ledger

**Goal:** define the domain boundary, kit responsibilities and dependency order needed to turn raw join intent into one atomic accepted or rejected result.

- [x] Trace current ownership.
- [x] Separate existing provider kits from missing authority kits.
- [x] Define command, result, commit, rollback and visible-frame responsibilities.
- [ ] Implement the DSK family.

## Current ownership split

```txt
JoinMenu
  owns raw input and submit activation

GameShell.enterClientLobby
  normalizes input
  creates provisional identities and room
  commits stores and lobby projection
  creates transport

peer-client-transport-kit
  owns PeerJS and BroadcastChannel mechanics
  emits status, open, close, message and error events

corridor-session-domain-kit
  stores canonical room, roster, identity and connection state

lobby-screen-presentation-kit
  projects room, roster, readiness and controls
```

No existing kit owns the complete semantic transaction.

## Required parent domain

```txt
corridor-client-join-attempt-admission-authority-domain
```

### Owns

```txt
join command identity
typed input policy
attempt generation and lifecycle
explicit transport selection
host-presence challenge
room-admission acknowledgement
canonical room manifest validation
terminal result classification
atomic accepted-state commit
non-accepted rollback and cleanup
late predecessor quarantine
bounded observation and journal
first accepted-lobby frame acknowledgement
```

### Does not own

```txt
PeerJS implementation details
BroadcastChannel implementation details
maze generation
gameplay simulation
Three.js rendering
HUD or minimap drawing
```

## Candidate kit family

```txt
client-join-command-kit
join-attempt-id-kit
join-attempt-generation-kit
join-code-schema-kit
display-name-policy-kit
join-intent-normalization-kit
join-candidate-kit
join-attempt-state-kit
join-attempt-timeout-kit
join-attempt-cancellation-kit
join-transport-selection-kit
host-presence-challenge-kit
host-join-ack-kit
canonical-room-manifest-kit
join-result-kit
join-session-commit-kit
join-rollback-kit
join-late-event-quarantine-kit
join-observation-kit
join-journal-kit
first-joined-lobby-frame-ack-kit
```

## Provider integration

```txt
JoinMenu
  -> emits ClientJoinCommand only

join authority
  -> asks peer-client-transport-kit to acquire transport
  -> asks protocol kits to encode challenge and decode acknowledgement
  -> asks session kit to install accepted manifest atomically
  -> asks UI kits to project Pending or terminal result
  -> asks frame observer to acknowledge accepted visible state
```

## Required immutable records

```txt
ClientJoinCommand
JoinAttemptId
JoinAttemptGeneration
JoinCandidate
JoinTransportLease
HostPresenceChallenge
HostJoinAck
CanonicalRoomManifest
JoinResult
JoinCommitReceipt
JoinRollbackReceipt
JoinedLobbyFrameAck
```

## Terminal result set

```txt
Accepted
InvalidInput
RoomUnavailable
RoomFull
Rejected
TransportUnavailable
TimedOut
Cancelled
Stale
Duplicate
Failed
```

Every attempt must enter exactly one terminal state.

## Atomic commit boundary

Accepted must install together:

```txt
session mode
local peer and player identity
canonical host identity
canonical room manifest
canonical roster and roster revision
connection generation
networking readiness
accepted-lobby route and projection revision
```

Non-accepted results must preserve the predecessor canonical session and retire provisional resources exactly once.

## Dependency order

```txt
shared input schemas
  -> attempt identity and lifecycle
  -> explicit transport lease
  -> host challenge and source admission
  -> canonical room manifest validation
  -> terminal result
  -> atomic commit or rollback
  -> visible-frame acknowledgement
```

## Validation boundary

This map documents a missing authority. It does not claim that the candidate kits exist or that current transport behavior is safe.
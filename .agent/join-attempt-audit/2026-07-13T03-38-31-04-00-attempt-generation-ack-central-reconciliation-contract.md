# Join Attempt Generation and Acknowledgement Central Reconciliation Contract

**Timestamp:** `2026-07-13T03-38-31-04-00`

## Summary

A join attempt needs a stable identity, monotonic generation, bounded lifecycle, source-admitted host acknowledgement and exactly-once terminal result. Neither PeerJS nor the local bridge currently provides this semantic contract.

## Plan ledger

**Goal:** define transport-neutral rules for pending, accepted, rejected, cancelled and stale join attempts.

- [x] Define identities and states.
- [x] Define acknowledgement and terminal results.
- [x] Define commit, rollback and retirement rules.
- [x] Define stale-event fencing.
- [ ] Implement and test the contract.

## Identities

```txt
RuntimeSessionId
ClientJoinCommandId
JoinAttemptId
JoinAttemptGeneration
TransportLeaseId
ConnectionId
ConnectionGeneration
HostPresenceChallengeId
HostJoinAckId
RoomManifestRevision
RosterRevision
```

## Attempt states

```txt
Created
Validating
Connecting
AwaitingHost
AwaitingAdmission
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

Only one terminal state is permitted.

## Host acknowledgement

```txt
HostJoinAck {
  ackId
  challengeId
  joinAttemptId
  joinAttemptGeneration
  hostPeerId
  hostPlayerId
  roomManifest
  roomManifestRevision
  rosterRevision
  admittedMember
  capacityDecision
  connectionGeneration
  issuedAtMs
}
```

The acknowledgement must be source-admitted against the active transport lease and expected host identity before it can be consumed.

## Accepted result

```txt
JoinResult.Accepted {
  joinAttemptId
  generation
  canonicalRoomManifest
  admittedMember
  hostIdentity
  connectionGeneration
  commitReceipt
}
```

Accepted commits session mode, identities, room, roster, connection and readiness atomically.

## Non-accepted result

```txt
JoinResult.NonAccepted {
  joinAttemptId
  generation
  status
  reasonCode
  rollbackReceipt
  retiredResources
}
```

Non-accepted results perform zero canonical room, roster, runtime or route mutation beyond the explicit pending/result projection.

## Timeout policy

Separate bounded deadlines are required for:

```txt
transport acquisition
transport open
host-presence acknowledgement
room-admission acknowledgement
```

Timeout completion must retire the transport lease and fence all later callbacks.

## Cancellation policy

```txt
cancel references active attempt and expected generation
cancel is idempotent
cancel wins only before another terminal result commits
cancel retires PeerJS DataConnection or BroadcastChannel participation
cancel publishes a receipt
late callbacks resolve Stale with zero mutation
```

## Retry policy

```txt
retry creates a new JoinAttemptId or increments generation
predecessor resources are retired before successor admission
predecessor open/error/message/ack events are rejected
successor cannot inherit provisional room or roster state
```

## Local bridge parity rule

A one-way `client-connect` post is only transport activity. It cannot mean host presence, connection acceptance or room membership. The local bridge must use the same challenge, acknowledgement and terminal-result contract as PeerJS.

## Proof obligations

```txt
exactly one terminal result per attempt
zero canonical mutation for non-Accepted
accepted manifest matches host state
accepted member fits capacity revision
all resources retired exactly once
late predecessor events rejected
first accepted lobby frame cites accepted result
```

## Validation boundary

The contract is not implemented. No transport-parity, cancellation, timeout, room-membership or visible-frame claim is made.
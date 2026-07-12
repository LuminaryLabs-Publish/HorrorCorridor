# Room Identity Manifest, Reservation, and Retry Reconciliation Contract

**Timestamp:** `2026-07-12T18-38-51-04-00`

## Summary

The room-identity contract must treat room ID, join code, host player identity, admitted peer identity, transport mode, generation, and fingerprint as one indivisible authority object. Candidate transport resources remain detached until admission succeeds.

## Plan ledger

**Goal:** define a complete lifecycle from candidate allocation through acceptance, retry, cancellation, rollback, retirement, and visible acknowledgement.

- [x] Define manifest fields and lifecycle phases.
- [x] Define retry and predecessor-fencing requirements.
- [x] Define consumer and observation contracts.
- [ ] Implement and validate.

## Canonical manifest

```txt
RoomIdentityManifest {
  runtimeSessionId
  sessionEpoch
  identityGeneration
  roomId
  joinCode
  hostPlayerId
  requestedHostPeerId
  admittedHostPeerId
  transportMode
  localBridgeId
  policyRevision
  acceptedAtMonotonicMs
  fingerprint
}
```

## Lifecycle

```txt
Idle
  -> Allocating
  -> Reserving
  -> AcquiringPeer
  -> BindingLocalBridge
  -> Validating
  -> Accepted

Any candidate phase
  -> Collision | Unavailable | TimedOut | Cancelled | Failed
  -> Retiring
  -> Retry with newer generation or terminal Idle/Failed
```

## Atomicity rules

```txt
candidate resources never become current session resources before Accepted
room, roster, peer identity, UI, and readiness commit together
failed candidate performs zero live-store identity mutation
all candidate resources retire exactly once
accepted predecessor remains valid until successor commit
late predecessor open/error/message events are rejected
retry always uses a strictly newer generation
```

## Consumer contract

```txt
lobby consumes accepted manifest only
readiness cites manifest generation
start bootstrap seals manifest fingerprint
START_GAME and SYNC cite accepted identity evidence
render snapshot cites manifest fingerprint
cleanup retires resources by generation
```

## Observation contract

```txt
bounded command/result journal
candidate attempt count
classified failure reason
retry budget remaining
current accepted generation
resource retirement receipts
first visible hosting-frame receipt
```

## Validation boundary

No runtime contract exists yet. This file is the reconciliation specification for implementation.
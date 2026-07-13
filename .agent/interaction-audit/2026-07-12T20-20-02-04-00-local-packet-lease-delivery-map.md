# Local Packet Lease and Delivery Map

**Timestamp:** `2026-07-12T20-20-02-04-00`

## Summary

Raw `BroadcastChannel` packets currently move directly into transport events. This map introduces explicit commands and results for connection admission, message admission, disconnect retirement and exact-once broadcast delivery.

## Plan ledger

**Goal:** give every local bridge interaction one typed command, ownership check, terminal result and visible-effect correlation.

- [x] Map current packet kinds.
- [x] Map their immediate state effects.
- [x] Define command and result boundaries.
- [ ] Implement the interaction services.

## Current map

```txt
client-connect
  -> LocalConnectionRecord
  -> peer/connection-open
  -> lobby player upsert

client-message
  -> peer/message
  -> protocol type switch
  -> state mutation

client-disconnect
  -> record deletion
  -> peer/connection-close
  -> lobby player removal

host-message
  -> optional target check
  -> peer/message
  -> client state replacement
```

## Required commands

```txt
OpenLocalConnectionCommand
  packetId, generation, capability, connectionId, actorClaim

SubmitLocalProtocolMessageCommand
  packetId, generation, capability, connectionId, actorClaim, sequence, message

CloseLocalConnectionCommand
  packetId, generation, capability, connectionId, actorClaim, reason

PublishLocalBroadcastCommand
  broadcastId, generation, sourceActorId, message, intendedRecipientPolicy
```

## Required results

```txt
LocalConnectionAdmissionResult
  accepted | rejected | duplicate | stale
  reason, leaseId, actorId, connectionRevision

LocalMessageAdmissionResult
  accepted | rejected | duplicate | stale | no-change
  reason, leaseId, actorId, packetId, stateChanged, committedRevision

LocalConnectionRetirementResult
  retired | rejected | duplicate | stale
  reason, leaseId, actorId, retirementRevision

LocalBroadcastDeliveryResult
  accepted | partial | rejected | duplicate | stale
  broadcastId, intended, delivered, rejected, committedRevision
```

## Admission map

```txt
raw packet
  -> schema result
  -> session-generation result
  -> capability result
  -> packet-ID/sequence result
  -> lease result
  -> actor-binding result
  -> kind-specific command result
  -> optional state commit
  -> optional fanout result
  -> visible-frame acknowledgement
```

## Required rejection reasons

```txt
malformed-packet
unknown-kind
wrong-room
wrong-generation
missing-capability
revoked-capability
unknown-connection
connection-owner-mismatch
duplicate-packet
stale-sequence
message-not-admitted
disconnect-not-owned
broadcast-recipient-mismatch
superseded-session
```

## UI projection

The lobby and diagnostics should project admitted connection state, rejected packet counts and the current bridge generation. They must not display an unverified packet claim as a connected player.

## Completion boundary

The interaction path is incomplete until every packet receives one terminal result and rejected/duplicate packets are proven to cause no state or visible-frame change.
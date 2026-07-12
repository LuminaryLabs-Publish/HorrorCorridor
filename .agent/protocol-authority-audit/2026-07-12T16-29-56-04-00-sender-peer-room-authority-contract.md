# Protocol authority audit: sender, peer and room contract

**Timestamp:** `2026-07-12T16-29-56-04-00`

## Summary

Protocol decoding currently proves version and field shape. It does not prove that the message sender is bound to the transport peer, that the transport peer is the current host, or that the message belongs to the active room and session generation.

## Plan ledger

**Goal:** separate structural decoding from contextual authority admission and require both before a host-class message can commit.

- [x] Record structural checks performed by the serializer.
- [x] Record contextual checks absent from the serializer and consumer.
- [x] Define host-only message policy.
- [x] Define sender/peer/room consistency rules.
- [x] Define typed outcomes.
- [ ] Implement protocol authority admission.

## Structural decoding currently proves

```txt
known protocol version
known message type
finite timestamp
string senderId
string roomId
record payload
message-specific payload shape
```

## Structural decoding does not prove

```txt
senderId belongs to remotePeerId
remotePeerId is the current admitted host
connectionId is current
connection generation is current
roomId is the active room
payload room matches envelope room
session epoch is current
host authority has not been superseded
message revision is monotonic
request/message ID is unique
```

## Authority policy

| Message type | Required authority |
|---|---|
| `START_GAME` | current admitted host connection only |
| `SYNC` | current admitted host connection only |
| `LOBBY_EVENT` | current admitted host connection only |
| `PLAYER_UPDATE` | connection-bound client actor or local host actor |
| `TRY_INTERACT` | connection-bound client actor or local host actor |

## Consistency contract

```txt
candidate.event.remotePeerId == session.expectedHostPeerId
candidate.message.senderId == session.expectedHostPlayerId
candidate.message.roomId == session.roomId
candidate.message.payload.room.roomId == candidate.message.roomId
candidate.connectionId == session.activeHostConnectionId
candidate.connectionGeneration == session.activeHostConnectionGeneration
candidate.sessionEpoch == session.sessionEpoch
```

For client-originating messages, `payload.playerId` and `senderId` must resolve to the actor bound to the source connection.

## Typed result

```txt
Accepted
RejectedWrongRole
RejectedWrongPeer
RejectedWrongSender
RejectedWrongRoom
RejectedUnboundActor
StaleSession
StaleConnection
StaleAuthorityRevision
Duplicate
Malformed
```

## Journal boundary

The journal stores bounded identities, revisions, result and hashes. It must not store unbounded snapshots or sensitive transport internals.

## Non-claims

The serializer remains shape-only. No authentication, cryptographic signing, source binding, room binding or generation admission is currently implemented.
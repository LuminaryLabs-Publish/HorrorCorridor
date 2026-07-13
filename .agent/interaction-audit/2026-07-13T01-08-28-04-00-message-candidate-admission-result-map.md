# Message Candidate Admission Result Map

## Summary

The current boundary maps decoded messages directly to events and state mutations. It needs a typed semantic result between structural decode and every consumer.

## Plan ledger

**Goal:** define one result map for all five protocol message types.

- [x] Map message producers, transport, decoder and consumers.
- [x] Identify semantic admission outcomes.
- [ ] Implement the result surface and consumer gates.

## Result map

```txt
raw input
  -> StructuralDecodeResult
      RejectedSyntax
      RejectedVersion
      RejectedShape
      StructurallyDecoded
  -> SemanticAdmissionResult
      Accepted
      InvalidEnum
      InvalidRange
      IdentityMismatch
      RoomMismatch
      SnapshotMismatch
      TickMismatch
      DuplicateIdentity
      Stale
      Unauthorized
      Failed
  -> MessageEffectResult
      LobbyCommitted
      StartCommitted
      PlayerUpdateCommitted
      InteractionCommitted
      SyncCommitted
      NoMutation
  -> visible-frame acknowledgement
```

## Message-specific relations

```txt
START_GAME:
  envelope.roomId == payload.room.roomId
  maxPlayers == room.maxPlayers
  hostPlayer.id == room.hostId
  sender/connection is admitted host

PLAYER_UPDATE:
  senderId == payload.playerId
  actor belongs to room and connection lease
  sequence is nonnegative integer and monotonic

TRY_INTERACT:
  action is exact declared union
  senderId == payload.playerId
  action-specific target fields are present and canonical

SYNC:
  envelope.roomId == payload.room.roomId == snapshot.room.roomId
  payload.room equals canonical snapshot room projection
  authoritativeTick == snapshot.tick
  reason is exact declared union

LOBBY_EVENT:
  event is exact declared union
  payload.players equals room.players
  optional player matches event semantics
```

## Boundary

No message-result API was implemented.
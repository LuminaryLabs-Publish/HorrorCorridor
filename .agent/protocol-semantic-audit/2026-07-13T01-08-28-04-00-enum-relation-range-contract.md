# Protocol Enum, Relation and Range Contract

## Summary

This contract defines the semantic checks that must follow structural decoding and precede message publication.

## Plan ledger

**Goal:** make semantic acceptance deterministic, transport-independent and observable.

- [x] Enumerate exact enum checks.
- [x] Enumerate numeric and collection invariants.
- [x] Enumerate cross-field relations.
- [x] Define terminal result categories.
- [ ] Implement and prove the contract.

## Exact enum checks

```txt
RoomPhase: idle | lobby | starting | active | ending | closed
ConnectionState: connecting | connected | reconnecting | disconnected
AppScreenState: START | LOADING | JOIN_MENU | LOBBY_HOST | LOBBY_CLIENT | PLAYING | PAUSED | COMPLETED
GameScreenState: loading | lobby | playing | paused | victory | failure
InteractionRequestAction: pickup-cube | drop-cube | place-cube-at-anomaly | remove-cube-from-anomaly | request-sync | toggle-ready | cancel
FullSyncReason: initial | join | resync | reconnect | recovery
LobbyEventKind: room-created | room-opened | player-joined | player-left | player-ready | player-unready | host-changed | room-closed | state-reset
```

## Numeric and collection checks

```txt
maxPlayers: positive bounded integer
tick, authoritativeTick, input.sequence: nonnegative integers
moveForward/moveStrafe: admitted input range
pitch/rotation/velocity/position: finite policy-bound values
oozeLevel and trail scale: finite domain ranges
room players, snapshot players, cubes, cells and ooze: bounded collections
player, cube and cell IDs: unique within canonical scope
anomaly sequence and slots: compatible lengths and canonical references
```

## Cross-field checks

```txt
envelope roomId == all nested room IDs
SYNC authoritativeTick == snapshot.tick
SYNC payload.room == snapshot.room canonical projection
START_GAME maxPlayers == room.maxPlayers
START_GAME hostPlayer.id == room.hostId
LOBBY_EVENT players == room.players
senderId == payload playerId for actor commands
cube owner IDs reference admitted players
held/placed cube state matches owner/slot relations
```

## Result

```txt
ProtocolSemanticAdmissionResult {
  admissionId,
  messageType,
  accepted,
  reason,
  roomId,
  actorId,
  canonicalTick,
  violations,
  effectRevision
}
```

Rejected candidates must produce zero store, simulation, route or presentation mutation.

## Boundary

Contract only. No implementation or executable proof exists.
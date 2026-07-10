# HorrorCorridor Full Sync Preflight Capability Map

**Timestamp:** `2026-07-10T18-31-21-04-00`

## Existing protocol capability

`SYNC` already provides enough metadata for an additive preflight layer:

```txt
version
senderId
roomId
timestampMs
requestId optional
payload.room
payload.reason
payload.authoritativeTick
payload.snapshot
```

The snapshot also carries game, seed, room, tick, timestamp, maze, players, cubes, anomaly, ooze, and state fields.

## Current consumption

```txt
message.type === SYNC
  -> setRoom(payload.room)
  -> setLobbyPlayers(payload.room.players)
  -> setAuthoritativeSnapshot(payload.snapshot)
  -> mutate completion/screen/pause/readiness
```

No protocol preflight result exists.

## Additive preflight checks

```txt
message version supported
message sender equals active host authority
message roomId equals payload.room.roomId
payload.room.roomId equals snapshot.room.roomId
payload.authoritativeTick equals snapshot.tick
snapshot timestamp is finite
snapshot gameId and seed match active epoch
snapshot structural arrays are present
```

## Result shape

```txt
ProtocolPreflightResult
  status: valid | rejected
  reason:
    unsupported-version
    wrong-sender
    room-mismatch
    tick-mismatch
    identity-mismatch
    malformed-payload
  candidate metadata
```

## Compatibility

No protocol version bump is required for this first gate. Valid version-1 messages retain current behavior. Invalid candidates become observable rejections instead of unconditional commits.

## Finding

The protocol producer is not the blocker. The missing capability is deterministic validation at the consumer boundary and a typed preflight result reusable by fixtures and runtime diagnostics.
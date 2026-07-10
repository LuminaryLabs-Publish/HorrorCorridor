# HorrorCorridor Authority Source and Monotonic Tick Contract

**Timestamp:** `2026-07-10T18-31-21-04-00`

## Existing wire evidence

```txt
ProtocolEnvelope.version
ProtocolEnvelope.senderId
ProtocolEnvelope.roomId
ProtocolEnvelope.timestampMs
ProtocolEnvelope.requestId
FullSyncPayload.authoritativeTick
FullSyncPayload.snapshot.tick
FullSyncPayload.room
ReplicatedGameSnapshot.room.hostId
ReplicatedGameSnapshot.gameId
ReplicatedGameSnapshot.seed
```

## Missing consumer contract

The client does not verify that the message sender is the active host, that all room identifiers agree, that game and seed identity remain stable, or that authoritative ticks move forward.

## Required acceptance identity

```txt
AuthorityIdentity
  protocolVersion
  hostSenderId
  roomId
  gameId
  seed
  authorityEpoch
```

## Required tick rules

```txt
first valid snapshot in epoch -> accept
candidate tick > last tick -> accept
candidate tick < last tick -> reject stale
candidate tick == last tick and fingerprint equal -> duplicate/idempotent
candidate tick == last tick and fingerprint differs -> reject conflicting duplicate
authoritativeTick != snapshot.tick -> reject mismatch
tick reset -> reject unless explicit authority epoch reset is accepted
```

## Recovery contract

`reconnect` and `recovery` reasons must not automatically bypass validation. A reset must establish a new authority epoch with explicit host, room, game, seed, and baseline tick evidence.

## Diagnostics

```txt
lastAcceptedAuthorityIdentity
lastAcceptedTick
lastAcceptedFingerprint
candidateTick
candidateFingerprint
acceptanceStatus
rejectReason
messageTimestampMs
receivedAtMs
```

## Finding

The wire format already contains most inputs needed for safe acceptance. The missing work is a source-owned consumer policy and ledger, not a new transport or protocol rewrite.
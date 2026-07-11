# Transport and Envelope Identity Consistency

**Timestamp:** `2026-07-11T07-30-40-04-00`

## Plan ledger

**Goal:** separate structural decoding from semantic actor admission and require one identity across transport, envelope and payload.

- [x] Review protocol envelope fields.
- [x] Review PLAYER_UPDATE and TRY_INTERACT payloads.
- [x] Review serializer checks.
- [x] Identify semantic checks that are absent.
- [ ] Add semantic preflight and fixture matrices.

## Identity surfaces

```txt
transport event: remotePeerId, connectionId, roomId
envelope: version, senderId, roomId, timestampMs, requestId
payload: playerId, sequence or action
```

## Current structural decoder

The decoder validates JSON shape, protocol version, primitive field types and payload structure. It does not prove:

```txt
transport room equals envelope room
remote peer owns envelope sender
senderId equals payload.playerId
payload player is admitted to the room
connection is current for the session epoch
requestId is new
PLAYER_UPDATE sequence is monotonic
timestamp is inside an accepted policy window
```

## Required semantic preflight

```txt
preflight(event, message, bindingLedger, sessionAuthority)
  -> structural result
  -> room/session/epoch result
  -> connection binding result
  -> sender consistency result
  -> payload actor result
  -> request/sequence result
  -> phase/capability result
  -> terminal admission result
```

Structural decoding should continue to reject malformed data. Semantic admission must be a separate pure service with stable reasons and no gameplay mutation.
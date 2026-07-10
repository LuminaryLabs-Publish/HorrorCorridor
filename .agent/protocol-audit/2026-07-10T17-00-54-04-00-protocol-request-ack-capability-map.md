# Protocol Request Acknowledgement Capability Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T17-00-54-04-00`

## Existing protocol fields

```txt
ProtocolEnvelope.requestId?: string
PlayerInputState.sequence: number
FullSyncPayload.authoritativeTick: number
FullSyncPayload.reason: initial | join | resync | reconnect | recovery
```

## Existing builder support

```txt
createInteractionRequestMessage accepts requestId
createPlayerUpdateMessage accepts requestId
createFullSyncMessage accepts requestId
createLobbyEventMessage accepts requestId
createHostStartMessage accepts requestId
```

## Runtime use

```txt
TRY_INTERACT caller omits requestId
PLAYER_UPDATE caller omits requestId
host interaction event omits requestId
publishAuthoritativeState has no requestId parameter
full sync caller omits requestId
runtime debug has no request acknowledgement record
```

## Decision point

Use existing envelope requestId immediately for propagation. Then choose between:

```txt
option A: dedicated COMMAND_RESULT acknowledgement message
option B: additive acknowledgement payload on an existing message
```

The selected option must support no-publish results. A SYNC-only solution is insufficient once rejected or no-op commands stop forcing snapshots.

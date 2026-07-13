# Semantic Message Visible-State Gap

## Summary

Decoded network messages can replace room, roster, authoritative snapshot, readiness and screen state without a semantic-admission result. The renderer and UI therefore cannot prove that a visible frame came from an internally consistent message.

## Plan ledger

**Goal:** require visible lobby and gameplay frames to cite one accepted semantic-admission result.

- [x] Trace START_GAME, SYNC and LOBBY_EVENT into GameShell stores.
- [x] Trace snapshot game state into completion, pause and playing routes.
- [x] Identify missing frame provenance.
- [ ] Add semantic result and visible-frame receipts.

## Current path

```txt
structurally decoded message
  -> setRoom(payload.room)
  -> setLobbyPlayers(payload.room.players or payload.players)
  -> setAuthoritativeSnapshot(payload.snapshot)
  -> derive victory, paused or playing route from snapshot.gameState
  -> mark rendering/input/network readiness
  -> render Three.js world, HUD, minimap and overlays
```

## Gap

```txt
message admission ID: absent
semantic result: absent
room/snapshot consistency receipt: absent
authoritativeTick/snapshot.tick receipt: absent
canonical state revision: absent
render-frame reference to message result: absent
first visible admitted-frame acknowledgement: absent
```

A structurally valid SYNC can name different room IDs in the envelope, payload room and snapshot room, or carry a tick mismatch. The current render path has no typed rejection or frame-level proof preventing those contradictions from reaching presentation.

## Required receipt

```txt
ProtocolVisibleFrameAck {
  admissionId,
  messageType,
  roomId,
  roomRevision,
  snapshotTick,
  canonicalStateRevision,
  renderFrameId,
  presentedAt
}
```

## Boundary

No renderer or UI behavior changed.
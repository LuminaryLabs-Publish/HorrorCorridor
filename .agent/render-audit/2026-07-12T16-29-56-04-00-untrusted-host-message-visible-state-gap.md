# Render audit: untrusted host message visible-state gap

**Timestamp:** `2026-07-12T16-29-56-04-00`

## Summary

Client-visible lobby, HUD, world and completion state can be derived from a shape-valid host-class message whose transport source was never admitted as the current host authority.

## Plan ledger

**Goal:** ensure every visible multiplayer state cites the accepted host message, source connection generation, room revision and authority revision that produced it.

- [x] Trace `START_GAME`, `SYNC` and `LOBBY_EVENT` into visible stores.
- [x] Confirm source identity is not checked before those stores mutate.
- [x] Identify visible consequences.
- [x] Define frame provenance requirements.
- [ ] Implement and execute visible-frame fixtures.

## Current visible path

```txt
peer/message
  -> message.type branch
  -> setRoom / setLobbyPlayers / setAuthoritativeSnapshot
  -> setConnectionStatus / setScreen / setGameScreen / setReadiness
  -> LobbyScreen, HUDOverlay or GameCanvas renders successor state
```

## Gap

The visible state does not cite:

```txt
message ID
remote peer ID
connection ID and generation
session epoch
transport mode and revision
accepted host player identity
room revision
authority revision
source admission result
```

## Reachable projections

```txt
forged START_GAME
  -> client shows a replacement room and connected host identity

forged SYNC
  -> client can show playing, paused or victory from an unadmitted source

wrong-room LOBBY_EVENT
  -> lobby replaces visible room and player rows

late predecessor SYNC
  -> successor session renders stale predecessor world state
```

## Required frame contract

```txt
AuthoritativeVisibleFrameAck {
  frameId
  messageId
  messageType
  sessionEpoch
  connectionGeneration
  authorityRevision
  roomRevision
  snapshotTick?
  stateFingerprint
  presentedAtMs
}
```

A frame cannot be acknowledged as authoritative unless the corresponding `MessageAuthorityResult` is `Accepted` and all revisions still match at presentation time.

## Non-claims

No rendering code changed. No claim is made that visible multiplayer state currently proves its host source, room, generation or authority revision.
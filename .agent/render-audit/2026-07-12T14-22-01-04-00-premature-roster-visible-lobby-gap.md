# Render Audit: Premature Roster Visible-Lobby Gap

**Timestamp:** `2026-07-12T14-22-01-04-00`

## Summary

The lobby presentation renders `players.length`, each player row and a global `connectionStatus` directly from session state. Because host `peer/connection-open` can fire before the PeerJS data channel is open, visible lobby state can present a connected guest who has no usable channel and has not received the committed room state.

## Plan ledger

**Goal:** ensure every visible connected member and player count cites one committed roster revision backed by an admitted channel and delivery evidence.

- [x] Trace host transport event to session-store mutation.
- [x] Trace session state to `LobbyScreen` player count and rows.
- [x] Trace host lobby broadcast behavior for unopened connections.
- [x] Define visible roster and delivery proof requirements.
- [ ] Add executable pixel/state correlation fixtures after implementation.

## Current visible path

```txt
premature peer/connection-open
  -> GameShell upsertLobbyPlayer(connectionState=connected)
  -> sessionStore updates lobbyPlayers and room.players
  -> LobbyScreen renders larger Players count
  -> LobbyScreen renders Guest row
  -> header can render Status: connected
```

## Missing presentation evidence

```txt
roster revision
roster fingerprint
member admission result
connection generation
actual data-channel open observation
lobby update delivery count/result
remote acknowledgement
first visible frame sequence
visible frame to roster revision correlation
```

## Specific divergence

The host can render:

```txt
Players: 2
Guest 1
waiting
```

while:

```txt
connection.open = false
player-joined broadcast sent to 0 open channels
client has not received the room roster
the true open callback will not re-run admission
```

The visible UI is therefore an optimistic local projection, not evidence of a shared lobby.

## Required render contract

```txt
LobbyFrameInput
  rosterRevision
  rosterFingerprint
  admittedMembers
  per-member connectionGeneration
  per-member connectionState
  lastLobbyPublicationResult

FirstLobbyRosterFrameAck
  frameSequence
  rosterRevision
  surfaceRevision
  visibleMemberIds
  visibleConnectedMemberIds
```

## Admission rule

A member may render as `connected` only after:

```txt
actual channel-open observation
current generation admission
actor binding commit
room membership commit
visible frame acknowledgement
```

Candidates may render separately as `connecting` but must not increase the authoritative connected-player count.

## Required fixtures

```txt
delayed PeerJS open keeps guest out of connected roster
never-open candidate never appears as connected
actual open commits exactly one visible guest
premature event cannot suppress true-open visible update
error-before-open removes connecting candidate
host/client lobby screenshots share roster revision
```

No rendering source or UI behavior was changed.
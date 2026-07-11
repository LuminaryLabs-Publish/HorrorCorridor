# HorrorCorridor Render Audit: Placeholder Player Projection Gap

**Timestamp:** `2026-07-11T05-28-29-04-00`

## Goal

Document how a synthetic lobby row becomes a visible gameplay participant without a transport-backed identity.

## Current projection path

```txt
Add guest
  -> makePlayer(guest-player-*, isHost=false, ready=false)
  -> default connectionState=connected
  -> sessionStore room.players and lobbyPlayers
  -> startPlay passes lobbyPlayers to createInitialGameState
  -> sourcePlayers.map creates one gameplay player per row
  -> snapshot publishes the placeholder player
  -> world renderer creates/updates a player avatar
  -> minimap projects a player marker
  -> HUD/debug readback counts the participant
```

## Main gaps

1. Render consumers cannot distinguish a real peer player from a reserved slot.
2. No `memberKind`, `peerId`, `slotId`, roster revision or roster fingerprint reaches the player descriptor.
3. A placeholder can consume a player color, spawn offset, avatar, minimap marker and replicated row.
4. No transport heartbeat or ownership status accompanies the rendered player.
5. Peer disconnect removes only the real peer row; a stale placeholder can remain visible after the peer leaves.
6. Renderer and minimap have no roster-consumption result proving that every projected player was bootstrap-admitted.

## Required render-consumption row

```txt
renderFrameId
runSessionId
rosterRevision
rosterFingerprint
playerId
memberKind
peerId
admittedForBootstrap
worldAvatarProjected
minimapMarkerProjected
transportOwnerPresent
```

## Required behavior

```txt
reserved slots render only in lobby UI
only admitted real members become gameplay player descriptors
world and minimap consume the same sealed roster fingerprint
stale or unowned player descriptors reject before projection
render/debug output exposes detached roster-consumption rows
```

## Fixture gate

```txt
placeholder slot never creates a gameplay avatar
real peer claiming a slot creates exactly one avatar
peer disconnect removes or explicitly ghosts the bound avatar by policy
world, minimap, snapshot and debug readback agree on the admitted roster fingerprint
```
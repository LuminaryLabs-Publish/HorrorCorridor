# Render Audit: Over-Capacity Roster Visible-State Gap

**Timestamp:** `2026-07-12T22-29-30-04-00`

## Summary

The lobby displays only `Players: {players.length}` while the declared `room.maxPlayers` is not shown or enforced. An over-capacity roster therefore appears as ordinary accepted state, and gameplay rendering can receive an actor array that exceeds the room contract without any capacity revision or frame receipt.

## Plan ledger

**Goal:** make every visible lobby and gameplay population cite one accepted capacity policy and committed roster revision.

- [x] Trace lobby count, controls, bootstrap actors and visible consumers.
- [x] Record the missing full/rejection and frame-provenance states.
- [ ] Add capacity-aware projection and fixtures.

## Current visible path

```txt
sessionStore lobbyPlayers
  -> LobbyScreen
  -> Players: <length>

bootstrap sourcePlayers
  -> gameplay players
  -> Three.js world + HUD + minimap
```

## Missing presentation contract

```txt
players / maxPlayers display
remaining-slot display
full-state projection
Add guest disabled/rejected state
capacity-rejection message
roster revision
capacity fingerprint
first capacity-consistent lobby frame acknowledgement
first capacity-consistent gameplay frame acknowledgement
```

## Required visible result

```txt
CapacityVisibleFrameAck {
  roomId
  roomGeneration
  rosterRevision
  capacityFingerprint
  committedCount
  maxPlayers
  surfaceGeneration
  frameId
}
```

## Fixtures

```txt
0/4 through 4/4 lobby projections
full-state Add guest behavior
fifth-member rejection leaves frame unchanged
capacity revision changes exactly once per admitted member
capacity-valid gameplay actor count
stale roster frame rejected
```

## Validation boundary

Documentation only. No JSX, Three.js, HUD or minimap behavior changed.

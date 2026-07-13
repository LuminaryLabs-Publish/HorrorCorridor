# Structural Decode to Contradictory State Loop

## Summary

The decoder accepts messages that satisfy broad TypeScript-like shapes even when their declared enum values and cross-field relationships contradict each other. Those messages can then drive lobby, runtime and outcome state.

## Plan ledger

**Goal:** reject semantic contradictions before gameplay state changes.

- [x] Inspect every protocol message shape.
- [x] Compare runtime checks with declared TypeScript unions.
- [x] Trace accepted messages into gameplay state.
- [ ] Add semantic fixtures and atomic rejection.

## Reachable loop

```txt
candidate SYNC
  -> valid version, type and finite primitive fields
  -> room.phase is any string
  -> snapshot.appState/gameState are any strings
  -> reason is any string
  -> envelope, payload room and snapshot room may disagree
  -> authoritativeTick may disagree with snapshot.tick
  -> decoder accepts
  -> consumer installs room and snapshot independently
  -> outcome routing and world presentation continue
```

## Other semantic omissions

```txt
TRY_INTERACT action union: not enforced
LobbyPlayer connectionState union: not enforced
START_GAME maxPlayers relation: not enforced
hostPlayer/hostId relation: not enforced
LOBBY_EVENT room.players/payload.players equality: not enforced
PLAYER_UPDATE senderId/playerId relation: not enforced
unique maze/player/cube IDs: not enforced
sequence/tick/maxPlayers integer constraints: not enforced
```

## Required invariant

```txt
accepted(message) =>
  exact declared enums
  valid numeric ranges
  unique canonical identities
  one room identity
  one actor/source binding
  one canonical tick/revision
  one atomic successor state
```

## Boundary

No gameplay behavior changed.
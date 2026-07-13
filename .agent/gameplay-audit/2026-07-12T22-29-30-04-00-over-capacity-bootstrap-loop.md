# Gameplay Audit: Over-Capacity Bootstrap Loop

**Timestamp:** `2026-07-12T22-29-30-04-00`

## Summary

`startPlay()` passes the complete `lobbyPlayers` array to `createInitialGameState()`. Bootstrap maps every source player into gameplay state and then creates an active room with `maxPlayers: 4` while retaining the complete source roster. No start or bootstrap gate rejects the contradiction.

## Plan ledger

**Goal:** require a sealed, capacity-valid roster before deterministic maze and actor bootstrap can commit a run generation.

- [x] Trace lobby state into initial game state and protocol publication.
- [x] Record the over-capacity path.
- [ ] Add bootstrap admission and proof.

## Failure loop

```txt
member intake exceeds four
  -> lobbyPlayers contains five or more members
  -> host presses Start run
  -> runLoadingSteps completes
  -> createInitialGameState(players = lobbyPlayers)
  -> sourcePlayers maps every member into an actor
  -> active room writes sourcePlayers unchanged
  -> active room still declares maxPlayers = 4
  -> START_GAME and SYNC publish contradictory state
```

## Required bootstrap admission

```txt
SealLobbyRosterCommand
  -> validate room generation
  -> validate expected roster revision
  -> reject live reservations
  -> validate unique canonical members
  -> validate committedCount <= maxPlayers
  -> fingerprint sealed roster
  -> return CapacityValidStartRoster

CreateInitialGameState
  -> require CapacityValidStartRoster
  -> preserve roster revision and fingerprint
  -> return typed bootstrap result
```

## Invariants

```txt
bootstrap never truncates silently
bootstrap never accepts over-capacity input
actor count equals sealed roster count
active room and actor population cite the same roster revision
START_GAME and initial SYNC cite the same capacity fingerprint
```

## Validation boundary

Documentation only. Run loading, maze generation, actor creation and protocol publication were unchanged.

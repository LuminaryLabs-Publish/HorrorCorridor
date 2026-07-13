# Unsealed Lobby Start and Loading Race Loop

## Summary

The host start path reads mutable lobby state across asynchronous waits. Membership, readiness, connection and route state can change before bootstrap and local commit, with no generation check or cancellation.

## Plan ledger

**Goal:** keep gameplay bootstrap detached until the exact sealed lobby that authorized it is still current.

- [x] Identify asynchronous loading boundaries.
- [x] Identify mutable inputs read after the waits.
- [x] Record zero-mutation rejection and rollback requirements.
- [ ] Add deterministic race fixtures.

## Race loop

```txt
host presses Start
  -> LOADING
  -> RAF wait + timeout repeated five times
  -> player disconnects, toggles readiness, joins, leaves or returns to title
  -> stale continuation resumes
  -> reads current room and lobbyPlayers
  -> creates and commits a run
  -> sends independent start messages
```

## Required invariants

```txt
room revision matches command
sealed roster fingerprint matches command
all required members remain connected and ready
route remains host lobby
transport generation remains active
loading generation remains current
candidate snapshot is not live until aggregate commit
cancelled or stale continuation produces zero mutation
```

## Failure classification

Use `Rejected`, `Cancelled`, `Stale`, `TimedOut`, `ParticipantLost`, `PrepareFailed`, `CommitFailed` and `Started`. Never treat a screen change or local snapshot assignment as terminal multiplayer success.
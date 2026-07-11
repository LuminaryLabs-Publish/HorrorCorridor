# HorrorCorridor Ready-to-Start Bootstrap Commit Loop

**Timestamp:** `2026-07-11T03-18-44-04-00`

## Current loop

```txt
client toggles ready locally
host sees its own roster copy
host can start regardless of ready state
loading runs
bootstrap converts each roster row into a game player
host enters PLAYING
two messages are broadcast
client enters PLAYING when SYNC arrives
```

## Gameplay consequences

- A client can display ready while the host still sees waiting.
- Unready or disconnected players can be admitted.
- Placeholder guests can become active players.
- Double start requests can stage multiple bootstraps.
- Partial publication can leave clients split between lobby and play.
- No stable proof connects the admitted roster to active player entities.

## Required gameplay result

```txt
StartRunResult
  status: accepted | rejected | no-change
  reason
  startTransactionId
  runSessionId
  previousPhase
  nextPhase
  rosterRevision
  rosterFingerprint
  playerEntityFingerprint
  seed
  committedAtMs
```

# HorrorCorridor Lobby Start Transaction DSK Map

**Timestamp:** `2026-07-11T03-18-44-04-00`

## Current ownership

```txt
GameShell
  owns lobby callbacks
  mutates session and UI stores
  runs asynchronous loading
  creates initial game state
  commits host PLAYING
  broadcasts START_GAME
  broadcasts initial SYNC

sessionStore
  stores room and lobbyPlayers
  mutates roster with no revision or result

protocol-message-construction-kit
  can serialize requestId
  does not create a start transaction
```

## Required composed domain

```txt
horror-corridor-lobby-start-domain
  -> lobby-ready-command-kit
  -> lobby-ready-admission-kit
  -> lobby-roster-revision-kit
  -> start-run-request-kit
  -> start-run-admission-kit
  -> start-transaction-kit
  -> start-sync-correlation-kit
  -> lobby-command-result-kit
  -> lobby-authority-ledger-kit
  -> lobby-start-fixture-kit
```

## Boundary rules

- Browser callbacks submit intent; they do not directly mutate authoritative roster or phase.
- The host is the only authority that can accept readiness and start requests.
- Every accepted roster mutation increments one monotonic revision.
- Start admission seals a canonical roster fingerprint.
- Bootstrap consumes the sealed roster, never a live mutable array.
- `START_GAME` and initial `SYNC` carry the same transaction, session and roster identities.
- Host and clients commit the run once.
- Any staged failure returns a typed rejection and preserves the previous lobby observation.

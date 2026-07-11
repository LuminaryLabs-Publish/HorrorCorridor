# HorrorCorridor Lobby Start Transaction Fixture Gate

**Timestamp:** `2026-07-11T03-18-44-04-00`

## Required scripts

```txt
scripts/horror-corridor-lobby-ready-fixture.mjs
scripts/horror-corridor-start-transaction-fixture.mjs
scripts/horror-corridor-start-message-ordering-fixture.mjs
```

## Required package commands

```txt
npm run fixture:lobby-ready
npm run fixture:start-transaction
npm run fixture:start-ordering
```

## Gate matrix

```txt
ready propagation
idempotent ready
stale revision rejection
placeholder rejection
unready start rejection
double-start single acceptance
bootstrap failure rollback
START_GAME then SYNC
SYNC then START_GAME
duplicate messages
missing partner message
conflicting transaction identity
roster fingerprint equality
host/client runSessionId equality
first frame references committed start
```

A successful Next.js build or visual smoke is insufficient. The deployment gate must run deterministic headless fixtures before the existing build and browser checks.

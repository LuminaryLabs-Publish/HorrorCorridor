# Host Start Barrier Fixture Gate

## Summary

Static source checks cannot prove multiplayer start convergence. The release gate needs executable source, production-build and deployed-origin fixtures.

## Plan ledger

**Goal:** block readiness claims until start admission, cancellation, correlation, rollback and visible convergence are exercised.

- [x] Define the missing fixture matrix.
- [ ] Add deterministic transport and browser harnesses.
- [ ] Run on source, production build and Pages origin.

## Required fixtures

```txt
host starts with one unready member
host starts with one disconnected member
member joins during loading
member leaves during loading
ready flag changes during loading
host returns to title during loading
transport generation replaced during loading
START_GAME delayed after SYNC
SYNC delayed after START_GAME
duplicate START_GAME
duplicate SYNC
wrong-room and wrong-sender messages
client preparation timeout
client commit failure
host commit failure and rollback
all participants render the same first snapshot
late acknowledgement after cancellation
source/build/deployed parity
```

## Pass condition

Every fixture must produce one typed terminal result, zero partial mutation after rejection or cancellation, one active start generation, one authoritative initial snapshot, and a participant-correlated first visible-frame receipt.
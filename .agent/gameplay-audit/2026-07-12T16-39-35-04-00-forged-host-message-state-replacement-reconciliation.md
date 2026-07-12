# Forged Host Message State-Replacement Reconciliation

**Timestamp:** `2026-07-12T16-39-35-04-00`

## Summary

A structurally valid host-class message can reach client state replacement without proving that it came from the current host authority.

## Plan ledger

**Goal:** prevent wrong-source, wrong-room, stale and duplicate messages from changing gameplay or lobby state.

- [x] Trace `START_GAME`, `SYNC` and `LOBBY_EVENT` mutations.
- [x] Identify missing source and generation checks.
- [x] Define zero-mutation rejection outcomes.
- [ ] Implement and test the admission boundary.

## Failure loops

```txt
non-host START_GAME
  -> room and roster replaced
  -> host identity and connection status replaced

non-host SYNC
  -> authoritative snapshot replaced
  -> route can move to playing, paused or victory
  -> readiness becomes true

wrong-room LOBBY_EVENT
  -> active room and visible roster replaced

late predecessor message
  -> successor session accepts stale transport generation
```

## Required invariant

Only the currently admitted host connection generation may commit host-class state. Every rejected result must preserve the complete predecessor gameplay, lobby and presentation fingerprint.
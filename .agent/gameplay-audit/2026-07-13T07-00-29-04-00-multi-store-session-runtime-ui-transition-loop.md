# Multi-Store Session, Runtime and UI Transition Loop

**Timestamp:** `2026-07-13T07-00-29-04-00`

## Summary

Gameplay transitions are expressed as setter sequences rather than one domain result. Host start commits local state before network publication, and client `START_GAME` and `SYNC` are separate messages with separate participant mutations.

## Plan ledger

**Goal:** ensure host start, client adoption, pause, completion, lobby return and title exit commit one coherent gameplay transition or no transition.

- [x] Trace host start through loading, bootstrap, stores and broadcasts.
- [x] Trace client START_GAME and SYNC adoption.
- [x] Trace completion, pause and return paths.
- [x] Identify partial-state windows.
- [ ] Implement typed transition commands and receipts.

## Current host-start loop

```txt
captured room/roster
  -> asynchronous loading delay
  -> bootstrap
  -> session store updates
  -> runtime snapshot update
  -> UI reset and route updates
  -> readiness update
  -> START_GAME broadcast
  -> SYNC broadcast
```

The roster or connection can change during loading, and no expected revision rejects the stale captured candidate.

## Current client-adoption loop

```txt
START_GAME
  -> room/roster/host identity/connection
  -> no snapshot, route or readiness adoption

SYNC
  -> room/roster/snapshot
  -> completion, pause or playing projection
  -> readiness
```

A reordered, delayed, duplicated or missing message can expose a mixed state because no shared transition generation correlates the pair.

## Required result

```txt
CrossStoreTransitionResult
  Accepted
  RejectedStale
  RejectedInvariant
  Duplicate
  Cancelled
  RolledBack
  Failed
```

Only `Accepted` may publish successor session, runtime and UI revisions.
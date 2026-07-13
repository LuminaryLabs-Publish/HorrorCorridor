# Deploy Audit: Capacity Central Reconciliation Fixture Gate

**Timestamp:** `2026-07-12T22-44-30-04-00`

## Summary

The central ledger must not interpret the presence of `maxPlayers` as proof of enforcement. Capacity readiness requires pure-domain, store, protocol, browser, build and deployed-origin fixtures.

## Plan ledger

**Goal:** define the executable proof required before four-player enforcement or production readiness can be claimed.

- [x] Reconcile the repo-local fixture gate.
- [x] Preserve acceptance criteria and withheld claims.
- [ ] Implement and run the matrix on `main`.

## Required gates

```txt
pure domain
  policy validation
  sequential reservations
  concurrent final-slot winner
  cancellation, expiry and exact-once release

store and protocol
  over-capacity commit rejection
  START_GAME, SYNC and LOBBY_EVENT rejection
  capacity revision and fingerprint preservation

browser transport
  four accepted PeerJS members and fifth rejected
  four accepted local members and fifth rejected
  placeholder parity
  connection retirement releases capacity

browser UI and bootstrap
  count/max/full projection
  Add guest cannot exceed capacity
  rejection leaves roster unchanged
  actor count matches sealed roster
  first lobby and gameplay frame receipts match revision

build and deployment
  production build succeeds
  production server fixture succeeds
  deployed origin matches source semantics
```

## Acceptance criteria

```txt
no accepted state has players.length > maxPlayers
exactly one final-slot winner under concurrency
rejections mutate no room, roster, actor or frame state
all accepted identities are unique and lease-bound
bootstrap and protocol cite committed capacity evidence
visible member and actor counts match the committed roster
```

## Current state

```txt
runtime implementation: absent
focused capacity fixtures: absent
browser multiplayer capacity smoke: not run
production build this run: not run
deployed capacity smoke: not run
```

## Claims withheld

No claim is made for capacity enforcement, final-slot race safety, protocol integrity, bootstrap safety, visible-count parity or deployment readiness.
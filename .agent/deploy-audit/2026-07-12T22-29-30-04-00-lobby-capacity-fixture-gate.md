# Deploy Audit: Lobby Capacity Fixture Gate

**Timestamp:** `2026-07-12T22-29-30-04-00`

## Summary

The current package proof surface does not demonstrate that a four-player room rejects a fifth member across PeerJS, the local bridge, placeholders, protocol payloads, bootstrap or the deployed origin. Capacity readiness requires an executable matrix, not the presence of `maxPlayers` in state.

## Plan ledger

**Goal:** define the source, build, browser and deployed gates required before capacity enforcement can be claimed.

- [x] Record current proof limitations.
- [x] Define fixture layers and acceptance criteria.
- [ ] Implement and execute the matrix on `main`.

## Required fixture layers

### Pure domain

```txt
capacity policy validation
sequential slot reservation
final-slot concurrency
reservation cancellation and expiry
duplicate-member no-slot-consumption
exactly-once commit and release
```

### Store and protocol

```txt
store rejects over-capacity commit
over-capacity START_GAME rejected
over-capacity SYNC rejected
over-capacity LOBBY_EVENT rejected
capacity revision/fingerprint preserved
```

### Browser transport

```txt
first four PeerJS members accepted
fifth PeerJS member rejected
first four local-bridge members accepted
fifth local-bridge member rejected
PeerJS/local semantic parity
connection close releases capacity through revisioned retirement
```

### Browser UI and bootstrap

```txt
lobby displays 0/4 through 4/4
Add guest cannot exceed 4/4
full rejection leaves roster unchanged
Start run consumes sealed capacity-valid roster
game actor count matches committed roster
first lobby and gameplay frame receipts match capacity revision
```

### Deployment

```txt
production build succeeds
production server fixture succeeds
public origin reports identical capacity behavior
no source/build/deployed semantic drift
```

## Acceptance criteria

```txt
no accepted state has players.length > maxPlayers
exactly one winner for concurrent final-slot requests
rejections cause zero room, roster, actor or frame mutation
all admitted members have unique canonical identities
all network members have live admitted leases
bootstrap and protocol cite the committed capacity revision
visible frame count matches the committed roster
```

## Current validation state

```txt
runtime implementation: absent
focused capacity fixtures: absent
browser multiplayer capacity smoke: not run
production build: not run this turn
deployed capacity smoke: not run
```

## Claims withheld

No claim is made for capacity enforcement, final-slot race safety, protocol integrity, bootstrap safety, visible count parity or deployed readiness.

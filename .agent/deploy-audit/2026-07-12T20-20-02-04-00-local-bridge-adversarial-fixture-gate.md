# Local Bridge Adversarial Fixture Gate

**Timestamp:** `2026-07-12T20-20-02-04-00`

## Summary

The repository has build, lint, harness, visual and live-player scripts, but no fixture proves local packet authorization, connection ownership, stale-generation rejection or exact-once fanout across multiple browser contexts.

## Plan ledger

**Goal:** define the executable gate required before the BroadcastChannel path can be treated as a valid multiplayer transport.

- [x] Inspect package scripts.
- [x] Identify missing packet and fanout fixtures.
- [x] Define source, production and deployed matrices.
- [ ] Implement fixtures.
- [ ] Run them on `main`.

## Required deterministic fixtures

```txt
valid connect accepted once
same packet ID repeated -> duplicate no-change
unknown connection client-message -> rejected
actor/lease mismatch -> rejected
forged disconnect -> rejected
wrong room -> rejected
stale session generation -> rejected
revoked capability -> rejected
malformed packet -> rejected
late packet after runtime stop -> stale
```

## Multi-client exact-once matrix

```txt
1 client -> 1 delivery per logical broadcast
2 clients -> 2 total deliveries, 1 per client
3 clients -> 3 total deliveries, 1 per client
4 clients -> 4 total deliveries, 1 per client
```

Run the matrix for:

```txt
LOBBY_EVENT
START_GAME
initial SYNC
steady-state SYNC
completion/terminal publication
```

## Adversarial browser matrix

```txt
rogue same-origin tab with join code but no capability
rogue iframe
stale client after host restart
client reusing retired connectionId
client claiming another actorId
client attempting to disconnect another lease
client replaying a prior accepted packet
client sending future/out-of-order sequence
```

## Transport parity

```txt
PeerJS only
local bridge only
local bridge unavailable fallback
host and clients in same browser profile
host and clients in separate browser profiles where available
```

The same logical commands, results, roster revisions, snapshots and visible frames must be produced for supported modes.

## Build and deployment gate

```txt
npm run lint
npm run build
npm run harness:horror-corridor
npm run validate:live-player:dev
production server browser smoke
GitHub Pages or deployed-origin browser smoke when applicable
```

## Required captured evidence

```txt
packet result journal without secrets
connection lease state
broadcast intended recipient set
per-recipient delivery results
client deduplication results
lobby and snapshot revisions
first visible frame acknowledgement
no N² message-event growth
no state mutation for rejected packets
```

## Current status

```txt
runtime fixtures implemented: no
multi-client fanout fixture: no
rogue-publisher fixture: no
stale-generation fixture: no
PeerJS/local parity fixture: no
build/lint run in this pass: no
browser smoke run in this pass: no
```

No deployment-readiness or local-transport safety claim is made.
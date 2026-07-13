# Duplicate Local Broadcast Visible-Frame Gap

**Timestamp:** `2026-07-12T20-20-02-04-00`

## Summary

The local host posts one untargeted `host-message` per connection, and every local client accepts every untargeted packet. With multiple local clients, one logical lobby, start or sync broadcast can trigger repeated state replacements before the next frame, without a broadcast revision or visible-frame receipt.

## Plan ledger

**Goal:** make the rendered lobby and game frame identify one accepted logical broadcast and prevent duplicate local fanout from replaying presentation transitions.

- [x] Trace host local broadcast iteration.
- [x] Trace client target filtering.
- [x] Trace `LOBBY_EVENT`, `START_GAME` and `SYNC` presentation effects.
- [x] Identify missing frame correlation.
- [ ] Implement exact-once fanout and frame acknowledgement.

## Current render path

```txt
host logical broadcast
  -> loop N localConnections
  -> post N packets with targetPeerId = null
  -> each of N clients receives N packets
  -> GameShell handles each packet
  -> room/players/snapshot/screen/readiness may be replaced repeatedly
  -> next React/Three frame presents only the final mutable stores
```

## Affected presentation consumers

```txt
LobbyScreen room and roster
connection status and overlay
loading and playing screen transition
runtime authoritative snapshot
Three.js world
HUD and minimap
pause and terminal projection
runtime debug frame
```

## Missing evidence

```txt
logical broadcast ID
broadcast revision
intended recipient set
per-client delivery ID
client deduplication result
accepted packet revision
store replacement revision
rendered frame ID
first visible broadcast frame acknowledgement
```

## Required render contract

```txt
AcceptedLocalBridgeBroadcast
  -> committed broadcast revision
  -> one accepted delivery per intended client
  -> one admitted state transition per client
  -> render snapshot carries broadcast revision
  -> first presented frame emits LocalBridgeFrameAck
```

## Invariants

- One logical broadcast changes each intended client's presentation state at most once.
- A duplicate packet cannot restart loading, reapply a lobby roster or replace the same snapshot again.
- The visible frame identifies the accepted broadcast and state revision.
- Debug projection distinguishes accepted, duplicate, rejected and stale deliveries.
- PeerJS and local-bridge presentation semantics remain equivalent.

## Proof boundary

No browser or visual fixture was run. The current source cannot prove exact-once local delivery or broadcast-to-frame correlation.
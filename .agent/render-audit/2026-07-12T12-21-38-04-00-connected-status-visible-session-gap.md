# Connected Status and Visible Session Gap

## Summary

The client can project `connected` immediately after posting a `BroadcastChannel` packet. No host acknowledgement, delivered snapshot, remote actor or visible multiplayer frame is required.

## Plan ledger

**Goal:** correlate visible lobby and game presentation with an admitted transport mode, acknowledged host connection and delivered session revision.

- [x] Trace client status mutation.
- [x] Trace host/client local bridge paths.
- [x] Identify missing presentation evidence.
- [ ] Add executable render and multiplayer proof.

## Current visible path

```txt
connectToHost
  -> set status connecting
  -> post client-connect to local bridge
  -> set status connected
  -> lobby header renders Status: connected
```

This can happen when no host is listening. BroadcastChannel posting has no response path in the current connection attempt.

## Missing presentation evidence

```txt
transport mode ID
transport generation
connection attempt ID
host acknowledgement ID
room/host identity convergence
first delivered lobby event
first accepted START_GAME or SYNC
first rendered remote player
first visible multiplayer-frame receipt
```

## Required projection rule

```txt
visible connected status
  requires ConnectionAcknowledgement
  plus admitted transport revision
  plus host and room identity

visible multiplayer-ready status
  requires accepted session message
  plus first remote-player or shared-state frame acknowledgement
```

## Fixture gates

```txt
client with no host must not show connected
late host startup must require a new or replayed handshake
same-origin tab connection must show local-bridge mode
cross-origin/device connection must show PeerJS mode
fallback must preserve one visible session identity
```
# Local Bridge Replaces Network Gameplay Loop

## Summary

In browsers with `BroadcastChannel`, the local same-origin bridge becomes the only gameplay transport. PeerJS remains allocated but its connection/data path is not admitted.

## Plan ledger

**Goal:** ensure local testing support cannot silently replace real multiplayer reachability.

- [x] Trace host and client mode branches.
- [x] Trace connection and message effects.
- [x] Identify false-connected and unreachable-session loops.
- [ ] Implement explicit mode and fallback policy.

## Current loop

```txt
host enters lobby
  -> PeerJS host created
  -> BroadcastChannel created
  -> PeerJS connection listener skipped

client enters join code
  -> PeerJS client created
  -> BroadcastChannel created
  -> peer.connect skipped
  -> client-connect packet posted
  -> status becomes connected

if host is another device/origin
  -> packet cannot reach host
  -> no PeerJS fallback occurs
  -> client remains apparently connected
  -> lobby and gameplay never converge
```

## Gameplay consequences

```txt
host roster can remain unaware of the client
client readiness can be local-only
START_GAME and SYNC may never arrive
client can wait indefinitely with connected status
remote actor, interaction and ooze state never materialize
multiplayer failure is projected as a valid session
```

## Required gameplay invariant

A player may enter a shared run only after the selected transport path has acknowledged the host, established canonical actor binding and delivered a session message for the same room and transport generation.
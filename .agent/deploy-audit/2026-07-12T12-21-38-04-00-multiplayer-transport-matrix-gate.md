# Multiplayer Transport Matrix Gate

## Summary

Current validation does not prove that the host and client can connect across separate origins, browser profiles or devices. A same-origin `BroadcastChannel` path can satisfy local checks while suppressing the real PeerJS path.

## Plan ledger

**Goal:** require deployment proof for every supported transport topology before multiplayer readiness is claimed.

- [x] Identify current transport selection behavior.
- [x] Define the required environment matrix.
- [x] Define connection, delivery and visible-frame evidence.
- [ ] Add executable fixtures and CI gates.

## Required matrix

```txt
same tab: unsupported or explicitly rejected
same-origin separate tabs: local bridge
same-origin separate browser profiles: PeerJS
separate origins: PeerJS
separate devices on different networks: PeerJS
host absent: rejected or timed out
host starts late: retry or explicit reconnect
preferred path failure: fallback without duplicate effects
```

## Required evidence per case

```txt
transport mode and revision
connection attempt and acknowledgement
canonical host, room and actor binding
first accepted lobby event
START_GAME and initial SYNC delivery results
remote movement message delivery
first visible remote-player frame
clean retirement and reconnect result
```

## Gate

Do not claim deploy-ready multiplayer until the matrix passes in production-equivalent browser contexts. Same-origin local bridge success alone is not a network multiplayer proof.
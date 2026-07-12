# Join-Code Collision Hosting Loop

**Timestamp:** `2026-07-12T18-31-01-04-00`

## Summary

A four-character random code is used both as the human join code and requested PeerJS host ID. A collision or unavailable ID can leave the game in a host lobby whose advertised identity was never acquired.

## Plan ledger

**Goal:** prevent a rejected or unowned code from becoming gameplay session identity.

- [x] Trace host code generation and transport creation.
- [x] Trace generic peer error handling.
- [x] Identify missing rollback and retry.
- [ ] Add reserved identity generations.
- [ ] Add bounded collision retry and terminal failure UI.

## Reachable loop

```txt
host selects Host Game
  -> makeJoinCode() returns candidate C
  -> room and lobby advertise C
  -> createHost requests PeerJS ID C
  -> ID C is unavailable or rejected
  -> peer/error is emitted
  -> GameShell has no identity-allocation error branch
  -> room and lobby state retain C
  -> local BroadcastChannel C may still exist
  -> client attempts C without one authoritative ownership result
```

## Consequences

```txt
advertised room may not be globally reachable
local and PeerJS transport behavior can diverge
retry can create a new transport without a formal predecessor generation
roomId, joinCode and hostPeerId have no canonical fingerprint
visible lobby state cannot prove the host owns its advertised identity
```

## Required gameplay rule

No roster, readiness, start or bootstrap command may consume a room identity until `HostIdentityResult.Accepted` commits the full manifest.
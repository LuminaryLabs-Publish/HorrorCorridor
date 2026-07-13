# Provisional Client Lobby Central Reconciliation

**Timestamp:** `2026-07-13T03-38-31-04-00`

## Summary

Client gameplay state can begin from a provisional room model that was never acknowledged by a host. Later protocol messages replace room and roster state, but no admission transaction proves that the client belongs to the run or that the accepted manifest matches the visible lobby.

## Plan ledger

**Goal:** keep provisional join state out of canonical gameplay stores until one accepted room-membership result is committed.

- [x] Trace room and roster mutation before transport acknowledgement.
- [x] Trace later START_GAME, SYNC and LOBBY_EVENT replacement paths.
- [x] Define gameplay admission invariants.
- [ ] Implement and execute the invariants.

## Current loop

```txt
join submit
  -> provisional room with hostId null
  -> provisional roster containing only local client
  -> canonical session stores mutated
  -> lobby presents joined state

later host message
  -> room and roster replaced
  -> START_GAME or SYNC may transition into gameplay
```

## Gameplay risks

```txt
unknown room appears joinable
local bridge absence appears connected
room capacity is not proven at client acceptance
host identity is not proven at client acceptance
provisional and canonical room IDs can differ
late predecessor messages can replace successor attempt state
run bootstrap can be observed without a recorded join result
```

## Required gameplay invariants

```txt
canonical room is absent during pending join
canonical roster is unchanged during pending join
Accepted result names one host and one admitted local member
room membership and capacity revision are validated together
START_GAME and SYNC reference the accepted room generation
local gameplay actor identity derives from accepted membership
non-accepted attempts produce zero gameplay mutation
late predecessor events cannot alter the active run
```

## Required commit

```txt
Accepted JoinResult
  -> install canonical room manifest
  -> install canonical roster
  -> bind local actor to admitted member
  -> bind host peer and host player
  -> bind connection generation
  -> enable accepted networking readiness
  -> allow lobby readiness and run bootstrap
```

## Required fixtures

```txt
unknown room leaves canonical gameplay stores unchanged
room-full rejection creates no local gameplay actor
accepted room has exactly one local admitted member
START_GAME for another room generation is rejected
late attempt-A SYNC cannot mutate attempt-B session
accepted lobby and first gameplay snapshot share room generation
```

## Validation boundary

No gameplay source was changed and no multiplayer fixture was run. The audit records a missing admission boundary only.
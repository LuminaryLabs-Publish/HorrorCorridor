# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T16-21-09-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime readiness leases and generation fencing
6. snapshot acceptance ordering and monotonic revision
7. explicit interaction targets and cube/slot claims
8. active-run disconnect, player retirement and reconnect claims
9. monotonic terminal outcome authority
10. host movement admission and client reconciliation
11. replicated pause/resume convergence
```

## Active-run disconnect gaps

```txt
connectionId is not bound to canonical gameplay actor identity
connection-close mutates only session/lobby state
GameCanvas currentGameState is not subscribed to roster removal
no active membership revision
no suspended/disconnected/retired gameplay-player state
no disconnect command or result
no grace-period or timeout policy
no explicit leave/kick distinction
no reconnect claim or token
no stale or duplicate close rejection
```

## Owned-state recovery gaps

```txt
held cube ownership survives disconnect
no drop/return/reserve/transfer policy
syncHeldCubesToPlayers leaves cubes unchanged when owner is missing
no orphaned-owner invariant check
no cube recovery result
no interaction-claim release result
no anomaly-slot policy for disconnected ownership
```

## Simulation and publication gaps

```txt
disconnected players remain in GameState.players
disconnected positions remain ooze inputs
GameState.room.players can diverge from sessionStore.room.players
buildReplicatedSnapshot republishes ghost players
world and minimap can continue projecting ghosts
no disconnect-result-linked snapshot revision
no first post-disconnect frame acknowledgement
```

## Reconnect gaps

```txt
new connection open is treated as lobby join/upsert
no suspended actor identity to reclaim
no previous connection lineage
no run/epoch/revision claim
no ownership restoration policy
no duplicate live connection policy
no reconnect success or rejection result
```

## Required fixtures

```txt
fixture:disconnect-actor-binding
fixture:disconnect-active-player-retirement
fixture:disconnect-held-cube-recovery
fixture:disconnect-no-orphan-owner
fixture:disconnect-ooze-input-removal
fixture:disconnect-snapshot-convergence
fixture:disconnect-duplicate-close
fixture:disconnect-late-close
fixture:disconnect-cross-epoch-close
fixture:disconnect-grace-timeout
fixture:reconnect-suspended-actor
fixture:reconnect-wrong-actor
fixture:reconnect-duplicate-live-connection
fixture:disconnect-first-frame
fixture:browser-active-disconnect
fixture:pages-active-disconnect
```

## Required guarantees

```txt
session and gameplay membership cannot diverge silently
one connection close affects only its bound actor and run epoch
all actor-owned mutable state has an explicit recovery result
no cube references a missing owner
retired actor is absent from simulation interaction snapshot and render inputs
reconnect cannot create a duplicate player or steal another actor
all projections share one membership revision and result fingerprint
```

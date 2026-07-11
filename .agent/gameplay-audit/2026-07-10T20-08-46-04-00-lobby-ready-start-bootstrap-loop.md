# HorrorCorridor Lobby Ready-to-Start Gameplay Loop

**Timestamp:** `2026-07-10T20-08-46-04-00`

## Current loop

```txt
host opens lobby
  -> peers connect
  -> host records membership
  -> client toggles readiness locally
  -> host does not receive or validate readiness
  -> host presses Start run
  -> host checks only sessionMode === host and room !== null
  -> host generates maze from room identity
  -> host converts lobbyPlayers directly into active players
  -> host sets active snapshot locally
  -> host broadcasts START_GAME
  -> host broadcasts initial SYNC
  -> clients project the active run
```

## Gameplay consequences

### Unready start

A host can start while connected clients are still `ready: false`. The readiness field therefore has no gameplay authority.

### Divergent roster state

A client can show itself as ready locally while the host's roster remains waiting. The active roster is generated from the host's copy, not from a reconciled readiness transaction.

### Phantom active players

`addGuestPlaceholder()` creates a connected lobby player. `createInitialGameState()` creates one active player entity for every roster row. A placeholder can therefore become a remote player with no transport or controlling peer.

### Duplicate start risk

The room does not enter an authoritative `starting` state before asynchronous loading and bootstrap. The source exposes no one-shot start request id or start transaction guard.

### No bootstrap admission proof

There is no stable record proving that the roster evaluated by the admission policy is exactly the roster consumed by `createInitialGameState()`.

## Required gameplay contract

```txt
ReadyCommand
  -> host validates actor membership and connection
  -> authoritative roster revision increments only on mutation
  -> host republishes roster

StartRequest
  -> host validates room phase and caller authority
  -> policy validates real connected participants
  -> policy validates required readiness
  -> policy rejects placeholders
  -> accepted result seals roster revision and fingerprint
  -> phase becomes starting
  -> bootstrap consumes sealed roster
  -> active snapshot records admitted roster fingerprint
  -> phase becomes active
```

## Stable result vocabulary

```txt
ready.accepted
ready.no-change
ready.rejected.not-member
ready.rejected.disconnected
ready.rejected.wrong-room
ready.rejected.wrong-host
ready.rejected.stale-revision
start.accepted
start.rejected.not-host
start.rejected.wrong-phase
start.rejected.no-real-participants
start.rejected.player-not-ready
start.rejected.player-disconnected
start.rejected.placeholder-present
start.rejected.stale-roster
start.rejected.already-starting
start.rejected.bootstrap-failed
```

## Fixture scenarios

```txt
one host starts solo successfully
host plus ready client starts successfully
host plus unready client rejects start
client readiness reaches host and all peers
same readiness value is idempotent
stale roster revision rejects without mutation
disconnected client cannot satisfy readiness
placeholder guest cannot be admitted
double start accepts once
bootstrap failure returns lobby without roster drift
admitted roster fingerprint equals active snapshot roster fingerprint
```

## Next safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```
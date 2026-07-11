# HorrorCorridor Active, Ending, Lobby, and Re-entry Loop

**Timestamp:** `2026-07-10T21-39-22-04-00`

## Current gameplay loop

```txt
bootstrap
  -> room.phase = active
  -> gameState = playing
  -> player movement and interaction
  -> anomaly sequence evaluation
  -> victory
  -> room.phase = ending
  -> gameState = victory
  -> CompleteScreen
  -> Restart callback
  -> local returnToLobby
```

Pause follows a parallel path:

```txt
playing
  -> pause
  -> PauseMenu
  -> Return to lobby
  -> local returnToLobby
```

## Current transition defect

`returnToLobby()` changes local UI state and runtime readiness but does not transform the authoritative gameplay state.

```txt
visible screen: lobby
replicated room phase: active or ending
replicated game state: playing or victory
authoritative snapshot: retained
transport: retained
remote peers: unchanged
session epoch: absent
```

This means the product has a presentation-level return path rather than a gameplay/session transition.

## Solo defect

```txt
solo run
  -> returnToLobby
  -> sessionMode is not host
  -> screen becomes LOBBY_CLIENT
  -> primary action calls startPlay
  -> non-host startPlay calls toggleReady
  -> no new solo bootstrap occurs
```

## Multiplayer defect

```txt
host returns locally
  -> host GameCanvas unmounts
  -> clients remain in active runtime
  -> no lifecycle publication tells clients to stop

client returns locally
  -> client GameCanvas unmounts
  -> host remains active
  -> later host SYNC may project client back to PLAYING
```

## Target gameplay loop

```txt
pause-return | victory-restart | host-reset | client-leave | quit
  -> RunExitCommand
  -> authority and session-identity preflight
  -> accepted RunExitResult
  -> room active/ending -> lobby or closed
  -> freeze simulation and input
  -> publish authoritative lifecycle state
  -> teardown runtime resources
  -> reset/archive active snapshot
  -> converge all peer projections
  -> increment epoch before next bootstrap
  -> start new run only through entry admission
```

## Gameplay invariants

```txt
victory remains final inside its session epoch
returning to lobby does not silently regress victory into playing
no simulation tick advances after accepted exit
no interaction mutates state after accepted exit
all peers agree on room phase before re-entry
one new bootstrap creates one new session epoch
solo restart remains a solo path
```

## Required proof

```txt
pause-return and victory-restart produce distinct stable reasons
accepted exit freezes simulation before teardown
rejected exit does not change gameplay state
accepted host exit converges every client
accepted client leave removes or marks the participant deterministically
old-epoch gameplay inputs cannot affect the next run
new run starts from fresh deterministic bootstrap state
```

## Conclusion

The next gameplay change should not add content. It should make the existing ending, lobby, and restart states one deterministic lifecycle rather than loosely coupled screen callbacks.
# HorrorCorridor Run Exit and Re-entry Authority Contract

**Timestamp:** `2026-07-10T21-39-22-04-00`

## Purpose

Define the authoritative contract connecting run entry, active gameplay, ending, runtime teardown, lobby return, room close, and later re-entry.

## Session identity

Every accepted run must expose one immutable identity:

```txt
RunSessionIdentity {
  roomId
  gameId
  sessionEpoch
  admittedRosterFingerprint
  authorityId
  startedAtMs
}
```

`sessionEpoch` is monotonic within a room. A new bootstrap cannot reuse the previous epoch.

## State machine

```txt
idle
  -> lobby
  -> starting
  -> active
  -> ending
  -> lobby | closed

active
  -> lobby | ending | closed

ending
  -> lobby | closed
```

Illegal direct transitions must produce typed rejections rather than local UI mutations.

## Authority rules

```txt
solo:
  local session authority owns exit and re-entry

hosted multiplayer:
  host owns room-wide phase transitions
  clients may request exit or leave
  clients may not reset the room locally

return to title:
  each local peer owns local transport teardown
  host room-close or transfer policy must be explicit
```

## Accepted exit order

```txt
1. validate command identity and authority
2. reserve the request id
3. freeze new simulation/input admission
4. commit active/ending -> lobby or closed
5. publish authoritative lifecycle state
6. stop runtime loop and release pointer lock
7. unsubscribe runtime transport consumer and DOM listeners
8. dispose world, post-processing, renderer, and canvas
9. clear/archive active snapshot and reset local runtime projection
10. record terminal RunExitResult and RuntimeTeardownResult
11. preserve or destroy transport according to destination
12. expose converged lobby/title projection
```

## Re-entry order

```txt
1. require lobby/start admission
2. seal admitted roster
3. increment sessionEpoch exactly once
4. create new gameId and deterministic bootstrap
5. publish START_GAME with new identity
6. publish initial SYNC with same identity
7. initialize exactly one runtime instance
8. accept only messages matching the new epoch
```

## Message admission

Every active-run message must be checked against:

```txt
protocol version
roomId
gameId
sessionEpoch
sender membership
authority/source role
current room phase
request sequence or snapshot order
```

Old-epoch messages return a stable stale result and never reach movement, interaction, snapshot, UI, or rendering consumers.

## Transport decisions

```txt
return-to-lobby:
  preserve connected transport
  stop active runtime consumers
  continue lifecycle/lobby message consumers

client-leave:
  publish/ack leave if possible
  remove participant deterministically
  destroy client transport

return-to-title:
  destroy local transport
  clear session/runtime/UI stores

host-room-close:
  publish closed state
  terminate client room membership
  destroy host transport
```

## Teardown contract

Teardown is idempotent. It owns a `runtimeInstanceId` and returns `disposed`, `no-change`, or `failed`. A failed step must be recorded without allowing a second active runtime to begin.

## Projection contract

One accepted lifecycle transaction must correlate:

```txt
room.phase
UI screen
gameScreen
runtime readiness
authoritative snapshot disposition
connection/transport state
session epoch
last lifecycle result
last teardown result
```

## Required invariants

```txt
no active simulation after accepted exit
no old snapshot can reopen an exited run
no old input can mutate a new run
no duplicate RAF/listener/resource ownership after re-entry
one accepted exit per request id
one epoch increment per accepted bootstrap
all connected peers converge before host re-entry
solo always returns to a solo-capable route
```

## Failure policy

```txt
preflight rejection:
  no mutation and no teardown

publication failure before local teardown:
  retain or roll back previous authoritative phase

teardown partial failure:
  mark runtime unavailable and block re-entry until terminal cleanup result

bootstrap failure:
  return starting -> lobby without incrementing twice
```

## Conclusion

The session lifecycle domain must sit above GameShell, GameCanvas, stores, transport, and render cleanup. None of those child surfaces should independently claim that a run has ended or restarted.
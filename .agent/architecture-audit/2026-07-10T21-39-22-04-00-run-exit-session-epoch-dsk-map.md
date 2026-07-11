# HorrorCorridor Run Exit and Session Epoch DSK Map

**Timestamp:** `2026-07-10T21-39-22-04-00`

## Architectural boundary

```txt
current:
UI callback
  -> local store mutations
  -> component unmount cleanup
  -> unresolved replicated session

target:
RunExitCommand
  -> authority and identity preflight
  -> SessionPhaseTransaction
  -> RuntimeTeardownResult
  -> SessionState publication
  -> store/UI projection
  -> epoch advancement before re-entry
```

## Current DSK ownership

```txt
corridor-application-shell-kit
  GameShell screen routing, run entry, pause/completion callbacks
corridor-session-domain-kit
  sessionStore mode, identity, room, roster, connection state
runtime-store-snapshot-kit
  runtimeStore snapshot, pose, input, readiness
peer-host-transport-kit / peer-client-transport-kit
  live transport and event delivery
protocol-message-construction-kit
  START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
maze-snapshot-bootstrap-kit
  creates the active run state
corridor-animation-loop-kit
  starts/stops RAF
corridor-render-world-kit
  owns world attach/update/dispose
corridor-post-processing-kit
  owns composer render/resize/dispose
runtime-resource-cleanup-kit
  GameCanvas local unmount cleanup
runtime-debug-frame-kit
  active-frame/event evidence only
```

## Ownership collision

`GameShell` owns session/UI transitions while `GameCanvas` owns runtime/render teardown. Neither produces one typed result spanning:

```txt
room phase
session epoch
active snapshot disposition
transport preservation/destruction
runtime instance disposal
UI destination
peer publication
```

The split is acceptable only if a composed parent session domain coordinates both child kits. At present, the callback order is implicit and no transaction result exists.

## Proposed DSKs

### `run-session-identity-kit`

Services:

```txt
runSessionId
sessionEpoch
roomId/gameId correlation
sealed roster fingerprint
stable JSON-safe identity snapshot
```

### `run-exit-command-kit`

Services:

```txt
requestId
sender/actor identity
role
roomId
gameId
sessionEpoch
destination lobby|title|closed
reason pause-return|victory-restart|client-leave|host-reset|quit
```

### `run-exit-authority-kit`

Services:

```txt
host-only multiplayer authority
solo authority
phase and source validation
idempotent duplicate handling
accepted/rejected/no-change result
stable reason vocabulary
```

### `session-phase-transaction-kit`

Services:

```txt
active -> ending
active -> lobby
ending -> lobby
lobby -> starting
starting -> active
room/UI/runtime atomic projection
rollback on failed teardown/publication
```

### `runtime-teardown-result-kit`

Services:

```txt
runtimeInstanceId
RAF stopped
transport listener unsubscribed
ResizeObserver disconnected
DOM listeners removed
pointer lock released
world disposed
composer disposed
renderer disposed
canvas removed
store projection reset
exactly-once counters
```

### `session-state-publication-kit`

Services:

```txt
authoritative lifecycle message
phase/epoch/roster projection
return-to-lobby convergence
room-close publication
transport preserve/destroy decision
```

### `session-message-admission-kit`

Services:

```txt
version
room
game
session epoch
sender authority
phase legality
stale and future epoch rejection
```

### `session-lifecycle-ledger-kit`

Services:

```txt
bounded commands
bounded results
before/after phase
before/after epoch
teardown result
publication result
rejected stale-message rows
```

### `session-lifecycle-fixture-kit`

Services:

```txt
DOM-free transition replay
solo restart proof
host/client convergence proof
transport lifecycle proof
exactly-once teardown proof
stale-message-after-reentry proof
```

## Required composition

```txt
corridor-session-lifecycle-domain
  -> lobby-start-admission-domain
  -> run-session-identity-kit
  -> run-exit-command-kit
  -> run-exit-authority-kit
  -> session-phase-transaction-kit
  -> runtime-teardown-result-kit
  -> session-state-publication-kit
  -> session-message-admission-kit
  -> session-lifecycle-ledger-kit
  -> session-lifecycle-debug-projection-kit
```

## Invariants

```txt
one active runtime instance per accepted session epoch
one terminal result per exit request id
room phase and UI destination commit together
accepted lobby return leaves no active input/simulation
accepted title exit leaves no live transport
re-entry increments epoch exactly once
old-epoch active messages never mutate the new epoch
render teardown is idempotent and observable
solo never enters multiplayer client-lobby routing
```

## Dependency note

The initial session identity should be created by the existing planned lobby start-admission boundary. This audit does not replace that work; it defines the matching exit/re-entry half of the lifecycle.
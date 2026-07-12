# Start, Cancel and Commit Admission Map

**Timestamp:** `2026-07-12T09-38-46-04-00`

## Start admission

```txt
StartRunCommand
  -> route supports start?
  -> requested mode matches session?
  -> room exists when host?
  -> roster/readiness revisions current?
  -> no active generation or supersession permitted?
  -> allocate loading generation
```

## During loading

```txt
each RAF/timeout callback
  -> generation still active?
  -> cancellation token open?
  -> route/session owner still alive?
  -> execute step or return cancelled/stale
```

## Commit admission

```txt
candidate bootstrap ready
  -> command still current?
  -> route/session/room/roster/readiness unchanged?
  -> candidate run valid?
  -> transport generation current?
  -> atomically commit stores
  -> emit exactly-once transport messages
```

## Cancellation sources

```txt
newer StartRunCommand
return to title
return to lobby
session reset
transport replacement
component unmount
pagehide/runtime stop
bootstrap failure
```

## Typed outcomes

```txt
COMMITTED
CANCELLED_BY_USER
CANCELLED_BY_ROUTE
CANCELLED_BY_UNMOUNT
SUPERSEDED
STALE_ROUTE
STALE_SESSION
STALE_ROOM
STALE_ROSTER
STALE_CONNECTION
BOOTSTRAP_REJECTED
TRANSPORT_FAILED
FIRST_FRAME_FAILED
```

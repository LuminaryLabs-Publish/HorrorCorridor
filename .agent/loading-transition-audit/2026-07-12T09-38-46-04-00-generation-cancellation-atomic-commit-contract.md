# Loading Generation, Cancellation and Atomic Commit Contract

**Timestamp:** `2026-07-12T09-38-46-04-00`

## State machine

```txt
IDLE
  -> ADMITTED
  -> LOADING
  -> VALIDATING
  -> COMMITTING
  -> WAITING_FOR_FIRST_FRAME
  -> READY

terminal alternatives:
  CANCELLED
  SUPERSEDED
  STALE
  REJECTED
  FAILED
```

## Ownership

Every loading step owns:

```txt
command ID
loading generation
runtime/session owner generation
route predecessor revision
room/roster/readiness revisions
cancellation token
RAF lease IDs
timeout lease IDs
candidate bootstrap ID
```

## Atomic commit boundary

The following outputs must change together:

```txt
session mode and peer identity
room and lobby roster
authoritative snapshot
UI route/game screen/pause/overlay
runtime readiness
host START_GAME receipt
host initial SYNC receipt
run generation
```

Partial commit is failure and must roll back to the predecessor snapshot.

## Retirement

```txt
commit successor
  -> cancel predecessor leases
  -> reject predecessor callbacks
  -> retire predecessor candidate resources
  -> retain one bounded result/journal record
```

## First-frame rule

Loading does not reach `READY` when stores are written. It reaches `READY` only after the renderer presents a frame whose run generation, snapshot generation and world-resource generation match the committed bootstrap receipt.

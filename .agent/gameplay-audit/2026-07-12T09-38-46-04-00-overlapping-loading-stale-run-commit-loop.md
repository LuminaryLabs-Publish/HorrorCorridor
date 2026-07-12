# Overlapping Loading and Stale Run Commit Loop

**Timestamp:** `2026-07-12T09-38-46-04-00`

## Current loop

```txt
Start action
  -> async loading begins
  -> route and stores remain globally mutable during yields
  -> async loading completes
  -> run bootstrap commits without predecessor validation
```

## Solo overlap

```txt
solo start A
  -> generate room/seed A after wait
solo start B
  -> generate room/seed B after wait
both can commit
  -> whichever completes last owns stores
  -> first runtime initialization may still own the other world
```

## Host stale-input loop

```txt
host start captures lobbyPlayers
  -> waits through loading steps
  -> peer joins/leaves or readiness changes
  -> captured roster is used to bootstrap
  -> host publishes stale START_GAME and SYNC
```

## Cancelled-owner loop

```txt
load begins
  -> component unmount/session reset/transport replacement
  -> cleanup destroys transport only
  -> async function is still alive
  -> it resumes and writes PLAYING, room, snapshot and readiness
```

## Required gameplay rule

A run may become active only from one committed loading generation whose sealed lobby/session inputs are still current. Superseded, cancelled or stale transitions must return typed results and perform no gameplay mutation.

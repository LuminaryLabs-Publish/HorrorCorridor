# Start Command Central Admission Map

**Timestamp:** `2026-07-12T09-48-15-04-00`

## Current admission

```txt
solo Start
  -> no busy state
  -> no command identity
  -> no generation allocation
  -> destroy transport and reset UI
  -> await loading steps
  -> commit

host Start
  -> sessionMode must equal host
  -> room must exist
  -> capture local identity
  -> await loading steps
  -> commit retained room/roster/connection state
  -> broadcast
```

## Required admission

```txt
StartRunCommand
  -> validate route and session mode
  -> validate room, roster, readiness and connection revisions
  -> allocate command ID and loading generation
  -> reject duplicate or admit explicit supersession
  -> seal inputs
  -> publish LoadingStartedResult

async completion
  -> validate cancellation token
  -> validate route/session/loading predecessor
  -> validate candidate bootstrap
  -> commit atomically or return typed terminal rejection
```

## Terminal results

```txt
committed
cancelled
superseded
stale-route
stale-session
stale-lobby
stale-connection
invalid-bootstrap
transport-failed
render-readiness-failed
```

The current UI button state is not proof that a start command remains authorized after the asynchronous loading boundary.

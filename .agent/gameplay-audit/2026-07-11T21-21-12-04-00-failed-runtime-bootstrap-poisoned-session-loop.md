# Failed Runtime Bootstrap and Poisoned Session Loop

**Timestamp:** `2026-07-11T21-21-12-04-00`

## Current loop

```txt
player starts solo or host run, or client receives SYNC
  -> authoritative snapshot stored
  -> screen becomes PLAYING
  -> readiness becomes true
  -> GameCanvas mounts
  -> initialized becomes true
  -> runtime resources are acquired
  -> RAF begins gameplay
```

## Failure loop

```txt
startup throws after one or more acquisitions
  -> gameplay screen/readiness may already indicate active
  -> initialized remains true
  -> snapshot subscription does not attempt initialization again
  -> cleanupRuntime may still be no-op
  -> no startup failure routes back to loading/lobby
  -> no retry command can prove a clean baseline
```

## Gameplay impact

A failed visual runtime is not merely a render defect. The product can retain an admitted run and network session while local input, simulation presentation and interaction are unavailable. Host or client transport may continue receiving events against a UI that cannot prove its runtime exists.

## Required gameplay policy

```txt
run bootstrap may create authored game state
runtime startup must separately admit that snapshot
PLAYING requires StartupSuccess and first-frame acknowledgement
failed startup routes to a typed recoverable state
host/client transport remains explicitly suspended or active by policy
retry creates a new runtime generation
quit/return retires the failed generation before session mutation
```

## Required observations

```txt
session/run/epoch identity
snapshot revision
startup transaction and generation
startup phase
acquired/retired/unresolved lease counts
transport policy during failure
first committed frame
retry count and terminal result
```

No gameplay source changed. The audit defines the boundary needed before startup failure can be recovered safely.

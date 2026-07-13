# Join Command Result Central Reconciliation Map

**Timestamp:** `2026-07-13T03-38-31-04-00`

## Summary

The current submit path is an imperative sequence of store mutations and transport creation. It has no typed command identity, pending state machine, timeout result, cancellation receipt or source-bound acknowledgement.

## Plan ledger

**Goal:** map every user, transport and host interaction onto one generation-fenced join command and one exactly-once terminal result.

- [x] Trace form activation through transport callbacks.
- [x] Separate intent, candidate, transport and canonical state.
- [x] Define terminal result handling.
- [ ] Implement the interaction reducer and fixtures.

## Current interaction map

```txt
Join lobby click
  -> direct enterClientLobby()
  -> trim/uppercase values
  -> mutate canonical stores
  -> create transport
  -> call connectToHost()
  -> project provisional lobby

peer/status
  -> direct shared connection-status mutation

peer/connection-open
  -> no join-attempt completion result

peer/message
  -> direct room, roster, route or snapshot mutation

Back
  -> destroy transport and clear stores
  -> no cancellation result or stale-event fence
```

## Required interaction map

```txt
Join lobby click
  -> ClientJoinCommand
  -> validation result
  -> JoinAttemptCreated
  -> Connecting
  -> AwaitingHost
  -> AwaitingAdmission
  -> exactly one terminal JoinResult

Accepted
  -> atomic canonical session commit
  -> accepted lobby projection

InvalidInput | RoomUnavailable | RoomFull | Rejected |
TransportUnavailable | TimedOut | Cancelled | Stale |
Duplicate | Failed
  -> zero canonical room/roster mutation
  -> complete resource retirement
  -> reason projection and retry
```

## Event admission requirements

Every transport or protocol event must carry or resolve:

```txt
runtime session ID
JoinAttemptId
JoinAttemptGeneration
transport mode
connection ID
connection generation
remote host peer ID
room candidate identity
message or acknowledgement identity
```

## Cancellation rules

```txt
cancel is idempotent
cancel produces one terminal result
cancel retires pending transport resources
late open/error/message events become Stale
retry increments generation
retry cannot inherit predecessor callbacks or state
```

## Input rules

```txt
shared host/client join-code grammar
defined case normalization
empty-code rejection
bounded length and allowed characters
display-name code-point and byte limits
control-character rejection
zero store mutation on invalid input
```

## Validation boundary

The current source has no command reducer or typed result. This document defines the missing interaction contract without changing behavior.
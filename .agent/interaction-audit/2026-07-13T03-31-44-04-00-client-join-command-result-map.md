# Client Join Command and Result Map

**Timestamp:** `2026-07-13T03-31-44-04-00`

## Summary

Join interaction currently invokes a void callback that immediately mutates stores and begins transport work. There is no command identity, pending result, typed rejection, cancellation receipt or retry generation.

## Plan ledger

**Goal:** convert join activation into one command/result flow with explicit ownership and zero-mutation rejection.

- [x] Map raw input to current callbacks.
- [x] Map store and transport side effects.
- [x] Define result vocabulary and consumer behavior.
- [ ] Implement the command handler and result projection.

## Current interaction map

```txt
Join lobby button
  -> onSubmit(): void
  -> enterClientLobby(): void
      -> normalize strings inline
      -> mutate session stores
      -> mutate UI stores
      -> mutate runtime readiness
      -> create transport
      -> call connectToHost()
      -> ignore boolean return
```

## Missing interaction records

```txt
ClientJoinCommand
JoinAttemptId
JoinAttemptGeneration
JoinValidationResult
JoinTransportOpenResult
HostPresenceResult
RoomAdmissionResult
JoinCancellationReceipt
JoinRollbackReceipt
FirstJoinedLobbyFrameAck
```

## Required result vocabulary

```txt
Accepted
InvalidJoinCode
InvalidDisplayName
RoomUnavailable
RoomFull
HostRejected
TransportUnavailable
TimedOut
Cancelled
Stale
Duplicate
Failed
```

Each result must include:

```txt
attempt ID and generation
requested normalized code
transport mode and revision
terminal timestamp or logical tick
canonical room manifest only when accepted
bounded public reason
internal observation reference
zero-mutation or commit receipt
```

## Consumer map

```txt
JoinMenu
  -> emits ClientJoinCommand
  -> shows validation or pending state

join authority
  -> owns transport attempt and terminal result

session store
  -> consumes Accepted only

UI store
  -> projects pending, accepted or rejected result

protocol consumer
  -> admits messages only for accepted attempt generation

render proof
  -> acknowledges first frame of accepted canonical lobby
```

## Withheld claim

No claim is made that current join activation has deterministic result semantics, cancellation safety or retry isolation.

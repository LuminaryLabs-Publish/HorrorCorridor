# Unacknowledged Client Join Loop

**Timestamp:** `2026-07-13T03-31-44-04-00`

## Summary

Client gameplay/session state advances from join intent to lobby membership without a host-issued acceptance result. The provisional room can later be replaced by host messages, but there is no transaction proving that the replacement belongs to the active attempt.

## Plan ledger

**Goal:** prevent an unaccepted join request from becoming canonical session or gameplay state.

- [x] Trace provisional player and room creation.
- [x] Trace host message replacement of room and roster.
- [x] Identify missing attempt-generation and admission fencing.
- [ ] Gate all client session mutation behind a typed join result.

## Current loop

```txt
submit requested code and name
  -> generate client player ID
  -> infer provisional room ID from requested code
  -> install provisional room and player
  -> mark session mode client
  -> enter client lobby
  -> begin connection
  -> later START_GAME, SYNC or LOBBY_EVENT may replace state
```

## Reachable failure path

```txt
attempt A requests room X
  -> provisional session A is installed
  -> user exits, retries or changes room
  -> attempt B becomes current
  -> late status or message from A arrives without JoinAttemptGeneration
  -> shared stores have no attempt fence
  -> predecessor data can affect successor connection or session state
```

## Gameplay implications

```txt
room membership can be visually implied before admission
client readiness can be toggled in a provisional roster
host messages are not correlated to the join attempt that requested them
session reset is procedural rather than represented by a terminal join result
retry behavior cannot prove predecessor retirement
```

## Required loop

```txt
join intent
  -> validate and allocate attempt
  -> connect without canonical session mutation
  -> receive host-presence and admission acknowledgement
  -> commit canonical room/member state once
  -> admit later protocol messages only for the accepted attempt generation
  -> cancel, timeout or reject with zero canonical mutation
```

## Withheld claim

No claim is made for client-room membership, retry isolation, late-event safety or admission-to-gameplay continuity.

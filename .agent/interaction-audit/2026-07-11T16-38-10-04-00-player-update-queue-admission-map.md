# Interaction Audit: Player Update Queue Admission Map

**Timestamp:** `2026-07-11T16-38-10-04-00`

## Summary

Client movement updates include an input sequence, but the host callback applies the payload immediately and does not retain or compare that sequence. There is no bounded per-peer queue, coalescing policy or step-level selection result.

## Plan ledger

**Goal:** turn each inbound movement packet into an admitted or rejected input record before it can influence authoritative gameplay state.

- [x] Trace sequence generation on the client.
- [x] Trace host event metadata and payload fields.
- [x] Confirm sequence is not forwarded to `applyNetworkPlayerUpdate`.
- [x] Confirm no queue or per-player admission state exists.
- [x] Define a bounded admission and coalescing map.
- [ ] Implement after canonical connection/actor/run identity exists.

## Current message path

```txt
client
  networkUpdateSequence += 1
  -> payload.input.sequence
  -> senderId and payload.playerId
  -> absolute pose and velocity

host transport event
  connectionId
  remotePeerId
  message.senderId
  message.payload.playerId
  message.payload.input.sequence
  message timestamp

GameCanvas host callback
  -> reads payload.playerId and pose
  -> does not compare connection, sender and player identity here
  -> does not read input.sequence
  -> applies pose immediately
  -> publishes immediately
```

## Missing admission result

```txt
PlayerUpdateAdmissionResult
  command/update identity
  connection ID
  remote peer ID
  bound player ID
  received input sequence
  last accepted input sequence
  room/run/epoch
  receive timestamp and skew
  accepted/rejected/duplicate/stale/future/overflow status
  reason
```

## Required queue policy

A practical initial policy is:

```txt
one bounded queue per admitted player
monotonic sequence admission
reject duplicates and older sequences
cap future gaps
coalesce multiple updates targeting the same uncommitted simulation step
select the newest admitted update per player at step boundary
record superseded sequences as explicit no-apply results
```

This preserves responsiveness while preventing packet frequency from multiplying simulation and publication work.

## Required interaction with movement authority

The cadence layer should not approve movement geometry. It should deliver one admitted input/pose candidate to movement authority, which then validates:

```txt
maximum displacement
maximum speed and acceleration
maze collision
finite coordinates
rotation and pitch bounds
step delta and timestamp skew
current run/epoch and active phase
```

## Required interaction with snapshot publication

```txt
accepted packet
  != committed movement
  != committed simulation step
  != published snapshot
  != rendered frame
```

Each stage needs a typed result and correlation ID.

## Fixture map

```txt
sequence 1 accepted
sequence 1 duplicate returns duplicate result
sequence 0 after 1 rejects stale
sequence 100 after 1 follows configured gap policy
three updates before one step coalesce deterministically
queue overflow does not grow memory or publication rate
wrong connection/sender/player binding rejects before queue
old run/epoch rejects before queue
one flood peer does not delay other peers
```

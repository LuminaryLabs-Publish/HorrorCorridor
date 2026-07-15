# Network movement audit: sender, sequence and kinematic settlement contract

**Timestamp:** `2026-07-14T20-58-46-04-00`

## Summary

The movement envelope already contains enough raw fields to support stronger admission, but current host consumption does not correlate them. Authority must bind the transport source to one actor, use sequence as monotonic evidence, and validate movement against the last accepted host revision.

## Plan ledger

**Goal:** specify the minimal settlement contract for safe client prediction and host-authoritative movement.

- [x] Identify identity fields.
- [x] Identify ordering fields.
- [x] Identify kinematic and collision predicates.
- [x] Define atomic participant settlement.
- [ ] Implement and execute the contract.

## Identity contract

```txt
remotePeerId
  == admitted connection peer
senderId
  == admitted player for that peer
payload.playerId
  == senderId
roomId
  == active room
sessionGeneration
  == active session
connectionGeneration
  == active connection
```

## Ordering contract

```txt
sequence > lastAcceptedSequence[player]
updateId not committed
received generation is current
host-time delta is positive and capped
reordered, duplicate and superseded updates do not mutate state
```

## Kinematic contract

```txt
position and velocity values are bounded
pitch and rotation satisfy policy
horizontal displacement <= allowed speed budget
velocity change <= acceleration budget
path from prior accepted pose to candidate is swept through maze collision
candidate remains inside admitted maze space
```

## Atomic participants

```txt
player pose
player velocity and view
held cube position
current GameState
latestHostSnapshot
runtime authoritative snapshot
network publication
movement journal
visible world/minimap/debug revision
```

All participants commit under one `PlayerMovementRevision` or all retain their predecessor.
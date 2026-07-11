# HorrorCorridor Player Update Admission Result Map

**Timestamp:** `2026-07-11T03-08-43-04-00`

## Current interaction map

```txt
local input
  -> input snapshot
  -> networkUpdateSequence += 1
  -> PLAYER_UPDATE
       senderId
       roomId
       payload.playerId
       payload.input.sequence
       payload.input movement fields
       payload.pose
  -> host event callback
  -> applyNetworkPlayerUpdate(payload.playerId, payload.pose)
  -> publishAuthoritativeState
```

## Fields currently present but not authoritative

```txt
senderId
requestId
input.sequence
input.moveForward
input.moveStrafe
input.lookYaw
input.interact
message timestampMs
```

The host movement mutation uses only `payload.playerId` and `payload.pose`.

## Required preflight

```txt
message type and protocol version
room/game/run/epoch identity
active phase
connection -> sender binding
sender -> player binding
player roster membership
client sequence order
message age and callback generation
movement elapsed-time budget
movement/collision result
```

## Required result vocabulary

```txt
accepted
no-change-duplicate
rejected-version
rejected-phase
rejected-room
rejected-game
rejected-run
rejected-epoch
rejected-connection
rejected-sender-player-mismatch
rejected-unknown-player
rejected-stale-sequence
rejected-future-sequence-policy
rejected-time-budget
rejected-speed-budget
corrected-collision
corrected-claimed-pose
```

## Required result row

```txt
requestId
senderId
playerId
roomId
gameId
runSessionId
sessionEpoch
clientSequence
status
reason
previousPose
claimedPose
acceptedPose
correctionDistance
collision flags
receivedAtMs
stateRevisionBefore
stateRevisionAfter
snapshotTick
```

## Consumer map

```txt
host GameCanvas
  consumes accepted pose result

corridor-authoritative-publication-kit
  publishes accepted sequence and pose

runtime debug
  records accepted/rejected result and counters

client prediction history
  consumes accepted sequence acknowledgement

client reconciliation
  consumes host pose and remaining unacknowledged input rows

camera/minimap/world
  consume reconciled pose projection
```

## Main finding

The protocol already carries most of the command evidence, but the active consumer collapses it into a direct pose assignment. The next adapter should return a typed admission result before any player or cube state mutates.

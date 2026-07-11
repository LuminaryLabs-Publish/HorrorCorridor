# HorrorCorridor Host Movement and Reconciliation DSK Map

**Timestamp:** `2026-07-11T03-08-43-04-00`

## Current flow

```txt
client GameCanvas
  -> stepLocalPose(deltaMs)
  -> resolveMazeCollision locally
  -> createPlayerUpdateMessage
       input.sequence
       moveForward
       moveStrafe
       lookYaw
       interact
       claimed position/rotation/pitch/velocity
  -> client transport send

host GameCanvas
  -> peer/message PLAYER_UPDATE
  -> applyNetworkPlayerUpdate
  -> copy claimed pose into selected player
  -> publishAuthoritativeState
  -> buildReplicatedSnapshot
  -> SYNC broadcast

client GameCanvas while PLAYING
  -> read latest snapshot
  -> stepLocalPose(deltaMs)
  -> sync carry state from snapshot
  -> render snapshot plus local poseRef
  -> do not reconcile local pose to host pose
```

## Current ownership problem

The producer and consumer boundaries are inverted:

```txt
client owns final movement result
host owns only snapshot publication
client owns continued pose after host publication
```

The host does not own sender/player identity, sequence order, movement budget, collision resolution or authoritative next-pose calculation. The client does not own an acknowledgement/replay reconciliation transaction.

## Required DSK boundary

```txt
PLAYER_UPDATE envelope
  -> session-message-admission-kit
  -> connection-player-identity-kit
  -> player-update-sequence-admission-kit
  -> host-movement-budget-kit
  -> host-maze-collision-authority-kit
  -> host-movement-simulation-kit
  -> AuthoritativePoseResult
  -> movement-admission-ledger-kit
  -> authoritative snapshot with accepted sequence
  -> snapshot-acceptance-policy-kit
  -> client-prediction-history-kit
  -> client-pose-reconciliation-kit
  -> correction-smoothing-policy-kit
  -> ReconciliationResult
  -> movement-debug-projection-kit
```

## Domain contracts

### Player update command

```txt
input:
  senderId
  connectionId
  playerId
  roomId
  gameId
  runSessionId
  sessionEpoch
  clientSequence
  sampledAtMs
  receivedAtMs
  input snapshot
  claimed pose for compatibility/telemetry
```

### Connection/player identity

```txt
accepted when:
  connection maps to sender
  sender maps to player
  player belongs to sealed roster
  room/game/run/epoch match

rejected reasons:
  unknown-connection
  sender-mismatch
  player-mismatch
  roster-mismatch
  wrong-room
  wrong-game
  wrong-run
  wrong-epoch
```

### Sequence admission

```txt
accepted
no-change-duplicate
rejected-stale
rejected-gap-policy
accepted-epoch-reset
```

### Host movement simulation

```txt
previous authoritative pose
  + admitted input
  + admitted elapsed time
  + movement constants
  -> candidate host pose
  -> maze collision authority
  -> authoritative next pose
```

The claimed pose can be compared for diagnostics during compatibility rollout, but it must not be the mutation source.

### Authoritative pose result

```txt
status
reason
playerId
clientSequence
previousPose
nextPose
claimedPose
correctionDistance
collision flags
movement budget
state revision
```

### Client prediction history

```txt
sequence -> input + local predicted result
acknowledged sequence removes prior rows
remaining later inputs replay from authoritative host pose
history clears on epoch/reset/reconnect/pause-exit policy
```

### Reconciliation result

```txt
none
smooth
snap
rejected-snapshot
cleared-on-epoch
```

Each result records authoritative pose, replayed input count, divergence, correction duration and final projected pose.

## Kit map

```txt
player-update-command-kit
connection-player-identity-kit
player-update-sequence-admission-kit
host-movement-budget-kit
host-maze-collision-authority-kit
host-movement-simulation-kit
authoritative-pose-result-kit
movement-admission-ledger-kit
client-prediction-history-kit
client-pose-reconciliation-kit
correction-smoothing-policy-kit
movement-debug-projection-kit
movement-authority-fixture-kit
client-reconciliation-fixture-kit
```

## Compatibility order

```txt
1. Add run/session identity and snapshot acceptance.
2. Bind sender to player and admit sequence.
3. Validate the current claimed pose against budget/collision while retaining current movement feel.
4. Change the host mutation source from claimed pose to input-derived host simulation.
5. Add accepted-sequence acknowledgement.
6. Add client history pruning and replay.
7. Add deterministic smoothing/snap policy.
8. Remove claimed pose from authority after browser parity proof.
```

## Main finding

The current network path publishes authoritative snapshots without an authoritative movement transaction. The correct DSK cut is one host-owned command/result boundary plus one client-owned acknowledgement/replay boundary, both scoped to the same run identity and sequence ledger.

# HorrorCorridor Player Update Admission and Correction Contract

**Timestamp:** `2026-07-11T03-08-43-04-00`

## Authority rule

The host must own the accepted next pose for every remote player. The client may predict for responsiveness, but its claimed pose is evidence, not authority.

## Host-owned state

```txt
connection/player binding
last accepted client sequence per player and epoch
last authoritative pose
last admitted movement time
movement constants and budget
maze collision result
accepted/rejected counters
last authoritative pose result
```

## Client-owned transient state

```txt
next local client sequence
sequence-keyed prediction history
current projected pose
last accepted host sequence
last reconciliation result
```

## Command contract

```txt
PlayerUpdateCommand {
  requestId
  senderId
  connectionId
  playerId
  roomId
  gameId
  runSessionId
  sessionEpoch
  sequence
  sampledAtMs
  receivedAtMs
  input
  claimedPose
}
```

## Host admission contract

```txt
preflight identity and phase
  -> sequence admission
  -> elapsed-time budget
  -> input-derived movement
  -> maze collision
  -> claimed-pose comparison
  -> authoritative pose commit
  -> held-cube synchronization
  -> result journal
  -> snapshot publication
```

No rejected or duplicate command may mutate player, cube, game tick or snapshot state.

## Snapshot acknowledgement contract

Each player projection must expose enough information to reconcile:

```txt
playerId
authoritative pose
lastAcceptedClientSequence
movementRevision
sessionEpoch
```

This can be additive to protocol version 1 during migration.

## Client correction contract

```txt
accepted snapshot
  -> verify run/epoch and snapshot acceptance
  -> find local player row
  -> remove prediction history <= acknowledged sequence
  -> reset projected pose to host pose
  -> replay remaining inputs in sequence order
  -> compute divergence from current local projection
  -> choose none, smooth or snap
  -> publish ReconciliationResult
```

## Deterministic correction policy

```txt
none:
  divergence below epsilon

smooth:
  small bounded positional/angular divergence
  deterministic duration derived from distance and configured rate

snap:
  large divergence
  wall-side mismatch
  epoch/reset/reconnect
  invalid or missing prediction history
```

Exact thresholds must live in one immutable policy object and be fixture-backed.

## Required ledgers

```txt
movement admission ledger
  command identity
  status/reason
  sequence
  previous/claimed/accepted pose
  collision and budget evidence

reconciliation ledger
  snapshot tick
  acknowledged sequence
  dropped/replayed history counts
  divergence
  mode
  projected result
```

## Invariants

```txt
one sender cannot move another player
one sequence cannot mutate twice
stale sequence cannot overwrite a newer pose
host collision is final
claimed pose cannot bypass movement budget
host correction converges during PLAYING
camera, minimap, carry and debug use the reconciled projection
pause, exit and epoch change clear or fence movement state
```

## Main finding

The existing route has local prediction and host publication, but lacks the command/result and acknowledgement/replay contracts that make those two systems authoritative and convergent. This contract should be implemented as a domain boundary rather than more inline `GameCanvas` conditionals.

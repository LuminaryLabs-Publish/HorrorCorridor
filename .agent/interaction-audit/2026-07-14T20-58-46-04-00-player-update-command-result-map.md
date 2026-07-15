# Interaction audit: player update command/result map

**Timestamp:** `2026-07-14T20-58-46-04-00`

## Summary

`PLAYER_UPDATE` is handled as a mutation trigger rather than a result-bearing command. Sequence, sender, player, movement predicates and correction state are not surfaced as one inspectable result.

## Plan ledger

**Goal:** convert every client movement message into one typed, idempotent and observable host decision.

- [x] Map current input and output.
- [x] Define decision statuses and receipts.
- [x] Define projection acknowledgement.
- [ ] Implement the result path.

## Required command

```txt
ClientMovementUpdateCandidate {
  updateId
  sessionGeneration
  connectionGeneration
  remotePeerId
  senderId
  playerId
  roomId
  sequence
  input
  proposedPose
  receivedAtMs
}
```

## Required result

```txt
ClientMovementUpdateResult {
  status: Accepted | Corrected | Rejected | Stale | Duplicate
  reason
  updateId
  playerId
  sequence
  priorMovementRevision
  movementRevision
  acceptedPose?
  correctionPose?
  actorBindingReceipt
  sequenceReceipt
  kinematicReceipt
  collisionReceipt
  stateFingerprint
}
```

## Settlement map

```txt
Accepted/Corrected
  -> commit player and held-cube candidates
  -> publish one authoritative snapshot
  -> send origin correction/ack
  -> journal bounded evidence
  -> acknowledge matching frame

Rejected/Stale/Duplicate
  -> preserve player, cube and snapshot predecessor
  -> publish non-mutating result
  -> optionally send correction to accepted pose
```

No typed movement result currently exists.
# HorrorCorridor Next Steps

**Updated:** `2026-07-14T20-58-46-04-00`

## Summary

Add one narrow host-side movement admission authority around the existing client prediction and snapshot publication path. It should bind transport identity to one player, order updates, validate reachable motion through the maze, commit atomically and return an authoritative correction revision.

## Plan ledger

**Goal:** make multiplayer movement authoritative without replacing existing input, movement, collision, transport or renderer kits.

### Documentation

- [x] Audit `PLAYER_UPDATE` construction, host consumption, `networkRules`, held-cube synchronization and client rendering.
- [x] Preserve the 29-kit and two-adapter inventory.
- [x] Define the parent authority and fixture gate.

### Gate 1: identity and update admission

- [ ] Add `MovementUpdateId`, `SessionGeneration`, `ConnectionGeneration` and `PlayerMovementRevision`.
- [ ] Bind remote peer, envelope `senderId` and payload `playerId` to one admitted actor.
- [ ] Require the active room and session generation.
- [ ] Reject unknown, impersonated, stale, duplicate and superseded updates.

### Gate 2: sequence and time policy

- [ ] Persist the last accepted input sequence per player.
- [ ] Reject reordered or repeated sequence values.
- [ ] Derive an accepted movement interval from host time and bounded client cadence.
- [ ] Cap catch-up work instead of accepting one arbitrarily large displacement.

### Gate 3: kinematic admission

- [ ] Validate bounded position, velocity, yaw and pitch values.
- [ ] Enforce configured speed, acceleration and turn constraints.
- [ ] Sweep from the last accepted pose through maze collision.
- [ ] Reject wall crossings, out-of-maze positions and unreachable deltas.
- [ ] Decide whether the host simulates from input or clamps a pose candidate.

### Gate 4: atomic settlement

- [ ] Prepare player, held-cube, game-state and snapshot candidates.
- [ ] Commit all participants under one `PlayerMovementRevision`.
- [ ] Preserve the predecessor on rejection.
- [ ] Publish `ClientMovementUpdateResult` with predicate receipts.

### Gate 5: prediction correction and visible proof

- [ ] Send accepted pose/revision or rejection correction to the originating client.
- [ ] Reconcile local prediction without hiding large corrections.
- [ ] Bind world, camera, minimap and debug projection to the accepted revision.
- [ ] Publish `FirstAuthoritativeMovementFrameAck`.

### Gate 6: fixtures

- [ ] Valid forward movement at normal cadence.
- [ ] Sender/player impersonation.
- [ ] Duplicate, stale and reordered sequences.
- [ ] Teleport and excessive-speed update.
- [ ] Wall-crossing and out-of-maze update.
- [ ] Held-cube movement during rejected pose.
- [ ] Client correction after host rejection.
- [ ] Source, production-build and deployed-origin parity.

## Dependency order

```txt
connection and actor binding
  -> sequence and host-time admission
  -> kinematic and swept-collision validation
  -> atomic player and held-cube settlement
  -> prediction correction
  -> first authoritative movement frame
  -> source/build/deployed fixtures
```

## Completion boundary

Do not claim host-authoritative movement, anti-teleport safety or correction convergence until the complete fixture matrix passes on `main`.
# Gameplay audit: client pose teleport and wall-bypass loop

**Timestamp:** `2026-07-14T20-58-46-04-00`

## Summary

Client movement uses local collision prediction, but the host does not re-run movement or collision when receiving `PLAYER_UPDATE`. It accepts the supplied destination pose directly, so authoritative state is not proven to be reachable from the prior accepted pose.

## Plan ledger

**Goal:** ensure multiplayer progression depends on host-admitted movement rather than caller-authored coordinates.

- [x] Trace predicted motion and host mutation.
- [x] Trace held-cube propagation and snapshot publication.
- [x] Define rejection and rollback behavior.
- [ ] Implement movement fixtures.

## Current loop

```txt
client input
  -> local movement and collision prediction
  -> full pose sent to host
  -> host copies destination pose
  -> no speed, acceleration, wall sweep or maze-bound check
  -> held cube copies player position
  -> authoritative SYNC publishes
```

## Gameplay consequences to test

```txt
teleport between distant cells
cross a wall between accepted updates
move outside the maze
overwrite another player's pose
replay an older sequence
carry a cube through blocked geometry
reach the anomaly without admitted traversal
```

## Required result

Every update must produce `Accepted`, `Rejected`, `Stale`, `Duplicate` or `Corrected`, with zero mutation for all non-accepted states and an explicit correction for the originating client.
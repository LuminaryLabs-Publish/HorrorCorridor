# HorrorCorridor Silent No-op Reason Readback Map

**Timestamp:** `2026-07-09T22-50-53-04-00`

## Summary

The interaction layer is readable but result-poor. Most invalid branches return the original `GameState`, so local/host consumers cannot tell rejected commands apart from unchanged commands.

## Current silent no-op branches

```txt
pickUpCube
  -> not playing returns state
  -> missing player returns state
  -> already carrying returns state
  -> missing/too-far cube returns state

dropCube
  -> not playing returns state
  -> missing player returns state
  -> not carrying returns state

placeCubeAtEndAnomaly
  -> not playing returns state
  -> missing player returns state
  -> no carried cube returns state
  -> missing anomaly cell returns state
  -> too far from anomaly returns state
  -> no free target slot returns state

removeCubeFromEndAnomaly
  -> not playing returns state
  -> missing player returns state
  -> already carrying returns state
  -> missing anomaly cell returns state
  -> too far from anomaly returns state
  -> no occupied slot returns state
  -> wrong slot returns state
  -> missing cube id returns state

networkRules
  -> syncHeldCubesToPlayers unchanged returns state
  -> applyNetworkPlayerUpdate missing player returns state
  -> request-sync returns state
  -> toggle-ready returns state
  -> cancel returns state
  -> default returns state
```

## Required reason map

```txt
not-playing
missing-player
already-carrying
no-nearby-cube
no-carried-cube
missing-anomaly-cell
too-far-from-anomaly
no-free-slot
no-occupied-slot
wrong-slot
missing-cube-id
held-cube-already-synced
missing-player-update-target
request-sync-recovery
toggle-ready-unimplemented
cancel-unimplemented
unknown-action
```

## Readback targets

```txt
CommandResult.status
CommandResult.reason
CommandResult.changed
CommandResult.beforeSummary
CommandResult.afterSummary
PublishDecision.action
PublishDecision.reason
CommandJournal.latestReason
RuntimeDebugCommandProjection.latestRejectionReason
FixtureRow.expectedReason
```

## Next safe implementation order

```txt
1. add reason catalog
2. add snapshot summary helper
3. add interaction preflight helpers
4. add result wrappers while preserving legacy exports
5. add network result wrappers while preserving legacy exports
6. add fixture rows
7. add debug projection
8. splice GameCanvas consumers after fixture proof
```

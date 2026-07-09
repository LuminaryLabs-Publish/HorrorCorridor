# HorrorCorridor Interaction Audit

**Timestamp:** `2026-07-09T12-20-08-04-00`

## Interaction sources

```txt
keyboard interact button
client TRY_INTERACT message
host PLAYER_UPDATE message
host request-sync message
host toggle-ready/cancel/default action path
```

## Current interaction derivation

`GameCanvas.tsx` derives the interaction action from anomaly distance and whether the local player carries a cube.

```txt
distanceToEnd < 6 and hasCarriedCube -> place-cube-at-anomaly
distanceToEnd < 6 and no carried cube -> remove-cube-from-anomaly
not near anomaly and hasCarriedCube -> drop-cube
not near anomaly and no carried cube -> pickup-cube
```

## Missing reason coverage

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
request-sync recovery
toggle-ready policy not implemented
cancel policy not implemented
unknown action
player update missing player
held cube already synced
no state diff
```

## Preflight requirement

Every interaction path should have a preflight result before mutation.

```txt
input
  -> lookup player
  -> lookup carried cube
  -> lookup target cube or anomaly cell
  -> check distance
  -> check slot availability or slot target
  -> return accepted preflight or rejected reason
```

## Consumer requirement

Local and host consumers must not infer rejection from `nextState === currentGameState`.

They should consume explicit `CommandResult` and `PublishDecision` records.

## Next safe ledge

```txt
HorrorCorridor Result-First Command Readback Ledger Refresh + Fixture Gate
```

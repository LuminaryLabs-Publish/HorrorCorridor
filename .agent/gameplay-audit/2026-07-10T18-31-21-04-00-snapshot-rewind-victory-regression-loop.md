# HorrorCorridor Snapshot Rewind and Victory Regression Loop

**Timestamp:** `2026-07-10T18-31-21-04-00`

## Gameplay loop under audit

```txt
move through maze
  -> pick up colored cube
  -> carry to anomaly
  -> place in ordered slot
  -> repeat until sequence completes
  -> host publishes victory snapshot
  -> client projects COMPLETED
```

## Regression path

```txt
accept victory snapshot at tick N
  -> delayed playing snapshot at tick N-1 arrives
  -> GameShell accepts it without monotonic preflight
  -> authoritativeSnapshot is replaced
  -> screen and gameScreen return to playing
  -> pause/completion projection diverges from previously accepted progress
```

The same rewind can restore removed cubes, earlier slot occupancy, older ooze, or older remote-player positions.

## Required gameplay authority rules

```txt
only an accepted monotonic snapshot may mutate gameplay projection
victory is monotonic inside one authority epoch
older playing state cannot replace accepted victory
accepted gameId and seed remain stable inside one epoch
recovery reset requires an explicit new authority epoch
```

## Fixture rows

```txt
playing tick 20 -> victory tick 21 accepted
victory tick 21 -> playing tick 20 rejected stale
victory tick 21 -> conflicting tick 21 rejected
new recovery epoch tick 1 accepted only through explicit reset policy
final cube, anomaly, ooze, player, and UI state remain equal to latest accepted snapshot
```

## Finding

Victory and objective progress are currently vulnerable to transport delivery order because the UI treats message arrival as authority. Gameplay progression needs an accepted-snapshot record, not raw last-message-wins replacement.
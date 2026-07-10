# HorrorCorridor Silent No-op Publish Decision Map

**Timestamp:** `2026-07-10T01-49-13-04-00`

## Current interaction decision tree

```txt
interact key
  -> compute distanceToEnd
  -> check whether local player carries a cube
  -> if near anomaly and carrying: place-cube-at-anomaly
  -> if near anomaly and not carrying: remove-cube-from-anomaly
  -> if away from anomaly and carrying: drop-cube
  -> if away from anomaly and not carrying: pickup-cube
```

## Silent no-op branches

```txt
pickUpCube
  -> not playing
  -> missing player
  -> already carrying
  -> no loose cube nearby
  -> requested cube not found
  -> requested cube too far

dropCube
  -> not playing
  -> missing player
  -> not carrying

placeCubeAtEndAnomaly
  -> not playing
  -> missing player
  -> not carrying
  -> missing anomaly cell
  -> too far from anomaly
  -> no free slot
  -> requested slot occupied or missing

removeCubeFromEndAnomaly
  -> not playing
  -> missing player
  -> already carrying
  -> missing anomaly cell
  -> too far from anomaly
  -> no occupied slot
  -> requested slot is not last occupied slot
  -> occupied slot lost cube id

networkRules
  -> missing player update
  -> held cube already synced
  -> request-sync returns unchanged state
  -> toggle-ready returns unchanged state
  -> cancel returns unchanged state
  -> default returns unchanged state
```

## Current publish decision problem

```txt
local authority:
  nextState === currentGameState -> return silently
  changed -> publishAuthoritativeState('resync')

host authority:
  PLAYER_UPDATE -> publishAuthoritativeState('resync')
  TRY_INTERACT -> publishAuthoritativeState('recovery' for request-sync else 'resync')
  no explicit rejected/unchanged skip decision
```

## Required publish decision rows

```txt
accepted changed interaction -> publish resync
accepted unchanged interaction -> no-op skip
rejected interaction -> skip with reason
request-sync -> publish recovery
player update accepted changed -> publish resync
player update missing player -> skip with reason
held cube sync changed -> publish resync
held cube already synced -> no-op skip
ooze changed -> publish resync
ooze unchanged -> no-op skip
victory complete -> publish victory and commit completion
victory rollback -> publish resync
```

## Interaction finding

The interaction rules are readable and stable enough to wrap.

Do not rewrite interaction behavior first. Add preflight/result wrappers that preserve current `GameState` behavior, then fixture the result rows.

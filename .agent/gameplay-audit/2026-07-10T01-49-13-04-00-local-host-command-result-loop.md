# HorrorCorridor Local Host Command Result Loop

**Timestamp:** `2026-07-10T01-49-13-04-00`

## Gameplay loop

```txt
open app
  -> select solo, host, or join
  -> mount GameCanvas
  -> pointer-lock movement
  -> press interact
  -> action derives from distance-to-end and carried-cube state
  -> pickup/drop/place/remove through networkRules -> interactionRules
  -> host or local authority applies GameState-only command
  -> held cube sync follows
  -> ordered anomaly sequence may mark victory
  -> publishAuthoritativeState sends resync/recovery
  -> render/minimap/HUD/debug consume latest snapshot
```

## Current local path

```txt
applyInteraction()
  -> derive action
  -> applyNetworkInteractionRequest(currentGameState, command)
  -> if nextState === currentGameState return silently
  -> syncHeldCubesToPlayers(nextState)
  -> publishAuthoritativeState('resync')
  -> if currentGameState.gameState === 'victory' commitVictory()
```

## Current host path

```txt
PLAYER_UPDATE
  -> applyNetworkPlayerUpdate
  -> syncLocalCarryStateFromGameState
  -> publishAuthoritativeState('resync')

TRY_INTERACT
  -> applyNetworkInteractionRequest
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState('recovery' when action is request-sync else 'resync')
  -> commitVictory when gameState is victory
```

## Gameplay authority gaps

```txt
- local rejected interactions are silent no-ops.
- host rejected TRY_INTERACT commands still flow through a publish call.
- request-sync is not represented as a publish-only recovery result.
- toggle-ready and cancel are not represented as explicit skipped results.
- unknown/default actions are not represented as skipped unknown-action results.
- ooze spawn, decay, and no-state-diff paths are not command rows.
- victory and victory rollback are not command rows.
- publish/no-publish decisions are not fixture-readable.
```

## Next gameplay proof rows

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly
accepted place final anomaly slot as victory
rejected place too far from anomaly
rejected place with no free slot
accepted remove last anomaly cube
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update for missing player
accepted held cube sync
unchanged held cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
victory rollback if slots become invalid
```

## Main gameplay finding

The game should not receive more content or visual work next.

The useful cut is a deterministic command-result gameplay fixture that proves what each local/host command does before `GameCanvas` consumes result metadata.

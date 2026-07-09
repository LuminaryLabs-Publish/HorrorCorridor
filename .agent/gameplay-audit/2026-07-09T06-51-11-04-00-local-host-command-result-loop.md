# Gameplay Audit: Local/Host Command Result Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-51-11-04-00`

## Gameplay loop

```txt
player enters corridor
  -> move/look with pointer lock
  -> locate colored cubes
  -> interact to pick up loose cube
  -> carry cube through maze
  -> interact to drop or place at anomaly
  -> sequence slots validate ordered color completion
  -> ooze cadence pressures navigation
  -> win when ordered anomaly sequence is solved
```

## Current local authority loop

```txt
interact key
  -> GameCanvas derives action
  -> applyNetworkInteractionRequest(currentGameState, action)
  -> interactionRules applies pickup/drop/place/remove or returns original state
  -> if nextState === currentGameState, return silently
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState('resync')
  -> commitVictory if gameState is victory
```

## Current host authority loop

```txt
peer message: PLAYER_UPDATE
  -> applyNetworkPlayerUpdate
  -> sync carry state
  -> publishAuthoritativeState('resync')

peer message: TRY_INTERACT
  -> applyNetworkInteractionRequest
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState('recovery' if request-sync else 'resync')
  -> commitVictory if gameState is victory
```

## Gameplay gap

Gameplay rules are functional, but result semantics are invisible.

The player can attempt invalid interactions, host/client can process no-op actions, and victory can happen, but the runtime cannot explain these as explicit command outcomes.

## Required gameplay result rows

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
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
local consumer skips rejected/no-op broadcast
local consumer publishes accepted changed/victory
host consumer skips rejected TRY_INTERACT broadcast
host consumer publishes request-sync recovery
```

## Gameplay-safe implementation rule

Keep the existing player-facing loop intact.

Do not alter cube distance thresholds, anomaly distance, movement, maze generation, ooze cadence, snapshot shape, minimap, or completion UI until result fixtures prove behavior parity.

## Next consumer behavior

```txt
CommandResult.status accepted + changed
  -> publish resync

CommandResult.status accepted + unchanged
  -> no-op or skip, depending helper context

CommandResult.status rejected
  -> journal and skip publish

CommandResult.status skipped
  -> journal and skip publish

CommandResult.status publish-only
  -> publish recovery/full-sync

CommandResult.status victory
  -> publish victory and commit completion
```

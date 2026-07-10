# HorrorCorridor Gameplay Audit: Local/Host Command Result Loop

**Timestamp:** `2026-07-10T03-49-48-04-00`

## Current gameplay loop

```txt
solo or host local interaction
  -> GameCanvas derives action from distance-to-end and carried cube
  -> applyNetworkInteractionRequest(currentGameState, action)
  -> unchanged state returns silently
  -> changed state syncs held cubes
  -> publishAuthoritativeState('resync')
  -> victory state triggers commitVictory()

client interaction
  -> GameCanvas derives action
  -> createInteractionRequestMessage(...)
  -> host receives TRY_INTERACT
  -> applyNetworkInteractionRequest(currentGameState, action)
  -> syncHeldCubesToPlayers(...)
  -> publishAuthoritativeState(action === 'request-sync' ? 'recovery' : 'resync')
  -> victory state triggers commitVictory()

host player update
  -> host receives PLAYER_UPDATE
  -> applyNetworkPlayerUpdate(...)
  -> syncLocalCarryStateFromGameState(...)
  -> publishAuthoritativeState('resync')

ooze and win
  -> advanceOozeTrail(...)
  -> validateOrderedSequenceCompletion(...)
  -> return GameState only
```

## Gameplay gaps

```txt
rejected local interaction has no CommandResult row
rejected host TRY_INTERACT can still pass through a resync publish branch
request-sync recovery is a reason string, not a publish decision record
toggle-ready/cancel are skipped by returning state, not explicit lobby-policy rows
unknown/default action is not a stable skipped reason
player update for missing player is unchanged without reason metadata
held cube sync unchanged path has no reason metadata
ooze no-spawn and no-decay paths have no reason metadata
victory and rollback are not explicit command outcomes
```

## Gameplay proof needed before behavior changes

```txt
accepted pickup row
rejected pickup while carrying row
rejected pickup with no target row
accepted drop row
rejected drop without carried cube row
accepted place row
victory place row
rejected place too far row
accepted remove row
rejected remove wrong slot row
request-sync publish-only recovery row
toggle-ready skipped row
cancel skipped row
unknown action skipped row
player update accepted row
missing player unchanged row
ooze spawn/decay/no-state-diff rows
victory completion and rollback rows
```

## Safe next gameplay ledge

Add result-returning wrappers beside the current rules. Keep the legacy `GameState` exports compatible until fixtures prove every row.

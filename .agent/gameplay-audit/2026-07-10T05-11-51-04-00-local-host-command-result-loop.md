# Gameplay Audit: Local / Host Command Result Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T05-11-51-04-00`

## Current gameplay loop

```txt
start menu
  -> solo / host / join
  -> lobby / loading / readiness
  -> GameCanvas runtime
  -> first-person movement
  -> interact key derives action
  -> pickup/drop/place/remove cubes
  -> ordered sequence may set victory
  -> ooze cadence mutates trail
  -> host/client snapshots replicate state
  -> renderer/minimap/HUD/debug consume snapshot
```

## Current command loop

```txt
Local solo/host:
  action derived in GameCanvas
  -> applyNetworkInteractionRequest(...)
  -> if nextState === currentGameState return silently
  -> syncHeldCubesToPlayers(...)
  -> publishAuthoritativeState('resync')
  -> commitVictory if gameState === victory

Host receiving TRY_INTERACT:
  message payload action
  -> applyNetworkInteractionRequest(...)
  -> syncHeldCubesToPlayers(...)
  -> publishAuthoritativeState('recovery' for request-sync else 'resync')
  -> commitVictory if gameState === victory

Host receiving PLAYER_UPDATE:
  message payload pose
  -> applyNetworkPlayerUpdate(...)
  -> syncLocalCarryStateFromGameState(...)
  -> publishAuthoritativeState('resync')
```

## Gameplay proof gap

```txt
accepted pickup row missing
rejected pickup while carrying row missing
rejected pickup no nearby cube row missing
accepted drop row missing
rejected drop without cube row missing
accepted place row missing
victory place row missing
rejected place too far row missing
accepted remove row missing
rejected remove wrong slot row missing
request-sync recovery row missing
toggle-ready skipped row missing
cancel skipped row missing
unknown-action skipped row missing
player-update missing-player row missing
ooze spawn/decay/no-state-diff rows missing
victory and victory rollback rows missing
```

## Gameplay finding

Gameplay can stay unchanged. The next pass should create typed rows that prove current behavior before any gameplay expansion or rule rewrite.

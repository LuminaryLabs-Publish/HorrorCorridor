# Gameplay Audit — Local/Host Command Consumer Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T16-00-13-04-00`

## Current gameplay loop

```txt
player enters PLAYING
  -> pointer lock controls camera
  -> keyboard moves through maze with collision
  -> interact derives action from distance-to-end and carry state
  -> loose cube pickup / carried cube drop / anomaly place / anomaly remove
  -> ordered anomaly sequence updates victory condition
  -> ooze cadence advances pressure
  -> authoritative snapshot updates render/minimap/HUD/debug
```

## Current local command loop

```txt
applyInteraction
  -> derive action
  -> record interaction event
  -> if local authoritative session:
       applyNetworkInteractionRequest returns GameState
       if nextState === currentGameState return silently
       syncHeldCubesToPlayers
       publishAuthoritativeState('resync')
       commitVictory if currentGameState.gameState === 'victory'
  -> else client sends TRY_INTERACT
```

## Current host command loop

```txt
PLAYER_UPDATE
  -> applyNetworkPlayerUpdate returns GameState
  -> syncLocalCarryStateFromGameState
  -> publishAuthoritativeState('resync')

TRY_INTERACT
  -> applyNetworkInteractionRequest returns GameState
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState('recovery' if request-sync else 'resync')
  -> commitVictory when gameState is victory
```

## Gameplay risk

The player experience can work while still hiding command truth.

A rejected pickup, no-op drop, missing player update, request-sync recovery, ignored toggle-ready, ignored cancel, or unknown action can look the same from the consumer surface because each path can collapse into unchanged state.

## Next gameplay-safe proof

```txt
- accepted changed command publishes
- accepted unchanged command no-ops with reason
- rejected local command journals and does not publish
- rejected host TRY_INTERACT does not broadcast stale recovery
- request-sync publishes recovery/full sync
- victory commits from explicit decision
- GameCanvas uses consumer decisions after fixture proof
```

## Fixture rows needed

```txt
accepted pickup
rejected pickup already carrying
rejected pickup no nearby cube
accepted drop
rejected drop no carried cube
accepted place
rejected place too far
rejected place no free slot
accepted remove
rejected remove wrong slot
publish-only request-sync
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged missing player update
accepted held-cube sync
unchanged held-cube already synced
victory ordered sequence completion
```

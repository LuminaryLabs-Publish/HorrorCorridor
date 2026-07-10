# HorrorCorridor Local Host Command Result Loop

**Timestamp:** `2026-07-09T22-50-53-04-00`

## Summary

The gameplay loop works, but local and host command consumers are still implicit. Command outcome, rejection reason, publish decision, recovery, and victory status are inferred from `GameState` identity and input action strings.

## Current local loop

```txt
interact key
  -> derive action from distance to anomaly and carried cube state
  -> record freeform debug event
  -> applyNetworkInteractionRequest(currentGameState, action)
  -> if nextState === currentGameState return silently
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState('resync')
  -> if gameState === victory, commitVictory()
```

## Current host loop

```txt
peer/message PLAYER_UPDATE
  -> applyNetworkPlayerUpdate
  -> syncLocalCarryStateFromGameState
  -> publishAuthoritativeState('resync')

peer/message TRY_INTERACT
  -> applyNetworkInteractionRequest
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState('recovery' when action is request-sync, otherwise 'resync')
  -> if gameState === victory, commitVictory()
```

## Current client loop

```txt
interact key
  -> derive action from reference state
  -> createInteractionRequestMessage
  -> host applies request later
```

## Gameplay services

```txt
player action derivation: pickup/drop/place/remove based on carried cube and anomaly distance
interaction rules: pickUpCube, dropCube, placeCubeAtEndAnomaly, removeCubeFromEndAnomaly
network rules: player update, held cube sync, network interaction dispatch
sequence validation: ordered anomaly completion and victory state
ooze cadence: decay/spawn/no-state-diff through GameState return
publish behavior: implicit reason strings initial/join/resync/reconnect/recovery
completion route: commitVictory updates UI completion and releases pointer lock
```

## Fixture rows required next

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
runtime debug projects latest command result
runtime debug projects latest publish decision
runtime debug projects journal counts
```

## Main finding

Gameplay should not be expanded before these command rows exist. The safe cut is a result-first command layer that preserves legacy `GameState` exports while adding typed result consumers and a DOM-free fixture.

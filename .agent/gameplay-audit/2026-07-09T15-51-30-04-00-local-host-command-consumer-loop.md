# HorrorCorridor Gameplay Audit: Local/Host Command Consumer Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T15-51-30-04-00`

## Current gameplay loop

```txt
start menu
  -> solo, host, or join
  -> local player identity and room state
  -> seeded maze and anomaly sequence
  -> pointer-lock first-person movement
  -> pickup loose cubes
  -> carry cube with player pose
  -> drop cube away from anomaly
  -> place cube at anomaly slot
  -> remove last occupied anomaly cube
  -> ordered sequence validation
  -> victory route when all slots are solved in order
  -> ooze cadence creates pressure while traversing
```

## Local authority path today

```txt
interact key
  -> GameCanvas derives action from distance-to-end and carried state
  -> applyNetworkInteractionRequest(currentGameState, input)
  -> if nextState === currentGameState return silently
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState("resync")
  -> if gameState === victory commitVictory()
```

## Host authority path today

```txt
TRY_INTERACT message
  -> record debug event
  -> applyNetworkInteractionRequest(currentGameState, payload)
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState(action === request-sync ? "recovery" : "resync")
  -> if gameState === victory commitVictory()

PLAYER_UPDATE message
  -> applyNetworkPlayerUpdate
  -> sync local carry state
  -> publishAuthoritativeState("resync")
```

## Gameplay authority issue

Gameplay decisions are real, but the authoritative result record is missing.

Current behavior cannot distinguish these in source-owned fixture output:

```txt
accepted changed pickup
accepted changed drop
accepted changed place
accepted changed remove
accepted final place victory
rejected not playing
rejected missing player
rejected already carrying
rejected no nearby cube
rejected too far from anomaly
rejected no free slot
rejected wrong slot
unchanged player update missing player
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
```

## Required gameplay fixture rows

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
unchanged held-cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
local consumer skips rejected/no-op broadcast
local consumer publishes accepted changed/victory
host consumer skips rejected TRY_INTERACT broadcast
host consumer publishes request-sync recovery
```

## Game design non-goals

Do not add new maze content, new monster behavior, new visual object kits, new UI, or changed win logic before the command consumer fixtures pass.

## Next gameplay ledge

```txt
LocalAuthorityCommandConsumer and HostAuthorityCommandConsumer should be proven with DOM-free fixture rows before GameCanvas uses them.
```

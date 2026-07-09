# Local / Host Command Decision Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-38-28-04-00`

## Current gameplay loop

```txt
solo/host local player
  -> GameCanvas derives action from distance to anomaly and carried cube state
  -> applyNetworkInteractionRequest(currentGameState, action)
  -> if nextState === currentGameState, return silently
  -> syncHeldCubesToPlayers(nextState)
  -> publishAuthoritativeState("resync")
  -> commitVictory() when currentGameState.gameState === "victory"

client player
  -> GameCanvas derives action from distance to anomaly and carried cube state
  -> createInteractionRequestMessage(action)
  -> transport sends TRY_INTERACT

host receives TRY_INTERACT
  -> applyNetworkInteractionRequest(currentGameState, message payload)
  -> syncHeldCubesToPlayers(currentGameState)
  -> publishAuthoritativeState(request-sync ? "recovery" : "resync")
  -> commitVictory() when currentGameState.gameState === "victory"

host receives PLAYER_UPDATE
  -> applyNetworkPlayerUpdate(currentGameState, message payload)
  -> syncLocalCarryStateFromGameState(currentGameState)
  -> publishAuthoritativeState("resync")
```

## Current gameplay ambiguity

```txt
invalid pickup -> unchanged GameState
missing player -> unchanged GameState
already carrying -> unchanged GameState
no nearby cube -> unchanged GameState
no carried cube -> unchanged GameState
too far from anomaly -> unchanged GameState
no free slot -> unchanged GameState
wrong slot -> unchanged GameState
request-sync -> unchanged GameState
toggle-ready -> unchanged GameState
cancel -> unchanged GameState
unknown action -> unchanged GameState
```

These should not all mean the same thing.

## Target gameplay loop

```txt
CommandEnvelope
  -> interaction/network preflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> local or host consumer
  -> optional snapshot publish
  -> optional victory commit
  -> runtime debug projection
  -> fixture replay parity
```

## Required status classes

```txt
accepted:
  command was valid and state changed or intentionally completed a gameplay transition

rejected:
  command was understood but invalid in the current state

unchanged:
  command was valid but produced no material state difference

skipped:
  command has no current gameplay policy and should not publish

publish-only:
  command asks authority to publish/recover without gameplay mutation

victory:
  command causes ordered sequence completion and route completion behavior
```

## Required first fixture rows

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
victory ordered sequence completion
local consumer skips rejected/no-op broadcast
local consumer publishes accepted changed/victory
host consumer skips rejected TRY_INTERACT broadcast
host consumer publishes request-sync recovery
```

## Acceptance rule

`GameCanvas.tsx` should not switch to consumer helpers until the DOM-free fixture can prove final snapshot facts and publish decisions for the rows above.

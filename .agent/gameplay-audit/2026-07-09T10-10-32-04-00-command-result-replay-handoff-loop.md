# Gameplay Audit — Command Result Replay Handoff Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T10-10-32-04-00`

## Current gameplay loop

```txt
player enters corridor
  -> pointer-lock navigation
  -> find loose cube
  -> press interact
  -> derive pickup/drop/place/remove from carried-cube state and anomaly distance
  -> mutate GameState if rule accepts
  -> sync carried cube to player pose
  -> publish snapshot if local/host accepted changed result is inferred
  -> solve ordered anomaly slots
  -> ooze advances on cadence
  -> victory routes to completion screen
```

## Current interaction authority

`interactionRules.ts` owns the gameplay mutations, but each exported function returns only `GameState`:

```txt
pickUpCube(state, input) -> GameState
dropCube(state, input) -> GameState
placeCubeAtEndAnomaly(state, input) -> GameState
removeCubeFromEndAnomaly(state, input) -> GameState
```

Rejected branches currently return the same `state` without a typed reason.

Examples:

```txt
not playing
missing player
already carrying cube
no nearby loose cube
missing carried cube
missing anomaly cell
too far from anomaly
no free sequence slot
no occupied sequence slot
wrong requested slot
missing cube id
```

## Current network authority

`networkRules.ts` also returns `GameState` only:

```txt
syncHeldCubesToPlayers(state) -> GameState
applyNetworkPlayerUpdate(state, input) -> GameState
applyNetworkInteractionRequest(state, input) -> GameState
```

No-op branches include:

```txt
missing player on player update
held cube already synced
request-sync
toggle-ready
cancel
unknown/default action
```

## Current GameCanvas handoff

```txt
local interaction
  -> applyNetworkInteractionRequest
  -> if nextState === currentGameState return silently
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState('resync')
  -> commitVictory if gameState === 'victory'

host TRY_INTERACT
  -> applyNetworkInteractionRequest
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState(request-sync ? 'recovery' : 'resync')
  -> commitVictory if gameState === 'victory'
```

This means browser code decides accepted/rejected/publish/victory behavior after the fact.

## Required replay handoff

```txt
CommandFixtureSeed
  -> CommandEnvelope
  -> interaction/network preflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> final snapshot parity row
```

## Gameplay fixture rows required

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

## Main gameplay finding

`HorrorCorridor` does not need more gameplay content next. It needs gameplay result proof so the existing loop can explain every accepted, rejected, unchanged, skipped, recovery, and victory command without a browser session.

# HorrorCorridor Local/Host Authority Loop Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T12-29-17-04:00`

## Purpose

Document how gameplay commands should move from input/network actions into explicit local and host authority consumers.

## Current player-facing loop

```txt
open app
-> start menu
-> solo / host / join
-> room identity
-> readiness/loading
-> pointer-lock first-person navigation
-> interact key
-> derive action:
   distance to anomaly + carried cube state
-> pickup / drop / place / remove
-> ordered anomaly sequence validation
-> ooze cadence pressure
-> completion route on victory
```

## Current local authority behavior

```txt
applyInteraction()
-> derive action
-> applyNetworkInteractionRequest(currentGameState, action)
-> if nextState === currentGameState, return silently
-> syncHeldCubesToPlayers(nextState)
-> publishAuthoritativeState("resync")
-> commitVictory if currentGameState.gameState === "victory"
```

Problem:

```txt
rejected interaction == unchanged object identity
unchanged no-op == unchanged object identity
skipped policy == unchanged object identity
no fixture-readable reason exists
```

## Current host authority behavior

```txt
PLAYER_UPDATE
-> applyNetworkPlayerUpdate()
-> syncLocalCarryStateFromGameState()
-> publishAuthoritativeState("resync")

TRY_INTERACT
-> applyNetworkInteractionRequest()
-> syncHeldCubesToPlayers()
-> syncLocalCarryStateFromGameState()
-> publishAuthoritativeState(request-sync ? "recovery" : "resync")
-> commitVictory when gameState is victory
```

Problem:

```txt
request-sync is encoded by action string instead of publish decision metadata
rejected TRY_INTERACT can still produce a host publish path
missing player update is indistinguishable from valid unchanged update
host result is not journaled
```

## Target local authority consumer

```txt
applyInteraction()
-> derive CommandEnvelope(source="local", type=action)
-> applyNetworkInteractionRequestResult()
-> derivePublishDecision(result)
-> appendCommandResult(journal, result, decision)
-> if decision=publish or victory:
     currentGameState = result.state
     sync carry state
     publishAuthoritativeState(decision.snapshotReason)
-> if decision=skip/no-op:
     keep state
     expose debug result
-> if decision=victory:
     commitVictory
```

## Target host authority consumer

```txt
peer PLAYER_UPDATE or TRY_INTERACT
-> derive CommandEnvelope(source="host", type=message action)
-> applyNetworkPlayerUpdateResult or applyNetworkInteractionRequestResult
-> derivePublishDecision(result)
-> appendCommandResult(journal, result, decision)
-> if request-sync recovery:
     publishAuthoritativeState("recovery")
-> if accepted changed or victory:
     currentGameState = result.state
     sync carry state
     publishAuthoritativeState("resync")
-> if rejected/skipped/no-op:
     skip broadcast
     expose debug result
-> if victory:
     commitVictory
```

## Gameplay acceptance rows

```txt
[ ] local accepted pickup publishes resync and updates carry state.
[ ] local rejected pickup does not publish and debug shows rejected reason.
[ ] local accepted place final slot publishes victory and commits completion.
[ ] host rejected TRY_INTERACT does not broadcast a resync.
[ ] host request-sync produces publish-only/recovery and broadcasts recovery snapshot.
[ ] host missing-player PLAYER_UPDATE returns unchanged/skip or no-op with reason metadata.
[ ] skipped toggle-ready/cancel/unknown action stays explicit and does not mutate current game state.
```

## Gameplay stop line

Do not add new mechanics, new anomalies, new enemy states, new maze content, new scenes, new object-kit visuals, or new lobby policy until the command result consumers pass fixture proof.
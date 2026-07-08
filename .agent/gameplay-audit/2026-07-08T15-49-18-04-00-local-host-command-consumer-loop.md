# HorrorCorridor Local / Host Command Consumer Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T15:49:18-04:00`

## Current gameplay loop

```txt
solo/host player presses interact
  -> GameCanvas derives pickup/drop/place/remove from distance and carried cube
  -> applyNetworkInteractionRequest returns GameState
  -> object identity decides whether to publish
  -> publishAuthoritativeState("resync")
  -> victory commits when currentGameState.gameState === "victory"

client player presses interact
  -> GameCanvas derives action
  -> TRY_INTERACT is sent to host
  -> host applies applyNetworkInteractionRequest
  -> host syncs held cubes
  -> host publishes resync or recovery based on action string
  -> victory commits when currentGameState.gameState === "victory"

client movement
  -> PLAYER_UPDATE sent to host
  -> host applies applyNetworkPlayerUpdate
  -> host publishes resync every accepted message
```

## Problem

The gameplay loop is functional, but the command outcome is implicit.

```txt
invalid interaction == unchanged GameState
no-op update == unchanged GameState
request-sync == unchanged GameState but should publish recovery
skipped lobby actions == unchanged GameState but should record skipped
victory == GameState mutation but should return explicit victory result
```

## Target local consumer

```txt
LocalAuthorityCommandConsumer.consume(result)
  -> append CommandJournal entry
  -> if rejected/skipped/unchanged/no-op: do not publish
  -> if accepted changed: publish resync
  -> if publish-only: publish recovery when applicable
  -> if victory: publish victory/resync and commit completion
```

## Target host consumer

```txt
HostAuthorityCommandConsumer.consume(result)
  -> append CommandJournal entry
  -> PLAYER_UPDATE accepted changed: publish resync
  -> PLAYER_UPDATE unchanged/missing player: skip or no-op
  -> TRY_INTERACT rejected: skip broadcast
  -> TRY_INTERACT accepted changed: publish resync
  -> request-sync: publish recovery/full sync
  -> toggle-ready/cancel/unknown: skip with explicit reason
  -> victory: publish and commit completion
```

## Required fixture rows

```txt
[ ] local accepted pickup publishes resync
[ ] local rejected pickup does not publish
[ ] local unchanged command journals no-op
[ ] local victory command publishes and commits completion
[ ] host PLAYER_UPDATE accepted publishes resync
[ ] host PLAYER_UPDATE missing player skips publish
[ ] host TRY_INTERACT rejected skips broadcast
[ ] host TRY_INTERACT accepted publishes resync
[ ] host request-sync publishes recovery
[ ] host toggle-ready records skipped
[ ] host cancel records skipped
[ ] host unknown action records skipped
```

## Gameplay stop line

Do not change maze geometry, cube positions, ooze behavior, anomaly sequence rules, input mapping, PeerJS transport, renderer frame flow, or minimap behavior in the same source pass.

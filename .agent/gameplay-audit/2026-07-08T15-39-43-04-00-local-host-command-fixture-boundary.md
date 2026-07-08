# HorrorCorridor Local Host Command Fixture Boundary

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T15:39:43-04:00`

## Purpose

This gameplay audit records the current command/gameplay seam and the next fixture boundary.

The game loop is playable, but it cannot yet prove why a command accepted, rejected, skipped, published, recovered, no-oped, or completed victory.

## Current gameplay loop

```txt
solo/host/client session starts
-> maze snapshot becomes GameState
-> local player moves through pointer-lock input
-> interact key derives action from distance-to-end and carried cube
-> applyNetworkInteractionRequest routes pickup/drop/place/remove/request-sync/toggle-ready/cancel/default
-> interactionRules mutates cube and sequence slot state or returns same GameState
-> validateOrderedSequenceCompletion may set victory
-> host/local flow publishes a replicated snapshot
-> renderer/minimap/HUD/debug consume latest snapshot
```

## Gameplay actions that need result records

```txt
pickup-cube
drop-cube
place-cube-at-anomaly
remove-cube-from-anomaly
request-sync
toggle-ready
cancel
unknown action
player-update
held-cube-sync
ooze-tick
ordered-sequence-complete
```

## Required result classes

```txt
accepted changed
accepted unchanged
rejected
unchanged
publish-only
skipped
victory
```

## Required local consumer behavior

```txt
local rejected command -> journal only, no publish
local skipped command -> journal only, no publish
local unchanged/no-op command -> journal only, no publish
local accepted changed command -> publish authoritative snapshot
local victory command -> publish and commit victory
```

## Required host consumer behavior

```txt
host PLAYER_UPDATE accepted changed -> publish authoritative snapshot
host PLAYER_UPDATE unchanged/missing -> skip or no-op with metadata
host TRY_INTERACT accepted changed -> publish authoritative snapshot
host TRY_INTERACT rejected -> skip broadcast with reason
host request-sync -> publish recovery full sync
host toggle-ready/cancel/default -> skipped command result
host victory -> publish and commit victory
```

## Fixture rows

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

## First implementation stop condition

The first implementation slice should stop when this command fixture passes:

```txt
node scripts/horror-corridor-command-fixture.mjs
```

Only after that should `GameCanvas.tsx` consume `localAuthorityCommandConsumer` and `hostAuthorityCommandConsumer`.

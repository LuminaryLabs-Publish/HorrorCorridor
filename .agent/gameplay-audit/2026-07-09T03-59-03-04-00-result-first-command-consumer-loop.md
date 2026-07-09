# Gameplay Audit - Result First Command Consumer Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`
**Timestamp:** `2026-07-09T03-59-03-04-00`

## Current gameplay loop

```txt
player moves through first-person maze
  -> interact key checks carried cube and anomaly distance
  -> action becomes pickup/drop/place/remove
  -> local/host calls GameState-returning rules
  -> client sends TRY_INTERACT
  -> host applies request and publishes a snapshot
  -> ordered sequence completion can trigger victory
```

## Current gameplay issue

The game can play, but it cannot explain command outcomes as stable gameplay rows.

The same unchanged `GameState` return can mean:

```txt
not playing
missing player
already carrying
no nearby cube
too far from anomaly
no free slot
wrong slot
request-sync recovery
toggle-ready skipped
cancel skipped
unknown action
no state diff
```

## Required fixture rows

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
runtime debug command decision projection is serializable
GameCanvas consumer splice preserves legacy snapshot shape
```

## Gameplay handoff

Implement command results first.

After fixture proof, route local and host consumers through result metadata so gameplay publish, skip, recovery, and victory decisions are explicit.

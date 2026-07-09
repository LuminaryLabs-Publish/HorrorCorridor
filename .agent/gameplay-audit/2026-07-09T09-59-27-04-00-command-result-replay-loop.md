# Gameplay Audit: Command Result Replay Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T09-59-27-04-00`

## Current gameplay loop

```txt
player enters maze
  -> moves with WASD/arrows
  -> looks with pointer-lock mouse movement
  -> finds cube
  -> interact derives pickup/drop/place/remove from distance and carry state
  -> pickup attaches cube to player
  -> drop returns cube to local position
  -> place near anomaly fills next slot
  -> remove near anomaly takes last occupied slot
  -> ordered sequence validation can set victory
  -> ooze advances on authority cadence
  -> snapshot publishes to local/host/client consumers
```

## Current gameplay authority issue

Gameplay works, but the command path does not explain itself.

Rejected and skipped interactions are currently represented by unchanged `GameState`, so the gameplay layer cannot distinguish:

```txt
not playing
missing player
already carrying
no nearby cube
no carried cube
missing anomaly cell
too far from anomaly
no free slot
no occupied slot
wrong slot
missing player update target
request-sync recovery
toggle-ready skipped
cancel skipped
unknown action skipped
unchanged held-cube sync
unchanged player update
victory completion
```

## Required replay model

```txt
CommandFixtureSeed
  -> CommandEnvelope
  -> preflight
  -> mutation attempt
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> RuntimeDebugCommandProjection
  -> ReplayMatrixRow
```

## Gameplay fixture rows

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

## Consumer rule

`GameCanvas.tsx` should not decide gameplay publish behavior from `nextState === currentGameState` after this cut.

It should consume a `PublishDecision` produced by local or host authority consumers:

```txt
accepted changed -> publish
accepted unchanged -> no-op
rejected -> skip
skipped -> skip
publish-only request-sync -> recovery publish
victory -> victory publish + commit completion
```

## Gameplay non-goals

```txt
- no new maze mechanics
- no new cube colors
- no new anomaly behavior
- no new enemy/monster system
- no visual expansion
- no multiplayer transport rewrite
```

## Next gameplay ledge

```txt
Implement command result replay before adding new horror mechanics.
```

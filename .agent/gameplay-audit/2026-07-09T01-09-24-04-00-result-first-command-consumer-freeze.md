# HorrorCorridor Gameplay Audit: Result-First Command Consumer Freeze

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T01-09-24-04-00`

## Gameplay loop

```txt
solo/host/join selection
  -> room and player identity
  -> readiness gates
  -> first-person maze navigation
  -> player moves through maze using pointer lock and keyboard input
  -> interact derives pickup/drop/place/remove from carried cube and anomaly distance
  -> cube sequence solves ordered anomaly color slots
  -> ooze cadence adds pressure
  -> completed sequence triggers victory routing
  -> host/client sessions replicate authoritative snapshots
```

## Gameplay authority issue

The game loop is playable, but the gameplay result is still inferred from state identity and action strings.

Current critical patterns:

```txt
interactionRules.ts returns GameState only
networkRules.ts returns GameState only
invalid interaction branches return the original state silently
request-sync/toggle-ready/cancel/default return unchanged state without reason metadata
GameCanvas local interaction path returns when nextState === currentGameState
GameCanvas host TRY_INTERACT path publishes after applying rules without command status metadata
commitVictory is decided from final gameState instead of an explicit command decision
```

## Required gameplay command result rows

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

## Required command result shape

```txt
commandId
source
playerId
commandType
action
status
reason
changed
beforeSummary
afterSummary
events
diagnostics
state
```

## Required publish decision shape

```txt
decision
snapshotReason
shouldBroadcast
shouldCommitVictory
shouldRecordDebug
consumerAction
reason
```

## Gameplay non-goals

```txt
do not add new maze content first
do not add new enemy behavior first
do not add new cube mechanics first
do not alter ooze difficulty first
do not change multiplayer flow first
do not modify GameCanvas behavior until command fixtures exist
```

## Next gameplay cut

```txt
HorrorCorridor Result-First Command Consumer Fixture Freeze
```

This cut should make every gameplay input explainable before the runtime decides to publish, skip, recover, or commit victory.

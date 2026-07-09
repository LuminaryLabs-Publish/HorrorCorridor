# HorrorCorridor Publish Decision Consumer Loop

**Timestamp:** `2026-07-09T01-00-22-04-00`

## Current gameplay loop

```txt
start / host / join
  -> seeded maze snapshot
  -> local movement and collision
  -> interact key derives action
  -> cube pickup/drop/place/remove
  -> ordered anomaly sequence validation
  -> ooze cadence
  -> snapshot publish / sync
  -> victory screen
```

## Current publish problems

```txt
local authority:
  nextState === currentGameState means silent return
  accepted unchanged and rejected paths are indistinguishable
  victory is a post-state check, not a decision output

host authority:
  PLAYER_UPDATE publishes after state mutation without result metadata
  TRY_INTERACT publishes after applyNetworkInteractionRequest without knowing whether it changed state
  request-sync uses action string to force recovery reason
  toggle-ready/cancel/default have no policy result

runtime debug:
  can show frame/snapshot/cube/anomaly/cadence facts
  cannot show command status/reason/decision/consumer action
```

## Target gameplay consumer loop

```txt
input or peer message
  -> CommandEnvelope
  -> result-returning domain rule
  -> PublishDecision
  -> CommandJournal append
  -> LocalAuthorityResultConsumer or HostAuthorityResultConsumer
  -> if decision says publish/recovery/victory, publishAuthoritativeState(decision.snapshotReason)
  -> if decision says skip/no-op, do not publish
  -> if decision says victory, commitVictory from consumer result
  -> record RuntimeDebugCommandProjection
```

## Required consumer behaviors

```txt
local accepted changed:
  publish resync
  journal accepted
  sync local carry state

local rejected:
  no publish
  journal rejected
  expose rejection reason in debug projection

local unchanged/no-op:
  no publish
  journal unchanged/no-op

local victory:
  publish victory or resync with victory metadata
  commit completion once

host PLAYER_UPDATE accepted changed:
  publish resync
  journal accepted

host PLAYER_UPDATE missing player:
  skip/no-op
  journal unchanged:player-missing

host TRY_INTERACT accepted changed:
  publish resync
  journal accepted

host TRY_INTERACT rejected:
  skip publish
  journal rejected

host request-sync:
  publish recovery full sync
  journal publish-only

host toggle-ready/cancel/unknown:
  skip publish until lobby policy exists
  journal skipped reason
```

## Gameplay rows that must pass first

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

## Stop condition

Do not move into renderer extraction, new gameplay content, extra anomalies, enemy/monster behavior, or multiplayer polish until these consumer rows are fixture-backed and GameCanvas consumes the same decision shape.

# HorrorCorridor Local / Host Result Loop Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-19-00-04-00`

## Current gameplay loop

```txt
start session
  -> solo / host / join
  -> seeded maze and anomaly sequence
  -> first-person movement through corridor
  -> pickup/drop/place/remove cube interaction
  -> ordered sequence validation
  -> ooze cadence pressure
  -> replicated snapshots update all clients
  -> victory screen when anomaly sequence is solved
```

## Current command path

```txt
local solo/host
  -> GameCanvas derives action from distance and carry state
  -> applyNetworkInteractionRequest
  -> GameState returned
  -> object identity decides skip/publish
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState("resync")
  -> optional commitVictory()

client
  -> send TRY_INTERACT
  -> host receives peer/message
  -> applyNetworkInteractionRequest
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState("recovery" or "resync")
```

## Gameplay authority problem

The player can perform the expected loop, but the loop is not fixture-readable.

Rejected actions, skipped policies, unchanged player updates, request-sync recovery, and victory completion are all inferred from state shape or code path rather than explicit result records.

## Required source-owned gameplay result model

```txt
CommandEnvelope
  -> result status
  -> stable reason
  -> before snapshot summary
  -> after snapshot summary
  -> changed flag
  -> events
  -> publish decision
  -> local/host consumer action
  -> final replicated snapshot facts
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
unchanged held-cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
```

## Next gameplay rule

No new levels, monsters, content, object kits, or visual expansion should be added before the command-result fixture passes.

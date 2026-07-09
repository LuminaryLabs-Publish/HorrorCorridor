# HorrorCorridor Local/Host Result Replay Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-30-54-04-00`

## Current gameplay loop

```txt
start session
  -> enter corridor
  -> move with first-person input
  -> look with pointer lock
  -> press interact
  -> GameCanvas derives action from distance to end anomaly and carried-cube state
  -> pickup, drop, place, or remove cube through networkRules
  -> ordered sequence validates slots
  -> ooze cadence advances
  -> host/local authority publishes replicated snapshot
  -> completion route activates on victory
```

## Current authority problem

The gameplay loop is playable, but result semantics are not explicit.

```txt
accepted action
  -> returns changed GameState

rejected action
  -> often returns same GameState

skipped policy action
  -> returns same GameState

request-sync
  -> returns same GameState but should publish recovery

victory
  -> discovered after state mutation instead of explicit command decision
```

## Target replay loop

```txt
seeded GameState fixture
  -> CommandEnvelope
  -> preflight
  -> CommandResult
  -> PublishDecision
  -> local or host consumer
  -> CommandJournal
  -> final state summary
  -> replicated snapshot summary
  -> runtime debug projection
  -> replay parity result
```

## Required gameplay rows

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
accepted final place as victory
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

## Next gameplay cut

Do not add new maze content, monsters, visual props, or item systems yet.

The next gameplay proof is a command-result replay fixture that makes each local/host result explainable before `GameCanvas.tsx` is rewired.

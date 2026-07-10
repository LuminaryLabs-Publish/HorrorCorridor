# Gameplay Audit — Local/Host Command Result Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T06-48-54-04-00`

## Current gameplay loop

```txt
solo or host local player
  -> key/mouse updates pose
  -> interact derives pickup/drop/place/remove
  -> applyNetworkInteractionRequest mutates or returns GameState
  -> if returned object identity is unchanged, GameCanvas silently returns
  -> otherwise GameCanvas syncs held cubes, publishes resync, or commits victory

client player
  -> key/mouse updates local predicted pose
  -> PLAYER_UPDATE is sent to host
  -> interact sends TRY_INTERACT to host
  -> host applies GameState-returning rules
  -> host publishes resync/recovery using implicit reason strings
```

## Current gameplay authority gaps

```txt
- local authority cannot explain rejected pickup/drop/place/remove.
- host authority cannot tell whether TRY_INTERACT was accepted, rejected, skipped, or no-op without comparing state indirectly.
- request-sync is recovery-like but not represented as a publish-only CommandResult.
- toggle-ready and cancel are skipped in gameplay, but they are not explicit skipped results.
- ooze cadence changes have no command rows.
- ordered sequence victory and rollback have no command rows.
- GameCanvas object identity checks are too implicit to fixture safely.
```

## Required command result loop

```txt
CommandEnvelope
  -> command result wrapper
  -> CommandResult.status
  -> CommandResult.reason
  -> PublishDecision
  -> CommandJournal append
  -> consumer action
  -> optional GameCanvas state/publish/victory/debug side effect
```

## Gameplay fixture rows needed

```txt
accepted pickup near cube
rejected pickup while carrying
rejected pickup without nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly
rejected place too far from anomaly
rejected place with no free slot
accepted remove from anomaly
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged missing-player update
ooze spawn
ooze decay
ooze no-state-diff
victory sequence completion
victory rollback
```

## Next implementation rule

Keep legacy behavior stable. New result-returning wrappers should live beside current rules first, then legacy exports can keep returning `result.state` until the fixture and debug readback pass.

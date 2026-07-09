# HorrorCorridor Local/Host Command Consumer Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T22-51-43-04-00`

## Current gameplay loop

```txt
player starts solo/host/client session
  -> runtime mounts seeded maze snapshot
  -> player moves through pointer-lock first-person controls
  -> interaction key derives action from carried cube and anomaly distance
  -> local solo/host calls applyNetworkInteractionRequest
  -> client sends TRY_INTERACT
  -> host applies player update and interaction request messages
  -> cube and slot state changes or silently remains unchanged
  -> held cubes sync to player poses
  -> ooze cadence advances
  -> authoritative snapshot publishes
  -> ordered sequence can commit victory
```

## Gameplay rules currently source-backed

```txt
pickup loose nearby cube
reject pickup when not playing
reject pickup when missing player
reject pickup when already carrying
reject pickup when no nearby loose cube

drop carried cube
reject drop when not playing
reject drop when missing player
reject drop when not carrying

place carried cube at anomaly slot
reject place when not playing
reject place when missing player
reject place when no carried cube
reject place when anomaly cell is missing
reject place when too far from anomaly
reject place when no free slot
complete ordered sequence when all slots solved

remove last occupied anomaly cube
reject remove when not playing
reject remove when missing player
reject remove when already carrying
reject remove when anomaly cell is missing
reject remove when too far from anomaly
reject remove when no occupied slot
reject remove when wrong slot requested
```

## Local consumer gap

Local solo/host currently uses object identity:

```txt
const nextState = applyNetworkInteractionRequest(currentGameState, ...)
if (nextState === currentGameState) return
currentGameState = syncHeldCubesToPlayers(nextState)
publishAuthoritativeState("resync")
```

That hides whether the command was rejected, unchanged, skipped, publish-only, or accepted.

## Host consumer gap

Host ingress applies a TRY_INTERACT, syncs held cubes, and publishes. It does not have typed decision metadata for rejected commands, request-sync recovery, skipped lobby-policy actions, or victory commit.

## Target gameplay loop

```txt
CommandEnvelope
  -> result-returning interaction/network rule
  -> PublishDecision
  -> authority consumer
  -> CommandJournal
  -> optional snapshot publish
  -> optional victory commit
  -> RuntimeDebugCommandProjection
```

## Required consumer decisions

```txt
accepted changed local command -> journal + publish
accepted unchanged local command -> journal + no-op
rejected local command -> journal + no publish
accepted changed host TRY_INTERACT -> journal + publish
rejected host TRY_INTERACT -> journal + skip publish
request-sync -> journal + recovery/full-sync
skipped toggle-ready/cancel -> journal + skip
unknown action -> journal + skip
victory -> journal + publish + commit victory
```

## Fixture rows to prove before GameCanvas wiring

```txt
accepted pickup
rejected pickup already carrying
rejected pickup no nearby cube
accepted drop
rejected drop no carried cube
accepted place
victory final place
rejected place too far
rejected place no slot
accepted remove
rejected remove wrong slot
publish-only request-sync
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update missing player
accepted held-cube sync
unchanged held-cube sync
accepted ooze tick
unchanged ooze tick
local consumer skip rejected
host consumer skip rejected TRY_INTERACT
host consumer recovery publish request-sync
```

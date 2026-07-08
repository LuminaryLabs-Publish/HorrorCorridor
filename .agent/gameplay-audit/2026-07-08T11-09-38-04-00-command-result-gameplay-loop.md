# HorrorCorridor Command Result Gameplay Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T11:09:38-04:00`

## Purpose

Make the current gameplay loop explicit enough for the next implementation pass to add command-result contracts without changing gameplay feel.

## Current player loop

```txt
start game
  -> enter solo, host, or client mode
  -> spawn into seeded corridor maze
  -> walk through maze in first person
  -> interact key derives action from carried cube and distance to end anomaly
  -> pick up loose cube when near a cube and empty-handed
  -> drop carried cube away from anomaly
  -> place carried cube into next available anomaly slot near the end
  -> remove last placed cube near the end when empty-handed
  -> ordered sequence validates solved slots
  -> ooze cadence advances pressure
  -> victory commits completion UI
```

## Current gameplay command sources

```txt
local keyboard input:
  GameCanvas.applyInteraction()

client network send:
  GameCanvas.sendInteractionRequest()

host network receive:
  transport.onEvent(peer/message) -> TRY_INTERACT

local/host player pose:
  GameCanvas.stepLocalPose() -> applyNetworkPlayerUpdate()

host/client snapshots:
  publishAuthoritativeState() -> createFullSyncMessage()
```

## Current command functions

```txt
interactionRules.ts:
  pickUpCube(state, input) -> GameState
  dropCube(state, input) -> GameState
  placeCubeAtEndAnomaly(state, input) -> GameState
  removeCubeFromEndAnomaly(state, input) -> GameState

networkRules.ts:
  syncHeldCubesToPlayers(state) -> GameState
  applyNetworkPlayerUpdate(state, input) -> GameState
  applyNetworkInteractionRequest(state, input) -> GameState
```

## Current silent branches to classify

```txt
pickUpCube:
  not playing
  missing player
  already carrying
  no nearby cube

dropCube:
  not playing
  missing player
  no carried cube

placeCubeAtEndAnomaly:
  not playing
  missing player
  no carried cube
  missing anomaly cell
  too far from anomaly
  no free slot

removeCubeFromEndAnomaly:
  not playing
  missing player
  already carrying
  missing anomaly cell
  too far from anomaly
  no occupied slot
  wrong slot
  missing cube id

applyNetworkPlayerUpdate:
  missing player

syncHeldCubesToPlayers:
  no held cubes
  held cubes already synced
  held cube owner missing

applyNetworkInteractionRequest:
  request-sync
  toggle-ready
  cancel
  unknown/default
```

## Required result classes

```txt
accepted:
  changed game-state command, player update, held cube sync, ooze tick

rejected:
  illegal interaction or missing actor/resource

unchanged:
  legal helper command that produced no state diff

publish-only:
  request-sync recovery

skipped:
  toggle-ready, cancel, unknown/default until lobby policy exists

victory:
  ordered sequence completion caused by place/remove/validation path
```

## Required gameplay fixture rows

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
```

## Publish decision mapping

```txt
accepted + changed -> publish
accepted + unchanged -> no-op
rejected -> skip
unchanged -> skip or no-op by helper type
publish-only -> recovery
skipped -> skip
victory -> victory publish and completion commit
```

## Local authority target

```txt
local input
  -> CommandEnvelope(source: local)
  -> applyNetworkInteractionRequestResult()
  -> commandJournal.append(result)
  -> derivePublishDecision(result)
  -> if publish/victory, update state and publish
  -> if rejected/skipped/no-op, keep state and record debug reason
```

## Host authority target

```txt
peer TRY_INTERACT
  -> CommandEnvelope(source: client, sender metadata)
  -> applyNetworkInteractionRequestResult()
  -> commandJournal.append(result)
  -> derivePublishDecision(result)
  -> publish recovery for request-sync
  -> publish changed/victory results
  -> skip rejected/skipped/no-op results
```

## Non-goals

```txt
- no new level content
- no new horror props
- no PeerJS extraction first
- no renderer extraction first
- no minimap extraction first
- no wholesale GameCanvas rewrite
- no behavior change before fixture parity exists
```

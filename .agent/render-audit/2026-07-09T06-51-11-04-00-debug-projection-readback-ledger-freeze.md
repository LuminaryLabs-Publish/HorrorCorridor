# Render Audit: Debug Projection Readback Ledger Freeze

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-51-11-04-00`

## Visual/render surface

`HorrorCorridor` has a visual runtime under `HorrorCorridor-V1/src/components/game/GameCanvas.tsx`.

The render loop creates and consumes:

```txt
createRenderer
createScene
createCamera
createPostProcessing
buildMazeWorld
world.attach(scene)
world.update(elapsedMs, snapshot context)
drawMinimapFrame
postProcessing.render
runtime debug frame capture
```

## Current render loop

```txt
animation loop
  -> choose latest authority/client snapshot
  -> step local pose if playing
  -> update snapshot/player state
  -> sync camera from player with walk bob
  -> update world with snapshot/local context
  -> draw minimap
  -> capture runtime debug frame
  -> render post-processing composer
```

## Render readback already present

```txt
- frameNumber
- deltaMs
- elapsedMs
- recordedAtMs
- frame mode
- screen
- pointer lock
- room id
- local player id
- local pose
- input snapshot
- snapshot tick/timestamp/appState/gameState
- player/cube/ooze/decal/slot counts
- cube states
- anomaly sequence and slots
- cadence counters
- sceneDressing summary
```

## Missing command projection readback

The renderer and debug frame can show what the world consumed, but not why the state changed or did not change.

Add these fields additively after command fixture proof:

```txt
latestCommandResult
latestCommandReason
latestCommandStatus
latestPublishDecision
latestConsumerAction
latestCommandSource
latestCommandId
commandJournalSummary
latestRejectedInteractionReason
latestSkippedNetworkReason
latestRecoveryReason
latestVictoryReason
fixtureParitySummary
```

## Render-safe rule

Do not modify render visuals in the next implementation pass.

The next pass should only add command result/debug projection fields and fixtures, then wire the existing render/debug surface to consume those fields additively.

## Fixture readback target

```txt
CommandResult
  -> PublishDecision
  -> CommandJournal
  -> RuntimeDebugCommandProjection
  -> RuntimeDebugFrame.command
  -> exported debug JSON
  -> fixture parity report
```

## Validation gate

```txt
[ ] command projection serializes without DOM, canvas, Three.js, or PeerJS
[ ] runtime debug projection contains reason/status/decision fields
[ ] render loop continues to call world.update and postProcessing.render unchanged
[ ] minimap behavior remains snapshot-driven
[ ] legacy runtime debug fields remain present
```

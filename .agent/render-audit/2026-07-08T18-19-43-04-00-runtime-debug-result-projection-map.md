# HorrorCorridor Runtime Debug Result Projection Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T18-19-43-04-00`

## Scope

Render/debug audit for the command result projection seam.

The repo has a visual/render surface, so this pass includes render and debug readback state.

## Current render surface

```txt
GameCanvas
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> world.attach(scene)
  -> createAnimationLoop
  -> world.update(snapshot, localPlayerId, localPlayerPosition, localViewAngles)
  -> drawMinimapFrame
  -> recordRuntimeDebugFrame
  -> postProcessing.render()
```

## Current debug readback surface

```txt
runtimeDebugStore
  -> enabled
  -> overlayVisible
  -> latestFrame
  -> frames
  -> events
  -> window.__HORROR_CORRIDOR_DEBUG__.extractState()
```

Current frame records include:

```txt
frameNumber
deltaMs
elapsedMs
mode
screen
pointerLocked
roomId
localPlayerId
localPose
input
snapshot facts
cube records
anomaly records
cadence
sceneDressing
```

## Missing command result projection

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
latestConsumerAction
latestCommandJournalSummary
latestFixtureParity
latestCommandSource
latestCommandReason
latestCommandChangedFlag
latestShouldBroadcast
latestShouldCommitVictory
```

## Required projection contract

```txt
CommandResult
  -> RuntimeDebugCommandProjection
  -> RuntimeDebugFrameRecord.command
  -> RuntimeDebugExport.latestCommandResult
  -> window.__HORROR_CORRIDOR_DEBUG__.extractState()
  -> fixture output row
```

## Render constraints

```txt
- do not extract renderer first
- do not change scene dressing first
- do not change minimap behavior first
- do not add visual content before command fixture proof
- do not make runtime debug dependent on DOM-only object identity
```

## Acceptance target

The next source pass should allow a headless fixture and the browser debug export to agree on:

```txt
command status
command reason
publish decision
consumer action
journal counts
snapshot summary
```

Only after that proof should render/minimap extraction resume.

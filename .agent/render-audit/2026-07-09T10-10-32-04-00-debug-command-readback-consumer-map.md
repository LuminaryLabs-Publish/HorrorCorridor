# Render Audit — Debug Command Readback Consumer Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T10-10-32-04-00`

## Visual/render surface

`HorrorCorridor` has a visual runtime surface.

The current renderer path is browser-bound and lives primarily under `GameCanvas.tsx` plus `src/features/render/three/*`.

```txt
GameCanvas runtime
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> drawMinimapFrame
  -> recordRuntimeDebugFrame
```

## Current render consumer loop

```txt
GameCanvas initializes renderer/camera/post-processing/world
  -> local player pose and authoritative snapshot mutate during frame
  -> renderer consumes latest scene/world state
  -> minimap consumes latest snapshot projection
  -> HUD consumes stores and snapshot facts
  -> runtimeDebugStore records frame facts
  -> debug window API exports frames/events only
```

## Current debug readback shape

`runtimeDebugStore.ts` already exposes:

```txt
enabled
overlayVisible
latestFrame
frames
events
```

`latestFrame` includes:

```txt
frame number
delta / elapsed / recorded timestamps
mode
screen
pointer lock
room/local player
local pose
input snapshot
snapshot summary
cube records
anomaly records
cadence
scene dressing summary
```

## Missing render/debug readback

The debug surface still does not expose command authority facts.

Missing fields:

```txt
latestCommandResult
latestPublishDecision
latestCommandReason
latestCommandSource
latestConsumerAction
latestBroadcastDecision
commandJournalCounts
rejectedCommandCount
skippedCommandCount
unchangedCommandCount
publishOnlyCommandCount
victoryCommandCount
latestFixtureParity
```

## Why renderer extraction is not next

Renderer extraction would not solve the current blocker. The app can already render, minimap, route to completion, and export debug frames.

The current proof failure is that render/debug output cannot explain why the latest interaction was accepted, rejected, skipped, unchanged, recovered, published, or suppressed.

## Required consumer splice

The next source change should be additive:

```txt
runtimeDebugCommandProjection.ts
  -> buildRuntimeDebugCommandProjection(result, decision, journal)
  -> serializable command projection
  -> runtimeDebugStore additive field
  -> GameCanvas records command projection after domain fixture proof
```

## Fixture readback rows

```txt
accepted pickup -> debug projection shows accepted:pickup + publish
rejected pickup while carrying -> rejected:already-carrying + skip/no broadcast
request-sync -> publish-only:request-sync + recovery/full sync
unknown action -> skipped:unknown-action + skip
victory completion -> victory:ordered-sequence-complete + victory publish
unchanged held-cube sync -> unchanged:held-cube-already-synced + no-op/skip
```

## Render non-goals for next pass

```txt
- do not change lighting
- do not change maze materials
- do not add object props
- do not extract post-processing
- do not extract minimap
- do not change camera bob
- do not change pointer-lock behavior
```

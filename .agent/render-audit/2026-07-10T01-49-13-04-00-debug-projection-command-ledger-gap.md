# HorrorCorridor Debug Projection Command Ledger Gap

**Timestamp:** `2026-07-10T01-49-13-04-00`

## Render surface

`HorrorCorridor` has a visual/render surface.

Current render path:

```txt
GameCanvas
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> requestAnimationFrame animation loop
  -> world.update(snapshot, local pose, local view angles)
  -> drawMinimapFrame
  -> recordRuntimeDebugFrame when enabled
  -> postProcessing.render()
```

## Current debug projection

`runtimeDebugStore.ts` exposes:

```txt
enabled
overlayVisible
latestFrame
frames
events
```

Each frame includes:

```txt
frame timing
mode
screen
pointer lock
room id
local player id
local pose
input snapshot
replicated snapshot summary
cube records
anomaly records
cadence counters
scene dressing summary
```

## Missing debug fields

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
latestSkippedReason
latestConsumerAction
latestCommandSource
latestCommandStatus
latestCommandChangedFlag
commandJournal
commandReasonCounts
commandFixtureParity
lastHostResult
lastLocalResult
lastOozeResult
lastWinResult
```

## Why this matters

The render/debug stack can show frame and snapshot facts, but it cannot explain command causality.

A failed interaction currently looks like nothing happened. The debug frame can show pose, cube count, and slot count, but not the domain reason such as:

```txt
not-playing
missing-player
already-carrying
no-nearby-cube
too-far-from-anomaly
no-free-slot
wrong-slot
missing-carried-cube
request-sync-recovery
toggle-ready-skipped
cancel-skipped
unknown-action
```

## Next render/debug kit

```txt
runtime-debug-command-projection-kit
```

It should add an additive projection only after command fixtures exist:

```txt
RuntimeDebugCommandProjection
  -> latestCommandResult
  -> latestPublishDecision
  -> latestRejectionReason
  -> latestCommandSummary
  -> commandJournalCounters
  -> fixtureParitySummary
```

## Non-goals

```txt
- do not replace Three.js renderer
- do not extract postprocessing first
- do not rewrite minimap first
- do not add scene dressing first
- do not make debug UI visual polish the next cut
```

The safe render-side work is diagnostic readback only.

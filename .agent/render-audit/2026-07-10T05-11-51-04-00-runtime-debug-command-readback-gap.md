# Render Audit: Runtime Debug Command Readback Gap

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T05-11-51-04-00`

## Visual/render surface

`HorrorCorridor` has a live visual surface through `GameCanvas`, Three.js world rendering, post-processing, minimap rendering, HUD state, completion routing, and runtime debug overlay/export.

## Current render/debug chain

```txt
GameCanvas frame loop
  -> step local/host/client simulation
  -> build or consume authoritative snapshot
  -> world.update(snapshot)
  -> drawMinimapFrame(snapshot)
  -> createRuntimeDebugFrameRecord(...)
  -> recordRuntimeDebugFrame(...)
  -> postProcessing.render()
```

## Current readback

Runtime debug currently exposes:

```txt
frame timing
mode
screen
pointer lock
room/local player
local pose
input snapshot
replicated snapshot summary
cube records
anomaly records
cadence
scene dressing summary
runtime events
```

## Missing command readback

```txt
latestCommandEnvelope
latestCommandResult
latestCommandStatus
latestCommandReason
latestPublishDecision
latestConsumerAction
latestRejectedCommand
latestSkippedCommand
commandJournalCounts
fixtureParity
```

## Render finding

The renderer should remain stable next. The useful render-facing cut is additive debug/readback projection so the browser overlay and exported debug state can explain why a command was accepted, rejected, skipped, published, or not published.

## Next render-safe gate

```txt
RuntimeDebugCommandProjection after DOM-free command fixture passes
```

# Render Audit: Runtime Debug Command Decision Gap

**Timestamp:** `2026-07-10T10-58-54-04-00`

## Render surface

`HorrorCorridor` has a live visual/render surface:

```txt
GameCanvas
  -> Three.js renderer
  -> camera and post-processing
  -> maze world rendering
  -> minimap projection
  -> HUD route state
  -> runtime debug overlay/export
```

## What works

```txt
render world consumes replicated snapshots
minimap consumes player/object markers
runtime debug records frames and events
scene dressing summary can be exported
cadence and snapshot facts are visible
```

## Gap

Runtime debug does not expose command-decision rows.

Missing rows:

```txt
latestCommandResult
latestPublishDecision
latestCommandReason
latestConsumerAction
commandJournal counts
local authority publish or skip row
host authority publish or skip row
fixture parity row
```

## Do not solve first

```txt
renderer extraction
post-processing extraction
minimap extraction
scene dressing expansion
new visual object kits
route rewrites
```

## Next target

Add `runtimeDebugCommandProjection` after command results and publish decisions exist. The debug layer should explain what command ran and why the game published, skipped, rejected, recovered, or completed victory.

# Render Audit: Runtime Debug Command Projection Gap

## Visual/render surface

`HorrorCorridor` has a live Three.js first-person render surface, post-processing, minimap, HUD, and runtime debug overlay/export.

## Current render/debug loop

```txt
GameCanvas runtime
  -> renderer/camera/postprocessing/maze world/minimap update
  -> replicated snapshot projection
  -> runtime debug frame record
  -> runtime debug event record
  -> window.__HORROR_CORRIDOR_DEBUG__.extractState()
```

## Current strength

Runtime debug already exports frame, input, local pose, snapshot counts, cube records, anomaly slots, cadence, and scene dressing facts.

## Gap

Runtime debug does not export command-result facts:

```txt
latestCommandResult
latestPublishDecision
latestCommandReason
latestConsumerAction
commandJournal counters
fixture parity row
```

The overlay cannot explain why a local action did nothing, why host publish was skipped, why request-sync produced recovery, or why victory was accepted or rolled back.

## Next readback

`runtimeDebugCommandProjection` should be additive. Preserve existing debug frame/export shape and add command rows after DOM-free fixtures prove the result contract.

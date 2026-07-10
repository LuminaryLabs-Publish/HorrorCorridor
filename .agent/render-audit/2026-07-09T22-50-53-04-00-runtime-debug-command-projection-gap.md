# HorrorCorridor Runtime Debug Command Projection Gap

**Timestamp:** `2026-07-09T22-50-53-04-00`

## Summary

The render surface should stay stable next. Three.js world rendering, post-processing, minimap drawing, and scene dressing already have useful runtime coverage.

The missing render-adjacent boundary is debug projection. The runtime debug store can expose frame/event data, but it cannot yet explain command results or publish decisions.

## Current render/debug loop

```txt
GameCanvas initializes renderer, scene, camera, post-processing, maze world, and minimap
  -> animation loop advances local or host/client simulation
  -> world.update consumes snapshot and local player pose
  -> drawMinimapFrame consumes snapshot and local yaw
  -> createRuntimeDebugFrameRecord captures frame facts
  -> runtimeDebugStore keeps latest frame, frames, and events
  -> window.__HORROR_CORRIDOR_DEBUG__ exposes latest frame, frames, events, and extractState
```

## Render domains in use

```txt
three-renderer
camera-sync
post-processing
maze-world-rendering
snapshot-render-consumption
local-player-render-projection
minimap-rendering
scene-dressing-descriptor-summary
runtime-debug-frame-store
runtime-debug-event-store
runtime-debug-window-api
runtime-debug-command-projection-next
```

## Render and debug services

```txt
renderer service: renderer creation, size/pixel ratio sync, post-processing render, disposal
world render service: maze world attach, world.update, terrain eye position, scene dressing summary
minimap service: minimap canvas lookup, snapshot minimap draw, local yaw projection
debug frame service: frame number, delta, elapsed, screen, pointer lock, room, local player, pose, snapshot counts, cube rows, anomaly rows, cadence, scene dressing
debug event service: runtime/network/interaction/pointer/debug events with freeform payloads
debug export service: enable/disable/show/hide/clear/getLatestFrame/getFrames/getEvents/extractState
planned command projection service: latestCommandResult, latestPublishDecision, latestRejectionReason, commandJournal counters, fixture parity
```

## Gaps

```txt
- latest frame has no command result field.
- debug export has no latestCommandResult field.
- debug export has no latestPublishDecision field.
- debug export has no command journal counters.
- debug export has no fixture parity record.
- interaction/network debug events are freeform, not normalized command rows.
- host publish events are implicit sync messages, not publish-decision records.
- rejected local interactions silently return before any debug result is stored.
```

## Next proof target

Add a `runtime-debug-command-projection-kit` only after the DOM-free command fixture exists. It should be additive and preserve the current debug API shape.

```txt
RuntimeDebugCommandProjection
  -> latestCommandResult
  -> latestPublishDecision
  -> latestRejectionReason
  -> commandJournalSummary
  -> latestFixtureParity
  -> getCommandProjection through extractState
```

## Non-goals

```txt
- do not rewrite renderer next
- do not extract minimap next
- do not retune post-processing next
- do not change scene dressing next
- do not remove current debug frames/events
```

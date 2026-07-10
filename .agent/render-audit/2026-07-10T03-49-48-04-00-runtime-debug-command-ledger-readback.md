# HorrorCorridor Render Audit: Runtime Debug Command Ledger Readback

**Timestamp:** `2026-07-10T03-49-48-04-00`

## Render surface

`HorrorCorridor` has a visual/render surface through `GameCanvas.tsx`, Three.js world rendering, post-processing, minimap drawing, HUD state, completion routing, and runtime debug overlay/export.

## Current render/debug loop

```txt
GameCanvas runtime
  -> create renderer, scene, camera, post-processing, and maze world
  -> update player pose and snapshot state
  -> world.update(snapshot, local player pose, view angles)
  -> draw minimap frame
  -> capture runtime debug frame if enabled
  -> postProcessing.render()
```

## Current debug readback

`runtimeDebugStore.ts` currently exports:

```txt
enabled
overlayVisible
latestFrame
frames
events
```

Frame records include pose, input, snapshot counts, cube rows, anomaly rows, cadence rows, and scene dressing. They do not include command result rows or publish decision rows.

## Missing render/debug rows

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
latestConsumerAction
latestCommandJournal
latestFixtureParity
lastBroadcastReasonFromDecision
lastSkippedBroadcastReason
lastRecoveryDecision
```

## Why this blocks visual work

The renderer and minimap already consume snapshots. The next unknown is not whether pixels render, but why a given snapshot was or was not published after a command.

Without command-result and publish-decision readback, a future visual regression would not know whether the source problem was:

```txt
input not mapped
interaction rejected
host skipped publish
request-sync recovery path
victory transition
snapshot build
renderer consumption
```

## Required next render-safe proof

Add an additive `RuntimeDebugCommandProjection` that can be consumed by debug export and overlay without changing the renderer.

Keep existing frame fields stable while adding command fields. Do not rewrite renderer, minimap, post-processing, scene dressing, or object kits for this ledge.

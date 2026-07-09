# Render Audit: Debug Command Projection Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T18-30-30-04-00`

## Current visual/render surface

`GameCanvas.tsx` owns the active render host:

```txt
createRenderer
createScene
createCamera
createPostProcessing
buildMazeWorld
sync camera from player
render world and minimap frame
record runtime debug frame
```

The visual surface is stable enough for the next source cut. The missing render-adjacent proof is not visual fidelity; it is debug readback of command outcomes.

## Current debug readback

`runtimeDebugStore.ts` records:

```txt
latestFrame
frames
events
local pose
input snapshot
replicated snapshot facts
cube records
anomaly records
cadence records
scene dressing records
window.__HORROR_CORRIDOR_DEBUG__.extractState()
```

## Missing command projection

Runtime debug does not yet expose:

```txt
latestCommandResult
latestCommandReason
latestPublishDecision
latestConsumerAction
latestCommandJournalCounts
latestFixtureParity
latestRejectedCommandRow
latestRequestSyncRecoveryRow
```

## Next render/debug proof target

Add `runtimeDebugCommandProjection.ts` after the DOM-free command fixture passes. Then expose additive command fields in `runtimeDebugStore.ts` without changing existing frame/event export shape.

## Acceptance rows

```txt
accepted interaction result appears in debug projection
rejected interaction reason appears in debug projection
request-sync recovery appears as publish-only/recovery
unknown action appears as skipped:unknown-action
victory publish decision appears explicitly
legacy debug frame fields remain serializable
```

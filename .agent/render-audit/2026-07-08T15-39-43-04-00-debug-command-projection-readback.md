# HorrorCorridor Debug Command Projection Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T15:39:43-04:00`

## Purpose

This render audit records why the visual/render surface should not be extracted first.

The immediate render-adjacent gap is diagnostic projection: the renderer, minimap, HUD, and debug frame can show the current snapshot, but cannot yet explain the latest command result, rejection reason, publish decision, local/host consumer action, command journal, or fixture parity.

## Current visual surface

```txt
GameCanvas.tsx
-> createRenderer()
-> createScene()
-> createCamera()
-> createPostProcessing()
-> buildMazeWorld()
-> pointer-lock first-person camera sync
-> drawMinimapFrame()
-> recordRuntimeDebugFrame()
-> renderer/post-processing render loop
```

## Current debug surface

```txt
recordRuntimeDebugEvent(kind, message, payload)
recordRuntimeDebugFrame(frame)
RuntimeDebugFrame includes:
- frame number
- screen
- pointer lock
- room id
- local player id
- local pose
- input snapshot
- authoritative snapshot summary
- cube list
- anomaly sequence/slots
- cadence
- scene dressing
```

## Missing command projection

```txt
latestCommandResult: missing
latestCommandReason: missing
latestPublishDecision: missing
latestConsumerAction: missing
latestCommandSource: missing
latestCommandType: missing
latestCommandChanged: missing
commandJournalCounts: missing
latestFixtureParity: missing
```

## Render-safe next addition

Add the following after command fixture proof:

```txt
RuntimeDebugCommandProjection
projectCommandResultToDebug(result, decision, journal)
latestCommandDebug field in runtime debug store
latestCommandDebug field in debug frame export
fixture parity rows for projection shape
```

## Must not do yet

```txt
- do not replace the Three.js renderer
- do not extract minimap rendering
- do not alter camera bob or pointer-lock rendering
- do not add new scene dressing
- do not tune post-processing
- do not add new object kits
```

## Acceptance after command fixture exists

```txt
[ ] rejected pickup with no nearby cube appears as rejected:no-nearby-cube
[ ] request-sync appears as publish-only:request-sync with recovery decision
[ ] toggle-ready appears as skipped:toggle-ready-policy-not-implemented
[ ] accepted place final anomaly slot appears as victory:ordered-sequence-complete
[ ] local consumer records skip for rejected/no-op commands
[ ] host consumer records skip for rejected TRY_INTERACT commands
[ ] debug projection includes journal counts
```

## Current conclusion

Rendering is not the current blocker.

The render-facing blocker is command observability. Build command result contracts, consumer decisions, and the DOM-free fixture first. Then project the result into debug frames without changing visual output.

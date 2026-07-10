# HorrorCorridor Render Audit: Runtime Debug Command Result Gap

**Timestamp:** `2026-07-10T12-29-26-04-00`

## Render surface

`HorrorCorridor` has a visual runtime surface in `GameCanvas.tsx` backed by Three.js world rendering, camera/post-processing setup, minimap projection, HUD/completion readout, and runtime debug capture.

## Current render/debug consumers

```txt
GameState snapshot
player pose and camera refs
cube/anomaly/player render lists
maze cell lookups
scene dressing descriptors
minimap markers
runtime debug frames and events
```

## Gap

The visual/debug surface can show the latest world snapshot, but cannot show why the command stream produced that snapshot.

```txt
runtimeDebugStore exports frames/events
runtime debug frame rows do not include latestCommandResult
runtime debug frame rows do not include latestPublishDecision
runtime debug frame rows do not include latestRejectionReason
runtime debug frame rows do not include command journal counters
runtime debug frame rows do not include fixture parity
```

## Render-risk assessment

Do not extract or retune the renderer before command-result projection exists. A renderer extraction would preserve the same black-box command seam and make later parity checks harder because visual readback would still lack source command reasons.

## Required proof rows before render work

```txt
accepted interaction rendered after publish
rejected interaction skipped with visible/retrievable reason
no-op interaction retained as command result but no visual publish
request-sync recovery classified as publish-only
victory command classified separately from ordinary accepted change
ooze command rows separated from player interaction rows
runtime debug latestCommandResult matches fixture row
runtime debug latestPublishDecision matches fixture row
runtime debug journal counts match fixture row set
```

## Next ledge

```txt
Add runtime-debug-command-projection only after command fixture rows prove the command-result envelope and publish decisions.
```

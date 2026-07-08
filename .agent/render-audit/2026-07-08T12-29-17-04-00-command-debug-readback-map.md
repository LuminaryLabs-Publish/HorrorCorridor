# HorrorCorridor Command Debug Readback Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T12-29-17-04:00`

## Purpose

Document the visual/render readback seam for command-result authority before any renderer or minimap extraction.

## Current render surface

```txt
GameCanvas.tsx
-> createRenderer()
-> createScene()
-> createCamera()
-> createPostProcessing()
-> buildMazeWorld()
-> drawMinimapFrame()
-> recordRuntimeDebugFrame()
```

The render path consumes replicated snapshots and local pose data. It does not yet consume command results.

## Current debug readback surface

```txt
runtimeDebugStore.ts
-> enabled / overlayVisible
-> latestFrame
-> frames
-> events
-> window.__HORROR_CORRIDOR_DEBUG__.extractState()
```

Current frame records expose:

```txt
frameNumber
deltaMs
elapsedMs
mode
screen
pointerLocked
roomId
localPlayerId
localPose
input
snapshot tick/timestamp/appState/gameState/player/cube/ooze/slot counts
cube records
anomaly records
cadence records
sceneDressing summary
```

Missing readback fields:

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
latestSkippedReason
commandJournalCounts
lastConsumerAction
latestFixtureParity
```

## Target render/debug readback

```txt
CommandResult
-> PublishDecision
-> CommandJournal
-> local/host consumer action
-> runtime debug projection
-> browser overlay can explain current command outcome
-> window.__HORROR_CORRIDOR_DEBUG__.extractState() exposes proof state
```

## Renderer non-goal

The next pass should not change scene geometry, camera style, post-processing, minimap drawing, object kits, or texture kits.

The renderer only needs a better diagnostic readback lane once the headless fixture passes.

## Required debug projection after fixture proof

```txt
latestCommandResult:
  commandId
  commandSource
  commandType
  status
  reason
  changed
  beforeSummary
  afterSummary
  diagnostics

latestPublishDecision:
  decision
  reason
  shouldBroadcast
  shouldCommitVictory
  snapshotReason

commandJournalCounts:
  acceptedCount
  rejectedCount
  unchangedCount
  publishOnlyCount
  skippedCount
  victoryCount

latestFixtureParity:
  fixtureId
  passed
  volatileFieldsNormalized
  mismatchCount
```

## Acceptance readback checks

```txt
[ ] fixture output can be read without DOM, canvas, PeerJS, Three.js, or browser globals.
[ ] runtime debug export keeps previous frame/event fields.
[ ] runtime debug export adds command fields without breaking __HORROR_CORRIDOR_DEBUG__.
[ ] rejected local interaction appears as status=rejected and decision=skip.
[ ] request-sync appears as status=publish-only and decision=recovery.
[ ] victory appears as status=victory and decision=victory.
[ ] renderer/minimap remain snapshot consumers, not command authorities.
```

## Stop line

Stop this render/debug lane when debug readback can explain command outcomes.

Do not extract render-world, minimap, camera, post-processing, or scene-dressing descriptors in the same pass.
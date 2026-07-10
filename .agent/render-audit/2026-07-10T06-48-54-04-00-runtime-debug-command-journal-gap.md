# Render Audit — Runtime Debug Command Journal Gap

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T06-48-54-04-00`

## Visual/render surface

`HorrorCorridor` has a visual surface: `GameCanvas.tsx` mounts a Three.js first-person maze renderer, post-processing path, minimap, HUD/completion route, and runtime debug export.

## Current render-consumer loop

```txt
GameState / replicated snapshot
  -> GameCanvas local or network authority chooses current snapshot
  -> renderer consumes maze, players, cubes, anomaly, ooze, and scene dressing
  -> minimap consumes snapshot and local pose
  -> HUD consumes mode, status, carried cube, anomaly progress, and route state
  -> runtime debug records frame-level facts and events
```

## What not to change next

Do not start with renderer extraction, minimap extraction, post-process extraction, scene dressing, visual object-kit expansion, or camera tuning.

The render path is not the blocker. The blocker is that render/debug consumers do not have command-result facts to explain why state did or did not change.

## Runtime debug gap

`runtimeDebugStore` currently records useful frame facts, including mode, screen, pointer lock, local pose, input, snapshot counts, cube state, anomaly state, cadence, and scene dressing.

It does not expose:

```txt
latestCommandResult
latestCommandReason
latestPublishDecision
latestConsumerAction
latestRejectedCommand
latestSkippedCommand
latestRecoveryCommand
commandJournalCounts
fixtureParity
```

## Required additive render/debug readback

```txt
RuntimeDebugCommandProjection
  latestResult.status
  latestResult.reason
  latestResult.command.source
  latestResult.changed
  latestResult.events
  latestPublishDecision.kind
  latestPublishDecision.reason
  journal.accepted
  journal.rejected
  journal.skipped
  journal.noop
  journal.victory
  fixtureParity.lastRunStatus
```

## Acceptance bar

A browser debug export should be able to explain:

```txt
what command ran
who issued it
whether it was accepted, rejected, skipped, no-op, recovery, or victory
why it did or did not mutate state
whether it should publish
why a publish was skipped or forced
which fixture row proves the behavior
```

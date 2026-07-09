# HorrorCorridor Runtime Debug Command Projection Readback

**Timestamp:** `2026-07-09T01-00-22-04-00`

## Current render/debug surface

```txt
GameCanvas
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> drawMinimapFrame
  -> createRuntimeDebugFrameRecord
  -> recordRuntimeDebugFrame
  -> recordRuntimeDebugEvent
  -> window.__HORROR_CORRIDOR_DEBUG__.extractState()
```

## Current debug frame readback

Runtime debug frames currently expose:

```txt
frameNumber
deltaMs
elapsedMs
recordedAtMs
mode
screen
pointerLocked
roomId
localPlayerId
localPose
input
snapshot summary
cubes
anomaly
cadence
sceneDressing
```

Runtime debug frames do not yet expose:

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
latestConsumerAction
commandJournal
fixtureParity
```

## Render audit finding

The render surface itself does not need to be extracted next.

The better render-adjacent pass is command readback: make the visible debug system explain why the last interaction did or did not publish, whether it was rejected/skipped/unchanged/publish-only/victory, and whether the browser path matches fixture rows.

## RuntimeDebugCommandProjection target

```txt
RuntimeDebugCommandProjection
  commandId: string | null
  source: local-input | host-peer-message | client-peer-message | fixture | system
  type: player-update | pickup-cube | drop-cube | place-cube-at-anomaly | remove-cube-from-anomaly | request-sync | toggle-ready | cancel | ooze-tick | unknown
  status: accepted | rejected | unchanged | skipped | publish-only | victory
  reason: CommandReason
  changed: boolean
  publishDecision: publish | skip | no-op | recovery | victory
  shouldBroadcast: boolean
  shouldCommitVictory: boolean
  snapshotReason: initial | join | resync | reconnect | recovery | victory | none
  localConsumerAction: publish | skip | journal-only | victory | none
  hostConsumerAction: publish | skip | recovery | victory | none
  journalCounts: accepted/rejected/unchanged/skipped/publishOnly/victory/total
  fixtureParity: passed | failed | not-run
```

## Additive store fields

Add these fields only after the command fixture passes:

```txt
RuntimeDebugFrameRecord.command: RuntimeDebugCommandProjection | null
RuntimeDebugExport.latestCommandResult: compact command result summary | null
RuntimeDebugExport.latestPublishDecision: compact publish decision summary | null
RuntimeDebugExport.commandJournal: compact journal summary | null
RuntimeDebugExport.latestFixtureParity: fixture parity summary | null
```

## GameCanvas readback splice

```txt
local interaction path
  -> LocalAuthorityCommandConsumerResult
  -> RuntimeDebugCommandProjection
  -> frame.command
  -> optional publishAuthoritativeState(decision.snapshotReason)

host interaction path
  -> HostAuthorityCommandConsumerResult
  -> RuntimeDebugCommandProjection
  -> frame.command
  -> optional publish/recovery/victory

fixture path
  -> same projection helper
  -> validates projection is serializable and stable
```

## Non-goals

```txt
- do not extract renderer first
- do not change scene dressing first
- do not change minimap first
- do not alter post-processing first
- do not require browser APIs in command fixture
```

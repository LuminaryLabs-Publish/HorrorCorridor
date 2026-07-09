# HorrorCorridor Render / Runtime Debug Readback Audit

**Timestamp:** `2026-07-09T12-20-08-04-00`

## Render surface

`HorrorCorridor` has a visual/render surface.

The route uses a React client component that initializes a Three.js renderer, scene, camera, post-processing, maze world, minimap, runtime stores, runtime debug frames, and runtime debug events.

## Render loop ownership

```txt
GameCanvas.tsx
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> draw minimap
  -> capture runtime debug frames
  -> publish or receive replicated snapshots
```

## Current readback surface

```txt
runtimeDebugStore exposes:
  enabled
  overlayVisible
  latestFrame
  frames
  events

RuntimeDebugFrameRecord exposes:
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
  snapshot summary
  cube records
  anomaly records
  cadence records
  sceneDressing summary
```

## Missing command readback

```txt
latestCommandResult is missing
latestPublishDecision is missing
latestRejectionReason is missing
latestConsumerAction is missing
commandJournal summary is missing
latestFixtureParity is missing
```

## Render risk

The renderer can show the maze and minimap, but it cannot explain the command that caused the latest state transition or why a state transition was skipped.

That means debugging interaction failures still requires inference from object identity, implicit reason strings, and debug event prose.

## Required additive readback

```txt
RuntimeDebugCommandProjection
  -> latest result status
  -> latest result reason
  -> latest publish decision
  -> shouldBroadcast
  -> shouldCommitVictory
  -> local consumer action
  -> host consumer action
  -> journal counters
  -> fixture parity summary
```

## Non-goal

Do not extract renderer, minimap, or post-processing first.

## Next safe ledge

```txt
HorrorCorridor Result-First Command Readback Ledger Refresh + Fixture Gate
```

# Runtime Debug Command Decision Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-38-28-04-00`

## Render surface

`HorrorCorridor` has a visual/render surface under `HorrorCorridor-V1/src/components/game/GameCanvas.tsx`.

Current render flow:

```txt
GameCanvas initializes renderer, scene, camera, and post-processing
  -> buildMazeWorld(maze)
  -> attach world to scene
  -> animation loop samples latest snapshot or local authoritative state
  -> syncCameraFromPlayer()
  -> world.update(elapsedMs, snapshot/local player facts)
  -> drawMinimapFrame()
  -> capture runtime debug frame when debug is enabled
  -> postProcessing.render()
```

## Current readback

Render/debug currently has these facts available:

```txt
frame number
delta time
elapsed time
screen state
pointer lock state
room id
local player id
snapshot
pose
view angles
input snapshot
network cadence
scene dressing summary
```

## Missing command decision readback

Runtime debug does not yet expose:

```txt
latest CommandResult
latest CommandReason
latest PublishDecision
latest consumer action
latest skipped/rejected/no-op explanation
latest command journal counters
latest local authority decision
latest host authority decision
latest fixture parity summary
```

## Render-safe next contract

Add command decision readback as a diagnostic projection only after the DOM-free command fixture proves the command contracts.

Target shape:

```txt
RuntimeDebugCommandProjection
  commandId
  source
  action
  status
  reason
  changed
  decision
  shouldBroadcast
  shouldCommitVictory
  snapshotReason
  consumer
  journalCounts
  fixtureParity
```

## Rule

Do not modify scene visuals, camera, minimap, post-processing, maze dressing, or object-kit geometry during the command decision fixture pass.

The only render-facing change after fixture proof should be additive debug projection readback.

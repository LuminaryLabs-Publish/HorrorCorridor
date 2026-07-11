# HorrorCorridor Post-Exit Frame Projection Gap

**Timestamp:** `2026-07-11T01-01-32-04-00`

## Current render lifecycle

```txt
GameCanvas mounts
  -> create renderer/camera/scene/world/post-processing
  -> install browser listeners and ResizeObserver
  -> start RAF
  -> render world/minimap/debug frames

GameCanvas unmounts
  -> stop RAF
  -> unsubscribe canvas transport listener
  -> remove listeners/observer
  -> dispose world/post-processing/renderer
  -> remove canvas
```

## Existing strength

The local render surface has a concrete cleanup path. The next architecture pass should preserve it rather than replace the renderer.

## Gap

Cleanup is triggered by React projection, not by a terminal run-exit result.

```txt
returnToLobby changes screen
  -> React unmounts GameCanvas
  -> cleanup runs
  -> no exit result id is retained
  -> no teardown result is published
  -> no first lobby frame/readback confirms the same commit
```

Meanwhile the shell transport can accept a late SYNC and remount the game surface.

## Required render/readback contract

```txt
accepted RunExitResult
  -> render admission closes for terminal epoch
  -> final frame optionally records terminal result
  -> GameCanvas cleanup returns RuntimeTeardownResult
  -> first lobby/closed projection references exit result id
  -> late old-epoch SYNC cannot remount GameCanvas
```

## Required observations

```txt
last active frame number
terminal result id and epoch
render admission closed timestamp
RAF stop result
world disposal result
composer disposal result
renderer disposal result
canvas removal result
first lobby projection timestamp
unexpected post-exit frame count
old-epoch remount rejection count
```

## Non-goals

```txt
renderer replacement
shader changes
bloom changes
lighting changes
maze geometry changes
minimap redesign
```

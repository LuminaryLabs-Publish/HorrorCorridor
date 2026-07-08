# HorrorCorridor Render Authority Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T09:40:52-04:00`

## Render surface exists

`HorrorCorridor` has a visual/render surface under `HorrorCorridor-V1/src/components/game/GameCanvas.tsx`.

The route initializes:

```txt
createRenderer()
createScene()
createCamera()
createPostProcessing()
buildMazeWorld()
drawMinimapFrame()
recordRuntimeDebugFrame()
```

## Current render loop

```txt
animation loop
  -> read UI state and debug state
  -> advance local/host/client simulation branch
  -> resolve latest replicated snapshot
  -> sync camera from local pose and view angles
  -> world.update(snapshot, local player, local view angles)
  -> draw minimap from latest snapshot
  -> capture debug frame
  -> postProcessing.render()
```

## Render domains

```txt
three-renderer
scene-construction
camera-construction
camera-bob
post-processing
maze-world-rendering
world-snapshot-consumption
minimap-rendering
scene-dressing-summary
runtime-debug-frame-capture
resize-observer
renderer-disposal
```

## Render services

```txt
renderer service:
  - pixel ratio cap
  - WebGL renderer construction
  - renderer resize
  - renderer disposal

camera service:
  - perspective camera creation
  - camera aspect resize
  - first-person pose sync
  - camera bob/roll from movement speed

post-process service:
  - effect composer creation
  - resize with renderer
  - render pass entry
  - disposal

maze world render service:
  - attach scene meshes
  - update world from snapshot
  - expose terrain eye position
  - expose scene dressing summary
  - dispose world objects

minimap service:
  - draw current snapshot
  - project local player and yaw
  - run from same frame as world render
```

## Render risk

The render loop itself is not the next extraction target.

The current risk is that renderer, minimap, runtime debug frame capture, command authority, input, network publish cadence, and snapshot consumption all meet inside `GameCanvas.tsx`.

If renderer extraction happens before command result fixtures, render code may preserve visual behavior while hiding authority bugs.

## Next safe render stance

```txt
Keep renderer stable.
Do not extract renderer first.
Add command-result fixture proof first.
Only project command result metadata into runtime debug after headless fixture passes.
Only then split render/minimap/debug surfaces if needed.
```

## Render validation still needed

```txt
npm run visual:match
npm run validate:live-player:dev
browser route check
host/client multiplayer route check
```
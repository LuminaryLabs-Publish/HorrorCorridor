# HorrorCorridor Render Surface Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T02:19:36-04:00`

## Current render surface

```txt
GameCanvas
-> createRenderer
-> createScene
-> createCamera
-> createPostProcessing
-> buildMazeWorld
-> world.attach(scene)
-> render loop updates camera from player pose
-> world.update(snapshot, local player, view angles)
-> drawMinimapFrame
-> record debug frame
-> postProcessing.render
```

## Rendering domains in use

```txt
three-renderer
post-processing
maze-world-rendering
render-world-snapshot-consumption
camera-bob
minimap-rendering
scene-dressing-descriptors
mesh-object-kit-catalog
procedural-texture-kit-family
runtime-debug-frame-capture
```

## Current render strengths

```txt
- Three.js renderer, scene, camera, post-processing, and world builder already exist.
- Maze world attaches and disposes through a clear world object.
- Render loop consumes authoritative snapshots.
- Camera sync uses player position, yaw, pitch, movement speed, and subtle walk shake.
- Minimap draws from the same snapshot data used by the world.
- Runtime debug frame includes sceneDressing summary, snapshot summary, cadence, input, local pose, cubes, and anomaly slots.
```

## Current render coupling

```txt
- GameCanvas owns renderer creation, simulation advancement, snapshot publish cadence, minimap drawing, debug capture, and PeerJS event handling.
- Render loop and authority loop are interleaved.
- Minimap rendering is called directly from GameCanvas instead of consuming a renderer handoff descriptor.
- Post-processing is initialized inside GameCanvas and is not yet represented as a pure render descriptor contract.
- Renderer extraction before command authority would risk hiding state-authority defects behind visual work.
```

## Render extraction target

```txt
render-handoff-domain
├─ corridor-render-world-kit
│  ├─ create-render-descriptor
│  ├─ consume-replicated-snapshot
│  ├─ update-local-view-descriptor
│  └─ emit-scene-dressing-summary
├─ corridor-minimap-kit
│  ├─ consume-replicated-snapshot
│  ├─ consume-local-position
│  └─ draw-or-describe-minimap-frame
├─ postprocess-stack-extraction-kit
│  ├─ describe-postprocess-chain
│  ├─ resize-postprocess-chain
│  └─ render-postprocess-frame
└─ renderer-host-extraction-kit
   ├─ mount-renderer
   ├─ resize-renderer
   ├─ render-frame
   └─ dispose-renderer
```

## Render next step

Do not extract render next.

The next safe render work is only to keep `runtime-debug-result-projection-kit` able to show command result and publish decision metadata inside the existing debug frame/export.

After the command fixture matrix passes, extract renderer and minimap from `GameCanvas` behind descriptor-driven interfaces.
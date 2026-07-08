# HorrorCorridor Render Authority Readback

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T08:29:35-04:00`

## Render surface summary

`HorrorCorridor` has a real visual/render surface under `HorrorCorridor-V1`.

The visual runtime is a first-person Three.js corridor maze with post-processing, cube/anomaly objects, ooze pressure, minimap, HUD, completion screen, and runtime debug overlays.

## Current render loop

```txt
GameCanvas mounts
-> creates renderer, scene, camera, lighting, post-processing, world meshes, minimap, stores, and runtime refs
-> runtime state initializes from maze/bootstrap snapshot
-> player movement and host/client updates mutate or receive GameState
-> renderer consumes current snapshot and player pose
-> minimap consumes maze/player/object state
-> debug store records frame and event summaries
-> completion UI watches victory state
```

## Render authority issue

The renderer should not become the source of truth for interaction legality, publish behavior, or game progression.

Current risk:

```txt
GameCanvas owns too much orchestration.
render loop, minimap, local input, host publish, client messages, debug capture, and command application are still too close together.
interactionRules/networkRules return GameState only, so renderer-side consumers can only infer accepted/rejected/no-op from object identity or broad state changes.
```

## Render services in use

```txt
create-renderer
create-scene
create-camera
create-post-processing
build-maze-world
attach-world-to-scene
update-world-from-snapshot
draw-minimap-frame
sync-camera-from-player
record-scene-dressing-summary
record-runtime-debug-frame
record-runtime-debug-event
dispose-render-runtime
```

## Render-adjacent domains

```txt
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
mesh-object-kit-catalog
procedural-texture-kit-family
render-world-snapshot-consumption
runtime-debug-frame-log
runtime-debug-event-log
runtime-debug-result-projection
cadence-diagnostics
```

## Render kits

```txt
corridor-render-world-kit
corridor-minimap-kit
scene-dressing-descriptor-kit
mesh-object-kit-catalog
procedural-texture-kit-family
runtime-debug-frame-kit
runtime-debug-result-projection-kit
```

## Current non-goal

Do not improve lighting, models, post-process, materials, object kits, scene dressing, or camera feel in the next pass.

Those upgrades should wait until command authority is fixture-safe.

## Next render-safe contract

The next source implementation should expose render-consumable command/result metadata without changing the visuals first:

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
commandJournalCounts
latestFixtureParity
```

That metadata should flow through runtime debug/export and future GameHost diagnostics.

## Stop line

After the source cutover queue lands, only then consider renderer extraction.

Renderer extraction target:

```txt
GameState snapshot + player pose + render descriptors
-> render-world snapshot consumer
-> minimap snapshot consumer
-> debug projection
```

Do not let render code make command legality decisions.

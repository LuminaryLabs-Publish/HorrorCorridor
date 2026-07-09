# Render Audit: Runtime Debug Command Readback Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-11-35-04-00`

## Render surface present

`HorrorCorridor` has a visual/render surface.

The render path is not the next blocker.

## Current render loop

```txt
GameCanvas initializes renderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> attach world to scene
  -> resize renderer/camera/post-processing
  -> animation loop updates local pose, camera, world, minimap, debug frame, and renderer frame
  -> cleanup disposes renderer/world/post-processing/event listeners
```

## Current render dependencies

```txt
HorrorCorridor-V1/src/features/render/three/createRenderer.ts
HorrorCorridor-V1/src/features/render/three/createScene.ts
HorrorCorridor-V1/src/features/render/three/createCamera.ts
HorrorCorridor-V1/src/features/render/three/createPostProcessing.ts
HorrorCorridor-V1/src/features/render/three/worldBuilder.ts
HorrorCorridor-V1/src/features/render/three/animationLoop.ts
HorrorCorridor-V1/src/components/hud/Minimap.tsx
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Current render readback

Runtime debug frames already include useful render-adjacent facts:

```txt
frameNumber
deltaMs
elapsedMs
screen
pointerLocked
roomId
localPlayerId
localPose
input snapshot
snapshot tick
snapshot appState/gameState
player/cube/ooze/decal counts
slot fill count
cube states
local player pose
anomaly sequence and slots
cadence counters
sceneDressing summary
```

## Missing render/debug readback

The debug surface cannot yet answer command-level questions.

```txt
latest command id
latest command source
latest command type
latest command status
latest command reason
latest changed flag
latest publish decision
latest snapshot reason
latest shouldBroadcast
latest shouldCommitVictory
latest local consumer action
latest host consumer action
latest rejection reason
latest skipped reason
latest recovery reason
command journal totals
fixture replay parity
GameCanvas consumer splice eligibility
```

## Render non-goal

Do not extract the Three renderer or minimap yet.

Do not add visual object kits yet.

Do not change post-processing yet.

The render audit target is additive diagnostics only:

```txt
CommandResult
  -> PublishDecision
  -> RuntimeDebugCommandProjection
  -> runtimeDebugStore additive fields
  -> GameCanvas frame record includes command projection
  -> overlay/export explains command outcome without changing visuals
```

## Additive consumer target

```txt
runtimeDebugCommandProjection.ts
  input: CommandResult + PublishDecision + CommandJournalSummary
  output: serializable RuntimeDebugCommandProjection

runtimeDebugStore.ts
  add latestCommandResultSummary
  add latestPublishDecisionSummary
  add commandJournalSummary
  add latestFixtureParity

GameCanvas.tsx
  after fixture passes, record command projection beside existing frame/debug events
```

## Validation target

The first proof should be headless.

```txt
node scripts/horror-corridor-command-fixture.mjs
```

Only after fixture proof should browser debug readback be wired.

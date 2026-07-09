# HorrorCorridor Runtime Debug Command Readback Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-19-00-04-00`

## Render surface

`HorrorCorridor` has a visual/render surface under `HorrorCorridor-V1/src/components/game/GameCanvas.tsx`.

The surface creates renderer, scene, camera, post-processing, maze world, minimap drawing, runtime frame capture, and pointer-lock camera movement inside one runtime component.

## Current render loop

```txt
GameCanvas initializes runtime
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> createAnimationLoop
  -> step local or client pose
  -> apply host/local simulation authority
  -> sync camera from player
  -> world.update(snapshot, local player, view angles)
  -> drawMinimapFrame
  -> capture runtime debug frame
  -> postProcessing.render()
```

## Current debug readback

Runtime debug currently exposes:

```txt
latestFrame
frames
events
localPose
input
snapshot summary
cube records
anomaly sequence/slots
cadence
sceneDressing
```

## Missing readback channel

Runtime debug does not yet expose:

```txt
latestCommandResult
latestCommandReason
latestPublishDecision
latestConsumerAction
latestCommandJournalCounters
latestRejectedCommand
latestSkippedCommand
latestRecoveryCommand
latestFixtureParity
```

## Render contract for next implementation

Do not extract renderer first.

Add command readback as an additive diagnostic channel so the existing render path keeps working.

Required flow:

```txt
CommandResult
  -> PublishDecision
  -> CommandJournal
  -> RuntimeDebugCommandProjection
  -> runtimeDebugStore additive fields
  -> window.__HORROR_CORRIDOR_DEBUG__.extractState()
  -> fixture-readable command readback row
```

## Acceptance requirement

The browser debug export should explain the last interaction without inspecting canvas state:

```txt
command id
source
status
reason
changed
publish decision
should broadcast
should commit victory
snapshot reason
consumer action
journal counters
fixture parity status
```

## Non-goals

```txt
- no renderer rewrite
- no minimap extraction
- no post-processing extraction
- no visual object-kit expansion
- no shader/material pass
- no PeerJS extraction
```

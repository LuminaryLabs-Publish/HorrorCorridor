# HorrorCorridor Render Audit: Debug Command Readback Consumer Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T15-56-42-04-00`

## Render surface

`HorrorCorridor` has a live visual surface. `GameCanvas.tsx` mounts Three.js renderer/camera/post-processing, builds the maze world, draws the minimap, updates HUD state, and records runtime debug frames.

## Current render/readback loop

```txt
GameCanvas mount
  -> createRenderer
  -> createScene
  -> createCamera
  -> createPostProcessing
  -> buildMazeWorld
  -> attach renderer.domElement
  -> createAnimationLoop
  -> consume current GameState or ReplicatedGameSnapshot
  -> update world/minimap/HUD/debug frame
  -> render scene
```

## Current debug export surface

```txt
window.__HORROR_CORRIDOR_DEBUG__.enable()
window.__HORROR_CORRIDOR_DEBUG__.disable()
window.__HORROR_CORRIDOR_DEBUG__.showOverlay()
window.__HORROR_CORRIDOR_DEBUG__.hideOverlay()
window.__HORROR_CORRIDOR_DEBUG__.clear()
window.__HORROR_CORRIDOR_DEBUG__.getLatestFrame()
window.__HORROR_CORRIDOR_DEBUG__.getFrames()
window.__HORROR_CORRIDOR_DEBUG__.getEvents()
window.__HORROR_CORRIDOR_DEBUG__.extractState()
```

## Current readback covers

```txt
frame number
delta / elapsed / recorded time
screen
pointer-lock state
room id
local player id
local pose
input snapshot
snapshot counts
cube records
anomaly sequence and slots
network cadence
scene dressing summary
```

## Missing command projection

```txt
latestCommandResult
latestCommandStatus
latestCommandReason
latestPublishDecision
latestSnapshotReason
latestShouldBroadcast
latestShouldCommitVictory
latestConsumerAction
commandJournalCounts
latestFixtureParity
lastRejectedCommand
lastSkippedPublish
```

## Required consumer contract

`runtime-debug-command-projection-kit` should project only serializable facts:

```txt
command id
source
player id
action
status
reason
changed flag
publish decision
snapshot reason
shouldBroadcast
shouldCommitVictory
consumer id
journal counts
fixture id when applicable
```

## Non-goal

Do not extract renderer, minimap, post-processing, lighting, fog, or object kits first. The render blocker is command readback, not visual fidelity.

# Post-Exit Frame and Transport Admission Gap

**Timestamp:** `2026-07-11T01-10-28-04-00`

## Render surface

`GameCanvas` owns the Three.js world, post-processing composer, renderer, canvas, animation frame, resize handling, minimap updates, and local input lifecycle. Component unmount performs local cleanup.

## Gap

The render teardown is not correlated with an authoritative run-exit result. After `returnToLobby()` changes the local screen:

```txt
GameCanvas unmounts and disposes local render resources
GameShell transport callback remains live
room and authoritative snapshot remain active or ending
late SYNC can set screen back to PLAYING, PAUSED, or COMPLETED
new GameCanvas may mount from an old-run projection
```

The first lobby frame and any later re-entry frame therefore have no source identity proving which run, epoch, exit result, or transport generation produced them.

## Required readback

```txt
frameId
screen
gameState
roomPhase
runSessionId
sessionEpoch
sourceSnapshotGameId
sourceSnapshotTick
lastExitRequestId
lastExitResultStatus
transportGeneration
messageAdmissionStatus
worldMounted
composerMounted
rendererMounted
canvasMounted
cleanupResultId
```

## Required invariant

```txt
accepted run exit
  -> no further old-run render frame commits
  -> first lobby frame references accepted exit result
  -> old messages cannot remount GameCanvas
  -> new GameCanvas requires a new run identity and epoch
```

## Validation gate

A DOM-free fixture should prove projection admission and a browser smoke should prove exactly one canvas/world/composer/renderer owner through exit and re-entry.

## Deferred render work

Renderer replacement, material changes, lighting changes, bloom retuning, minimap extraction, scene-dressing expansion, and visual polish remain deferred.

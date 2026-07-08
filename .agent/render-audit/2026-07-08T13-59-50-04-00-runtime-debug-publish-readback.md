# HorrorCorridor Runtime Debug Publish Readback Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T13:59:50-04:00`

## Render surface read

`HorrorCorridor` has a real visual/render surface. `GameCanvas.tsx` initializes the Three.js renderer, scene, camera, post-processing, maze world, minimap canvas, pointer-lock input, runtime debug capture, and snapshot-driven render loop.

The current renderer should stay stable while command authority is cut over.

## Current render/debug loop

```txt
GameCanvas initializeRuntime
-> createRenderer
-> createScene
-> createCamera
-> createPostProcessing
-> buildMazeWorld
-> attach world to scene
-> animation loop
-> step local/client pose
-> update host/client snapshot
-> world.update(snapshot, local player data)
-> drawMinimapFrame(snapshot)
-> recordRuntimeDebugFrame
-> postProcessing.render
```

## Current readback coverage

```txt
RuntimeDebugFrameRecord:
  frame number
  delta and elapsed time
  runtime mode
  screen
  pointer lock
  room id
  local player id
  local pose
  input snapshot
  replicated snapshot summary
  cube records
  anomaly records
  cadence records
  scene dressing summary

RuntimeDebugEventRecord:
  event id
  kind
  timestamp
  message
  payload
```

## Missing command readback

```txt
latestCommandResult
latestCommandStatus
latestCommandReason
latestPublishDecision
latestSnapshotReason
latestConsumerAction
latestBroadcastDecision
latestVictoryCommitDecision
commandJournalCounts
latestFixtureParity
```

## Render rule

Do not make renderer, minimap, post-processing, scene dressing, or object kit changes before the command-result fixture passes.

The visual layer should only receive additive debug projection fields after the domain command fixture proves stable rows.

## Required additive debug projection

```txt
type RuntimeDebugCommandProjection = {
  commandId: string | null;
  source: "local" | "host" | "client" | "system" | null;
  action: string | null;
  status: "accepted" | "rejected" | "unchanged" | "publish-only" | "skipped" | "victory" | null;
  reason: string | null;
  changed: boolean | null;
  publishDecision: "publish" | "skip" | "recovery" | "no-op" | "victory" | null;
  snapshotReason: "resync" | "recovery" | "initial" | "join" | "reconnect" | null;
  shouldBroadcast: boolean | null;
  shouldCommitVictory: boolean | null;
};
```

## Fixture before browser proof

The browser overlay should not be the first proof of command authority.

The first proof should be:

```txt
node scripts/horror-corridor-command-fixture.mjs
```

Then browser/live proof can check that the same result fields appear in runtime debug export.

## Stop condition

```txt
[ ] command projection type documented
[ ] no renderer rewrite
[ ] no minimap rewrite
[ ] no postprocess rewrite
[ ] no scene dressing expansion
[ ] fixture must pass before GameCanvas consumes projection
```

# Snapshot-Step Visible Actor Gap

**Timestamp:** `2026-07-16T16-00-12-04-00`

## Summary

Remote actors are rendered from the latest accepted snapshot without a presentation-time pose resolver.

## Intent

Make visible remote-player motion continuous where samples are continuous while preserving immediate discontinuities for real teleports and retirements.

## Current frame path

```txt
latest authoritative snapshot
  -> GameCanvas renderFrame
  -> world.update(snapshot)
  -> syncPlayerMeshes(snapshot.players)
  -> mesh.position.set(snapshot pose)
  -> mesh.rotation.y = snapshot yaw
  -> drawMinimapFrame(snapshot)
  -> marker position from snapshot pose
  -> postProcessing.render()
```

## Source-backed gap

The host publishes on a 50 ms cadence. A typical display may present multiple RAF frames between network snapshots. Those frames repeat the same remote pose. When the next snapshot is accepted, the mesh and marker move directly to the new pose.

```txt
frame A: pose N
frame B: pose N
frame C: pose N
snapshot N+1 arrives
frame D: pose N+1
```

No code path computes a pose between N and N+1.

## Missing render authority

- Remote pose sample buffer.
- Presentation timestamp.
- Interpolation alpha.
- Shortest-arc yaw interpolation.
- Pitch interpolation.
- Teleport threshold.
- Extrapolation budget.
- Shared Three.js/minimap pose set.
- Consumer receipt and frame acknowledgement.

## Required render contract

```txt
RemoteActorProjectionResult {
  sessionRevision
  snapshotRevision
  projectionRevision
  presentationTimeMs
  interpolationDelayMs
  actorPoses[]
  teleportedActorIds[]
  extrapolatedActorIds[]
  frozenActorIds[]
}
```

Both the Three.js player layer and minimap must consume the same `projectionRevision`.

## Validation boundary

No screenshot sequence, frame-delta probe, jitter simulation or deployed-origin comparison was executed. The audit records a source-derived risk, not a reproduced rendering defect.
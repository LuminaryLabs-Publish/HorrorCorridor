# HorrorCorridor Next Steps

**Updated:** `2026-07-16T16-00-12-04-00`

## Summary

The next implementation should keep authoritative snapshots unchanged while introducing a presentation-only remote-actor timeline shared by the Three.js world and Canvas2D minimap.

## Intent

Turn irregular snapshot arrival into bounded, coherent remote-player motion without hiding teleports, accepting stale state or moving authority into the renderer.

## What needs to happen

1. Add `SnapshotRevision`, `ActorRevision`, `SampleRevision`, `ProjectionRevision` and `FrameRevision`.
2. Record authoritative tick, host timestamp and client receive timestamp for each accepted snapshot.
3. Maintain a bounded pose history per non-local actor.
4. Reject duplicate, older and retired samples before they enter the presentation buffer.
5. Resolve one interpolation delay policy from observed delivery cadence.
6. Interpolate position and pitch; rotate yaw through the shortest arc.
7. Apply an explicit teleport threshold that clears incompatible history.
8. Allow only bounded extrapolation when the next sample is late.
9. Freeze or retire actors after the extrapolation budget expires.
10. Produce one immutable `RemoteActorPoseSet` per frame.
11. Make `worldBuilder.syncPlayerMeshes` consume the projected pose set.
12. Make `drawMinimapFrame` consume the same projected pose set.
13. Remove actor buffers when roster/snapshot retirement is accepted.
14. Publish `RemoteActorSampleAdmissionResult` and `RemoteActorProjectionResult`.
15. Publish `FirstSmoothedMultiplayerFrameAck` after both surfaces present the same projection revision.
16. Add deterministic steady-cadence, jitter, loss, reorder, teleport and retirement fixtures.
17. Compare source, production build and deployed Pages behavior.

## Checklist

- [ ] Source implementation exists.
- [ ] Unit fixtures cover ordered and stale sample admission.
- [ ] Jitter fixture preserves bounded visual velocity.
- [ ] Loss fixture respects the extrapolation budget.
- [ ] Reorder fixture rejects older samples.
- [ ] Teleport fixture clears history immediately.
- [ ] Actor retirement removes mesh, marker and buffer ownership.
- [ ] Three.js and minimap projection revisions match.
- [ ] Production build and Pages fixtures pass on `main`.

## Completion gate

Do not claim smooth multiplayer presentation until remote actor position, rotation, loss behavior, teleport behavior, actor retirement and 3D/minimap convergence are executable and proven on `main`.
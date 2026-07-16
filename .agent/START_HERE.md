# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-16T16-00-12-04-00`  
**Status:** `remote-actor-snapshot-interpolation-projection-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, client prediction, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates remote-player presentation. The host publishes snapshots on a 50 ms cadence, the client store replaces the current snapshot, and both Three.js remote-player meshes and minimap markers consume the latest pose directly. No sample history, interpolation clock, bounded delay, teleport policy, shortest-arc rotation, packet-jitter policy, shared 3D/minimap projection result or first smoothed multiplayer-frame acknowledgement exists.

## Intent

Preserve authoritative snapshots and local prediction while making remote actors consume one bounded, revision-bound presentation timeline.

## What needs to happen

- Admit ordered authoritative pose samples with receive-time evidence.
- Buffer a bounded remote-player history per actor.
- Render remote actors against one interpolation clock.
- Apply shortest-arc rotation and explicit teleport thresholds.
- Bound or disable extrapolation after missing samples.
- Feed the same projected remote pose set to Three.js and the minimap.
- Retire removed actors and stale snapshot generations.
- Publish `RemoteActorProjectionResult` and `FirstSmoothedMultiplayerFrameAck`.

## Checklist

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented, root-agent-missing or runtime-ahead priority case.
- [x] Select only HorrorCorridor under the oldest synchronized rule.
- [x] Preserve the complete 29-kit and two-adapter inventory.
- [x] Add the timestamped remote-actor interpolation audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement and execute jitter, loss, reorder, teleport, retirement and source/build/Pages fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-16T16-00-12-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-16T16-00-12-04-00-remote-actor-interpolation-dsk-map.md`
7. `.agent/render-audit/2026-07-16T16-00-12-04-00-snapshot-step-visible-actor-gap.md`
8. `.agent/gameplay-audit/2026-07-16T16-00-12-04-00-network-jitter-remote-actor-loop.md`
9. `.agent/interaction-audit/2026-07-16T16-00-12-04-00-remote-pose-command-result-map.md`
10. `.agent/network-presentation-audit/2026-07-16T16-00-12-04-00-snapshot-buffer-interpolation-contract.md`
11. `.agent/deploy-audit/2026-07-16T16-00-12-04-00-network-jitter-browser-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-16T16-00-12-04-00-oldest-selection-remote-interpolation-reconciliation.md`

## Current authority boundary

```txt
corridor-remote-actor-snapshot-interpolation-projection-authority-domain
```

## Required transaction

```txt
RemoteActorSampleAdmissionCommand
  -> bind session, snapshot, actor and projection revisions
  -> admit ordered authoritative pose samples
  -> normalize host time and client receive time
  -> retain bounded per-actor history
  -> reject duplicate, stale and retired samples
  -> publish RemoteActorSampleAdmissionResult

RemoteActorProjectionCommand
  -> evaluate one interpolation clock
  -> apply bounded delay, shortest-arc rotation and teleport policy
  -> bound missing-sample extrapolation
  -> project one matching pose set into Three.js and Canvas2D
  -> publish RemoteActorProjectionResult
  -> publish FirstSmoothedMultiplayerFrameAck
```

## Validation boundary

Documentation only. No interpolation, jitter tolerance, packet-loss behavior, 3D/minimap convergence, browser parity, deployed parity or production readiness is claimed.
# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-16T16-00-12-04-00`  
**Branch:** `main`  
**Status:** `remote-actor-snapshot-interpolation-projection-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is remote-player presentation: authoritative snapshots are replaced as single current values, and remote poses are copied directly into Three.js meshes and Canvas2D minimap markers without an interpolation timeline or shared projected-pose result.

## Intent

Keep host authority and local prediction unchanged while giving every remote actor a bounded, deterministic visual timeline.

## What needs to happen

```txt
host receives client pose
  -> host publishes authoritative snapshot on NETWORK_TICK_RATE
  -> client replaces authoritativeSnapshot
  -> Three.js mesh copies snapshot position and rotation
  -> minimap marker copies snapshot position
  -> no pose history or interpolation clock exists
```

The host cadence is `50 ms`. A remote actor can therefore remain fixed between accepted snapshots and step to the next pose when a new snapshot arrives. Variable transport delay, loss or reordering has no presentation-specific settlement path.

## Checklist

- [x] Compare the full Publish inventory, central ledgers and root `.agent` states.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `GameShell.tsx`, `runtimeStore.ts`, `GameCanvas.tsx`, `worldBuilder.ts`, `Minimap.tsx`, protocol snapshots and cadence constants.
- [x] Preserve all 29 kits, two adapters and offered services.
- [x] Confirm direct remote-pose copying in both render surfaces.
- [x] Confirm no interpolation/extrapolation implementation or audit already exists.
- [x] Add and route the timestamped remote-actor interpolation audit family.
- [ ] Implement ordered sample admission and bounded pose history.
- [ ] Implement interpolation, rotation, teleport and loss policies.
- [ ] Publish one pose set to Three.js and Canvas2D.
- [ ] Execute source, browser, build and deployed-origin fixtures.

## Main finding

```txt
accepted snapshot N
  -> remote actor shown at pose N
  -> every RAF repeats pose N

accepted snapshot N+1
  -> remote actor immediately snaps to pose N+1
  -> minimap marker independently snaps to pose N+1

missing authority
  -> no interpolation delay
  -> no sample buffer
  -> no shortest-arc rotation
  -> no teleport threshold
  -> no bounded extrapolation
  -> no 3D/minimap convergence result
```

## Required authority

```txt
corridor-remote-actor-snapshot-interpolation-projection-authority-domain
```

## Claim boundary

Documentation only. The source-backed risk is stepwise or jittery remote presentation under real transport cadence. No player-facing defect was reproduced and no smoothing implementation is claimed.
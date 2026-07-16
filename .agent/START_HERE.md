# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-16T02-40-29-04-00`  
**Status:** `ooze-rng-stream-replay-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, local prediction, authoritative snapshots, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates ooze random identity. The snapshot contains a maze seed, but the active host invokes `advanceOozeTrail()` without an RNG provider, so decay, height and rotation consume ambient `Math.random()`. The resulting trail replicates, while algorithm, stream, cursor, draw count and replay proof do not.

## Plan ledger

**Goal:** make host-authoritative ooze evolution reproducible from an explicit seed stream without moving gameplay truth to clients.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented, root-agent-missing or runtime-ahead priority case.
- [x] Select only HorrorCorridor under the oldest synchronized rule.
- [x] Preserve the complete 29-kit and two-adapter inventory.
- [x] Add the timestamped ooze RNG/replay audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement and execute deterministic source, build and deployed-origin fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-16T02-40-29-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-16T02-40-29-04-00-ooze-rng-stream-replay-dsk-map.md`
7. `.agent/render-audit/2026-07-16T02-40-29-04-00-unbound-ooze-rng-visible-frame-gap.md`
8. `.agent/gameplay-audit/2026-07-16T02-40-29-04-00-ambient-ooze-randomness-replay-loop.md`
9. `.agent/interaction-audit/2026-07-16T02-40-29-04-00-ooze-random-draw-command-result-map.md`
10. `.agent/determinism-audit/2026-07-16T02-40-29-04-00-ooze-seed-stream-snapshot-contract.md`
11. `.agent/deploy-audit/2026-07-16T02-40-29-04-00-same-seed-ooze-replay-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-16T02-40-29-04-00-oldest-selection-ooze-rng-reconciliation.md`

## Current authority boundary

```txt
corridor-ooze-rng-stream-replay-authority-domain
```

## Required transaction

```txt
OozeSimulationStepCommand
  -> bind run seed algorithm stream host-tick trail and RNG revisions
  -> consume only the named ooze stream
  -> settle decay spawn and visual parameters atomically
  -> publish OozeSimulationStepResult
  -> persist the next stream cursor with authoritative state
  -> render matching world and minimap frames
  -> publish FirstSeedBoundOozeFrameAck

OozeReplayCommand
  -> restore seed algorithm cursor trail and accepted command history
  -> compare canonical checkpoint hashes
  -> publish OozeReplayResult
```

## Validation boundary

Documentation only. No deterministic ooze implementation, replay execution, snapshot migration, frame convergence, build parity, deployed parity or production readiness is claimed.
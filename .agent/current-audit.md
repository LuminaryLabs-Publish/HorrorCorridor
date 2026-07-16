# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-16T02-40-29-04-00`  
**Branch:** `main`  
**Status:** `ooze-rng-stream-replay-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is ooze random identity: an explicit run seed exists, but host-authoritative ooze decay and decal variation use ambient `Math.random()` and publish no algorithm, stream, cursor, draw count, replay result or seed-bound frame acknowledgement.

## Plan ledger

**Goal:** preserve host authority, networking, movement, rendering and minimap behavior while making ooze evolution reproducible and restorable.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` states and current heads.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect host cadence, ooze rules, snapshot schema, rendering, package scripts and proof surfaces.
- [x] Preserve all 29 kits, two adapters and offered services.
- [x] Add and route the timestamped ooze RNG/replay audit family.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
solo host or client route
  -> deterministic maze and session snapshot admission
  -> GameCanvas initializes transport input world renderer minimap and RAF
  -> accepted movement and interaction state advances

host or solo publication cadence
  -> compare wall time with last network tick
  -> call advanceOozeTrail with nowMs and player positions
  -> omit the optional RNG provider
  -> resolveRng falls back to Math.random
  -> random draws decide decay survival height and rotation
  -> publish concrete trail values in the authoritative snapshot

client and presentation path
  -> clients consume host snapshot values
  -> world and minimap render accepted ooze data
  -> no stream or draw revision accompanies the frame

retry restore or replay
  -> maze seed and concrete trail are available
  -> RNG algorithm stream cursor and draw history are absent
  -> exact same-seed ooze regeneration cannot be proven
```

## Domains in use

```txt
application routing and browser lifecycle
session identity room roster connection readiness and reset
deterministic maze bootstrap and seeded maze RNG
PeerJS BroadcastChannel transport and protocol
keyboard mouse pointer-lock and normalized input
client prediction and authoritative publication
movement collision camera and interaction
cube anomaly ooze and victory
host cadence wall time and snapshot publication
ooze RNG algorithm stream cursor replay and retirement
pause settings completion and route projection
Three.js world post-processing RAF and viewport
Canvas2D minimap and HUD projection
debug proof validation build deployment and central tracking
```

## Implemented inventory

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
planned ooze RNG/replay surfaces: 20
```

The complete kit-by-kit service inventory is in `.agent/kit-registry.json` and the latest tracker.

## Source-backed findings

```txt
run seed in snapshot: present
optional RNG in OozeTrailUpdateInput: present
host RNG argument: omitted
ambient Math.random fallback: present
random decay survival: present
random trail height: present
random trail rotation: present
concrete ooze trail replication: present
RNG algorithm version: absent
named ooze stream identity: absent
RNG cursor and draw count: absent
canonical ooze replay hash: absent
FirstSeedBoundOozeFrameAck: absent
same-seed replay fixture: absent
```

The live host remains authoritative and clients consume its snapshots. This is a replay and restoration evidence gap, not a reproduced multiplayer desynchronization claim.

## Required authority

```txt
corridor-ooze-rng-stream-replay-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-16T02-40-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T02-40-29-04-00.md
.agent/architecture-audit/2026-07-16T02-40-29-04-00-ooze-rng-stream-replay-dsk-map.md
.agent/render-audit/2026-07-16T02-40-29-04-00-unbound-ooze-rng-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T02-40-29-04-00-ambient-ooze-randomness-replay-loop.md
.agent/interaction-audit/2026-07-16T02-40-29-04-00-ooze-random-draw-command-result-map.md
.agent/determinism-audit/2026-07-16T02-40-29-04-00-ooze-seed-stream-snapshot-contract.md
.agent/deploy-audit/2026-07-16T02-40-29-04-00-same-seed-ooze-replay-fixture-gate.md
.agent/central-sync-audit/2026-07-16T02-40-29-04-00-oldest-selection-ooze-rng-reconciliation.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, input behavior, React, Three.js, Canvas2D, scripts, dependencies, tests, workflows, build and deployment are unchanged.
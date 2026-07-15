# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-14T20-58-46-04-00`  
**Branch:** `main`  
**Status:** `client-movement-kinematic-admission-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is client movement admission: host-side `PLAYER_UPDATE` handling accepts a caller-selected player identity and complete pose, mutates authoritative state directly, moves any held cube with that player and republishes the result.

## Plan ledger

**Goal:** retain responsive prediction while making the host authoritative over actor identity, ordering, reachable motion, collision and correction.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` states and current heads.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `GameCanvas`, protocol construction, `networkRules`, movement, collision and publication.
- [x] Preserve all 29 kits, two adapters and services.
- [x] Add and route the timestamped movement audit family.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
solo/host/client route
  -> bootstrap shared maze snapshot
  -> GameCanvas starts input, prediction, transport, simulation and rendering
  -> client predicts local pose
  -> client sends PLAYER_UPDATE with senderId, playerId, sequence, input and full pose
  -> host receives peer/message
  -> host copies payload pose into payload playerId
  -> held cube follows the copied player pose
  -> host republishes authoritative SYNC
  -> clients render snapshots while the local client continues prediction
  -> no typed admission or correction-frame receipt exists
```

## Domains in use

```txt
application routing and browser lifecycle
session room roster connection readiness and reset
loading and deterministic maze bootstrap
PeerJS BroadcastChannel transport and protocol
client prediction and authoritative publication
actor identity and peer/player binding
movement sequence ordering and deduplication
kinematic limits swept collision and maze bounds
keyboard pointer lock pause settings and UI
cube interaction anomaly ooze and victory
Three.js world post-processing minimap RAF and viewport
prediction correction and visible-frame convergence
debug proof validation build deployment and central tracking
```

## Implemented inventory

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
planned movement authority surfaces: 22
```

The complete kit-by-kit service inventory is in `.agent/kit-registry.json` and the latest tracker.

## Source-backed findings

```txt
PLAYER_UPDATE senderId and playerId are separate: yes
input sequence is transmitted: yes
host actor binding is enforced before mutation: no
sequence ordering or deduplication is enforced: no
host reconstructs motion from accepted input: no
supplied position and velocity are copied directly: yes
speed or acceleration admission exists: no
swept maze collision validation exists: no
held cube follows accepted supplied player pose: yes
typed movement result exists: no
client correction receipt exists: no
FirstAuthoritativeMovementFrameAck exists: no
```

## Required authority

```txt
corridor-client-movement-kinematic-admission-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-14T20-58-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T20-58-46-04-00.md
.agent/architecture-audit/2026-07-14T20-58-46-04-00-client-movement-kinematic-admission-dsk-map.md
.agent/render-audit/2026-07-14T20-58-46-04-00-authoritative-correction-visible-frame-gap.md
.agent/gameplay-audit/2026-07-14T20-58-46-04-00-client-pose-teleport-wall-bypass-loop.md
.agent/interaction-audit/2026-07-14T20-58-46-04-00-player-update-command-result-map.md
.agent/network-movement-audit/2026-07-14T20-58-46-04-00-sender-sequence-kinematic-settlement-contract.md
.agent/deploy-audit/2026-07-14T20-58-46-04-00-network-movement-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-14T20-58-46-04-00-repo-ledger-client-movement-reconciliation.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, scripts, dependencies, tests, workflows and deployment are unchanged.
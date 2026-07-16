# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-16T02-40-29-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `ooze-rng-stream-replay-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze using deterministic maze bootstrap, solo/host/client session modes, PeerJS and BroadcastChannel transport, host-authoritative snapshots, local movement prediction, cube/anomaly interaction, ooze trails, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates ooze randomness. The run snapshot carries a maze seed, but the active host calls `advanceOozeTrail()` without an RNG provider. `oozeRules.ts` therefore falls back to ambient `Math.random()` for decay survival, decal height and decal rotation. Snapshots replicate the resulting trail but omit RNG algorithm, stream identity, cursor, draw count and canonical replay evidence.

This does not prove a live multiplayer desynchronization because clients consume host snapshots. It proves that the same seed and command history cannot be shown from source to regenerate the same ooze evolution.

## Plan ledger

**Goal:** give host-authoritative ooze simulation one versioned random stream that can be saved, restored, replayed and bound to the first matching visible frame.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledger entries and root `.agent` states.
- [x] Compare every eligible current head with its documented repo-local head.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository.
- [x] Select only HorrorCorridor by the oldest synchronized central timestamp.
- [x] Inspect ooze update admission, RNG fallback, host cadence, snapshot schema, rendering and proof surfaces.
- [x] Preserve all 29 implemented kits and two browser-proof adapters.
- [x] Identify the complete interaction loop, domains, kits and offered services.
- [x] Define one parent ooze RNG/replay authority and 20 coordinating surfaces.
- [x] Add the timestamped audit family and refresh root `.agent` state.
- [x] Reconcile the central ledger and internal change log on `main`.
- [x] Create no branch or pull request.
- [ ] Implement and execute deterministic ooze source, build and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/HorrorCorridor
prior timestamp: 2026-07-15T21-39-15-04-00
next oldest: LuminaryLabs-Publish/TheOpenAbove
next timestamp: 2026-07-15T22-00-36-04-00
```

## Complete interaction loop

```txt
solo host or client route
  -> deterministic maze and session snapshot admission
  -> GameCanvas creates transport input world renderer minimap and RAF
  -> local movement and interaction advance

host or solo network cadence
  -> compare Date.now with last network publication
  -> call advanceOozeTrail with wall time and player positions
  -> pass no RNG provider
  -> resolveRng falls back to Math.random
  -> randomly retain or decay existing trail items
  -> randomly choose new trail-item height and rotation
  -> publish the concrete resulting trail in the authoritative snapshot

client and render path
  -> clients consume host trail values
  -> Three.js and minimap render accepted snapshot data
  -> no RNG algorithm stream cursor or draw revision is acknowledged

retry restore or replay
  -> snapshot contains maze seed and concrete ooze trail
  -> snapshot contains no ooze random-stream state
  -> same seed and accepted commands cannot prove exact ooze regeneration
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
cube carry anomaly sequencing ooze and victory
host simulation cadence wall time and snapshot publication
ooze RNG algorithm stream cursor replay and retirement
pause settings completion and route projection
Three.js world post-processing RAF and viewport
Canvas2D minimap and HUD projection
debug proof validation build deployment and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `corridor-application-shell-kit` | routing, solo/host/client entry, loading, pause, completion, exit |
| `corridor-session-domain-kit` | identity, room, roster, connection, readiness, reset |
| `runtime-store-snapshot-kit` | snapshot, pose, view, input flags, readiness |
| `ui-pause-projection-kit` | pause state, reason, overlay |
| `ui-completion-projection-kit` | terminal state, message, timestamp, routing |
| `complete-screen-presentation-kit` | outcome presentation, restart, title exit |
| `lobby-screen-presentation-kit` | room, roster, ready state, controls |
| `peer-host-transport-kit` | PeerJS host, BroadcastChannel bridge, connections, broadcast, targeted send, disconnect, destroy |
| `peer-client-transport-kit` | PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy |
| `peer-event-bus-kit` | typed transport events, subscription, cleanup |
| `protocol-message-construction-kit` | START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT |
| `protocol-serialization-kit` | encode, decode, protocol version, structural validation |
| `maze-snapshot-bootstrap-kit` | seed, maze, players, cubes, anomaly, initial snapshot |
| `seeded-maze-rng-kit` | topology, placement, target sequence |
| `first-person-input-kit` | keyboard, pointer lock, look, snapshots |
| `movement-collision-camera-kit` | movement, collision, eye pose, shake, camera |
| `network-player-update-kit` | sequence, cadence, pose envelope, host consume |
| `corridor-interaction-domain-kit` | pickup, drop, place, remove, held-cube synchronization |
| `ordered-anomaly-sequence-kit` | ordered slots, validation, victory |
| `ooze-trail-domain-kit` | spawn, decay, variation, spacing, capacity, pressure |
| `snapshot-outcome-routing-kit` | snapshot state to UI outcome |
| `corridor-authoritative-publication-kit` | tick, clone, SYNC, broadcast |
| `corridor-animation-loop-kit` | RAF start, RAF stop, delta, elapsed, successor scheduling |
| `corridor-render-world-kit` | terrain, maze, objects, actors, lights, update, dispose |
| `corridor-post-processing-kit` | composer, bloom, resize, render, dispose |
| `corridor-minimap-kit` | canvas acquisition, DPR sizing, transform, maze, ooze, cubes, players, heading |
| `runtime-debug-frame-kit` | activation, bounded capture, overlay, export |
| `runtime-resource-cleanup-kit` | loop, subscriptions, listeners, observers, GPU cleanup |
| `package-validation-kit` | build, lint, harness, visual and live-player checks |

## Browser-proof adapters

| Adapter | Offered services |
|---|---|
| `live-agent-runner-adapter` | episode scheduling, adaptive actions, child execution, JSONL history, latest summary |
| `live-player-browser-proof-adapter` | server/browser admission, route control, debug readback, screenshots, image probes, proof gates |

```txt
implemented kits: 29
browser-proof adapters: 2
total implemented surfaces: 31
planned ooze RNG/replay surfaces: 20
```

## Source-backed finding

```txt
run seed in replicated snapshot: present
optional RNG parameter on ooze update input: present
host supplies RNG to advanceOozeTrail: no
fallback to Math.random: yes
random decay survival: yes
random trail-item height: yes
random trail-item rotation: yes
ooze trail replicated as concrete values: yes
RNG algorithm version in state/snapshot: no
RNG stream identity in state/snapshot: no
RNG cursor or draw count in state/snapshot: no
canonical ooze replay hash: no
FirstSeedBoundOozeFrameAck: no
same-seed ooze fixture: no
```

## Required authority

```txt
corridor-ooze-rng-stream-replay-authority-domain
```

```txt
OozeSimulationStepCommand
  -> bind RunGeneration seed algorithm stream and expected RNG revisions
  -> bind host tick wall-time policy player-position and trail revisions
  -> consume only the named ooze stream
  -> publish every random draw or deterministic derived result
  -> settle decay spawn and visual parameters atomically
  -> publish OozeSimulationStepResult
  -> persist next stream cursor with the authoritative snapshot
  -> render one matching world and minimap frame
  -> publish FirstSeedBoundOozeFrameAck

OozeReplayCommand
  -> restore seed algorithm stream cursor trail and accepted command history
  -> reject stale or mismatched generations
  -> compare canonical ooze hashes at declared checkpoints
  -> publish OozeReplayResult
```

## Repo-local output

Added:

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

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

Documentation only. Runtime TypeScript, networking, input, gameplay, Three.js, Canvas2D, scripts, dependencies, tests, workflows and deployment are unchanged. No deterministic ooze generation, same-seed equivalence, replay correctness, snapshot restoration, artifact parity, Pages parity or production readiness is claimed.
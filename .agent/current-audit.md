# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-11T19-38-14-04-00`

## Status

```txt
status: authoritative-randomness-replay-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until central commit
```

## Summary

Maze generation already uses a deterministic linear-congruential stream derived from the authored run seed. Authoritative ooze behavior does not use that stream. `oozeRules.ts` resolves an omitted RNG to `Math.random()`, and `GameCanvas.tsx` calls `advanceOozeTrail()` without an RNG.

The resulting ooze trail is replicated, so connected clients can observe the host's current result. However, the random draw sequence is not represented in `GameState`, `ReplicatedGameSnapshot`, protocol messages, debug frames or any replay/checkpoint surface. Re-running the same seed and inputs, restoring a snapshot, migrating host authority or resuming after a crash cannot reproduce the same next ooze state.

## Plan ledger

**Goal:** define one deterministic random authority from run seed through named stream draws, simulation commit, snapshot checkpoint, replay/restore and first visible frame.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read `generateMaze.ts`, `createInitialGameState.ts`, `oozeRules.ts`, `GameCanvas.tsx`, `syncSnapshot.ts` and `shared.ts`.
- [x] Confirm maze topology, cube placement and target sequence consume a seeded RNG.
- [x] Confirm ooze decay, height and rotation consume an optional RNG that defaults to `Math.random()`.
- [x] Confirm the authoritative host does not inject a deterministic RNG.
- [x] Confirm snapshots carry final ooze values but no RNG stream ID, algorithm, state, draw index or checkpoint.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Define deterministic randomness, checkpoint, replay and fixture kits.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and synchronize central tracking.
- [ ] Runtime implementation and executable fixtures remain future work.

## Product interaction loop

```txt
lobby and run bootstrap
  -> hash seedSource into game seed
  -> generate deterministic maze, cubes and target sequence
  -> start local or host simulation
  -> accept movement and interaction commands
  -> advance ooze using wall-clock gate and ambient random draws
  -> commit snapshot tick and timestamp
  -> publish complete snapshot
  -> client replay and visible frame
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding readiness start and bootstrap
run session epoch exit runtime readiness disconnect and reconnect
PeerJS host and client transport
BroadcastChannel local transport bridge
peer event bus connection registry delivery and actor binding
versioned protocol envelopes serialization request and sequence admission
seed derivation seeded maze topology cube placement and target sequence
authoritative randomness streams random draws checkpoints and replay
replicated snapshot construction publication acceptance and delivery
snapshot payload identity size budgeting delta/full policy and backpressure
pointer lock keyboard mouse blur and input lifecycle
client prediction movement collision camera and host admission
fixed simulation cadence and authoritative systems
interaction target observation cube/slot claims and results
cube ownership ordered anomaly terminal outcome and ooze pressure
Three.js world post-processing minimap HUD debug and frame correlation
RAF resize resources cleanup validation build and deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** route and screen lifecycle, solo/host/client entry, loading, pause, completion and exits.
- **corridor-session-domain-kit:** session mode, peer identity, room, roster, readiness and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, view angles, inputs and readiness.
- **ui-pause-projection-kit:** pause state, reason and overlay projection.
- **ui-completion-projection-kit:** terminal state, message, timestamp, acknowledgement and routing.
- **complete-screen-presentation-kit:** victory/failure copy, restart and title exit.
- **lobby-screen-presentation-kit:** room metadata, roster, readiness, controls and connection state.
- **peer-host-transport-kit:** host peer, connection registry, broadcast, targeted send, aggregate sent count, disconnect and destroy.
- **peer-client-transport-kit:** host connection, send, local bridge, status, disconnect and destroy.
- **peer-event-bus-kit:** typed transport events, subscription and cleanup.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encode/decode, protocol version and structural admission.
- **maze-snapshot-bootstrap-kit:** seed hashing, deterministic maze, players, cubes, anomaly, room and initial snapshot.
- **seeded-maze-rng-kit:** deterministic LCG stream for maze topology, cube placement and target sequence.
- **first-person-input-kit:** keyboard, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit:** movement, maze collision, eye pose, shake and camera.
- **network-player-update-kit:** client sequence/send cadence, pose envelope, host consume and projection.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered slot validation and victory evaluation.
- **ooze-trail-domain-kit:** spawn, decay, spacing, capacity and ooze level.
- **snapshot-outcome-routing-kit:** inbound snapshot to UI outcome projection.
- **corridor-authoritative-publication-kit:** tick increment, snapshot clone, SYNC construction and broadcast.
- **corridor-animation-loop-kit:** RAF lifecycle and delta.
- **corridor-render-world-kit:** terrain, maze, players, cubes, anomaly, ooze, props, lights and disposal.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and disposal.
- **corridor-minimap-kit:** maze, players, cubes and anomaly projection.
- **runtime-debug-frame-kit:** bounded frame/event records, aggregate cadence and JSON export.
- **runtime-resource-cleanup-kit:** RAF, subscriptions, observers, listeners, world, post-processing, renderer and canvas cleanup.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object review and live-player validation.

## Source findings

```txt
maze seed source: room/run-derived string
maze seed hash: FNV-like 32-bit hash
maze RNG: deterministic LCG
maze RNG state exposed/checkpointed: no
maze output replicated: yes

ooze RNG input: optional
ooze RNG fallback: Math.random
authoritative host injects RNG: no
decay survivor draw: ambient random
ooze height draw: ambient random
ooze rotation draw: ambient random
random stream ID: absent
random algorithm/version in state: absent
random draw index: absent
random draw journal: absent
random checkpoint in GameState: absent
random checkpoint in snapshot/protocol: absent
replay/restore continuation proof: absent
host migration continuation proof: absent
```

## Main finding

The repository has deterministic world generation but nondeterministic ongoing authoritative simulation.

```txt
same seed + same accepted inputs + same simulation steps
  -> same maze
  -> potentially different ooze survival, height and rotation
```

The divergence is externally masked by full-state replication but remains material for replay, save/restore, reconnect recovery, host migration, debugging and fixture reproducibility.

The ambient stream also couples results to call count. Because current cadence can change when ooze advancement occurs, frame/network timing can change how many random draws are consumed before a checkpoint.

## Required parent domain

```txt
corridor-authoritative-randomness-replay-authority-domain
```

## Candidate kits

```txt
run-random-seed-kit
random-algorithm-version-kit
named-random-stream-kit
random-stream-state-kit
random-draw-index-kit
simulation-random-budget-kit
random-draw-command-kit
random-draw-result-kit
ooze-random-stream-kit
random-checkpoint-kit
snapshot-random-checkpoint-projection-kit
random-restore-admission-kit
host-migration-random-transfer-kit
random-draw-journal-kit
random-observation-kit
deterministic-ooze-replay-fixture-kit
random-checkpoint-roundtrip-fixture-kit
host-migration-random-continuation-fixture-kit
random-frame-parity-fixture-kit
```

## Required authority flow

```txt
run seed + session epoch
  -> derive named stream seed for authoritative ooze
  -> select versioned deterministic algorithm
  -> admit simulation step and expected draw index
  -> draw through one stream owner
  -> return typed draw receipts
  -> apply decay/spawn mutation
  -> atomically commit gameplay state and next RNG checkpoint
  -> project checkpoint into snapshot/save/replay state
  -> restore or transfer only with matching algorithm and stream identity
  -> render frame citing simulation revision and RNG checkpoint
```

## Required guarantees

```txt
gameplay-affecting code never falls back to ambient Math.random
same seed, accepted commands and simulation steps produce the same ooze state
stream identity and algorithm version survive snapshot/save/replay
draw counts and checkpoints advance monotonically
duplicate or stale steps cannot consume additional draws
failed transactions do not advance the committed stream
host migration resumes from the exact committed checkpoint
debug and frame records cite the checkpoint that produced visible ooze
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Exit Commit and Session Epoch
4a. Runtime Readiness Lease and Generation Fencing
5. Snapshot Acceptance Authority
5a. Interaction Target Intent and Cube/Slot Claim Authority
5b. Active-Run Disconnect and Reconnect Authority
5c. Terminal Outcome Authority
6. Host Network Cadence and Fixed Simulation Authority
6a. Host Movement Admission and Client Reconciliation
6b. Snapshot Delivery and Backpressure Authority
6c. Authoritative Randomness and Replay Authority
7. Pause/Resume Authority
```

Documentation only. No runtime behavior changed.

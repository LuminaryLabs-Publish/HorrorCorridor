# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T16-38-10-04-00`

## Status

```txt
status: host-network-cadence-input-simulation-publication-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending current-run synchronization
central change log: pending current-run synchronization
```

## Summary

The client generates a monotonic `networkUpdateSequence` and includes it in `PLAYER_UPDATE.payload.input.sequence`. The host callback does not admit or compare that sequence. It applies the client-supplied absolute pose immediately, synchronizes held cubes and publishes a full authoritative snapshot for every received update.

`publishAuthoritativeState()` increments the snapshot tick and writes `frameCadence.lastNetworkTickAtMs`. The host RAF uses the same timestamp to decide whether to call `advanceOozeTrail()`. Sustained remote movement traffic can therefore repeatedly reset the threshold and starve ooze while snapshots continue to publish and ticks continue to advance.

The retained active-run disconnect finding remains unresolved: connection-close updates session/lobby state but not the live `GameCanvas` state. Cadence authority must consume canonical actor and membership identity from that future transaction.

## Plan ledger

**Goal:** define one bounded and observable path from admitted per-player input through a fixed host simulation step, committed state revision, snapshot publication and rendered-frame acknowledgement.

- [x] Complete Publish inventory and central comparison.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select one stable repository after detecting newer repo-local work in nominal-oldest `TheOpenAbove`.
- [x] Read current root guidance and retained disconnect, movement, snapshot, interaction and render audits.
- [x] Read `GameCanvas.tsx`, `networkRules.ts`, `syncSnapshot.ts`, `createHost.ts` and package commands.
- [x] Trace client sequence generation and outbound cadence.
- [x] Trace host input application and immediate full-snapshot publication.
- [x] Trace the shared timestamp into ooze advancement.
- [x] Trace broadcast return values and aggregate diagnostics.
- [x] Identify the interaction loop, all domains, implemented kits and services.
- [x] Define network cadence, fixed-step, publication, delivery and fixture kits.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state.
- [x] Push only to `main` with no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Product interaction loop

```txt
title and mode selection
  -> lobby identity, readiness and start
  -> deterministic maze/run bootstrap
  -> local pointer-lock input and prediction
  -> client emits PLAYER_UPDATE with local sequence and absolute pose
  -> host immediately applies remote pose
  -> host immediately builds and broadcasts a full snapshot
  -> clients accept/replay snapshots
  -> world, minimap, HUD and debug project the latest state
  -> cube interaction, anomaly completion and ooze pressure continue
```

## Current cadence loop

```txt
client RAF
  if now - lastNetworkTickAtMs >= NETWORK_TICK_RATE
    -> networkUpdateSequence += 1
    -> send PLAYER_UPDATE
    -> lastNetworkTickAtMs = now

host peer/message callback
  for every PLAYER_UPDATE
    -> input.sequence is not admitted or compared
    -> applyNetworkPlayerUpdate absolute pose
    -> syncHeldCubesToPlayers
    -> publishAuthoritativeState
         tick += 1
         build full snapshot
         broadcast to all peers
         lastNetworkTickAtMs = now

host RAF
  if now - lastNetworkTickAtMs >= NETWORK_TICK_RATE
    -> advanceOozeTrail
    -> publishAuthoritativeState
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding readiness start and bootstrap
run session epoch exit runtime readiness disconnect and reconnect
PeerJS host/client transport and BroadcastChannel bridge
peer event bus connection registry delivery and actor binding
versioned protocol envelopes serialization request and sequence admission
seeded maze room player cube anomaly and ooze bootstrap
replicated snapshot construction publication acceptance and replay
pointer lock keyboard mouse blur and input lifecycle
client prediction movement collision camera and host movement admission
per-peer input sequence queue coalescing and cadence policy
fixed simulation clock and authoritative system advancement
interaction target observation cube/slot claims and results
cube pickup drop place remove held ownership and synchronization
active membership retirement owned-state recovery and reconnect claims
ordered anomaly victory failure and terminal projection
ooze spawn decay spacing capacity pressure and fixed-step input
snapshot publication cadence transport backpressure and delivery results
Three.js world post-processing minimap HUD debug and frame correlation
RAF resize resources cleanup validation build and deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** routing, solo/host/client entry, loading, pause, completion, lobby return and title exit.
- **corridor-session-domain-kit:** session mode, peer identity, room, lobby roster, connection state and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, view angles, input, readiness and reset.
- **ui-pause-projection-kit:** local pause state and overlay projection.
- **ui-completion-projection-kit:** victory/failure state, message, acknowledgement and completed routing.
- **complete-screen-presentation-kit:** terminal copy, restart and title exit.
- **lobby-screen-presentation-kit:** room metadata, roster, readiness, controls and connection status.
- **peer-host-transport-kit:** PeerJS/BroadcastChannel host, connection registry, broadcast, targeted send, sent-recipient count and destroy.
- **peer-client-transport-kit:** host connection, send, local bridge, status, disconnect and destroy.
- **peer-event-bus-kit:** typed event subscription and cleanup.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encode/decode, protocol version and structural admission.
- **maze-snapshot-bootstrap-kit:** deterministic maze, players, cubes, anomaly, room and initial snapshot.
- **first-person-input-kit:** keyboard, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit:** movement, maze collision, eye pose, shake and camera.
- **network-player-update-kit:** client sequence/send cadence, pose envelope, host consume and projection.
- **corridor-interaction-domain-kit:** pickup/drop/place/remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered slot validation and victory evaluation.
- **ooze-trail-domain-kit:** spawn, decay, spacing, capacity and ooze level.
- **snapshot-outcome-routing-kit:** inbound snapshot to UI outcome projection.
- **corridor-authoritative-publication-kit:** tick increment, snapshot clone, SYNC construction and broadcast.
- **corridor-animation-loop-kit:** RAF lifecycle and delta.
- **corridor-render-world-kit:** terrain, maze, players, cubes, anomaly, ooze, props, lights and disposal.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and disposal.
- **corridor-minimap-kit:** maze, players, cubes and anomaly projection.
- **runtime-debug-frame-kit:** bounded frame/event records, aggregate cadence counters and JSON export.
- **runtime-resource-cleanup-kit:** RAF, subscriptions, observer, listeners, world, post-processing, renderer and canvas cleanup.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object review and live-player validation.

## Source findings

```txt
client input sequence exists: yes
host consumes input sequence: no
host per-player last-accepted sequence: absent
bounded per-player input queue: absent
input coalescing policy: absent
fixed authoritative simulation-step identity: absent

remote PLAYER_UPDATE direct state mutation: yes
remote PLAYER_UPDATE immediate full snapshot: yes
publication increments snapshot tick: yes
publication resets shared lastNetworkTickAtMs: yes
host ooze step gated by same timestamp: yes

broadcast sent count returned: yes
broadcast result consumed by publisher: no
per-peer delivery rows: absent
backpressure and slow-peer policy: absent
```

## Main finding

The implementation aliases input arrival, host system timing and snapshot publication through one timestamp. A remote update is treated as both a movement command and a publication trigger. The resulting publication resets the clock used by the host to admit periodic ooze advancement.

```txt
remote traffic
  -> direct player mutation
  -> immediate publication
  -> shared clock reset
  -> ooze/system branch postponed
```

Snapshot `tick` therefore represents publication count rather than a stable simulation-step identity. More connected clients can increase tick and fanout rates while reducing the chance that a quiet interval admits the ooze branch.

## Amplification estimate

For `P` clients sending `U` updates per second:

```txt
inbound updates: P * U
full snapshot publications: approximately P * U
outbound peer sends: approximately P * P * U
```

No payload-size, queue-depth, buffered-amount or slow-peer result is recorded.

## Required parent domain

```txt
corridor-host-network-cadence-authority-domain
```

## Candidate kits

```txt
inbound-player-update-envelope-kit
per-peer-input-sequence-kit
player-update-admission-kit
movement-input-queue-kit
latest-input-coalescing-kit
fixed-simulation-clock-kit
simulation-step-sequence-kit
authoritative-system-tick-kit
snapshot-publication-cadence-kit
snapshot-publication-plan-kit
per-peer-delivery-result-kit
transport-backpressure-policy-kit
network-cadence-journal-kit
network-cadence-observation-kit
host-network-cadence-fixture-kit
multi-peer-flood-smoke-kit
```

## Required authority flow

```txt
inbound PLAYER_UPDATE
  -> bind connection, actor, room, run and epoch
  -> admit monotonic per-player sequence and timestamp window
  -> enqueue or coalesce under bounded policy
  -> select one admitted input per player at a fixed simulation step
  -> validate and apply movement/collision
  -> advance held cubes, ooze and scheduled systems once
  -> commit simulation-step sequence and state revision
  -> schedule bounded snapshot publication
  -> produce per-peer delivery rows
  -> correlate accepted snapshot with world/minimap/HUD/debug frame
```

## Required guarantees

```txt
packet frequency cannot change simulation-step frequency
packet frequency cannot suppress ooze or future periodic systems
snapshot tick and simulation-step sequence have explicit meanings
stale, duplicate and future-skewed updates reject before mutation
one client cannot force unlimited full-snapshot broadcasts
publication is coalesced and bounded independently of arrivals
partial and backpressured delivery is observable
all projections cite one committed state and snapshot revision
```

## Retained active-run disconnect boundary

The `2026-07-11T16-21-09-04-00` audit remains a prerequisite. A player retired from the future membership transaction must also have its input queue retired, be excluded from fixed-step selection, stop contributing to ooze and receive no further snapshot delivery rows unless suspended under an explicit reconnect policy.

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
7. Pause/Resume Authority
```

Documentation only. No runtime behavior changed.

# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T18-11-21-04-00`

## Status

```txt
status: snapshot-delivery-payload-budget-backpressure-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-11T18-11-21-04-00-horror-corridor-snapshot-delivery-backpressure-authority.md
```

## Summary

The host publication path creates a complete replicated snapshot for local runtime state, then `createFullSyncMessage()` creates another complete replicated snapshot from the same mutable `GameState`. The message is serialized with `JSON.stringify()` and sent to every open host connection.

`HostTransportAdapter.broadcast()` returns only a number. The transport does not expose payload byte size, payload fingerprint, pending buffered bytes, queue depth, send duration, exception classification, intended peer set, per-peer result, retries or slow-peer isolation. `GameCanvas` discards the aggregate number returned by `broadcast()`.

The preceding host cadence finding remains active: remote movement packets can force this full-state publication path for every update. The resulting cost can scale with both input rate and peer count while no transport pressure is measured.

## Plan ledger

**Goal:** define one bounded and observable transaction from committed snapshot revision through canonical payload construction, per-peer send admission, delivery results and first visible frame.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Detect the active newer `TheOpenAbove` grass-culling audit and avoid overlapping it.
- [x] Select only the next stable oldest repository, `HorrorCorridor`.
- [x] Read `GameCanvas.tsx`, `syncSnapshot.ts`, `serializers.ts`, `createHost.ts` and `peerTypes.ts`.
- [x] Trace local snapshot construction and outbound SYNC construction.
- [x] Confirm complete maze, room, player, cube, anomaly and ooze data is replicated.
- [x] Confirm JSON serialization has no payload budget or fingerprint result.
- [x] Confirm host send checks only `connection.open` before `connection.send()`.
- [x] Confirm broadcast returns an aggregate sent count only.
- [x] Confirm the publication caller discards that count.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Define payload, delivery, backpressure, isolation and fixture kits.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and synchronize central tracking.
- [ ] Runtime implementation and executable fixtures remain future work.

## Product interaction loop

```txt
title and session admission
  -> lobby readiness and deterministic bootstrap
  -> pointer-lock input and local prediction
  -> client PLAYER_UPDATE
  -> host state mutation
  -> complete replicated snapshot construction
  -> complete SYNC envelope construction
  -> JSON serialization and all-peer fanout
  -> client snapshot acceptance and replay
  -> world, minimap, HUD and debug projection
  -> cube objective and ooze pressure continue
```

## Current publication path

```txt
GameCanvas.publishAuthoritativeState
  -> currentGameState.tick += 1
  -> buildReplicatedSnapshot(currentGameState)
       room
       maze
       players
       cubes
       anomaly
       oozeTrail
       oozeLevel
  -> set local authoritative snapshot
  -> createFullSyncMessage({ state: currentGameState })
       -> buildReplicatedSnapshot(currentGameState) again
       -> clone room again
  -> serializeProtocolMessage
       -> JSON.stringify(message)
  -> host.broadcast
       -> iterate every connection
       -> if connection.open, connection.send(serialized)
       -> return aggregate sent count
  -> aggregate sent count not retained
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
seeded maze room player cube anomaly and ooze bootstrap
replicated snapshot construction publication acceptance and replay
snapshot payload identity size budgeting and delta/full policy
per-peer send admission delivery results retry and backpressure
slow-peer isolation and disconnect policy
pointer lock keyboard mouse blur and input lifecycle
client prediction movement collision camera and host admission
per-peer input sequence queue coalescing and fixed simulation cadence
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
- **maze-snapshot-bootstrap-kit:** deterministic maze, players, cubes, anomaly, room and initial snapshot.
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
local snapshot built before publication: yes
SYNC message rebuilds full snapshot: yes
room cloned again in SYNC payload: yes
serialization: JSON.stringify complete envelope
payload byte measurement: absent
payload fingerprint: absent
payload size limit: absent
full-versus-delta policy: absent

send admission checks connection.open only: yes
connection.send exception classification: absent
pending buffered bytes observation: absent
queue depth observation: absent
send duration observation: absent
per-peer result: absent
retry/coalesce/drop policy: absent
slow-peer isolation policy: absent

broadcast result: aggregate sent count
publication caller consumes result: no
intended peer set recorded: no
first-delivery/first-frame correlation: absent
```

## Main finding

The publication path duplicates full snapshot construction before serialization and then reduces the entire fanout transaction to an unconsumed integer.

```txt
remote update
  -> complete local snapshot clone
  -> complete outbound snapshot clone
  -> JSON serialization
  -> N connection.send calls
  -> aggregate count discarded
```

For `P` clients each producing `U` update-triggered publications per second, the current cadence audit estimated approximately `P * P * U` peer sends per second. This audit adds that each publication rebuilds and serializes the complete maze/player/cube/anomaly/ooze state without a byte budget or slow-peer result.

## Required parent domain

```txt
corridor-snapshot-delivery-backpressure-authority-domain
```

## Candidate kits

```txt
snapshot-publication-intent-kit
canonical-snapshot-payload-kit
snapshot-payload-byte-budget-kit
snapshot-payload-fingerprint-kit
snapshot-full-delta-policy-kit
snapshot-delivery-plan-kit
peer-send-capability-kit
peer-send-admission-kit
per-peer-backpressure-state-kit
per-peer-delivery-result-kit
snapshot-delivery-commit-kit
snapshot-delivery-retry-kit
slow-peer-isolation-kit
snapshot-delivery-journal-kit
snapshot-delivery-observation-kit
snapshot-delivery-fixture-kit
browser-slow-peer-smoke-kit
```

## Required authority flow

```txt
committed simulation revision
  -> publication intent and reason
  -> build one canonical snapshot payload
  -> measure bytes and compute fingerprint
  -> select full or delta policy
  -> capture intended peer set
  -> admit each peer against connection and backpressure state
  -> attempt bounded sends
  -> classify sent, skipped, closed, failed, timed-out and backpressured rows
  -> commit publication and delivery result
  -> retry, coalesce, isolate or disconnect under explicit policy
  -> correlate accepted client snapshot and first visible frame
```

## Required guarantees

```txt
one publication builds one canonical payload
payload bytes and fingerprint are known before fanout
publication work has explicit byte, peer and time budgets
one slow or failed peer cannot block or invalidate healthy peers
all intended peers produce a typed delivery row
exceptions are classified instead of escaping silently
retry and coalescing remain bounded
full snapshots and deltas cite one committed state revision
client acceptance and visible frame cite the same publication identity
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
7. Pause/Resume Authority
```

Documentation only. No runtime behavior changed.

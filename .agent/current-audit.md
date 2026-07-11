# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T15-01-33-04-00`

## Status

```txt
status: interaction-target-intent-cube-slot-claim-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending current-run synchronization
central change log: pending current-run synchronization
```

## Product interaction loop

```txt
title
  -> solo, host or client admission
  -> lobby start and deterministic bootstrap
  -> first-person movement and local interaction input
  -> action inferred from local pose and snapshot
  -> TRY_INTERACT request to host or local authoritative apply
  -> cube or anomaly-slot mutation
  -> held-cube synchronization
  -> ordered sequence and terminal evaluation
  -> authoritative snapshot publication
  -> world, minimap, HUD and completion projection
```

## Interaction target loop

```txt
client presses interact
  -> local code decides pickup, drop, place or remove
  -> protocol builder supports cubeId, slotId and targetCellId
  -> caller supplies none of those target identities
  -> host receives action and payload playerId
  -> pickup selects nearest eligible cube
  -> place selects first empty anomaly slot
  -> remove selects last occupied anomaly slot
  -> host mutates or silently returns unchanged state
  -> host publishes a full snapshot without a typed interaction result
  -> client infers what happened from later state
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding start admission and bootstrap
run session epoch exit and runtime readiness
PeerJS host/client transport and BroadcastChannel bridge
protocol construction serialization request correlation and admission
seeded maze player cube anomaly and ooze bootstrap
replicated snapshot publication acceptance and replay
pointer lock keyboard mouse and input lifecycle
movement collision camera prediction and host admission
interaction action inference target observation cube claims and slot claims
cube pickup drop place remove held ownership and position synchronization
ordered anomaly validation victory and terminal outcome handling
ooze spawn decay spacing capacity and pressure
Three.js world post-processing minimap HUD and interaction-frame projection
RAF resize resources debug cleanup validation and deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** routing, solo/host/client entry, loading, pause, completion, lobby return and title exit.
- **corridor-session-domain-kit:** session mode, peer identity, room, roster, connection status and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, view angles, input, readiness and reset.
- **ui-pause-projection-kit:** pause state, pause reason and overlay projection.
- **ui-completion-projection-kit:** victory/failure completion state, message, timestamp, acknowledgement and completed-screen routing.
- **complete-screen-presentation-kit:** victory/failure copy, restart callback and title-exit callback.
- **lobby-screen-presentation-kit:** room metadata, phase, roster, readiness badges, controls and connection status.
- **peer-host-transport-kit:** host peer, connection registry, broadcast, targeted send, local bridge and destroy.
- **peer-client-transport-kit:** host connection, send, local bridge, status, disconnect and destroy.
- **peer-event-bus-kit:** typed events, subscribe, unsubscribe and clear.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes, including optional interaction target fields.
- **protocol-serialization-kit:** JSON encode/decode, version checks and structural shape admission.
- **maze-snapshot-bootstrap-kit:** deterministic seed, maze, players, cubes, anomaly, room and initial snapshot.
- **first-person-input-kit:** keyboard state, pointer lock, look accumulation and input snapshot.
- **movement-collision-camera-kit:** movement, maze collision, eye position, walk shake and camera.
- **network-player-update-kit:** client send, host consume, pose projection and cadence.
- **corridor-interaction-domain-kit:** action inference, pickup, drop, place, remove, implicit target resolution and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** exact-order evaluation, slot state, victory and current reversible fallback.
- **ooze-trail-domain-kit:** spawn, decay, random variation, spacing, capacity and ooze-level projection.
- **snapshot-outcome-routing-kit:** inbound snapshot to victory, paused or generic playing UI projection.
- **corridor-authoritative-publication-kit:** snapshot tick, clone, SYNC, broadcast and publication reason.
- **corridor-animation-loop-kit:** RAF start, stop, delta and running guard.
- **corridor-render-world-kit:** terrain, maze, cubes, players, anomaly, ooze, props, lights, update and dispose.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and dispose.
- **corridor-minimap-kit:** maze, players, cubes and anomaly markers.
- **runtime-debug-frame-kit:** bounded frames/events, overlay preferences and JSON-safe export.
- **runtime-resource-cleanup-kit:** RAF, subscriptions, observer, listeners, world, composer, renderer and canvas cleanup.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object review and live-player validation.

## Source findings

```txt
createInteractionRequestMessage supports cubeId, slotId and targetCellId
sendInteractionRequest supplies only senderId, roomId, playerId and action
local applyInteraction also omits explicit cubeId and slotId
pickup without cubeId selects the nearest currently eligible cube
place without slotId selects the first currently empty slot
remove without slotId selects the currently last occupied slot
remote host path publishes after every request, including unchanged state
local host path returns immediately when state is unchanged
interaction mutations return only GameState identity, not a typed result
requestId is optional and no interaction request ID is generated here
no observed snapshot tick, cube revision, slot revision or ownership revision is admitted
```

## Main finding

The protocol can carry explicit target identities, but the active caller does not use them. The host therefore resolves a fresh target when the request arrives instead of validating the target the player actually observed. Under contention, delay, duplicate delivery or reorder, an interaction can affect a different cube or slot rather than reject stale intent.

## Target-substitution cases

```txt
pickup contention
  two clients observe cube A as nearest
  request A claims cube A
  request B arrives without cubeId
  host may claim cube B for client B

place contention
  two clients observe slot 0 as first empty
  request A fills slot 0
  request B arrives without slotId
  host may fill slot 1

remove contention
  two clients observe slot 2 as last occupied
  request A removes slot 2
  request B arrives without slotId
  host may remove slot 1
```

## Candidate kits

```txt
interaction-command-envelope-kit
interaction-target-observation-kit
cube-target-claim-kit
anomaly-slot-claim-kit
interaction-admission-kit
interaction-preflight-kit
interaction-transaction-kit
interaction-result-kit
interaction-idempotency-kit
interaction-conflict-kit
held-cube-ownership-revision-kit
interaction-publication-kit
interaction-client-acknowledgement-kit
interaction-frame-correlation-kit
interaction-journal-kit
interaction-target-fixture-kit
```

## Required guarantees

```txt
every interaction has command, actor, run, epoch and observed snapshot identity
pickup names one cube or explicitly requests deterministic nearest-target resolution
place and remove name one anomaly slot
host validates the named target against the observed revision
stale or conflicting claims reject without substituting another target
duplicate commands return the original result without a second mutation
accepted and rejected commands return typed reasons and before/after revisions
snapshot publication correlates to the interaction result
client HUD, world and minimap acknowledge the same accepted result
held ownership has a monotonic revision and exactly one owner
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
5b. Terminal Outcome Authority and Victory/Failure Convergence
6. Host Movement Admission and Client Reconciliation
7. Pause/Resume Authority
```

Documentation only. This pass changed no runtime source, dependency, package script, network behavior, rendering or deployment configuration.

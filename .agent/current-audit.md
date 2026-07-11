# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T13-20-45-04-00`

## Status

```txt
status: terminal-outcome-victory-failure-convergence-authority-audited
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
  -> input, movement, interaction and authoritative simulation
  -> ordered anomaly or pressure evaluation
  -> terminal outcome candidate
  -> host/solo commit and snapshot publication
  -> client outcome admission
  -> completion and terminal-frame projection
  -> restart to lobby or exit to title
```

## Terminal outcome loop

```txt
correct final cube placement
  -> ordered sequence validation
  -> gameState = victory
  -> room.phase = ending
  -> authoritative SYNC publication
  -> local/client COMPLETED projection

failure-capable type or UI
  -> no gameplay defeat predicate
  -> no authoritative failure transition

incoming failure snapshot
  -> generic shell fallback
  -> PLAYING projection
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster connection readiness and reset
lobby identity actor binding start admission and bootstrap
run session epoch exit and runtime readiness
PeerJS host/client transport and BroadcastChannel bridge
protocol construction serialization correlation and admission
seeded maze player cube anomaly and ooze bootstrap
replicated snapshot publication acceptance and replay
pointer lock keyboard mouse and input lifecycle
movement collision camera prediction and host admission
cube interaction held-cube synchronization and ordered anomaly
victory and room-ending evaluation
ooze spawn decay spacing capacity and level
terminal policy evaluation admission latch result publication client convergence and acknowledgement
Three.js world post-processing minimap HUD completion and terminal-frame projection
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
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encode/decode, version checks and structural shape admission.
- **maze-snapshot-bootstrap-kit:** deterministic seed, maze, players, cubes, anomaly, room and initial snapshot.
- **first-person-input-kit:** keyboard state, pointer lock, look accumulation and input snapshot.
- **movement-collision-camera-kit:** movement, maze collision, eye position, walk shake and camera.
- **network-player-update-kit:** client send, host consume, pose projection and cadence.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
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
GameScreenState includes failure
UiCompletionState includes failure
CompleteScreen supports failure presentation
validateOrderedSequenceCompletion can produce victory
victory changes room phase to ending
victory can revert to playing if later evaluation is incomplete
ooze rules have no defeat threshold or failure transition
commitVictory has no failure counterpart
GameShell SYNC handles victory and paused explicitly
all other states, including failure, are routed to PLAYING
terminal outcome has no ID, revision, run session or epoch
terminal publication has no acknowledgement or first-frame proof
```

## Main finding

The product exposes a two-outcome contract but implements only a partial victory authority. Failure is representable and renderable but unreachable from gameplay, and replicated failure is misclassified as active play. Victory is also not terminally latched, so a later incomplete sequence evaluation can reopen the run.

## Candidate kits

```txt
terminal-outcome-policy-kit
outcome-evaluation-input-kit
victory-predicate-kit
defeat-predicate-kit
terminal-outcome-admission-kit
terminal-outcome-latch-kit
terminal-outcome-result-kit
terminal-room-phase-kit
terminal-publication-kit
terminal-client-admission-kit
terminal-ui-projection-kit
terminal-frame-correlation-kit
terminal-outcome-acknowledgement-kit
terminal-outcome-journal-kit
terminal-outcome-fixture-kit
```

## Required guarantees

```txt
one versioned policy defines victory and failure
only authoritative host or solo authority commits outcomes
one run session and epoch accepts at most one terminal result
terminal outcome is monotonic
victory and failure share one result and publication contract
client routing handles failure explicitly
late playing snapshots cannot reopen terminal state
terminal publication exposes per-peer results
clients acknowledge admitted outcome and first terminal frame
restart and title exit consume the committed terminal result
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Exit Commit and Session Epoch
4a. Runtime Readiness Lease and Generation Fencing
5. Snapshot Acceptance Authority
5a. Terminal Outcome Authority and Victory/Failure Convergence
6. Host Movement Admission and Client Reconciliation
7. Pause/Resume Authority
```

Documentation only. This pass changed no runtime source, dependency, package script, network behavior, rendering or deployment configuration.

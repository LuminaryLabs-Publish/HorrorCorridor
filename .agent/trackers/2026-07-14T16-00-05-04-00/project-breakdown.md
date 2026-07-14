# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-14T16-00-05-04-00`  
**Status:** `page-lifecycle-session-suspension-resume-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, deterministic bootstrap, PeerJS and BroadcastChannel transport, predictive movement, host snapshots, cube/anomaly gameplay, ooze trails, Three.js presentation, minimap, debug capture and browser proof tooling.

This pass isolates browser page-lifecycle ownership. The runtime installs one RAF loop, global input listeners, pointer-lock ownership, transport subscriptions, renderer resources and mutable session state, but handles only `blur`. It has no explicit `visibilitychange`, `pagehide`, `pageshow`, freeze, resume or BFCache transaction. A hidden or cached page can therefore retain held input, transport ownership and runtime generations, then resume without a correlated session result or first resumed-frame proof.

## Plan ledger

**Goal:** preserve accepted multiplayer and gameplay truth across hide, freeze, BFCache and restore while suspending local work and admitting exactly one coherent resumed runtime generation.

- [x] Compare all 11 accessible Publish repositories against the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm every eligible repository has root `.agent` state and no eligible runtime is ahead of its recorded documentation head.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` by the oldest eligible central timestamp.
- [x] Trace RAF, wall-clock cadence, input, pointer lock, transport, rendering, debug and cleanup ownership.
- [x] Preserve all 29 implemented kits, two adapters and their offered services.
- [x] Add the timestamped page-lifecycle audit family.
- [x] Change no runtime, network, gameplay, rendering, package, dependency, test, workflow or deployment source.
- [x] Create no branch or pull request.
- [ ] Implement and execute lifecycle, BFCache, stale-input, reconnect and resumed-frame fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected: HorrorCorridor
selection reason: oldest eligible central documentation timestamp
prior central timestamp: 2026-07-14T10-40-05-04-00
```

Only `LuminaryLabs-Publish/HorrorCorridor` is modified in the Publish organization.

## Complete interaction loop

```txt
start or lobby
  -> solo, host or client admission
  -> deterministic snapshot bootstrap
  -> GameCanvas creates renderer, scene, world, input, transport listener and RAF

active page
  -> keyboard and mouse mutate local input
  -> solo/host advances authoritative simulation
     or client advances prediction and sends updates
  -> transport callbacks mutate or replace snapshots
  -> world, minimap and debug project current state

page hidden, frozen or pagehide
  -> no lifecycle command is admitted
  -> no held-input retirement result exists
  -> no RAF, renderer or transport suspension lease exists
  -> no session checkpoint or page generation is published
  -> BFCache ownership is not classified

page visible, resumed or pageshow
  -> prior listeners, transport and RAF continue implicitly
  -> wall-clock cadence can immediately trigger network work
  -> held keys can remain set when keyup was missed
  -> no stale callback or duplicate-generation rejection exists
  -> no first resumed runtime frame is acknowledged
```

## Domains in use

```txt
application routing and screen lifecycle
browser visibility pagehide pageshow freeze resume and BFCache
session identity room roster connection readiness and reset
loading and deterministic maze bootstrap
PeerJS BroadcastChannel transport and protocol
runtime snapshots and authoritative publication
keyboard pointer lock focus blur and held-input state
pause settings completion and UI projection
movement collision camera and client prediction
interaction anomaly ooze and victory
Three.js world post-processing minimap and RAF
renderer transport listener and resource retirement
lifecycle checkpoint restoration and resumed-frame evidence
debug proof validation build deployment and central tracking
```

## Implemented kits and offered services

- **corridor-application-shell-kit:** route projection, solo/host/client entry, loading, pause, completion and exit.
- **corridor-session-domain-kit:** identity, room, roster, connection, readiness and reset.
- **runtime-store-snapshot-kit:** snapshot, local pose, view, input flags and readiness.
- **ui-pause-projection-kit:** pause state, reason and overlay.
- **ui-completion-projection-kit:** terminal status, message, time and routing.
- **complete-screen-presentation-kit:** outcome, restart and title exit.
- **lobby-screen-presentation-kit:** room, roster, readiness and controls.
- **peer-host-transport-kit:** PeerJS host, local bridge, connections, broadcast, targeted send and destroy.
- **peer-client-transport-kit:** PeerJS client, local bridge, connect, send, status and destroy.
- **peer-event-bus-kit:** typed transport events, subscription and cleanup.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT.
- **protocol-serialization-kit:** encode, decode, protocol version and structural validation.
- **maze-snapshot-bootstrap-kit:** seed, maze, players, cubes, anomaly and initial snapshot.
- **seeded-maze-rng-kit:** deterministic topology, placement and target sequence.
- **first-person-input-kit:** keyboard, pointer lock, look and snapshots.
- **movement-collision-camera-kit:** movement, collision, eye pose, shake and camera.
- **network-player-update-kit:** sequence, cadence, pose envelope and host consumption.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered slots, validation and victory.
- **ooze-trail-domain-kit:** spawn, decay, spacing, capacity and pressure count.
- **snapshot-outcome-routing-kit:** snapshot terminal state to UI outcome.
- **corridor-authoritative-publication-kit:** tick, clone, SYNC and broadcast.
- **corridor-animation-loop-kit:** RAF start, stop, delta, elapsed and successor scheduling.
- **corridor-render-world-kit:** terrain, maze, objects, actors, lights, update and disposal.
- **corridor-post-processing-kit:** composer, bloom, resize, render and disposal.
- **corridor-minimap-kit:** maze, players, cubes, ooze and heading.
- **runtime-debug-frame-kit:** activation, bounded frames/events, overlay and export.
- **runtime-resource-cleanup-kit:** loop, subscriptions, listeners, observers and GPU cleanup.
- **package-validation-kit:** build, lint, harness, visual and live-player checks.
- **live-agent-runner-adapter:** episode scheduling, adaptive actions, child execution and JSONL summaries.
- **live-player-browser-proof-adapter:** server/browser admission, route control, debug readback, screenshots and proof gates.

## Source-backed findings

1. `createAnimationLoop()` owns one RAF ID and resets its clock only when `stop()` is called.
2. `GameCanvas` starts the loop after installing global key, mouse, pointer-lock, blur and resize listeners.
3. The only page-adjacent lifecycle handler is `blur`, which conditionally releases pointer lock.
4. No source handler exists for `visibilitychange`, `pagehide`, `pageshow`, freeze, resume or BFCache persistence.
5. Input buttons are cleared only by matching keyup events or explicit setters; hidden-page keyup loss has no retirement transaction.
6. Client and host network cadence is based on `Date.now()`, so work can become immediately due after a hidden interval.
7. React cleanup retires loop, transport subscription, listeners, observer and GPU resources only when the component unmounts.
8. BFCache navigation may preserve the component and those participants without producing a new runtime generation.
9. Debug frames carry frame and clock values but no document, lifecycle attempt or resumed-generation identity.
10. No `PageLifecycleResult`, suspension lease, restore result or `FirstResumedRuntimeFrameAck` exists.

## Required composed authority

```txt
corridor-page-lifecycle-session-suspension-resume-authority-domain
  -> page-lifecycle-event-kit
  -> document-generation-kit
  -> lifecycle-attempt-kit
  -> runtime-suspension-lease-kit
  -> held-input-retirement-kit
  -> pointer-lock-lifecycle-kit
  -> raf-suspension-kit
  -> render-clock-checkpoint-kit
  -> transport-liveness-policy-kit
  -> host-publication-suspension-kit
  -> client-send-suspension-kit
  -> passive-snapshot-receive-kit
  -> session-checkpoint-kit
  -> bfcache-classification-kit
  -> participant-revalidation-kit
  -> stale-callback-rejection-kit
  -> resume-candidate-kit
  -> atomic-resume-adoption-kit
  -> lifecycle-result-kit
  -> first-resumed-runtime-frame-ack-kit
  -> lifecycle-observation-journal-kit
  -> lifecycle-fixture-matrix-kit
```

## Required transaction

```txt
PageLifecycleEvent
  -> bind document, session, runtime and transport generations
  -> classify hidden, pagehide, freeze, persisted pageshow and normal resume
  -> retire held input and local command admission
  -> suspend one RAF and local network-send generation
  -> checkpoint accepted snapshot, pose, clock and participant ownership
  -> preserve or explicitly close transport according to lifecycle policy
  -> reject stale callbacks and superseded restore attempts
  -> revalidate renderer, world, transport, listeners and viewport
  -> atomically adopt one resumed participant set
  -> publish PageLifecycleResult
  -> publish FirstResumedRuntimeFrameAck
```

## Validation boundary

Documentation only. No lifecycle suspension, BFCache safety, transport policy, stale-input retirement, atomic resume, first resumed-frame convergence or production-readiness claim is made.
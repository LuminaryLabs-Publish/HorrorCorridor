# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-12T07-41-06-04-00`  
**Branch:** `main`

## Summary

HorrorCorridor was selected as the oldest eligible synchronized Publish repository after the complete ten-repository organization inventory was compared with `LuminaryLabs-Dev/LuminaryLabs`. `TheCavalryOfRome` was excluded. All nine eligible repositories were already represented in the central ledger and had root `.agent` state.

This run audits time authority. The runtime advances rendering from requestAnimationFrame timestamps while gameplay cadence, authoritative snapshot timestamps, room updates, view-input timing, completion timing and ooze decay use `Date.now()`. Those clocks have different monotonicity and pause behavior, and no clock identity or discontinuity result connects them.

## Plan ledger

**Goal:** define one canonical runtime clock contract that separates monotonic simulation time from UTC observation time and carries clock identity, revision, pause/reset policy and frame correlation through simulation, networking and rendering.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare eligible repositories with the central ledger.
- [x] Confirm root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible synchronized repository.
- [x] Read current root `.agent` guidance and retained audits.
- [x] Trace `GameCanvas.tsx`, `animationLoop.ts` and `oozeRules.ts`.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all 29 implemented kits and offered services.
- [x] Identify the requestAnimationFrame and `Date.now()` clock split.
- [x] Define monotonic clock, wall-clock observation, discontinuity, pause/reset and snapshot projection responsibilities.
- [x] Add timestamped architecture, render, gameplay, interaction, clock and deployment audits.
- [x] Refresh required root `.agent` files and the machine-readable registry.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable clock-discontinuity fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-12T05-59-28-04-00 selected oldest
ZombieOrchard      2026-07-12T06-19-56-04-00
AetherVale         2026-07-12T06-41-32-04-00
TheOpenAbove       2026-07-12T07-00-48-04-00
PrehistoricRush    2026-07-12T07-09-49-04-00
PhantomCommand     2026-07-12T07-29-32-04-00
other eligible repositories retained current central coverage
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
browser event or RAF callback
  -> mutate input, pointer-lock, pause or settings state
  -> RAF supplies monotonic page-relative time and delta
  -> GameCanvas separately samples Date.now()
  -> advance local pose and view
  -> mutate authoritative or predicted state
  -> gate network publication with wall-clock age
  -> advance ooze decay with wall-clock age
  -> stamp room and snapshots with wall-clock time
  -> project runtime stores
  -> update camera/world from RAF elapsed time
  -> draw minimap and optional debug frame
  -> submit post-processing output
```

## Domains in use

```txt
application shell and route projection
session, lobby, identity, readiness and run lifecycle
runtime startup, frame lifecycle, failure containment and cleanup
input, pointer lock, focus, visibility and pause
host/client transport and protocol admission
deterministic maze and authoritative randomness
movement, collision, interaction, anomaly and ooze simulation
snapshot construction, publication, acceptance and delivery
runtime clock, cadence, timestamp and pause/reset policy gap
Three.js world, camera, post-processing and render surfaces
HUD, minimap, debug observation and export
validation, build and deployment
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit         routing, entry, pause, completion and exits
corridor-session-domain-kit            identity, room, roster, connection, readiness and reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, reason and overlay
ui-completion-projection-kit           terminal state, message, timestamp and routing
complete-screen-presentation-kit       outcome presentation, restart and title exit
lobby-screen-presentation-kit          room, roster, ready state and controls
peer-host-transport-kit                host connections, broadcast, targeted send and destroy
peer-client-transport-kit              host connection, send, status and destroy
peer-event-bus-kit                     typed events, subscription and cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT
protocol-serialization-kit             JSON encode/decode, version and shape validation
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly and initial snapshot
seeded-maze-rng-kit                    deterministic topology, placement and target sequence
first-person-input-kit                 keyboard, pointer lock, look and snapshots
movement-collision-camera-kit          movement, collision, eye pose, shake and camera
network-player-update-kit              client sequence/cadence, pose envelope and host consume
corridor-interaction-domain-kit        pickup, drop, place, remove and held-cube synchronization
ordered-anomaly-sequence-kit           ordered slots, validation and victory
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           snapshot state to UI route
corridor-authoritative-publication-kit tick, clone, SYNC construction and broadcast
corridor-animation-loop-kit            RAF start/stop, delta, elapsed and successor scheduling
corridor-render-world-kit              terrain, maze, objects, actors, lights, update and disposal
corridor-post-processing-kit           composer, bloom, sizing, render and disposal
corridor-minimap-kit                   maze, players, cubes, ooze and heading
runtime-debug-frame-kit                activation, bounded capture, overlay and export
runtime-resource-cleanup-kit           loop, subscriptions, listeners, observers and GPU cleanup
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Main finding

```txt
RAF time source: monotonic page-relative timestamp
simulation/render delta source: RAF timestamp difference
runtime cadence source: Date.now()
snapshot timestamp source: Date.now()
room updatedAt source: Date.now()
completion timestamp source: Date.now()
ooze decay interval source: Date.now() minus snapshot-carried wall timestamp
clock ID/revision: absent
clock regression/jump result: absent
pause/reset clock policy: implicit
snapshot simulation-time projection: absent
```

A backward wall-clock adjustment can keep network and UI age tests below their thresholds and postpone authoritative publication and ooze decay. A forward adjustment can force an immediate cadence rollover or decay step. RAF elapsed time continues under a separate origin, so camera/world animation can cite a different temporal history than the authoritative snapshot.

## Required parent domain

```txt
corridor-canonical-runtime-clock-authority-domain
```

## Required output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/turn-ledger/2026-07-12T07-41-06-04-00.md
.agent/architecture-audit/2026-07-12T07-41-06-04-00-canonical-runtime-clock-dsk-map.md
.agent/render-audit/2026-07-12T07-41-06-04-00-simulation-render-clock-provenance-gap.md
.agent/gameplay-audit/2026-07-12T07-41-06-04-00-wall-clock-jump-cadence-ooze-loop.md
.agent/interaction-audit/2026-07-12T07-41-06-04-00-clock-sample-step-admission-map.md
.agent/clock-audit/2026-07-12T07-41-06-04-00-monotonic-wall-clock-pause-reset-contract.md
.agent/deploy-audit/2026-07-12T07-41-06-04-00-clock-discontinuity-fixture-gate.md
```

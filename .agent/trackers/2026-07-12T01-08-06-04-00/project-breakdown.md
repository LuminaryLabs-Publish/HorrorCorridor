# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-12T01-08-06-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Change type:** documentation only

## Summary

This run selected HorrorCorridor after comparing the complete accessible `LuminaryLabs-Publish` inventory with the central `LuminaryLabs-Dev/LuminaryLabs` ledger. All eligible repositories were already tracked and had root `.agent` state, so the oldest documented-selection rule applied.

The audit focuses on runtime debug observability. The logger is bounded and functional, but full-state capture can be activated through ambient public browser actions and exported without build-channel, actor, role, session, redaction or revocation authority.

## Plan ledger

**Goal:** preserve diagnostic value while preventing public production players from activating or retaining privileged puzzle/session state outside an explicit QA or developer capability.

- [x] List all ten accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the other nine against the central ledger.
- [x] Confirm every eligible repository has a root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor`.
- [x] Read root audit state and retained dependencies.
- [x] Read runtime debug store, frame panel, HUD mount and GameCanvas capture/activation paths.
- [x] Identify the product interaction loop.
- [x] Identify all domains in use.
- [x] Inventory all 29 implemented kits and their services.
- [x] Define the missing debug-observability parent domain and coordinating kits.
- [x] Add architecture, render, gameplay, interaction, debug-observability and deploy audits.
- [x] Refresh START_HERE, current audit, next steps, known gaps, validation and registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement runtime authority and executable fixtures in a future change.

## Repository comparison

```txt
LuminaryLabs-Publish/HorrorCorridor     2026-07-11T23-18-16-04-00 selected
LuminaryLabs-Publish/PhantomCommand     2026-07-11T23-28-29-04-00
LuminaryLabs-Publish/ZombieOrchard      2026-07-11T23-48-14-04-00
LuminaryLabs-Publish/TheUnmappedHouse   2026-07-12T00-01-25-04-00
LuminaryLabs-Publish/AetherVale         2026-07-12T00-10-23-04-00
LuminaryLabs-Publish/MyCozyIsland       2026-07-12T00-20-01-04-00
LuminaryLabs-Publish/PrehistoricRush    2026-07-12T00-30-49-04-00
LuminaryLabs-Publish/TheOpenAbove       2026-07-12T00-39-05-04-00
LuminaryLabs-Publish/IntoTheMeadow      2026-07-12T00-58-12-04-00
LuminaryLabs-Publish/TheCavalryOfRome   excluded
```

## Source inspected

```txt
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/hud/FrameDebugPanel.tsx
HorrorCorridor-V1/src/components/hud/HUDOverlay.tsx
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/docs/HorrorCorridor-V1-Logging-Audit.md
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
mode selection and lobby
  -> snapshot bootstrap and runtime startup
  -> initializeRuntimeDebug reads query and localStorage
  -> attachRuntimeDebugWindowApi exposes browser methods
  -> Backquote/query/window API can enable debug
  -> enabled RAF captures a full frame record
  -> runtime/network/interaction events enter a retained buffer
  -> HUD mounts FrameDebugPanel
  -> overlay or JavaScript exports retained state
  -> enabled/overlay preferences persist into future runtimes
```

## Activation paths

```txt
query parameters:
  debug
  debugFrames
  accepted values: 1, true, frames, verbose

localStorage:
  horror-corridor:runtime-debug
  horror-corridor:runtime-debug-overlay

keyboard:
  Backquote

window API:
  window.__HORROR_CORRIDOR_DEBUG__.enable()
  window.__HORROR_CORRIDOR_DEBUG__.showOverlay()
  window.__HORROR_CORRIDOR_DEBUG__.getLatestFrame()
  window.__HORROR_CORRIDOR_DEBUG__.getFrames()
  window.__HORROR_CORRIDOR_DEBUG__.getEvents()
  window.__HORROR_CORRIDOR_DEBUG__.extractState()
```

## Captured and projected data

```txt
room ID and local player ID
local position, rotation, pitch, velocity and carried cube
input axes, interaction/pause state, look deltas and pointer-lock state
snapshot tick, timestamp, app/game states and counts
every cube ID, color, state, owner ID and world position
ordered anomaly sequence and occupied slots
network cadence counters
scene-dressing counts and validation
runtime, sync, network, interaction, pointer-lock and debug events
```

The overlay directly prints the anomaly sequence and every cube record with its world position. The window API returns the retained full records.

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session, lobby, actor identity, room, roster and readiness
runtime startup, lifecycle, generation, readiness and cleanup
PeerJS and BroadcastChannel transport
protocol message construction, serialization and admission
seeded maze, cube, anomaly and random-stream generation
authoritative snapshots, publication, acceptance and delivery
input, pointer lock, movement, collision, camera and prediction
interaction, cube ownership, slot claims, outcomes and ooze
Three.js world, post-processing, bloom, minimap and render surface
runtime debug activation and preference persistence
debug frame/event capture and bounded retention
debug classification, redaction, overlay, export and revocation
validation, build and deployment
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit         routing, modes, loading, pause, completion and exits
corridor-session-domain-kit            session mode, peer identity, room, roster, readiness and reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, reason and overlay
ui-completion-projection-kit           terminal state, message, timestamp and routing
complete-screen-presentation-kit       result presentation and navigation
lobby-screen-presentation-kit          room, roster, readiness, controls and connection status
peer-host-transport-kit                connection registry, broadcast, targeted send and destroy
peer-client-transport-kit              host connection, send, status, disconnect and destroy
peer-event-bus-kit                     typed events and subscription lifecycle
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit             JSON encode/decode, version and shape checks
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly, room and snapshot
seeded-maze-rng-kit                    deterministic topology, cube placement and target order
first-person-input-kit                 keyboard, pointer lock, mouse look and snapshots
movement-collision-camera-kit          movement, collision, eye pose, shake and camera
network-player-update-kit              sequence, cadence, pose envelope and host consume
corridor-interaction-domain-kit        pickup, drop, place, remove and held-cube sync
ordered-anomaly-sequence-kit           ordered validation, slots and victory
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           authoritative state to UI routing
corridor-authoritative-publication-kit tick, clone, SYNC and broadcast
corridor-animation-loop-kit            RAF start/stop and delta
corridor-render-world-kit              maze/world objects, lights, update and disposal
corridor-post-processing-kit           composer, bloom, resize, render and disposal
corridor-minimap-kit                   2D sizing and maze/entity projection
runtime-debug-frame-kit                activation, frames/events, overlay state and export
runtime-resource-cleanup-kit           loop, subscriptions, observers, listeners and GPU cleanup
package-validation-kit                 build, lint, smoke, harness, visual and live-player checks
```

## Main finding

The logger proves observability, but no authority distinguishes a public-safe operational metric from privileged gameplay/session state.

```txt
public activation
  -> no command/result identity
  -> no build-channel admission
  -> no actor/role admission
  -> no runtime/session lease
  -> no classification/redaction
  -> no typed export result
  -> no revocation on replacement
```

Bounded retention prevents unbounded memory growth, but it does not prevent puzzle disclosure, cross-session persistence or unauthorized export.

## Required parent domain

```txt
corridor-debug-observability-authority-domain
```

## Candidate coordinating kits

```txt
debug-capability-policy-kit
debug-build-channel-kit
debug-activation-command-kit
debug-activation-admission-kit
debug-capability-tier-kit
debug-session-lease-kit
debug-role-capability-kit
debug-data-classification-kit
debug-redaction-profile-kit
debug-frame-projection-kit
debug-event-projection-kit
debug-retention-budget-kit
debug-export-command-kit
debug-export-result-kit
debug-overlay-projection-kit
debug-preference-persistence-kit
debug-revocation-kit
debug-observation-journal-kit
production-debug-disable-fixture-kit
redaction-parity-fixture-kit
session-revocation-fixture-kit
browser-debug-capability-smoke-kit
```

## Required guarantees

```txt
public production defaults to no privileged capability
query/storage/keyboard/window paths cannot elevate beyond policy
capability is bound to actor, role, runtime generation and session epoch
player-safe telemetry excludes puzzle/session-sensitive fields
overlay, frame export and event export share one classification profile
retention enforces count, byte and age budgets
stop/restart/session replacement revokes capability and clears buffers
persisted preferences cannot cross build channel or session authority
all activation/export/revocation outcomes are typed and journaled
```

## Files created

```txt
.agent/trackers/2026-07-12T01-08-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T01-08-06-04-00.md
.agent/architecture-audit/2026-07-12T01-08-06-04-00-debug-observability-authority-dsk-map.md
.agent/render-audit/2026-07-12T01-08-06-04-00-privileged-debug-overlay-frame-gap.md
.agent/gameplay-audit/2026-07-12T01-08-06-04-00-debug-activation-puzzle-disclosure-loop.md
.agent/interaction-audit/2026-07-12T01-08-06-04-00-debug-command-capability-result-map.md
.agent/debug-observability-audit/2026-07-12T01-08-06-04-00-capability-redaction-revocation-contract.md
.agent/deploy-audit/2026-07-12T01-08-06-04-00-production-debug-capability-fixture-gate.md
```

## Files refreshed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

```txt
runtime source changed: no
debug behavior changed: no
render/network/deploy behavior changed: no
branch created: no
pull request created: no
existing package commands run: no
required capability fixtures available: no
```

No production-safe diagnostics or authorized-export claim is made.
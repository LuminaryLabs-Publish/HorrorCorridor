# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-13T11-58-45-04-00`  
**Branch:** `main`  
**Status:** `webgl-context-resource-recovery-authority-central-reconciled`

## Summary

The repository retains a 29-kit browser runtime spanning routing, sessions, PeerJS/local transport, deterministic maze bootstrap, movement, interactions, ooze, snapshot publication, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is WebGL context and GPU-resource recovery. `GameCanvas` creates one renderer/composer/world resource generation and marks rendering ready before a proven visible frame. The application owns no context-loss/restoration events, context/resource generations, submission retirement, fallback projection, recovery candidate, probe result, atomic adoption or recovered-frame acknowledgement.

## Plan ledger

**Goal:** make context loss and restoration explicit, generation-bound and verifiable without merging gameplay, networking or render-participant ownership.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify central-ledger and root `.agent` coverage for all eligible repositories.
- [x] Select HorrorCorridor as the oldest eligible central entry.
- [x] Read renderer, composer, animation-loop and `GameCanvas` lifecycle source.
- [x] Preserve all 29 implemented kits and services.
- [x] Add the timestamped WebGL recovery audit family.
- [x] Refresh root docs and machine registry.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
accepted snapshot
  -> initialize runtime once
  -> create renderer, scene, camera, composer, passes and world
  -> append canvas
  -> mark rendering readiness true
  -> start RAF

frame
  -> advance solo/host/client work
  -> update camera, world, minimap and debug
  -> submit post-processing render
  -> schedule successor RAF after callback returns

context loss/restoration
  -> no application event owner
  -> no lifecycle state or generation
  -> no submission fence or readiness retirement
  -> no fallback or resource rebuild receipt
  -> no recovered-frame acknowledgement

cleanup
  -> stop RAF and listeners
  -> dispose world, composer and renderer
```

## Domains in use

```txt
application shell and route lifecycle
session, room, roster, identity, connection and readiness
runtime snapshot, pose, input, cadence and publication
UI pause, completion, overlays and hints
PeerJS, BroadcastChannel and protocol handling
seeded maze and replicated game state
first-person input, movement, collision and camera
cube interaction, anomaly sequence and ooze pressure
Three.js renderer, scene, camera and world resources
EffectComposer, passes, render targets and bloom
render-surface sizing, DPR and canvas ownership
WebGL context lifecycle, generations and submission admission
GPU resource preparation, probe, adoption, fallback and disposal
minimap, HUD, diagnostics and readiness projection
validation, build, Pages deployment and central tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit
corridor-session-domain-kit
runtime-store-snapshot-kit
ui-pause-projection-kit
ui-completion-projection-kit
complete-screen-presentation-kit
lobby-screen-presentation-kit
peer-host-transport-kit
peer-client-transport-kit
peer-event-bus-kit
protocol-message-construction-kit
protocol-serialization-kit
maze-snapshot-bootstrap-kit
seeded-maze-rng-kit
first-person-input-kit
movement-collision-camera-kit
network-player-update-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
snapshot-outcome-routing-kit
corridor-authoritative-publication-kit
corridor-animation-loop-kit
corridor-render-world-kit
corridor-post-processing-kit
corridor-minimap-kit
runtime-debug-frame-kit
runtime-resource-cleanup-kit
package-validation-kit
```

```txt
implemented source-backed kits: 29
planned context/resource recovery kits including parent: 22
```

Services cover route/session state, peer transport, protocol construction and admission, deterministic bootstrap, input and movement, interactions and outcomes, authoritative publication, RAF scheduling, Three.js world projection, post-processing, minimap/HUD/debug, cleanup, validation and deployment.

## Source-backed findings

```txt
renderer constructed once per initialized runtime: yes
composer and passes constructed once: yes
initialized guard prevents second initialization in component lifetime: yes
application context/resource generation: absent
webglcontextlost/restored listeners: absent
context-loss preventDefault policy: absent
render-submission lease: absent
simulation policy during loss: absent
fallback surface: absent
resource manifest and recovery candidate: absent
probe-frame result: absent
atomic recovered-generation adoption: absent
rendering readiness true before first proven frame: yes
readiness downgrade on context loss: absent
RAF successor scheduled after frame callback: yes
frame exception containment in animation loop: absent
first recovered visible-frame acknowledgement: absent
WEBGL_lose_context fixture: absent
```

## Required parent domain

```txt
corridor-webgl-context-resource-recovery-authority-domain
```

## Required transaction

```txt
WebGLContextLifecycleEvent
  -> validate surface/context generation
  -> retire submission lease
  -> project rendering not-ready and fallback
  -> choose simulation/network continuation policy
  -> prepare renderer/composer/world candidates
  -> validate manifests and viewport
  -> submit recovery probe
  -> atomically adopt every resource participant or none
  -> publish ContextRecoveryResult
  -> publish FirstRecoveredFrameAck
```

## Current file family

```txt
.agent/trackers/2026-07-13T11-58-45-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T11-58-45-04-00.md
.agent/architecture-audit/2026-07-13T11-58-45-04-00-webgl-context-resource-recovery-dsk-map.md
.agent/render-audit/2026-07-13T11-58-45-04-00-context-loss-visible-frame-recovery-gap.md
.agent/gameplay-audit/2026-07-13T11-58-45-04-00-presentation-loss-simulation-liveness-loop.md
.agent/interaction-audit/2026-07-13T11-58-45-04-00-context-event-resource-result-map.md
.agent/webgl-lifecycle-audit/2026-07-13T11-58-45-04-00-context-generation-resource-adoption-contract.md
.agent/deploy-audit/2026-07-13T11-58-45-04-00-webgl-context-recovery-fixture-gate.md
.agent/central-sync-audit/2026-07-13T11-58-45-04-00-repo-ledger-webgl-recovery-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, package, dependency or deployment behavior changed.
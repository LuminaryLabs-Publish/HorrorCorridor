# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-13T11-58-45-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `webgl-context-resource-recovery-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS and same-origin transport, deterministic maze bootstrap, first-person movement, cube interactions, ooze pressure, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current audit isolates application-level WebGL context and GPU-resource recovery. `GameCanvas` creates one `WebGLRenderer`, one `EffectComposer`, one set of passes and one world resource graph for the component lifetime. The application does not subscribe to `webglcontextlost` or `webglcontextrestored`, does not own context or resource generations, marks rendering ready before a proven frame, and has no fallback or first-recovered-frame receipt.

## Plan ledger

**Goal:** require every WebGL context loss and restoration to retire the failed presentation generation, preserve an explicit simulation policy, rebuild and validate the full renderer/post-processing/world resource set, then adopt it only after a successful visible probe frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are in the central ledger.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Find no new, ledger-missing, root-agent-missing or locally-ahead eligible repository.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` as the oldest eligible central entry.
- [x] Read renderer, post-processing, animation-loop and `GameCanvas` lifecycle source.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 29 implemented kits and offered services.
- [x] Define the WebGL context/resource recovery parent domain and coordinating kits.
- [x] Add architecture, render, gameplay, interaction, lifecycle, deploy and central-sync audits.
- [x] Refresh the required root `.agent` files and machine registry.
- [x] Keep all writes on `main`; create no branch or pull request.
- [ ] Runtime recovery implementation and executable context-loss fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-agent-missing repositories: 0
repo-local-newer-than-central repositories: 0

HorrorCorridor     2026-07-13T07-00-29-04-00 selected oldest
ZombieOrchard      2026-07-13T07-41-11-04-00
PrehistoricRush    2026-07-13T08-39-12-04-00
TheUnmappedHouse   2026-07-13T09-03-20-04-00
TheOpenAbove       2026-07-13T09-40-27-04-00
AetherVale         2026-07-13T10-05-15-04-00
MyCozyIsland       2026-07-13T10-41-40-04-00
IntoTheMeadow      2026-07-13T10-59-22-04-00
PhantomCommand     2026-07-13T11-41-10-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` was modified in the Publish organization.

## Complete interaction loop

```txt
route and accepted snapshot
  -> initializeRuntime once
  -> create WebGLRenderer
  -> create Scene and PerspectiveCamera
  -> create EffectComposer, RenderPass, UnrealBloomPass and OutputPass
  -> build world GPU resources
  -> append renderer canvas
  -> mark rendering readiness true
  -> start recursive RAF

frame
  -> sample UI and runtime state
  -> advance local or authoritative gameplay
  -> update camera and world
  -> draw minimap and debug frame
  -> submit EffectComposer render
  -> schedule successor RAF only after frame callback returns

context loss or GPU reset
  -> browser/driver invalidates the active context generation
  -> no product-owned context-lost event handler
  -> no submission lease retirement
  -> no rendering-readiness downgrade
  -> no simulation continuation/pause policy result
  -> no fallback projection
  -> no explicit resource reconstruction or adoption
  -> no first recovered visible-frame acknowledgement

component cleanup
  -> stop RAF
  -> unsubscribe listeners and transport
  -> dispose world, composer and renderer
  -> remove canvas
  -> mark rendering readiness false
```

## Domains in use

```txt
application shell and route lifecycle
session, room, roster, peer identity, connection and readiness
runtime snapshot, pose, input, cadence and publication
UI screen, overlay, pause, completion and hints
PeerJS, BroadcastChannel and protocol message handling
seeded maze and replicated game state
first-person input, pointer lock, movement, collision and camera
cube interaction, anomaly sequence and ooze pressure
Three.js scene, WebGL renderer, camera and world resources
EffectComposer, render pass, bloom, output pass and render targets
render-surface sizing, DPR, canvas ownership and ResizeObserver
WebGL context loss, restoration, generations and submission admission
GPU resource reconstruction, probe, adoption, fallback and disposal
minimap, HUD, runtime diagnostics and readiness projection
cleanup, validation, build, Pages deployment and central tracking
```

## Implemented kits and services

```txt
corridor-application-shell-kit: routing, solo/host/client entry, loading, pause, completion, exit
corridor-session-domain-kit: identity, room, roster, connection, readiness, reset
runtime-store-snapshot-kit: snapshot, pose, view, input flags, readiness
ui-pause-projection-kit: pause state, reason, overlay
ui-completion-projection-kit: terminal state, message, timestamp, routing
complete-screen-presentation-kit: outcome presentation, restart, title exit
lobby-screen-presentation-kit: room, roster, ready state, controls
peer-host-transport-kit: PeerJS host, BroadcastChannel bridge, connection map, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit: PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy
peer-event-bus-kit: typed transport events, subscription, cleanup
protocol-message-construction-kit: START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit: encode, decode, protocol version, structural validation
maze-snapshot-bootstrap-kit: seed, maze, players, cubes, anomaly, initial snapshot
seeded-maze-rng-kit: topology, placement, target sequence
first-person-input-kit: keyboard, pointer lock, look, snapshots
movement-collision-camera-kit: movement, collision, eye pose, shake, camera
network-player-update-kit: sequence, cadence, pose envelope, host consume
corridor-interaction-domain-kit: pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit: ordered slots, validation, victory
ooze-trail-domain-kit: spawn, decay, variation, spacing, capacity, pressure
snapshot-outcome-routing-kit: snapshot state to UI outcome
corridor-authoritative-publication-kit: tick, clone, SYNC, broadcast
corridor-animation-loop-kit: RAF start/stop, delta, elapsed, successor scheduling
corridor-render-world-kit: terrain, maze, objects, actors, lights, update, disposal
corridor-post-processing-kit: composer, bloom, resize, render, disposal
corridor-minimap-kit: maze, players, cubes, ooze, heading
runtime-debug-frame-kit: activation, bounded capture, overlay, export
runtime-resource-cleanup-kit: loop, subscriptions, listeners, observers, GPU cleanup
package-validation-kit: build, lint, harness, visual, live-player checks
```

```txt
implemented source-backed kits: 29
planned context/resource recovery kits including parent: 22
```

## Source-backed findings

```txt
WebGLRenderer construction: one per initialized GameCanvas runtime
EffectComposer construction: one per initialized GameCanvas runtime
render passes captured for component lifetime: yes
application context generation: absent
application resource generation: absent
webglcontextlost listener: absent
webglcontextrestored listener: absent
context-loss preventDefault policy: absent
render-submission admission while lost/restoring: absent
simulation policy during presentation loss: absent
DOM/CSS fallback surface: absent
recovery candidate preparation: absent
composer/world resource rebuild receipt: absent
probe-frame result: absent
atomic recovered-generation adoption: absent
rendering readiness set before first proven frame: yes
rendering readiness retired on context loss: no
RAF successor scheduled after onFrame returns: yes
frame exception containment inside animation loop: absent
first recovered visible-frame acknowledgement: absent
WEBGL_lose_context fixture: absent
```

The audit does not assume Three.js performs no internal recovery. It records that HorrorCorridor has no application-owned contract proving which context and GPU-resource generation is active, whether restoration succeeded, or which recovered generation produced the visible frame.

## Required parent domain

```txt
corridor-webgl-context-resource-recovery-authority-domain
```

## Required transaction

```txt
WebGLContextLifecycleEvent
  -> bind render surface, runtime session and current context/resource generations
  -> classify Lost, Restoring, Restored, Failed or Disposed
  -> retire the active render-submission lease
  -> publish a bounded simulation-during-loss policy
  -> downgrade rendering readiness and expose a WebGL-independent fallback
  -> prepare renderer, composer, passes, render targets and world GPU resources
  -> validate dimensions, capabilities and resource manifest
  -> submit one recovery probe frame
  -> atomically adopt the successor context/resource generation or preserve failure state
  -> dispose superseded resources only after accepted adoption
  -> publish ContextRecoveryResult
  -> publish FirstRecoveredFrameAck
```

## Planned coordinating kits

```txt
corridor-webgl-context-resource-recovery-authority-domain
render-surface-identity-kit
webgl-context-event-adapter-kit
webgl-context-generation-kit
gpu-resource-generation-kit
webgl-lifecycle-state-kit
context-loss-command-kit
context-loss-result-kit
render-submission-lease-kit
simulation-during-loss-policy-kit
rendering-readiness-projection-kit
webgl-independent-fallback-kit
renderer-resource-manifest-kit
postprocessing-resource-manifest-kit
world-gpu-resource-manifest-kit
recovery-candidate-kit
recovery-capability-validation-kit
recovery-probe-frame-kit
recovered-generation-commit-kit
context-recovery-result-kit
first-recovered-frame-ack-kit
webgl-context-recovery-fixture-kit
```

## Repo-local output

Added:

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

```txt
runtime source changed: no
network behavior changed: no
gameplay behavior changed: no
render behavior changed: no
WebGL lifecycle behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
runtime commands run: no
browser context-loss fixture run: no
```

No claim is made for application-owned context recovery, GPU-resource reconstruction, fallback presentation, restored readiness, continued frame scheduling or first-recovered-frame proof.
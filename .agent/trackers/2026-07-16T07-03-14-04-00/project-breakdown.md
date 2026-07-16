# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-16T07-03-14-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `motion-preference-animation-admission-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes; deterministic maze bootstrap; PeerJS and BroadcastChannel transport; host-authoritative snapshots; local movement prediction; cube and anomaly interaction; ooze; Three.js rendering; post-processing; Canvas2D minimap projection; and browser-proof tooling.

This audit isolates motion-preference ownership. Gameplay frames continuously apply walk bob and roll to the camera, pulse scene-prop emissive intensity and opacity, and pulse the exit light and halo. The repository contains no operating-system reduced-motion observer, product override, essential-versus-ornamental motion classifier, live preference settlement, motion projection result or first reduced-motion gameplay-frame acknowledgement.

## Plan ledger

**Goal:** preserve movement, collision, networking, interaction and authoritative simulation while making optional camera and environmental animation consume one revision-bound motion policy.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible root `.agent` states and central ledger entries.
- [x] Confirm no new, ledger-missing, root-agent-missing or undocumented eligible repository.
- [x] Select only HorrorCorridor using the oldest synchronized timestamp.
- [x] Inspect camera motion, scene pulses, render cadence, lifecycle and proof surfaces.
- [x] Preserve all 29 implemented kits and two browser-proof adapters.
- [x] Identify the complete interaction loop, domains, kits and offered services.
- [x] Define one motion-preference authority and 20 coordinating surfaces.
- [x] Add this timestamped audit family and refresh root `.agent` state.
- [ ] Implement and execute source, browser, build and deployed-origin reduced-motion fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/HorrorCorridor
selected timestamp: 2026-07-16T02-40-29-04-00
next oldest: LuminaryLabs-Publish/TheOpenAbove
next timestamp: 2026-07-16T03-03-22-04-00
```

## Complete interaction loop

```txt
solo host or client route
  -> deterministic maze and session snapshot admission
  -> GameCanvas creates transport input world renderer minimap and RAF
  -> accepted input advances movement collision interaction and networking
  -> authoritative snapshots drive world minimap HUD and terminal projection

visible frame
  -> RAF supplies elapsedMs and deltaMs
  -> camera projection adds movement-speed-dependent side bob vertical bob and roll
  -> scene dressing pulses emissive intensity and opacity from elapsedMs
  -> exit light and halo pulse from elapsedMs
  -> world updates and post-processing presents the frame

preference boundary
  -> no prefers-reduced-motion observer is admitted
  -> no product override or motion policy is resolved
  -> essential simulation and ornamental motion are not classified
  -> normal camera and environmental motion remain active
  -> no reduced-motion projection result or frame acknowledgement is published
```

## Domains in use

```txt
application routing and browser lifecycle
session identity room roster connection readiness and reset
deterministic maze bootstrap and seeded maze RNG
PeerJS BroadcastChannel transport and protocol
keyboard mouse pointer-lock and normalized input
client prediction and authoritative publication
movement collision camera and interaction
cube anomaly ooze and victory
host cadence wall time and snapshot publication
pause settings completion and route projection
Three.js world post-processing RAF and viewport
camera bob roll and environmental pulse projection
operating-system motion capability and product preference policy
essential simulation versus ornamental presentation classification
Canvas2D minimap and HUD projection
debug proof validation build deployment and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `corridor-application-shell-kit` | routing, solo/host/client entry, loading, pause, completion, exit |
| `corridor-session-domain-kit` | identity, room, roster, connection, readiness, reset |
| `runtime-store-snapshot-kit` | snapshot, pose, view, input flags, readiness |
| `ui-pause-projection-kit` | pause state, reason, overlay |
| `ui-completion-projection-kit` | terminal state, message, timestamp, routing |
| `complete-screen-presentation-kit` | outcome presentation, restart, title exit |
| `lobby-screen-presentation-kit` | room, roster, ready state, controls |
| `peer-host-transport-kit` | PeerJS host, BroadcastChannel bridge, connections, broadcast, targeted send, disconnect, destroy |
| `peer-client-transport-kit` | PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy |
| `peer-event-bus-kit` | typed transport events, subscription, cleanup |
| `protocol-message-construction-kit` | START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT |
| `protocol-serialization-kit` | encode, decode, protocol version, structural validation |
| `maze-snapshot-bootstrap-kit` | seed, maze, players, cubes, anomaly, initial snapshot |
| `seeded-maze-rng-kit` | topology, placement, target sequence |
| `first-person-input-kit` | keyboard, pointer lock, look, snapshots |
| `movement-collision-camera-kit` | movement, collision, eye pose, walk bob, roll, camera projection |
| `network-player-update-kit` | sequence, cadence, pose envelope, host consume |
| `corridor-interaction-domain-kit` | pickup, drop, place, remove, held-cube synchronization |
| `ordered-anomaly-sequence-kit` | ordered slots, validation, victory |
| `ooze-trail-domain-kit` | spawn, decay, variation, spacing, capacity, pressure |
| `snapshot-outcome-routing-kit` | snapshot state to UI outcome |
| `corridor-authoritative-publication-kit` | tick, clone, SYNC, broadcast |
| `corridor-animation-loop-kit` | RAF start, stop, delta, elapsed and successor scheduling |
| `corridor-render-world-kit` | terrain, maze, objects, actors, pulsing lights/materials, update, dispose |
| `corridor-post-processing-kit` | composer, bloom, resize, render, dispose |
| `corridor-minimap-kit` | canvas acquisition, DPR sizing, transform, maze, ooze, cubes, players, heading |
| `runtime-debug-frame-kit` | activation, bounded capture, overlay, export |
| `runtime-resource-cleanup-kit` | loop, subscriptions, listeners, observers, GPU cleanup |
| `package-validation-kit` | build, lint, harness, visual and live-player checks |

## Browser-proof adapters

| Adapter | Offered services |
|---|---|
| `live-agent-runner-adapter` | episode scheduling, adaptive actions, child execution, JSONL history, latest summary |
| `live-player-browser-proof-adapter` | server/browser admission, route control, debug readback, screenshots, image probes, proof gates |

```txt
implemented kits: 29
browser-proof adapters: 2
total implemented surfaces: 31
planned motion-preference surfaces: 20
```

## Source-backed finding

```txt
camera side bob from elapsed time: present
camera vertical bob from elapsed time: present
camera roll from elapsed time: present
movement-speed motion scaling: present
scene prop emissive pulse: present
scene prop opacity pulse: present
texture opacity pulse: present
exit light intensity pulse: present
exit halo opacity pulse: present
per-frame world update and post-processing: present
prefers-reduced-motion observer: absent
product motion override: absent
essential/ornamental classifier: absent
live preference-change result: absent
MotionProjectionResult: absent
FirstReducedMotionGameplayFrameAck: absent
reduced-motion browser fixture: absent
```

## Required authority

```txt
corridor-motion-preference-animation-admission-authority-domain
```

```txt
MotionPreferenceAdmissionCommand
  -> bind document route preference policy runtime and frame revisions
  -> observe operating-system reduced-motion capability
  -> resolve an optional product override
  -> classify essential simulation separately from ornamental presentation
  -> preserve movement collision networking interaction and authoritative state
  -> adapt camera bob camera roll scene pulses exit-light pulses and transitions
  -> settle live preference changes without rebuilding gameplay truth
  -> reject retired-route work
  -> publish MotionProjectionResult
  -> publish FirstReducedMotionGameplayFrameAck
```

## Planned coordinating surfaces

```txt
motion-capability-observer-kit
motion-preference-policy-kit
product-motion-override-kit
motion-classification-kit
route-motion-generation-kit
camera-bob-projection-kit
camera-roll-projection-kit
scene-emissive-pulse-policy-kit
scene-opacity-pulse-policy-kit
exit-light-pulse-policy-kit
transition-motion-profile-kit
essential-simulation-preservation-kit
live-preference-change-kit
reduced-motion-frame-descriptor-kit
motion-projection-result-kit
first-reduced-motion-gameplay-frame-ack-kit
motion-policy-retirement-kit
reduced-motion-source-fixture-kit
browser-media-query-fixture-kit
source-build-pages-motion-parity-kit
```

## Validation boundary

Documentation only. Runtime TypeScript, React, CSS, networking, input, gameplay, Three.js, Canvas2D, packages, tests, workflows and deployment are unchanged. No reduced-motion adoption, vestibular-safety claim, simulation parity, live preference settlement, frame convergence, artifact parity, Pages parity or production readiness is claimed.
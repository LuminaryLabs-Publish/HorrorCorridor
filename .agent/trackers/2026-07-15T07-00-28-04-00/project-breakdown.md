# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-15T07-00-28-04-00`  
**Status:** `audio-event-projection-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client entry, deterministic maze bootstrap, PeerJS and BroadcastChannel transport, predictive movement, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, post-processing, minimap, diagnostics and browser-proof tooling.

The selected undocumented boundary is audio event projection. Repository-wide source inspection found no runtime audio context, media element, cue registry, volume or mute state, spatial listener/source projection, audio lifecycle owner or audible-result proof. Accepted movement, interaction, ooze, session and terminal states are projected visually but not through an owned audio domain.

## Plan ledger

**Goal:** preserve authoritative gameplay and rendering while adding one revisioned audio projection boundary that turns accepted semantic state changes into bounded, preference-aware and lifecycle-safe audible output.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central ledgers.
- [x] Confirm every eligible current head matches its documented head.
- [x] Confirm all ten eligible repositories retain root `.agent` state.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect the package, application loop, interaction rules, settings projection and kit registry.
- [x] Identify the complete interaction loop, domains, kits and offered services.
- [x] Preserve 29 implemented kits and two browser-proof adapters.
- [x] Define 22 planned audio authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement and execute browser audio fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger missing: 0
root-agent missing: 0
runtime ahead: 0

selected: HorrorCorridor
prior central timestamp: 2026-07-15T02-00-17-04-00
next oldest: TheOpenAbove at 2026-07-15T02-09-29-04-00
selection reason: oldest synchronized eligible repository
```

## Complete interaction loop

```txt
solo, host or client route
  -> deterministic maze snapshot and player admission
  -> GameCanvas initializes input, movement, transport, world and RAF
  -> movement and interactions mutate local or authoritative state
  -> host publishes replicated snapshots
  -> clients reconcile and render world, minimap and HUD
  -> pause or completion changes the application projection

current audio path
  -> no browser audio capability snapshot
  -> no user-gesture audio unlock
  -> no cue descriptor or semantic audio event
  -> no listener or spatial-source projection
  -> no volume, mute, bus or voice-budget policy
  -> no audible acknowledgement or audiovisual convergence proof
```

## Domains in use

```txt
application routing and browser lifecycle
session identity room roster connection readiness and reset
loading and deterministic maze bootstrap
PeerJS BroadcastChannel transport and protocol
keyboard mouse pointer-lock and normalized input
client prediction and authoritative publication
movement collision camera and interaction
cube pickup drop carry placement removal and slot ordering
ooze pressure trail decay and victory
pause settings completion and route projection
Three.js world post-processing minimap RAF and viewport
browser audio capability context lifecycle and gesture unlock
semantic cue descriptors event mapping and deduplication
listener pose spatial sources ambience buses preferences and voice budgets
audiovisual convergence debug proof validation build deployment and central tracking
```

## Implemented kits and offered services

| Kit | Services |
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
| `movement-collision-camera-kit` | movement, collision, eye pose, shake, camera |
| `network-player-update-kit` | sequence, cadence, pose envelope, host consume |
| `corridor-interaction-domain-kit` | pickup, drop, place, remove, held-cube synchronization |
| `ordered-anomaly-sequence-kit` | ordered slots, validation, victory |
| `ooze-trail-domain-kit` | spawn, decay, variation, spacing, capacity, pressure |
| `snapshot-outcome-routing-kit` | snapshot state to UI outcome |
| `corridor-authoritative-publication-kit` | tick, clone, SYNC, broadcast |
| `corridor-animation-loop-kit` | RAF start, RAF stop, delta, elapsed, successor scheduling |
| `corridor-render-world-kit` | terrain, maze, objects, actors, lights, update, dispose |
| `corridor-post-processing-kit` | composer, bloom, resize, render, dispose |
| `corridor-minimap-kit` | maze, players, cubes, ooze, heading |
| `runtime-debug-frame-kit` | activation, bounded capture, overlay, export |
| `runtime-resource-cleanup-kit` | loop, subscriptions, listeners, observers, GPU cleanup |
| `package-validation-kit` | build, lint, harness, visual and live-player checks |

## Browser-proof adapters

| Adapter | Services |
|---|---|
| `live-agent-runner-adapter` | episode scheduling, adaptive action selection, child execution, JSONL history, latest summary |
| `live-player-browser-proof-adapter` | server/browser admission, route control, debug readback, screenshots, image probes, proof gates |

## Source-backed audio findings

```txt
GameCanvas audio owner: absent
AudioContext or OfflineAudioContext construction: absent
HTML audio element or new Audio construction: absent
semantic audio event type: absent
audio cue descriptor registry: absent
master/category volume preference: absent
mute state: absent
listener pose projection: absent
spatial source projection: absent
cue deduplication or voice budget: absent
pause/hide/route audio suspension: absent
FirstAudibleCueAck: absent
browser audio fixture: absent
```

The settings overlay is a control-map panel only. The package and implemented kit registry contain no audio domain. Interaction rules already expose accepted pickup, drop, placement, removal and completion transitions, while ooze, movement, session and terminal state provide additional semantic sources for future cues.

## Required authority

```txt
corridor-audio-event-projection-authority-domain
```

```txt
AudioProjectionAdmissionCommand
  -> bind document, runtime, session, snapshot and audio-policy revisions
  -> observe browser audio capability and user-gesture unlock state
  -> resolve one accepted semantic event into AudioCueDescriptors
  -> distinguish UI, local-player, remote-player, world and ambience sources
  -> deduplicate prediction, authoritative replay and repeated snapshots
  -> project listener and spatial-source transforms from accepted state
  -> enforce mute, volume, bus, pooling and voice-budget policy
  -> suspend or retire audio on pause, hide, route exit and runtime replacement
  -> publish AudioProjectionResult
  -> publish FirstAudibleCueAck
  -> publish FirstAudioVisualConvergenceAck
```

## Planned kits

```txt
audio-capability-snapshot-kit
audio-context-lifecycle-kit
user-gesture-audio-unlock-kit
audio-policy-revision-kit
audio-cue-descriptor-registry-kit
semantic-audio-event-kit
gameplay-event-audio-map-kit
ui-audio-map-kit
ambience-loop-kit
listener-pose-projection-kit
spatial-source-projection-kit
occlusion-distance-policy-kit
audio-bus-graph-kit
master-volume-preference-kit
category-volume-preference-kit
mute-state-kit
cue-deduplication-kit
voice-budget-pooling-kit
pause-visibility-audio-suspension-kit
audio-projection-result-kit
first-audible-cue-ack-kit
audio-browser-fixture-parity-kit
```

## Validation boundary

Documentation only. Runtime TypeScript, networking, gameplay, rendering, packages, tests, workflows and deployment are unchanged. No audible gameplay, spatial-audio correctness, preference persistence, autoplay-unlock reliability, audiovisual convergence or production-readiness claim is made.

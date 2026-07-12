# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T12-21-38-04-00`

## Status

```txt
status: transport-mode-reachability-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: current run
```

## Summary

The repository retains a 29-kit browser runtime spanning application routing, session and lobby state, PeerJS transport, a same-origin BroadcastChannel bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current implementation boundary is transport-mode selection. Both host and client create a `BroadcastChannel` whenever the browser exposes that API. Its existence disables the PeerJS connection path rather than adding a local fallback. The client then reports `connected` immediately after posting a local bridge packet, with no host acknowledgement or delivery proof.

## Plan ledger

**Goal:** make transport capability, policy, reachability, fallback and visible multiplayer proof explicit and revisioned.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` under the oldest eligible rule.
- [x] Read current root `.agent` state and recent commits.
- [x] Read `GameShell.tsx`, `createHost.ts` and `createClient.ts`.
- [x] Trace local bridge and PeerJS mode branches.
- [x] Identify the interaction loop, domains, 29 kits and services.
- [x] Define transport-mode authority and fixtures.
- [x] Refresh root and central documentation on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable transport fixtures remain future work.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
selection reason: oldest eligible synchronized central entry at 2026-07-12T09-48-15-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Product interaction loop

```txt
browser route
  -> choose solo, host or client

host
  -> create room, join code and PeerJS host
  -> create BroadcastChannel when available
  -> skip PeerJS connection listener when local bridge exists
  -> receive and publish through local bridge only

client
  -> create PeerJS client
  -> create BroadcastChannel when available
  -> skip peer.connect when local bridge exists
  -> post client-connect
  -> report connected immediately

run
  -> transport events update lobby/session state
  -> host publishes START_GAME and SYNC
  -> accepted snapshots drive input, simulation, rendering, HUD and minimap
```

## Domains in use

```txt
application shell and screen routing
UI loading, pause, completion, settings and terminal projection
session mode, peer identity, room, roster, readiness and reset
lobby identity, actor binding, readiness, start and bootstrap
loading-step orchestration and transition generations
runtime startup, readiness, frame lifecycle, failure containment and cleanup
browser clocks, cadence, simulation time and clock generations
transport capability observation and mode selection
BroadcastChannel local bridge
PeerJS signalling and data-channel transport
connection handshake, reachability, fallback and retirement
protocol envelopes, serialization, request and sequence admission
seeded maze topology, cube placement, target sequence and random streams
snapshot construction, publication, acceptance, delivery and backpressure
keyboard, mouse, pointer lock, focus, visibility and input lifecycle
movement, collision, camera, prediction and host admission
cube interactions, slot claims, anomaly sequence and ooze pressure
Three.js world, camera, post-processing, bloom and disposal
render-surface sizing, presentation policy and frame correlation
HUD, minimap and debug projection
validation, build, deployment and central audit tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion and exit
corridor-session-domain-kit            identity, room, roster, connection, readiness and reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, reason and overlay
ui-completion-projection-kit           terminal state, message, timestamp and routing
complete-screen-presentation-kit       outcome presentation, restart and title exit
lobby-screen-presentation-kit          room, roster, ready state and controls
peer-host-transport-kit                PeerJS host, local bridge, connections, broadcast, send and destroy
peer-client-transport-kit              PeerJS client, local bridge, connect, send, status and destroy
peer-event-bus-kit                     typed transport events, subscription and cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT
protocol-serialization-kit             encode, decode, version and shape validation
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly and initial snapshot
seeded-maze-rng-kit                    topology, placement and target sequence
first-person-input-kit                 keyboard, pointer lock, look and snapshots
movement-collision-camera-kit          movement, collision, eye pose, shake and camera
network-player-update-kit              sequence, cadence, pose envelope and host consume
corridor-interaction-domain-kit        pickup, drop, place, remove and held-cube synchronization
ordered-anomaly-sequence-kit           ordered slots, validation and victory
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           snapshot state to UI outcome
corridor-authoritative-publication-kit tick, clone, SYNC and broadcast
corridor-animation-loop-kit            RAF start/stop, delta, elapsed and successor scheduling
corridor-render-world-kit              terrain, maze, objects, actors, lights, update and disposal
corridor-post-processing-kit           composer, bloom, sizing, render and disposal
corridor-minimap-kit                   maze, players, cubes, ooze and heading
runtime-debug-frame-kit                activation, bounded capture, overlay and export
runtime-resource-cleanup-kit           loop, subscriptions, listeners, observers and GPU cleanup
package-validation-kit                 build, lint, harness, visual and live-player checks
```

## Transport-mode findings

### Host

```txt
PeerJS object created: yes
BroadcastChannel created when API exists: yes
PeerJS connection listener installed with local bridge: no
broadcast/sendTo use local bridge with local bridge: yes
```

### Client

```txt
PeerJS object created: yes
BroadcastChannel created when API and host ID exist: yes
peer.connect used with local bridge: no
host acknowledgement required before connected: no
status set connected after packet post: yes
```

### Failure paths

```txt
cross-device or cross-origin client
  -> local bridge selected
  -> packet cannot reach host
  -> no PeerJS fallback
  -> client still reports connected

client starts before same-origin host listener
  -> client-connect packet is dropped
  -> no replay or timeout
  -> client remains connected locally
```

## Missing authority

```txt
transport capability result
explicit mode policy
transport mode ID and revision
connection attempt ID and generation
host-presence handshake
acknowledged reachability result
fallback plan and switch result
path retirement result
delivery result per protocol message
transport mode in lobby/runtime state
first visible remote-player frame receipt
```

## Required parent domain

```txt
corridor-transport-mode-reachability-authority-domain
```

## Candidate kits

```txt
transport-capability-observation-kit
transport-mode-policy-kit
transport-mode-id-kit
transport-mode-revision-kit
transport-path-candidate-kit
local-bridge-adapter-kit
peerjs-data-channel-adapter-kit
transport-path-admission-kit
host-presence-handshake-kit
connection-attempt-id-kit
connection-attempt-generation-kit
connection-acknowledgement-kit
reachability-result-kit
transport-fallback-plan-kit
transport-switch-result-kit
transport-path-retirement-kit
transport-delivery-result-kit
transport-status-projection-kit
transport-mode-observation-kit
transport-mode-journal-kit
first-remote-player-frame-ack-kit
same-tab-local-bridge-fixture-kit
cross-tab-local-bridge-fixture-kit
cross-origin-peerjs-fixture-kit
cross-device-peerjs-fixture-kit
absent-host-false-connected-fixture-kit
late-host-listener-fixture-kit
transport-fallback-fixture-kit
```

## Required flow

```txt
ConnectSessionCommand
  -> observe capabilities
  -> choose explicit preferred and fallback modes
  -> allocate attempt and transport generation
  -> prepare detached candidates
  -> perform acknowledged handshake
  -> admit one path and retire others
  -> publish typed connection/delivery results
  -> bind lobby and protocol state to transport revision
  -> acknowledge first visible remote-player frame
```

## Current audit family

```txt
.agent/trackers/2026-07-12T12-21-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T12-21-38-04-00.md
.agent/architecture-audit/2026-07-12T12-21-38-04-00-transport-mode-reachability-dsk-map.md
.agent/render-audit/2026-07-12T12-21-38-04-00-connected-status-visible-session-gap.md
.agent/gameplay-audit/2026-07-12T12-21-38-04-00-local-bridge-replaces-network-loop.md
.agent/interaction-audit/2026-07-12T12-21-38-04-00-connect-attempt-path-admission-map.md
.agent/transport-mode-audit/2026-07-12T12-21-38-04-00-capability-policy-handshake-fallback-contract.md
.agent/deploy-audit/2026-07-12T12-21-38-04-00-multiplayer-transport-matrix-gate.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, package scripts, dependencies and deployment were not changed. No browser, cross-origin, cross-device or fallback fixtures were run.
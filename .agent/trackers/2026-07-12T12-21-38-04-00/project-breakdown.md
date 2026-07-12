# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-12T12-21-38-04-00`  
**Source revision inspected:** `0ceb3cc906694b86933cb60a894a79e80d29bf7d`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and runtime diagnostics.

The current audit isolates transport-mode selection and network reachability. In modern browsers both host and client create a `BroadcastChannel` whenever the API exists. That automatically suppresses the PeerJS connection path, so cross-device and cross-origin clients cannot reach the host even though PeerJS objects are created. The client also reports `connected` immediately after posting a local bridge packet, without any host acknowledgement.

## Plan ledger

**Goal:** preserve the full repository breakdown while defining one explicit transport-mode authority from capability observation through verified host reachability, connection admission, message delivery and visible multiplayer proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible synchronized repository.
- [x] Inspect current root audit state and recent `main` commits.
- [x] Inspect `GameShell.tsx`, `createHost.ts` and `createClient.ts`.
- [x] Trace local bridge creation, PeerJS listener installation, connect, send, broadcast and status transitions.
- [x] Identify the interaction loop, all active domains, all 29 implemented kits and their services.
- [x] Define the transport-mode selection and reachability authority plus fixture gates.
- [x] Add a timestamped tracker, turn ledger and architecture/render/gameplay/interaction/transport/deploy audit family.
- [x] Refresh all required root `.agent` documents and the machine registry.
- [x] Update the central ledger and internal change log on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable cross-browser/cross-device fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-12T09-48-15-04-00 selected
ZombieOrchard      2026-07-12T10-09-07-04-00
MyCozyIsland       2026-07-12T10-20-02-04-00
TheUnmappedHouse   2026-07-12T10-30-00-04-00
AetherVale         2026-07-12T10-48-19-04-00
TheOpenAbove       2026-07-12T11-15-16-04-00
IntoTheMeadow      2026-07-12T11-29-40-04-00
PhantomCommand     2026-07-12T11-48-43-04-00
PrehistoricRush    2026-07-12T12-08-05-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` is modified in the Publish organization.

## Complete interaction loop

```txt
page route
  -> choose solo, host or client

host
  -> generate room, join code, player and PeerJS peer IDs
  -> create PeerJS host
  -> if BroadcastChannel exists, create local bridge
  -> local bridge presence suppresses PeerJS connection listener
  -> expose lobby and wait for local bridge packets

client
  -> derive host peer ID from join code
  -> create PeerJS client
  -> if BroadcastChannel exists, create local bridge
  -> connectToHost posts client-connect packet
  -> client marks itself connected without host acknowledgement
  -> local bridge presence suppresses PeerJS connect path

session
  -> lobby state and transport events update Zustand stores
  -> host starts loading and creates initial snapshot
  -> START_GAME and SYNC are broadcast through selected transport path
  -> GameCanvas starts input, simulation, rendering, HUD and minimap
```

## Source-backed transport findings

### Host path

```txt
peerId = joinCode
Peer instance created: yes
BroadcastChannel created when API exists: yes
PeerJS connection listener installed when local bridge exists: no
broadcast uses local bridge when local bridge exists: yes
sendTo uses local bridge when local bridge exists: yes
```

### Client path

```txt
Peer instance created: yes
BroadcastChannel created when API exists and host ID exists: yes
peer.connect called when local bridge exists: no
client-connect packet requires host acknowledgement: no
client status becomes connected immediately: yes
message send uses local bridge when local bridge exists: yes
```

### Consequences

```txt
modern browser capability is treated as transport policy
same-origin local bridge replaces rather than supplements PeerJS
cross-device and cross-origin sessions cannot use the selected path
client can report connected when no host is listening
client-connect sent before host listener exists is not replayed
PeerJS signalling status and gameplay reachability are conflated
no transport mode or reachability proof is attached to lobby state
no first remote-player frame proves successful multiplayer delivery
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
BroadcastChannel same-origin local bridge
PeerJS signalling, host/client connections and data channels
transport reachability, handshake, admission and fallback
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

The repository retains 29 source-backed kit responsibilities:

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

## Required parent domain

```txt
corridor-transport-mode-reachability-authority-domain
```

## Candidate coordinating kits

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

## Required transaction

```txt
ConnectSessionCommand
  -> sample capabilities without choosing policy implicitly
  -> allocate attempt ID and transport generation
  -> choose explicit preferred and fallback paths
  -> create detached transport candidates
  -> perform host-presence or PeerJS connection handshake
  -> require acknowledged reachability before connected status
  -> atomically install one admitted path
  -> retire rejected or predecessor paths
  -> publish typed connection and delivery results
  -> correlate lobby state, messages and snapshots with transport mode/revision
  -> acknowledge the first visible remote-player frame
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-12T12-21-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T12-21-38-04-00.md
.agent/architecture-audit/2026-07-12T12-21-38-04-00-transport-mode-reachability-dsk-map.md
.agent/render-audit/2026-07-12T12-21-38-04-00-connected-status-visible-session-gap.md
.agent/gameplay-audit/2026-07-12T12-21-38-04-00-local-bridge-replaces-network-loop.md
.agent/interaction-audit/2026-07-12T12-21-38-04-00-connect-attempt-path-admission-map.md
.agent/transport-mode-audit/2026-07-12T12-21-38-04-00-capability-policy-handshake-fallback-contract.md
.agent/deploy-audit/2026-07-12T12-21-38-04-00-multiplayer-transport-matrix-gate.md
```

## Validation

```txt
runtime source changed: no
network behavior changed: no
render behavior changed: no
gameplay behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
runtime commands run: no
browser multiplayer smoke run: no
cross-origin fixture available: no
cross-device fixture available: no
```

No runtime network-reachability, fallback, connection-status or multiplayer-frame correctness claim is made.
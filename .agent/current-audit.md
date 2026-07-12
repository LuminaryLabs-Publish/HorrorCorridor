# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T14-22-01-04-00`

## Status

```txt
status: data-channel-open-roster-admission-authority-audited
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: current run
```

## Summary

The repository retains a 29-kit browser runtime spanning application routing, session and lobby state, PeerJS transport, a same-origin BroadcastChannel bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current implementation boundary is data-channel-open and roster admission. In the PeerJS host connection handler, a `DataConnection` candidate is inserted into the live connection map before it is open. After installing callbacks, the host invokes the guarded connection-open emitter unconditionally. `GameShell` then treats the resulting event as authoritative connected membership, updates `lobbyPlayers` and `room.players`, and publishes a player-joined lobby message. If `connection.open` is false, that publication can reach zero clients. The guard has already been consumed, so the later real open callback does not repeat admission or publication.

## Plan ledger

**Goal:** make connection candidates, open evidence, actor binding, lobby membership, start eligibility and visible roster proof explicit and monotonic.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible root `.agent` entrypoints.
- [x] Select only `HorrorCorridor` under the oldest eligible rule.
- [x] Read current root `.agent` state and recent commits.
- [x] Read `createHost.ts`, `createClient.ts`, `peerTypes.ts`, `peerEvents.ts`, `GameShell.tsx`, `sessionStore.ts`, `LobbyScreen.tsx` and `package.json`.
- [x] Trace candidate creation, open callbacks, session mutation, lobby rendering and run bootstrap.
- [x] Identify the interaction loop, domains, 29 kits and services.
- [x] Define data-channel roster-admission authority and fixtures.
- [x] Refresh root and central documentation on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable admission fixtures remain future work.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
selection reason: oldest eligible central entry at 2026-07-12T12-21-38-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Product interaction loop

```txt
browser route
  -> choose solo, host or client

host transport
  -> create PeerJS host and optional local bridge
  -> receive DataConnection candidate
  -> insert candidate into live connection map
  -> install open/data/close/error callbacks
  -> emit peer/connection-open even if connection.open is false

host lobby
  -> GameShell receives connection-open
  -> find or create guest LobbyPlayer
  -> mark guest connectionState connected
  -> update lobbyPlayers and room.players
  -> broadcast player-joined room state
  -> send can fail because channel is not open

true channel open
  -> PeerJS open callback fires later
  -> connectionOpenEmitted guard already true
  -> no second admission or lobby publication

host start
  -> Start run remains enabled without admitted-channel or all-ready proof
  -> bootstrap consumes current lobbyPlayers
  -> START_GAME and SYNC send only to open connections
  -> host can enter a run with a ghost participant

run
  -> accepted snapshots drive input, simulation, rendering, HUD and minimap
  -> no roster-admission revision or visible-frame receipt exists
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
PeerJS signalling and DataConnection transport
connection candidate, open, error, close and retirement
connection-to-actor binding and lobby-member admission
room-roster revision, fingerprint and start eligibility
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

## Data-channel admission findings

### Premature event

```txt
connection inserted into map: yes
open listener installed: yes
connection.open checked: yes
connection-open emitter then called unconditionally: yes
actual channel open required for event: no
```

### Session effect

```txt
host connection-open adds lobby member: yes
member marked connected: yes
room.players updated: yes
lobby publication attempted: yes
publication result checked or rolled back: no
roster revision or fingerprint: no
```

### True-open suppression

```txt
one-shot connectionOpenEmitted set by premature event: yes
later actual open invokes same guard: yes
second admission/publication occurs: no
```

### Error and close

```txt
close removes transport map record: yes
close event removes roster member through GameShell: yes
error removes transport map record: no
error removes roster member: no
error can be terminal without close policy: unspecified
```

### Start

```txt
host Start run button always available: yes
all-ready requirement: no
all-remote-channels-admitted requirement: no
bootstrap uses current lobbyPlayers: yes
broadcast skips unopened connections: yes
```

## Concrete failure paths

```txt
never-open connection
  -> guest already visible and stored
  -> player-joined broadcast can reach zero clients
  -> no typed rejection removes guest

error without close
  -> connection remains in map
  -> guest remains connected in roster

host start during opening
  -> bootstrap contains guest
  -> START_GAME and SYNC skip guest connection
  -> host run and client route diverge
```

## Missing authority

```txt
connection candidate identity
connection generation
data-channel open observation
open admission result
remote identity claim
connection-to-actor binding result
lobby-member admission command/result
roster revision and fingerprint
atomic room membership commit
lobby publication delivery result
start eligibility result
error-only terminal retirement
ghost-member reconciliation
first visible lobby-roster frame acknowledgement
```

## Required parent domain

```txt
corridor-data-channel-roster-admission-authority-domain
```

## Candidate kits

```txt
connection-candidate-id-kit
connection-generation-kit
data-channel-state-kit
data-channel-open-observation-kit
connection-open-admission-kit
connection-open-result-kit
actor-identity-claim-kit
connection-actor-binding-kit
lobby-member-admission-kit
lobby-member-admission-result-kit
roster-revision-kit
roster-fingerprint-kit
room-membership-commit-kit
lobby-broadcast-result-kit
start-eligibility-kit
connection-error-retirement-kit
connection-close-retirement-kit
ghost-member-reconciliation-kit
connection-observation-kit
connection-journal-kit
first-lobby-roster-frame-ack-kit
premature-peerjs-open-fixture-kit
never-open-connection-fixture-kit
open-after-delay-fixture-kit
error-without-close-fixture-kit
start-with-unadmitted-peer-fixture-kit
```

## Required flow

```txt
AdmitLobbyMemberCommand
  -> allocate candidate identity and generation
  -> observe actual channel-open state
  -> validate current session and transport generations
  -> validate remote identity claim
  -> bind connection to actor/member
  -> derive candidate roster revision and fingerprint
  -> atomically commit room and lobbyPlayers
  -> publish typed admission and lobby-delivery results
  -> evaluate sealed start eligibility
  -> acknowledge first visible lobby frame
```

## Current audit family

```txt
.agent/trackers/2026-07-12T14-22-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T14-22-01-04-00.md
.agent/architecture-audit/2026-07-12T14-22-01-04-00-data-channel-roster-admission-dsk-map.md
.agent/render-audit/2026-07-12T14-22-01-04-00-premature-roster-visible-lobby-gap.md
.agent/gameplay-audit/2026-07-12T14-22-01-04-00-ghost-member-start-bootstrap-loop.md
.agent/interaction-audit/2026-07-12T14-22-01-04-00-connection-open-member-admission-map.md
.agent/connection-admission-audit/2026-07-12T14-22-01-04-00-channel-open-binding-roster-contract.md
.agent/deploy-audit/2026-07-12T14-22-01-04-00-peerjs-admission-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, package scripts, dependencies and deployment were not changed. No browser, delayed-open, never-open, error-only, ghost-member or visible-roster fixture was run.
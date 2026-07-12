# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-12T14-22-01-04-00`  
**Status:** `data-channel-open-roster-admission-authority-audited`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates a PeerJS data-channel admission defect. The host records a new `DataConnection`, installs its callbacks and then emits `peer/connection-open` unconditionally, even when `connection.open` is still false. `GameShell` treats that event as proof of a connected lobby member, mutates the room roster and attempts a lobby broadcast. The broadcast can send to zero recipients because the channel is not open, while the one-shot event guard prevents a second admission when the channel actually opens.

## Plan ledger

**Goal:** separate connection candidates from admitted lobby members so no player enters the authoritative roster, start bootstrap or visible lobby until an open data channel and actor binding are proven.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories against central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Verify root `.agent/START_HERE.md` state for all nine eligible repositories.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` under the oldest eligible central-ledger rule.
- [x] Read current repo-local audit routing and machine registry.
- [x] Read `createHost.ts`, `createClient.ts`, `peerEvents.ts`, `peerTypes.ts`, `GameShell.tsx`, `sessionStore.ts`, `LobbyScreen.tsx` and `package.json`.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Preserve the 29 implemented kit surfaces and offered services.
- [x] Define a data-channel-open and roster-admission authority.
- [x] Add architecture, render, gameplay, interaction, connection-admission and deploy audits.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Update central tracking on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable admission fixtures remain future work.

## Organization comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-12T12-21-38-04-00 selected
ZombieOrchard      2026-07-12T12-39-25-04-00
MyCozyIsland       2026-07-12T12-58-08-04-00
TheUnmappedHouse   2026-07-12T13-08-15-04-00
AetherVale         2026-07-12T13-20-00-04-00
TheOpenAbove       2026-07-12T13-29-56-04-00
IntoTheMeadow      2026-07-12T13-54-00-04-00
PhantomCommand     2026-07-12T13-59-50-04-00
PrehistoricRush    2026-07-12T14-10-22-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` was modified in the Publish organization.

## Complete interaction loop

```txt
browser route
  -> choose solo, host or client

host lobby
  -> create room and host PeerJS adapter
  -> receive PeerJS DataConnection candidate
  -> insert candidate into connection map immediately
  -> install open/data/close/error handlers
  -> emit peer/connection-open unconditionally
  -> GameShell adds remote peer to authoritative lobby roster
  -> GameShell broadcasts player-joined
  -> send can fail because connection.open is false
  -> later actual open is suppressed by one-shot event guard

client lobby
  -> create client adapter and request host connection
  -> signalling peer open and data-channel open share one coarse connected status
  -> protocol messages update room and roster when delivered

host start
  -> Start run remains available without admitted-channel or readiness proof
  -> bootstrap uses current lobbyPlayers, including premature or ghost members
  -> START_GAME and SYNC are broadcast only to currently open channels

run
  -> accepted snapshots drive simulation, input, rendering, HUD and minimap
  -> no roster-admission revision or first admitted-roster frame receipt exists
```

## Domains in use

```txt
application shell and route selection
UI loading, lobby, pause, completion and terminal projection
session mode, room, roster, readiness and reset
peer, player, member and actor identity
transport capability and mode selection
BroadcastChannel local bridge
PeerJS signalling and DataConnection lifecycle
connection candidate, open, error, close and retirement
lobby-member admission and room-roster revision
protocol construction, serialization and message admission
loading, start bootstrap and run lifecycle
browser clocks and simulation cadence
seeded maze topology and snapshot construction
snapshot publication, acceptance and delivery
keyboard, mouse, pointer lock, focus and input lifecycle
movement, collision, camera and host admission
cube interactions, anomaly sequence and ooze pressure
Three.js world, post-processing, bloom and disposal
render-surface sizing and visible-frame correlation
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
peer-host-transport-kit                PeerJS host, local bridge, connection map, broadcast, send and destroy
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

## Source-backed finding

### Premature host admission

`createHost.ts` performs this sequence for a PeerJS connection:

```txt
setConnectionRecord(connection)
register connection.on("open")
if connection.open, emit open
emit open unconditionally
```

The unguarded final call makes `peer/connection-open` an observation of candidate creation, not proof of an open data channel.

### Roster mutation

`GameShell.tsx` consumes host `peer/connection-open` as authoritative membership:

```txt
find or create guest
upsertLobbyPlayer(connectionState = connected)
broadcast player-joined room state
```

The room and visible player count therefore advance before the transport is usable.

### Lost true-open transition

The local `connectionOpenEmitted` guard is set by the premature event. When PeerJS later emits the real `open` callback, the handler returns without re-admitting or re-broadcasting the player.

### Ghost-member paths

```txt
connection never opens
  -> guest already remains in room
  -> broadcast delivered to zero open channels
  -> no typed rejection removes the guest

connection emits error without close
  -> error event does not remove connection map entry
  -> GameShell does not remove roster member on peer/error

host starts run
  -> bootstrap includes premature member
  -> START_GAME and SYNC skip unopened channel
  -> host renders a run containing a player who never received the run
```

### UI admission gap

`LobbyScreen.tsx` always exposes the host Start run action. It does not require:

```txt
all remote members bound to open channels
all admitted members ready
roster revision sealed
connection generation current
initial lobby state acknowledged
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

## Required transaction

```txt
AdmitLobbyMemberCommand
  -> allocate connection candidate ID and generation
  -> observe actual DataConnection open state
  -> verify current transport and session generations
  -> validate remote peer identity claim
  -> bind one connection to one actor/member identity
  -> compute predecessor roster revision and fingerprint
  -> commit member and room membership atomically
  -> publish one LobbyMemberAdmissionResult
  -> broadcast the committed roster and capture delivery results
  -> enable start only from a sealed eligible roster
  -> acknowledge the first visible lobby frame for that roster revision

failure or stale candidate
  -> keep predecessor roster unchanged
  -> retire candidate connection and handlers
  -> publish rejection or retirement result
  -> prevent bootstrap and protocol publication from citing the candidate
```

## Required output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
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

```txt
runtime source changed: no
network behavior changed: no
gameplay behavior changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
browser multiplayer smoke: not run
PeerJS delayed-open fixture: unavailable
never-open fixture: unavailable
error-without-close fixture: unavailable
ghost-member start fixture: unavailable
first roster-frame receipt fixture: unavailable
```

No runtime connection-admission, roster-correctness, start-eligibility or multiplayer-frame claim is made.
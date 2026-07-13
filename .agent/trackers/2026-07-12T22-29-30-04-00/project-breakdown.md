# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-12T22-29-30-04-00`  
**Status:** `lobby-capacity-admission-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

This breakdown isolates lobby-capacity admission. `RoomState.maxPlayers` is always four, but all active member-intake paths and the runtime bootstrap accept arbitrary roster lengths. Capacity currently exists as descriptive data rather than an enforced invariant.

## Plan ledger

**Goal:** define one capacity policy and slot-reservation transaction that governs transport candidates, placeholders, roster state, protocol payloads, run bootstrap and visible player counts.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories against central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Verify central-ledger and root `.agent` coverage for all nine eligible repositories.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` as the oldest eligible repository.
- [x] Inspect room creation, connection admission, placeholders, Zustand state, protocol validation, bootstrap and lobby presentation.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Preserve all 29 implemented kit surfaces and offered services.
- [x] Define the lobby-capacity parent domain and candidate DSK composition.
- [x] Add architecture, render, gameplay, interaction, lobby-capacity and deployment audits.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime enforcement and executable capacity fixtures remain future work.

## Organization comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-12T20-20-02-04-00 selected
ZombieOrchard      2026-07-12T20-31-27-04-00
MyCozyIsland       2026-07-12T20-40-56-04-00
TheUnmappedHouse   2026-07-12T20-51-16-04-00
AetherVale         2026-07-12T21-15-06-04-00
TheOpenAbove       2026-07-12T21-31-40-04-00
IntoTheMeadow      2026-07-12T21-40-09-04-00
PhantomCommand     2026-07-12T22-15-00-04-00
PrehistoricRush    2026-07-12T22-18-39-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` was modified in the Publish organization.

## Complete interaction loop

```txt
browser route
  -> choose solo, host or client

host lobby
  -> create RoomState with maxPlayers = 4
  -> create host transport
  -> expose Start run and Add guest controls

network member path
  -> receive PeerJS connection-open or local client-connect
  -> create/find guest by remotePeerId
  -> upsert guest into lobbyPlayers and room.players
  -> publish player-joined room state

placeholder path
  -> host presses Add guest
  -> generate a unique guest-player ID
  -> append placeholder to lobbyPlayers and room.players

run path
  -> host presses Start run
  -> createInitialGameState receives complete lobbyPlayers array
  -> maps every player into gameplay actor state
  -> creates active room still declaring maxPlayers = 4
  -> broadcasts START_GAME and initial SYNC
  -> lobby, Three.js world, HUD and minimap render successor state
```

## Domains in use

```txt
application shell and route selection
UI loading lobby pause completion settings and terminal projection
session mode room roster readiness reset and identity
room join-code host identity and declared capacity
member candidates slot reservation admission rejection and retirement
PeerJS signalling and DataConnection lifecycle
BroadcastChannel local transport and packet admission
connection lease and actor binding
protocol construction serialization source admission and deduplication
lobby readiness start sealing and bootstrap
runtime lifecycle clocks cadence and frame scheduling
seeded maze topology and snapshot construction
snapshot publication acceptance delivery and backpressure
keyboard mouse pointer lock focus and input lifecycle
movement collision camera prediction and host admission
cube interactions anomaly sequence and ooze pressure
Three.js world post-processing bloom and disposal
render-surface sizing and visible-frame correlation
HUD minimap status debug and observability
validation build deployment and central tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion, exit
corridor-session-domain-kit            identity, room, roster, connection, readiness, reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags, readiness
ui-pause-projection-kit                pause state, reason, overlay
ui-completion-projection-kit           terminal state, message, timestamp, routing
complete-screen-presentation-kit       outcome presentation, restart, title exit
lobby-screen-presentation-kit          room, roster, ready state, controls
peer-host-transport-kit                PeerJS host, local bridge, connection maps, broadcast, send, disconnect, destroy
peer-client-transport-kit              PeerJS client, local bridge, connect, send, status, disconnect, destroy
peer-event-bus-kit                     typed transport events, subscription, cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit             encode, decode, version, structural shape validation
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly, initial snapshot
seeded-maze-rng-kit                    topology, placement, target sequence
first-person-input-kit                 keyboard, pointer lock, look, snapshots
movement-collision-camera-kit          movement, collision, eye pose, shake, camera
network-player-update-kit              sequence, cadence, pose envelope, host consume
corridor-interaction-domain-kit        pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit           ordered slots, validation, victory
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity, pressure
snapshot-outcome-routing-kit           snapshot state to UI outcome
corridor-authoritative-publication-kit tick, clone, SYNC, broadcast
corridor-animation-loop-kit            RAF start/stop, delta, elapsed, successor scheduling
corridor-render-world-kit              terrain, maze, objects, actors, lights, update, disposal
corridor-post-processing-kit           composer, bloom, sizing, render, disposal
corridor-minimap-kit                   maze, players, cubes, ooze, heading
runtime-debug-frame-kit                activation, bounded capture, overlay, export
runtime-resource-cleanup-kit           loop, subscriptions, listeners, observers, GPU cleanup
package-validation-kit                 build, lint, harness, visual, live-player checks
```

## Source-backed finding

```txt
makeRoomState maxPlayers: 4
createInitialGameState active room maxPlayers: 4
host connection-open capacity guard: absent
local client-connect capacity guard: absent
host placeholder capacity guard: absent
sessionStore capacity invariant: absent
protocol players.length relation guard: absent
bootstrap roster limit: absent
visible capacity/full-state projection: absent
```

`GameShell` upserts every unique host-side connection as a connected guest. `addGuestPlaceholder()` also appends a new unique guest every time. `sessionStore` synchronizes those arrays into `room.players` without consulting `room.maxPlayers`.

`createInitialGameState()` maps every source player into an actor and writes all source players into an active room that still declares a maximum of four. Protocol decoding verifies that `maxPlayers` is finite and every player is structurally valid, but does not verify `players.length <= maxPlayers`.

## Concrete failure paths

### Fifth network member

```txt
four players committed
  -> fifth unique connection-open
  -> upsertLobbyPlayer accepts member
  -> room.players length becomes five
```

### Placeholder overflow

```txt
host presses Add guest repeatedly
  -> each request gets a unique ID
  -> every request appends a roster member
  -> declared maximum is ignored
```

### Contradictory active state

```txt
over-capacity lobby
  -> Start run
  -> bootstrap maps all members
  -> active room maxPlayers remains four
  -> START_GAME and SYNC distribute players.length > maxPlayers
```

## Required parent domain

```txt
corridor-lobby-capacity-admission-authority-domain
```

## Candidate DSK composition

```txt
room-capacity-policy-kit
lobby-slot-id-kit
lobby-slot-reservation-kit
lobby-member-candidate-kit
lobby-member-source-classification-kit
lobby-capacity-revision-kit
lobby-capacity-fingerprint-kit
lobby-member-identity-uniqueness-kit
lobby-connection-lease-capacity-kit
placeholder-member-admission-kit
lobby-capacity-result-kit
lobby-roster-commit-kit
lobby-slot-release-kit
lobby-capacity-rejection-observation-kit
lobby-capacity-journal-kit
bootstrap-roster-capacity-gate-kit
protocol-room-capacity-validation-kit
first-capacity-consistent-frame-ack-kit
remote-fifth-player-fixture-kit
local-bridge-fifth-player-fixture-kit
placeholder-capacity-fixture-kit
duplicate-member-no-capacity-consumption-fixture-kit
reservation-cancel-release-fixture-kit
over-capacity-protocol-rejection-fixture-kit
capacity-valid-bootstrap-fixture-kit
```

## Required transaction

```txt
LobbyMemberAdmissionCommand
  -> bind room generation and expected roster revision
  -> classify candidate source
  -> validate identity and live transport ownership
  -> atomically reserve one available slot
  -> return Full, Duplicate, Stale or Rejected with zero roster mutation
  -> commit one canonical member and successor roster revision
  -> consume or release reservation exactly once
  -> seal a capacity-valid start roster
  -> reject over-capacity protocol and bootstrap inputs
  -> acknowledge first visible frame citing capacity revision
```

## Files added

```txt
.agent/trackers/2026-07-12T22-29-30-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T22-29-30-04-00.md
.agent/architecture-audit/2026-07-12T22-29-30-04-00-lobby-capacity-admission-dsk-map.md
.agent/render-audit/2026-07-12T22-29-30-04-00-over-capacity-roster-visible-state-gap.md
.agent/gameplay-audit/2026-07-12T22-29-30-04-00-over-capacity-bootstrap-loop.md
.agent/interaction-audit/2026-07-12T22-29-30-04-00-member-capacity-admission-map.md
.agent/lobby-capacity-audit/2026-07-12T22-29-30-04-00-max-player-reservation-commit-contract.md
.agent/deploy-audit/2026-07-12T22-29-30-04-00-lobby-capacity-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, package scripts, dependencies and deployment were unchanged. No runtime commands or capacity fixtures were run.

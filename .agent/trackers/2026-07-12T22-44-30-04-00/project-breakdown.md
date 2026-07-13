# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-12T22-44-30-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Mode:** documentation and central-ledger reconciliation only

## Summary

HorrorCorridor was selected because a complete repo-local lobby-capacity audit at `2026-07-12T22-29-30-04-00` was newer than the central ledger, which still pointed to the earlier local-bridge packet audit. The current source declares a four-player room but does not enforce that limit at remote connection, local bridge, placeholder, store, protocol or bootstrap boundaries.

## Plan ledger

**Goal:** reconcile the newest repo-local audit into the central ledger while preserving one complete source-backed interaction, domain, kit and service inventory and defining the next authoritative capacity boundary.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/`.
- [x] Confirm all nine eligible repositories have central-ledger files and root `.agent` state.
- [x] Detect HorrorCorridor repo-local capacity documentation newer than its central ledger.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor`.
- [x] Preserve the complete interaction loop and active domain map.
- [x] Preserve all 29 implemented kits and their offered services.
- [x] Reconcile the lobby-capacity DSK, render, gameplay, interaction and deploy findings.
- [x] Add a new timestamped tracker and turn-ledger entry.
- [ ] Implement reservation, admission, atomic roster commit and focused runtime fixtures.

## Organization comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor
  central: 2026-07-12T20-20-02-04-00
  repo-local: 2026-07-12T22-29-30-04-00
  state: newer repo-local audit, selected

ZombieOrchard      central 2026-07-12T20-31-27-04-00
MyCozyIsland       central 2026-07-12T20-40-56-04-00
TheUnmappedHouse   central 2026-07-12T20-51-16-04-00
AetherVale         central 2026-07-12T21-15-06-04-00
TheOpenAbove       central 2026-07-12T21-31-40-04-00
IntoTheMeadow      central 2026-07-12T21-40-09-04-00
PhantomCommand     central 2026-07-12T22-15-00-04-00
PrehistoricRush    central 2026-07-12T22-18-39-04-00
TheCavalryOfRome   excluded
```

Only HorrorCorridor is in scope for this run.

## Interaction loop

```txt
browser route
  -> choose solo, host or client

host setup
  -> allocate room and identities
  -> declare maxPlayers = 4
  -> create PeerJS host and/or local BroadcastChannel bridge
  -> publish lobby state and host controls

member intake
  -> remote connection-open, local client-connect or Add guest request
  -> create a candidate player
  -> upsert candidate into lobbyPlayers and room.players
  -> no slot reservation or capacity result
  -> visible lobby can exceed four members

run start
  -> host presses Start run
  -> loading transition builds candidate bootstrap
  -> createInitialGameState maps every supplied lobby member
  -> room still advertises maxPlayers = 4
  -> START_GAME and SYNC publish the contradictory roster

active frame
  -> input and movement update
  -> interactions, anomaly and ooze update
  -> authoritative snapshot publication
  -> Three.js world, bloom, HUD and minimap render successor state
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session room roster identity readiness and reset
room join-code host identity and declared capacity
lobby member candidate reservation admission and retirement
transport mode reachability and lifecycle
PeerJS signalling and DataConnection ownership
BroadcastChannel namespace and local transport
local packet schema capability generation and sequencing
connection lease actor binding and retirement
protocol construction serialization source admission and deduplication
lobby membership readiness start and bootstrap
runtime lifecycle clock cadence and frame scheduling
seeded maze topology and deterministic bootstrap
snapshot publication acceptance delivery and backpressure
keyboard pointer lock focus and input lifecycle
movement collision camera prediction and host admission
cube interactions anomaly sequence and ooze pressure
Three.js world post-processing render surface and disposal
HUD minimap connection status debug and visible-frame proof
validation deployment and central audit tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit
  routing, solo entry, host entry, client entry, loading, pause, completion, exit

corridor-session-domain-kit
  identity, room, roster, connection, readiness, reset

runtime-store-snapshot-kit
  authoritative snapshot, local pose, view, input flags, readiness

ui-pause-projection-kit
  pause state, reason and overlay projection

ui-completion-projection-kit
  terminal state, message, timestamp and routing

complete-screen-presentation-kit
  outcome presentation, restart and title exit

lobby-screen-presentation-kit
  room, roster, ready state and lobby controls

peer-host-transport-kit
  PeerJS host, BroadcastChannel bridge, connection map, broadcast, targeted send, disconnect, destroy

peer-client-transport-kit
  PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy

peer-event-bus-kit
  typed transport events, subscription and cleanup

protocol-message-construction-kit
  START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT construction

protocol-serialization-kit
  encode, decode, protocol version and structural shape validation

maze-snapshot-bootstrap-kit
  seed, maze, players, cubes, anomaly and initial snapshot

seeded-maze-rng-kit
  topology, placement and target sequence

first-person-input-kit
  keyboard, pointer lock, look and input snapshots

movement-collision-camera-kit
  movement, collision, eye pose, shake and camera

network-player-update-kit
  sequence, cadence, pose envelope and host consume

corridor-interaction-domain-kit
  pickup, drop, place, remove and held-cube synchronization

ordered-anomaly-sequence-kit
  ordered slots, sequence validation and victory

ooze-trail-domain-kit
  spawn, decay, variation, spacing, population capacity and pressure

snapshot-outcome-routing-kit
  authoritative snapshot to UI outcome routing

corridor-authoritative-publication-kit
  tick, clone, SYNC and broadcast publication

corridor-animation-loop-kit
  RAF start, stop, delta, elapsed and successor scheduling

corridor-render-world-kit
  terrain, maze, objects, actors, lights, update and disposal

corridor-post-processing-kit
  composer, bloom, resize, render and disposal

corridor-minimap-kit
  maze, players, cubes, ooze and heading projection

runtime-debug-frame-kit
  activation, bounded capture, overlay and export

runtime-resource-cleanup-kit
  loop, subscriptions, listeners, observers and GPU cleanup

package-validation-kit
  build, lint, harness, visual checks and live-player checks
```

## Source-backed capacity findings

```txt
room maxPlayers declaration: 4
remote connection-open capacity check: absent
local client-connect capacity check: absent
Add guest capacity check: absent
session-store capacity invariant: absent
protocol players.length <= maxPlayers relation check: absent
bootstrap roster-capacity check: absent
bootstrap maps every supplied player: yes
visible count/max/full projection: incomplete
slot reservation and capacity revision: absent
first capacity-consistent frame acknowledgement: absent
```

## Concrete failure path

```txt
four members are already present
  -> a fifth unique remote, local or placeholder member is introduced
  -> roster mutation accepts the member
  -> room.players and lobbyPlayers exceed maxPlayers
  -> host starts the run
  -> bootstrap creates an actor for every supplied member
  -> START_GAME and SYNC distribute the contradictory state
  -> lobby, HUD, minimap and world can present more actors than room policy allows
```

## Required parent domain

```txt
corridor-lobby-capacity-admission-authority-domain
```

## Required transaction

```txt
LobbyMemberAdmissionCommand
  -> bind room ID, room generation, transport generation and expected roster revision
  -> classify PeerJS, local bridge, placeholder, restore or migration source
  -> validate candidate identity and live connection ownership
  -> reserve one slot against the current capacity revision
  -> return Accepted, Full, Duplicate, Stale, Cancelled, Invalid or Failed
  -> commit one canonical member and successor roster revision atomically
  -> consume or release the reservation exactly once
  -> reject over-capacity store and protocol payloads with zero mutation
  -> allow start only from a sealed capacity-valid roster
  -> publish count, remaining slots and capacity fingerprint
  -> acknowledge the first matching lobby and gameplay frame
```

## Candidate authority kits

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

## Reconciled audit family

```txt
.agent/trackers/2026-07-12T22-44-30-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T22-44-30-04-00.md
.agent/architecture-audit/2026-07-12T22-44-30-04-00-lobby-capacity-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T22-44-30-04-00-capacity-visible-frame-central-reconciliation-gap.md
.agent/gameplay-audit/2026-07-12T22-44-30-04-00-over-capacity-bootstrap-central-reconciliation.md
.agent/interaction-audit/2026-07-12T22-44-30-04-00-member-capacity-central-reconciliation-map.md
.agent/lobby-capacity-audit/2026-07-12T22-44-30-04-00-reservation-policy-central-reconciliation-contract.md
.agent/deploy-audit/2026-07-12T22-44-30-04-00-capacity-central-reconciliation-fixture-gate.md
.agent/central-sync-audit/2026-07-12T22-44-30-04-00-repo-ledger-capacity-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, package scripts, dependencies and deployment are unchanged. No capacity enforcement, final-slot race safety, protocol integrity, bootstrap safety, visible-frame correlation or production-readiness claim is made.
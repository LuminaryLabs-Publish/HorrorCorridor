# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-13T03-38-31-04-00`  
**Status:** `client-join-attempt-admission-central-reconciled`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, cube interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

This reconciliation selects HorrorCorridor because its completed repo-local client-join audit at `2026-07-13T03-31-44-04-00` is newer than the central ledger. The client join form accepts unconstrained room-code and display-name strings. `enterClientLobby()` then publishes a provisional room, roster, peer identity, client-lobby route, `Joined room` overlay and networking readiness before any host-presence or room-admission acknowledgement. PeerJS has no attempt identity or bounded acknowledgement timeout. The local bridge reports connected immediately after a one-way `client-connect` packet.

## Plan ledger

**Goal:** keep one validated, revisioned and cancellable join-attempt authority between raw client intent and canonical room, roster, readiness or accepted-lobby presentation.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger`.
- [x] Confirm every eligible repository has root `.agent` state.
- [x] Detect HorrorCorridor repo-local documentation newer than central tracking.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor`.
- [x] Inspect `JoinMenu`, `GameShell`, client transport, local bridge and lobby projection.
- [x] Preserve the complete 29-kit service inventory.
- [x] Add a new timestamped reconciliation tracker and audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [x] Keep every write on `main`; create no branch or pull request.
- [ ] Implement and execute the join-attempt authority and fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central eligible repositories: 1

HorrorCorridor     central 2026-07-13T01-08-28-04-00
                   repo-local 2026-07-13T03-31-44-04-00 selected
ZombieOrchard      2026-07-13T01-18-20-04-00
MyCozyIsland       2026-07-13T01-40-00-04-00
TheUnmappedHouse   2026-07-13T01-49-49-04-00
AetherVale         2026-07-13T02-15-51-04-00
TheOpenAbove       2026-07-13T02-18-03-04-00
IntoTheMeadow      2026-07-13T02-39-44-04-00
PhantomCommand     2026-07-13T02-49-07-04-00
PrehistoricRush    2026-07-13T03-20-58-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` was modified in the Publish organization.

## Complete interaction loop

```txt
browser route
  -> choose solo, host or client

client join intent
  -> edit unconstrained join-code and display-name inputs
  -> click Join lobby
  -> trim and uppercase the requested code
  -> substitute a generated code when blank
  -> generate client player and peer identities
  -> construct a provisional room with no host
  -> commit session mode, peer identity, room and provisional roster
  -> route to LOBBY_CLIENT
  -> display Joined room <code>
  -> mark networking readiness true
  -> create client transport and call connectToHost()

PeerJS path
  -> open signalling peer
  -> create DataConnection
  -> await open, error or close without an attempt deadline
  -> unscoped transport events mutate shared connection state

local bridge path
  -> create BroadcastChannel from the requested code
  -> post client-connect
  -> immediately publish connection-open and connected
  -> require no host-presence or member-admission acknowledgement

consumer path
  -> lobby projects provisional room, roster and connection status
  -> START_GAME, SYNC or LOBBY_EVENT may later replace room and roster
  -> gameplay, HUD, minimap and Three.js world consume successor state

cancel or retry
  -> Back destroys transport and clears stores
  -> no JoinAttemptId, generation, typed terminal result,
     cancellation receipt or late-event quarantine exists
```

## Domains in use

```txt
application shell and screen routing
UI join loading lobby pause completion settings and terminal projection
session mode room roster peer identity connection readiness and reset
client join intent normalization validation admission cancellation retry and timeout
room join-code host identity capacity membership and lifecycle
transport mode reachability and lifecycle
PeerJS signalling DataConnection ownership and callback lifetime
BroadcastChannel namespace local bridge packet admission and cleanup
protocol construction serialization structural decoding and semantic admission
message identity source room actor revision and request correlation
lobby membership readiness start and deterministic bootstrap
runtime lifecycle clock cadence and frame scheduling
seeded maze topology placement and initial snapshot construction
snapshot publication acceptance delivery ordering and backpressure
keyboard pointer-lock focus and input lifecycle
movement collision camera prediction and host admission
cube interaction anomaly sequence terminal outcome and ooze pressure
Three.js world post-processing render surface resize and disposal
HUD minimap connection status debug and visible-frame proof
validation deployment and central audit tracking
```

## Implemented kits and offered services

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
protocol-serialization-kit: encode, decode, protocol version, structural shape validation
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
corridor-post-processing-kit: composer, bloom, sizing, render, disposal
corridor-minimap-kit: maze, players, cubes, ooze, heading
runtime-debug-frame-kit: activation, bounded capture, overlay, export
runtime-resource-cleanup-kit: loop, subscriptions, listeners, observers, GPU cleanup
package-validation-kit: build, lint, harness, visual and live-player checks
```

## Source-backed findings

```txt
JoinMenu join-code maxlength or pattern: absent
JoinMenu display-name maxlength or policy: absent
shared generated/requested join-code schema: absent
blank requested code creates an unrelated generated code: yes
provisional room committed before host acknowledgement: yes
provisional roster committed before host acknowledgement: yes
client lobby displayed before host acknowledgement: yes
Joined room overlay displayed before host acknowledgement: yes
networking readiness true before member admission: yes
join attempt identity or generation: absent
bounded PeerJS transport-open or host-ack timeout: absent
host-presence challenge and acknowledgement: absent
room-membership acknowledgement: absent
local bridge one-way post reports connected: yes
connectToHost boolean treated as admission result: no typed result
cancellation and rollback receipt: absent
late predecessor event quarantine: absent
first accepted-lobby visible-frame acknowledgement: absent
```

## Reachable failure paths

### Unknown room

```txt
request room X
  -> provisional room X and local player are committed
  -> UI says Joined room X
  -> no host is reached or admits the client
  -> no bounded RoomUnavailable or TimedOut result occurs
  -> provisional membership persists until manual exit or an unscoped event
```

### Local bridge false positive

```txt
BroadcastChannel is available
  -> client opens channel for room X
  -> posts client-connect
  -> no valid host listener acknowledges the request
  -> client still emits connection-open and connected
  -> lobby presents accepted-looking state without host proof
```

### Cancel and retry

```txt
attempt A begins
  -> user exits and starts attempt B
  -> callbacks carry no join-attempt generation
  -> a late A open, error or message can reach shared consumers
  -> B cannot prove which attempt owns the event
```

## Required parent domain

```txt
corridor-client-join-attempt-admission-authority-domain
```

## Required transaction

```txt
ClientJoinCommand
  -> validate runtime session and predecessor revision
  -> allocate JoinAttemptId and monotonic generation
  -> normalize and validate join code and display name
  -> retain a detached candidate without canonical room mutation
  -> select PeerJS or local bridge under explicit policy
  -> open transport under the attempt generation
  -> challenge host presence
  -> receive a source-admitted HostJoinAck
  -> validate canonical room, host, capacity and member admission
  -> return Accepted, InvalidInput, RoomUnavailable, RoomFull,
     Rejected, TransportUnavailable, TimedOut, Cancelled,
     Stale, Duplicate or Failed
  -> atomically commit accepted session, room, roster and readiness
  -> retire all provisional resources for non-accepted results
  -> quarantine late predecessor events
  -> publish bounded observations and journal evidence
  -> acknowledge the first visible lobby frame citing the accepted result
```

## Candidate kits

```txt
client-join-command-kit
join-attempt-id-kit
join-attempt-generation-kit
join-code-schema-kit
display-name-policy-kit
join-intent-normalization-kit
join-candidate-kit
join-attempt-state-kit
join-attempt-timeout-kit
join-attempt-cancellation-kit
join-transport-selection-kit
host-presence-challenge-kit
host-join-ack-kit
canonical-room-manifest-kit
join-result-kit
join-session-commit-kit
join-rollback-kit
join-late-event-quarantine-kit
join-observation-kit
join-journal-kit
first-joined-lobby-frame-ack-kit
invalid-code-fixture-kit
no-host-timeout-fixture-kit
cancel-retry-fixture-kit
stale-ack-fixture-kit
peerjs-local-bridge-join-parity-fixture-kit
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-13T03-38-31-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T03-38-31-04-00.md
.agent/architecture-audit/2026-07-13T03-38-31-04-00-client-join-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-13T03-38-31-04-00-accepted-join-visible-frame-central-reconciliation-gap.md
.agent/gameplay-audit/2026-07-13T03-38-31-04-00-provisional-client-lobby-central-reconciliation.md
.agent/interaction-audit/2026-07-13T03-38-31-04-00-join-command-result-central-reconciliation-map.md
.agent/join-attempt-audit/2026-07-13T03-38-31-04-00-attempt-generation-ack-central-reconciliation-contract.md
.agent/deploy-audit/2026-07-13T03-38-31-04-00-client-join-central-fixture-gate.md
.agent/central-sync-audit/2026-07-13T03-38-31-04-00-repo-ledger-client-join-reconciliation.md
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, package scripts, dependencies and deployment were not changed. No input-safety, host-presence, room-membership, bounded-timeout, cancellation, retry-isolation, transport-parity, visible-frame or production-readiness claim is made until focused fixtures pass on `main`.
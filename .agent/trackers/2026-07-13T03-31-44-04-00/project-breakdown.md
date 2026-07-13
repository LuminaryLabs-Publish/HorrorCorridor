# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-13T03-31-44-04-00`  
**Status:** `client-join-attempt-admission-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, cube interactions, ooze pressure, Three.js presentation, bloom, minimap and diagnostics.

This run isolates the client join-attempt boundary. The join form accepts unconstrained room-code and display-name strings. `enterClientLobby()` then constructs and publishes a provisional room, moves the user into the client lobby, displays `Joined room ...`, marks networking readiness true and starts transport connection before any host acknowledgement establishes that the room exists or that the client was admitted. PeerJS joining has no attempt identity, timeout or typed terminal result. The local bridge path reports `connected` immediately after posting a one-way `client-connect` packet.

## Plan ledger

**Goal:** make each client join one revisioned, cancellable attempt that validates input, proves host presence, receives a canonical room-admission acknowledgement and commits lobby state only after acceptance.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger`.
- [x] Verify all nine eligible repositories have root `.agent/START_HERE.md` state.
- [x] Confirm no new, ledger-missing, root-agent-missing or unsynchronized repository takes priority.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor`, the oldest eligible ledger entry.
- [x] Trace join form input, provisional session mutation, transport creation, local bridge and PeerJS connection paths, lobby projection and cancellation.
- [x] Preserve the complete 29-kit service inventory.
- [x] Add architecture, render, gameplay, interaction, join-attempt and deployment audits.
- [x] Refresh the root `.agent` entrypoints and machine registry.
- [x] Push documentation directly to `main`.
- [ ] Implement and prove the join-attempt authority.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

HorrorCorridor     2026-07-13T01-08-28-04-00 selected
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
  -> type arbitrary join-code and display-name strings
  -> trim and uppercase the join code
  -> substitute a generated code when blank
  -> create provisional client player and provisional room
  -> commit session mode, peer identity, room and roster
  -> show LOBBY_CLIENT and "Joined room <code>"
  -> mark networking readiness true
  -> create client transport and call connectToHost()

PeerJS path
  -> set status connecting
  -> create DataConnection
  -> wait without a bounded join-attempt timeout
  -> open, error, close or signalling events mutate shared status

local bridge path
  -> create BroadcastChannel from the requested code
  -> post one-way client-connect packet
  -> immediately emit connection-open and connected
  -> receive no required host-presence or room-admission acknowledgement

lobby projection
  -> show provisional room code, connection status and provisional roster
  -> accept host protocol messages when they arrive
  -> later START_GAME, SYNC or LOBBY_EVENT may replace room and roster

cancel or retry
  -> Back to title destroys transport and clears stores
  -> no typed JoinResult, attempt generation, cancellation receipt or late-ack quarantine exists
```

## Domains in use

```txt
application shell and screen routing
UI join loading lobby pause completion and terminal projection
session mode room roster peer identity readiness and reset
client join intent normalization validation admission cancellation and retry
room join-code host identity capacity and lifecycle
transport mode reachability and lifecycle
PeerJS signalling and DataConnection ownership
BroadcastChannel namespace local transport and packet admission
protocol construction serialization structural and semantic admission
message source room actor revision and request correlation
lobby membership readiness start and bootstrap
runtime lifecycle clock cadence and frame scheduling
seeded maze topology deterministic bootstrap and snapshot construction
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
protocol-serialization-kit: encode, decode, protocol version and structural shape validation
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
join-code input maxlength or pattern: absent
display-name maxlength or policy: absent
canonical host/client join-code schema shared: absent
provisional room committed before acknowledgement: yes
provisional roster committed before acknowledgement: yes
client lobby displayed before acknowledgement: yes
overlay says Joined room before acknowledgement: yes
networking readiness set true before connection acceptance: yes
join attempt ID or generation: absent
bounded PeerJS join timeout: absent
host-presence challenge/ack: absent
room-admission acknowledgement: absent
local bridge reports connected after one-way post: yes
typed join result: absent
join cancellation receipt: absent
late predecessor acknowledgement quarantine: absent
first accepted-lobby visible-frame acknowledgement: absent
```

## Reachable failure paths

### Unknown or unavailable room

```txt
client enters code X
  -> provisional room X is committed and displayed
  -> UI says Joined room X
  -> transport cannot reach or admit a host
  -> no bounded attempt timeout or rejection result occurs
  -> client remains in a provisional lobby until manual exit or an unscoped transport event
```

### Same-origin false positive

```txt
BroadcastChannel exists
  -> client creates channel for code X
  -> posts client-connect
  -> no host is listening, or host belongs to another lifecycle generation
  -> client immediately emits connection-open and connected
  -> lobby visually presents a connected join without host acknowledgement
```

### Retry predecessor event

```txt
attempt A begins
  -> user exits or retries as attempt B
  -> no join-attempt generation is attached to transport callbacks
  -> a late A event can reach shared connection status or message consumers
  -> B has no admission fence proving which attempt owns the event
```

## Required parent domain

```txt
corridor-client-join-attempt-admission-authority-domain
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

## Required transaction

```txt
ClientJoinCommand
  -> allocate JoinAttemptId and generation
  -> normalize and validate join code and display name
  -> retain a detached candidate without committing room or roster
  -> choose an explicit transport mode
  -> open transport under the attempt generation
  -> challenge host presence
  -> receive a source-admitted HostJoinAck
  -> validate canonical room, host, capacity and member admission
  -> return Accepted, InvalidInput, RoomUnavailable, Full,
     Rejected, TimedOut, Cancelled, Stale or Failed
  -> atomically commit accepted session, room and roster
  -> rollback all provisional resources for non-accepted results
  -> quarantine late predecessor events
  -> publish bounded observation and journal evidence
  -> acknowledge the first visible lobby frame citing the accepted attempt
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-13T03-31-44-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T03-31-44-04-00.md
.agent/architecture-audit/2026-07-13T03-31-44-04-00-client-join-attempt-admission-dsk-map.md
.agent/render-audit/2026-07-13T03-31-44-04-00-provisional-joined-lobby-visible-state-gap.md
.agent/gameplay-audit/2026-07-13T03-31-44-04-00-unacknowledged-client-join-loop.md
.agent/interaction-audit/2026-07-13T03-31-44-04-00-client-join-command-result-map.md
.agent/join-attempt-audit/2026-07-13T03-31-44-04-00-input-timeout-ack-cancel-contract.md
.agent/deploy-audit/2026-07-13T03-31-44-04-00-client-join-attempt-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed. No input-safety, host-presence, room-admission, timeout, cancellation, retry-isolation, transport-parity or visible-frame claim is made until focused fixtures pass on `main`.

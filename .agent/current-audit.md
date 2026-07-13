# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-13T03-38-31-04-00`  
**Branch:** `main`  
**Status:** `client-join-attempt-admission-central-reconciled`

## Summary

The repository retains a 29-kit browser runtime spanning application routing, sessions, lobby state, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is client join-attempt admission. Raw join input is weakly normalized, then provisional room, roster, peer identity, lobby projection and networking readiness are committed before any host-presence or room-admission acknowledgement. PeerJS joining has no bounded attempt timeout or typed result. The local bridge emits connection-open and connected immediately after sending a one-way `client-connect` packet.

## Plan ledger

**Goal:** require a typed, cancellable and generation-fenced join result before a client can commit canonical room membership or display an accepted lobby.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible repositories have root `.agent` state.
- [x] Detect HorrorCorridor repo-local audit state newer than central tracking.
- [x] Select only HorrorCorridor.
- [x] Read join input, client session mutation, transport connection and lobby projection code.
- [x] Preserve the complete interaction loop, active domains and 29-kit service census.
- [x] Add the timestamped central-reconciliation audit family.
- [x] Refresh all required root docs and the machine registry.
- [ ] Implement and prove client-join admission.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central eligible repositories: 1
selected repository: LuminaryLabs-Publish/HorrorCorridor
central timestamp before reconciliation: 2026-07-13T01-08-28-04-00
repo-local audit timestamp: 2026-07-13T03-31-44-04-00
reconciliation timestamp: 2026-07-13T03-38-31-04-00
```

## Complete interaction loop

```txt
browser route
  -> choose solo, host or client

client join
  -> enter arbitrary room code and display name
  -> trim/uppercase code and substitute generated code when blank
  -> generate client peer/player identity
  -> construct provisional room from requested code
  -> commit session, room and provisional roster
  -> show client lobby and Joined room overlay
  -> mark networking readiness true
  -> create client transport and call connectToHost()

PeerJS
  -> open signalling peer
  -> create DataConnection
  -> wait for open/error/close without bounded join timeout
  -> unscoped events mutate shared connection state

local bridge
  -> create BroadcastChannel from requested code
  -> post client-connect
  -> immediately emit connection-open and connected
  -> require no host acknowledgement

consumer path
  -> later START_GAME, SYNC or LOBBY_EVENT may replace room and roster
  -> lobby, world, HUD and minimap render successor state

cancel/retry
  -> Back destroys transport and clears stores
  -> no JoinAttemptId, generation, terminal receipt or late-event quarantine
```

## Domains in use

```txt
application shell and screen routing
UI join loading lobby pause completion settings and terminal projection
session mode room roster identity readiness and reset
client join intent validation admission cancellation retry and timeout
room join-code host identity capacity membership and lifecycle
transport mode reachability and lifecycle
PeerJS signalling and DataConnection ownership
BroadcastChannel namespace local transport and packet admission
protocol construction serialization structural decoding and semantic admission
message identity source room actor revision and request correlation
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
JoinMenu join-code maxlength/pattern: absent
JoinMenu display-name maxlength/policy: absent
shared generated/requested join-code schema: absent
blank input creates unrelated generated code: yes
provisional room committed before host acknowledgement: yes
provisional roster committed before host acknowledgement: yes
client lobby shown before host acknowledgement: yes
overlay claims Joined room before host acknowledgement: yes
networking readiness true before admission: yes
join attempt identity/generation: absent
PeerJS transport-open timeout: absent
host-presence timeout: absent
room-admission acknowledgement: absent
local bridge one-way post reports connected: yes
connectToHost result consumed as admission result: no
typed JoinResult: absent
cancellation/rollback receipt: absent
late predecessor event quarantine: absent
first accepted-lobby visible-frame acknowledgement: absent
```

## Concrete failure paths

```txt
unavailable requested room
  -> provisional room and local player are committed
  -> client lobby says Joined room
  -> no bounded room-unavailable or timeout result
  -> provisional membership remains until manual exit or an unscoped event
```

```txt
BroadcastChannel available but no matching host listener
  -> client posts client-connect
  -> client immediately emits connection-open and connected
  -> lobby presents connected state without host presence or admission proof
```

```txt
attempt A is cancelled and attempt B starts
  -> callbacks carry no JoinAttemptGeneration
  -> late A status, acknowledgement or message can reach shared consumers
  -> B cannot prove that the event belongs to its attempt
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
  -> validate session generation
  -> allocate attempt ID and generation
  -> normalize and validate code and name
  -> retain detached candidate
  -> select explicit transport mode
  -> open transport under attempt generation
  -> challenge host presence
  -> source-admit canonical HostJoinAck
  -> validate room capacity and member admission
  -> Accepted or typed non-accepted result
  -> atomic session commit or complete rollback
  -> late predecessor quarantine
  -> bounded observation and journal
  -> first accepted-lobby visible-frame acknowledgement
```

## Current file family

```txt
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

Documentation only. No runtime, networking, gameplay, rendering, package-script, dependency or deployment behavior changed.
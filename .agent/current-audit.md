# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-13T07-00-29-04-00`  
**Branch:** `main`  
**Status:** `cross-store-session-transition-authority-central-reconciled`

## Summary

The repository retains a 29-kit browser runtime spanning routing, sessions, lobby state, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is cross-store session transition coherence. Session, runtime and UI remain valid bounded domains, but `GameShell` coordinates them through sequential store setter calls. React subscribers can observe intermediate combinations, and no typed aggregate result proves that room, roster, identity, snapshot, readiness and screen state committed together.

## Plan ledger

**Goal:** require one revisioned command and terminal result for every transition that spans session, runtime and UI ownership.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible repositories have root `.agent` state.
- [x] Select HorrorCorridor as the oldest eligible central entry.
- [x] Read `GameShell`, session/runtime/UI stores, `GameCanvas` and `HUDOverlay`.
- [x] Preserve the complete interaction loop, domains and 29-kit service census.
- [x] Add the timestamped cross-store transition audit family.
- [x] Refresh all required root docs and the machine registry.
- [ ] Implement and prove atomic transition authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central eligible repositories: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
selection timestamp: 2026-07-13T07-00-29-04-00
```

## Complete interaction loop

```txt
local route or admitted network event
  -> GameShell calls independent session/runtime/UI actions
  -> each store immediately publishes its own successor revision
  -> components can render between participant mutations
  -> GameCanvas reads a runtime snapshot and fresh session state
  -> HUDOverlay combines independent UI, session and runtime selectors
  -> world, lobby, HUD, minimap and overlays project the observed combination
  -> no combined result or coherent-frame acknowledgement exists
```

## Concrete transition paths

### Host start

```txt
captured room and lobbyPlayers
  -> async loading steps
  -> create bootstrap
  -> setRoom
  -> setLobbyPlayers again
  -> setAuthoritativeSnapshot
  -> resetUi
  -> setScreen
  -> setGameScreen
  -> setPaused
  -> setOverlay
  -> setReadiness
  -> broadcast START_GAME
  -> broadcast SYNC separately
```

### Client adoption

```txt
START_GAME
  -> room and roster
  -> host identity and connection
  -> prior/null snapshot, route and readiness remain

SYNC
  -> room and roster again
  -> authoritative snapshot
  -> playing, paused or completed UI
  -> readiness
```

## Domains in use

```txt
application shell and route lifecycle
session mode room roster peer identity connection and reset
runtime snapshot pose input readiness and cadence
UI screen game-screen overlay pause completion and hints
cross-store transition identity revision preparation commit rollback and proof
client join host start lobby readiness and run bootstrap
PeerJS BroadcastChannel and protocol message handling
seeded maze and replicated state
input movement collision camera and prediction
cube interactions anomaly sequence and ooze pressure
Three.js world post-processing minimap HUD and diagnostics
cleanup validation build Pages deployment and central tracking
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
package-validation-kit: build, lint, harness, visual, live-player checks
```

## Source-backed findings

```txt
aggregate transition command/result: absent
transition identity and generation: absent
expected participant revisions: absent
session/runtime/UI prepare receipts: absent
atomic multi-store commit: absent
rollback result: absent
setRoom already synchronizes room.players and lobbyPlayers: yes
redundant setLobbyPlayers calls after setRoom: yes
redundant call rewrites room.updatedAt: yes
START_GAME/SYNC shared transition identity: absent
host local commit precedes two separate broadcasts: yes
GameCanvas session/snapshot coherence check: absent
HUDOverlay shared revision envelope: absent
readiness derived from aggregate commit: no
first coherent visible-frame acknowledgement: absent
```

## Required parent domain

```txt
corridor-cross-store-session-transition-authority-domain
```

## Candidate kits

```txt
session-transition-command-kit
transition-id-kit
transition-generation-kit
participant-revision-kit
transition-precondition-kit
session-transition-candidate-kit
runtime-transition-candidate-kit
ui-transition-candidate-kit
room-roster-coherence-kit
snapshot-room-coherence-kit
identity-snapshot-binding-kit
screen-snapshot-coherence-kit
readiness-derivation-kit
participant-prepare-result-kit
participant-commit-result-kit
participant-rollback-kit
cross-store-transition-result-kit
start-sync-correlation-kit
transition-late-event-quarantine-kit
transition-journal-kit
transition-observation-kit
coherent-frame-envelope-kit
first-coherent-frame-ack-kit
cross-store-zero-partial-fixture-kit
start-sync-order-fixture-kit
completion-transition-fixture-kit
```

## Required transaction

```txt
SessionTransitionCommand
  -> allocate transition identity and generation
  -> validate expected participant revisions
  -> construct detached candidates
  -> validate cross-domain invariants
  -> prepare every participant without publication
  -> commit all participant revisions or none
  -> publish terminal CrossStoreTransitionResult
  -> correlate START_GAME and SYNC
  -> derive readiness from the committed result
  -> render and acknowledge one coherent frame
```

## Current file family

```txt
.agent/trackers/2026-07-13T07-00-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T07-00-29-04-00.md
.agent/architecture-audit/2026-07-13T07-00-29-04-00-cross-store-session-transition-authority-dsk-map.md
.agent/render-audit/2026-07-13T07-00-29-04-00-cross-store-visible-state-coherence-gap.md
.agent/gameplay-audit/2026-07-13T07-00-29-04-00-multi-store-session-runtime-ui-transition-loop.md
.agent/interaction-audit/2026-07-13T07-00-29-04-00-transition-command-participant-result-map.md
.agent/state-transition-audit/2026-07-13T07-00-29-04-00-session-runtime-ui-atomic-commit-contract.md
.agent/deploy-audit/2026-07-13T07-00-29-04-00-cross-store-transition-fixture-gate.md
.agent/central-sync-audit/2026-07-13T07-00-29-04-00-repo-ledger-cross-store-transition-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, package-script, dependency or deployment behavior changed.
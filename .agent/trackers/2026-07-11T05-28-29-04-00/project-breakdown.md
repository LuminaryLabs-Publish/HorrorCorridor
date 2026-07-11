# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-11T05-28-29-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch:** `main`

## Summary

This pass documents a roster-identity defect at the lobby-to-run boundary. Synthetic guest placeholders are created as connected players, are not bound to a PeerJS connection, are not claimed when a real peer arrives, and are passed directly into deterministic bootstrap as active replicated players.

## Plan ledger

**Goal:** establish one authoritative lobby roster whose members have explicit source, peer binding, slot status, revision and bootstrap eligibility before the existing start transaction gate is implemented.

- [x] Compare the ten accessible `LuminaryLabs-Publish` repositories with the central ledger and repo-local audit state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor` as the oldest stable eligible repo-local audit after `TheOpenAbove` received a fresh Air Mail audit.
- [x] Read root `.agent` guidance and the latest lobby-start audit.
- [x] Trace placeholder creation, peer connection open/close, local ready mutation, roster storage and bootstrap consumption.
- [x] Identify the interaction loop, domains, implemented kits and offered services.
- [x] Define the roster-identity DSK boundary and deterministic fixture gate.
- [x] Add timestamped architecture, render, gameplay, interaction, roster, protocol and deploy audits.
- [x] Refresh required root `.agent` files.
- [x] Change no runtime source, dependency, script or deployment configuration.
- [x] Create no branch or pull request.

## Selection comparison

```txt
TheOpenAbove       fresh repo-local audit at 2026-07-11T05-25-29-04-00
HorrorCorridor     selected / oldest stable eligible audit at 2026-07-11T03-18-44-04-00
PhantomCommand     newer
ZombieOrchard      newer
TheUnmappedHouse   newer
AetherVale         newer
IntoTheMeadow      newer
PrehistoricRush    newer
MyCozyIsland       newer
TheCavalryOfRome   excluded
```

All nine eligible repositories were centrally tracked and had root `.agent` state. No new or missing repository took priority.

## Interaction loop

```txt
host enters lobby
  -> host is inserted as a connected LobbyPlayer
  -> Add guest creates a synthetic non-host LobbyPlayer
  -> synthetic player defaults to connectionState=connected
  -> no peerId, membership kind, slot id or placeholder flag is stored

real peer connects
  -> host searches roster by remotePeerId
  -> no placeholder has that id
  -> a second guest row is created
  -> placeholder remains

host starts run
  -> live lobbyPlayers array is passed to createInitialGameState
  -> every row becomes a gameplay player snapshot
  -> placeholder receives an active avatar without a transport owner
  -> snapshots, minimap and world rendering project it as a real participant
```

## Domains in use

```txt
application shell and screen routing
UI overlay, lobby, pause and completion projection
session mode, room, roster, readiness and connection state
lobby member identity and peer binding
PeerJS host/client transport and event bus
protocol envelopes and lobby events
roster mutation, revision and fingerprint authority
start admission and deterministic bootstrap
room, player, maze, cube, anomaly and ooze state
first-person input, movement, camera and prediction
interaction and ordered anomaly completion
authoritative snapshot publication and client replay
Three.js world, player avatars, minimap, HUD and bloom
runtime diagnostics, cleanup, validation and deployment
```

## Implemented kits and services

- `corridor-application-shell-kit`: screen routing, solo/host/client entry, pause, completion and exit callbacks.
- `corridor-session-domain-kit`: session mode, peer identity, room, roster, connection status and reset.
- `runtime-store-snapshot-kit`: authoritative snapshot, local pose, input/readiness state and reset.
- `ui-pause-projection-kit`: pause state and overlay projection.
- `lobby-screen-presentation-kit`: room metadata, roster rows, ready badges and lobby actions.
- `peer-host-transport-kit`: host peer, connection registry, broadcast, targeted send and destroy.
- `peer-client-transport-kit`: host connection, send, bridge, status and destroy.
- `peer-event-bus-kit`: transport events, subscriptions and cleanup.
- `protocol-message-construction-kit`: versioned START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- `maze-snapshot-bootstrap-kit`: deterministic maze, players, cubes, anomaly, room and initial snapshot.
- `first-person-input-kit`: keyboard, pointer lock, look and input snapshots.
- `movement-collision-camera-kit`: movement, collision, eye position, walk shake and camera.
- `network-player-update-kit`: client send, host consume, pose projection and cadence.
- `corridor-interaction-domain-kit`: pickup, drop, place, remove and held-cube synchronization.
- `ordered-anomaly-sequence-kit`: ordered validation, rollback and victory.
- `ooze-trail-domain-kit`: cadence, decay, spawn, spacing and capacity.
- `corridor-authoritative-publication-kit`: snapshot ticks, full sync and publication reason.
- `corridor-animation-loop-kit`: RAF lifecycle and delta calculation.
- `corridor-render-world-kit`: world construction, player avatars, updates and disposal.
- `corridor-post-processing-kit`: composer, bloom, output, resize and disposal.
- `corridor-minimap-kit`: maze, player, cube and anomaly markers.
- `runtime-debug-frame-kit`: bounded frames/events and JSON-safe export.
- `runtime-resource-cleanup-kit`: transport, listeners, world, renderer and canvas cleanup.
- `package-validation-kit`: build, lint, ProtoKit, harness, visual and live-player checks.

## Main finding

`LobbyPlayer` has no field that distinguishes a real connected participant from a synthetic slot. `addGuestPlaceholder()` creates a `guest-player-*` row with `connectionState: "connected"`; peer-open creates a separate row keyed by `remotePeerId`; peer-close removes only the real peer row; and bootstrap maps every remaining lobby row into an active gameplay player.

The result is a roster that can contain connected-looking participants with no transport identity, no command authority and no lifecycle owner.

## Required authority boundary

```txt
LobbyMemberRecord
  memberId
  memberKind: host-local | peer | reserved-slot
  peerId
  slotId
  connectionState
  readyState
  admittedForBootstrap
  joinedRevision
  lastChangedRevision

RosterAuthority
  bind peer to one member
  claim or release reserved slot explicitly
  reject duplicate peer/player bindings
  retain monotonic revision and fingerprint
  expose only admitted real members to bootstrap
  return typed mutation results
```

## Candidate kits

```txt
lobby-member-kind-kit
lobby-peer-binding-kit
lobby-slot-reservation-kit
lobby-member-admission-kit
lobby-member-claim-kit
lobby-member-removal-kit
lobby-roster-revision-kit
lobby-roster-fingerprint-kit
bootstrap-roster-filter-kit
lobby-roster-projection-kit
lobby-roster-authority-ledger-kit
lobby-roster-fixture-kit
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
3. Run Exit Commit + Session Epoch Message Admission Fixture Gate
4. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
5. Host Movement Admission + Client Reconciliation Fixture Gate
6. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Validation state

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
new roster fixture available: no
browser host/client smoke run: no
```
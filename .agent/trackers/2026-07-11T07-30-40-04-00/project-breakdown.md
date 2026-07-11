# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-11T07-30-40-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, predictive local movement, host snapshot publication, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded runtime debug readback.

This pass isolates an inbound actor-identity defect. Every host-side message event already identifies the actual transport connection through `remotePeerId` and `connectionId`, but gameplay dispatch ignores those fields and trusts the independently supplied protocol `senderId` and payload `playerId`.

## Plan ledger

**Goal:** establish one authoritative connection-to-member-to-player binding so every inbound command is admitted, rejected and observed against the real transport actor before it can mutate gameplay state.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked with root `.agent` state.
- [x] Select only `HorrorCorridor` under the oldest eligible fallback rule.
- [x] Read the current root audit state and existing roster, start, session, snapshot, movement and pause audit history.
- [x] Trace PeerJS and BroadcastChannel message provenance into `PeerTransportEvent`.
- [x] Trace protocol envelope decoding and host gameplay dispatch.
- [x] Trace player updates and interactions into state mutation and render projection.
- [x] Inventory all active domains, kits and offered services.
- [x] Add timestamped architecture, render, gameplay, interaction, transport, protocol and deploy audits.
- [x] Refresh the required root `.agent` documents and registry.
- [x] Change no runtime source, dependency, package script, network behavior, rendering or deployment configuration.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
selected: HorrorCorridor
excluded: TheCavalryOfRome
```

Current central timestamps reviewed before selection:

```txt
HorrorCorridor       2026-07-11T05-28-29-04-00 selected
PhantomCommand       newer than HorrorCorridor
ZombieOrchard        newer than HorrorCorridor
TheUnmappedHouse     newer than HorrorCorridor
AetherVale           newer than HorrorCorridor
IntoTheMeadow        2026-07-11T06-38-59-04-00
MyCozyIsland         2026-07-11T07-01-49-04-00
PrehistoricRush      2026-07-11T07-08-45-04-00
TheOpenAbove         2026-07-11T07-18-44-04-00
TheCavalryOfRome     excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` is changed in the Publish organization.

## Product interaction loop

```txt
title
  -> solo, host or client lobby
  -> room, roster, connection and readiness projection
  -> deterministic maze and gameplay bootstrap
  -> GameCanvas initializes renderer, world, input, transport listener and RAF
  -> client predicts local movement and sends PLAYER_UPDATE
  -> client derives an interaction and sends TRY_INTERACT
  -> host transport emits remotePeerId + connectionId + decoded message
  -> host dispatch ignores transport actor identity
  -> payload.playerId selects the mutable gameplay player
  -> host mutates state and publishes SYNC
  -> world, minimap, HUD and debug project the accepted mutation
```

## Actor-identity loop

```txt
connection A sends a message
  -> peer event identifies remotePeerId A and connectionId A
  -> envelope independently claims senderId B
  -> payload independently claims playerId C
  -> serializer accepts the message when each field has the correct primitive shape
  -> GameCanvas does not compare A, B and C
  -> playerId C is passed directly to movement or interaction rules
  -> any existing player C can be changed
  -> authoritative SYNC makes the mutation visible to every peer
```

## Domains in use

```txt
application shell and screen routing
UI overlay, pause, completion and settings projection
session mode, peer identity, room, roster, readiness and connection state
lobby member identity, peer binding, slot reservation and bootstrap admission
lobby readiness and start transaction
PeerJS host/client transport
BroadcastChannel local transport bridge
peer event bus and connection registry
transport connection identity and actor binding
versioned protocol envelopes, serializers and message construction
inbound envelope, room, session and actor admission
request identity, deduplication and sequence policy
seeded maze, room, player, cube, anomaly and ooze bootstrap
replicated room, app and gameplay state
pointer lock, keyboard, mouse, blur and input lifecycle
movement integration, collision, camera and walk shake
client prediction and player-update publication
host movement admission and authoritative correction
cube pickup, drop, placement, removal and held-cube synchronization
ordered anomaly validation, rollback and victory
ooze cadence, decay, spawn, spacing and capacity
authoritative snapshot construction and publication
client snapshot acceptance, replay and reconciliation
Three.js scene, terrain, maze, props, lights, cubes, players and ooze
animation loop, resize, canvas and frame ownership
post-processing composer, bloom and output
minimap, HUD and completion projection
runtime debug frames, events and JSON-safe export
resource disposal and React component cleanup
build, lint, ProtoKit, harness, visual and live-player validation
Next.js deployment surface
```

## Implemented kits and offered services

- **corridor-application-shell-kit:** route projection, solo/host/client entry, loading, pause, completion, lobby return and title exit.
- **corridor-session-domain-kit:** session mode, peer identity, room, lobby roster, connection status and session reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, view angles, input flags, readiness and runtime reset.
- **ui-pause-projection-kit:** pause state, pause reason and PLAYING/PAUSED overlay projection.
- **lobby-screen-presentation-kit:** room metadata, roster rows, readiness badges, controls and connection status.
- **peer-host-transport-kit:** host peer lifecycle, connection registry, broadcast, targeted send, local bridge and destroy.
- **peer-client-transport-kit:** host connection, send, local bridge, status, disconnect and destroy.
- **peer-event-bus-kit:** typed connection, message, status and error events with subscription cleanup.
- **protocol-message-construction-kit:** versioned START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encoding, structural decoding and protocol-version shape validation.
- **maze-snapshot-bootstrap-kit:** deterministic seed, maze, cubes, anomaly, active room, players and initial snapshot.
- **first-person-input-kit:** keyboard state, pointer lock, look accumulation and detached input snapshots.
- **movement-collision-camera-kit:** movement integration, maze collision, eye position, camera shake and camera projection.
- **network-player-update-kit:** client update construction, host update consumption, pose projection and cadence accounting.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered validation, rollback, terminal phase and victory.
- **ooze-trail-domain-kit:** cadence, decay, spawn, spacing guard and capacity guard.
- **corridor-authoritative-publication-kit:** snapshot tick, state cloning, SYNC construction, broadcast and publication reasons.
- **corridor-animation-loop-kit:** RAF start, stop, delta calculation and running-state protection.
- **corridor-render-world-kit:** terrain, maze, cubes, players, anomaly, ooze, props, lights, attach, update and disposal.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and disposal.
- **corridor-minimap-kit:** maze, local player, remote player, cube and anomaly projection.
- **runtime-debug-frame-kit:** bounded frame/event journals, overlay preferences and JSON-safe browser export.
- **runtime-resource-cleanup-kit:** RAF stop, transport unsubscribe, observer disconnect, listener removal, world/composer/renderer disposal and canvas removal.
- **package-validation-kit:** build, lint, ProtoKit smoke, deterministic harness, visual match, object-kit review and live-player validation.

## Source-backed findings

1. `PeerTransportEvent` carries `remotePeerId` and `connectionId` for every inbound message.
2. The protocol envelope separately carries `senderId`; PLAYER_UPDATE and TRY_INTERACT separately carry `payload.playerId`.
3. Structural decoding validates primitive shapes and protocol version, but not transport actor, room membership, sender/payload equality or connection ownership.
4. The host GameCanvas handler checks message type only. It ignores `remotePeerId`, `connectionId`, envelope `senderId`, envelope `roomId`, request identity and input sequence.
5. `applyNetworkPlayerUpdate()` accepts any existing `playerId` and replaces that player's pose and velocity.
6. `applyNetworkInteractionRequest()` acts for any supplied existing `playerId`.
7. Accepted mutations are immediately published as authoritative snapshots and rendered by all clients.
8. Rejections, conflicts and actor mismatches have no typed result or bounded observation row.

## Main finding

Transport provenance exists but is discarded before command admission. The host cannot prove that the peer connection sending a gameplay command owns the envelope sender or payload player identity.

This is both a correctness and trust-boundary defect. A stale identity, accidental client drift or crafted message can move another player, change a carried cube or interact on another player's behalf, then cause the host to publish that mutation as authoritative state.

## Required composed domain

```txt
horror-corridor-transport-actor-authority-domain
  -> transport-connection-identity-kit
  -> peer-player-binding-kit
  -> inbound-envelope-preflight-kit
  -> room-session-admission-kit
  -> actor-claim-resolution-kit
  -> sender-payload-consistency-kit
  -> connection-sequence-ledger-kit
  -> request-deduplication-kit
  -> message-admission-result-kit
  -> host-command-dispatch-kit
  -> rejected-message-observation-kit
  -> transport-identity-fixture-kit
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Transport Actor Binding + Sender/Payload Admission Fixture Gate
3. Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
4. Run Exit Commit + Session Epoch Message Admission Fixture Gate
5. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
6. Host Movement Admission + Client Reconciliation Fixture Gate
7. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Validation boundary

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm checks run: no
transport actor fixture: unavailable
sender/payload mismatch fixture: unavailable
connection replay fixture: unavailable
browser multi-peer actor smoke: not run
```

No transport identity, actor admission, gameplay safety or rendering correctness claim is made by this documentation-only pass.
# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T09-29-07-04-00`

## Status

```txt
status: runtime-readiness-provider-lease-generation-fence-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-11T09-29-07-04-00-horror-corridor-runtime-readiness-authority.md
```

## Product interaction loop

```txt
title
  -> solo, host or client admission
  -> GameShell creates session and predicts readiness
  -> snapshot and screen transition mount GameCanvas
  -> renderer, world, composer, input, transport subscription and RAF initialize
  -> GameCanvas patches readiness
  -> movement, interaction, network publication and rendering advance
  -> return to lobby or title changes screen and runtime state
  -> GameCanvas unmount cleanup patches readiness again
```

## Readiness ownership loop

```txt
GameShell writes requested/predicted capability booleans
  -> runtimeStore merges them without identity or revision
  -> GameCanvas creates actual providers
  -> GameCanvas writes another boolean patch
  -> resetRuntime may replace all values with false
  -> old GameCanvas cleanup writes another patch
  -> runtimeStore accepts it regardless of session or generation
```

## Domains in use

```txt
application shell and screen routing
UI overlay pause completion and settings projection
session mode peer identity room roster and connection state
runtime capability readiness and provider ownership
runtime session generation resource proof and revocation
lobby member identity peer binding slot reservation and bootstrap admission
lobby readiness and start transaction
PeerJS host/client transport
BroadcastChannel local transport bridge
peer event bus and connection registry
transport actor binding message admission request and sequence policy
versioned protocol envelopes serializers and message construction
seeded maze room player cube anomaly and ooze bootstrap
replicated app room and gameplay state
pointer lock keyboard mouse blur and input lifecycle
movement integration collision camera client prediction and host admission
cube interaction held-cube synchronization ordered anomaly and victory
ooze cadence decay spawn spacing and capacity
authoritative snapshot construction publication acceptance and replay
Three.js world player avatar minimap HUD bloom and completion projection
animation loop resize canvas frame and resource ownership
runtime debug observation cleanup validation and Next.js deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** routing, solo/host/client entry, loading, pause, completion, lobby return and title exit.
- **corridor-session-domain-kit:** session mode, peer identity, room, roster, connection status and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, view angles, input flags, readiness booleans and reset.
- **ui-pause-projection-kit:** pause state, reason and overlay projection.
- **lobby-screen-presentation-kit:** room metadata, roster, readiness badges, controls and connection status.
- **peer-host-transport-kit:** host peer, connection registry, broadcast, targeted send, local bridge and destroy.
- **peer-client-transport-kit:** host connection, send, local bridge, status, disconnect and destroy.
- **peer-event-bus-kit:** typed transport events, subscriptions and cleanup.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encoding, structural decoding and protocol/shape checks.
- **maze-snapshot-bootstrap-kit:** deterministic seed, maze, players, cubes, anomaly, room and snapshot.
- **first-person-input-kit:** keyboard state, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit:** movement, maze collision, eye position, walk shake and camera.
- **network-player-update-kit:** client send, host consume, pose projection and cadence.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered validation, rollback and victory.
- **ooze-trail-domain-kit:** cadence, decay, spawn, spacing and capacity.
- **corridor-authoritative-publication-kit:** snapshot tick, cloning, SYNC broadcast and reasons.
- **corridor-animation-loop-kit:** RAF start, stop, delta and running guard.
- **corridor-render-world-kit:** terrain, maze, cubes, players, anomaly, ooze, props, lights, attach, update and disposal.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and disposal.
- **corridor-minimap-kit:** maze, player, cube and anomaly markers.
- **runtime-debug-frame-kit:** bounded frames/events, overlay preferences and JSON-safe export.
- **runtime-resource-cleanup-kit:** RAF stop, unsubscribe, observer disconnect, listener removal, world/composer/renderer disposal and canvas removal.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object-kit review and live-player validation.

## Source findings

```txt
RuntimeReadiness contains only simulation rendering networking input booleans
setReadiness and patchReadiness accept unconditional replacement/merge writes
readiness has no sessionId runtimeGeneration revision providerId or proofId
enterSoloRun marks simulation rendering and input ready before GameCanvas initializes
startPlay marks simulation rendering and input ready before GameCanvas initializes
inbound SYNC marks all four capabilities ready from message receipt
GameCanvas initialization patches readiness after resources are created
returnToStart destroys transport and calls resetRuntime
GameCanvas unmount cleanup occurs after the route change
cleanup always patches networking true
cleanup is not fenced against a reset or replacement runtime generation
solo cleanup can report networking ready when no transport exists
provider initialization failure has no typed readiness failure or rollback transaction
```

## Main finding

Runtime readiness is currently a shared mutable projection rather than a committed capability ledger. Shell intent, protocol receipt, provider initialization and provider cleanup can all mutate the same four booleans.

Concrete stale-write path:

```txt
active run
  -> returnToStart()
  -> destroyTransport()
  -> resetRuntime() writes all readiness false
  -> GameCanvas unmount cleanup executes later
  -> patchReadiness({ simulation:false, rendering:false, networking:true, input:false })
  -> title state reports networking ready after reset
```

An old mount can also patch a newer session because no write carries a runtime generation.

## Candidate kits

```txt
runtime-session-identity-kit
runtime-generation-kit
readiness-capability-descriptor-kit
readiness-provider-lease-kit
resource-readiness-proof-kit
readiness-commit-transaction-kit
readiness-revocation-kit
simulation-readiness-adapter-kit
rendering-readiness-adapter-kit
networking-readiness-adapter-kit
input-readiness-adapter-kit
stale-cleanup-fence-kit
readiness-transition-journal-kit
readiness-debug-projection-kit
runtime-readiness-fixture-kit
```

## Required guarantees

```txt
shell request is not provider-ready
rendering readiness requires live render resources and first-frame proof
networking readiness reflects actual transport role and status
solo never reports networking ready
reset advances runtime generation before disposal
old-generation cleanup cannot change current readiness
partial setup failure revokes acquired leases in reverse order
cleanup and revocation are idempotent
one provider owns each ready capability
readiness debug exposes generation revision provider and proof
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Transport Actor Binding + Sender/Payload Admission Fixture Gate
3. Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
4. Run Exit Commit + Session Epoch Message Admission Fixture Gate
4a. Runtime Readiness Lease + Generation-Fenced Cleanup Fixture Gate
5. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
6. Host Movement Admission + Client Reconciliation Fixture Gate
7. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

Documentation only. This pass changed no runtime source, dependency, package script, network behavior, rendering or deployment configuration.
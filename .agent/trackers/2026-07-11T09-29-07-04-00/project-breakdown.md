# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-11T09-29-07-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch:** `main`

## Summary

`HorrorCorridor` has a source-backed runtime readiness store, but its four booleans are predictions rather than committed capability facts. `GameShell` can report simulation, rendering and input ready before `GameCanvas` creates the renderer, listeners or RAF. On exit, `resetRuntime()` can clear readiness and then an older `GameCanvas` cleanup can write `networking: true` back into the reset store.

The next bounded architecture gate is a generation-fenced runtime readiness lease that can only be committed by the provider owning the live resource and can only be revoked by that same runtime generation.

## Plan ledger

**Goal:** make runtime readiness a session-owned, resource-backed commit so stale mounts, failed initialization and late cleanup cannot publish false capability state.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Compare repo-local alignment timestamps after finding the central `TheOpenAbove` ledger lagged its newer repo-local audit.
- [x] Select only `HorrorCorridor` as the oldest eligible repo-local audit.
- [x] Read `AGENTS.md`, required root `.agent` files and prior network/session audits.
- [x] Trace readiness writes through `GameShell`, `GameCanvas` and `runtimeStore`.
- [x] Trace initialization, SYNC, return-to-lobby, return-to-title, reset and unmount ordering.
- [x] Identify the interaction loop, all active domains, implemented kits and offered services.
- [x] Define a runtime readiness lease and generation-fence DSK map.
- [x] Add timestamped architecture, render, gameplay, interaction, readiness and deployment audits.
- [x] Refresh required root `.agent` files and kit registry.
- [x] Push documentation only to `main`.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs` with a ledger update and internal change log.
- [ ] Runtime implementation and executable readiness fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
selected: HorrorCorridor
excluded: TheCavalryOfRome
```

Repo-local alignment timestamps used for fallback selection:

```txt
HorrorCorridor       2026-07-11T07-30-40-04-00 selected
PhantomCommand       2026-07-11T07-38-25-04-00
ZombieOrchard        2026-07-11T07-59-08-04-00
TheUnmappedHouse     2026-07-11T08-11-14-04-00
AetherVale           2026-07-11T08-18-31-04-00
IntoTheMeadow        2026-07-11T08-31-33-04-00
PrehistoricRush      2026-07-11T08-48-04-04-00
MyCozyIsland         2026-07-11T09-08-59-04-00
TheOpenAbove         2026-07-11T09-21-50-04-00
TheCavalryOfRome     excluded
```

## Product interaction loop

```txt
title
  -> choose solo, host or client
  -> GameShell creates or joins a session
  -> GameShell writes predicted readiness
  -> authoritative snapshot makes GameCanvas mountable
  -> GameCanvas creates renderer, scene, world, input, transport subscription and RAF
  -> GameCanvas patches readiness again
  -> movement, interaction, networking and rendering advance
  -> return to lobby or title mutates screen and readiness
  -> resetRuntime may clear readiness
  -> GameCanvas cleanup runs after unmount
  -> old cleanup patches networking true without a generation check
```

## Domains in use

```txt
application shell and screen routing
UI overlay pause completion and settings projection
session mode peer identity room roster readiness and connection state
runtime readiness and capability projection
runtime session generation and resource ownership
lobby member identity peer binding slot reservation and bootstrap admission
lobby readiness and start transaction
PeerJS host/client transport
BroadcastChannel local transport bridge
peer event bus and connection registry
transport actor binding and message admission
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

Missing authority domains:

```txt
runtime session identity
monotonic runtime generation
capability provider leases
resource-backed readiness evidence
atomic readiness commit and revocation
stale cleanup rejection
readiness transition journal
```

## Implemented kits and services

- **corridor-application-shell-kit:** routing, solo/host/client entry, loading, pause, completion, lobby return and title exit.
- **corridor-session-domain-kit:** session mode, peer identity, room, roster, connection status and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, view angles, input flags, readiness booleans and reset.
- **ui-pause-projection-kit:** pause state, reason and overlay projection.
- **lobby-screen-presentation-kit:** room metadata, roster, readiness badges, controls and connection status.
- **peer-host-transport-kit:** host peer, connection registry, broadcast, targeted send, bridge and destroy.
- **peer-client-transport-kit:** host connection, send, bridge, status, disconnect and destroy.
- **peer-event-bus-kit:** typed events, subscriptions and cleanup.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encoding, structural decoding and protocol/shape checks.
- **maze-snapshot-bootstrap-kit:** deterministic maze, players, cubes, anomaly, room and initial snapshot.
- **first-person-input-kit:** keyboard state, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit:** movement, maze collision, eye position, walk shake and camera.
- **network-player-update-kit:** client update send, host update consume, pose projection and cadence.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered validation, rollback and victory.
- **ooze-trail-domain-kit:** cadence, decay, spawn, spacing and capacity.
- **corridor-authoritative-publication-kit:** snapshot tick, cloning, SYNC broadcast and reasons.
- **corridor-animation-loop-kit:** RAF start, stop, delta and running guard.
- **corridor-render-world-kit:** terrain, maze, cubes, players, anomaly, ooze, props, lights, update and disposal.
- **corridor-post-processing-kit:** composer, bloom, output, resize, render and disposal.
- **corridor-minimap-kit:** maze, player, cube and anomaly markers.
- **runtime-debug-frame-kit:** bounded frames/events, overlay preferences and JSON-safe export.
- **runtime-resource-cleanup-kit:** RAF stop, unsubscribe, observer disconnect, listener removal, world/composer/renderer disposal and canvas removal.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object-kit review and live-player validation.

## Source findings

```txt
RuntimeReadiness is only four booleans
readiness has no sessionId runtimeGeneration revision provider or evidence
enterSoloRun marks rendering/input ready before GameCanvas initializes
startPlay marks simulation/rendering/input ready before GameCanvas initializes
client SYNC marks all four capabilities ready before provider confirmation
GameCanvas initialization patches readiness after resources are created
returnToStart calls resetRuntime before GameCanvas unmount cleanup
GameCanvas cleanup always patches networking true
solo cleanup can therefore report networking ready with no transport
late cleanup from an old mount can overwrite a newer reset or runtime
initialization failure has no typed readiness failure or rollback result
```

## Main finding

The store cannot distinguish a requested capability from a committed one. Readiness writes are shared across `GameShell` and `GameCanvas`, and no write is fenced by a runtime generation.

A concrete stale-write path is:

```txt
active run readiness = true
  -> returnToStart()
  -> destroy transport
  -> resetRuntime() writes all readiness false
  -> screen change unmounts GameCanvas
  -> old GameCanvas cleanup executes
  -> patchReadiness({ simulation:false, rendering:false, networking:true, input:false })
  -> title state now reports networking ready after reset
```

## Required composed domain

```txt
horror-corridor-runtime-readiness-authority-domain
  -> runtime-session-identity-kit
  -> runtime-generation-kit
  -> readiness-capability-descriptor-kit
  -> readiness-provider-lease-kit
  -> resource-readiness-proof-kit
  -> readiness-commit-transaction-kit
  -> readiness-revocation-kit
  -> simulation-readiness-adapter-kit
  -> rendering-readiness-adapter-kit
  -> networking-readiness-adapter-kit
  -> input-readiness-adapter-kit
  -> stale-cleanup-fence-kit
  -> readiness-transition-journal-kit
  -> readiness-debug-projection-kit
  -> runtime-readiness-fixture-kit
```

## Required proof

```txt
shell intent alone never marks rendering or input ready
renderer readiness commits only after renderer world composer and RAF exist
input readiness commits only after all listeners are installed
networking readiness reflects the actual transport role and status
solo runtime never reports networking ready
reset creates a new runtime generation
old generation cleanup cannot patch the new generation
failed initialization revokes partial leases in reverse order
cleanup is idempotent
React remount or strict-mode replay leaves one active readiness owner
GameHost/debug output includes generation revision provider and evidence
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
existing runtime checks run: no
runtime readiness fixture: unavailable
stale cleanup fixture: unavailable
strict-mode remount fixture: unavailable
initialization rollback fixture: unavailable
```

This pass documents the boundary only. It does not claim runtime readiness correctness.
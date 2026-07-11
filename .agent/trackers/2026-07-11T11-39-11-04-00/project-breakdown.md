# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-11T11-39-11-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

## Summary

The host can begin a run without proving that the transport is connected or that the admitted roster is ready. The start path waits through an asynchronous loading sequence, then commits the host locally before broadcasting two independent, uncorrelated messages. Roster, connection, room and session state can change during that wait, while clients have no atomic start admission, acknowledgement or retry contract.

## Plan ledger

**Goal:** define one host-authoritative lobby-start transaction that seals a roster revision, creates one run identity, commits once, publishes one correlated start bundle and admits clients exactly once before the first gameplay frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Avoid `TheOpenAbove` because a same-window documentation sequence was actively writing there.
- [x] Select only `HorrorCorridor` as the oldest stable eligible fallback.
- [x] Read current root `.agent` guidance and previous roster, transport, exit, snapshot and readiness audits.
- [x] Trace host and client lobby creation, roster updates, loading, bootstrap, START_GAME, SYNC and client projection.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Define the missing DSK/domain boundary and fixture gate.
- [x] Change no runtime source, dependencies, package scripts or deployment configuration.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-11T09-21-50-04-00  skipped: active same-window docs
HorrorCorridor     2026-07-11T09-29-07-04-00  selected stable fallback
PhantomCommand     2026-07-11T09-40-19-04-00
ZombieOrchard      2026-07-11T10-00-12-04-00
TheUnmappedHouse   2026-07-11T10-18-05-04-00
AetherVale         2026-07-11T10-38-55-04-00
IntoTheMeadow      2026-07-11T10-50-14-04-00
PrehistoricRush    2026-07-11T10-58-10-04-00
MyCozyIsland       2026-07-11T11-19-10-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` is changed in the Publish organization by this run.

## Product interaction loop

```txt
title
  -> solo, host or client session admission
  -> lobby room, roster, peer identity and connection projection
  -> host presses Start run or client presses Enter run
  -> host runs five asynchronous loading steps
  -> host creates deterministic game bootstrap from captured room and roster values
  -> host commits room, snapshot, UI and readiness locally
  -> host broadcasts START_GAME
  -> host broadcasts initial SYNC
  -> client applies START_GAME room and host identity
  -> client applies SYNC snapshot and enters PLAYING
  -> GameCanvas mounts, consumes snapshot and begins simulation/rendering
```

## Current lobby-start loop

```txt
host click
  -> no disabled state or start command identity
  -> no all-ready, connection, role or roster-revision admission
  -> await loading frames and timers
  -> no revalidation after await
  -> bootstrap from captured room and lobbyPlayers
  -> local active commit
  -> broadcast START_GAME, ignore send count
  -> broadcast SYNC, ignore send count

client receive
  -> START_GAME updates room/roster only
  -> SYNC independently updates snapshot and enters PLAYING
  -> no shared startTransactionId, runSessionId or epoch
  -> no acknowledgement, retry or duplicate policy
```

## Domains in use

```txt
application shell and screen routing
UI overlay, loading, pause, completion and settings projection
session mode, room, roster, peer identity and connection status
lobby member identity, peer binding, reserved slots and readiness
lobby start command admission, roster sealing and run bootstrap
runtime session, run identity, epoch and readiness ownership
PeerJS host/client transport and BroadcastChannel local bridge
connection registry, event bus and actor binding
versioned protocol envelopes, serialization and message construction
start publication, acknowledgement, retry and duplicate admission
seeded maze, room, players, cubes, anomaly and ooze bootstrap
replicated snapshot publication, acceptance and projection
input, movement, collision, camera and client prediction
cube interaction, ordered anomaly and victory
Three.js world, bloom, minimap, HUD and first-frame projection
RAF, resize, cleanup, debug observation, validation and deployment
```

## Implemented kits and services

- **corridor-application-shell-kit:** route entry, loading, lobby, play, pause, completion and exit projection.
- **corridor-session-domain-kit:** session mode, room, roster, peer identity, connection status and reset.
- **runtime-store-snapshot-kit:** authoritative snapshot, local pose, input, view angles, readiness and reset.
- **ui-pause-projection-kit:** pause state, reason and overlay projection.
- **lobby-screen-presentation-kit:** room code, phase, roster, ready badges and host/client controls.
- **peer-host-transport-kit:** host peer, connection registry, broadcast, targeted send, local bridge and destroy.
- **peer-client-transport-kit:** connection to host, send, local bridge, status, disconnect and destroy.
- **peer-event-bus-kit:** typed events, subscription, unsubscribe and clear.
- **protocol-message-construction-kit:** START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT envelopes.
- **protocol-serialization-kit:** JSON encode/decode, protocol version and structural shape admission.
- **maze-snapshot-bootstrap-kit:** deterministic seed, maze, players, cubes, anomaly, room and initial snapshot.
- **first-person-input-kit:** keyboard, pointer lock, look accumulation and input snapshots.
- **movement-collision-camera-kit:** movement, maze collision, eye position, walk shake and camera transforms.
- **network-player-update-kit:** client publication, host consumption, pose projection and cadence.
- **corridor-interaction-domain-kit:** pickup, drop, place, remove and held-cube synchronization.
- **ordered-anomaly-sequence-kit:** ordered validation, rollback and victory transition.
- **ooze-trail-domain-kit:** cadence, decay, spawn, spacing and capacity.
- **corridor-authoritative-publication-kit:** snapshot clone, tick, SYNC creation, broadcast and reason.
- **corridor-animation-loop-kit:** RAF start/stop, delta calculation and running guard.
- **corridor-render-world-kit:** terrain, maze, cubes, players, anomaly, ooze, props, lights, update and disposal.
- **corridor-post-processing-kit:** composer, bloom, output pass, resize, render and disposal.
- **corridor-minimap-kit:** maze, player, cube and anomaly marker projection.
- **runtime-debug-frame-kit:** bounded frames/events, overlay preferences and JSON-safe export.
- **runtime-resource-cleanup-kit:** RAF, subscriptions, observer, listeners, world, composer, renderer and canvas cleanup.
- **package-validation-kit:** build, lint, ProtoKit smoke, harness, visual match, object review and live-player validation.

## Source-backed findings

1. `LobbyScreen` keeps the primary action enabled for every host/client connection and roster state.
2. `startPlay()` checks only `sessionMode === "host"` and non-null `room` before the asynchronous loading sequence.
3. The loading sequence yields through five animation frames and five timers without freezing or sealing the roster.
4. `startPlay()` does not revalidate session mode, room, host actor, transport status, peer identity, roster revision or readiness after the wait.
5. Bootstrap consumes the `room` and `lobbyPlayers` values captured by the render that created the callback; connection and roster events can change the stores during loading.
6. The host commits the active room, snapshot, UI and readiness before attempting any network publication.
7. `broadcast()` returns a recipient count, but both START_GAME and SYNC counts are discarded.
8. START_GAME and SYNC have optional request IDs, but the start path supplies none and carries no start transaction, run-session or epoch identity.
9. START_GAME alone leaves the client in the lobby with an active room projection and no authoritative snapshot transition.
10. SYNC alone moves the client to PLAYING without proving a correlated accepted START_GAME transaction.
11. There is no client acknowledgement, host retry, idempotent duplicate result or per-peer start outcome.
12. Late start messages have no run epoch to distinguish them from a replacement lobby or later run.

## Main finding

The route has a local start sequence, not a distributed start transaction. The host can render and simulate a run that zero or only some clients admitted, while clients can apply only one half of the START_GAME/SYNC pair. The first committed gameplay frame therefore has no common roster revision, start transaction, run identity or delivery result.

## Required composed domain

```txt
horror-corridor-lobby-start-authority-domain
  -> lobby-start-command-kit
  -> lobby-start-admission-policy-kit
  -> lobby-start-roster-seal-kit
  -> lobby-start-transaction-id-kit
  -> run-session-identity-kit
  -> run-session-epoch-kit
  -> lobby-start-bootstrap-plan-kit
  -> lobby-start-commit-kit
  -> lobby-start-publication-bundle-kit
  -> lobby-start-client-admission-kit
  -> lobby-start-acknowledgement-kit
  -> lobby-start-retry-and-dedupe-kit
  -> lobby-start-result-kit
  -> lobby-start-transition-journal-kit
  -> lobby-start-debug-projection-kit
  -> lobby-start-fixture-kit
```

## Required transaction

```txt
StartRunCommand
  -> host actor and transport admission
  -> expected room and roster revision
  -> all required members connected and ready
  -> seal immutable roster fingerprint
  -> allocate startTransactionId, runSessionId and epoch
  -> build detached deterministic bootstrap
  -> publish one correlated start bundle or correlation-complete message set
  -> collect per-peer acknowledgements under explicit quorum policy
  -> commit host and admitted clients exactly once
  -> mount runtime providers
  -> publish first committed frame carrying start and run identity
```

## Next safe ledge

```txt
HorrorCorridor Lobby Start Transaction Authority
+ Correlated START_GAME/SYNC/Acknowledgement Fixture Gate
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

npm run build: not run
npm run lint: not run
lobby-start fixture: unavailable
message-loss fixture: unavailable
roster-change-during-loading fixture: unavailable
duplicate/retry fixture: unavailable
browser multi-peer smoke: not run
```

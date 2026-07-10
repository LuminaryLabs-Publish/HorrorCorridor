# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T18-31-21-04-00`

## Status

```txt
status: authoritative-snapshot-acceptance-monotonic-replay-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-10T18-31-21-04-00-horror-corridor-authoritative-snapshot-acceptance.md
```

## Selection

No eligible repository was new, absent from the central ledger, missing root `.agent` state, or otherwise undocumented. `HorrorCorridor` was selected as the oldest eligible documented fallback. `TheCavalryOfRome` remained excluded.

## Interaction loop

```txt
select solo, host, or join
  -> create or join a room
  -> bootstrap deterministic maze state
  -> move through pointer-lock first-person controls
  -> derive pickup, drop, place, or remove
  -> apply locally or send TRY_INTERACT
  -> host mutates state and publishes SYNC
  -> client accepts snapshot and replaces room/runtime/UI state
  -> world, minimap, HUD, completion, and debug project the snapshot
```

## Domains in use

```txt
application shell and session lifecycle
PeerJS host/client transport
protocol envelopes and message routing
full-sync snapshot construction
snapshot reception and runtime-store replacement
room and lobby projection
seeded maze, cube, and anomaly bootstrap
first-person input, movement, collision, camera, and prediction
interaction, network, ooze, and victory rules
local and host authority consumers
authoritative publication cadence
Three.js world, post-processing, minimap, and scene dressing
runtime debug frame and event storage
planned envelope preflight, authority-source validation, monotonic acceptance, rejection results, snapshot ledger, and replay fixtures
```

## Kits and services

```txt
corridor-session-domain-kit
  mode selection, room identity, readiness, session entry
peer-room-sync-domain-kit
  host/client transport, START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, lobby events
maze-snapshot-bootstrap-kit
  deterministic maze, cell lookup, cube spawns, anomaly sequence and slots
first-person-corridor-player-kit
  pointer lock, input, movement, collision, camera, prediction
corridor-interaction-domain-kit
  pickup, drop, place, remove, carried-cube synchronization
ordered-anomaly-sequence-kit
  ordered validation, completion, victory, rollback
ooze-trail-domain-kit
  cadence, decay, spawn, spacing guard, capacity guard
corridor-authoritative-publication-kit
  snapshot tick, full sync, broadcast, cadence counters, publication reasons
corridor-render-world-kit
  Three.js world, maze, cubes, players, anomaly, ooze, scene dressing
corridor-minimap-kit
  minimap projection, player markers, object markers
runtime-debug-frame-kit
  bounded frames, bounded events, browser export, overlay preferences
```

## Source findings

```txt
FullSyncPayload carries authoritativeTick and snapshot.tick.
ProtocolEnvelope carries version, senderId, roomId, timestampMs, and optional requestId.
GameShell accepts every SYNC and immediately replaces room, players, snapshot, readiness, and UI state.
No consumer checks authoritativeTick === snapshot.tick.
No consumer checks next tick > current accepted tick.
No consumer checks roomId, gameId, seed, sender authority, or protocol version before commit.
RuntimeStore setAuthoritativeSnapshot is an unconditional setter.
Duplicate or out-of-order SYNC delivery has no explicit result or debug row.
Victory can be projected back to playing if an older snapshot arrives later.
```

## Main finding

The current blocker is authoritative snapshot acceptance. The host publishes monotonic ticks, but the client has no validation or commit policy. A stale, duplicate, cross-room, wrong-source, or internally inconsistent snapshot can replace authoritative state and drive gameplay and UI backwards.

## Next safe ledge

```txt
HorrorCorridor Authoritative Snapshot Acceptance + Monotonic Replay Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
existing checks run: no
snapshot acceptance fixture: unavailable
repo-local docs pushed to main: yes
central ledger updated: yes
central change log added: yes
```
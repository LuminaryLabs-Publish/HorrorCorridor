# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T18-31-21-04-00`

## Goal

Refresh the internal architecture record for one eligible Publish repository, identify the interaction loop, domains, kits, and services, and define the smallest safe implementation gate without modifying runtime code.

## Completion ledger

```txt
[x] compared the full accessible LuminaryLabs-Publish inventory
[x] compared central repo-ledger recency
[x] confirmed root .agent state for eligible repositories
[x] excluded TheCavalryOfRome
[x] selected one repository only
[x] inspected GameShell SYNC consumption
[x] inspected GameCanvas publication and snapshot reference paths
[x] inspected runtimeStore replacement behavior
[x] inspected protocol message and full-sync builders
[x] inspected available package scripts
[x] documented interaction loop
[x] documented all active domains
[x] documented implemented kits and services
[x] defined planned DSK cuts and fixture gate
[x] kept runtime source unchanged
[x] created no branch or pull request
[x] synchronized central ledger and internal change log
```

## Selection

All nine eligible non-Cavalry repositories were tracked and had root `.agent` state. `HorrorCorridor` had the oldest eligible central review timestamp.

```txt
HorrorCorridor       selected / prior 2026-07-10T17-00-54-04-00
PhantomCommand       tracked  / 2026-07-10T17-08-36-04-00
ZombieOrchard        tracked  / 2026-07-10T17-18-47-04-00
TheUnmappedHouse     tracked  / 2026-07-10T17-29-23-04-00
MyCozyIsland         tracked  / 2026-07-10T17-38-35-04-00
TheOpenAbove         tracked  / 2026-07-10T17-51-35-04-00
PrehistoricRush      tracked  / 2026-07-10T18-01-03-04-00
AetherVale           tracked  / 2026-07-10T18-08-37-04-00
IntoTheMeadow        tracked  / 2026-07-10T18-22-01-04-00
TheCavalryOfRome     excluded by rule
```

## Interaction loop

```txt
start menu
  -> select solo, host, or join
  -> create room identity and peer transport
  -> create or receive deterministic initial snapshot
  -> initialize GameCanvas, renderer, world, input, cadence, and diagnostics
  -> pointer-lock movement predicts local pose
  -> interact derives pickup, drop, place, or remove
  -> solo/host applies the rule locally
  -> client sends TRY_INTERACT to host
  -> host applies network rule and publishes SYNC
  -> GameShell consumes SYNC
  -> set room and lobby players
  -> unconditionally replace authoritativeSnapshot
  -> mutate screen, gameScreen, pause, completion, and readiness
  -> GameCanvas/world/minimap/HUD/debug read the replacement
  -> ordered anomaly completion reaches victory
```

## Active domains

```txt
application shell
session mode and room lifecycle
peer identity and lobby state
PeerJS host/client transport
protocol envelope and message routing
START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, and LOBBY_EVENT contracts
full-sync snapshot construction
snapshot reception and runtime-store replacement
room and lobby projection
UI screen, game-screen, pause, overlay, and completion projection
seeded maze generation and cell lookup
cube spawn, carry, placement, and removal
ordered anomaly sequence and victory
first-person input and pointer lock
camera look and movement prediction
maze collision
network player updates
host and local authority consumption
ooze cadence, decay, spacing, and capacity
authoritative tick and publication cadence
Three.js renderer, scene, camera, world, and post-processing
scene dressing
minimap drawing
runtime readiness
bounded runtime-debug frames and events
planned snapshot envelope preflight
planned authority-source validation
planned snapshot monotonicity and replay classification
planned atomic projection transaction
planned snapshot acceptance diagnostics and fixtures
```

## Implemented kits and offered services

```txt
corridor-session-domain-kit
  mode selection
  room creation and joining
  peer identity
  lobby readiness
  session entry and reset

peer-room-sync-domain-kit
  host/client transport
  connection status
  protocol routing
  START_GAME
  PLAYER_UPDATE
  TRY_INTERACT
  SYNC
  LOBBY_EVENT

maze-snapshot-bootstrap-kit
  deterministic maze
  cell lookup
  cube spawns
  target sequence
  anomaly slots
  snapshot-to-domain reconstruction

first-person-corridor-player-kit
  pointer lock
  keyboard and mouse input
  look deltas
  movement integration
  collision
  local prediction
  camera projection

corridor-interaction-domain-kit
  interaction action derivation
  pickup
  drop
  place
  remove
  carried-cube synchronization

ordered-anomaly-sequence-kit
  slot validation
  ordered progression
  completion
  victory
  rollback on invalid placement

ooze-trail-domain-kit
  timed advancement
  decay
  spawn
  spacing guard
  capacity guard

corridor-authoritative-publication-kit
  state tick increment
  timestamp update
  replicated snapshot construction
  full-sync construction
  transport broadcast
  publication reason
  cadence counters

corridor-render-world-kit
  Three.js scene
  maze geometry
  cubes
  remote players
  anomaly
  ooze
  terrain eye position
  scene dressing
  update and disposal

corridor-minimap-kit
  minimap geometry
  local marker
  remote player markers
  cube and anomaly markers

runtime-debug-frame-kit
  bounded frame capture
  bounded event capture
  cadence readback
  snapshot summary
  scene-dressing summary
  overlay visibility
  browser export
```

## Source audit

### Producer metadata already available

```txt
ProtocolEnvelope.version
ProtocolEnvelope.senderId
ProtocolEnvelope.roomId
ProtocolEnvelope.timestampMs
ProtocolEnvelope.requestId
FullSyncPayload.authoritativeTick
FullSyncPayload.snapshot.tick
snapshot.gameId
snapshot.seed
snapshot.room.roomId
snapshot.room.hostId
```

### Current consumer behavior

```txt
GameShell receives SYNC
  -> setRoom(payload.room)
  -> setLobbyPlayers(payload.room.players)
  -> setAuthoritativeSnapshot(payload.snapshot)
  -> set completion/pause/playing UI from snapshot.gameState
  -> set readiness true
```

No acceptance policy runs before those writes.

### Concrete gap

```txt
no version check
no sender/host authority check
no room agreement check
no gameId or seed continuity check
no authoritativeTick === snapshot.tick check
no monotonic tick check
no duplicate classification
no conflicting duplicate check
no session/authority epoch
no stale-snapshot result
no atomic projection result
no snapshot acceptance debug row
```

## Main finding

The host-side publication path produces monotonic-looking snapshots, but the client-side consumer has no proof that an inbound snapshot belongs to the active authority or is newer than the accepted state. The unconditional replacement boundary allows stale or replayed messages to rewind gameplay and UI.

This is a prerequisite to reliable request acknowledgements. A pending request must only correlate with a snapshot that passed authority, identity, and monotonicity checks.

## Planned DSK cuts

```txt
protocol-envelope-preflight-kit
  version and structural validation
  envelope/payload room agreement
  typed reject reasons

authority-source-identity-kit
  expected host sender
  room authority
  game and seed continuity
  authority/session epoch

snapshot-acceptance-policy-kit
  first snapshot acceptance
  higher-tick acceptance
  stale rejection
  duplicate classification
  conflicting duplicate rejection
  recovery reset policy

snapshot-acceptance-ledger-kit
  last accepted record
  accepted fingerprint
  bounded rejection rows
  counters and summaries

snapshot-projection-transaction-kit
  atomic room/lobby/runtime/UI projection
  victory regression guard
  typed commit result

runtime-debug-snapshot-projection-kit
  candidate source and identity
  previous and candidate ticks
  accept/reject reason
  commit status
  JSON-safe export

snapshot-acceptance-fixture-kit
  valid, duplicate, stale, out-of-order, conflicting, wrong-room, wrong-host, wrong-version, mismatch, recovery, and victory rows
  DOM-free deterministic replay

request-identity-and-ack-companion-kit
  pending request correlation only with accepted snapshot ticks
  independent no-publish acknowledgements
```

## Next safe ledge

```txt
HorrorCorridor Authoritative Snapshot Acceptance + Monotonic Replay Fixture Gate
```

## Validation

Documentation only. Runtime source, package scripts, dependencies, routes, deployment, and network behavior were unchanged. Existing checks were not run because `fixture:snapshot-acceptance` does not exist yet. Repo-local documentation and central records were pushed directly to `main`.
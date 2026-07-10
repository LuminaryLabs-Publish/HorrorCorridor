# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T17-00-54-04-00`

## Goal

Refresh the internal architecture record without modifying runtime code, identify the next source boundary, and preserve one-project-only selection discipline.

## Plan ledger

```txt
[x] compared the full accessible LuminaryLabs-Publish inventory
[x] compared central repo ledgers
[x] excluded TheCavalryOfRome
[x] selected only HorrorCorridor
[x] inspected root .agent state
[x] inspected GameCanvas request, authority, publication, and cadence paths
[x] inspected protocol envelope, interaction request, full sync, and message types
[x] inspected network rule dispatch and runtime debug storage
[x] identified the interaction loop
[x] identified domains, kits, and services
[x] refreshed root .agent documents
[x] added timestamped architecture, render, gameplay, interaction, network, protocol, deploy, and turn-ledger audits
[x] kept runtime source unchanged
[x] created no branch or pull request
[ ] synchronize the central ledger and change log after repo-local commit
```

## Selection

```txt
HorrorCorridor       selected / prior central activity 2026-07-10T15-36-42-04-00
PhantomCommand       tracked  / 2026-07-10T15-48-27-04-00
ZombieOrchard        tracked  / 2026-07-10T15-55-49-04-00
TheUnmappedHouse     tracked  / 2026-07-10T16-07-30-04-00
MyCozyIsland         tracked  / 2026-07-10T16-17-08-04-00
TheOpenAbove         tracked  / 2026-07-10T16-28-54-04-00
PrehistoricRush      tracked  / 2026-07-10T16-37-25-04-00
AetherVale           tracked  / 2026-07-10T16-48-42-04-00
IntoTheMeadow        tracked  / 2026-07-10T16-58-28-04-00
TheCavalryOfRome     excluded by rule
```

## Interaction loop

```txt
menu and session selection
  -> solo, host, or join
  -> room identity, readiness, and deterministic maze bootstrap
  -> GameCanvas initializes rendering, input, transport, cadence, and diagnostics
  -> pointer-lock movement updates local pose
  -> interact derives pickup, drop, place, or remove
  -> local authority applies a rule directly
  -> client sends TRY_INTERACT to host
  -> host applies the rule and publishes a SYNC snapshot
  -> client consumes the snapshot
  -> world, minimap, HUD, completion, and runtime debug update
```

## Domains

```txt
application shell and session lifecycle
PeerJS host/client transport
protocol envelopes and message routing
request identity fields
replicated snapshot construction
seeded maze, cube, and anomaly bootstrap
first-person input, movement, collision, camera, and prediction
interaction, network, ooze, and victory rules
local and host authority consumers
authoritative publication cadence
Three.js world, post-processing, minimap, and scene dressing
runtime debug frame and event storage
planned request generation, pending ledger, acknowledgement, deduplication, and fixture domains
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
  pointer lock, keyboard and mouse input, movement, collision, camera, prediction
corridor-interaction-domain-kit
  pickup, drop, place, remove, carried-cube synchronization
ordered-anomaly-sequence-kit
  ordered slot validation, completion, victory, rollback
ooze-trail-domain-kit
  cadence, decay, spawn, spacing guard, capacity guard
corridor-authoritative-publication-kit
  snapshot tick, full-sync creation, transport broadcast, cadence counters
corridor-render-world-kit
  Three.js world, maze, cubes, players, anomaly, ooze, scene dressing
corridor-minimap-kit
  minimap geometry, player markers, object markers
runtime-debug-frame-kit
  bounded frame capture, bounded event capture, browser export, overlay preferences
```

## Finding

The protocol already permits request identity, but the runtime drops the capability. A request can reach the host and cause a snapshot, yet neither the authority result nor the snapshot publication is joined to the source request. The planned no-publish behavior for rejected and no-op commands therefore requires an acknowledgement channel independent of snapshot publication.

## Next safe ledge

```txt
HorrorCorridor Request Identity Propagation + Authoritative Acknowledgement Fixture Gate
```

## Validation

Documentation only. Runtime source and package scripts were unchanged. Existing validation commands were not run.

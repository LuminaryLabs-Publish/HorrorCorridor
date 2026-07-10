# HorrorCorridor Project Breakdown

**Run:** `2026-07-10T15-31-03-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

## Selection ledger

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` was excluded. The other nine repositories were centrally tracked and had sampled root `.agent` state. `HorrorCorridor` was the oldest eligible documented fallback.

## Interaction loop

```txt
menu
  -> solo / host / join
  -> room and readiness
  -> deterministic maze, cubes, anomaly, players
  -> GameCanvas runtime setup
  -> pointer-lock movement and camera
  -> derive pickup / drop / place / remove
  -> local rule application or client TRY_INTERACT
  -> host rule application
  -> authoritative publication cadence
  -> replicated snapshot
  -> world, minimap, HUD, completion, runtime debug
```

## Domain map

```txt
session and room lifecycle
PeerJS host/client transport
message and replicated snapshot protocols
seeded maze/cube/anomaly bootstrap
first-person input, movement, collision, camera, prediction
interaction, carried-cube, ordered-sequence, victory, and ooze rules
local and host authority consumers
authoritative snapshot publication cadence
Three.js world, post-processing, minimap, scene dressing
runtime debug frames/events/window API
planned command result, publish decision, correlation, journal, and fixture domains
```

## Kit and service inventory

```txt
corridor-session-domain-kit
  session mode, room identity, readiness, entry
peer-room-sync-domain-kit
  host/client transport, full sync, player update, interaction request
maze-snapshot-bootstrap-kit
  deterministic maze, cells, cube spawns, anomaly slots
first-person-corridor-player-kit
  pointer lock, input, movement, collision, camera, prediction
corridor-interaction-domain-kit
  pickup, drop, place, remove, carry sync
ordered-anomaly-sequence-kit
  slot state, ordered validation, victory, rollback
ooze-trail-domain-kit
  spawn, decay, spacing, capacity, cadence
corridor-authoritative-publication-kit
  tick, snapshot, broadcast, cadence, publication reason
corridor-render-world-kit
  maze, cubes, players, anomaly, ooze, dressing
corridor-minimap-kit
  minimap and marker projection
runtime-debug-frame-kit
  bounded frames/events and export
```

## New finding

Local and host authority currently consume the same interaction rule with different implicit publication semantics. Local authority skips unchanged results through object identity. Host `TRY_INTERACT` publishes after every request. Periodic authority cadence publishes after player/ooze advancement even when no semantic command mutation occurred. Runtime debug cannot join the originating request, domain result, consumer decision, and published snapshot tick.

## Next safe ledge

```txt
HorrorCorridor Authority Command Correlation Ledger + Publish Parity Fixture Gate
```

## Validation

Documentation only. No runtime, dependency, route, branch, PR, or deployment change was made. Existing checks were not run.
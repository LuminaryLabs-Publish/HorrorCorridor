# Gameplay Audit: Command Result Replay Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-25-39-04-00`

## Current gameplay loop

```txt
choose solo/host/join
  -> load room and readiness state
  -> bootstrap maze, cubes, anomaly sequence, players, ooze
  -> move with keyboard and mouse look
  -> interact key maps distance/carry state to pickup/drop/place/remove
  -> local or host authority mutates GameState through legacy rules
  -> sequence completion may set victory
  -> snapshots drive renderer, minimap, HUD, and debug
```

## Gameplay domains

```txt
session-mode
room-readiness
player-pose
movement-and-collision
cube-carry
anomaly-placement
ordered-sequence-completion
ooze-pressure
host-authoritative-snapshot
client-prediction-and-sync
command-result-replay
```

## Current blocker

Gameplay actions are playable, but the rules do not return an explicit command result.

A failed pickup, wrong slot, no-carried-cube drop, too-far anomaly place, missing player update, request-sync, toggle-ready, cancel, and unknown action all need deterministic status/reason records.

## Required replay path

```txt
fixture seed
  -> command envelope
  -> preflight
  -> result-returning rule
  -> publish decision
  -> local/host consumer
  -> command journal
  -> final state summary
  -> replicated snapshot summary
  -> parity output
```

## Gameplay rows to prove

```txt
accepted pickup
rejected pickup already carrying
rejected pickup no nearby cube
accepted drop
rejected drop without carried cube
accepted place
accepted final place victory
rejected place too far
rejected place no slot
accepted remove
rejected remove wrong slot
publish-only request-sync
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged missing player update
accepted held cube sync
unchanged held cube sync
ooze tick spawn
ooze tick decay
ooze no-op
victory completion
```

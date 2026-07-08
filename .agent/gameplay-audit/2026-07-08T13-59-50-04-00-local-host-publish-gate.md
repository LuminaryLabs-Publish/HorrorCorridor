# HorrorCorridor Local/Host Publish Gate Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T13:59:50-04:00`

## Gameplay authority read

The player-facing loop is already coherent: move through the maze, pick up cubes, drop cubes, place or remove cubes at the anomaly, solve the ordered sequence, avoid ooze pressure, and complete the run.

The next gameplay-risk fix is not new mechanics. It is publish authority: accepted, rejected, unchanged, skipped, recovery, and victory outcomes need explicit behavior before additional gameplay content is added.

## Current local gameplay gate

```txt
interact key
-> derive action from distanceToEnd and carried-cube state
-> applyNetworkInteractionRequest
-> unchanged state returns silently
-> changed state syncs held cubes
-> publishAuthoritativeState("resync")
-> victory commits if state says victory
```

Risk:

```txt
rejected pickup/drop/place/remove cannot tell the UI/debug/fixture why it failed
accepted unchanged cannot be separated from rejected unchanged
victory is detected after mutation rather than carried as command result metadata
```

## Current host gameplay gate

```txt
client sends PLAYER_UPDATE or TRY_INTERACT
-> host applies network rules
-> host uses GameState mutation and action path to publish or recover
-> request-sync recovery is not represented as command result metadata
-> toggle-ready/cancel/unknown actions have no explicit skipped record
```

Risk:

```txt
host/client parity cannot be proven from result rows
rejected TRY_INTERACT can look like a silent no-op
request-sync can look like mutation-free success instead of recovery publish
runtime debug cannot explain host publish or skip decisions
```

## Required gameplay result statuses

```txt
accepted:
  pickup
  drop
  place
  remove
  player-update
  held-cube-sync
  ooze-tick

rejected:
  not-playing
  missing-player
  already-carrying
  no-nearby-cube
  no-carried-cube
  missing-anomaly-cell
  too-far-from-anomaly
  no-free-slot
  no-occupied-slot
  wrong-slot
  missing-cube-id

unchanged:
  player-missing
  held-cube-already-synced
  no-state-diff

publish-only:
  request-sync

skipped:
  toggle-ready-policy-not-implemented
  cancel-policy-not-implemented
  unknown-action

victory:
  ordered-sequence-complete
```

## Gameplay fixture rows

```txt
[ ] local accepted pickup publishes
[ ] local rejected pickup no nearby cube skips
[ ] local accepted drop publishes
[ ] local rejected drop without carried cube skips
[ ] local accepted place publishes
[ ] local victory place publishes and commits completion
[ ] local rejected place too far skips
[ ] local accepted remove publishes
[ ] local rejected remove wrong slot skips
[ ] host accepted player update publishes
[ ] host missing player update skips
[ ] host accepted TRY_INTERACT publishes
[ ] host rejected TRY_INTERACT skips
[ ] host request-sync publishes recovery
[ ] host toggle-ready skips
[ ] host cancel skips
[ ] host unknown action skips
```

## Gameplay non-goals

```txt
- no new maze content
- no new enemy behavior
- no new object-kit content
- no renderer work
- no minimap work
- no PeerJS extraction
- no route rewrite
```

## Next gameplay ledge

```txt
HorrorCorridor GameCanvas Command Consumer Wire Map + Fixture Gate
```

# HorrorCorridor Interaction Audit: No-op/Rejection Command Reason Map

**Timestamp:** `2026-07-10T12-29-26-04-00`

## Interaction seam

`interactionRules.ts` owns pickup, drop, place, and remove behavior. It currently returns `GameState` only, so valid unchanged paths and rejected paths look the same to `GameCanvas` and runtime debug.

## Reason map to prove

```txt
pickup
  accepted:pickup
  rejected:already-carrying
  rejected:no-nearby-cube

drop
  accepted:drop
  rejected:no-carried-cube

place
  accepted:place
  victory:ordered-sequence-complete
  rejected:no-carried-cube
  rejected:too-far-from-anomaly
  rejected:no-free-slot

remove
  accepted:remove
  rejected:wrong-slot
  rejected:too-far-from-anomaly
```

## Network/host reason map

```txt
PLAYER_UPDATE
  accepted:player-update
  noop:missing-player

TRY_INTERACT
  use interaction reason map

SYNC_HELD_CUBES
  accepted:held-cube-sync
  noop:held-cube-already-synced

REQUEST_SYNC
  recovery:request-sync
  publish-only:request-sync

TOGGLE_READY
  skipped:toggle-ready

CANCEL
  skipped:cancel

DEFAULT/UNKNOWN
  skipped:unknown-action
```

## Fixture rows before GameCanvas splice

```txt
rejected interaction does not broadcast
accepted changed interaction broadcasts
accepted unchanged interaction journals but does not broadcast
request-sync publishes recovery without pretending to be a gameplay change
victory publishes as victory, not ordinary accepted place
runtime debug latest reason equals fixture reason
```

## Non-goal

Do not redesign input handling, pointer lock, camera, transport, or rendering in this pass. The next pass should make current interaction facts observable before changing behavior.

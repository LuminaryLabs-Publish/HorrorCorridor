# HorrorCorridor Interaction Audit: Silent No-op Reason Coverage

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-30-09-04-00`

## Current silent paths

The current interaction layer has many correct gameplay guards, but every guard returns unchanged `GameState` without a reason record.

## Interaction guard map

```txt
pickUpCube
  -> not playing: rejected:not-playing
  -> missing player: rejected:missing-player
  -> already carrying: rejected:already-carrying
  -> no candidate in range: rejected:no-nearby-cube
  -> changed: accepted:pickup

dropCube
  -> not playing: rejected:not-playing
  -> missing player: rejected:missing-player
  -> no carried cube: rejected:no-carried-cube
  -> changed: accepted:drop

placeCubeAtEndAnomaly
  -> not playing: rejected:not-playing
  -> missing player: rejected:missing-player
  -> no carried cube: rejected:no-carried-cube
  -> missing anomaly cell: rejected:missing-anomaly-cell
  -> too far: rejected:too-far-from-anomaly
  -> no free slot: rejected:no-free-slot
  -> changed: accepted:place
  -> final sequence solved: victory:ordered-sequence-complete

removeCubeFromEndAnomaly
  -> not playing: rejected:not-playing
  -> missing player: rejected:missing-player
  -> already carrying: rejected:already-carrying
  -> missing anomaly cell: rejected:missing-anomaly-cell
  -> too far: rejected:too-far-from-anomaly
  -> no occupied slot: rejected:no-occupied-slot
  -> wrong requested slot: rejected:wrong-slot
  -> changed: accepted:remove
```

## Network command guard map

```txt
applyNetworkPlayerUpdate
  -> missing player: unchanged:player-missing
  -> changed player pose: accepted:player-update

syncHeldCubesToPlayers
  -> all carried cube positions already match owners: unchanged:held-cube-already-synced
  -> at least one carried cube position synced: accepted:held-cube-sync

applyNetworkInteractionRequest
  -> request-sync: publish-only:request-sync
  -> toggle-ready: skipped:toggle-ready-policy-not-implemented
  -> cancel: skipped:cancel-policy-not-implemented
  -> default: skipped:unknown-action
```

## Consumer implication

The local path should journal rejected and no-op results without broadcasting.

The host path should skip rejected `TRY_INTERACT` publishes, publish accepted changed/victory results, and treat request-sync as explicit recovery/full-sync.

# HorrorCorridor Interaction Preflight Reason Matrix

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-19-00-04-00`

## Current interaction functions

```txt
pickUpCube(state, input) -> GameState
dropCube(state, input) -> GameState
placeCubeAtEndAnomaly(state, input) -> GameState
removeCubeFromEndAnomaly(state, input) -> GameState
applyNetworkInteractionRequest(state, input) -> GameState
```

## Preflight problem

Each interaction has multiple rejected/no-op paths, but the caller receives only the old state.

That makes the loop playable but not debuggable, replayable, or fixture-safe.

## Required preflight outputs

```txt
canRun
reason
player
carriedCube
nearbyCube
anomalyCell
anomalyDistance
selectedSlot
occupiedSlot
cubeId
slotId
```

## Reason matrix

```txt
pickup
  accepted:pickup
  rejected:not-playing
  rejected:missing-player
  rejected:already-carrying
  rejected:no-nearby-cube

drop
  accepted:drop
  rejected:not-playing
  rejected:missing-player
  rejected:no-carried-cube

place
  accepted:place
  victory:ordered-sequence-complete
  rejected:not-playing
  rejected:missing-player
  rejected:no-carried-cube
  rejected:missing-anomaly-cell
  rejected:too-far-from-anomaly
  rejected:no-free-slot

remove
  accepted:remove
  rejected:not-playing
  rejected:missing-player
  rejected:already-carrying
  rejected:missing-anomaly-cell
  rejected:too-far-from-anomaly
  rejected:no-occupied-slot
  rejected:wrong-slot
  rejected:missing-cube-id

network wrapper
  publish-only:request-sync
  skipped:toggle-ready-policy-not-implemented
  skipped:cancel-policy-not-implemented
  skipped:unknown-action
```

## Fixture rows

The next fixture must create seed states for:

```txt
not playing
missing player
already carrying
near loose cube
no nearby cube
carrying near anomaly
carrying far from anomaly
no free slot
last occupied slot
wrong slot
request-sync
toggle-ready
cancel
unknown action
victory final slot
```

## Acceptance

Every preflight failure must return a stable reason before mutation.

Every accepted path must prove before/after cube and slot facts.

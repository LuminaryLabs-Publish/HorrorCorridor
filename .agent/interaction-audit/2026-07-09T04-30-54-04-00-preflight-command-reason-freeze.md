# HorrorCorridor Preflight Command Reason Freeze

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-30-54-04-00`

## Current interaction source

`interactionRules.ts` owns:

```txt
isInteractionStateReady
findPlayer
findCarriedCube
findNearestLooseCube
getEndAnomalyCell
pickUpCube
dropCube
placeCubeAtEndAnomaly
removeCubeFromEndAnomaly
syncSequenceProgress
```

## Current issue

Every invalid branch returns the same `GameState` object.

That keeps legacy gameplay safe but hides why a command failed.

## Preflight split

```txt
InteractionCommandEnvelope
  -> playing state check
  -> player lookup
  -> carried cube lookup
  -> loose cube lookup
  -> anomaly cell lookup
  -> anomaly distance check
  -> slot lookup
  -> command reason
  -> accepted or rejected result
```

## Preflight reasons to source-own

```txt
rejected:not-playing
rejected:missing-player
rejected:already-carrying
rejected:no-nearby-cube
rejected:no-carried-cube
rejected:missing-anomaly-cell
rejected:too-far-from-anomaly
rejected:no-free-slot
rejected:no-occupied-slot
rejected:wrong-slot
rejected:missing-cube-id
accepted:pickup
accepted:drop
accepted:place
accepted:remove
victory:ordered-sequence-complete
```

## Fixture rows that prove interaction preflight

```txt
near loose cube -> accepted:pickup
already carrying -> rejected:already-carrying
no nearby cube -> rejected:no-nearby-cube
carrying -> accepted:drop
not carrying -> rejected:no-carried-cube
near anomaly with carried cube -> accepted:place
far from anomaly -> rejected:too-far-from-anomaly
full anomaly slots -> rejected:no-free-slot
last occupied slot -> accepted:remove
wrong requested slot -> rejected:wrong-slot
final place completes sequence -> victory:ordered-sequence-complete
```

## Non-goal

Do not change player input, camera movement, renderer, minimap, or network transport in this preflight pass.

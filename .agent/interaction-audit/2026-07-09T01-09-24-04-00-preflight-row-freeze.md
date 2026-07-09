# HorrorCorridor Interaction Audit: Preflight Row Freeze

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T01-09-24-04-00`

## Current interaction rule shape

`interactionRules.ts` currently performs lookup, validation, mutation, and sequence synchronization in one layer.

It returns only `GameState`, so the caller cannot tell whether the command was accepted, rejected, unchanged, skipped, publish-only, or victory-producing.

## Current silent branches to classify

```txt
pickUpCube:
  - not playing
  - missing player
  - already carrying
  - no nearby loose cube

dropCube:
  - not playing
  - missing player
  - no carried cube

placeCubeAtEndAnomaly:
  - not playing
  - missing player
  - no carried cube
  - missing anomaly cell
  - too far from anomaly
  - no free sequence slot

removeCubeFromEndAnomaly:
  - not playing
  - missing player
  - already carrying
  - missing anomaly cell
  - too far from anomaly
  - no occupied sequence slot
  - wrong requested slot
  - missing cube id on slot
```

## Preflight helper target

```txt
createInteractionPreflight(state, input)
  -> playing-state check
  -> player lookup
  -> carried-cube lookup
  -> nearest-loose-cube lookup
  -> anomaly-cell lookup
  -> anomaly-distance check
  -> slot resolution
  -> stable CommandReason
  -> diagnostics payload
```

## Fixture row targets

```txt
pickup:accepted-near-loose-cube
pickup:rejected-not-playing
pickup:rejected-missing-player
pickup:rejected-already-carrying
pickup:rejected-no-nearby-cube

drop:accepted-carrying
drop:rejected-not-playing
drop:rejected-missing-player
drop:rejected-no-carried-cube

place:accepted-near-anomaly
place:accepted-final-slot-victory
place:rejected-not-playing
place:rejected-missing-player
place:rejected-no-carried-cube
place:rejected-missing-anomaly-cell
place:rejected-too-far-from-anomaly
place:rejected-no-free-slot

remove:accepted-last-occupied-slot
remove:rejected-not-playing
remove:rejected-missing-player
remove:rejected-already-carrying
remove:rejected-missing-anomaly-cell
remove:rejected-too-far-from-anomaly
remove:rejected-no-occupied-slot
remove:rejected-wrong-slot
remove:rejected-missing-cube-id
```

## Stable output shape

```txt
interactionId
action
status
reason
playerId
cubeId
slotId
distanceToAnomaly
nearestCubeId
carriedCubeId
resolvedSlotId
canMutate
stateSummaryBefore
expectedStateSummaryAfter
```

## Non-goals

```txt
do not change puzzle rules first
do not change distance constants first
do not add cube types first
do not edit rendering first
do not make preflight depend on DOM, React, Three.js, or PeerJS
```

## Result-first adapter rule

Legacy exports should stay stable.

New result-returning wrappers can own metadata, while `pickUpCube`, `dropCube`, `placeCubeAtEndAnomaly`, and `removeCubeFromEndAnomaly` continue returning `result.state` until callers migrate.

# HorrorCorridor Interaction Preflight Reason Matrix

**Timestamp:** `2026-07-09T01-00-22-04-00`

## Current interaction source read

`interactionRules.ts` owns the concrete cube interaction mutations:

```txt
pickUpCube
dropCube
placeCubeAtEndAnomaly
removeCubeFromEndAnomaly
```

The current implementation is deterministic but not explanatory. Each invalid branch returns the unchanged `GameState` instead of a reasoned command result.

## Preflight facts needed

```txt
state is playing
player exists
player has carried cube
player has no carried cube
nearest loose cube exists
nearest loose cube is within interaction distance
end anomaly cell exists
player is near anomaly
free sequence slot exists
last occupied sequence slot exists
requested slot matches last occupied slot
cube id exists where required
```

## Reason matrix

```txt
pickup:
  accepted:pickup
  rejected:not-playing
  rejected:missing-player
  rejected:already-carrying
  rejected:no-nearby-cube

drop:
  accepted:drop
  rejected:not-playing
  rejected:missing-player
  rejected:no-carried-cube

place:
  accepted:place
  victory:ordered-sequence-complete
  rejected:not-playing
  rejected:missing-player
  rejected:no-carried-cube
  rejected:missing-anomaly-cell
  rejected:too-far-from-anomaly
  rejected:no-free-slot

remove:
  accepted:remove
  rejected:not-playing
  rejected:missing-player
  rejected:already-carrying
  rejected:missing-anomaly-cell
  rejected:too-far-from-anomaly
  rejected:no-occupied-slot
  rejected:wrong-slot
  rejected:missing-cube-id
```

## Preflight module target

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
```

It should export pure helpers for:

```txt
isInteractionStateReadyWithReason
findPlayerWithReason
findCarriedCubeWithReason
findNearestLooseCubeWithReason
getEndAnomalyCellWithReason
isNearAnomalyWithReason
findNextFreeSlotWithReason
findLastOccupiedSlotWithReason
validateRequestedSlotWithReason
```

## Result wrapper target

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
```

It should wrap the existing mutation functions as result-returning APIs and keep the old exports intact through adapters.

## Fixture requirement

Every preflight rejection must have a fixture row.

No row may infer rejection only from `nextState === currentGameState`.

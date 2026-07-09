# Interaction Audit: Rejection Reason Preflight Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-25-39-04-00`

## Current interaction action source

`GameCanvas.tsx` derives interaction action from two facts:

```txt
distanceToEnd < 6
hasCarriedCube
```

That produces:

```txt
pickup-cube
drop-cube
place-cube-at-anomaly
remove-cube-from-anomaly
```

## Current silent branches

```txt
not playing
missing player
already carrying while pickup
no nearby cube
no carried cube while drop/place
missing anomaly cell
too far from anomaly
no free slot
no occupied slot
wrong slot
missing cube id
request-sync/toggle-ready/cancel/default
missing player update
held cube already synced
```

## Required preflight helpers

```txt
preflightPickupCube(state, input)
preflightDropCube(state, input)
preflightPlaceCubeAtEndAnomaly(state, input)
preflightRemoveCubeFromEndAnomaly(state, input)
preflightNetworkInteraction(state, input)
preflightPlayerUpdate(state, input)
preflightHeldCubeSync(state)
```

## Required output

```txt
InteractionPreflightResult {
  ok
  reason
  playerId
  cubeId
  slotId
  distanceToTarget
  selectedCubeId
  selectedSlotId
  diagnostics
}
```

## Contract

Every branch that currently returns unchanged `GameState` must return an explicit reason before the next `GameCanvas` splice.

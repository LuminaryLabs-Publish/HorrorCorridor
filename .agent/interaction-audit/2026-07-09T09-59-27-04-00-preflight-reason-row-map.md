# Interaction Audit: Preflight Reason Row Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T09-59-27-04-00`

## Why this audit exists

The interaction domain has enough gameplay behavior to play the maze, but it does not expose why a command is rejected or skipped.

The next implementation should split preflight from mutation before `GameCanvas.tsx` consumes command results.

## Current interaction functions

```txt
pickUpCube(state, input)
dropCube(state, input)
placeCubeAtEndAnomaly(state, input)
removeCubeFromEndAnomaly(state, input)
```

Each function returns `GameState` only.

## Current no-op branches to classify

```txt
shared:
- state.gameState !== playing
- missing player

pickup:
- player already carrying a cube
- explicit cube id missing from loose candidates
- explicit cube id too far away
- no nearby loose cube

drop:
- no carried cube

place:
- no carried cube
- missing anomaly cell
- too far from anomaly
- requested slot does not exist
- requested slot is occupied
- no free slot

remove:
- player is already carrying
- missing anomaly cell
- too far from anomaly
- no occupied slot
- requested slot is not last occupied slot
- missing cube id in occupied slot
```

## Preflight result shape

```txt
InteractionPreflightResult
  ok: boolean
  action
  reason
  player
  carriedCube
  targetCube
  anomalyCell
  targetSlot
  distanceToTarget
  diagnostics
```

## Reason row map

```txt
pickup accepted near cube -> accepted:pickup
pickup while already carrying -> rejected:already-carrying
pickup no nearby cube -> rejected:no-nearby-cube
pickup explicit cube too far -> rejected:no-nearby-cube
pickup missing player -> rejected:missing-player
pickup while not playing -> rejected:not-playing

drop accepted while carrying -> accepted:drop
drop without carried cube -> rejected:no-carried-cube
drop missing player -> rejected:missing-player
drop while not playing -> rejected:not-playing

place accepted near anomaly -> accepted:place
place final slot completes sequence -> victory:ordered-sequence-complete
place too far from anomaly -> rejected:too-far-from-anomaly
place without carried cube -> rejected:no-carried-cube
place missing anomaly cell -> rejected:missing-anomaly-cell
place no free slot -> rejected:no-free-slot
place requested occupied slot -> rejected:no-free-slot
place missing player -> rejected:missing-player
place while not playing -> rejected:not-playing

remove accepted last occupied slot -> accepted:remove
remove while carrying -> rejected:already-carrying
remove too far from anomaly -> rejected:too-far-from-anomaly
remove no occupied slot -> rejected:no-occupied-slot
remove wrong requested slot -> rejected:wrong-slot
remove missing cube id -> rejected:missing-cube-id
remove missing player -> rejected:missing-player
remove while not playing -> rejected:not-playing
```

## Fixture fixture-first requirement

Do not wire this into `GameCanvas.tsx` first.

Add DOM-free rows that prove every reason above from canonical seed states before changing runtime consumers.

## Acceptance

```txt
[ ] each preflight row has stable reason.
[ ] mutation functions call preflight or share its facts.
[ ] legacy interaction exports still return GameState.
[ ] result-returning interaction exports expose CommandResult.
[ ] fixture rows prove no rejected command mutates cube ownership, slots, or victory state.
```

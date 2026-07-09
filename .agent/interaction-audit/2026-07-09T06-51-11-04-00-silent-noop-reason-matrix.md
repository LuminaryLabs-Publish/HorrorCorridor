# Interaction Audit: Silent No-op Reason Matrix

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-51-11-04-00`

## Source files

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Current silent no-op surfaces

```txt
pickUpCube
  -> not playing returns same state
  -> missing player returns same state
  -> already carrying returns same state
  -> no nearby cube returns same state

dropCube
  -> not playing returns same state
  -> missing player returns same state
  -> no carried cube returns same state

placeCubeAtEndAnomaly
  -> not playing returns same state
  -> missing player returns same state
  -> no carried cube returns same state
  -> missing anomaly cell returns same state
  -> too far from anomaly returns same state
  -> no free slot returns same state

removeCubeFromEndAnomaly
  -> not playing returns same state
  -> missing player returns same state
  -> already carrying returns same state
  -> missing anomaly cell returns same state
  -> too far from anomaly returns same state
  -> no occupied slot returns same state
  -> wrong requested slot returns same state
  -> missing cube id returns same state

applyNetworkPlayerUpdate
  -> missing player returns same state

syncHeldCubesToPlayers
  -> already synced returns same state

applyNetworkInteractionRequest
  -> request-sync returns same state
  -> toggle-ready returns same state
  -> cancel returns same state
  -> default/unknown action returns same state
```

## Reason-matrix target

```txt
not playing -> rejected:not-playing
missing player -> rejected:missing-player or unchanged:player-missing by command type
already carrying -> rejected:already-carrying
no nearby cube -> rejected:no-nearby-cube
no carried cube -> rejected:no-carried-cube
missing anomaly cell -> rejected:missing-anomaly-cell
too far from anomaly -> rejected:too-far-from-anomaly
no free slot -> rejected:no-free-slot
no occupied slot -> rejected:no-occupied-slot
wrong requested slot -> rejected:wrong-slot
missing cube id -> rejected:missing-cube-id
already synced -> unchanged:held-cube-already-synced
request-sync -> publish-only:request-sync
toggle-ready -> skipped:toggle-ready-policy-not-implemented
cancel -> skipped:cancel-policy-not-implemented
unknown action -> skipped:unknown-action
ordered sequence complete -> victory:ordered-sequence-complete
```

## Interaction preflight outputs

```txt
player: found/missing
carriedCube: found/missing
nearestCube: found/missing, cube id, distance
anomalyCell: found/missing
anomalyDistance: number
slot: found/missing, slot id
stateReady: boolean
recommendedReason: CommandReason
```

## Consumer expectation

The result consumer should not infer rejection from object identity.

It should receive a `CommandResult` with explicit status, reason, changed flag, events, and state.

## Fixture requirement

The DOM-free fixture must cover every silent no-op branch before `GameCanvas.tsx` stops using the legacy rule return values directly.

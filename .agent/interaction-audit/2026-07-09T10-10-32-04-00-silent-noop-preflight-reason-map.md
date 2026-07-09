# Interaction Audit — Silent No-op Preflight Reason Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T10-10-32-04-00`

## Current interaction inputs

```txt
local interact key
  -> derive action from distance to end anomaly and carried-cube state

client TRY_INTERACT
  -> host receives action and optional cubeId/slotId

network player update
  -> host receives pose/update payload
```

## Silent no-op map

### Shared readiness

```txt
state.gameState !== 'playing'
  current result: same GameState
  required reason: rejected:not-playing
```

### Pickup

```txt
missing player
  required reason: rejected:missing-player

already carrying cube
  required reason: rejected:already-carrying

requested cube missing/not loose/not visible/not active/locked/out of range
  required reason: rejected:no-nearby-cube

no nearest loose cube within interaction distance
  required reason: rejected:no-nearby-cube
```

### Drop

```txt
missing player
  required reason: rejected:missing-player

no carried cube
  required reason: rejected:no-carried-cube
```

### Place at anomaly

```txt
missing player
  required reason: rejected:missing-player

no carried cube
  required reason: rejected:no-carried-cube

missing anomaly cell
  required reason: rejected:missing-anomaly-cell

too far from anomaly
  required reason: rejected:too-far-from-anomaly

explicit slot missing or occupied
  required reason: rejected:no-free-slot

no free sequence slot
  required reason: rejected:no-free-slot
```

### Remove from anomaly

```txt
missing player
  required reason: rejected:missing-player

already carrying cube
  required reason: rejected:already-carrying

missing anomaly cell
  required reason: rejected:missing-anomaly-cell

too far from anomaly
  required reason: rejected:too-far-from-anomaly

no occupied slot
  required reason: rejected:no-occupied-slot

requested slot is not last occupied slot
  required reason: rejected:wrong-slot

occupied slot missing cube id
  required reason: rejected:missing-cube-id
```

### Network player update

```txt
missing player
  required reason: unchanged:player-missing

same pose after held-cube sync
  required reason: unchanged:no-state-diff
```

### Held cube sync

```txt
held cube owner missing from player lookup
  required reason: unchanged:player-missing

held cube position already equals player position
  required reason: unchanged:held-cube-already-synced
```

### Network actions

```txt
request-sync
  required reason: publish-only:request-sync

toggle-ready
  required reason: skipped:toggle-ready-policy-not-implemented

cancel
  required reason: skipped:cancel-policy-not-implemented

unknown/default
  required reason: skipped:unknown-action
```

## Preflight kit responsibility

`interaction-preflight-kit` should not mutate state.

It should return:

```txt
ready: boolean
status: CommandStatus
reason: CommandReason
player?: Player
carriedCube?: Cube
nearestCube?: Cube
anomalyCell?: MazeCellSnapshot
slot?: SequenceSlot
distanceFacts?: object
diagnostics: serializable object
```

## Acceptance rule

Every branch that currently returns `state` unchanged must become observable in a DOM-free fixture row before `GameCanvas.tsx` consumes the new result contracts.

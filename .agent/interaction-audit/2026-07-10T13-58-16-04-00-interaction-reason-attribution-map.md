# HorrorCorridor Interaction Audit: Reason Attribution Map

**Timestamp:** `2026-07-10T13-58-16-04-00`

## Interaction inputs

```txt
pickup-cube
drop-cube
place-cube-at-anomaly
remove-cube-from-anomaly
```

## Current derivation

`GameCanvas` derives the interaction from local carry state and proximity, then local authority or the host calls `applyNetworkInteractionRequest`. The called interaction rule returns either a new `GameState` or the original state.

## Required reason map

| Action | Condition | Current result | Required reason |
|---|---|---|---|
| pickup | game not playing | original state | `rejected:not-playing` |
| pickup | player missing | original state | `rejected:player-missing` |
| pickup | player already carrying | original state | `rejected:already-carrying` |
| pickup | target missing/unavailable | original state | `rejected:cube-unavailable` |
| pickup | cube outside range | original state | `rejected:outside-interaction-range` |
| pickup | valid loose cube | changed state | `accepted:pickup` |
| drop | game not playing | original state | `rejected:not-playing` |
| drop | player missing | original state | `rejected:player-missing` |
| drop | no carried cube | original state | `rejected:not-carrying` |
| drop | valid carried cube | changed state | `accepted:drop` |
| place | game not playing | original state | `rejected:not-playing` |
| place | player/cube/anomaly missing | original state | specific missing reason |
| place | outside anomaly range | original state | `rejected:outside-anomaly-range` |
| place | no free slot | original state | `rejected:no-free-slot` |
| place | valid slot | changed state | `accepted:place` |
| place | final ordered slot | changed state | `victory:ordered-sequence-complete` |
| remove | game not playing | original state | `rejected:not-playing` |
| remove | player missing or already carrying | original state | specific reason |
| remove | outside anomaly range | original state | `rejected:outside-anomaly-range` |
| remove | no occupied slot | original state | `rejected:no-occupied-slot` |
| remove | requested slot is not last | original state | `rejected:wrong-removal-slot` |
| remove | valid last occupied slot | changed state | `accepted:remove` |

## Preflight rule

Reason assignment should happen before mutation. The preflight result should be serializable and should identify the selected cube/slot where applicable.

```txt
InteractionPreflight {
  accepted
  reason
  playerId
  cubeId?
  slotId?
  distanceSquared?
  limitSquared?
}
```

## Mutation rule

Mutation should consume a successful preflight rather than rediscovering the target. This keeps fixture attribution stable and avoids different target selection between validation and execution.

## Consumer rule

```txt
rejected preflight -> CommandResult rejected -> journal -> skip publication
accepted preflight + changed mutation -> CommandResult accepted -> publish
accepted final placement -> CommandResult victory -> publish and complete
```

## Non-goals

Do not retune interaction distances, anomaly distances, slot ordering, cube visibility, carry behavior, or victory requirements in this slice.
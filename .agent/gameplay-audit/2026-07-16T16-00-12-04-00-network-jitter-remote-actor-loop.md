# Network-Jitter Remote Actor Loop

**Timestamp:** `2026-07-16T16-00-12-04-00`

## Summary

Local movement is predicted every active frame, while remote movement is shown only at the newest authoritative pose. The asymmetry is valid for gameplay authority but incomplete for visual projection.

## Intent

Keep local control responsive and host state authoritative while preventing remote actors from visibly stepping with packet delivery cadence.

## Current loop

```txt
client local input
  -> local movement and collision every RAF
  -> PLAYER_UPDATE approximately every 50 ms

host
  -> apply remote player update
  -> publish authoritative SYNC snapshot

receiving client
  -> replace current snapshot
  -> remote mesh and minimap marker jump to newest pose
```

## Risk scenarios

| Scenario | Current presentation risk |
|---|---|
| Stable 50 ms delivery | Remote motion advances in visible steps |
| Variable latency | Step duration changes frame to frame |
| Lost snapshot | Remote actor remains fixed longer, then jumps farther |
| Reordered snapshot | Presentation has no dedicated stale-sample guard |
| Large correction | No teleport threshold distinguishes correction from continuous motion |
| Player leaves | Mesh retirement exists, but no interpolation-buffer retirement contract exists |

## Required gameplay/presentation split

```txt
authoritative snapshot
  -> gameplay and interaction truth

RemoteActorProjectionResult
  -> presentation-only remote pose
  -> never used for collision, interaction or victory authority
```

## Required invariants

- Local prediction remains frame-responsive.
- Host snapshot remains the only gameplay authority.
- Remote interpolation cannot expand interaction range.
- A teleport or large correction is applied immediately.
- Extrapolation ends after a bounded budget.
- Removed players disappear from gameplay and presentation ownership.

## Validation boundary

No multiplayer session, latency simulation or packet manipulation fixture was run. This audit does not claim that visible jitter is currently severe; it identifies the missing authority needed to make behavior deterministic and testable.
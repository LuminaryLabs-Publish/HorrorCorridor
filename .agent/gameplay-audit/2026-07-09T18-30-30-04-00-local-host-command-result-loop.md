# Gameplay Audit: Local Host Command Result Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T18-30-30-04-00`

## Current gameplay authority

```txt
local solo/host interact
  -> GameCanvas derives pickup/drop/place/remove from local carry state and anomaly distance
  -> applyNetworkInteractionRequest returns GameState only
  -> unchanged state returns silently
  -> changed state syncs held cubes
  -> publishAuthoritativeState("resync")
  -> victory is inferred from next gameState

host peer message
  -> PLAYER_UPDATE applies applyNetworkPlayerUpdate
  -> TRY_INTERACT applies applyNetworkInteractionRequest
  -> request-sync/toggle-ready/cancel/default collapse to unchanged state
  -> publish/recovery behavior is implicit in GameCanvas
```

## Current rule behavior

`interactionRules.ts` has valid state transitions but returns unchanged state for rejected branches.

`networkRules.ts` has useful message adapters but also returns unchanged state for missing player, request-sync, toggle-ready, cancel, and unknown/default actions.

`oozeRules.ts` returns state only for decay/spawn/no-diff paths.

`winRules.ts` can set or clear victory based on sequence slot evaluation, but victory is not an explicit command result event.

## Missing result rows

```txt
accepted:pickup
rejected:already-carrying
rejected:no-nearby-cube
accepted:drop
rejected:no-carried-cube
accepted:place
rejected:too-far-from-anomaly
rejected:no-free-slot
accepted:remove
rejected:wrong-slot
publish-only:request-sync
skipped:toggle-ready-policy-not-implemented
skipped:cancel-policy-not-implemented
skipped:unknown-action
accepted:player-update
unchanged:player-missing
accepted:ooze-tick
unchanged:ooze-no-diff
victory:ordered-sequence-complete
```

## Next gameplay proof

Create command fixture rows first. Then wire local and host authority consumers only after the fixture proves accepted, rejected, unchanged, skipped, recovery, ooze, and victory cases.

# Gameplay Audit: Local Host Command Decision Loop

**Timestamp:** `2026-07-10T10-58-54-04-00`

## Current gameplay loop

```txt
first-person input
  -> local pose and view angle update
  -> interact key derives action
  -> pickup / drop / place / remove GameState rules
  -> host/client network messages
  -> PLAYER_UPDATE and TRY_INTERACT GameState rules
  -> ooze cadence GameState rule
  -> ordered sequence win GameState rule
  -> snapshot publish or skip inferred inline
```

## Current gameplay services

```txt
player movement and camera look
maze collision
cube pickup/drop/place/remove
held cube synchronization
ordered anomaly sequence validation
ooze trail cadence/decay/spawn
replicated snapshot publishing
```

## Gameplay gap

The route has game logic, but not gameplay command result authority.

Missing proof rows:

```txt
accepted pickup/drop/place/remove
rejected pickup/drop/place/remove
unchanged player update
accepted held cube sync
skipped request-sync/toggle-ready/cancel/unknown
publish-only request-sync recovery
ooze spawn/decay/no-state-diff
victory ordered sequence completion
local consumer broadcast skip/publish
host consumer broadcast skip/publish
```

## Next target

Add result-returning wrappers beside the legacy GameState rules. Keep old exports returning `result.state` until the command fixture proves parity.

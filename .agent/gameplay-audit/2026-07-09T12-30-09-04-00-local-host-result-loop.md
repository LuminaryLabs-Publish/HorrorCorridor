# HorrorCorridor Gameplay Audit: Local / Host Result Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-30-09-04-00`

## Current gameplay loop

```txt
start menu
  -> solo / host / join
  -> readiness and initial replicated snapshot
  -> pointer-lock first-person movement
  -> local input advances pose and view angles
  -> interact derives action from distance-to-end and carried-cube state
  -> pickup/drop/place/remove mutate GameState through rules
  -> ordered anomaly slots validate color sequence
  -> ooze cadence mutates authoritative state
  -> host/local publishes replicated snapshot
  -> client renders snapshot and sends PLAYER_UPDATE / TRY_INTERACT
```

## Current interaction rules

```txt
pickup-cube: needs playing state, player, no carried cube, nearest loose cube in range
drop-cube: needs playing state, player, carried cube
place-cube-at-anomaly: needs playing state, player, carried cube, anomaly cell, distance, free slot
remove-cube-from-anomaly: needs playing state, player, no carried cube, anomaly cell, distance, last occupied slot
```

Every rejection currently returns the prior `GameState` without a reason object.

## Current host rules

```txt
PLAYER_UPDATE
  -> applyNetworkPlayerUpdate
  -> unchanged if missing player
  -> syncHeldCubesToPlayers
  -> publish resync

TRY_INTERACT
  -> applyNetworkInteractionRequest
  -> request-sync/toggle-ready/cancel/default can return unchanged state
  -> syncHeldCubesToPlayers
  -> publish resync or recovery by action string
  -> commit victory by post-state check
```

## Gameplay services currently offered

```txt
session and readiness routing
local first-person movement
maze collision
cube pickup/drop/place/remove
sequence slot validation
victory completion
ooze advance
snapshot publication
client movement replication
host interaction authority
runtime debug frames
```

## Missing gameplay proof

```txt
- no command id per local interact or peer message
- no command source classification for local, host, client, recovery, or fixture
- no preflight reason for failed interactions
- no changed/no-change result row
- no explicit publish decision
- no local/host consumer result row
- no fixture proof that legacy GameState outcomes are preserved
```

## Next gameplay cut

Add source-owned command result records without changing the live route first. Keep current `GameState` rules as compatibility exports while adding result-returning wrappers and fixture rows.

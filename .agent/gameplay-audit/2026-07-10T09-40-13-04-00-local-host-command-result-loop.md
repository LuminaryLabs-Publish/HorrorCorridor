# Gameplay Audit: Local and Host Command Result Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T09-40-13-04-00`

## Current gameplay loop

```txt
player enters maze
  -> pointer-lock movement updates local pose
  -> interact key chooses pickup, drop, place, or remove
  -> solo/host applies interaction rules locally
  -> client sends TRY_INTERACT
  -> host applies TRY_INTERACT
  -> host also applies PLAYER_UPDATE, request-sync, toggle-ready, cancel, unknown/default actions
  -> ooze cadence mutates trail state
  -> anomaly sequence may trigger victory
  -> changed snapshot is published or skipped by implicit state comparison/reason strings
```

## Gameplay domains

```txt
first-person movement
maze collision
cube carry and placement
anomaly slot sequence
ordered victory condition
ooze trail pressure
host-authoritative replication
client prediction/readback
runtime debug observation
```

## Gameplay blocker

The gameplay rules already cover useful play paths. The missing piece is not new gameplay. It is result authority.

```txt
accepted pickup/drop/place/remove has no result envelope
rejected pickup/drop/place/remove has no stable CommandReason
unchanged player update has no no-op row
request-sync recovery is not a publish-only CommandResult
toggle-ready/cancel are not explicit skipped rows
ooze spawn/decay/no-state-diff lacks command status rows
ordered victory/completion lacks command status rows
local/host consumers infer publish from state identity and reason strings
```

## Fixture rows needed before gameplay expansion

```txt
accepted pickup near loose cube
rejected pickup while carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
accepted place final anomaly slot as victory
rejected place too far from anomaly
rejected place with no free slot
accepted remove last anomaly cube
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update for missing player
accepted held cube sync
unchanged held cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
victory rollback if slots become invalid
local consumer skips rejected/no-op broadcast
local consumer publishes accepted changed/victory
host consumer skips rejected TRY_INTERACT broadcast
host consumer publishes request-sync recovery
```

## Next safe gameplay ledge

```txt
HorrorCorridor Command Result Debug Projection Ledger Refresh + Fixture Gate
```

## Non-goals

```txt
- new maze content
- new cube colors
- new ooze behavior
- movement retune
- camera retune
- renderer replacement
- PeerJS rewrite
```

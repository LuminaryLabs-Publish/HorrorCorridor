# HorrorCorridor Local/Host Authority Replay Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-40-50-04-00`

## Current gameplay loop

```txt
start session
-> enter maze
-> move through pointer-lock first-person controls
-> find loose cube
-> interact to pick up cube
-> carry cube to anomaly
-> interact to place cube into next sequence slot
-> sequence validates required color order
-> remove/drop/retry when sequence is wrong
-> ooze advances on cadence
-> final ordered sequence sets victory
```

## Current authority paths

```txt
solo/local-host interact
-> action string from GameCanvas
-> applyNetworkInteractionRequest
-> unchanged state silently returns
-> changed state syncs held cubes
-> publishAuthoritativeState("resync")
-> optional victory commit

client interact
-> createInteractionRequestMessage
-> host receives TRY_INTERACT
-> applyNetworkInteractionRequest
-> changed state publishes
-> rejected/unknown/no-op state can collapse silently

host player update
-> applyNetworkPlayerUpdate
-> syncHeldCubesToPlayers
-> changed/unchanged status not explicit
```

## Replay rows required

```txt
accepted: pickup near loose cube
rejected: pickup while already carrying
rejected: pickup with no nearby cube
accepted: drop while carrying
rejected: drop without carried cube
accepted: place near anomaly
victory: place final slot
rejected: place too far from anomaly
rejected: place with no free slot
accepted: remove last anomaly cube
rejected: remove wrong slot
publish-only: request-sync recovery
skipped: toggle-ready
skipped: cancel
skipped: unknown action
accepted: player update
unchanged: missing player update
accepted: held-cube sync
unchanged: held-cube already synced
ooze: spawn
ooze: decay
ooze: no-state-diff
victory: ordered sequence completion
```

## Gameplay services in use

```txt
player movement service: input, view angles, collision, pose
interaction service: pickup, drop, place, remove
sequence service: ordered anomaly validation and victory state
ooze service: cadence spawn/decay/no-diff behavior
network service: player update and interaction request ingestion
publish service: full sync and resync broadcast
replay service: planned DOM-free command fixture rows
```

## Main gameplay finding

The playable loop is complete enough for the next pass to avoid adding new mechanics.

The missing gameplay layer is not content; it is proof that accepted, rejected, skipped, unchanged, recovery, ooze, and victory outcomes are reproducible through local and host consumers without browser state.

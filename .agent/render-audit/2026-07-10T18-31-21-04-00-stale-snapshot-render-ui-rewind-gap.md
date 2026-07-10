# HorrorCorridor Stale Snapshot Render and UI Rewind Gap

**Timestamp:** `2026-07-10T18-31-21-04-00`

## Current render-consumption path

```txt
runtimeStore.authoritativeSnapshot
  -> GameCanvas latestSnapshot
  -> world.update(snapshot)
  -> drawMinimapFrame(snapshot)
  -> runtime debug frame snapshot summary
  -> postProcessing.render()
```

`GameShell` also projects every inbound snapshot into room, lobby, completion, screen, gameScreen, pause, and readiness stores.

## Gap

There is no accepted-snapshot commit marker shared by UI and render consumers. Any snapshot placed in `runtimeStore` is treated as authoritative, even when it is older, duplicated, from another room, or internally inconsistent.

## Observable rewind cases

```txt
victory SYNC accepted at tick 120
  -> delayed playing SYNC at tick 118 arrives
  -> screen can return to PLAYING
  -> anomaly slots and cubes can render older state

ooze trail accepted at tick 80
  -> stale tick 77 arrives
  -> newer ooze entries disappear from world and minimap

remote player accepted at tick 45
  -> duplicate/conflicting tick 45 arrives
  -> pose can jump without a classified conflict
```

## Required render contract

```txt
render consumers read only AcceptedSnapshotRecord.snapshot
AcceptedSnapshotRecord includes authorityEpoch, tick, fingerprint, source, acceptedAtMs
UI projection and render projection share the same accepted record id
rejected snapshots never enter runtimeStore.authoritativeSnapshot
runtime debug records candidate rejection separately
```

## Required proof rows

```txt
accepted tick 12 renders tick 12
stale tick 11 does not change world or minimap
conflicting duplicate tick 12 does not change world or minimap
victory remains visible after stale playing candidate
room and UI record id equals rendered snapshot record id
```

## Non-goals

No renderer, minimap, post-processing, scene-dressing, or object-kit rewrite is required for this gate.
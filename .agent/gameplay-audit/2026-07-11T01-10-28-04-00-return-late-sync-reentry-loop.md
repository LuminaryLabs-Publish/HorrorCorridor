# Return, Late Sync, and Re-entry Gameplay Loop

**Timestamp:** `2026-07-11T01-10-28-04-00`

## Active loop

```txt
start solo or host/client run
  -> simulate movement, interaction, ooze, anomaly, and publication
  -> pause-return or completion-restart
  -> set lobby UI/readiness locally
  -> stop local GameCanvas work
  -> keep room, snapshot, transport, and shell callback alive
  -> receive late active SYNC or START_GAME
  -> project PLAYING/PAUSED/COMPLETED again
  -> optionally bootstrap another run without epoch separation
```

## Gameplay risk

The product can visually leave a run without closing its authoritative gameplay identity. Late traffic may restore active gameplay, apply stale room/player/cube/anomaly state, or contaminate a new bootstrap. Repeated exit requests also have no stable no-change result.

## Required gameplay authority

```txt
active
  -> exiting
  -> lobby or closed
```

An accepted exit must atomically:

```txt
stop movement mutation
stop interaction mutation
stop ooze mutation
stop client player-update send
stop host remote command consumption
stop active snapshot publication
publish terminal lifecycle
archive or clear active snapshot
commit lobby/closed projection
```

## Required results

```txt
accepted: exit committed
rejected: wrong actor/role/phase/identity
no-change: duplicate or already terminal
```

Every result needs stable reason, request id, previous/next phase, run identity, epoch, authority source, mutation flag, publication id, and teardown handoff id.

## Fixture matrix

```txt
solo pause-return
solo completion-restart
host lobby return with client
client local leave
host room close
quit to title
duplicate exit
late old-run SYNC
late old-run START_GAME
late old-run PLAYER_UPDATE
late old-run TRY_INTERACT
new-run bootstrap and first accepted command
```

## Recommendation

Do not add gameplay content or rebalance movement/ooze before the run lifecycle is deterministic and fixture-readable.

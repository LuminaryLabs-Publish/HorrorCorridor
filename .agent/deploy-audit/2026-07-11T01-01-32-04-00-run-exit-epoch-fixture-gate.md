# HorrorCorridor Run Exit and Epoch Fixture Gate

**Timestamp:** `2026-07-11T01-01-32-04-00`

## Current validation surface

```txt
build
lint
ProtoKit smoke
HorrorCorridor harness
live-agent sample/review
object-kit review
visual match
live-player validation
```

## Missing deterministic gate

```txt
npm run fixture:session-lifecycle
```

## Fixture design

The fixture should run without React, DOM, Three.js, PeerJS, or browser storage. Inject deterministic clocks, ids, transport callbacks, store snapshots, cleanup adapters, and message order.

## Required scenarios

```txt
solo return/restart
host return with one client
client leave while host remains active
host room close
title exit
duplicate exit command
wrong actor/role
wrong room/game
stale epoch
late START_GAME
late SYNC
late PLAYER_UPDATE
late TRY_INTERACT
late LOBBY_EVENT
transport preserve
transport destroy
cleanup replay
fresh re-entry
```

## Required assertions

```txt
one terminal result per command
one lifecycle publication per accepted exit
zero active mutation after terminal result
zero old-epoch accepted messages
correct preserve/destroy policy
exactly-once cleanup
coherent room/UI/runtime/snapshot commit
sessionEpoch increments exactly once on new bootstrap
first lobby and first new-run observations reference correct results
all rows serialize to JSON
```

## Package integration

```txt
fixture:session-lifecycle
  -> node scripts/horror-corridor-session-lifecycle-fixture.mjs

npm run check or CI
  -> fixture:session-lifecycle
  -> lint
  -> smoke:protokits
  -> harness:horror-corridor
  -> build
```

## Browser gate after fixture

```txt
solo return and restart
host return with connected client
client leave and rejoin
title exit and transport cleanup
delayed old SYNC injection
runtime-debug lifecycle export
```

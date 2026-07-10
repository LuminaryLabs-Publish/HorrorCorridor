# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T18-31-21-04-00`

## Available commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run live-agent:sample
npm run review:live-agent
npm run review:object-kit
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

## Missing required command

```txt
npm run fixture:snapshot-acceptance
```

## Evidence sampled

```txt
[done] full accessible LuminaryLabs-Publish inventory
[done] central ledger ordering and root .agent state
[done] GameShell inbound SYNC consumer
[done] runtimeStore authoritative snapshot setter
[done] FullSync payload and ProtocolEnvelope fields
[done] GameCanvas authoritative publication and snapshot reference path
[done] package scripts
[done] repo-local documentation update on main
[done] central ledger and internal change-log synchronization
```

## Required implementation validation

```txt
valid initial snapshot acceptance
monotonic higher-tick acceptance
duplicate idempotency
conflicting duplicate rejection
stale and out-of-order rejection
protocol-version rejection
wrong-host and wrong-room rejection
authoritativeTick / snapshot.tick mismatch rejection
gameId and seed continuity
reconnect/recovery epoch reset
victory cannot rewind to playing
cube, ooze, anomaly, player, room, and UI parity
runtime-debug accepted/rejected projection
legacy version-1 valid snapshot compatibility
```

## Validation order for the next source pass

```txt
1. npm run fixture:snapshot-acceptance
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. npm run review:object-kit
7. browser solo smoke
8. browser host/client smoke
9. delayed-message and reconnect smoke
10. runtime-debug export inspection
```

## Pass status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
deployment changed: no
branch created: no
pull request created: no
existing tests run: no
snapshot acceptance fixture: unavailable
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change-log added: yes
```
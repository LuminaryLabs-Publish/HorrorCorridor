# HorrorCorridor Gameplay Audit: Local/Host Command Result Loop

**Timestamp:** `2026-07-10T12-29-26-04-00`

## Current gameplay loop

```txt
player navigates maze
  -> interact key resolves intended action
  -> solo/host applies local interaction request
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE and TRY_INTERACT rules
  -> ooze cadence and ordered sequence validation mutate state
  -> authoritative snapshot publishes or silently skips
```

## Gameplay domains

```txt
first-person navigation
cube pickup/drop/place/remove
carried cube synchronization
anomaly sequence slots
ordered completion/victory
ooze cadence/spawn/decay
host/client authority
snapshot replication
```

## Command-result gaps

```txt
pickup/drop/place/remove return GameState only
missing player update returns unchanged state without reason
request-sync recovery is not a command result row
toggle-ready and cancel are not explicit skipped rows
unknown/default network action is not a skipped row
ooze no-state-diff is not a row
victory and victory rollback are not result rows
```

## Required fixture ladder

```txt
1. Build deterministic seed states.
2. Build CommandEnvelope rows for local, client, host, ooze, and win paths.
3. Wrap legacy rule calls in CommandResult constructors.
4. Preserve legacy state-returning exports.
5. Add publish decision classification.
6. Add local and host command consumers.
7. Prove accepted/rejected/skipped/no-op/recovery/victory/ooze rows.
8. Only then splice GameCanvas consumers.
```

## Next safe ledge

```txt
HorrorCorridor Command Result Readback Fixture Refresh + Runtime Debug Projection Gate
```

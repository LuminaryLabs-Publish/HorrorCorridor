# Reset Cleanup Readiness Loop

**Timestamp:** `2026-07-11T09-29-07-04-00`

## Gameplay loop

```txt
run active
  -> return to title
  -> destroy transport
  -> clear session
  -> reset runtime store
  -> reset UI and route to START
  -> GameCanvas unmounts
  -> cleanup patches readiness
```

## Defect

`resetRuntime()` restores all four readiness flags to `false`. The later `GameCanvas` cleanup then executes:

```txt
simulation: false
rendering: false
networking: true
input: false
```

Because the cleanup does not carry a session ID or runtime generation, the stale cleanup is accepted after reset. The title state can therefore report networking ready after transport destruction and full runtime reset.

## Solo consequence

The same cleanup writes `networking: true` for solo sessions even though solo initialization correctly marked networking false and no transport exists.

## Re-entry consequence

If a new session starts before old cleanup is observed, the old provider can mutate the new session's readiness because `patchReadiness()` merges patches without an ownership fence.

## Required gameplay guarantees

```txt
return to title ends with all runtime capabilities revoked
return to lobby retains networking only when a live transport proves it
solo never reports networking ready
new session generation cannot be changed by old cleanup
failed or cancelled loading leaves no ready capabilities
readiness changes do not imply gameplay admission by themselves
```

## Fixture scenarios

```txt
solo -> title
host run -> title
client run -> title
host run -> lobby
client run -> lobby
reset -> immediate new solo run
reset -> immediate new host run
old cleanup after new mount
strict-mode duplicate cleanup
```

No gameplay behavior was changed in this documentation pass.
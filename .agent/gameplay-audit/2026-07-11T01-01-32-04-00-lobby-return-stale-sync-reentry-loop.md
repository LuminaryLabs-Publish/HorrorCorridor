# HorrorCorridor Lobby Return, Stale SYNC, and Re-entry Loop

**Timestamp:** `2026-07-11T01-01-32-04-00`

## Current loop

```txt
active or victory run
  -> pause-return or CompleteScreen restart
  -> returnToLobby()
  -> reset UI
  -> set lobby screen
  -> set runtime readiness false/false/true/false
  -> keep room, snapshot, transport, and shell message handler
  -> GameCanvas unmount cleanup
```

## Stale SYNC path

```txt
local player is now in lobby
  -> retained transport receives old-run SYNC
  -> GameShell sets room and authoritative snapshot
  -> snapshot.gameState selects PLAYING, PAUSED, or COMPLETED
  -> GameCanvas can remount from old-run state
```

## Re-entry path

```txt
lobby primary action
  -> host bootstraps new state
  -> broadcasts START_GAME and initial SYNC
  -> no monotonic sessionEpoch distinguishes new run
  -> old messages and new messages share room identity
```

## Solo defect retained

```txt
solo returnToLobby
  -> sessionMode is solo
  -> next screen resolves to LOBBY_CLIENT
  -> primary action calls startPlay
  -> non-host branch toggles ready instead of bootstrapping solo
```

## Target loop

```txt
exit intent
  -> RunExitCommand
  -> authority/preflight
  -> accepted terminal result
  -> freeze simulation/interaction/publication
  -> publish lobby/closed lifecycle state
  -> commit UI/runtime/snapshot policy
  -> quarantine terminal epoch
  -> cleanup local runtime
  -> converge peers
  -> new explicit run-entry command
  -> sessionEpoch + 1
  -> fresh bootstrap
```

## Gameplay proof

```txt
no active tick after terminal result
no cube interaction after terminal result
no ooze mutation after terminal result
no player update accepted after terminal result
old-run victory cannot reappear after lobby commit
solo restart returns to solo
host/client roster remains coherent
new run starts from deterministic fresh bootstrap
```

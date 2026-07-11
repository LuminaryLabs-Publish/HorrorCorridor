# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T21-39-22-04-00`

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
npm run fixture:session-lifecycle
```

## Evidence sampled

```txt
[done] full accessible LuminaryLabs-Publish inventory
[done] central ledger ordering and root .agent state
[done] GameShell solo/host/client entry, pause, completion, return-to-lobby, and return-to-title routing
[done] GameCanvas runtime initialization, active loop, cleanup, and transport subscription
[done] animationLoop start/stop and RAF cancellation
[done] runtimeStore snapshot/readiness/reset behavior
[done] sessionStore room/roster/identity/reset behavior
[done] RoomPhase and replicated snapshot types
[done] START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, and LOBBY_EVENT protocol types
[done] winRules active/ending phase behavior
[done] worldBuilder attach/update/dispose behavior
[done] post-processing composer dispose behavior
[done] host transport destroy and event-bus cleanup
[done] package scripts
[done] repo-local documentation update on main
[done] central ledger and internal change-log synchronization
```

## Required implementation validation

```txt
solo active -> lobby transition accepted
solo ending -> lobby transition accepted
solo restart creates a new solo run and never routes to client lobby
host active/ending -> lobby transition accepted and replicated
client exit request is host-admitted or rejected with a stable reason
non-host forced room reset rejected
wrong-room, wrong-game, wrong-epoch, and stale-phase exit rejected
duplicate exit request replays one terminal result
return-to-lobby preserves live transport
return-to-title destroys transport exactly once
runtime teardown stops one RAF and removes one listener/subscription set
world, post-processing, renderer, canvas, and observer dispose exactly once
repeated teardown returns no-change without double disposal
previous authoritative snapshot is cleared or archived after accepted exit
room phase, UI screen, game screen, readiness, and epoch commit atomically
new run increments session epoch exactly once
old-epoch PLAYER_UPDATE rejected
old-epoch TRY_INTERACT rejected
old-epoch SYNC rejected
new-epoch START_GAME and initial SYNC accepted
host/client lobby projections converge after exit
lifecycle result/debug rows remain JSON-safe
```

## Validation order for the next source pass

```txt
1. npm run fixture:session-lifecycle
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run build
6. npm run validate:live-player:dev
7. npm run review:object-kit
8. browser solo pause -> lobby -> restart smoke
9. browser solo victory -> restart smoke
10. browser host/client return-to-lobby convergence smoke
11. browser client leave-room smoke
12. browser return-to-title teardown smoke
13. browser stale-message-after-reentry smoke
14. runtime-debug lifecycle export inspection
```

## Documentation-pass validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
rendering changed: no
network behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing tests run: no
session lifecycle fixture: unavailable
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change-log added: yes
```

## Why existing checks were not run

This pass changed Markdown and JSON audit state only. The missing lifecycle fixture is the proof gate being specified; existing runtime commands cannot prove session epoch admission, host/client exit convergence, or exactly-once teardown without that fixture.
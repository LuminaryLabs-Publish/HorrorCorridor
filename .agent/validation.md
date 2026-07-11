# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T01-01-32-04-00`

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

## Missing required commands

```txt
npm run fixture:session-lifecycle
npm run fixture:pause-convergence
```

## Evidence sampled

```txt
[done] complete accessible LuminaryLabs-Publish inventory
[done] central ledger ordering and root .agent state
[done] GameShell entry, transport creation/destruction, message handling, returnToLobby, returnToStart, and screen projection
[done] GameCanvas publication, transport consumption, local admission, RAF/render ownership, and cleanup
[done] sessionStore room/roster/identity/reset shape
[done] runtimeStore snapshot/readiness/reset shape
[done] Peer host destroy, broadcast, send, disconnect, and event-bus behavior
[done] shared room phase, snapshot, and network envelope types
[done] existing repo-local lifecycle and pause audits
[done] package command inventory from current audit state
[done] repo-local documentation update on main
[done] central ledger and internal change-log synchronization
```

## Required session lifecycle validation

```txt
solo pause-return and victory-restart produce terminal results
host return publishes lifecycle lobby state to clients
client leave does not close the host room
host close and title exit destroy transport exactly once
lobby return preserves transport under a new admission generation
accepted exit freezes simulation and gameplay commands
old-epoch PLAYER_UPDATE and TRY_INTERACT reject
old-epoch START_GAME, SYNC, and LOBBY_EVENT reject
duplicate exit request replays one terminal result
room phase, UI, runtime readiness, snapshot policy, transport policy, and epoch commit coherently
GameCanvas cleanup correlates with the terminal exit result
new run increments sessionEpoch exactly once
new run accepts only new-epoch traffic
first lobby frame/readback references the accepted exit result
all lifecycle rows remain JSON-safe
```

## Validation order for the next source pass

```txt
1. npm run fixture:session-lifecycle
2. npm run fixture:pause-convergence
3. npm run lint
4. npm run smoke:protokits
5. npm run harness:horror-corridor
6. npm run build
7. npm run validate:live-player:dev
8. npm run review:object-kit
9. browser solo return/restart smoke
10. browser host return with client convergence smoke
11. browser client leave/rejoin smoke
12. browser title exit and transport disposal smoke
13. runtime-debug lifecycle export inspection
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
transport quarantine fixture: unavailable
pause convergence fixture: unavailable
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change-log added: yes
```

## Why existing checks were not run

This pass changed Markdown and JSON audit state only. Existing build, visual, and live-player commands cannot prove run-exit command authority, lifecycle publication, epoch admission, late-callback quarantine, exactly-once teardown, or re-entry convergence. Those guarantees require the missing deterministic lifecycle fixture.

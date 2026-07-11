# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T01-10-28-04-00`

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
npm run fixture:session-message-admission
npm run fixture:pause-convergence
```

## Evidence sampled

```txt
[done] complete accessible LuminaryLabs-Publish inventory
[done] central ledger and root .agent timestamp comparison
[done] GameShell transport ownership, message handling, returnToLobby, returnToStart, run entry, and screen projection
[done] RoomState, ReplicatedGameSnapshot, and NetworkEnvelope identity fields
[done] session/runtime/UI store responsibilities from current audit state
[done] current repo-local run-exit and pause audit set
[done] implemented kit and service inventory
[done] package command inventory from current audit state
[done] repo-local documentation update on main
[done] central ledger and internal change-log synchronization
```

## Required session lifecycle validation

```txt
solo pause-return and victory-restart produce terminal results
host return publishes terminal lifecycle and lobby state
client leave does not close the host room
host close and title exit destroy transport exactly once
lobby return preserves transport under a new callback generation
accepted exit freezes simulation and gameplay command admission
old PLAYER_UPDATE and TRY_INTERACT reject
old START_GAME, SYNC, and LOBBY_EVENT reject
wrong room/game/runSessionId/sessionEpoch reject
duplicate exit request replays one terminal result
room phase, UI, runtime readiness, snapshot policy, transport policy, and epoch commit coherently
GameCanvas cleanup correlates with the terminal exit result
new run increments sessionEpoch exactly once
new run accepts only new-epoch traffic
first lobby frame/readback references the accepted exit result
all lifecycle and admission rows remain JSON-safe
```

## Validation order for the next source pass

```txt
1. npm run fixture:session-lifecycle
2. npm run fixture:session-message-admission
3. npm run fixture:pause-convergence
4. npm run lint
5. npm run smoke:protokits
6. npm run harness:horror-corridor
7. npm run build
8. npm run validate:live-player:dev
9. npm run review:object-kit
10. browser solo return/restart smoke
11. browser host return with client convergence smoke
12. browser client leave/rejoin smoke
13. browser title exit and transport disposal smoke
14. runtime-debug lifecycle/admission export inspection
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
session message-admission fixture: unavailable
transport quarantine fixture: unavailable
pause convergence fixture: unavailable
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change-log added: yes
```

## Why existing checks were not run

This pass changed Markdown and JSON audit state only. Existing build, visual, and live-player commands cannot prove run-exit command authority, lifecycle publication, session-epoch admission, callback-generation quarantine, exactly-once teardown, or re-entry convergence. Those guarantees require the missing deterministic lifecycle and message-admission fixtures.

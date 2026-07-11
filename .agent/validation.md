# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T23-30-13-04-00`

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
[done] full accessible LuminaryLabs-Publish inventory
[done] central ledger ordering and root .agent state
[done] GameShell solo/host/client entry, SYNC projection, pause/resume, exit routing, and transport ownership
[done] GameCanvas pointer-lock, keyboard, blur, pause, local simulation, host command consumption, publication, rendering, and cleanup paths
[done] uiStore pause state, reason, overlay, and screen projection
[done] shared room phase, app screen, game screen, snapshot, and network envelope types
[done] START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, and LOBBY_EVENT protocol surface
[done] runtime debug frame/event shape
[done] package scripts
[done] repo-local documentation update on main
[done] central ledger and internal change-log synchronization
```

## Required lifecycle validation retained

```txt
solo and host/client exit transitions converge
run re-entry increments session epoch exactly once
old-epoch active messages reject
return-to-lobby preserves transport
return-to-title destroys transport exactly once
runtime resources dispose exactly once
room phase, UI, snapshot, readiness, and epoch commit coherently
```

## Required pause validation

```txt
solo playing -> paused accepted
solo paused -> playing accepted
solo pause stops movement, interaction, and ooze
host global pause accepted and published
host paused rejects remote PLAYER_UPDATE mutation
host paused rejects remote TRY_INTERACT mutation
host resume accepted and published
client local-overlay pause remains visible under active host SYNC
client local pause stops prediction and outbound gameplay commands
wrong-role, wrong-room, wrong-game, stale-epoch, and stale-revision commands reject
duplicate pause/resume request replays one terminal result
movement, sprint, interact, and look-delta state clear on accepted pause
resume begins with neutral input
unexpected pointer-lock loss emits one command
blur plus pointer-lock loss deduplicates
expected pointer-lock release emits no duplicate command
first paused frame references the accepted pause result
first resumed frame references the accepted resume result
UI, replicated state, readiness, input suspension, and authority source remain correlated
all command/result/debug/frame rows remain JSON-safe
```

## Validation order for the next source passes

```txt
1. npm run fixture:session-lifecycle
2. npm run fixture:pause-convergence
3. npm run lint
4. npm run smoke:protokits
5. npm run harness:horror-corridor
6. npm run build
7. npm run validate:live-player:dev
8. npm run review:object-kit
9. browser solo Escape and pointer-lock pause smoke
10. browser host-global pause with client smoke
11. browser client-local overlay pause smoke
12. browser held-input pause/resume smoke
13. runtime-debug pause export inspection
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
pause convergence fixture: unavailable
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change-log added: yes
```

## Why existing checks were not run

This pass changed Markdown and JSON audit state only. Existing build, visual, and live-player commands cannot prove pause command authority, host/client convergence, input suspension, duplicate/stale admission, or first-frame pause/resume attribution. Those guarantees require the missing deterministic fixtures.
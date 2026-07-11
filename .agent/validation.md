# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T20-08-46-04-00`

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
npm run fixture:lobby-admission
```

## Evidence sampled

```txt
[done] full accessible LuminaryLabs-Publish inventory
[done] central ledger ordering and root .agent state
[done] GameShell lobby entry, readiness toggle, membership, and start orchestration
[done] LobbyScreen labels, ready badges, and control projection
[done] sessionStore room and roster mutations
[done] protocol message types and constructors
[done] shared legacy readiness message types
[done] networkRules toggle-ready no-op path
[done] createInitialGameState roster-to-active-player bootstrap
[done] GameCanvas active-game request routing
[done] package scripts
[done] repo-local documentation update on main
[done] central ledger and internal change-log synchronization
```

## Required implementation validation

```txt
canonical readiness command accepted
ready and unready replicate to host and clients
same-value readiness is idempotent
wrong-room and unknown-actor readiness rejects
stale roster revision rejects
connected/readiness policy is deterministic
solo host start accepts
ready multiplayer start accepts
unready multiplayer start rejects
disconnected participant start rejects
placeholder participant start rejects
capacity overflow rejects
double start accepts once
starting phase prevents duplicate bootstrap
bootstrap failure rolls back without runtime publication
rejected start emits no START_GAME or initial SYNC
admitted roster fingerprint equals active snapshot roster fingerprint
legacy readiness messages translate without divergent state
lobby result/debug rows remain JSON-safe
```

## Validation order for the next source pass

```txt
1. npm run fixture:lobby-admission
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run build
6. npm run validate:live-player:dev
7. npm run review:object-kit
8. browser solo lobby/start smoke
9. browser host/client readiness smoke
10. browser blocked-start reason smoke
11. browser accepted-start roster parity smoke
12. runtime-debug lobby export inspection
```

## Pass status

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
lobby admission fixture: unavailable
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change-log added: yes
```
# HorrorCorridor Validation

**Updated:** `2026-07-11T11-39-11-04-00`

## Plan ledger

**Goal:** separate source-backed lobby-start findings from executable distributed-commit proof and record the exact validation boundary.

- [x] Compare the full Publish inventory with central and repo-local tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor` after avoiding active same-window writes in `TheOpenAbove`.
- [x] Read the current root `.agent` state and prior roster, transport, exit, snapshot and readiness audits.
- [x] Read `GameShell.tsx`, `LobbyScreen.tsx`, `sessionStore.ts`, `createInitialGameState.ts`, protocol builders/types, host transport and package scripts.
- [x] Trace host start admission, asynchronous loading, roster mutation windows, bootstrap, local commit and publication.
- [x] Trace independent client START_GAME and SYNC application.
- [x] Inventory active domains, implemented kits and services.
- [x] Add timestamped lobby-start audits.
- [x] Refresh all required root `.agent` documents.
- [x] Change no runtime source, script, dependency or deployment configuration.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.
- [x] Synchronize the central ledger and internal change log on `main`.

## Documentation-only result

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
repo-local docs pushed to main: yes
central ledger synchronized on main: yes
central internal change log added on main: yes
```

## Source inspection performed

```txt
full Publish inventory reviewed: yes
central ledger coverage compared: yes
repo-local audit freshness compared: yes
nine eligible repositories tracked with root .agent: yes
TheCavalryOfRome excluded: yes
TheOpenAbove active-write collision avoided: yes
selected only HorrorCorridor: yes
lobby primary interaction traced: yes
host and client start branches traced: yes
loading yield sequence traced: yes
roster and connection mutation paths traced: yes
bootstrap input capture traced: yes
host local commit order traced: yes
START_GAME and SYNC construction traced: yes
broadcast result handling traced: yes
client message application traced: yes
first-frame correlation boundary traced: yes
```

## Existing commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

These commands were not run because this was a documentation-only connector pass without a checked-out browser runtime. Existing broad harnesses do not replace a focused start-transaction loss, reorder and acknowledgement fixture.

## Missing fixture gates

```txt
fixture:lobby-start-admission
fixture:lobby-start-roster-seal
fixture:lobby-start-loading-race
fixture:lobby-start-publication
fixture:lobby-start-partial-delivery
fixture:lobby-start-reorder
fixture:lobby-start-duplicate
fixture:lobby-start-retry
fixture:lobby-start-acknowledgement
fixture:lobby-start-stale-epoch
fixture:lobby-start-first-frame
browser multi-peer start smoke
```

## Required start matrix

```txt
host disconnected -> rejected
host actor mismatch -> rejected
member not ready -> rejected
reserved slot present -> excluded or rejected by declared policy
roster changes during loading -> stale/rejected
connection closes during loading -> stale/rejected
all admitted members stable -> accepted once
START_GAME only -> incomplete, no gameplay commit
SYNC only -> incomplete, no gameplay commit
reordered correlated messages -> one commit after complete admission
duplicate messages -> duplicate/no-change
conflicting same-ID messages -> rejected conflict
zero recipients -> visible publication failure
partial recipients -> explicit policy result
missing acknowledgement -> timeout/quorum result
late prior-epoch start -> rejected before store mutation
first successful frame -> carries start transaction, run and epoch identity
```

## Runtime proof status

```txt
npm run build: not run
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
browser smoke: not run
lobby-start admission fixture: unavailable
loading-race fixture: unavailable
partial-delivery/reorder fixture: unavailable
retry/acknowledgement fixture: unavailable
stale-epoch fixture: unavailable
first-frame fixture: unavailable
```

No multiplayer start, transport convergence, runtime readiness, gameplay or rendering correctness claim is made by this documentation pass.

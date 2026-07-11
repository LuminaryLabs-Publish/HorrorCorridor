# HorrorCorridor Validation

**Updated:** `2026-07-11T09-29-07-04-00`

## Plan ledger

**Goal:** separate source-backed runtime readiness findings from executable lifecycle proof and record the exact validation boundary.

- [x] Compare the full Publish inventory with central and repo-local tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read the current root `.agent` state and prior session/network audits.
- [x] Read `runtimeStore.ts`, `GameShell.tsx`, `GameCanvas.tsx` and package scripts.
- [x] Trace readiness writes across entry, SYNC, initialization, lobby return, title reset and cleanup.
- [x] Trace the reset-before-unmount stale cleanup sequence.
- [x] Inventory active domains, implemented kits and services.
- [x] Add timestamped readiness audits.
- [x] Refresh required root `.agent` documents.
- [x] Change no runtime source, script, dependency or deployment configuration.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.
- [x] Synchronize the central ledger and internal change log on `main`.

## Documentation-only result

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
rendering changed: no
network behavior changed: no
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
selected only HorrorCorridor: yes
runtime readiness shape traced: yes
shell readiness producers traced: yes
GameCanvas provider initialization traced: yes
return-to-lobby and return-to-title traced: yes
resetRuntime ordering traced: yes
GameCanvas cleanup patch traced: yes
solo networking mismatch traced: yes
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

These commands were not run because runtime source was not changed and the connector did not provide a checked-out browser runtime.

## Missing fixture gates

```txt
fixture:runtime-readiness
fixture:runtime-readiness-stale-cleanup
fixture:runtime-readiness-rollback
fixture:runtime-readiness-strict-mode
browser session entry/exit lifecycle smoke
```

## Required readiness matrix

```txt
shell capability request -> not ready until provider proof
solo mount -> simulation/rendering/input ready, networking unavailable
host lobby before peer open -> networking not committed ready
host connected -> networking ready from transport provider
client before connection -> networking not committed ready
client connected -> networking ready from transport provider
renderer failure -> rendering failed and rolled back
listener failure -> input failed and rolled back
return to lobby with live transport -> only networking may remain ready
return to title -> all capabilities revoked
reset then late old cleanup -> rejected stale generation
reset then immediate new mount -> old provider cannot patch new generation
double cleanup -> no-change/idempotent
strict-mode mount/unmount/remount -> one current provider per capability
```

## Runtime proof status

```txt
npm run build: not run
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
browser smoke: not run
runtime readiness fixture: unavailable
stale cleanup fixture: unavailable
rollback fixture: unavailable
strict-mode remount fixture: unavailable
```

No runtime readiness, lifecycle, networking, gameplay or rendering correctness claim is made by this documentation pass.
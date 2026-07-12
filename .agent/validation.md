# HorrorCorridor Validation

**Updated:** `2026-07-11T21-21-12-04-00`

## Scope

Documentation-only audit of GameShell bootstrap, GameCanvas initialization, resource acquisition, readiness publication, partial-start rollback, clean retry and first committed frame proof.

The preceding randomness, snapshot-delivery, cadence, disconnect, movement, snapshot-acceptance, interaction, outcome, lobby, exit and pause audits remain retained.

## Plan ledger

**Goal:** distinguish successful-path cleanup from unimplemented partial-start rollback and first-frame readiness proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read current root `.agent` state.
- [x] Read `GameShell.tsx`, `GameCanvas.tsx`, `animationLoop.ts`, `createRenderer.ts` and `createPostProcessing.ts`.
- [x] Confirm GameShell publishes readiness before GameCanvas construction.
- [x] Confirm GameCanvas sets initialized before fallible resource acquisition.
- [x] Confirm partial startup is outside the installed cleanup closure.
- [x] Confirm no first-frame acknowledgement or retry result exists.
- [x] Update required docs and timestamped audits.
- [ ] Implement and run startup failure-injection fixtures.

## Source-backed checks

```txt
GameShell loading projection: present
initial snapshot bootstrap: present
readiness write before GameCanvas mount: yes
readiness write before first frame: yes
initialized set before renderer construction: yes
renderer/post/world acquisition ledger: no
partial-start try/catch: no
partial-start rollback: no
normal successful unmount cleanup: yes
first-frame readiness receipt: no
startup failure result: no
clean retry result: no
runtime generation fence: no
```

## Existing package commands

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

These commands were not run because runtime source and package configuration were unchanged.

## Required fixture gate

```txt
failure after renderer creation retires renderer and canvas
failure after post-processing creation retires composer and renderer
failure after world construction retires world, post and renderer
failure after canvas/world attachment detaches and disposes both
failure after listener/observer installation removes every callback lease
failure before first frame keeps readiness false
first-frame throw produces typed startup failure and complete rollback
duplicate rollback is idempotent
stale callback cannot mutate after rollback
retry uses a new generation
retry reaches one committed frame
mandatory live-lease count is zero between attempts
solo, host and client startup follow the same contract
```

## Change validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing checks run: no
startup failure injection available: no
rollback-order fixture available: no
clean-retry fixture available: no
first-frame readiness fixture available: no
browser startup smoke run: no
```

No runtime startup atomicity, rollback completeness, clean retry or first-frame readiness claim is made until the required fixtures pass.

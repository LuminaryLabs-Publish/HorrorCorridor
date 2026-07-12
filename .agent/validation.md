# HorrorCorridor Validation

**Updated:** `2026-07-12T04-28-03-04-00`

## Scope

Documentation-only audit of keyboard held-state ownership, non-pointer-locked movement, browser focus and visibility transitions, pointer-lock loss, neutral input projection, client zero-input publication and first post-loss frame behavior.

The preceding presentation, render-surface, startup, readiness, randomness, snapshot-delivery, cadence, disconnect, movement, snapshot-acceptance, interaction, outcome, lobby, exit, pause and debug-observability audits remain retained.

## Plan ledger

**Goal:** prove that every browser or runtime transition that invalidates physical input ownership produces one neutral, revisioned and observable input-retirement result before simulation or networking can consume stale controls.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read current root `.agent` state and retained pause/movement contracts.
- [x] Read `GameCanvas.tsx` and `input.ts`.
- [x] Confirm immediate non-pointer-locked movement is supported.
- [x] Confirm keydown and keyup own held-button mutation.
- [x] Confirm pointer-lock loss performs a full reset.
- [x] Confirm unlocked blur performs no reset or pause.
- [x] Confirm visibility and page lifecycle retirement handlers are absent.
- [x] Confirm the runtime loop and client publication can consume stale state.
- [x] Reconcile all 29 implemented kits and services.
- [x] Define input lease, neutralization, zero-input and browser fixture gates.
- [x] Update required docs and timestamped audits.
- [ ] Implement and run input-retirement fixtures.

## Source-backed checks

```txt
PointerLockGate advertises immediate WASD: yes
keydown sets held state: yes
keyup clears held state: yes
setPlayerPointerLocked(false) resets full state: yes
onBlur always invokes input reset: no
onBlur pauses unlocked gameplay: no
visibilitychange listener: no
pagehide listener: no
control lease ID: no
input revision: no
retirement result: no
client zero-input retirement message: no
cleanup neutralizes runtimeStore input flags: no
simulation reads held state while PLAYING: yes
client send path derives movement from held state: yes
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

These commands were not run because runtime source and package configuration were unchanged. Source inspection is sufficient to establish the missing unlocked-focus-loss retirement path. Executable proof remains required before claiming the defect repaired.

## Required fixture gate

```txt
keydown W while unlocked produces forward = true
window blur while unlocked produces a neutral input snapshot
blur retirement is idempotent
visibility hidden produces the same neutral result
pagehide produces the same neutral result
pointer-lock loss and blur do not double-advance input revision
pause retires held controls before the next simulation step
route exit retires held controls before GameCanvas unmount
runtime cleanup publishes neutral input flags
look deltas are cleared during retirement
interaction and pause edge buttons are cleared
client retirement emits one sequenced zero-input update when admitted
stale runtime/run retirement commands perform no mutation
host rejects movement tied to an expired input/control lease
focus return alone does not restore prior controls
new physical keydown creates a new control lease
first post-loss frame records zero movement axes
browser smoke proves no continued movement after missed keyup
```

## Change validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
input behavior changed: no
movement behavior changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no
existing checks run: no
stuck-input fixture available: no
client zero-input fixture available: no
runtime teardown input fixture available: no
focus/visibility browser smoke run: no
```

No input-retirement, stale-control rejection, neutral network publication or first post-focus-loss frame claim is made until the required fixtures pass.
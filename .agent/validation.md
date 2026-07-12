# HorrorCorridor Validation

**Updated:** `2026-07-11T23-18-16-04-00`

## Scope

Documentation-only audit of main-canvas and minimap scaling, resize observation, renderer/composer/camera mutations, zero-area handling, surface identity, physical-size readback and visible-frame correlation.

The preceding startup, readiness, randomness, snapshot-delivery, cadence, disconnect, movement, snapshot-acceptance, interaction, outcome, lobby, exit and pause audits remain retained.

## Plan ledger

**Goal:** distinguish current responsive mutation code from unimplemented product surface policy, commit results and frame-correlated proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read current root `.agent` state.
- [x] Read `GameCanvas.tsx`, `createRenderer.ts`, `createPostProcessing.ts` and `Minimap.tsx`.
- [x] Confirm main WebGL DPR is capped at 1.
- [x] Confirm minimap uses uncapped browser DPR.
- [x] Confirm ResizeObserver and window resize both directly invoke sizing.
- [x] Confirm zero-area sizing silently returns.
- [x] Confirm no surface revision or requested/actual size result exists.
- [x] Confirm debug frames omit surface provenance.
- [x] Update required docs and timestamped audits.
- [ ] Implement and run surface fixtures.

## Source-backed checks

```txt
main renderer pixel ratio cap: 1
main size source: mount client width/height
renderer resize: present
camera aspect update: present
composer resize: present
bloom resolution mutation: present
minimap DPR sampling: present and uncapped
ResizeObserver: present
window resize listener: present
resize command identity: absent
resize coalescing: absent
surface revision: absent
zero-area result: absent
actual drawing-buffer readback: absent
actual composer/bloom target readback: absent
surface provenance in debug frame: absent
surface provenance in rendering readiness: absent
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
startup at DPR 1, 1.5, 2 and 3 commits bounded physical sizes
main canvas and minimap follow declared named policies
rapid ResizeObserver and window-resize events coalesce deterministically
stale observations cannot replace a newer surface revision
zero-area mount produces the declared lifecycle result
simulation/input/network behavior matches zero-area policy
restored mount commits a new revision
renderer drawing-buffer size matches commit result
composer and bloom target sizes match commit result
camera aspect matches accepted CSS dimensions
rendering readiness requires a valid committed surface
first frame after every accepted resize cites the new revision
debug export includes surface identity, revision and actual sizes
stop/restart creates a new runtime generation and surface identity
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
zero-area fixture available: no
DPR parity fixture available: no
resize-storm fixture available: no
physical-size readback fixture available: no
surface/frame correlation fixture available: no
browser resize smoke run: no
```

No responsive-surface authority, DPR parity, zero-area policy, physical-size correctness or frame-correlation claim is made until the required fixtures pass.

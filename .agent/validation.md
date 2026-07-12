# HorrorCorridor Validation

**Updated:** `2026-07-12T05-59-28-04-00`

## Scope

Documentation-only audit of recurring frame admission, successor RAF scheduling, host/client mutation ordering, authoritative publication, runtime-store projection, world/minimap/debug/post-processing stages, last-known-good retention, quarantine, disposal and cold restart.

The preceding presentation, render-surface, startup, readiness, input-retirement, randomness, snapshot-delivery, cadence, disconnect, movement, snapshot-acceptance, interaction, outcome, lobby, exit, pause and debug-observability audits remain retained.

## Plan ledger

**Goal:** prove that any frame-stage fault produces one typed terminal result, no successor mutation, a coherent retained frame, revoked readiness, observable cleanup and a new-generation restart acknowledgement.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read current root `.agent` state.
- [x] Read `GameCanvas.tsx` and `animationLoop.ts`.
- [x] Confirm successor RAF scheduling occurs after `onFrame`.
- [x] Confirm exceptions leave the loop marked running.
- [x] Confirm host publication can precede visible render success.
- [x] Confirm client movement transmission can precede visible render success.
- [x] Confirm world, minimap and debug stages precede post-processing.
- [x] Confirm no frame failure boundary, quarantine or automatic cleanup exists.
- [x] Confirm readiness remains unchanged by frame failure.
- [x] Reconcile all 29 implemented kits and services.
- [x] Define frame-stage result, quarantine, cleanup and restart fixture gates.
- [x] Update required docs and timestamped audits.
- [ ] Implement and run frame-failure fixtures.

## Source-backed checks

```txt
animation-loop running guard: yes
successor RAF scheduled before onFrame: no
successor RAF scheduled after onFrame: yes
frame callback wrapped in try/catch: no
running set false on thrown frame: no
host pose/game mutation before render: yes
host snapshot/store publication before render: yes
host broadcast before render: yes
client prediction before render: yes
client update send before render: possible
runtime store projection before render: yes
camera/world update before post-processing: yes
minimap draw before post-processing: yes
debug capture before post-processing: yes
automatic cleanup on frame failure: no
readiness revocation on frame failure: no
fatal overlay on frame failure: no
cold restart authority: no
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

These commands were not run because runtime source and package configuration were unchanged. Source inspection is sufficient to establish the missing frame-failure boundary. Executable proof remains required before claiming containment or recovery.

## Required fixture gate

```txt
controller throw terminalizes lifecycle
no successor RAF executes after failure
first failure is admitted exactly once
later stages reject after failure admission
later frames reject after quarantine
host render fault records escaped snapshot and broadcast receipts
client render fault records escaped movement-send receipt
world fault preserves previous committed frame
minimap fault cannot advance committed presentation revision
post-processing fault retains last-known-good frame
readiness is revoked
held input and pointer lock are retired
interaction, movement and transport mutation are fenced
listeners and observers are removed or explicitly retained
transport subscription is removed or read-only
world, post-processing and renderer disposal return typed results
repeated disposal is idempotent
cold restart allocates a new runtime generation
predecessor callbacks cannot mutate replacement state
first replacement frame and readiness share one acknowledgement
browser smoke exposes a bounded failure surface
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
frame-controller fixture available: no
stage-fault fixture available: no
quarantine fixture available: no
disposal fixture available: no
cold-restart fixture available: no
browser frame-failure smoke run: no
```

No runtime frame-failure containment, last-known-good-frame, cleanup-completeness or cold-restart safety claim is made until the required fixtures pass.
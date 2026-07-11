# HorrorCorridor Validation

**Updated:** `2026-07-11T15-01-33-04-00`

## Plan ledger

**Goal:** separate source-backed interaction-target findings from executable contention, idempotency, snapshot-correlation and first-frame proof.

- [x] Compare the full Publish inventory with central and repo-local tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor` under the oldest eligible documented-selection rule.
- [x] Read the current root `.agent` state and prior roster, transport, start, exit, snapshot, movement, pause and terminal audits.
- [x] Read `GameCanvas.tsx`, `networkRules.ts`, `interactionRules.ts` and `syncSnapshot.ts`.
- [x] Trace local action inference, TRY_INTERACT construction, host target resolution, cube/slot mutation, snapshot publication and client readback.
- [x] Confirm the message schema supports explicit target fields while the active caller omits them.
- [x] Confirm implicit nearest/first/last target resolution can substitute a different target under contention or delay.
- [x] Confirm interaction mutation returns no typed result and remote no-change requests still publish snapshots.
- [x] Inventory active domains, implemented kits and services.
- [x] Add timestamped interaction-target audits.
- [x] Refresh all required root `.agent` documents.
- [x] Change no runtime source, script, dependency, network behavior, rendering or deployment configuration.
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
nine eligible repositories tracked with root .agent: yes
TheCavalryOfRome excluded: yes
selected only HorrorCorridor: yes
client interaction action inference traced: yes
TRY_INTERACT construction traced: yes
optional cubeId/slotId/targetCellId fields traced: yes
host pickup target selection traced: yes
host place target selection traced: yes
host remove target selection traced: yes
local/remote no-change behavior compared: yes
snapshot publication path traced: yes
render/debug interaction evidence boundary traced: yes
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

These commands were not run because this was a documentation-only connector pass without a checked-out browser runtime. Existing broad harnesses do not replace focused target-claim, contention, idempotency and frame-correlation fixtures.

## Missing fixture gates

```txt
fixture:interaction-explicit-cube-target
fixture:interaction-explicit-slot-target
fixture:interaction-stale-cube-claim
fixture:interaction-stale-slot-claim
fixture:interaction-pickup-contention
fixture:interaction-place-contention
fixture:interaction-remove-contention
fixture:interaction-duplicate-idempotency
fixture:interaction-reorder
fixture:interaction-distance-rejection
fixture:interaction-ownership-conflict
fixture:interaction-result-snapshot-correlation
fixture:interaction-first-frame
browser multi-peer cube/slot contention smoke
```

## Required interaction matrix

```txt
explicit cube target valid -> accepted once
explicit cube target stale -> rejected without replacement
explicit slot target valid -> accepted once
explicit slot target stale -> rejected without replacement
two pickup claims for one cube -> one accepted, one conflict
two place claims for one slot -> one accepted, one conflict
two remove claims for one slot -> one accepted, one conflict
duplicate command ID -> original result, no second mutation
reordered command -> sequence policy result
out-of-range target -> rejected with distance reason
wrong owner drop/place -> rejected with ownership reason
old run/epoch command -> rejected before mutation
accepted result -> named authoritative snapshot revision
world/minimap/HUD/debug -> same interaction result and frame identity
local and remote authority -> same typed result semantics
```

## Runtime proof status

```txt
npm run build: not run
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
browser smoke: not run
explicit target fixtures: unavailable
contention fixtures: unavailable
duplicate/reorder fixtures: unavailable
result/snapshot correlation fixture: unavailable
first-interaction-frame fixture: unavailable
```

No interaction correctness, multiplayer contention, idempotency, runtime readiness, gameplay or rendering correctness claim is made by this documentation pass.

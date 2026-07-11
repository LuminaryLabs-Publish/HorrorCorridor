# Deploy Audit: Interaction Target Fixture Gate

**Timestamp:** `2026-07-11T15-01-33-04-00`

## Plan ledger

**Goal:** prevent build or deployment confidence from standing in for explicit-target, contention, idempotency and visible-frame proof.

- [x] Record current package validation surfaces.
- [x] Identify missing focused interaction fixtures.
- [x] Define deterministic, browser and deployed acceptance gates.
- [x] Make readiness claims conditional on reviewed evidence.

## Existing broad commands

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

These commands were not run in this documentation-only connector pass.

## Required deterministic fixtures

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
```

## Required browser matrix

```txt
solo exact-target parity
host-local exact-target parity
host + one client pickup/drop parity
host + two clients pickup contention
host + two clients place contention
host + two clients remove contention
latency and reorder simulation
duplicate request retry
run exit while interaction pending
restart with stale prior-epoch request
world/minimap/HUD/debug frame correlation
```

## Required deployed smoke

```txt
load production route
create host room
join client
start admitted run
claim one explicit cube
place into one explicit slot
verify typed results and snapshot revisions
verify no substitute target under contention
verify first visible frame receipt
verify console and network remain free of uncaught errors
```

## Evidence required before readiness

```txt
command transcript
fixture case names and pass counts
before/after state fingerprints
interaction result IDs
snapshot revision correlation
consumer acknowledgement rows
browser screenshots or captured frames
workflow run and job URLs when CI-backed
commit SHA and deployed artifact identity
```

## Current status

```txt
runtime implementation: absent
focused fixtures: absent
browser contention smoke: not run
deployed interaction smoke: not run
readiness claim: blocked
```

A successful build or static deployment does not prove interaction intent preservation.

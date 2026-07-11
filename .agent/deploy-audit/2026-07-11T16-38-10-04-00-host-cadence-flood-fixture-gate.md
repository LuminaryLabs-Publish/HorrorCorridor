# Deploy Audit: Host Cadence and Flood Fixture Gate

**Timestamp:** `2026-07-11T16-38-10-04-00`

## Summary

Current build, lint and broad browser harness commands do not prove that host simulation timing remains stable under multi-peer movement traffic. A focused deterministic fixture gate is required before cadence changes can be treated as safe for deployment.

## Plan ledger

**Goal:** add executable proof that normal, bursty, duplicated, reordered and flood input streams cannot change authoritative step frequency, starve ooze or exceed snapshot-publication budgets.

- [x] Inventory current package commands.
- [x] Identify the missing per-peer input/cadence fixture surface.
- [x] Define deterministic Node-level fixtures.
- [x] Define browser multi-peer stress smoke.
- [x] Define publication and frame evidence requirements.
- [ ] Implement scripts and wire them into the package check chain.

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

These commands do not currently expose a focused host cadence matrix.

## Required Node fixtures

```txt
fixture:host-cadence-baseline
  no remote clients
  expected fixed-step and ooze-step counts

fixture:host-cadence-one-client
  normal monotonic input stream
  same step counts as baseline

fixture:host-cadence-multi-client
  multiple normal streams
  same step counts as baseline

fixture:host-cadence-burst-coalescing
  multiple updates before one step
  deterministic selected sequence

fixture:host-cadence-duplicate-reorder
  duplicate and older sequences
  explicit admission results and no extra mutation

fixture:host-cadence-flood-budget
  excessive stream
  bounded queue, accepted rate and publication rate

fixture:host-cadence-ooze-starvation
  continuous remote traffic
  ooze continues at expected fixed steps

fixture:snapshot-publication-budget
  dirty-state coalescing and explicit event policy

fixture:partial-delivery-result
  closed and backpressured peer rows

fixture:cadence-frame-correlation
  committed step -> publication -> world/minimap/HUD/debug frame
```

## Required browser smoke

```txt
host plus at least two clients
scripted movement for a fixed duration
one client normal, one client burst/flood profile
observe host input queue and publication metrics
verify ooze progresses
verify normal client remains responsive
verify snapshot rate stays within policy
verify no unbounded memory or buffered transport growth
verify final states converge after traffic returns to normal
```

## Required assertions

```txt
simulation steps are invariant across traffic profiles
ooze steps are invariant across traffic profiles
accepted sequence per player is monotonic
queue depth remains bounded
publication rate remains bounded
snapshot tick/revision semantics remain monotonic
one noisy peer does not increase work without limit
one noisy peer does not starve another peer
first-frame receipts cite committed revisions
```

## Package integration target

```txt
validate:host-cadence
validate:host-cadence:browser
```

The deterministic fixture should run in the normal validation chain. The browser stress smoke may remain an explicit deployment gate if CI browser resources are constrained.

## Current validation status

```txt
runtime source changed: no
package scripts changed: no
npm run build: not run
npm run lint: not run
host cadence fixtures: absent
multi-peer flood browser smoke: absent
Pages/deployment behavior changed: no
```

# Deploy Audit: Snapshot Delivery and Backpressure Fixture Gate

**Timestamp:** `2026-07-11T18-11-21-04-00`

## Summary

Current build, lint, ProtoKit, harness, visual and live-player commands do not prove payload budgets, complete per-peer results, exception containment, slow-peer isolation or delivery-to-frame correlation.

## Plan ledger

**Goal:** define the pure, host, browser and deployed-Page evidence required before snapshot delivery authority is considered complete.

- [x] Record existing package checks.
- [x] Define focused pure fixtures.
- [x] Define multi-peer host fixtures.
- [x] Define browser and Pages smoke requirements.
- [x] Define pass/fail evidence.
- [ ] Implement and run the gate.

## Existing checks

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

## Required pure gate

```txt
snapshot-single-build
payload-fingerprint-stability
payload-byte-budget
full-delta-policy
peer-send-admission
per-peer-result-completeness
send-exception-containment
retry-coalescing-budget
slow-peer-state-transition
```

## Required host gate

```txt
one healthy peer
multiple healthy peers
one closed peer plus healthy peers
one throwing send plus healthy peers
one backpressured peer plus healthy peers
partial-success commit
newer snapshot supersedes stale queued snapshot
bounded retry and queue depth
```

## Required browser gate

```txt
host + normal client
host + multiple normal clients
host + normal clients + throttled/slow client
host + client disconnect during publication
host + transport error during publication
continued fixed simulation and ooze progression
healthy-client snapshot and frame convergence
slow-client isolation/recovery result
```

## Required Pages evidence

```txt
commit SHA
route URL
browser versions
peer count and scenario
payload bytes and fingerprint
intended peer set
complete delivery rows
queue/backpressure observations
accepted snapshot IDs
first visible frame IDs
bounded logs or artifact references
```

## Completion boundary

Do not claim deployment-level delivery correctness until a deployed host proves bounded payload work, complete per-peer results, healthy-peer continuation under a slow/failing peer, and publication-to-frame correlation.

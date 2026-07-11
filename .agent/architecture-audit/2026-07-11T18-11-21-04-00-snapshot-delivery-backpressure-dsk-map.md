# Architecture Audit: Snapshot Delivery and Backpressure DSK Map

**Timestamp:** `2026-07-11T18-11-21-04-00`

## Summary

The current host collapses snapshot construction, serialization, fanout and delivery acknowledgement into one synchronous call chain. A dedicated parent domain should separate payload identity, byte admission, intended-recipient planning, per-peer capability checks, send attempts, partial-success commitment and slow-peer policy.

## Plan ledger

**Goal:** define the domain and kit boundaries needed to publish one canonical payload through a bounded, per-peer delivery transaction.

- [x] Map local and outbound snapshot construction.
- [x] Map serializer and host adapter contracts.
- [x] Separate payload preparation from peer delivery.
- [x] Separate send attempts from delivery-result commitment.
- [x] Define backpressure, retry and isolation responsibilities.
- [x] Reuse existing session, actor, cadence, snapshot and frame authorities.
- [ ] Implement only after prerequisite identity and fixed-simulation authorities exist.

## Current ownership collapse

```txt
GameCanvas
  tick increment
  local full snapshot build
  outbound full snapshot rebuild
  room clone
  JSON serialization trigger
  all-peer fanout trigger
  aggregate sent count discarded

createHost
  connection-open check
  connection.send
  aggregate sent count
```

## Required parent domain

```txt
corridor-snapshot-delivery-backpressure-authority-domain
```

This domain coordinates, but does not replace:

```txt
session/actor/run/epoch identity
fixed simulation and committed state revision
snapshot acceptance authority
transport connection ownership
rendered-frame observation
```

## DSK map

### Publication identity and payload

```txt
snapshot-publication-intent-kit
  publication ID, state revision, reason, priority and deadline

canonical-snapshot-payload-kit
  exactly one payload build per publication
  stable schema and canonical serialization input

snapshot-payload-byte-budget-kit
  serialized bytes, configured limit and over-budget classification

snapshot-payload-fingerprint-kit
  content fingerprint, duplicate identity and supersession key

snapshot-full-delta-policy-kit
  full/delta choice, baseline revision and dirty entity set
```

### Delivery planning and peer admission

```txt
snapshot-delivery-plan-kit
  intended peer set, payload identity, budget and ordering

peer-send-capability-kit
  connection state, pending bytes, queue state and transport features

peer-send-admission-kit
  admit, defer, skip or reject result per peer

per-peer-backpressure-state-kit
  pending bytes, queue depth, oldest age and slow-peer classification
```

### Send results and recovery

```txt
per-peer-delivery-result-kit
  sent, skipped, closed, failed, timed-out and backpressured rows

snapshot-delivery-commit-kit
  complete row set, partial success and publication result

snapshot-delivery-retry-kit
  bounded retry, coalescing, supersession and expiry

slow-peer-isolation-kit
  isolate, degrade, recover or disconnect policy
```

### Evidence and proof

```txt
snapshot-delivery-journal-kit
  bounded publication, payload, admission and result rows

snapshot-delivery-observation-kit
  bytes, build time, serialization time, send latency and peer pressure

snapshot-delivery-fixture-kit
  payload, exception, partial-success, backpressure and frame fixtures

browser-slow-peer-smoke-kit
  healthy peers plus one slow peer with bounded host work
```

## Required contracts

```txt
SnapshotPayloadResult
  publication ID
  state revision
  schema revision
  bytes
  fingerprint
  full/delta mode
  baseline revision

PeerDeliveryResult
  publication ID
  connection, peer and actor identity
  status and reason
  attempted bytes
  pending bytes before/after
  duration
  exception classification

SnapshotDeliveryCommitResult
  publication ID
  intended peer set
  complete per-peer row set
  sent/failed/backpressured counts
  retry/supersession actions
  client/frame acknowledgements
```

## Invariants

```txt
one publication builds one canonical payload
all intended peers produce one result row
payload limits are admitted before send attempts
one peer failure cannot erase healthy-peer results
retries and queued payloads remain bounded
newer state can supersede stale queued state deterministically
partial success is explicit
rendered-frame proof cites publication and state revision
```

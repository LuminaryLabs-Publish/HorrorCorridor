# Architecture Audit: Host Network Cadence Authority DSK Map

**Timestamp:** `2026-07-11T16-38-10-04-00`

## Summary

The current host collapses four concerns into one path: packet admission, player-state mutation, authoritative system timing and snapshot publication. A dedicated parent domain should separate these stages and make each transition observable and bounded.

## Plan ledger

**Goal:** define the domain and kit boundaries needed to turn incoming movement packets into admitted fixed-step input and bounded authoritative publication.

- [x] Map the active client-send and host-receive path.
- [x] Identify shared clock and sequence responsibilities.
- [x] Separate input admission from simulation application.
- [x] Separate simulation commitment from snapshot publication.
- [x] Separate publication attempts from per-peer delivery results.
- [x] Reuse the existing roster, actor, run, epoch, snapshot and frame authorities.
- [ ] Implement the domain after its prerequisite identity authorities exist.

## Current ownership collapse

```txt
GameCanvas
  client update timer
  client update sequence
  host packet callback
  absolute movement mutation
  held-cube synchronization
  ooze timing gate
  snapshot tick increment
  full snapshot construction
  broadcast fanout
  cadence diagnostics
```

## Required parent domain

```txt
corridor-host-network-cadence-authority-domain
```

This domain must not replace:

```txt
corridor session/roster identity
transport actor binding
run session and epoch
snapshot acceptance authority
movement/collision rules
interaction authority
render/frame observation
```

It coordinates those domains through typed contracts.

## DSK map

### Input identity and admission

```txt
inbound-player-update-envelope-kit
  message type, connection ID, remote peer ID, sender ID, player ID
  room, run, epoch, request and input sequence
  sender timestamp and receive timestamp

per-peer-input-sequence-kit
  last accepted sequence
  duplicate, stale, gap and future classification
  monotonic accepted sequence result

player-update-admission-kit
  actor binding
  room/run/epoch/phase validation
  finite-number and range admission
  timestamp skew policy
  typed accepted/rejected result
```

### Queue and coalescing

```txt
movement-input-queue-kit
  bounded per-player queue
  queue depth and oldest age
  overflow and retirement result

latest-input-coalescing-kit
  deterministic latest-wins or step-bucket policy
  superseded input receipts
  one selected input per player per simulation step
```

### Simulation clock and commitment

```txt
fixed-simulation-clock-kit
  accumulator
  fixed delta
  maximum catch-up steps
  pause and suspension handling

simulation-step-sequence-kit
  session-scoped monotonic step identity
  step start/end times
  selected input sequence set

authoritative-system-tick-kit
  movement and collision application
  held-cube synchronization
  ooze advancement
  objective/terminal evaluation
  immutable committed state revision
```

### Publication and transport

```txt
snapshot-publication-cadence-kit
  bounded publication rate independent of packet arrival
  event-trigger policy
  dirty-state coalescing

snapshot-publication-plan-kit
  committed simulation revision
  snapshot revision and reason
  intended peer set
  payload fingerprint

per-peer-delivery-result-kit
  attempted, sent, skipped, closed, failed and timed-out rows
  connection and peer identity

transport-backpressure-policy-kit
  buffered amount thresholds
  queue/drop/coalesce policy
  slow-peer isolation
  retry and disconnect policy
```

### Evidence and proof

```txt
network-cadence-journal-kit
  admission, queue, selection, step, publication and delivery rows
  bounded retention

network-cadence-observation-kit
  per-peer accepted/rejected rates
  queue depth and age
  simulation steps per second
  publications per second
  delivery and slow-peer status

host-network-cadence-fixture-kit
  deterministic input streams
  duplicate, reorder, flood and starvation scenarios

multi-peer-flood-smoke-kit
  browser peers
  bounded host CPU/publication rate
  continued ooze/system advancement
  visible-frame correlation
```

## Required contracts

```txt
PlayerUpdateAdmissionResult
  status
  reason
  actor/player/connection identity
  received sequence
  last accepted sequence
  run and epoch

SimulationStepResult
  step sequence
  selected per-player inputs
  state revision before/after
  movement/ooze/held-cube outcomes

SnapshotPublicationResult
  publication sequence
  committed simulation revision
  snapshot tick/revision
  per-peer delivery rows
  first projection/frame acknowledgement
```

## Invariants

```txt
one packet cannot directly advance the simulation clock
one packet cannot directly force one full-snapshot broadcast
one simulation step selects at most one admitted input per player
all periodic systems advance from the same fixed-step sequence
snapshot publication cites a committed simulation revision
snapshot tick is monotonic under one documented policy
slow or noisy peers cannot starve authoritative systems
old run/epoch input is rejected before queue insertion
```

## Dependency order

```txt
roster and peer/player binding
  -> transport actor and envelope admission
  -> run session ID and epoch
  -> host network cadence authority
  -> movement validation and reconciliation
  -> snapshot acceptance and render-frame acknowledgement
```

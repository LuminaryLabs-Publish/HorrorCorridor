# Network Cadence Audit: Input, Simulation and Publication Clock Contract

**Timestamp:** `2026-07-11T16-38-10-04-00`

## Summary

HorrorCorridor needs three independent clocks: input arrival/admission, fixed authoritative simulation and snapshot publication. The current implementation uses a single mutable timestamp across outbound client updates, host publications and the periodic ooze gate.

## Plan ledger

**Goal:** establish explicit clock ownership and prevent one stage from resetting or impersonating another stage's progress.

- [x] Identify all current uses of `lastNetworkTickAtMs`.
- [x] Separate arrival, simulation and publication semantics.
- [x] Define monotonic identities for each stage.
- [x] Define bounded work and backpressure requirements.
- [x] Define observations and fixture expectations.
- [ ] Implement only after run/epoch and actor admission prerequisites.

## Required clocks

### 1. Input arrival and admission clock

```txt
owned by: host network admission
identity: per-peer/per-player input sequence
measures: arrival, accepted order, queue age and supersession
must not: advance gameplay or snapshot ticks directly
```

### 2. Authoritative simulation clock

```txt
owned by: host simulation authority
identity: run-scoped simulationStepSequence
measures: deterministic fixed steps
advances: movement, collision, held cubes, ooze and scheduled gameplay systems
must not: reset because packets or publications occur
```

### 3. Snapshot publication clock

```txt
owned by: authoritative publication authority
identity: publicationSequence plus snapshotRevision
measures: committed-state dissemination
triggers: bounded cadence and explicit high-priority events
must not: define whether simulation systems advance
```

### 4. Presentation frame clock

```txt
owned by: render authority
identity: renderFrameSequence
measures: accepted state consumed by world/minimap/HUD/debug
must cite: simulation state revision and snapshot publication revision
```

## Current clock aliasing

```txt
lastNetworkTickAtMs
  client send threshold
  host periodic simulation threshold
  host publication age
  debug network age
```

This aliasing makes traffic rate a gameplay input even when the payload is semantically only movement.

## Required publication policy

```txt
normal dirty state
  -> coalesce until next bounded publication slot

high-priority accepted event
  -> optional immediate publication with rate guard

no state revision change
  -> no full snapshot publication

slow peer
  -> isolate through backpressure policy
  -> do not block or multiply global simulation work
```

## Required delivery result

```txt
SnapshotDeliveryResult
  publicationSequence
  snapshotRevision
  intendedPeers
  sentPeers
  skippedClosedPeers
  backpressuredPeers
  failedPeers
  payloadBytes
  attempt timestamp
```

The existing transport's integer sent count is insufficient to prove who received or was skipped.

## Required observations

```txt
per-peer inbound updates/s
per-peer accepted, duplicate, stale and dropped updates/s
per-peer queue depth and oldest age
fixed simulation steps/s
systems advanced per step
snapshot publications/s
snapshot bytes/s
per-peer delivery/backpressure state
simulation-to-publication lag
publication-to-first-frame lag
```

## Bounded-work requirements

```txt
maximum admitted updates per peer per second
maximum queue depth per peer
maximum updates applied per player per simulation step: 1
maximum catch-up simulation steps per frame
maximum normal snapshot publications per second
maximum pending bytes or publications per slow peer
bounded journal and diagnostic retention
```

## Failure classifications

```txt
stale-input-sequence
duplicate-input-sequence
future-sequence-gap
wrong-actor-binding
wrong-run-or-epoch
input-rate-exceeded
input-queue-overflow
simulation-overrun
publication-coalesced
publication-rate-limited
peer-backpressured
partial-delivery
transport-closed
```

## Acceptance proof

```txt
identical admitted input streams produce identical simulation-step results
arrival jitter changes queue/coalescing observations but not fixed-step count
flood traffic is bounded and cannot starve ooze
peer count does not alter authoritative system-step frequency
snapshot publication stays within configured bounds
rendered frames cite committed simulation and snapshot revisions
```

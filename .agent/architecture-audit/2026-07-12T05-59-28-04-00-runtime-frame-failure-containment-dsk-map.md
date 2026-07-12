# HorrorCorridor Runtime Frame-Failure Containment DSK Map

**Timestamp:** `2026-07-12T05-59-28-04-00`

## Summary

The recurring runtime frame is procedural and non-transactional. A thrown stage stops the RAF chain because the next callback is scheduled only after `onFrame` returns, while prior simulation, publication, store, world, minimap or debug mutations may already be visible elsewhere.

## Plan ledger

**Goal:** define one composed domain that owns frame identity, ordered stage execution, typed failure, last-known-good retention, mutation quarantine, capability revocation, cleanup and clean replacement.

- [x] Map the current frame stages and ordering.
- [x] Separate host/solo, client and replay paths.
- [x] Identify mutation that occurs before rendering.
- [x] Identify resources and capabilities that remain live after failure.
- [x] Define parent-domain ownership.
- [x] Define candidate coordinating kits.
- [x] Define transaction, observations and fixture requirements.
- [ ] Implement the domain.

## Current ownership

```txt
corridor-animation-loop-kit
  owns running flag, delta calculation and RAF scheduling

GameCanvas frame closure
  owns simulation branch selection
  mutates pose, view, input and game state
  publishes snapshots or client movement
  projects runtime stores
  invokes render stages

corridor-render-world-kit
  mutates scene objects from snapshot and local state

corridor-minimap-kit
  mutates a separate 2D presentation surface

runtime-debug-frame-kit
  appends observation data

corridor-post-processing-kit
  submits the visible WebGL frame
```

No owner coordinates these as one commit.

## Required parent domain

```txt
corridor-runtime-frame-failure-containment-authority-domain
```

## Candidate kits

```txt
runtime-frame-id-kit
frame-stage-id-kit
frame-execution-plan-kit
frame-stage-admission-kit
frame-stage-result-kit
frame-mutation-journal-kit
frame-failure-id-kit
frame-failure-classification-kit
frame-failure-admission-kit
runtime-failure-state-kit
last-known-good-snapshot-kit
last-known-good-visible-frame-kit
frame-rollback-or-retire-policy-kit
runtime-mutation-quarantine-kit
input-capability-fence-kit
transport-capability-fence-kit
readiness-revocation-kit
render-freeze-kit
fatal-overlay-projection-kit
resource-disposal-plan-kit
resource-disposal-result-kit
runtime-terminal-result-kit
cold-restart-command-kit
cold-restart-admission-kit
cold-restart-result-kit
first-replacement-frame-ack-kit
frame-failure-observation-kit
frame-failure-journal-kit
frame-fault-injection-fixture-kit
browser-frame-recovery-smoke-kit
```

## Required frame plan

```txt
FramePlan
  runtimeId
  runtimeGeneration
  runId
  sessionEpoch
  frameId
  sourceSnapshotRevision
  screenRevision
  inputRevision
  stages[]
  previousCommittedFrameId
```

Each stage returns:

```txt
FrameStageResult
  frameId
  stageId
  status: committed | no-change | rejected | failed
  mutationReceipt
  observationRevision
  errorClassification
```

## Required transaction

```txt
admit frame
  -> capture immutable source identities
  -> stage simulation and network intent
  -> execute ordered world, minimap, debug and render consumers
  -> require mandatory consumer receipts
  -> commit state, publication and visible-frame acknowledgement
  -> schedule successor frame only from committed result

stage failure
  -> admit one FrameFailureResult
  -> stop successor frame admission
  -> retain prior committed frame and snapshot
  -> quarantine input, simulation and network mutation
  -> revoke readiness and public mutators
  -> freeze or replace visual surface under explicit policy
  -> dispose resources in dependency order or mark retained
  -> publish terminal observation
  -> allow only cold restart into a new runtime generation
```

## Integration order

```txt
1. Runtime startup acquisition and generation authority
2. Runtime readiness leases
3. Render-surface and active-presentation authority
4. Input-retirement authority
5. Runtime frame-failure containment authority
6. Snapshot, interaction, movement and delivery authorities
```

Frame failure containment consumes the existing startup, readiness, render and input identities. It does not replace those domains.

## Proof boundary

```txt
throw before simulation
throw after local pose mutation
throw after host snapshot publication
throw after client movement send
throw during world update
throw during minimap draw
throw during debug capture
throw during post-processing render
throw during disposal
repeat failure notification
cold restart after terminal failure
```

Every scenario must prove exactly one terminal failure result, no post-quarantine mutation and one first-frame acknowledgement from the replacement generation.
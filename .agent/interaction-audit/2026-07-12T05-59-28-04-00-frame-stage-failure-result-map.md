# HorrorCorridor Frame-Stage Failure Result Map

**Timestamp:** `2026-07-12T05-59-28-04-00`

## Summary

The frame path has no command or result surface. A stage either returns normally or throws into the browser event loop. The runtime cannot distinguish rejected work, partial work, render failure, GPU failure, stale generation, disposal failure or a fully committed frame.

## Plan ledger

**Goal:** replace exception-only control flow with typed frame-stage and terminal results that can be correlated across simulation, networking, world, minimap, debug and visible presentation.

- [x] Enumerate frame stages.
- [x] Identify current return behavior.
- [x] Identify mutation and publication side effects.
- [x] Define typed result categories.
- [x] Define stale, duplicate and terminal admission.
- [x] Define observation and acknowledgement requirements.
- [ ] Implement result-first frame execution.

## Current map

| Stage | Current output | Can mutate before failure | Typed failure |
|---|---|---:|---:|
| frame admission | implicit RAF callback | no | no |
| local simulation | object mutation | yes | no |
| host publication | snapshot and broadcast | yes | no |
| client send | transport side effect | yes | no |
| runtime-store sync | Zustand mutation | yes | no |
| camera sync | Three.js mutation | yes | no |
| world update | Three.js mutation | yes | no |
| minimap draw | canvas mutation | yes | no |
| debug capture | bounded store append | yes | no |
| post-processing | GPU submission | yes | no |
| successor scheduling | RAF ID | no | skipped on throw |

## Required result types

```txt
FrameAdmissionResult
  accepted | duplicate | stale-runtime | stale-run | paused | terminal

FrameStageResult
  committed | no-change | rejected | failed

FrameFailureResult
  failureId
  runtimeGeneration
  frameId
  stageId
  classification
  escapedMutationReceipts
  escapedPublicationReceipts
  lastKnownGoodFrameId
  quarantineRevision
  cleanupPlanId

FrameTerminalResult
  contained | disposed | retained-frozen | cleanup-failed

ColdRestartResult
  accepted | rejected | stale | failed | first-frame-committed
```

## Stage classification

```txt
simulation
network-publication
runtime-store-projection
camera
world
minimap
debug
post-processing
successor-scheduling
cleanup
```

## Required admission rules

```txt
only one active FramePlan per runtime generation
only one terminal failure result per frame
later stages reject after failure admission
later frames reject after runtime quarantine
duplicate failure reports return the cached terminal result
stale callbacks from the predecessor generation cannot mutate the replacement
cleanup can be retried only under an idempotent disposal plan
```

## Required observation

```txt
frameId
stageId
start and completion timestamps
source snapshot tick and revision
input revision
network request/publication IDs
world/minimap/render consumer receipts
failure classification and stack fingerprint
quarantine and readiness revisions
cleanup receipts
first replacement frame ID
```
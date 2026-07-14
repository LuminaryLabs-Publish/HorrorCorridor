# Page Lifecycle Command and Result Map

**Timestamp:** `2026-07-14T16-00-05-04-00`

## Summary

Browser lifecycle events currently bypass application command admission. The target map converts each event into one correlated suspend or resume attempt with explicit participant results.

## Plan ledger

**Goal:** make lifecycle transitions idempotent, observable and safe against stale browser and transport callbacks.

- [x] Map event sources and current implicit effects.
- [x] Define command, result and acknowledgement surfaces.
- [ ] Implement deduplication and participant receipts.

## Event map

```txt
document.visibilitychange(hidden)
window.pagehide(persisted=false)
window.pagehide(persisted=true)
freeze
  -> PageSuspendCommand

window.pageshow(persisted=true)
document.visibilitychange(visible)
resume
  -> PageResumeCommand
```

## Command envelope

```txt
PageLifecycleCommand
  commandId
  lifecycleAttemptId
  documentGeneration
  sessionGeneration
  runtimeGeneration
  eventKind
  persisted
  expectedSnapshotTick
  expectedTransportGeneration
  observedAtMs
```

## Suspend result

```txt
PageSuspendResult
  accepted | duplicate | stale | superseded | failed
  heldInputReceipt
  pointerLockReceipt
  rafReceipt
  renderClockReceipt
  clientSendReceipt
  hostPublicationReceipt
  transportPolicyReceipt
  checkpointFingerprint
```

## Resume result

```txt
PageResumeResult
  accepted | duplicate | stale | superseded | degraded | failed
  bfcacheClassification
  participantProbeReceipts
  snapshotReconciliationReceipt
  transportRestoreReceipt
  schedulerAdoptionReceipt
  rendererAdoptionReceipt
  firstFrameExpectedIdentity
```

## Final evidence

```txt
FirstResumedRuntimeFrameAck
  lifecycleAttemptId
  documentGeneration
  runtimeGeneration
  snapshotTick
  rendererGeneration
  submittedAtMs
```

## Rejection rules

Reject duplicate events, predecessor document generations, callbacks from retired RAF or transport generations, resume before an accepted suspension/checkpoint, and results arriving after a newer lifecycle attempt has been adopted.

## Validation boundary

No lifecycle commands, results, journals or frame acknowledgements are implemented.
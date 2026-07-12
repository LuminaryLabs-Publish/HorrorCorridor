# Loading Transition Generation DSK Map

**Timestamp:** `2026-07-12T09-38-46-04-00`  
**Parent domain:** `corridor-loading-transition-generation-authority-domain`

## Goal

Own the complete transition from a solo/host start request through cancellable loading, sealed bootstrap inputs, atomic commit and first visible run frame.

## Existing responsibilities involved

```txt
corridor-application-shell-kit
corridor-session-domain-kit
runtime-store-snapshot-kit
maze-snapshot-bootstrap-kit
protocol-message-construction-kit
peer-host-transport-kit
corridor-render-world-kit
runtime-resource-cleanup-kit
```

## Proposed DSK composition

```txt
corridor-loading-transition-generation-authority-domain
  -> loading-command-id-kit
  -> loading-generation-kit
  -> loading-phase-state-kit
  -> loading-step-plan-kit
  -> loading-step-result-kit
  -> loading-cancellation-token-kit
  -> route-predecessor-kit
  -> session-predecessor-kit
  -> lobby-snapshot-seal-kit
  -> loading-admission-kit
  -> loading-single-flight-kit
  -> loading-timeout-lease-kit
  -> loading-frame-lease-kit
  -> stale-loading-result-rejection-kit
  -> candidate-run-bootstrap-kit
  -> run-bootstrap-validation-kit
  -> loading-commit-kit
  -> loading-rollback-kit
  -> loading-observation-kit
  -> loading-journal-kit
  -> first-run-frame-ack-kit
```

## Command contract

```txt
StartRunCommand {
  commandId
  requestedMode
  routeRevision
  sessionRevision
  roomRevision
  rosterRevision
  readinessRevision
  connectionRevision
  requestedAtClockRevision
}
```

## Result contract

```txt
LoadingTransitionResult {
  commandId
  loadingGeneration
  status:
    committed
    cancelled
    superseded
    stale
    rejected
    failed
  candidateRunId
  committedRunId
  predecessorRevisions
  commitRevision
  transportReceipts
  firstFrameReceipt
  failure
}
```

## Invariants

```txt
one active generation unless explicit supersession policy says otherwise
every async callback belongs to one loading generation
all bootstrap inputs are immutable after admission
live stores remain unchanged until candidate validation succeeds
all live-store outputs commit under one revision
START_GAME and initial SYNC are emitted at most once per committed run
cancelled, stale and predecessor generations cannot mutate stores
world resources and authoritative snapshots carry the same run generation
READY requires first visible frame acknowledgement
```

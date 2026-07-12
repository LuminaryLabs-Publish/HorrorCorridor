# Loading Transition Central Reconciliation DSK Map

**Timestamp:** `2026-07-12T09-48-15-04-00`  
**Parent domain:** `corridor-loading-transition-generation-authority-domain`

## Goal

Keep the current loading-transition architecture, repo-local routing and central ledger aligned while preserving one implementation boundary from Start intent through first visible run frame.

## Existing owners involved

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

## Planned composition

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
  -> overlapping-start-fixture-kit
  -> route-exit-during-load-fixture-kit
  -> lobby-change-during-load-fixture-kit
  -> unmount-during-load-fixture-kit
  -> world-snapshot-generation-parity-fixture-kit
```

## Command and result boundary

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

LoadingTransitionResult {
  commandId
  loadingGeneration
  status: committed | cancelled | superseded | stale | rejected | failed
  predecessorRevisions
  candidateRunId
  committedRunId
  commitRevision
  transportReceipts
  firstFrameReceipt
  failure
}
```

## Invariants

```txt
one active loading generation unless supersession is explicit
every RAF and timer callback belongs to one generation
bootstrap inputs are immutable after admission
live stores remain unchanged until candidate validation succeeds
session, runtime, UI and transport outputs commit under one revision
START_GAME and initial SYNC are at most once per committed run
cancelled, stale and predecessor generations perform zero mutation
world resources and authoritative snapshots cite the same run generation
READY requires first visible frame acknowledgement
repo-local human docs, kit registry and central ledger cite the same current tracker
```

## Reconciliation result

The runtime authority remains unimplemented. This audit only advances documentation identity and central tracking from the older canonical-clock ledger entry to the current loading-transition generation boundary.

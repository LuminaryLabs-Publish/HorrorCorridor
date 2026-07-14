# HorrorCorridor Architecture Audit: Loading Progress and Readiness Evidence

**Timestamp:** `2026-07-13T23-38-39-04-00`

## Goal

Define one DSK authority from load admission through real subsystem work, progress projection, readiness settlement and the first visible frame.

## Current composition

```txt
GameShell
  -> runLoadingSteps
  -> timer-driven LoadingScreen projection
  -> createInitialGameState
  -> session/runtime/UI writes
  -> PLAYING route
  -> GameCanvas mount
  -> renderer/scene/post-processing/world creation
  -> animation loop
```

The work plan is implicit and split across shell, bootstrap and render host. The loading projection has no command/result relationship with the systems named by its labels.

## Required parent domain

```txt
corridor-loading-progress-readiness-evidence-authority-domain
```

## Required child surfaces

```txt
load-command-kit
load-attempt-id-kit
load-generation-kit
load-work-plan-kit
load-step-id-kit
load-step-command-kit
load-step-result-kit
load-progress-derivation-kit
load-cancellation-kit
load-timeout-kit
maze-bootstrap-preparation-kit
render-provider-preparation-kit
world-resource-preparation-kit
readiness-evidence-kit
readiness-revocation-kit
first-render-submission-kit
first-visible-frame-ack-kit
load-terminal-result-kit
load-observation-journal-kit
load-progress-projection-kit
loading-truth-fixture-kit
loading-cancellation-fixture-kit
client-host-readiness-parity-fixture-kit
first-frame-readiness-fixture-kit
```

## Authority rules

1. Capability labels are not progress facts.
2. Every visible step names a real command and accepted result.
3. Progress is derived from immutable work-plan receipts, never elapsed time alone.
4. Route, session, room, roster or provider replacement supersedes the generation.
5. Maze bootstrap and render preparation remain detached until all mandatory work validates.
6. Readiness is evidence-backed and revocable.
7. `PLAYING` is committed only with the accepted load result.
8. The first matching visible frame closes the transaction.
9. Failure restores the predecessor and retires partial resources exactly once.

## Command/result contract

```txt
CorridorLoadCommand
  attemptId
  generation
  routeRevision
  sessionRevision
  roomRevision
  rosterFingerprint
  providerManifestFingerprint
  workPlanRevision

LoadStepResult
  stepId
  subsystem
  status
  workRevision
  artifactFingerprint
  durationMs
  failureReason

CorridorLoadResult
  Completed | Failed | Cancelled | TimedOut | Stale | Superseded
  acceptedStepResults
  bootstrapRevision
  renderProviderRevision
  firstVisibleFrameId
  rollbackResult
```

## Integration boundary

The parent coordinates existing shell, bootstrap, runtime, render and presentation kits. It does not require replacing those kits or restructuring the repository.
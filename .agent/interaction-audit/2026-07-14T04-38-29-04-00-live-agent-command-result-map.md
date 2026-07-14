# Interaction Audit: Live-Agent Command and Result Map

**Timestamp:** `2026-07-14T04-38-29-04-00`

## Summary

The current proof workflow is driven by CLI flags, child-process exit codes and mutable JSON files. It lacks one typed command/result vocabulary for run admission, episode execution, browser observation, cancellation and terminal cleanup.

## Plan ledger

**Goal:** define explicit commands and terminal results for every externally observable proof transition.

- [x] Map CLI and browser interactions.
- [x] Map current implicit results.
- [x] Define typed command/result boundaries.
- [ ] Implement idempotent admission and cancellation.

## Current map

```txt
npm script
  -> CLI options
  -> process spawn
  -> HTTP/CDP/browser side effects
  -> DOM clicks and keyboard input
  -> mutable report fields
  -> process exit status
```

## Required commands

```txt
OpenProofRunCommand
OpenEpisodeCommand
AdmitServerCommand
AdmitBrowserCommand
OpenObservationPageCommand
EnterPlayableRunCommand
ExecuteActionProfileCommand
CaptureFrameArtifactsCommand
SettleProofGatesCommand
CancelEpisodeCommand
RetireProofRunCommand
```

## Required terminal results

```txt
ProofRunOpened | Duplicate | Stale | Failed
EpisodeOpened | Rejected | Superseded
ServerAdmitted | ForeignServer | PortConflict | Failed
BrowserAdmitted | ForeignBrowser | Unsupported | Failed
PageReady | RouteFailed | DebugBridgeMissing | TimedOut
ActionCompleted | Cancelled | InputFailed | Stale
ArtifactsCaptured | Partial | HashFailed | Stale
ProofPassed | ProofFailed | Blocked | InvalidEvidence
EpisodeRetired | Partial | Failed | AlreadyRetired
ProofRunCompleted | Cancelled | TimedOut | Failed
```

## Idempotency keys

```txt
ProofRunId
EpisodeId
CommandId
ServerGeneration
BrowserGeneration
ContextGeneration
PageGeneration
FrameId
ArtifactId
```

## Rejection rule

Any continuation that cites an obsolete source, server, browser, page or frame generation must return `Stale` without promoting artifacts or changing the accepted run result.

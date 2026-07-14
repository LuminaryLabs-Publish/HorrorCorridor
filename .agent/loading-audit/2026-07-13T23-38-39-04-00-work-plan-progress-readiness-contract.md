# HorrorCorridor Loading Audit: Work Plan, Progress and Readiness Contract

**Timestamp:** `2026-07-13T23-38-39-04-00`

## Goal

Replace timed labels with a real, generation-bound loading work plan.

## Work plan

```txt
1. admit session and route revisions
2. prepare deterministic maze/bootstrap artifact
3. prepare runtime snapshot candidate
4. prepare renderer and context
5. prepare scene, post-processing and world resources
6. attach canvas, resize and input policy
7. admit animation loop
8. submit and acknowledge first visible frame
9. commit PLAYING and readiness evidence
```

## Required data

```txt
LoadAttemptId
LoadGeneration
WorkPlanRevision
LoadStepId
SubsystemId
StepWeight
ExpectedRevision
ArtifactFingerprint
StepResult
LoadProgressSnapshot
ReadinessEvidence
FirstVisibleFrameAck
LoadTerminalResult
RollbackResult
```

## Progress derivation

Progress is calculated from accepted weighted step results. A step cannot be marked complete from elapsed time, a scheduled callback or an attempted function call. Failed mandatory work halts the plan. Optional work can produce a typed degraded result only when policy permits it.

## Cancellation and supersession

Cancel or supersede the attempt when route, session, room, roster, provider manifest or component generation changes. Late promises and RAF callbacks may publish diagnostic results but cannot write to the current UI or stores.

## Readiness settlement

```txt
simulation ready
  -> accepted bootstrap and runtime candidate
rendering ready
  -> accepted provider, world, submission and visible frame
networking ready
  -> admitted transport and session evidence
input ready
  -> accepted playable commit and current focus policy
```

## Rollback

Retire partial renderer, scene, world, listeners, timers and loop resources exactly once. Restore the predecessor route and expose a typed retry or fallback descriptor.
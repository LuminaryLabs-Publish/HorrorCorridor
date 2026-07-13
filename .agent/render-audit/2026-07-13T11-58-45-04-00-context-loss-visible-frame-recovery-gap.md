# Context Loss Visible-Frame Recovery Gap

**Timestamp:** `2026-07-13T11-58-45-04-00`

## Summary

The visible world is produced by one renderer/composer generation, but no application result connects context loss, restoration, rebuilt GPU resources and the first recovered frame. Rendering readiness can remain true while the application has no proof that a valid WebGL frame is being presented.

## Plan ledger

**Goal:** make visible recovery a verified commit rather than an opaque consequence of library/browser behavior.

- [x] Trace canvas, renderer, composer, world and RAF ownership.
- [x] Confirm no application context lifecycle listener exists.
- [x] Confirm readiness is set before a proven frame.
- [x] Confirm the frame callback submits through `postProcessing.render()`.
- [ ] Add lifecycle and resource-generation evidence.
- [ ] Add a WebGL-independent fallback.
- [ ] Acknowledge the first recovered visible frame.

## Current visible loop

```txt
renderer canvas appended
  -> world attached
  -> rendering readiness = true
  -> RAF frame updates camera/world/minimap/debug
  -> EffectComposer render
  -> successor RAF scheduled after callback returns
```

## Failure window

```txt
context lost
  -> no app-level Lost transition
  -> readiness remains true
  -> no visible fallback
  -> no generation fence on render submission
  -> composer/world continue referencing predecessor resources
  -> opaque internal recovery or render failure
  -> no recovered-frame receipt
```

If the frame callback throws, the animation-loop implementation does not reach the successor `requestAnimationFrame` call. The application has no context-specific containment result that restarts presentation after resources recover.

## Required frame envelope

```txt
RecoveredFrameEnvelope
  surfaceId
  runtimeSessionId
  contextGeneration
  resourceGeneration
  viewportRevision
  snapshotTick
  cameraRevision
  worldProjectionRevision
  composerRevision
  submittedAtMs
```

## Required results

```txt
ContextLossResult
RecoveryPreparationResult
RecoveryProbeFrameResult
RecoveredGenerationCommitResult
FirstRecoveredFrameAck
FallbackProjectionResult
```

## Visible policy

```txt
Lost or Restoring
  -> stop WebGL submissions
  -> keep last complete canvas only as stale visual evidence
  -> show DOM/CSS recovery state
  -> mark rendering readiness false

Restored candidate
  -> rebuild all resource participants
  -> render one probe
  -> adopt only on success
  -> mark rendering ready after visible acknowledgement
```

## Claims withheld

No claim is made for restored visual continuity, composer/render-target validity, world-resource parity, fallback coverage or first-recovered-frame proof.
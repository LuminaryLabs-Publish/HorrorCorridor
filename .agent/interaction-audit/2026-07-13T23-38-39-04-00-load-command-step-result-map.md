# HorrorCorridor Interaction Audit: Load Command and Step Results

**Timestamp:** `2026-07-13T23-38-39-04-00`

## Current interaction map

```txt
Start action
  -> async function with no command ID
  -> LOADING screen
  -> timer-driven activeStep changes
  -> live store mutations
  -> PLAYING screen
```

The caller receives no accepted, rejected, cancelled, failed or superseded result. The loading UI cannot distinguish real work from elapsed time.

## Required interaction map

```txt
StartLoadCommand
  -> validate route and session preconditions
  -> allocate attempt and generation
  -> return Accepted or explicit rejection

for each work-plan step
  -> LoadStepCommand
  -> subsystem preparation
  -> LoadStepResult
  -> progress projection

terminal
  -> Completed and visible-frame acknowledgement
  -> Failed with retry descriptor
  -> Cancelled
  -> TimedOut
  -> Stale
  -> Superseded
```

## Projection rules

- `queued` means the command has not started.
- `active` means an admitted command is executing.
- `done` means an accepted result and artifact fingerprint exist.
- `failed` names the failed subsystem and safe next action.
- Percent complete is derived from weighted accepted work, not array position.
- Late results from retired generations are observable but cannot mutate live UI.

## Public observation

Expose the load attempt, generation, current step, accepted receipts, failure, readiness evidence and first visible frame through diagnostics without exposing mutable subsystem internals.
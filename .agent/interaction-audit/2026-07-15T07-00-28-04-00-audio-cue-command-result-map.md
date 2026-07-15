# Audio Cue Command Result Map

**Timestamp:** `2026-07-15T07-00-28-04-00`

## Summary

Audio must consume accepted command results rather than raw button presses, render observations or unqualified snapshots. This prevents rejected interactions from sounding successful and prevents host/client replay from producing duplicate cues.

## Plan ledger

**Goal:** map interaction, session and outcome results into explicit audio commands with rejection and deduplication semantics.

- [x] Define source-result classes.
- [x] Define audio command identity.
- [x] Define accepted, deferred, rejected and failed outcomes.
- [ ] Implement result publication.
- [ ] Validate host/client duplicate suppression.

## Command map

```txt
CubeInteractionResult accepted pickup
  -> AudioProjectionAdmissionCommand(cue=cube.pickup)

CubeInteractionResult accepted drop
  -> AudioProjectionAdmissionCommand(cue=cube.drop)

AnomalyPlacementResult accepted
  -> AudioProjectionAdmissionCommand(cue=anomaly.place)

AnomalyPlacementResult rejected order
  -> AudioProjectionAdmissionCommand(cue=anomaly.reject)

SequenceCompletionResult accepted
  -> AudioProjectionAdmissionCommand(cue=anomaly.complete)

SessionParticipantResult joined or left
  -> AudioProjectionAdmissionCommand(cue=session.presence)

PauseResult accepted
  -> AudioMixTransitionCommand(target=paused)

ResumeResult accepted
  -> AudioMixTransitionCommand(target=playing)

TerminalOutcomeResult accepted
  -> AudioProjectionAdmissionCommand(cue=outcome.terminal)
```

## Result contract

```txt
AudioProjectionResult
  status: accepted | deferred | rejected | failed
  audioEventId
  sourceResultId
  sourceRevision
  contextGeneration
  cueDescriptorId
  busId
  voiceId
  reason
  startedAtAudioTime
```

## Required rejection reasons

```txt
unsupported-browser
context-locked
context-suspended
muted
zero-volume
stale-source-revision
duplicate-audio-event
superseded-session
unknown-cue
voice-budget-exhausted
route-retired
```

## Deduplication key

```txt
session generation
+ source result identity
+ source revision
+ cue descriptor identity
```

## Claim boundary

No command/result audio surface currently exists. This file defines future contracts only.

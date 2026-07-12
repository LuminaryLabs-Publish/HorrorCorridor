# HorrorCorridor Presentation Consumer Admission Map

**Timestamp:** `2026-07-12T02-49-19-04-00`

## Goal

Define how screen state, runtime generation and surface availability should admit each presentation consumer before a frame is projected.

## Current admission

```txt
world:
  admitted procedurally by GameCanvas initialization

post-processing:
  admitted procedurally by GameCanvas initialization

HUD:
  admitted by React screen branching

minimap:
  no admission result
  GameCanvas performs a global DOM lookup each RAF
  missing canvas becomes a silent return

debug:
  admitted by ambient debug enable state
```

The world loop and React HUD do not share one consumer policy. A frame can therefore assume a consumer that the UI tree did not mount.

## Required command

```txt
AdmitPresentationConsumerCommand
  sessionId
  runEpoch
  runtimeGeneration
  frameId
  screen
  consumerId
  expectedSurfaceRevision
  required
```

## Required admission results

```txt
Accepted
  consumer and surface are ready for this frame

IntentionallySkipped
  policy declares the consumer optional/hidden

Unavailable
  required surface is not mounted or acquired

Stale
  lease belongs to an old screen/runtime generation

NotRequired
  consumer is outside the current screen policy

Rejected
  malformed or unauthorized consumer request
```

## Screen policy matrix

| Consumer | PLAYING | PAUSED | COMPLETED |
|---|---|---|---|
| Three.js world | required | policy-defined frozen/live | policy-defined |
| Post-processing | required | policy-defined | policy-defined |
| Active HUD shell | required | replaced by pause UI | replaced by terminal UI |
| Minimap | explicit required/optional policy | explicit policy | explicit policy |
| Settings overlay | optional | optional | optional |
| Debug projection | capability-gated optional | capability-gated optional | capability-gated optional |

## Required flow

```txt
screen transition
  -> resolve PresentationPolicy
  -> mount/acquire required surfaces
  -> publish surface revisions

frame start
  -> create PresentationFramePlan
  -> admit every consumer
  -> reject commit when a required consumer is unavailable
  -> project accepted consumers
  -> retain skipped/unavailable results
  -> commit only after required acknowledgements
```

## Current defect represented as a result

```txt
screen: PLAYING
consumer: minimap
required by intended gameplay surface: yes
surface lookup: null
current behavior: silent no-op
required behavior: Unavailable(reason = surface-not-mounted)
```

## Acceptance criteria

```txt
no global DOM lookup acts as implicit admission
surface lease identity replaces element-id discovery
required consumer failures are observable
optional hiding is explicit and typed
screen transitions revoke stale leases
all accepted consumers cite one frameId
```

## Validation state

```txt
runtime implementation: absent
admission result types: absent
consumer policy fixture: absent
browser proof: absent
```

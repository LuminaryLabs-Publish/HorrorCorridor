# HorrorCorridor Active Gameplay Presentation DSK Map

**Timestamp:** `2026-07-12T02-49-19-04-00`

## Goal

Define the domain and kit boundary that makes the world, active HUD, minimap and debug projection explicit consumers of one committed presentation frame.

## Current composition

```txt
GameShell
  -> owns screen state and mounts GameCanvas + HUDOverlay

GameCanvas
  -> owns RAF
  -> advances or replays simulation state
  -> updates Three.js world
  -> looks up minimap canvas by global DOM id
  -> attempts minimap draw
  -> captures debug frame
  -> submits post-processing render

HUDOverlay
  -> PLAYING: SettingsOverlay + FrameDebugPanel only
  -> COMPLETED: status panels + Minimap + SettingsOverlay + FrameDebugPanel

Minimap
  -> owns canvas descriptor
  -> draws maze, ooze, cubes, remote players and heading when a canvas exists
```

## Architectural defect

The current runtime has no presentation-consumer registry or screen-policy result. The active HUD branch can omit a consumer that the RAF assumes exists. The lookup failure is converted into a silent no-op by `drawMinimapFrame`, so the frame loop cannot distinguish:

```txt
consumer intentionally disabled
consumer not mounted yet
consumer stale after screen transition
consumer missing due to composition defect
consumer draw failed
consumer drew successfully
```

## Required parent domain

```txt
corridor-active-gameplay-presentation-authority-domain
```

## Domain responsibilities

```txt
screen and gameplay-phase admission
presentation frame identity
snapshot/local-pose input correlation
required and optional consumer policy
surface lease acquisition and revocation
consumer readiness
consumer projection commands
consumer projection results
required-consumer acknowledgement barrier
visible presentation commit
screen-transition retirement
bounded failure journal
```

## Candidate DSK map

### Frame identity and planning

```txt
presentation-frame-id-kit
  sessionId
  runEpoch
  runtimeGeneration
  frameId
  snapshotTick
  localPoseRevision
  surfaceRevision
  screen

presentation-frame-plan-kit
  immutable consumer inputs
  mandatory consumer set
  optional consumer set
  projection order
  expected revisions
```

### Screen policy and consumer registry

```txt
active-gameplay-hud-policy-kit
  PLAYING consumer requirements
  PAUSED consumer requirements
  COMPLETED consumer requirements
  explicit hidden/optional policy

presentation-consumer-registry-kit
  world consumer
  post-processing consumer
  HUD consumer
  minimap consumer
  debug consumer
```

### Surface ownership

```txt
hud-surface-lease-kit
  mount identity
  screen eligibility
  runtime generation
  revoke on replacement

minimap-surface-lease-kit
  canvas identity
  physical size
  DPR
  screen eligibility
  mount revision
  revoke on unmount
```

### Admission and results

```txt
presentation-consumer-admission-kit
  accepted
  intentionally skipped
  unavailable
  stale
  not required

world-projection-result-kit
hud-projection-result-kit
minimap-projection-result-kit
debug-projection-result-kit
  consumerId
  frameId
  surfaceRevision
  status
  reason
  observed output revision
```

### Commit and proof

```txt
presentation-consumer-ack-kit
  mandatory-consumer acknowledgements
  optional-consumer outcomes

presentation-frame-commit-kit
  commit only after required consumers succeed
  publish one immutable visible-frame receipt

presentation-frame-journal-kit
  missing consumer
  stale surface
  projection failure
  transition revocation
  committed frame
```

### Fixtures

```txt
active-play-hud-reachability-fixture-kit
minimap-mount-lifecycle-fixture-kit
presentation-consumer-parity-fixture-kit
browser-gameplay-hud-smoke-kit
```

## Required flow

```txt
screen transition
  -> evaluate named presentation policy
  -> mount/acquire required surfaces
  -> publish surface leases and revisions

RAF
  -> create immutable PresentationFramePlan
  -> admit each registered consumer
  -> project world
  -> project active HUD
  -> project minimap
  -> project debug tier
  -> submit post-processing
  -> collect typed results
  -> require mandatory acknowledgements
  -> commit visible frame receipt
```

## Invariants

```txt
PLAYING cannot commit when a mandatory HUD/minimap consumer is unavailable
missing required canvas is not a silent no-op
screen transition revokes obsolete surface leases
all consumer results cite one frameId
all dynamic projections cite one snapshot/local-pose input set
optional consumers return explicit skipped results
COMPLETED does not become the first phase in which an active-play consumer is reachable
```

## Dependency placement

```txt
runtime startup acquisition and rollback
  -> runtime readiness and generation fencing
  -> render-surface resolution and revision
  -> active gameplay presentation authority
  -> debug observability projection
```

The active gameplay presentation boundary consumes the existing render-surface revision and provides the committed frame identity needed by public HUD, minimap and debug consumers.

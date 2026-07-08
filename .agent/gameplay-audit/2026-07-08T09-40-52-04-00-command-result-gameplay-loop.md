# HorrorCorridor Command Result Gameplay Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T09:40:52-04:00`

## Gameplay loop

```txt
spawn in maze
  -> move with keyboard
  -> look with mouse
  -> find colored cubes
  -> interact to pick up cube
  -> carry cube through maze
  -> approach end anomaly
  -> interact to place cube into next open sequence slot
  -> ordered sequence validates required color
  -> remove cube if correction is needed
  -> repeat until ordered anomaly sequence is solved
  -> victory/completion screen
```

## Current gameplay authority

Gameplay authority is split across source modules but still converges inside `GameCanvas.tsx`.

```txt
GameCanvas.tsx:
  - derives action from distance-to-end and carried-cube state
  - applies local authoritative interaction
  - sends client interaction request
  - handles host incoming interaction request
  - publishes snapshots
  - commits victory UI

interactionRules.ts:
  - pickup cube
  - drop cube
  - place cube at end anomaly
  - remove cube from end anomaly
  - silent unchanged-state rejection branches

networkRules.ts:
  - player update
  - held cube sync
  - network interaction request switch
  - request-sync / toggle-ready / cancel / default unchanged-state paths

winRules.ts:
  - ordered sequence completion

oozeRules.ts:
  - ooze cadence and pressure mutation
```

## Gameplay domains

```txt
first-person-navigation
maze-collision
cube-pickup
cube-drop
cube-place
cube-remove
nearest-cube-selection
anomaly-distance-check
sequence-slot-selection
ordered-sequence-victory
ooze-pressure
local-authoritative-play
host-authoritative-play
client-prediction
snapshot-publication
completion-routing
```

## Gameplay service gaps

```txt
- rejected pickup/drop/place/remove has no explicit result.
- accepted pickup/drop/place/remove has no explicit command event list.
- request-sync is not typed as publish-only recovery.
- toggle-ready/cancel/default are not typed as skipped command results.
- ordered victory is not typed as a victory command result.
- local authority uses object identity as the no-op detector.
- host authority publishes after TRY_INTERACT without a shared publish decision helper.
```

## Gameplay fixture rows needed

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
accepted place final anomaly slot as victory
rejected place too far from anomaly
rejected place with no free slot
accepted remove last anomaly cube
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update for missing player
accepted held cube sync
unchanged held cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
```

## Next gameplay proof

Build result-returning rule wrappers and a DOM-free fixture before changing player-facing behavior.

The public gameplay loop should remain identical while the internal loop gains explicit result data.

## Stop line

Do not add new gameplay mechanics until command results can prove accepted, rejected, unchanged, publish-only, skipped, and victory cases headlessly.
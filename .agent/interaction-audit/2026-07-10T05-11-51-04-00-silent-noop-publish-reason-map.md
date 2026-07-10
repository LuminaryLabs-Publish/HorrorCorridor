# Interaction Audit: Silent No-op Publish Reason Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T05-11-51-04-00`

## Silent no-op branches to name

```txt
not-playing
missing-player
already-carrying
no-nearby-loose-cube
no-carried-cube
missing-anomaly-cell
too-far-from-anomaly
no-free-sequence-slot
wrong-sequence-slot
no-occupied-slot
missing-cube
missing-host-player
held-cube-player-missing
held-cube-already-synced
request-sync-recovery
toggle-ready-skipped
cancel-skipped
unknown-action-skipped
ooze-decay-wait
ooze-spacing-guard
ooze-max-guard
ooze-no-state-diff
sequence-incomplete
sequence-victory
sequence-victory-rollback
```

## Current problem

These cases currently return unchanged `GameState` or implicit publish reason strings. That makes the browser playable but not explainable through fixtures or runtime debug.

## Needed map

```txt
input condition
  -> stable CommandReason
  -> CommandStatus accepted | rejected | skipped | noop | publish_only | victory
  -> PublishDecision publish | skip | recovery | no_op | victory
  -> debug projection row
  -> fixture expected row
```

## Interaction finding

Do not infer reasons from object identity in `GameCanvas`. Give each branch a stable reason and prove it headlessly first.

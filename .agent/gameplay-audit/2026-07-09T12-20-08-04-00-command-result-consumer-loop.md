# HorrorCorridor Gameplay Audit

**Timestamp:** `2026-07-09T12-20-08-04-00`

## Gameplay loop

```txt
start menu
  -> solo, host, or join
  -> readiness/loading
  -> first-person corridor navigation
  -> locate cubes
  -> pick up cube
  -> carry cube through maze
  -> place cube at anomaly sequence slot
  -> remove/drop if needed
  -> complete ordered sequence
  -> avoid / manage ooze pressure
  -> victory completion route
```

## Command loop today

```txt
interact key
  -> GameCanvas computes action from anomaly distance and carried cube
  -> local/host calls applyNetworkInteractionRequest
  -> client sends TRY_INTERACT
  -> host applies applyNetworkInteractionRequest
  -> rules mutate GameState or return same object
  -> caller infers publish/no-op from object identity and action string
```

## Accepted gameplay actions

```txt
pickup-cube
drop-cube
place-cube-at-anomaly
remove-cube-from-anomaly
player-update
held-cube-sync
ooze-tick
ordered-sequence-complete
```

## Rejected / skipped / unchanged actions that need records

```txt
not-playing
missing-player
already-carrying
no-nearby-cube
no-carried-cube
missing-anomaly-cell
too-far-from-anomaly
no-free-slot
no-occupied-slot
wrong-slot
missing-cube-id
request-sync
toggle-ready
cancel
unknown-action
player-missing
held-cube-already-synced
no-state-diff
```

## Gameplay gap

The game can complete, but command results are not explainable or replayable as data.

A failed interaction can feel like nothing happened because the code often returns the original `GameState` without a reason record.

## Required consumer loop

```txt
input or network message
  -> CommandEnvelope
  -> CommandResult
  -> PublishDecision
  -> LocalAuthorityResultConsumer or HostAuthorityResultConsumer
  -> explicit publish, skip, recovery, no-op, or victory
  -> runtime debug readback
  -> fixture replay row
```

## Next safe ledge

```txt
HorrorCorridor Result-First Command Readback Ledger Refresh + Fixture Gate
```

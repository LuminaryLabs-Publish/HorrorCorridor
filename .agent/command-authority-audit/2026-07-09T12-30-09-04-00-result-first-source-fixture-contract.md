# HorrorCorridor Command Authority Audit: Result-First Source Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-30-09-04-00`

## Authority problem

`HorrorCorridor` is playable, but command authority is not source-owned or fixture-readable yet.

`interactionRules.ts` and `networkRules.ts` return `GameState` only. `GameCanvas.tsx` then decides publish, skip, recovery, and victory behavior by object identity, event action strings, and post-mutation state checks.

## Required contract

```txt
CommandEnvelope
  id: stable fixture/debug command id
  source: local | host | client | recovery | fixture | system
  type: player-update | try-interact | request-sync | ooze-tick | held-cube-sync
  playerId: nullable player id
  action: normalized action string
  payload: serializable command payload

CommandResult
  command: CommandEnvelope
  status: accepted | rejected | unchanged | skipped | publish-only | victory
  reason: CommandReason
  before: CommandSnapshotSummary
  after: CommandSnapshotSummary
  changed: boolean
  events: CommandEvent[]
  diagnostics: serializable detail object
  state: GameState

PublishDecision
  kind: publish | skip | no-op | recovery | victory
  reason: initial | join | resync | reconnect | recovery | command-result
  shouldBroadcast: boolean
  shouldCommitVictory: boolean
  debugLabel: string
```

## Required reason catalog

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
accepted:player-update
accepted:held-cube-sync
accepted:ooze-tick
victory:ordered-sequence-complete
rejected:not-playing
rejected:missing-player
rejected:already-carrying
rejected:no-nearby-cube
rejected:no-carried-cube
rejected:missing-anomaly-cell
rejected:too-far-from-anomaly
rejected:no-free-slot
rejected:no-occupied-slot
rejected:wrong-slot
rejected:missing-cube-id
unchanged:player-missing
unchanged:held-cube-already-synced
unchanged:no-state-diff
publish-only:request-sync
skipped:toggle-ready-policy-not-implemented
skipped:cancel-policy-not-implemented
skipped:unknown-action
```

## Required fixture rows

```txt
accepted pickup
rejected pickup already carrying
rejected pickup no nearby cube
accepted drop
rejected drop no carried cube
accepted place
accepted place final slot as victory
rejected place too far
rejected place no free slot
accepted remove
rejected remove wrong slot
publish-only request-sync
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged missing player update
accepted held cube sync
unchanged held cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
local consumer skip rejected/no-op
local consumer publish accepted/victory
host consumer skip rejected TRY_INTERACT
host consumer publish request-sync recovery
```

## Acceptance rule

The first implementation should prove every result row in a DOM-free fixture before splicing result consumers into `GameCanvas.tsx`.

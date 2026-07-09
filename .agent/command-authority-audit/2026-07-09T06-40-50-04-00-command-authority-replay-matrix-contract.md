# HorrorCorridor Command Authority Replay Matrix Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-40-50-04-00`

## Contract intent

Freeze command authority before any renderer, PeerJS, minimap, postprocess, or scene-content extraction.

The next source cut should convert silent state-returning rules into typed result-returning adapters while preserving legacy exports.

## Required source contract

```txt
CommandEnvelope
  id: stable per fixture row or generated at runtime
  source: local | host | client | fixture | recovery | ooze
  playerId: optional
  action: normalized action
  payload: cubeId / slotId / player pose / tick metadata

CommandResult
  command: CommandEnvelope
  status: accepted | rejected | unchanged | skipped | publish-only | victory
  reason: stable CommandReason
  before: CommandSnapshotSummary
  after: CommandSnapshotSummary
  changed: boolean
  state: GameState
  events: CommandEvent[]
  diagnostics: serializable object

PublishDecision
  kind: publish | skip | no-op | recovery | victory
  shouldBroadcast: boolean
  shouldCommitVictory: boolean
  snapshotReason: string
  debugReason: string
```

## Command reason coverage

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

## Consumer rules

```txt
local consumer
-> accepted changed: publish
-> accepted unchanged: no-op
-> rejected: journal and skip
-> victory: publish and commit victory

host consumer
-> accepted changed: publish
-> accepted player update: publish if snapshot changes
-> rejected TRY_INTERACT: skip broadcast and journal
-> request-sync: publish recovery/full-sync
-> toggle-ready/cancel/unknown: skip and journal
-> victory: publish and commit victory
```

## Fixture stop condition

Stop the implementation ledge when the fixture proves every matrix row with:

```txt
status
reason
changed flag
publish decision
shouldBroadcast
shouldCommitVictory
snapshot reason
local consumer action
host consumer action
final snapshot summary
runtime debug projection
```

## Compatibility rule

Legacy functions may remain, but they should become adapters that return `result.state` from result-first functions.

# HorrorCorridor Command Authority Audit: Command Result Publish Decision Contract

**Timestamp:** `2026-07-10T03-49-48-04-00`

## Contract goal

Make every local and host gameplay action explainable before changing runtime behavior.

## Required command envelope

```txt
commandId
source: local-player | host-message | host-cadence | fixture
playerId
networkMessageType
networkRequestId
action
cubeId
slotId
targetCellId
issuedAtMs
```

## Required result envelope

```txt
command
status: accepted | rejected | skipped | publish-only | no-op
reason
changed
beforeSummary
afterSummary
events
diagnostics
legacyState
```

## Required publish decision

```txt
resultId
shouldPublish
shouldBroadcast
fullSyncReason: initial | join | resync | reconnect | recovery | null
shouldCommitVictory
shouldJournalOnly
skipReason
recoveryReason
snapshotTickBefore
snapshotTickAfter
```

## Reason families

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
accepted:player-update
accepted:held-cube-sync
accepted:ooze-spawn
accepted:ooze-decay
accepted:victory-complete
rejected:not-playing
rejected:missing-player
rejected:already-carrying
rejected:no-carried-cube
rejected:no-nearby-cube
rejected:too-far-from-anomaly
rejected:no-free-slot
rejected:wrong-slot
rejected:no-occupied-slot
no-op:unchanged-player-update
no-op:held-cube-already-synced
no-op:ooze-spacing
no-op:ooze-max
no-op:ooze-decay-window
publish-only:request-sync-recovery
skipped:toggle-ready-lobby-policy
skipped:cancel-lobby-policy
skipped:unknown-action
victory:ordered-sequence-complete
victory:rollback-to-playing
```

## Compatibility rule

Legacy functions may continue to return `GameState`, but result-first wrappers must be the source of truth for new tests and debug projection.

## First splice rule

Do not alter `GameCanvas.tsx` publish checks until the fixture proves:

```txt
legacy snapshot parity
command reason parity
publish decision parity
runtime debug projection shape
```

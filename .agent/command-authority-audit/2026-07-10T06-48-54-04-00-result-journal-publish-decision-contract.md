# Command Authority Audit — Result Journal + Publish Decision Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T06-48-54-04-00`

## Contract goal

Create a result-first command authority layer that explains every state mutation, unchanged result, skipped command, recovery request, ooze tick, and victory transition before `GameCanvas` consumes it.

## Required contracts

```txt
CommandEnvelope
  id
  source: local | host | client | system | fixture
  kind: interaction | network | ooze | win | sync
  action
  playerId
  requestId
  payload
  timestampMs

CommandResult
  command
  status: accepted | rejected | skipped | noop | publish_only | victory
  reason
  beforeSummary
  afterSummary
  changed
  events
  diagnostics
  legacyState

PublishDecision
  kind: publish | skip | recovery | noop | victory
  reason
  shouldBroadcast
  shouldCommitVictory
  shouldRecordDebug

CommandJournal
  rows
  counts
  latest
  latestRejected
  latestSkipped
  latestPublishDecision
```

## Reason catalog seed

```txt
accepted:pickup-cube
accepted:drop-cube
accepted:place-cube
accepted:remove-cube
accepted:player-update
accepted:held-cube-sync
rejected:not-playing
rejected:missing-player
rejected:already-carrying
rejected:no-nearby-cube
rejected:no-carried-cube
rejected:no-anomaly
rejected:too-far-from-anomaly
rejected:no-free-slot
rejected:wrong-slot
skipped:toggle-ready-in-game
skipped:cancel-in-game
skipped:unknown-action
publish-only:request-sync-recovery
noop:no-state-change
ooze:spawn
ooze:decay
ooze:no-state-diff
victory:sequence-complete
victory:rollback-invalid-sequence
```

## Consumer contract

```txt
local-authority-command-consumer:
  - appends every result to journal
  - skips rejected/noop broadcast
  - publishes accepted changed results
  - commits victory on victory decision

host-authority-command-consumer:
  - appends PLAYER_UPDATE and TRY_INTERACT results
  - skips rejected TRY_INTERACT publish
  - publishes request-sync recovery
  - publishes accepted changed results
  - commits victory on victory decision
```

## Non-goals

```txt
- no renderer extraction before command fixture
- no PeerJS extraction before host consumer proof
- no GameCanvas rewrite before wrappers pass
- no behavior change that breaks solo/host/client parity
```

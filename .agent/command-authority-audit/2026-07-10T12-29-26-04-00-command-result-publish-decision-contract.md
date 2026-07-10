# HorrorCorridor Command Authority Audit: Result + Publish Decision Contract

**Timestamp:** `2026-07-10T12-29-26-04-00`

## Authority problem

The host/local authority path currently relies on `GameState` return values and object identity instead of a durable command-result contract. That makes publish/skip decisions implicit and prevents runtime/debug tooling from explaining outcomes.

## Contract to add

```txt
CommandEnvelope
  id
  source: local | host | client | ooze | win | recovery
  action
  actor/player
  target/cube/anomaly metadata
  before snapshot summary

CommandResult
  envelope
  status: accepted | rejected | skipped | noop | recovery | victory | ooze
  reason
  changed
  events
  diagnostics
  after snapshot summary

PublishDecision
  resultId
  decision: publish | skip | publish-only | no-op | recovery | victory
  reason
  shouldBroadcast
  shouldJournal
```

## Required reason catalog

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
rejected:already-carrying
rejected:no-nearby-cube
rejected:no-carried-cube
rejected:too-far-from-anomaly
rejected:no-free-slot
rejected:wrong-slot
skipped:toggle-ready
skipped:cancel
skipped:unknown-action
noop:unchanged-player-update
noop:held-cube-already-synced
recovery:request-sync
victory:ordered-sequence-complete
victory:rollback-invalid-slots
ooze:spawn
ooze:decay
ooze:no-state-diff
```

## Consumer contract

```txt
localAuthorityCommandConsumer
  -> journal every command result
  -> skip rejected/no-op broadcasts
  -> publish accepted changed/victory results

hostAuthorityCommandConsumer
  -> journal PLAYER_UPDATE and TRY_INTERACT results
  -> classify request-sync as publish-only recovery
  -> classify rejected/skipped/no-op paths before broadcast

runtimeDebugCommandProjection
  -> latestCommandResult
  -> latestPublishDecision
  -> latestRejectionReason
  -> commandJournalSummary
  -> fixtureParity
```

## Implementation rule

Keep current state-returning rule exports available until the fixture proves both result envelopes and legacy snapshot parity.

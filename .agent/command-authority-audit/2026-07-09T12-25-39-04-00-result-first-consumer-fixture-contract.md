# Command Authority Audit: Result-First Consumer Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-25-39-04-00`

## Current authority problem

```txt
interactionRules.ts returns GameState only.
networkRules.ts returns GameState only.
GameCanvas.tsx treats unchanged object identity as silent no-op.
Host TRY_INTERACT publishes after mutation without accepted/rejected/skipped metadata.
Host PLAYER_UPDATE publishes after mutation without changed/no-change metadata.
Runtime debug cannot project the last command decision.
```

## Required command result contract

```txt
CommandResult {
  commandId
  source
  type
  playerId
  status
  reason
  beforeSummary
  afterSummary
  changed
  events
  diagnostics
  state
}
```

## Required publish decision contract

```txt
PublishDecision {
  decision
  snapshotReason
  shouldPublish
  shouldBroadcast
  shouldCommitVictory
  debugReason
}
```

## Required status families

```txt
accepted
rejected
unchanged
publish-only
skipped
victory
```

## Required reason families

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

## Consumer rule

`GameCanvas.tsx` should not decide publish/no-publish by object identity after this cut. It should consume explicit `PublishDecision` records produced by source-owned local/host authority consumers.

## Fixture gate

Do not splice the consumer into `GameCanvas.tsx` until `scripts/horror-corridor-command-fixture.mjs` proves accepted, rejected, unchanged, skipped, publish-only, ooze, and victory rows.

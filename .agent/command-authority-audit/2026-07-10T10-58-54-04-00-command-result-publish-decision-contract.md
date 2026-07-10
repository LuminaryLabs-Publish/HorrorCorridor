# Command Authority Audit: Command Result Publish Decision Contract

**Timestamp:** `2026-07-10T10-58-54-04-00`

## Current contract

```txt
interactionRules.ts -> GameState
networkRules.ts -> GameState
oozeRules.ts -> GameState
winRules.ts -> GameState
GameCanvas.tsx -> infer changed state / reason string / publish decision
runtimeDebugStore.ts -> frame and event export only
```

## Required next contract

```txt
CommandEnvelope
CommandSource
CommandStatus
CommandReason
CommandResult
CommandEvent
CommandSnapshotSummary
PublishDecision
CommandJournal
CommandFixtureRow
RuntimeDebugCommandProjection
```

## Required status vocabulary

```txt
accepted
rejected
skipped
unchanged
publish-only
recovery
victory
ooze
```

## Required reason rows

```txt
not-playing
missing-player
already-carrying
no-nearby-cube
no-carried-cube
not-near-anomaly
no-free-slot
wrong-slot
unknown-action
request-sync-recovery
toggle-ready-skipped
cancel-skipped
held-cube-synced
held-cube-unchanged
ooze-spawned
ooze-decayed
ooze-no-state-diff
ordered-sequence-complete
victory-rollback
```

## Contract rule

Do not replace GameCanvas publish logic until a DOM-free fixture proves command result parity with the existing GameState snapshots.

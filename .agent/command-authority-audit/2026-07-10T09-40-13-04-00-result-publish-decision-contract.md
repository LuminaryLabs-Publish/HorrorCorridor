# Command Authority Audit: Result and Publish Decision Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T09-40-13-04-00`

## Current authority seam

```txt
local player intent
  -> local solo/host applies GameState-returning rules
  -> client sends TRY_INTERACT to host
  -> host applies GameState-returning rules
  -> publish/skip is inferred from changed object identity or implicit reason strings
```

This is playable, but it cannot answer the questions needed for debugging and safe refactor:

```txt
What command ran?
Who sent it?
What rule handled it?
Was it accepted, rejected, skipped, recovery-only, no-op, victory, or ooze?
Why did it fail or skip?
Did it change state?
Should it publish?
What events should be journaled?
What exact before/after summary proves parity?
```

## Required command contracts

```txt
CommandEnvelope
  id
  source
  action
  target
  issuedAtFrame
  actorId
  payload

CommandResult
  commandId
  status
  reason
  changed
  beforeSummary
  afterSummary
  events
  diagnostics
  sourceRule

PublishDecision
  commandId
  decision
  reason
  shouldPublish
  channel
  snapshotSummary

CommandJournalEntry
  command
  result
  publishDecision
  consumedBy
  fixtureRowId
```

## Required statuses

```txt
accepted
rejected
skipped
no-op
publish-only
recovery
victory
ooze
```

## Required consumers

```txt
localAuthorityCommandConsumer
  - records local command result.
  - skips rejected/no-op local broadcasts.
  - publishes accepted changed/victory results.
  - exposes the latest result to runtime debug.

hostAuthorityCommandConsumer
  - records PLAYER_UPDATE, TRY_INTERACT, request-sync, toggle-ready, cancel, unknown/default action outcomes.
  - publishes accepted/recovery/victory results.
  - skips rejected/no-op/skipped outcomes.
  - exposes publish decision and journal summary to runtime debug.
```

## Implementation order

```txt
1. Add contracts and reason catalog.
2. Add result constructors and snapshot summary helpers.
3. Add result-returning wrappers beside existing GameState-returning rules.
4. Preserve legacy exports by returning result.state.
5. Add deterministic fixture rows.
6. Add publish decision helper.
7. Add local/host command consumers.
8. Add runtime debug projection additively.
9. Replace GameCanvas object-identity checks only after fixture passes.
```

## Stop condition

Stop when the fixture proves accepted/rejected/unchanged/skipped/publish-only/ooze/victory rows and runtime debug can project the latest command result plus publish decision without changing the legacy snapshot shape.

# Command Authority Audit: Result Publish Decision Contract

## Current authority

Current command authority is inferred from state identity and route-specific reason strings.

```txt
changed object identity -> publish
unchanged object identity -> silent skip
request-sync -> recovery publish
TRY_INTERACT -> host state mutation or no-op
```

## Gap

No stable result envelope exists for authority decisions.

## Required contract

```txt
CommandEnvelope
CommandSource
CommandStatus
CommandReason
CommandResult
CommandEvent
CommandSnapshotSummary
PublishDecision
CommandJournalEntry
```

## Decision states

```txt
accepted_changed -> publish
action_completed_victory -> publish_victory
accepted_unchanged -> no_op_skip
rejected -> skip_with_reason
skipped -> skip_explicit
publish_only -> recovery_or_resync
```

## Compatibility rule

Keep current `GameState`-returning exports as legacy adapters until result fixtures pass. New result-returning helpers should wrap or share logic with the old functions.

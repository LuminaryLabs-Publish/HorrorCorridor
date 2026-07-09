# Command Authority Audit — Consumer Handoff Fixture Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T10-10-32-04-00`

## Authority blocker

The command authority path is not yet source-owned as a result contract.

Current behavior:

```txt
interactionRules.ts returns GameState only
networkRules.ts returns GameState only
GameCanvas compares object identity to infer no-op
GameCanvas publishes with string reasons: initial, join, resync, reconnect, recovery
Runtime debug exports frames/events but no latest command result or publish decision
```

## Result contract needed

```txt
type CommandStatus =
  | 'accepted'
  | 'rejected'
  | 'unchanged'
  | 'skipped'
  | 'publish-only'
  | 'victory'

type PublishDecision =
  | 'publish'
  | 'skip'
  | 'recovery'
  | 'no-op'
  | 'victory'
```

## Required command sources

```txt
local-interaction
host-player-update
host-try-interact
host-request-sync
system-ooze-tick
fixture-replay
```

## Required command reason families

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

## Consumer handoff rules

```txt
accepted changed -> publish
accepted unchanged -> no-op
rejected -> skip
unchanged -> no-op or skip by command type
publish-only request-sync -> recovery
skipped -> skip
victory -> victory publish + completion commit
```

## Source file manifest

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Fixture gate

Before editing `GameCanvas.tsx`, the fixture must prove:

```txt
[ ] every legacy accepted mutation still returns the same final state through legacy adapters
[ ] every previous silent no-op now has a stable CommandReason
[ ] request-sync becomes publish-only recovery
[ ] toggle-ready and cancel become skipped policy rows
[ ] unknown/default action becomes skipped:unknown-action
[ ] local consumer skips rejected and no-op broadcasts
[ ] host consumer skips rejected TRY_INTERACT broadcasts
[ ] host consumer publishes request-sync recovery
[ ] victory command produces shouldCommitVictory true
[ ] runtime debug projection is serializable
[ ] final snapshot summary parity passes after volatile normalization
```

## Acceptance command

```txt
node scripts/horror-corridor-command-fixture.mjs
```

After that exists and passes, add an npm script and wire it into normal validation.

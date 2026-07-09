# HorrorCorridor Source Contract Consumer Freeze

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-30-54-04-00`

## Source files read

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
```

## Blocker

The current command authority seam still returns `GameState` only.

`interactionRules.ts` hides invalid cases by returning unchanged state.

`networkRules.ts` collapses `request-sync`, `toggle-ready`, `cancel`, and unknown/default actions into unchanged state.

`GameCanvas.tsx` then decides publish behavior through object identity, implicit action strings, and ad hoc snapshot reason strings.

## Required source contracts

```txt
CommandEnvelope
CommandSource
CommandType
CommandStatus
CommandReason
CommandResult
CommandEvent
CommandSnapshotSummary
PublishDecision
CommandJournalEntry
LocalAuthorityResultConsumerOutput
HostAuthorityResultConsumerOutput
RuntimeDebugCommandProjection
FixtureRow
FixtureExpectation
FixtureResult
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

## Source edit order

```txt
1. commandTypes.ts
2. commandReasons.ts
3. commandResults.ts
4. publishDecisions.ts
5. commandJournal.ts
6. commandFixtureSeeds.ts
7. commandFixtureRows.ts
8. interactionPreflight.ts
9. interactionResultRules.ts
10. networkResultRules.ts
11. localAuthorityCommandConsumer.ts
12. hostAuthorityCommandConsumer.ts
13. scripts/horror-corridor-command-fixture.mjs
14. package.json fixture script
15. runtimeDebugCommandProjection.ts
16. runtimeDebugStore.ts additive command projection fields
17. GameCanvas.tsx result-first consumer integration
```

## Hard safety rule

Keep the legacy `interactionRules.ts` and `networkRules.ts` exports compatible until the fixture proves the new result wrappers.

Existing callers should be able to keep receiving `GameState` through adapters while new consumers read `CommandResult`.

# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T13-58-16-04-00`

## Selection state

```txt
- full accessible LuminaryLabs-Publish list compared with central ledger
- all nine eligible non-Cavalry repos tracked
- root .agent state present for every eligible repo
- TheCavalryOfRome excluded
- HorrorCorridor selected as oldest eligible documented fallback
```

## Command authority gaps

```txt
- interactionRules.ts returns GameState only.
- networkRules.ts returns GameState only.
- oozeRules.ts returns GameState only.
- winRules.ts returns GameState only.
- invalid pickup, drop, place, and remove paths silently return the original state.
- missing-player updates silently return the original state.
- request-sync, toggle-ready, cancel, and unknown/default actions lack explicit outcome records.
- held-cube synchronization does not report accepted-changed versus accepted-unchanged.
- ooze decay-not-due, spacing-guard, capacity-guard, spawn, and decay paths lack outcome metadata.
- ordered-sequence completion and rollback lack explicit victory result rows.
- local authority uses state identity as a publication proxy.
- host authority lacks a typed publish/skip/recovery/victory decision.
- no stable command source, status, reason, event, or snapshot-summary contracts exist.
- no ordered command journal exists.
```

## Consumer and debug gaps

```txt
- GameCanvas consumes legacy GameState-returning rules directly.
- publishAuthoritativeState reason strings are not a durable domain contract.
- runtimeDebugStore has frames and events but no command outcome projection.
- runtime debug cannot expose latest command, status, reason, changed flag, publication decision, or consumer action.
- runtime debug has no command journal counters.
- runtime debug has no fixture parity row.
- browser diagnostics cannot explain rejected interaction or skipped publication decisions.
```

## Missing source files

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
HorrorCorridor-V1/src/features/game-state/domain/oozeResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Validation gaps

```txt
- package.json has no fixture:commands script.
- no DOM-free deterministic command fixture exists.
- no fixture proves accepted, rejected, skipped, unchanged, recovery, ooze, victory, and publish-only rows.
- no fixture proves legacy GameState snapshot compatibility.
- no fixture proves GameCanvas publication decisions before consumer rewiring.
```

## Deferred work

```txt
- PeerJS extraction
- renderer extraction
- minimap extraction
- post-processing extraction
- route restructuring
- new maze content
- scene-dressing expansion
- visual object-kit expansion
- wholesale GameCanvas rewrite
```

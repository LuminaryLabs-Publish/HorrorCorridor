# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T15-31-03-04-00`

## Selection state

```txt
- full accessible LuminaryLabs-Publish list compared with central ledger
- all nine eligible non-Cavalry repos tracked
- root .agent state present for every eligible repo
- TheCavalryOfRome excluded
- HorrorCorridor selected as oldest eligible documented fallback
```

## Command result gaps

```txt
- interactionRules.ts returns GameState only.
- networkRules.ts returns GameState only.
- oozeRules.ts returns GameState only.
- winRules.ts returns GameState only.
- invalid pickup, drop, place, and remove paths silently return the original state.
- missing-player updates silently return the original state.
- request-sync, toggle-ready, cancel, and unknown/default actions lack explicit result rows.
- held-cube synchronization does not report accepted-changed versus accepted-unchanged.
- ooze decay-not-due, spacing-guard, capacity-guard, spawn, and decay paths lack outcome metadata.
- ordered-sequence completion and rollback lack explicit result rows.
```

## Authority and publication gaps

```txt
- local applyInteraction skips publication when nextState === currentGameState.
- host TRY_INTERACT publishes after every request, including unchanged-state outcomes.
- request-sync is translated into a recovery publication reason without a typed command result.
- PLAYER_UPDATE publishes after application without a typed accepted/rejected/unchanged result.
- periodic authority cadence publishes after advanceOozeTrail independently of semantic trail mutation.
- spawnOozeTrail returns a new GameState object even when spacing or capacity guards add nothing.
- object identity is therefore not a reliable semantic changed signal across command families.
- no authority-neutral consumer owns publish/skip/recovery/victory/cadence classification.
- no published snapshot tick is linked back to the result that caused publication.
```

## Correlation and debug gaps

```txt
- network requestId is not carried into a source-owned command result.
- local commands have no stable commandId or correlationId.
- runtime debug events and frames are independent bounded arrays with no causal join key.
- runtime debug cannot expose command source, authority mode, status, reason, changed flag, publish decision, or published tick.
- runtime debug cannot distinguish command-driven publication from cadence-driven publication.
- no correlation completeness counters exist.
- browser diagnostics cannot compare local and host decisions for the same fixture command.
```

## Missing source files

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandCorrelation.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/authorityParityFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/authorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-authority-parity-fixture.mjs
```

## Validation gaps

```txt
- package.json has no fixture:authority-parity script.
- no DOM-free deterministic authority parity fixture exists.
- no fixture proves local and host publication parity for the same accepted/rejected command.
- no fixture proves request-sync recovery and cadence publication are intentional non-command publications.
- no fixture proves command result -> publish decision -> snapshot tick correlation.
- no fixture proves legacy GameState and replicated snapshot compatibility.
- no fixture proves runtime-debug correlation projection.
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
- network cadence retuning
```
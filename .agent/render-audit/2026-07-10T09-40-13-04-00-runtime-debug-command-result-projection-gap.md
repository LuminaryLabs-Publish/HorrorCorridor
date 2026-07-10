# Render Audit: Runtime Debug Command Result Projection Gap

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T09-40-13-04-00`

## Render surface

`HorrorCorridor` has a visual/render surface:

```txt
GameCanvas
  -> Three.js first-person maze world
  -> post-processing pipeline
  -> HUD and interaction prompts
  -> minimap projection
  -> completion/route display
  -> runtime debug overlay/export
```

## Current render/debug loop

```txt
runtime state changes
  -> GameCanvas stores latest authoritative snapshot
  -> renderer consumes maze, cubes, players, anomalies, ooze, scene dressing
  -> minimap consumes projected snapshot
  -> HUD consumes player/carry/anomaly proximity state
  -> runtimeDebugStore captures frames/events
  -> debug export lacks command result and publish decision rows
```

## Gap

The renderer itself is not the immediate blocker. The missing render-adjacent proof is the debug/readback projection that explains why an interaction or network message did or did not change/publish state.

```txt
missing latestCommandResult
missing latestPublishDecision
missing latestRejectionReason
missing latestConsumerAction
missing commandJournal counters
missing accepted/rejected/no-op/skipped/publish-only/ooze/victory fixture parity
missing debug projection rows for local and host authority paths
```

## Evidence sampled

```txt
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
  - frame/event capture exists.
  - command-result projection fields are absent.

HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
  - invalid interaction paths return unchanged state without typed reasons.

HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
  - request-sync, toggle-ready, cancel, and default actions have no typed result rows.

HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
  - ooze no-state-diff paths cannot be projected as skipped/no-op rows.
```

## Required next render/debug contract

```txt
RuntimeDebugCommandProjection = {
  latestCommandResult,
  latestPublishDecision,
  latestRejectionReason,
  latestConsumerAction,
  commandJournalSummary,
  latestFixtureParity
}
```

## Recommendation

Do not extract or rewrite the renderer next. Add command result rows and publish decision rows first, prove them through a DOM-free fixture, then expose those rows additively through runtime debug. Only after debug projection is stable should GameCanvas publish/skip logic be rewired.

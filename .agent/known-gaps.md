# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-09T18-30-30-04-00`

## Selection gap handled in this pass

```txt
- the current public LuminaryLabs-Publish repo list was checked.
- TheCavalryOfRome was excluded.
- sampled root .agent/START_HERE.md state was present for checked public non-Cavalry repos.
- checked public non-Cavalry repos were tracked in the central repo ledger.
- HorrorCorridor was selected as the oldest eligible documented fallback.
- central tracking is refreshed to 2026-07-09T18-30-30-04-00 by this run.
```

## Authority and command gaps

```txt
- interactionRules returns GameState only.
- networkRules returns GameState only.
- oozeRules returns GameState only.
- winRules returns GameState only.
- invalid pickup, drop, place, and remove branches silently return unchanged state.
- request-sync, toggle-ready, cancel, and default network actions return unchanged state without result metadata.
- syncHeldCubesToPlayers has accepted and unchanged paths but no result metadata.
- applyNetworkPlayerUpdate returns unchanged state for missing players without reason metadata.
- local authority uses object identity to decide whether to publish after interaction.
- host authority needs a single consumer path for PLAYER_UPDATE, TRY_INTERACT, request-sync, skipped actions, and victory.
- host authority can publish or recover without a first-class PublishDecision record.
- no stable CommandReason catalog exists for rejected, skipped, unchanged, publish-only, ooze, or victory commands.
- no CommandResult envelope exists for before/after state, changed flag, events, diagnostics, and source metadata.
- no publish-decision snapshot exists to classify publish, skip, recovery, victory, or no-op behavior.
- no explicit local-authority result consumer exists.
- no explicit host-authority result consumer exists.
```

## Source wire gaps

```txt
- commandTypes.ts does not exist.
- commandReasons.ts does not exist.
- commandResults.ts does not exist.
- publishDecisions.ts does not exist.
- commandJournal.ts does not exist.
- commandFixtureSeeds.ts does not exist.
- commandFixtureRows.ts does not exist.
- interactionPreflight.ts does not exist.
- interactionResultRules.ts does not exist.
- networkResultRules.ts does not exist.
- localAuthorityCommandConsumer.ts does not exist.
- hostAuthorityCommandConsumer.ts does not exist.
- runtimeDebugCommandProjection.ts does not exist.
- scripts/horror-corridor-command-fixture.mjs does not exist.
- package.json does not yet include a command fixture script.
- GameCanvas.tsx still consumes GameState-returning rules directly.
```

## Debug and replay gaps

```txt
- runtime debug frames expose cadence, snapshot, cube, anomaly, input, and scene dressing data, but not command-result data.
- runtime debug exports do not expose latestCommandResult, latestPublishDecision, latestRejectionReason, latestConsumerAction, commandJournal, or latestFixtureParity.
- no RuntimeDebugCommandProjection helper exists.
- no DOM-free replay fixture proves accepted/rejected/unchanged/publish-only/final-victory snapshot parity.
- the browser overlay cannot yet explain why an interaction was rejected or why a host publish was skipped.
```

## Publish-decision gaps

```txt
- accepted changed commands need explicit publish decisions.
- accepted unchanged commands need explicit no-op decisions.
- rejected TRY_INTERACT commands need explicit skip decisions.
- unchanged player/held-cube sync needs explicit skip or no-op decisions.
- request-sync needs explicit recovery/full-sync decision metadata.
- toggle-ready and cancel need explicit skipped policy metadata until lobby policy exists.
- unknown/default actions need explicit skipped:unknown-action metadata.
- victory needs explicit victory publish decision metadata.
- local and host authority should consume the same decision helper instead of duplicating publish behavior.
```

## Non-goals for the next pass

```txt
- do not start with new visual object kits
- do not extract PeerJS first
- do not extract renderer first
- do not rewrite GameCanvas wholesale
- do not change routes or deployment first
- do not remove existing solo, host, client, minimap, debug, or PeerJS behavior
- do not edit GameCanvas behavior before the domain fixture exists and passes
```

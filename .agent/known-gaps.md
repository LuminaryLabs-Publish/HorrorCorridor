# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T06-48-54-04-00`

## Selection gap handled in this pass

```txt
- current public LuminaryLabs-Publish repo list was checked.
- TheCavalryOfRome was excluded.
- sampled root .agent state was present for checked public non-Cavalry repos.
- checked public non-Cavalry repos were tracked in the central repo ledger.
- HorrorCorridor was selected as the oldest eligible documented fallback because its prior central ledger timestamp was 2026-07-10T05-11-51-04-00.
- central tracking is refreshed to 2026-07-10T06-48-54-04-00 by this pass.
```

## Authority and command gaps

```txt
- interactionRules returns GameState only.
- networkRules returns GameState only.
- oozeRules returns GameState only.
- winRules returns GameState only.
- invalid pickup, drop, place, and remove branches silently return unchanged state.
- request-sync, toggle-ready, cancel, and default network actions return unchanged state or implicit recovery behavior without result metadata.
- syncHeldCubesToPlayers has accepted and unchanged paths but no result metadata.
- applyNetworkPlayerUpdate returns unchanged state for missing players without reason metadata.
- ooze spawn/decay/no-state-diff paths have no result metadata.
- ordered sequence victory and victory rollback have no result metadata.
- local authority uses object identity to decide whether to publish after interaction.
- host authority publishes TRY_INTERACT outcomes without knowing whether the command was accepted, rejected, skipped, no-op, or recovery-only.
- host authority can publish or recover without a first-class PublishDecision record.
- no stable CommandReason catalog exists for rejected, skipped, unchanged, publish-only, ooze, or victory commands.
- no CommandResult envelope exists for before/after state, changed flag, events, diagnostics, and source metadata.
- no CommandJournal exists to retain ordered command facts.
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
- oozeResultRules.ts does not exist.
- winResultRules.ts does not exist.
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
- no DOM-free replay fixture proves accepted/rejected/unchanged/publish-only/skipped/ooze/victory snapshot parity.
- the browser overlay cannot yet explain why an interaction was rejected or why a host publish was skipped.
```

## Non-goals for the next pass

```txt
- do not start with new visual object kits
- do not extract PeerJS first
- do not extract renderer first
- do not extract minimap first
- do not rewrite GameCanvas wholesale
- do not change routes or deployment first
- do not remove existing solo, host, client, minimap, debug, or PeerJS behavior
- do not edit GameCanvas behavior before the domain fixture exists and passes
```

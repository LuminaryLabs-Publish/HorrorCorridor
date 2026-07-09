# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-09T16-00-13-04-00`

## Selection gap handled in this pass

```txt
- the accessible LuminaryLabs-Publish repo list was checked.
- TheCavalryOfRome was excluded.
- sampled root .agent/START_HERE.md state was present for the selected repo.
- checked non-Cavalry repos were tracked in the central repo ledger.
- HorrorCorridor was selected because central tracking still pointed at 2026-07-09T12-30-09-04-00 while repo-local state had advanced to 2026-07-09T15-56-42-04-00.
- this run adds a fresh timestamped repo-local tracker set and updates central tracking to 2026-07-09T16-00-13-04-00.
```

## Authority and command gaps

```txt
- interactionRules returns GameState only.
- networkRules returns GameState only.
- invalid pickup, drop, place, and remove branches silently return unchanged state.
- request-sync, toggle-ready, cancel, and default network actions return unchanged state without result metadata.
- syncHeldCubesToPlayers has accepted and unchanged paths but no result metadata.
- applyNetworkPlayerUpdate returns unchanged state for missing players without reason metadata.
- local authority uses object identity to decide whether to publish after interaction.
- host authority needs a single consumer path for PLAYER_UPDATE, TRY_INTERACT, request-sync, skipped actions, and victory.
- host authority can publish or recover without a first-class PublishDecision record.
- no stable CommandReason catalog exists for rejected, skipped, unchanged, publish-only, or victory commands.
- no CommandResult envelope exists for before/after state, changed flag, events, diagnostics, and source metadata.
- no publish-decision snapshot exists to classify publish, skip, recovery, victory, or no-op behavior.
- no explicit local-authority result consumer exists.
- no explicit host-authority result consumer exists.
- command-result source wire map is documented but not implemented.
- consumer acceptance map is documented but not implemented.
- GameCanvas consumer wire map is documented but not implemented.
- command fixture source file manifest is documented but not implemented.
- legacy adapter source cut is documented but not implemented.
- fixture seed-state contract is documented but not implemented.
- command decision fixture contract is documented but not implemented.
- replay-matrix row coverage is documented but not implemented.
```

## Seed-state fixture gaps

```txt
- there is no canonical createCommandFixtureSeedState helper.
- there is no fixture builder for near-cube pickup, carrying conflict, no nearby cube, anomaly-near, anomaly-far, full-slot, wrong-slot, missing-player, request-sync, toggle-ready, cancel, unknown-action, ooze tick, or victory rows.
- there is no stable fixture seed id / command id normalization contract.
- there is no before/after snapshot summary helper dedicated to fixture rows.
- fixture rows cannot yet compare final replicated snapshot facts without browser state.
- fixture rows cannot yet assert local-consumer and host-consumer decisions independently.
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
- no fixture matrix covers request-sync recovery, ignored toggle-ready/cancel, player update, held-cube sync, ooze tick, and victory completion from canonical seed states.
- fixture ids, expected statuses, expected publish decisions, and non-normalizable fields are documented but not source-backed.
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
- publishAuthoritativeState currently accepts only a reason, not a command-result-derived decision object.
```

## GameCanvas splice gaps

```txt
- GameCanvas derives action strings from distance/carry state instead of consuming a normalized CommandEnvelope.
- GameCanvas local interaction path returns silently when nextState === currentGameState.
- GameCanvas host TRY_INTERACT path publishes after applyNetworkInteractionRequest without knowing whether the result was accepted, rejected, skipped, unchanged, or publish-only.
- GameCanvas host PLAYER_UPDATE publishes after applyNetworkPlayerUpdate without knowing if it changed state.
- commitVictory is tied to post-mutation gameState checks instead of an explicit consumer decision.
- sendInteractionRequest sends only action/player information and does not preserve command id/source metadata.
```

## Rendering and visual gaps

```txt
- renderer currently consumes snapshots directly and remains coupled to runtime frame flow.
- minimap draw is called from the same game loop as camera/render/debug capture.
- post-processing is initialized in runtime canvas code and not described as an external render descriptor contract.
- object/texture kit catalog exists as direction, but visual expansion should not happen before authority replay is fixture-safe.
- runtime render/debug readback cannot currently explain the latest command outcome or publish decision.
```

## Validation gaps

```txt
- npm run lint was not run in this documentation-only pass.
- npm run smoke:protokits was not run in this documentation-only pass.
- npm run harness:horror-corridor was not run in this documentation-only pass.
- node scripts/horror-corridor-command-fixture.mjs does not exist yet.
- npm run validate:live-player:dev was not run in this documentation-only pass.
- no browser route check was run in this documentation-only pass.
- no live host/client multiplayer check was run in this documentation-only pass.
```

## Non-goals for the next pass

```txt
- do not start with new visual object kits
- do not extract PeerJS first
- do not extract renderer first
- do not rewrite GameCanvas wholesale
- do not change routes or deployment first
- do not remove existing solo, host, client, minimap, debug, or PeerJS behavior
- do not edit GameCanvas before the domain fixture exists and passes
```

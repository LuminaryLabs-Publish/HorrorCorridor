# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-08T06:28:31-04:00`

## Authority and command gaps

```txt
- interactionRules returns GameState only.
- networkRules returns GameState only.
- invalid pickup, drop, place, and remove branches silently return unchanged state.
- request-sync, toggle-ready, cancel, and default network actions return unchanged state without result metadata.
- local authority uses object identity to decide whether to publish after interaction.
- host authority publishes after TRY_INTERACT even when the command produced no meaningful state change.
- no stable CommandReason catalog exists for rejected, skipped, unchanged, publish-only, or victory commands.
- no CommandResult envelope exists for before/after state, changed flag, events, diagnostics, and source metadata.
- no publish-decision snapshot exists to classify publish, skip, recovery, victory, or no-op behavior.
- no command fixture acceptance ledger existed before this pass; it now exists but is not implemented in source.
```

## Debug and replay gaps

```txt
- runtime debug frames expose cadence, snapshot, cube, anomaly, input, and scene dressing data, but not command-result data.
- runtime debug exports do not expose latestCommandResult, latestPublishDecision, latestRejectionReason, commandJournal, or latestFixtureParity.
- no DOM-free replay fixture proves accepted/rejected/unchanged/publish-only final snapshot parity.
- no fixture matrix covers request-sync recovery, ignored toggle-ready/cancel, player update, ooze tick, and victory completion.
- fixture ids, expected statuses, expected publish decisions, and non-normalizable fields are now documented but not source-backed.
```

## Domain extraction gaps

```txt
- GameCanvas still owns too much runtime orchestration.
- PeerJS message ingress is still coupled to host authority decisions.
- render, minimap, debug capture, input, and publish cadence still meet inside GameCanvas.
- session/lobby policy is not yet a clean standalone domain kit.
- renderer extraction should wait until command authority and replay fixture contracts are stable.
```

## Rendering and visual gaps

```txt
- renderer currently consumes snapshots directly and remains coupled to runtime frame flow.
- minimap draw is called from the same game loop as camera/render/debug capture.
- post-processing is initialized in runtime canvas code and not described as an external render descriptor contract.
- object/texture kit catalog exists as direction, but visual expansion should not happen before authority replay is fixture-safe.
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
```

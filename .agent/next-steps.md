# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T01-49-13-04-00`

## Current next build slice

```txt
HorrorCorridor Command Result Host Debug Readback + Fixture Gate
```

Start from:

```txt
.agent/architecture-audit/2026-07-10T01-49-13-04-00-command-result-host-debug-readback-dsk-map.md
.agent/render-audit/2026-07-10T01-49-13-04-00-debug-projection-command-ledger-gap.md
.agent/gameplay-audit/2026-07-10T01-49-13-04-00-local-host-command-result-loop.md
.agent/command-authority-audit/2026-07-10T01-49-13-04-00-command-result-fixture-contract.md
.agent/interaction-audit/2026-07-10T01-49-13-04-00-silent-noop-publish-decision-map.md
.agent/deploy-audit/2026-07-10T01-49-13-04-00-command-fixture-validation-gate.md
```

## Build checklist

```txt
[ ] Preserve current solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior.
[ ] Add serializable command contracts under game-state/domain.
[ ] Define CommandEnvelope, CommandSource, CommandStatus, CommandReason, CommandResult, PublishDecision, CommandEvent, and CommandSnapshotSummary.
[ ] Define stable CommandReason values for every silent no-op branch in interactionRules.ts, networkRules.ts, oozeRules.ts, and winRules.ts.
[ ] Add command result constructors and before/after snapshot summary helpers.
[ ] Add publish decision helper before GameCanvas consumes result metadata.
[ ] Add command journal helpers and summary counters.
[ ] Add canonical command fixture seed-state helpers before the fixture runner.
[ ] Add fixture row builders for accepted, rejected, unchanged, skipped, publish-only, ooze, and victory paths.
[ ] Add interaction preflight helpers beside interactionRules.
[ ] Add result-returning wrappers for pickup, drop, place, and remove.
[ ] Keep legacy interaction exports returning result.state.
[ ] Add result-returning wrappers for player update, held-cube sync, and network interaction request.
[ ] Keep legacy network exports returning result.state.
[ ] Add result-returning wrappers for ooze spawn, ooze decay, and ooze no-state-diff.
[ ] Add result-returning wrapper for ordered sequence completion and victory rollback.
[ ] Classify request-sync as publish-only recovery.
[ ] Classify toggle-ready and cancel as explicit skipped commands until lobby policy exists.
[ ] Classify unknown/default actions as skipped:unknown-action.
[ ] Classify accepted changed results as publish.
[ ] Classify accepted unchanged results as no-op.
[ ] Classify rejected TRY_INTERACT results as skip.
[ ] Classify ordered sequence completion as explicit victory.
[ ] Add localAuthorityCommandConsumer that journals local results, skips rejected/no-op broadcasts, and publishes accepted changed/victory results.
[ ] Add hostAuthorityCommandConsumer that classifies PLAYER_UPDATE, TRY_INTERACT, request-sync, skipped, rejected, recovery, and victory paths.
[ ] Add DOM-free command fixture script before changing GameCanvas publish logic.
[ ] Add package script for the command fixture after the script exists.
[ ] Add RuntimeDebugCommandProjection type and projection helper after the headless fixture passes.
[ ] Wire runtimeDebugStore to expose command projection fields additively.
[ ] Replace GameCanvas object-identity publish checks only after fixture proof.
[ ] Normalize only volatile fields in fixture comparison.
[ ] Keep central LuminaryLabs repo-ledger in sync after implementation lands.
[ ] Defer PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, scene dressing, and object-kit visual expansion.
```

## Suggested file targets

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
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Acceptance checks

```txt
[ ] node scripts/horror-corridor-command-fixture.mjs
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run validate:live-player:dev
```

## Stop condition

Stop when deterministic rows prove command status, command reason, publish decision, runtime debug projection, and legacy snapshot compatibility for local, host, ooze, and victory paths.

# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-08T02:19:36-04:00`

## Current next build slice

```txt
HorrorCorridor Command Reason Catalog + Result Journal Fixture Gate
```

## Build checklist

```txt
[ ] Preserve current solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior.
[ ] Add CommandEnvelope, CommandStatus, CommandReason, CommandResult, and PublishDecision contracts under game-state/domain.
[ ] Define stable CommandReason values for every current silent no-op branch.
[ ] Add interaction preflight helpers beside interactionRules.
[ ] Add result-returning wrappers for pickup, drop, place, and remove.
[ ] Keep legacy interaction exports returning result.state.
[ ] Add result-returning wrappers for player update and network interaction request.
[ ] Keep legacy network exports returning result.state.
[ ] Classify request-sync as publish-only recovery.
[ ] Classify toggle-ready and cancel as explicit skipped commands until lobby policy exists.
[ ] Add command result journal counters.
[ ] Add publish decision snapshot helper.
[ ] Wire local-authority consumer to journal rejections and only publish accepted changed/victory results.
[ ] Wire host-authority consumer to skip rejected TRY_INTERACT publishes and publish request-sync recovery.
[ ] Extend runtime debug frame/export with latestCommandResult, latestPublishDecision, commandJournal, and latestFixtureParity.
[ ] Add DOM-free fixtures for accepted pickup, rejected pickup, accepted drop, rejected drop, accepted place, rejected place, remove, request-sync recovery, ignored toggle-ready/cancel, player update, ooze tick, and victory completion.
[ ] Defer PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, and object-kit visual expansion.
```

## Suggested file targets

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Required command reason families

```txt
accepted
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
unchanged:player-missing
unchanged:held-cube-already-synced
publish-only:request-sync
skipped:toggle-ready-policy-not-implemented
skipped:cancel-policy-not-implemented
skipped:unknown-action
victory:ordered-sequence-complete
```

## Acceptance checks

```txt
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run review:object-kit
```

## Stop condition

Stop after command result contracts, reason catalog, publish decision helper, runtime debug projection, and DOM-free fixture matrix are documented or implemented enough to prove accepted, rejected, unchanged, publish-only, and victory command parity.

Do not continue into renderer extraction or new visual content in the same implementation pass.
# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-08T11:09:38-04:00`

## Current next build slice

```txt
HorrorCorridor Command Result Source Wire Map
```

Start from:

```txt
.agent/command-authority-audit/fixture-gate-implementation-map.md
.agent/command-authority-audit/result-reason-matrix.md
.agent/command-authority-audit/command-result-fixture-acceptance-ledger.md
.agent/command-authority-audit/publish-decision-routing-matrix.md
.agent/command-authority-audit/2026-07-08T08-29-35-04-00-source-edit-cutover-queue.md
.agent/command-authority-audit/2026-07-08T09-40-52-04-00-command-result-wire-contract.md
.agent/command-authority-audit/2026-07-08T11-09-38-04-00-command-result-source-wire-map.md
```

## Build checklist

```txt
[ ] Preserve current solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior.
[ ] Add CommandEnvelope, CommandStatus, CommandReason, CommandResult, CommandSnapshotSummary, CommandEvent, and PublishDecision contracts under game-state/domain.
[ ] Define stable CommandReason values for every current silent no-op branch in networkRules.ts and interactionRules.ts.
[ ] Add command result constructors and snapshot summary helpers.
[ ] Add publish decision helper before GameCanvas consumes the result metadata.
[ ] Add command journal helpers and summary counters.
[ ] Add interaction preflight helpers beside interactionRules.
[ ] Add result-returning wrappers for pickup, drop, place, and remove.
[ ] Keep legacy interaction exports returning result.state.
[ ] Add result-returning wrappers for player update, held-cube sync, and network interaction request.
[ ] Keep legacy network exports returning result.state.
[ ] Classify request-sync as publish-only recovery.
[ ] Classify toggle-ready and cancel as explicit skipped commands until lobby policy exists.
[ ] Classify unknown/default actions as skipped:unknown-action.
[ ] Classify accepted changed results as publish.
[ ] Classify accepted unchanged results as no-op.
[ ] Classify rejected TRY_INTERACT results as skip.
[ ] Classify ordered sequence completion as explicit victory.
[ ] Add DOM-free command fixture script before changing GameCanvas publish logic.
[ ] Add fixture rows for accepted, rejected, unchanged, publish-only, skipped, ooze, and victory result classes.
[ ] Add package script for the command fixture after the script exists.
[ ] Wire runtime debug result projection only after the headless fixture passes.
[ ] Wire local-authority consumer to journal rejections and only publish accepted changed/victory results.
[ ] Wire host-authority consumer to skip rejected TRY_INTERACT publishes and publish request-sync recovery.
[ ] Normalize only volatile fields in fixture comparison.
[ ] Defer PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, scene dressing, and object-kit visual expansion.
```

## Suggested file targets

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Implementation order

```txt
1. commandTypes.ts
   - define CommandEnvelope, CommandSource, CommandStatus, CommandReason, CommandResult, PublishDecision, CommandEvent, CommandSnapshotSummary.

2. commandReasons.ts
   - export stable reason constants and reason family helpers.

3. commandResults.ts
   - build accepted, rejected, unchanged, publish-only, skipped, and victory result constructors.
   - calculate changed from object identity and snapshot summary.

4. publishDecisions.ts
   - map result.status/result.changed to publish, skip, recovery, no-op, or victory.

5. commandJournal.ts
   - append result records and expose accepted/rejected/unchanged/publishOnly/skipped/victory counts.

6. interactionPreflight.ts
   - split current silent return state branches into named preflight results.

7. interactionResultRules.ts
   - wrap pickUpCube, dropCube, placeCubeAtEndAnomaly, and removeCubeFromEndAnomaly.
   - keep existing interactionRules.ts behavior stable.

8. networkResultRules.ts
   - wrap applyNetworkPlayerUpdate, syncHeldCubesToPlayers, applyNetworkInteractionRequest, request-sync, toggle-ready, cancel, and default.
   - keep existing networkRules.ts behavior stable.

9. scripts/horror-corridor-command-fixture.mjs
   - run the acceptance matrix without DOM, canvas, PeerJS, Three.js, or browser state.

10. package.json
   - add a command fixture script only after the fixture exists.

11. runtimeDebugStore.ts / GameCanvas.tsx
   - consume result metadata only after the headless fixture passes.
```

## Required command reason families

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

## Fixture acceptance matrix

```txt
[ ] accepted pickup near loose cube
[ ] rejected pickup while already carrying
[ ] rejected pickup with no nearby cube
[ ] accepted drop while carrying
[ ] rejected drop without carried cube
[ ] accepted place near anomaly with carried cube
[ ] accepted place final anomaly slot as victory
[ ] rejected place too far from anomaly
[ ] rejected place with no free slot
[ ] accepted remove last anomaly cube
[ ] rejected remove wrong slot
[ ] publish-only request-sync recovery
[ ] skipped toggle-ready
[ ] skipped cancel
[ ] skipped unknown action
[ ] accepted player update
[ ] unchanged player update for missing player
[ ] accepted held cube sync
[ ] unchanged held-cube already synced
[ ] ooze tick spawn
[ ] ooze tick decay
[ ] ooze tick no-state-diff
[ ] victory ordered-sequence completion
```

## Publish decision acceptance matrix

```txt
[ ] accepted changed -> publish
[ ] accepted unchanged -> no-op
[ ] rejected -> skip
[ ] unchanged -> skip or no-op by helper type
[ ] publish-only -> recovery
[ ] skipped -> skip
[ ] victory -> victory
```

## Acceptance checks

```txt
node scripts/horror-corridor-command-fixture.mjs
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run review:object-kit
```

## Stop condition

Stop after command result contracts, reason catalog, publish decision helper, command journal, runtime debug projection, and DOM-free fixture matrix are implemented or documented enough to prove accepted, rejected, unchanged, publish-only, skipped, and victory command parity.

Do not continue into renderer extraction, PeerJS extraction, minimap extraction, postprocess extraction, scene dressing, new level content, or new visual content in the same implementation pass.

## First source pass ledge

```txt
Implement only contracts and headless fixture first:
1. commandTypes.ts
2. commandReasons.ts
3. commandResults.ts
4. publishDecisions.ts
5. commandJournal.ts
6. interactionPreflight.ts
7. interactionResultRules.ts
8. networkResultRules.ts
9. scripts/horror-corridor-command-fixture.mjs
```

Only after `node scripts/horror-corridor-command-fixture.mjs` passes should `GameCanvas.tsx` and `runtimeDebugStore.ts` consume the result metadata.

# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-09T06-59-46-04-00`

## Current next build slice

```txt
HorrorCorridor Result Envelope Source Splice + Runtime Debug Projection Fixture Gate
```

Start from:

```txt
.agent/architecture-audit/2026-07-09T06-59-46-04-00-result-envelope-gamecanvas-dsk-map.md
.agent/render-audit/2026-07-09T06-59-46-04-00-runtime-debug-result-projection-readback.md
.agent/gameplay-audit/2026-07-09T06-59-46-04-00-local-host-result-decision-loop.md
.agent/command-authority-audit/2026-07-09T06-59-46-04-00-result-envelope-source-splice-contract.md
.agent/interaction-audit/2026-07-09T06-59-46-04-00-rejection-reason-branch-matrix.md
.agent/deploy-audit/2026-07-09T06-59-46-04-00-command-fixture-validation-gate.md
```

## Implementation order

```txt
1. Add pure command source modules under HorrorCorridor-V1/src/features/game-state/domain/command-authority/.
2. Add CommandEnvelope, CommandResult, CommandReason, PublishDecision, and CommandJournalEntry types.
3. Wrap pickup/drop/place/remove/request-sync/toggle-ready/cancel branches without changing legacy GameState outputs.
4. Add fixture seed states and deterministic command rows.
5. Prove accepted changed, rejected unchanged, request-sync recovery, host/player update, and victory rows.
6. Add runtime debug projection fields for latestCommandResult, latestPublishDecision, and commandJournalCounts.
7. Splice GameCanvas to consume result + publish decision facts instead of object identity.
8. Keep existing UI, route, rendering, minimap, and PeerJS behavior unchanged until the fixture passes.
```

## Source files to add next

```txt
HorrorCorridor-V1/src/features/game-state/domain/command-authority/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/command-authority/reasonCatalog.ts
HorrorCorridor-V1/src/features/game-state/domain/command-authority/interactionCommandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/command-authority/networkCommandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/command-authority/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/command-authority/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/command-authority/fixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/command-authority/fixtureRows.ts
HorrorCorridor-V1/scripts/horror-corridor-command-result-fixture.mjs
```

## Source files to splice after fixture proof

```txt
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/package.json
```

## Do not start next

```txt
- no new visual expansion
- no renderer extraction
- no minimap extraction
- no PeerJS extraction
- no new multiplayer feature
- no branch or PR
```

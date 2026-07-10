# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T10-58-54-04-00`

## Current safe ledge

```txt
HorrorCorridor Command Decision Debug Readback Ledger Refresh + Fixture Gate
```

Start with these files:

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T10-58-54-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T10-58-54-04-00.md
.agent/architecture-audit/2026-07-10T10-58-54-04-00-command-decision-debug-readback-dsk-map.md
.agent/render-audit/2026-07-10T10-58-54-04-00-runtime-debug-command-decision-gap.md
.agent/gameplay-audit/2026-07-10T10-58-54-04-00-local-host-command-decision-loop.md
.agent/command-authority-audit/2026-07-10T10-58-54-04-00-command-result-publish-decision-contract.md
.agent/interaction-audit/2026-07-10T10-58-54-04-00-noop-rejection-command-reason-map.md
.agent/deploy-audit/2026-07-10T10-58-54-04-00-command-decision-fixture-gate.md
```

## One sentence read

`HorrorCorridor` is a playable cooperative first-person maze, but the next safe cut is command-decision proof: make accepted, rejected, skipped, no-op, recovery, ooze, victory, and publish-only outcomes first-class rows before renderer, PeerJS, minimap, route, or content work.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates complete
  -> GameCanvas mounts
  -> renderer, camera, post-processing, maze world, minimap, input refs, pose refs, transport listener, and runtime debug initialize
  -> pointer-lock first-person navigation updates pose and view angles
  -> interact key derives pickup, drop, place, or remove
  -> local solo/host applies interaction/network rules directly
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync, toggle-ready, cancel, unknown action, ooze, and victory rules return GameState only
  -> publish/skip is inferred from changed state or implicit reason strings
  -> renderer, minimap, HUD, completion route, and runtime debug consume latest snapshot
```

## Main finding

Do not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, route rewrites, new maze content, or visual object-kit expansion.

The blocker is command-decision/debug readback. `interactionRules.ts` and `networkRules.ts` return `GameState` only, `GameCanvas.tsx` infers publish/skip from state identity or implicit reason strings, and `runtimeDebugStore.ts` exports frames/events but not command result, publish decision, rejection reason, or fixture parity rows.

## First implementation targets

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winResultRules.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Validation target

```txt
npm run fixture:commands
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
```

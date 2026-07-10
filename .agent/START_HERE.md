# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T09-40-13-04-00`

## Current safe ledge

```txt
HorrorCorridor Command Result Debug Projection Ledger Refresh + Fixture Gate
```

Start with these files:

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T09-40-13-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T09-40-13-04-00.md
.agent/architecture-audit/2026-07-10T09-40-13-04-00-command-result-debug-projection-ledger-dsk-map.md
.agent/render-audit/2026-07-10T09-40-13-04-00-runtime-debug-command-result-projection-gap.md
.agent/gameplay-audit/2026-07-10T09-40-13-04-00-local-host-command-result-loop.md
.agent/command-authority-audit/2026-07-10T09-40-13-04-00-result-publish-decision-contract.md
.agent/interaction-audit/2026-07-10T09-40-13-04-00-noop-rejection-reason-map.md
.agent/deploy-audit/2026-07-10T09-40-13-04-00-command-result-fixture-gate.md
```

## One sentence read

`HorrorCorridor` is a playable cooperative first-person maze, but the next safe cut is command-result proof: make accepted, rejected, skipped, no-op, recovery, ooze, victory, and publish-only outcomes first-class rows before renderer, PeerJS, minimap, route, or content work.

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

The blocker is command-result/debug projection. `interactionRules.ts`, `networkRules.ts`, `oozeRules.ts`, and `winRules.ts` still return `GameState` only. Rejected, skipped, no-op, recovery, ooze, victory, and publish-only paths collapse into unchanged state or implicit reason strings. `runtimeDebugStore.ts` captures frames/events but not command outcomes, publish decisions, rejection reasons, journal counters, or fixture parity.

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

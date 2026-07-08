# HorrorCorridor Agent Start

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Last aligned:** `2026-07-08T09:40:52-04:00`

## Purpose

This root `.agent/` folder is the operating memory for scheduled and manual breakdown work on `HorrorCorridor`.

Read this folder before changing implementation code.

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The current runtime uses Next, React, Three.js, Zustand, PeerJS, and TypeScript.

The player starts from a menu, enters solo/host/client mode, moves through a seeded corridor maze, manipulates colored cubes, solves an ordered anomaly sequence, avoids growing ooze pressure, and reaches a victory/completion screen.

## Current selection reason

The full accessible `LuminaryLabs-Publish` repo list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

No new untracked eligible repo was found, and eligible non-Cavalry repos already had root `.agent/START_HERE.md` state.

`TheCavalryOfRome` remains excluded by standing rule.

This pass selected `LuminaryLabs-Publish/HorrorCorridor` as the oldest eligible fallback follow-up because it is the oldest accessible non-Cavalry Publish repo and its live runtime still has the highest-value documented-but-unimplemented seam: result-returning command authority with fixture-readable publish decisions.

## Current route

```txt
HorrorCorridor-V1/package.json
  -> Next app scripts and validation harness scripts
  -> GameCanvas.tsx
  -> buildGameStateFromSnapshot()
  -> renderer/camera/postprocess/world/minimap/debug initialization
  -> pointer-lock input and local pose prediction
  -> networkRules.ts and interactionRules.ts
  -> publishAuthoritativeState()
  -> runtime debug frames/events
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, and debug state
  -> enter pointer-lock first-person navigation
  -> derive interact action from distance-to-end and carried-cube state
  -> pickup, drop, place, or remove cube
  -> ordered sequence validates anomaly completion
  -> ooze cadence advances on host/local authority ticks
  -> authoritative snapshot is built and published or skipped
  -> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/architecture-audit/2026-07-08T09-40-52-04-00-dsk-domain-breakdown.md
.agent/render-audit/render-surface-audit.md
.agent/render-audit/2026-07-08T09-40-52-04-00-render-authority-readback.md
.agent/gameplay-audit/authority-loop-audit.md
.agent/gameplay-audit/2026-07-08T09-40-52-04-00-command-result-gameplay-loop.md
.agent/command-authority-audit/result-reason-matrix.md
.agent/command-authority-audit/fixture-gate-implementation-map.md
.agent/command-authority-audit/command-result-fixture-acceptance-ledger.md
.agent/command-authority-audit/publish-decision-routing-matrix.md
.agent/command-authority-audit/2026-07-08T08-29-35-04-00-source-edit-cutover-queue.md
.agent/command-authority-audit/2026-07-08T09-40-52-04-00-command-result-wire-contract.md
.agent/trackers/2026-07-08T09-40-52-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T09-40-52-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/features/networking/protocol/messages.ts
HorrorCorridor-V1/src/features/networking/store/networkStore.ts
```

## Main rule

Do not let `GameCanvas.tsx`, PeerJS event handlers, DOM input, renderer code, object identity checks, or silent unchanged-state returns own command authority long term.

Move command legality into result-returning domain kits, then let local authority, host authority, runtime debug, renderer, replay fixtures, and future external GameHost diagnostics consume those command results.

## Current next safe ledge

Build the **HorrorCorridor Command Result Wire Contract + Fixture Boundary**.

Preserve the existing solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior while adding result-returning wrappers beside the current `GameState`-returning rule functions.

Start with the command contract and fixture files before touching `GameCanvas.tsx` publish behavior:

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
```